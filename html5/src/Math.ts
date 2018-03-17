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

/** @class Math
* The math class.
*/
interface Math
{
	inv180: number;
	invPI: number;

	map(value: number, start1: number, stop1: number, start2: number, stop2: number): number;
	sinh(arg: number): number;
	cosh (arg: number): number;
	tanh (arg: number): number;
	log10 (arg: number): number;
	clamp (x: number, a: number, b: number): number;
	degreesToRadians (degrees: number): number;
	radiansToDegrees (radians: number): number;
	randomRange (min: number, max: number): number;
}

/** @property {Number} [inv180=(1 / 180)]
* @static
* The value of 1 / 180.
*/
Math.inv180 = 1 / 180;

/** @property {Number} [invPI=(1 / this.PI)]
* @static
* The value of 1 / Math.PI.
*/
Math.invPI = 1 / this.PI;

/** @method map
* @static
* Map a value.
*/
Math.map = function (value: number, start1: number, stop1: number, start2: number, stop2: number): number {
	return (start2 + (stop2 - start2) * (value - start1) / (stop1 - start1));
}

/** @method sinh
* @static
* Get a sinh value.
*/
Math.sinh = function (arg: number): number {
	// http://kevin.vanzonneveld.net
	// +   original by: Onno Marsman
	return (this.exp(arg) - this.exp(-arg)) / 2;
}

/** @method cosh
* @static
* Get a cosh value.
*/
Math.cosh = function (arg: number): number {
	// http://kevin.vanzonneveld.net
	// +   original by: Onno Marsman
	return (this.exp(arg) + Math.exp(-arg)) / 2;
}

/** @method tanh
* @static
* Get a tanh value.
*/
Math.tanh = function (arg: number): number {
	// http://kevin.vanzonneveld.net
	// +   original by: Onno Marsman
	return (this.exp(arg) - this.exp(-arg)) / (this.exp(arg) + this.exp(-arg));
}

/** @method log10
* @static
* Get a log value.
*/
Math.log10 = function (arg: number): number  {
	// http://kevin.vanzonneveld.net
	// +   original by: Philip Peterson
	// +   improved by: Onno Marsman
	// +   improved by: Tod Gentille
	// +   improved by: Brett Zamir (http://brett-zamir.me)
	return this.log(arg) / 2.302585092994046; // Math.LN10
}

/** @method clamp
* @static
* Clamp a value.
*/
Math.clamp = function (x: number, a: number, b: number): number {
	var dReturn = 0;

	if (x < a)
		dReturn = a;
	else
	{
		if (x > b)
			dReturn = b;
		else
			dReturn = x;
	}

	return (dReturn);
}

/** @method degreesToRadians
* @static
* Convert degrees to radians.
* @param {Number} degrees The degrees value to convert.
* @return {Number} The radians.
*/
Math.degreesToRadians = function (degrees: number): number {
	return (degrees * (this.PI * this.inv180));
}

/** @method radiansToDegrees
* @static
* Convert radians to degrees.
* @param {Number} radians The radians value to convert.
* @return {Number} The degrees.
*/
Math.radiansToDegrees = function (radians: number): number {
	return (radians * (180 * this.invPI));
}

/** @method randomRange
* @static
* Get a random number within a range.
* @param {Number} min The minimum value.
* @param {Number} max The maximum value.
* @return {Number} The random number within the range.
*/
Math.randomRange = function (min: number, max: number): number {
	return (this.floor(this.random() * ((max - min) + 1)) + min);
}
