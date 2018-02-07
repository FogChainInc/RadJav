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
#include "v8/RadJavV8GUICanvas3D.h"

#include "RadJav.h"

#ifdef USE_V8
#include "v8/RadJavV8JavascriptEngine.h"

#ifdef C3D_USE_OGRE
	#include <OgreResourceManager.h>
	#include <OgreMaterialManager.h>
	#include <OgreMovableObject.h>
	#include <OgreSceneQuery.h>
#endif

namespace RadJAV
{
	namespace GUI
	{
		#ifdef C3D_USE_OGRE
		#ifdef GUI_USE_WXWIDGETS
			Canvas3DFrame::Canvas3DFrame(const wxString &text, const wxPoint &pos, const wxSize &size, Array<CanvasResource *> resources)
				: wxFrame(NULL, wxID_ANY, text, pos, size)
			{
				mRenderWindow = NULL;
				mSceneMgr = NULL;
				mRoot = NULL;

				V8_JAVASCRIPT_ENGINE->start3DEngine();
				mRoot = V8_JAVASCRIPT_ENGINE->mRoot;

				for (RJUINT iIdx = 0; iIdx < resources.size(); iIdx++)
				{
					CanvasResource *resource = resources.at(iIdx);
					Ogre::ResourceGroupManager::getSingleton().addResourceLocation(resource->name, resource->type, resource->group);
					Ogre::ResourceGroupManager::getSingleton().initialiseResourceGroup(resource->group);

					if (resource->loadAtStart == true)
					{
						Ogre::ResourceManager::ResourceMapIterator rmiIterator =
							Ogre::MaterialManager::getSingletonPtr()->getResourceIterator();

						while (rmiIterator.hasMoreElements() == true)
						{
							Ogre::ResourceManager::ResourceHandleMap::mapped_type mtResource = rmiIterator.getNext();
							std::string groupName = mtResource->getGroup();

							if (groupName.find(resource->group) != std::string::npos)
							{
								mtResource->load();
								mtResource->touch();
							}
						}
					}
				}
			}

			void Canvas3DFrame::onClose(wxCloseEvent &evt)
			{
				if (IsTopLevel() == true)
				{
					V8_JAVASCRIPT_ENGINE->exit(0);

					return;
				}

				Destroy();
			}

			void Canvas3DFrame::onJSClose(wxCloseEvent &evt)
			{
				v8::Persistent<v8::Value> *pevent = (v8::Persistent<v8::Value> *)evt.GetEventUserData();
				v8::Local<v8::Value> result = executeEvent(pevent);

				if (result.IsEmpty() == false)
				{
					if ((result->IsNull() == false) && (result->IsUndefined() == false))
					{
						v8::Local<v8::Boolean> change = v8::Local<v8::Boolean>::Cast(result);

						if (change->Value() == false)
							evt.Veto();
					}
				}
			}

			void Canvas3DFrame::onJSMinimized(wxIconizeEvent &evt)
			{
				v8::Persistent<v8::Value> *pevent = (v8::Persistent<v8::Value> *)evt.GetEventUserData();
				executeEvent(pevent);
			}
		#endif

		void Canvas3D::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
		{
			V8_CALLBACK(object, "create", Canvas3D::create);
			V8_CALLBACK(object, "setFont", Canvas3D::setFont);
			V8_CALLBACK(object, "getFont", Canvas3D::getFont);
			V8_CALLBACK(object, "setPosition", Canvas3D::setPosition);
			V8_CALLBACK(object, "getPosition", Canvas3D::getPosition);
			V8_CALLBACK(object, "getX", Canvas3D::getX);
			V8_CALLBACK(object, "getY", Canvas3D::getY);
			V8_CALLBACK(object, "setSize", Canvas3D::setSize);
			V8_CALLBACK(object, "getSize", Canvas3D::getSize);
			V8_CALLBACK(object, "getWidth", Canvas3D::getWidth);
			V8_CALLBACK(object, "getHeight", Canvas3D::getHeight);
			V8_CALLBACK(object, "setText", Canvas3D::setText);
			V8_CALLBACK(object, "getText", Canvas3D::getText);
			V8_CALLBACK(object, "getParent", Canvas3D::getParent);
			V8_CALLBACK(object, "getAppObj", Canvas3D::getAppObj);
			V8_CALLBACK(object, "setVisibility", Canvas3D::setVisibility);
			V8_CALLBACK(object, "getVisibility", Canvas3D::getVisibility);
			V8_CALLBACK(object, "setEnabled", Canvas3D::setEnabled);
			V8_CALLBACK(object, "getEnabled", Canvas3D::getEnabled);
			V8_CALLBACK(object, "on", Canvas3D::on);

			V8_CALLBACK(object, "createWorld", Canvas3D::createWorld);
			V8_CALLBACK(object, "setWorld", Canvas3D::setWorld);
		}

