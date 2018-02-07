/*
	MIT-LICENSE
	Copyright (c) 2017 Higher Edge Software, LLC

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
	and associated documentation files (the "Software"), to deal in the Software without restriction, 
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
	subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial 
	portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
#ifndef _RADJAV_GUI_V8_CANVAS3D_H_
	#define _RADJAV_GUI_V8_CANVAS3D_H_

	#include "RadJavPreprocessor.h"
	#include "RadJavString.h"

	#include "v8/RadJavV8GUIGObject.h"

	#ifdef GUI_USE_WXWIDGETS
		#include <wx/wx.h>
		#include "wxOgreRenderWindow.h"
	#endif

	namespace RadJAV
	{
		namespace GUI
		{
			#ifdef C3D_USE_OGRE
				class RADJAV_EXPORT CanvasResource
				{
					public:
						inline CanvasResource()
						{
							resourceDir = "";
							name = "";
							type = "";
							group = "";
							loadAtStart = true;
						}

						String resourceDir;
						String name;
						String type;
						String group;
						RJBOOL loadAtStart;
				};

				#ifdef GUI_USE_WXWIDGETS
					/// The wxWidgets frame to use.
					class RADJAV_EXPORT Canvas3DFrame: public wxFrame, public GObjectBase
					{
						public:
							Canvas3DFrame(const wxString &text, const wxPoint &pos, const wxSize &size, Array<CanvasResource *> resources);

							void onClose(wxCloseEvent &evt);
							void onJSClose(wxCloseEvent &evt);
							void onJSMinimized(wxIconizeEvent &evt);

							wxOgreRenderWindow *mRenderWindow;
							Ogre::SceneManager *mSceneMgr;
							Ogre::Root *mRoot;

						protected:
							wxDECLARE_EVENT_TABLE();
					};
				#endif

				class RADJAV_EXPORT TempCanvasObj
				{
					public:
						inline TempCanvasObj()
						{
							mSceneMgr = NULL;
							mRoot = NULL;
							renderWindow = NULL;
						}

						Ogre::SceneManager *mSceneMgr;
						Ogre::Root *mRoot;
						Ogre::RenderWindow *renderWindow;
				};

				class RADJAV_EXPORT Canvas3D : public GObject
				{
					public:
						static void createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object);

						static void create(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void setFont(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getFont(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void setPosition(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getPosition(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getX(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getY(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void setSize(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getSize(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getWidth(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getHeight(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void setText(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getText(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getParent(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getAppObj(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void setVisibility(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getVisibility(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void setEnabled(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getEnabled(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void on(const v8::FunctionCallbackInfo<v8::Value> &args);

						static void createWorld(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void setWorld(const v8::FunctionCallbackInfo<v8::Value> &args);
				};
			#endif
		}
	}
#endif

