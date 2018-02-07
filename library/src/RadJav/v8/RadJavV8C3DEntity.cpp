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
#include "v8/RadJavV8C3DEntity.h"

#include "RadJav.h"

#ifdef USE_V8
#include "v8/RadJavV8JavascriptEngine.h"

namespace RadJAV
{
	namespace C3D
	{
		#ifdef C3D_USE_OGRE
		void Entity::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
		{
			//V8_CALLBACK(object, "create", Entity::create);
			V8_CALLBACK(object, "setPosition", Entity::setPosition);
			V8_CALLBACK(object, "getPosition", Entity::getPosition);
			V8_CALLBACK(object, "yaw", Entity::yaw);
			V8_CALLBACK(object, "pitch", Entity::pitch);
			V8_CALLBACK(object, "roll", Entity::roll);
			V8_CALLBACK(object, "getX", Entity::getX);
			V8_CALLBACK(object, "getY", Entity::getY);
			V8_CALLBACK(object, "getZ", Entity::getZ);
			V8_CALLBACK(object, "getParent", Entity::getParent);
			V8_CALLBACK(object, "getAppObj", Entity::getAppObj);
			V8_CALLBACK(object, "setVisibility", Entity::setVisibility);
			V8_CALLBACK(object, "getVisibility", Entity::getVisibility);
			V8_CALLBACK(object, "on", Entity::on);
		}

		void Entity::create(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			String name = V8_JAVASCRIPT_ENGINE->v8GetString(args.This(), "name");
			v8::Handle<v8::Object> parent = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_parent");
			v8::Local<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject (args.This(), "_transform");
			RJINT x = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "x");
			RJINT y = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "y");
			RJINT z = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "z");
			RJBOOL visible = V8_JAVASCRIPT_ENGINE->v8GetBool(args.This(), "_visible");

			

			v8::Local<v8::Function> _guiFinishedCreatingGObject = V8_JAVASCRIPT_ENGINE->v8GetFunction(V8_RADJAV, "_guiFinishedCreatingGObject");
			v8::Local<v8::Object> promise = V8_JAVASCRIPT_ENGINE->createPromise(args.This(), _guiFinishedCreatingGObject);

			args.GetReturnValue().Set(promise);
		}

		void Entity::setPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RDECIMAL x = 0;
			RDECIMAL y = 0;
			RDECIMAL z = 0;

			if (args.Length() > 1)
			{
				x = V8_JAVASCRIPT_ENGINE->v8ParseDecimal(args[0]);
				y = V8_JAVASCRIPT_ENGINE->v8ParseDecimal(args[1]);
				z = V8_JAVASCRIPT_ENGINE->v8ParseDecimal(args[2]);
			}
			else
			{
				v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast (args[0]);
				x = V8_JAVASCRIPT_ENGINE->v8GetDecimal(obj, "x");
				y = V8_JAVASCRIPT_ENGINE->v8GetDecimal(obj, "y");
				z = V8_JAVASCRIPT_ENGINE->v8GetDecimal(obj, "z");
			}

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			v8::Local<v8::Value> *args2 = RJNEW v8::Local<v8::Value>[3];
			args2[0] = v8::Number::New (V8_JAVASCRIPT_ENGINE->isolate, x);
			args2[1] = v8::Number::New (V8_JAVASCRIPT_ENGINE->isolate, y);
			args2[2] = v8::Number::New (V8_JAVASCRIPT_ENGINE->isolate, z);
			V8_JAVASCRIPT_ENGINE->v8CallFunction(transform, "setPosition", 3, args2);

			DELETE_ARRAY(args2);

			Ogre::SceneNode *node = (Ogre::SceneNode *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_c3dObj");
			node->setPosition(x, y, z);
		}

		void Entity::getPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RDECIMAL x = 0;
			RDECIMAL y = 0;
			RDECIMAL z = 0;

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			x = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "x");
			y = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "y");
			z = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "z");

			Ogre::SceneNode *node = (Ogre::SceneNode *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_c3dObj");
			Ogre::Vector3 pos = node->getPosition();
			x = pos.x;
			y = pos.y;
			z = pos.z;

			v8::Local<v8::Object> vector3 = V8_JAVASCRIPT_ENGINE->v8GetObject(V8_RADJAV, "Vector3");
			v8::Local<v8::Object> vector3obj = V8_JAVASCRIPT_ENGINE->v8CallAsConstructor(vector3, 0, NULL);
			vector3obj->Set(String ("x").toV8String (V8_JAVASCRIPT_ENGINE->isolate), v8::Number::New (V8_JAVASCRIPT_ENGINE->isolate, x));
			vector3obj->Set(String ("y").toV8String (V8_JAVASCRIPT_ENGINE->isolate), v8::Number::New (V8_JAVASCRIPT_ENGINE->isolate, y));
			vector3obj->Set(String ("z").toV8String (V8_JAVASCRIPT_ENGINE->isolate), v8::Number::New (V8_JAVASCRIPT_ENGINE->isolate, z));

			args.GetReturnValue().Set(vector3obj);
		}

		void Entity::yaw(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RDECIMAL value = V8_JAVASCRIPT_ENGINE->v8ParseDecimal(args[0]);

			Ogre::SceneNode *node = (Ogre::SceneNode *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_c3dObj");
			node->yaw(Ogre::Degree (value));
		}

		void Entity::pitch(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RDECIMAL value = V8_JAVASCRIPT_ENGINE->v8ParseDecimal(args[0]);

			Ogre::SceneNode *node = (Ogre::SceneNode *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_c3dObj");
			node->pitch(Ogre::Degree(value));
		}

		void Entity::roll(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RDECIMAL value = V8_JAVASCRIPT_ENGINE->v8ParseDecimal(args[0]);

			Ogre::SceneNode *node = (Ogre::SceneNode *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_c3dObj");
			node->roll(Ogre::Degree(value));
		}

		void Entity::getX(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast (ret.Get());

			args.GetReturnValue().Set (V8_JAVASCRIPT_ENGINE->v8GetDecimal(obj, "x"));
		}

		void Entity::getY(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y"));
		}

		void Entity::getZ(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "z"));
		}

		void Entity::getParent(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Handle<v8::Object> obj = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_parent");
			args.GetReturnValue().Set(obj);
		}

		void Entity::getAppObj(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Handle<v8::External> ext = v8::Handle<v8::External>::Cast(
					args.This()->Get(String ("_appObj").toV8String(V8_JAVASCRIPT_ENGINE->isolate)));
			args.GetReturnValue().Set(ext);
		}

		void Entity::setVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8ParseBool(args[0]);
			V8_JAVASCRIPT_ENGINE->v8SetBool(args.This(), "_visible", value);

			
		}

		void Entity::getVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8GetBool(args.This(), "_visible");

			

			args.GetReturnValue().Set(v8::Boolean::New (V8_JAVASCRIPT_ENGINE->isolate, value));
		}

		void Entity::on(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			String event = parseV8Value (args[0]);
			v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast (args[1]);

			
		}
		#endif
	}
}
#endif

