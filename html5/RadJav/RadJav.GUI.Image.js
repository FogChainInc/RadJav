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

/** @class RadJav.GUI.Image
* @extends RadJav.GUI.GObject
* An image.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.Image = (function (_super)
{
	__extends(Image, _super);

	function Image (obj, text, parent)
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
			obj.size.x = 100;
			obj.size.y = 100;
		}

		var _this = _super.call(this, obj, text, parent) || this;

		_this.type = "RadJav.GUI.Image";

		if (obj.image != null)
			obj._image = obj.image;

		/** @property {String/Object} [_image=null]
		* @protected
		* The image thats being used. If a string, it will be converted into 
		* an Image when the image is set.
		*/
		_this._image = RadJav.setDefaultValue (obj._image, null);
		_this.onCreated = function ()
			{
				if (this._image != null)
					this.setImage (this._image);
			};

		return (_this);
	}

	/** @method setImage
	* Set the image.
	* Theme Event: setImage
	* Is Theme Event Asynchronous: Yes
	* @param {String/Object} image The image to display.
	* @return {Promise} Executes the promise when the image has loaded.
	*/
	Image.prototype.setImage = function (image)
	{
		RadJav.theme.event (this.type, "setImage", this, image);
	}

	return (Image);
}(RadJav.GUI.GObject));

