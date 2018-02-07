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

/** @class RadJav.GUI.Canvas3D
* @extends RadJav.GUI.GObject
* A 3d canvas.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.Canvas3D = (function (_super)
{
	__extends(Canvas3D, _super);

	function Canvas3D (obj, text, parent)
	{
		if (obj == null)
			obj = {};

		if (typeof (obj) == "string")
		{
			var name = obj;
			obj = { name: name };
		}

		if (obj.size == null)
		{
			obj.size = new RadJav.Vector2 ();
			obj.size.x = 500;
			obj.size.y = 350;
		}

		var _this = _super.call(this, obj, text, parent) || this;

		_this.type = "RadJav.GUI.Canvas3D";

		/** @property {Mixed} [_renderer=null]
		* @protected
		* The renderer used to render the canvas.
		*/
		_this._renderer = RadJav.setDefaultValue (obj._renderer, null);
		/** @property {Number} [_rendererType=1]
		* @protected
		* The renderer type used to render the canvas.
		*/
		_this._rendererType = RadJav.setDefaultValue (obj._renderer, 1);
		/** @property {Object} [_currentCamera=null]
		* @protected
		* The current camera used to render the scene.
		*/
		_this._currentCamera = RadJav.setDefaultValue (obj._currentCamera, null);
		/** @property {Object} [_models={}]
		* @protected
		* The models that have been loaded for use. Each key is a RadJav.C3D.Model.
		*/
		_this._models = RadJav.setDefaultValue (obj._models, {});
		/** @property {Object} [_materials={}]
		* @protected
		* The materials that have been loaded for use. Each key is a RadJav.C3D.Material.
		*/
		_this._materials = RadJav.setDefaultValue (obj._materials, {});

		return (_this);
	}

	return (Canvas3D);
}(RadJav.GUI.GObject));

/** @class RadJav.GUI.Canvas3D.RendererTypes
* A 3d canvas.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.Canvas3D.RendererTypes = function ()
{
}

RadJav.GUI.Canvas3D.RendererTypes.AnyAvailable = 1;
RadJav.GUI.Canvas3D.RendererTypes.WebGL = 2;
RadJav.GUI.Canvas3D.RendererTypes.Context2D = 3;

