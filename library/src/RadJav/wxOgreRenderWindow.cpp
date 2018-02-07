#include "wxOgreRenderWindow.h"

#ifdef C3D_USE_OGRE
#ifdef __WXGTK__
#include <gdk/gdk.h>
#include <gtk/gtk.h>
#include <gdk/gdkx.h>
#include <wx/gtk/win_gtk.h>
#include <GL/glx.h>
#endif
 
const wxWindowID ID_RENDERTIMER = wxNewId ();
 
IMPLEMENT_CLASS (wxOgreRenderWindow, wxControl)
 
BEGIN_EVENT_TABLE (wxOgreRenderWindow, wxControl)
#ifndef __WXMSW__
    EVT_PAINT (wxOgreRenderWindow::OnPaint)
#endif
    EVT_TIMER (ID_RENDERTIMER, wxOgreRenderWindow::OnRenderTimer)
    EVT_SIZE (wxOgreRenderWindow::OnSize)
    EVT_MOUSE_EVENTS (wxOgreRenderWindow::OnMouseEvents)
END_EVENT_TABLE ()
 
Ogre::Root *wxOgreRenderWindow::msOgreRoot = 0;
//------------------------------------------------------------------------------
unsigned int wxOgreRenderWindow::msNextRenderWindowId = 1;
//------------------------------------------------------------------------------
wxOgreRenderWindow::wxOgreRenderWindow (Ogre::Root *root, wxWindow *parent, wxWindowID id,
                const wxPoint &pos, const wxSize &size, long style, const wxValidator &validator) {
	msOgreRoot = root;
    Init ();
    Create (parent, id, pos, size, style, validator);
}
//------------------------------------------------------------------------------
wxOgreRenderWindow::wxOgreRenderWindow () {
    Init ();
}
//------------------------------------------------------------------------------
bool wxOgreRenderWindow::Create (wxWindow *parent, wxWindowID id,
                const wxPoint &pos, const wxSize &size, long style, const wxValidator &validator) {
    // Error creating the base class
    if (!wxControl::Create (parent, id, pos, size, style, validator))
        return false;
 
    // Use the told size or let the sizers pick one.
    SetInitialSize (size);
 
  SetBackgroundStyle(wxBG_STYLE_CUSTOM);
 
    if (msOgreRoot)
        CreateRenderWindow ();
 
    return true;
}
//------------------------------------------------------------------------------
wxOgreRenderWindow::~wxOgreRenderWindow () {
    if (mRenderWindow && msOgreRoot)
        msOgreRoot->detachRenderTarget (mRenderWindow);
 
    mRenderWindow = 0;
 
    if (mRenderTimer)
        delete mRenderTimer;
}
//------------------------------------------------------------------------------
void wxOgreRenderWindow::Init () {
    mRenderWindow = 0;
 
    // Callbacks
    mMouseEventsCallback = 0;
 
    mRenderTimer = new wxTimer (this, ID_RENDERTIMER);
    mRenderTimer->Start (10);
}
//------------------------------------------------------------------------------
inline wxSize wxOgreRenderWindow::DoGetBestSize () const {
    return wxSize (320, 240);
}
//------------------------------------------------------------------------------
Ogre::Root *wxOgreRenderWindow::GetOgreRoot () {
    return msOgreRoot;
}
//------------------------------------------------------------------------------
void wxOgreRenderWindow::SetOgreRoot (Ogre::Root *root) {
    msOgreRoot = root;
}
//------------------------------------------------------------------------------
Ogre::RenderWindow *wxOgreRenderWindow::GetRenderWindow () const {
    return mRenderWindow;
}
//------------------------------------------------------------------------------
void wxOgreRenderWindow::SetRenderTimerPeriod (int period) {
    if (!mRenderTimer)
        return;
 
    if (period <= 0)
        mRenderTimer->Stop ();
    else
        mRenderTimer->Start (period);
}
//------------------------------------------------------------------------------
void wxOgreRenderWindow::Update () {
    if (msOgreRoot)
        msOgreRoot->renderOneFrame ();
}
//------------------------------------------------------------------------------
void wxOgreRenderWindow::SetMouseEventsCallback (MouseEventsCallback callback) {
    mMouseEventsCallback = callback;
}
//------------------------------------------------------------------------------
void wxOgreRenderWindow::OnPaint (wxPaintEvent &evt) {
    Update ();
}
//------------------------------------------------------------------------------
void wxOgreRenderWindow::OnRenderTimer (wxTimerEvent &evt) {
    Update ();
}
//------------------------------------------------------------------------------
void wxOgreRenderWindow::OnSize (wxSizeEvent &evt) {
    if (mRenderWindow) {
        // Setting new size;
        int width;
        int height;
        wxSize size = evt.GetSize ();
        width = size.GetWidth ();
        height = size.GetHeight ();
 
        // Cocoa will break the window here if the panel docks using an Advanced UI Manager
        // because wxWidgets actually destroys the floating panel.
        // wxWidgets handles the width and height of the window anyway
        // and Ogre recognises that in windowMovedOrResized().
        // I am not sure if windows requires this, but it works fine with it.
#if defined(__WXGTK__) || defined(__WXMSW__)
        mRenderWindow->resize (width, height);
#endif
 
        // Letting Ogre know the window has been resized;
        mRenderWindow->windowMovedOrResized ();
    }
 
    Update ();
}
//------------------------------------------------------------------------------
void wxOgreRenderWindow::OnMouseEvents (wxMouseEvent &evt) {
    if (mMouseEventsCallback)
        (*mMouseEventsCallback)(evt);
}
//------------------------------------------------------------------------------
void wxOgreRenderWindow::CreateRenderWindow () {
    Ogre::NameValuePairList params;
    params["externalWindowHandle"] = GetOgreHandle ();
 
// Need to tell Ogre3D that we are using a cocoa window
// if wx is using it.
// and that wxWidgets uses an NSView* as the handle
#ifdef __WXCOCOA__
	params["macAPI"] = "cocoa";
	params["macAPICocoaUseNSView"] = "true";
#endif
 
    // Get wx control window size
    int width;
    int height;
    GetSize (&width, &height);
    // Create the render window
    mRenderWindow = Ogre::Root::getSingleton ().createRenderWindow (
                    Ogre::String ("OgreRenderWindow") + Ogre::StringConverter::toString (msNextRenderWindowId++),
                    width, height, false, &params);
 
    mRenderWindow->setActive (true);
}
//------------------------------------------------------------------------------
Ogre::String wxOgreRenderWindow::GetOgreHandle () const {
    Ogre::String handle;
 
#ifdef __WXMSW__
    // Handle for Windows systems
	HWND hwnd = (HWND)GetHandle();
    handle = Ogre::StringConverter::toString((size_t)hwnd);
#elif defined(__WXCOCOA__)
    handle = Ogre::StringConverter::toString((size_t)((NSView*)(GetHandle()));
#elif defined(__WXGTK__)
    // Handle for GTK-based systems
 
    GtkWidget *widget = m_wxwindow;
    gtk_widget_set_double_buffered (widget, FALSE);
  gtk_widget_realize( widget );
 
  // Grab the window object
  GdkWindow *gdkWin = GTK_PIZZA (widget)->bin_window;
  Display* display = GDK_WINDOW_XDISPLAY(gdkWin);
  Window wid = GDK_WINDOW_XWINDOW(gdkWin);
 
  std::stringstream str;
 
  // Display
  str << (unsigned long)display << ':';
 
  // Screen (returns "display.screen")
  std::string screenStr = DisplayString(display);
  std::string::size_type dotPos = screenStr.find(".");
  screenStr = screenStr.substr(dotPos+1, screenStr.size());
  str << screenStr << ':';
 
  // XID
  str << wid << ':';
 
  // Retrieve XVisualInfo
  int attrlist[] = { GLX_RGBA, GLX_DOUBLEBUFFER, GLX_DEPTH_SIZE, 16, GLX_STENCIL_SIZE, 8, None };
  XVisualInfo* vi = glXChooseVisual(display, DefaultScreen(display), attrlist);
  str << (unsigned long)vi;
 
  handle = str.str();
#else
    // Any other unsupported system
    #error Not supported on this platform.
#endif
 
    return handle;
}
#endif