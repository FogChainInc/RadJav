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

declare namespace RadJav
{
	/** @class RadJav.Vector4
	* A Vector4 class.
	* Available on platforms: Windows,Linux,OSX,HTML5
	*/
	class Vector4
	{
		constructor (x: Number, y: Number, z: Number, w: Number);

		/** @property {Number} [x=0]
		* The X component.
		*/
		x: Number;
		/** @property {Number} [y=0]
		* The Y component.
		*/
		y: Number;
		/** @property {Number} [z=0]
		* The Z component.
		*/
		z: Number;
		/** @property {Number} [w=0]
		* The W component.
		*/
		w: Number;

		/** @method toString
		* Convert this object to a string.
		* @return {String} The string representing this object.
		*/
		toString (): String;
	}
}

declare function parseVector4 (str: String): RadJav.Vector4;

