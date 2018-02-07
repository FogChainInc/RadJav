/*
	MIT-LICENSE
	Copyright (c) 2017-2018 Higher Edge Software, LLC

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

declare namespace RadJav.GUI
{
	/** @class RadJav.GUI.Image
	* @extends RadJav.GUI.GObject
	* An image.
	* Available on platforms: Windows,Linux,OSX,HTML5
	*/
	class Image extends GObject
	{
		constructor (obj?: Object, text?: String, parent?: GObject);

		/** @property {String/Image} [_image=null]
		* @protected
		* The image thats being used. If a string, it will be converted into 
		* an Image when the image is set.
		*/
		protected _image: String | any;

		onCreated: (() => void);

		/** @method setImage
		* Set the image.
		* Theme Event: setImage
		* Is Theme Event Asynchronous: Yes
		* @param {String/Image} image The image to display.
		* @return {Promise} Executes the promise when the image has loaded.
		*/
		setImage (image: String | any): void;
	}
}

