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

/** @class Math
* The math class.
*/
declare interface Math
{
	/** The value of 1 / 180.
	* @default (1 / 180)
	* @static
	*/
	inv180: Number;
	/** The value of 1 / Math.PI.
	* @default (1 / Math.PI)
	* @static
	*/
	invPI: Number;

	/** Map a value.
	* @static
	*/
	map (value: Number, start1: Number, stop1: Number, start2: Number, stop2: Number): Number;
	/** @Get a sinh value.
	* @static
	*/
	sinh (arg: Number): Number;
	/** Get a cosh value.
	* @static
	*/
	cosh (arg: Number): Number;
	/** Get a tanh value.
	* @static
	*/
	tanh (arg: Number): Number;
	/** Get a log value.
	* @static
	*/
	log10 (arg: Number): Number;
	/** Clamp a value.
	* @static
	*/
	clamp (x: Number, a: Number, b: Number): Number;
	/** Convert degrees to radians.
	* @static
	* @param {Number} degrees The degrees value to convert.
	* @return {Number} The radians.
	*/
	degreesToRadians (degrees: Number): Number;
	/** Convert radians to degrees.
	* @static
	* @param {Number} radians The radians value to convert.
	* @return {Number} The degrees.
	*/
	radiansToDegrees (radians: Number): Number;
	/** Get a random number within a range.
	* @static
	* @param {Number} min The minimum value.
	* @param {Number} max The maximum value.
	* @return {Number} The random number within the range.
	*/
	randomRange (min: Number, max: Number): Number;
}