		void Canvas3D::create(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			String name = V8_JAVASCRIPT_ENGINE->v8GetString(args.This(), "name");
			String text = V8_JAVASCRIPT_ENGINE->v8GetString(args.This(), "_text");
			v8::Handle<v8::Object> parent = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_parent");
			v8::Local<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			RJINT x = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "x");
			RJINT y = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "y");
			RJINT width = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "width");
			RJINT height = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "height");
			RJBOOL visible = V8_JAVASCRIPT_ENGINE->v8GetBool(args.This(), "_visible");

			#ifdef GUI_USE_WXWIDGETS
				/*Array<CanvasResource *> resources;
				Canvas3DFrame *object = RJNEW Canvas3DFrame(text, wxPoint(x, y), wxSize(width, height), resources);
				RadJav::app->SetTopWindow(object);
				object->Show(visible);
				RadJav::app->SetActive(visible, object);

				object->mRenderWindow = RJNEW wxOgreRenderWindow(object->mRoot, object, wxID_ANY);*/

				V8_JAVASCRIPT_ENGINE->start3DEngine();
				Ogre::RenderWindow *rwindow = V8_JAVASCRIPT_ENGINE->mRoot->initialise(true, text);

				TempCanvasObj *object = RJNEW TempCanvasObj();
				object->mRoot = V8_JAVASCRIPT_ENGINE->mRoot;
				object->renderWindow = rwindow;
				V8_JAVASCRIPT_ENGINE->v8SetExternal(args.This(), "_appObj", object);
			#endif

			//setupFont(args.This());

			v8::Local<v8::Function> _guiFinishedCreatingGObject = V8_JAVASCRIPT_ENGINE->v8GetFunction(V8_RADJAV, "_guiFinishedCreatingGObject");
			v8::Local<v8::Object> promise = V8_JAVASCRIPT_ENGINE->createPromise(args.This(), _guiFinishedCreatingGObject);

			args.GetReturnValue().Set(promise);
		}

		void Canvas3D::setFont(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			V8_JAVASCRIPT_ENGINE->v8SetObject(args.This(), "_font", v8::Local<v8::Object>::Cast(args[0]));

			setupFont(args.This());
		}

		void Canvas3D::getFont(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::Object> font = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_font");

			#ifdef GUI_USE_WXWIDGETS
				Canvas3DFrame *object = (Canvas3DFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				Canvas3DFrame *obj = (Canvas3DFrame *)object->GetParent();
				wxFont wfont = obj->GetFont();

				if (wfont.IsOk() == true)
				{
					String fontFamily = parsewxString(wfont.GetFaceName());
					wxColor color = obj->GetForegroundColour();
					RJNUMBER r = color.Red() / 255;
					RJNUMBER g = color.Green() / 255;
					RJNUMBER b = color.Blue() / 255;
					RJNUMBER a = color.Alpha() / 255;
					RJINT size = wfont.GetPixelSize().x;
					RJBOOL underlined = false;
					RJBOOL bold = false;
					RJBOOL italic = false;

					if (wfont.GetUnderlined() == true)
						underlined = true;

					if (wfont.GetWeight() == wxFontWeight::wxFONTWEIGHT_BOLD)
						bold = true;

					if (wfont.GetStyle() == wxFontStyle::wxFONTSTYLE_ITALIC)
						italic = true;

					V8_JAVASCRIPT_ENGINE->v8SetString(font, "fontFamily", fontFamily);

					v8::Local<v8::Object> ocolor = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "color");
					V8_JAVASCRIPT_ENGINE->v8SetNumber(ocolor, "r", r);
					V8_JAVASCRIPT_ENGINE->v8SetNumber(ocolor, "g", g);
					V8_JAVASCRIPT_ENGINE->v8SetNumber(ocolor, "b", b);
					V8_JAVASCRIPT_ENGINE->v8SetNumber(ocolor, "a", a);

					V8_JAVASCRIPT_ENGINE->v8SetNumber(font, "size", size);
					V8_JAVASCRIPT_ENGINE->v8SetBool(font, "underline", underlined);
					V8_JAVASCRIPT_ENGINE->v8SetBool(font, "bold", bold);
					V8_JAVASCRIPT_ENGINE->v8SetBool(font, "italic", italic);
				}
			#endif

			args.GetReturnValue().Set(font);
		}

		void Canvas3D::setPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
