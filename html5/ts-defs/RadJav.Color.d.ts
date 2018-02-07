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
	/** @class RadJav.Color
	* Represents a color.
	* Available on platforms: Windows,Linux,OSX,HTML5
	*/
	export class Color
	{
		constructor (r?: Number, g?: Number, b?: Number, a?: Number);

		/** @property {Number} [r=0]
		* Red, between 0 and 1.
		*/
		r: Number;
		/** @property {Number} [g=0]
		* Green, between 0 and 1.
		*/
		g: Number;
		/** @property {Number} [b=0]
		* Blue, between 0 and 1.
		*/
		b: Number;
		/** @property {Number} [a=0]
		* Alpha, between 0 and 1.
		*/
		a: Number;

		/** @method toHex
		* Return this color as a hex string.
		* @return {String} The hex string representing the color.
		*/
		toHex (): String;

		/** @method toHTMLColor
		* Return this color as a HTML color string.
		* @return {String} The html string representing the color.
		*/
		toHTMLColor (): String;

		/** @method toHexInt
		* Return this color as a hex color integer.
		* @return {Number} The hex integer representing the color.
		*/
		toHexInt (): Number;

		static Black: Color;
		static White: Color;
		static Red: Color;
		static Green: Color;
		static Blue: Color;
	}
}

/** 
* Parse a color string.
* @param {String} str The color string to parse.
* @return {RadJav.Color} The color.
*/
declare function parseColor (str: String): RadJav.Color;

