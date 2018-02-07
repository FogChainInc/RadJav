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
RadJav.GUI.GObject = (function ()
{
	function GObject (obj, text, parent, beforeCreatedChild)
	{
		if (obj == null)
			obj = new Object ();

		if (typeof (obj) == "string")
		{
			var tempObj = obj;
			obj = {};
			obj.name = tempObj;
		}

		if (beforeCreatedChild == undefined)
			beforeCreatedChild = null;

		if (text != null)
			obj._text = text;

		if (parent != null)
			obj._parent = parent;

		if (obj.text != null)
			obj._text = obj.text;

		if (obj.cursor != null)
			obj._cursor = obj.cursor;

		if (obj.visible != null)
			obj._visible = obj.visible;

		if (obj.visibility != null)
			obj._visible = obj.visibility;

		if (obj.zIndex != null)
			obj._zIndex = obj.zIndex;

		if (obj.font != null)
			obj._font = new RadJav.Font (obj.font);

		if (obj.parent != null)
			obj._parent = obj.parent;

		/** @property {String} [name=""]
		* The name of this object.
		*/
		this.name = RadJav.setDefaultValue (obj.name, "");
		/** @property {String} [type=""]
		* The type of object.
		*/
		this.type = RadJav.setDefaultValue (obj.type, "");
		/** @property {RadJav.Rectangle} [_transform=new Rectangle ()]
		* @protected
		* The transform of this object.
		*/
		this._transform = RadJav.setDefaultValue (obj._transform, new RadJav.Rectangle ());
		/** @property {Boolean} [_visible=true]
		* @protected
		* The visibility of the object.
		*/
		this._visible = RadJav.setDefaultValue (obj._visible, true);
		/** @property {Number} [_zIndex=0]
		* @protected
		* The initial z-index of this object. The higher the value the more "on top" the 
		* object will be compared to other objects.
		*/
		this._zIndex = RadJav.setDefaultValue (obj._zIndex, 0);
		/** @property {String} [_text=""]
		* @protected
		* The text associated with this object.
		*/
		this._text = RadJav.setDefaultValue (obj._text, "");
		/** @property {RadJav.Font} [_font=new RadJav.Font ()]
		* @protected
		* The font associated with this object.
		*/
		this._font = RadJav.setDefaultValue (obj._font, new RadJav.Font ());
		/** @property {String} [_cursor="default"]
		* @protected
		* The cursor to use.
		*/
		this._cursor = RadJav.setDefaultValue (obj._cursor, "default");
		/** @property {Mixed} [_parent=null]
		* @protected
		* The parent of this object.
		*/
		this._parent = RadJav.setDefaultValue (obj._parent, null);
		/** @property {RadJav.GUI.GObject[]} [_children=[]]
		* @protected
		* This object's children.
		*/
		this._children = RadJav.setDefaultValue (obj._children, []);
		/** @property {Mixed} [_html=null]
		* @protected
		* The native web object associated with this object.
		*/
		this._html = RadJav.setDefaultValue (obj._html, null);
		/** @property {Mixed} [_appObj=null]
		* @protected
		* The native os gui object associated with this object.
		*/
		this._appObj = RadJav.setDefaultValue(obj._appObj, null);
		/** @property {Object} [createOnPlatforms=null]
		* @protected
		* Create this object only on certain platforms. All platforms will be enabled 
		* by default, only the ones listed in each key will either be created or 
		* denied by their boolean value. Ex: { "WIN32": true, "HTML5": false }.
		* Possible keys are: 
		* WIN32
		* WIN64
		* LINUX32
		* LINUX64
		* MACOSX32
		* MACOSX64
		* HTML5
		*/
		this.createOnPlatforms = RadJav.setDefaultValue(obj.createOnPlatforms, null);
		/** @event [onBeforeChildCreated=null]
		* The function to execute before a child is created.
		*/
		this.onBeforeChildCreated = RadJav.setDefaultValue(obj.onBeforeChildCreated, null);
		/** @event [onCreated=null]
		* The function to execute once the object has been created.
		*/
		this.onCreated = RadJav.setDefaultValue(obj.onCreated, null);
		/** @event [_events={}]
		* Events to call.
		*/
		this._events = RadJav.setDefaultValue(obj._events, {});

		//this._text = this._text.replaceAll (" ", "&nbsp;");

		//if (this._parent != null)
			//this._parent._children.push (this);

		if (obj.events != null)
			this._events = obj.events;

		if (obj.click != null)
			this._events.click = obj.click;

		if (obj.children != null)
		{
			for (var iIdx = 0; iIdx < obj.children.length; iIdx++)
			{
				var obj2 = obj.children[iIdx];
				var createObject = true;

				if (this.onBeforeChildCreated != null)
				{
					var result = this.onBeforeChildCreated (obj2, parent);

					if (result != null)
						createObject = result;
				}

				if (createObject == true)
					this._children.push (obj2);
			}
		}

		if (obj.position != null)
		{
			var position = new RadJav.Vector2 ();

			if (typeof (obj.position) == "string")
				position = RadJav.Vector2.parseVector2 (obj.position);
			else
				position = obj.position;

			this._transform.setPosition (position);
		}

		if (obj.size != null)
		{
			var size = new RadJav.Vector2 ();

			if (typeof (obj.size) == "string")
				size = RadJav.Vector2.parseVector2 (obj.size);
			else
				size = obj.size;

			this._transform.setSize (size);
		}
	}

	GObject.prototype.show = function()
	{
		this.setVisibility(true);
	}

	GObject.prototype.hide = function()
	{
		this.setVisibility(false);
	}

	return (GObject);
} ());

