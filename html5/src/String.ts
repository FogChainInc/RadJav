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

/** @class String
* The string class.
*/
interface String
{
	insertAt(startPos: number, str: string): String;
	removeAt(startPos: number, length: number): String;
	replaceAll(str: string, replacement: string): String;
}

/** @method insertAt
* Insert a string at a specific position.
* @param {Number} startPos The starting position to insert the string.
* @param {String} str The string to insert.
* @return {String} The final string.
*/
String.prototype.insertAt = function (startPos: number, str: string): String {
	var finalStr = "";

	finalStr += this.substr(0, startPos);
	finalStr += str;
	finalStr += this.substr(startPos + 1);

	return finalStr;
}

/** @method removeAt
* Remove string at a specific position.
* @param {Number} startPos The starting position to insert the string.
* @param {Number} [length=-1] The number of characters to remove.
* @return {String} The final string.
*/
String.prototype.removeAt = function (startPos: number, length: number): String {
	var str = this;

	if (length < 0) length = str.length;

	var finalStr = str.substr(0, startPos);
	finalStr += str.substr(startPos + length);

	return finalStr;
}

/** @method replaceAll
* Replace all occurances of a string with another.
* @param {String} str The string to replace.
* @param {String} replacement The string to replace str with.
* @return {String} The final string.
*/
String.prototype.replaceAll = function (str: string, replacement: string): String {
	return this.replace(new RegExp(str, "g"), replacement);
}