#ifdef GUI_USE_WXWIDGETS
			Canvas3DFrame *object = (Canvas3DFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			Canvas3DFrame *obj = NULL;

			if (object != NULL)
				obj = (Canvas3DFrame *)object->GetParent();
#endif
			RJINT x = 0;
			RJINT y = 0;

			if (args.Length() > 1)
			{
				x = V8_JAVASCRIPT_ENGINE->v8ParseInt(args[0]);
				y = V8_JAVASCRIPT_ENGINE->v8ParseInt(args[1]);
			}
			else
			{
				v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(args[0]);
				x = V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x");
				y = V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y");
			}

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			v8::Local<v8::Value> *args2 = RJNEW v8::Local<v8::Value>[2];
			args2[0] = v8::Number::New(args.GetIsolate(), x);
			args2[1] = v8::Number::New(args.GetIsolate(), y);
			V8_JAVASCRIPT_ENGINE->v8CallFunction(transform, "setPosition", 2, args2);

			DELETE_ARRAY(args2);

#ifdef GUI_USE_WXWIDGETS
			if (obj != NULL)
				obj->SetPosition(wxPoint(x, y));
#endif
		}

		void Canvas3D::getPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
#ifdef GUI_USE_WXWIDGETS
			Canvas3DFrame *object = (Canvas3DFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			Canvas3DFrame *obj = (Canvas3DFrame *)object->GetParent();
#endif
			RJINT x = 0;
			RJINT y = 0;

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			x = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "x");
			y = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "y");

#ifdef GUI_USE_WXWIDGETS
			if (obj != NULL)
			{
				wxPoint pos = obj->GetPosition();
				x = pos.x;
				y = pos.y;
			}
