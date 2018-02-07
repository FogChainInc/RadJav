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
#include "v8/RadJavV8C3DObject3D.h"

#include "RadJav.h"

#ifdef USE_V8
#include "v8/RadJavV8JavascriptEngine.h"

namespace RadJAV
{
	namespace C3D
	{
		void Object3D::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
		{
			V8_CALLBACK(object, "_createC3DObj", Object3D::_createC3DObj);
		}

		void Object3D::_createC3DObj(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void Object3D::create(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void Object3D::setPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void Object3D::getPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void Object3D::getX(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void Object3D::getY(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void Object3D::getZ(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void Object3D::getParent(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void Object3D::getAppObj(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void Object3D::setVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void Object3D::getVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void Object3D::on(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		v8::Persistent<v8::Value> *Object3DBase::createEvent(String event, v8::Local<v8::Function> function)
		{
			v8::Persistent<v8::Value> *persistent = RJNEW v8::Persistent<v8::Value>();
			persistent->Reset(V8_JAVASCRIPT_ENGINE->isolate, function);

			auto found = events.find (event);
			auto end = events.end();

			if (found != end)
			{
				v8::Persistent<v8::Value> *evt = events.at(event);
				DELETE_OBJ(evt);

				events.erase(event);
			}

			events.insert(HashMapPair<String, v8::Persistent<v8::Value> *> (event, persistent));

			return (persistent);
		}

		#ifdef C3D_USE_OGRE
		void Object3DBase::addNewEvent(String event, Ogre::MovableObject *object, v8::Local<v8::Function> func)
		{
		}
		#endif

		v8::Local<v8::Value> Object3DBase::executeEvent(v8::Persistent<v8::Value> *pevent, RJINT numArgs, v8::Local<v8::Value> *args)
		{
			v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast(pevent->Get(V8_JAVASCRIPT_ENGINE->isolate));
			v8::Local<v8::Value> result;

			if (V8_JAVASCRIPT_ENGINE->v8IsNull(func) == false)
				result = func->Call(V8_JAVASCRIPT_ENGINE->globalContext->Global(), numArgs, args);

			return (result);
		}
	}
}
#endif

