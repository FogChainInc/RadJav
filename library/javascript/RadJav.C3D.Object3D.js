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

/** @class RadJav.C3D.Object3D
* The base 3D object.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.C3D.Object3D = (function ()
{
	function Object3D (canvas3d, obj, parent)
	{
		if (obj == null)
			obj = new Object ();

		if (typeof (obj) == "string")
		{
			var tempObj = obj;
			obj = {};
			obj.name = tempObj;
		}

		if (parent != null)
			obj._parent = parent;

		if (obj.visible != null)
			obj._visible = obj.visible;

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
		/** @property {Boolean} [_visible=true]
		* @protected
		* The visibility of the object.
		*/
		this._visible = RadJav.setDefaultValue (obj._visible, true);
		/** @property {Mixed} [_parent=null]
		* @protected
		* The parent of this object.
		*/
		this._parent = RadJav.setDefaultValue (obj._parent, null);
		/** @property {RadJav.GUI.Canvas3D} [_canvas3D=canvas3d]
		* @protected
		* The canvas 3d object used to display this object.
		*/
		this._canvas3D = canvas3d;
		/** @property {Mixed} [_c3dObj=null]
		* @protected
		* The 3d object associated with this object.
		*/
		this._c3dObj = RadJav.setDefaultValue (obj._c3dObj, null);
		/** @property {RadJav.C3D.Transform} [_transform=new RadJav.C3D.Transform (this)]
		* @protected
		* This object's transform.
		*/
		this._transform = RadJav.setDefaultValue (obj._transform, new RadJav.C3D.Transform (this));
	}

	function show ()
	{
		this.setVisibility(true);
	}

	function hide ()
	{
		this.setVisibility(false);
	}

	return (Object3D);
} ());