#endif

			v8::Local<v8::Object> vector2 = V8_JAVASCRIPT_ENGINE->v8GetObject(V8_RADJAV, "Vector2");
			v8::Local<v8::Object> vector2obj = V8_JAVASCRIPT_ENGINE->v8CallAsConstructor(vector2, 0, NULL);
			vector2obj->Set(String("x").toV8String(args.GetIsolate()), v8::Number::New(args.GetIsolate(), x));
			vector2obj->Set(String("y").toV8String(args.GetIsolate()), v8::Number::New(args.GetIsolate(), y));

			args.GetReturnValue().Set(vector2obj);
		}

		void Canvas3D::getX(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x"));
		}

		void Canvas3D::getY(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y"));
		}

		void Canvas3D::setSize(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
#ifdef GUI_USE_WXWIDGETS
			Canvas3DFrame *object = (Canvas3DFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			Canvas3DFrame *obj = NULL;

			if (object != NULL)
				obj = (Canvas3DFrame *)object->GetParent();
#endif
			RJINT x = 0;
			RJINT y = 0;

			if (args.Length() > 1)
			{
				x = V8_JAVASCRIPT_ENGINE->v8ParseInt(args[0]);
				y = V8_JAVASCRIPT_ENGINE->v8ParseInt(args[1]);
			}
			else
			{
				v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(args[0]);
				x = V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x");
				y = V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y");
			}

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			v8::Local<v8::Value> *args2 = RJNEW v8::Local<v8::Value>[2];
			args2[0] = v8::Number::New(args.GetIsolate(), x);
			args2[1] = v8::Number::New(args.GetIsolate(), y);
			V8_JAVASCRIPT_ENGINE->v8CallFunction(transform, "setSize", 2, args2);

			DELETE_ARRAY(args2);

#ifdef GUI_USE_WXWIDGETS
			if (obj != NULL)
				obj->SetSize(x, y);
#endif
		}

		void Canvas3D::getSize(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
#ifdef GUI_USE_WXWIDGETS
			Canvas3DFrame *object = (Canvas3DFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			Canvas3DFrame *obj = (Canvas3DFrame *)object->GetParent();
#endif
			RJINT x = 0;
			RJINT y = 0;

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			x = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "width");
			y = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "height");

#ifdef GUI_USE_WXWIDGETS
			if (obj != NULL)
			{
				wxSize size = obj->GetSize();
				x = size.GetWidth();
				y = size.GetHeight();
			}
#endif

			v8::Local<v8::Object> vector2 = V8_JAVASCRIPT_ENGINE->v8GetObject(V8_RADJAV, "Vector2");
			v8::Local<v8::Object> vector2obj = V8_JAVASCRIPT_ENGINE->v8CallAsConstructor(vector2, 0, NULL);
			vector2obj->Set(String("x").toV8String(args.GetIsolate()), v8::Number::New(args.GetIsolate(), x));
			vector2obj->Set(String("y").toV8String(args.GetIsolate()), v8::Number::New(args.GetIsolate(), y));

			args.GetReturnValue().Set(vector2obj);
		}

		void Canvas3D::getWidth(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getSize(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x"));
		}

		void Canvas3D::getHeight(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getSize(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y"));
		}

		void Canvas3D::setText(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::String> val = v8::Local<v8::String>::Cast(args[0]);
			String str = parseV8Value(val);
			V8_JAVASCRIPT_ENGINE->v8SetString(args.This(), "_text", str);

#ifdef GUI_USE_WXWIDGETS
			Canvas3DFrame *object = (Canvas3DFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			Canvas3DFrame *obj = NULL;

			if (object != NULL)
			{
				obj = (Canvas3DFrame *)object->GetParent();
				obj->SetTitle(str.towxString());
			}
#endif
		}

		void Canvas3D::getText(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			String text = V8_JAVASCRIPT_ENGINE->v8GetString(args.This(), "_text");

#ifdef GUI_USE_WXWIDGETS
			Canvas3DFrame *object = (Canvas3DFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			Canvas3DFrame *obj = (Canvas3DFrame *)object->GetParent();
			text = parsewxString(obj->GetTitle());
#endif

			args.GetReturnValue().Set(text.toV8String(args.GetIsolate()));
		}

		void Canvas3D::getParent(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Handle<v8::Object> obj = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_parent");
			args.GetReturnValue().Set(obj);
		}

		void Canvas3D::getAppObj(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Handle<v8::External> ext = v8::Handle<v8::External>::Cast(
				args.This()->Get(String("_appObj").toV8String(args.GetIsolate())));
			args.GetReturnValue().Set(ext);
		}

		void Canvas3D::setVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8ParseBool(args[0]);
			V8_JAVASCRIPT_ENGINE->v8SetBool(args.This(), "_visible", value);

#ifdef GUI_USE_WXWIDGETS
			Canvas3DFrame *object = (Canvas3DFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			Canvas3DFrame *obj = NULL;

			if (object != NULL)
			{
				obj = (Canvas3DFrame *)object->GetParent();

				if (value == true)
					obj->Show();
				else
					obj->Hide();
			}
#endif
		}

		void Canvas3D::getVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8GetBool(args.This(), "_visible");

#ifdef GUI_USE_WXWIDGETS
			Canvas3DFrame *object = (Canvas3DFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			Canvas3DFrame *obj = (Canvas3DFrame *)object->GetParent();

			value = obj->IsVisible();
#endif

			args.GetReturnValue().Set(v8::Boolean::New(args.GetIsolate(), value));
		}

		void Canvas3D::setEnabled(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8ParseBool(args[0]);

#ifdef GUI_USE_WXWIDGETS
			Canvas3DFrame *object = (Canvas3DFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			Canvas3DFrame *obj = NULL;

			if (object != NULL)
			{
				obj = (Canvas3DFrame *)object->GetParent();

				if (value == true)
					obj->Enable();
				else
					obj->Disable();
			}
#endif
		}

		void Canvas3D::getEnabled(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = false;

#ifdef GUI_USE_WXWIDGETS
			Canvas3DFrame *object = (Canvas3DFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			Canvas3DFrame *obj = (Canvas3DFrame *)object->GetParent();
			value = obj->IsEnabled();
#endif

			args.GetReturnValue().Set(v8::Boolean::New(args.GetIsolate(), value));
		}

		void Canvas3D::on(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			String event = parseV8Value(args[0]);
			v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast(args[1]);

			#ifdef GUI_USE_WXWIDGETS
				Canvas3DFrame *object = (Canvas3DFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				Canvas3DFrame *obj = (Canvas3DFrame *)object->GetParent();

				object->addNewEvent(event, obj, func);

				if (event == "close")
				{
					v8::Persistent<v8::Value> *pevent = obj->createEvent(event, func);
					obj->Connect(wxEVT_CLOSE_WINDOW, wxCloseEventHandler(Canvas3DFrame::onJSClose), (wxObject *)pevent);
				}

				if (event == "minimize")
				{
					v8::Persistent<v8::Value> *pevent = obj->createEvent(event, func);
					obj->Connect(wxEVT_ICONIZE, wxIconizeEventHandler(Canvas3DFrame::onJSMinimized), (wxObject *)pevent);
				}
			#endif
		}

		void Canvas3D::createWorld(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			String name = "";

			if (args.Length () > 0)
				name = parseV8Value(args[0]);

			//Canvas3DFrame *object = (Canvas3DFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			TempCanvasObj *object = (TempCanvasObj *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			Ogre::SceneManager *sceneMgr = NULL;
			
			if (name == "")
				sceneMgr = object->mRoot->createSceneManager(Ogre::ST_GENERIC);
			else
				sceneMgr = object->mRoot->createSceneManager(name);

			v8::Local<v8::Object> C3D = V8_JAVASCRIPT_ENGINE->v8GetObject(V8_RADJAV, "C3D");
			v8::Local<v8::Object> world = V8_JAVASCRIPT_ENGINE->v8GetObject(C3D, "World");
			v8::Local<v8::Object> newWorld = V8_JAVASCRIPT_ENGINE->v8CallAsConstructor(world, 0, NULL);
			V8_JAVASCRIPT_ENGINE->v8SetExternal(newWorld, "_sceneManager", sceneMgr);
			V8_JAVASCRIPT_ENGINE->v8SetExternal(newWorld, "_renderWindow", object->renderWindow);

			args.GetReturnValue().Set(newWorld);
		}

		void Canvas3D::setWorld(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::Object> world = v8::Local<v8::Object>::Cast (args[0]);

			//Canvas3DFrame *object = (Canvas3DFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			TempCanvasObj *object = (TempCanvasObj *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			Ogre::SceneManager *sceneMgr = (Ogre::SceneManager *)V8_JAVASCRIPT_ENGINE->v8GetExternal(world, "_sceneManager");
			object->mSceneMgr = sceneMgr;
		}
	}
	#endif
}

	#ifdef GUI_USE_WXWIDGETS
		wxBEGIN_EVENT_TABLE(RadJAV::GUI::Canvas3DFrame, wxFrame)
		EVT_CLOSE(RadJAV::GUI::Canvas3DFrame::onClose)
		wxEND_EVENT_TABLE()
	#endif
#endif

