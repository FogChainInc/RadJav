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

/** @class RadJav.IO
* The IO class.
* Available on platforms: Windows,Linux,OSX
*/
/*RadJav.IO = function ()
{
}*/

/** @method isDir
* Check to see if a directory exists.
* Available on platforms: Windows,Linux,OSX
* @param {String} path The path to check.
* @return {Boolean} Returns true if the directory exists.
*/
/*RadJav.IO.isDir = function (path)
{
}*/

/** @method isFile
* Check to see if a file exists.
* Available on platforms: Windows,Linux,OSX
* @param {String} path The path to check.
* @return {Boolean} Returns true if the file exists.
*/
/*RadJav.IO.isFile = function (path)
{
}*/

/** @method mkdir
* Make a directory.
* Available on platforms: Windows,Linux,OSX
* @param {String} path The path to the directory to create.
*/
/*RadJav.IO.mkdir = function (path)
{
}*/

/** @method deleteFile
* Delete a file.
* Available on platforms: Windows,Linux,OSX
* @param {String} path The path to the file to delete.
*/
/*RadJav.IO.deleteFile = function (path)
{
}*/

/** @class RadJav.IO.SerialComm
* Handles serial communications.
* Available on platforms: Windows,Linux,OSX
*/
/*RadJav.IO.SerialComm = function ()
{
}*/

/** @method getPort
* Get the serial port.
* Available on platforms: Windows,Linux,OSX
* @return {String} The port being used.
*/
/*RadJav.IO.SerialComm.getPort = function ()
{
}*/

/** @method getBaud
* Get the baud.
* Available on platforms: Windows,Linux,OSX
* @return {String} The baud being used.
*/
/*RadJav.IO.SerialComm.getBaud = function ()
{
}*/

/** @method getByteSize
* Get the byte size being used.
* Available on platforms: Windows,Linux,OSX
* @return {String} The byte size being used.
*/
/*RadJav.IO.SerialComm.getByteSize = function ()
{
}*/

/** @method getStopBits
* Get the stop bits being used.
* Available on platforms: Windows,Linux,OSX
* @return {String} The stop bits being used.
*/
/*RadJav.IO.SerialComm.getStopBits = function ()
{
}*/

/** @method getParity
* Get the parity being used.
* Available on platforms: Windows,Linux,OSX
* @return {String} The parity being used.
*/
/*RadJav.IO.SerialComm.getParity = function ()
{
}*/

/** @method open
* Open the serial communications.
* Available on platforms: Windows,Linux,OSX
* @return {Boolean} Whether or not communications were able to be established.
*/
/*RadJav.IO.SerialComm.open = function ()
{
}*/

/** @method isOpen
* Check if serial communications were opened.
* Available on platforms: Windows,Linux,OSX
* @return {Boolean} Whether or not communications were able to be established.
*/
/*RadJav.IO.SerialComm.isOpen = function ()
{
}*/

/** @method read
* Read from the opened port.
* Available on platforms: Windows,Linux,OSX
* @param {Number} bufferSize The size of the buffer to read in bytes.
* @return {String} The string buffer from the opened port.
*/
/*RadJav.IO.SerialComm.read = function ()
{
}*/

/** @method write
* Write to the opened port.
* Available on platforms: Windows,Linux,OSX
* @param {Number} buffer The string buffer to write.
* @param {Number} [bufferSize=buffer.length] The number of bytes to write from the buffer.
* @return {Number} The number of bytes written.
*/
/*RadJav.IO.SerialComm.write = function ()
{
}*/

/** @method close
* Close the opened port.
* Available on platforms: Windows,Linux,OSX
*/
/*RadJav.IO.SerialComm.close = function ()
{
}*/

/** @class RadJav.IO.TextFile
* Handles text files.
* Available on platforms: Windows,Linux,OSX
*/
/*RadJav.IO.TextFile = function ()
{
}*/

/** @method writeTextToFile
* Write to a text file.
* Available on platforms: Windows,Linux,OSX
* @param {String} path The path to the file to write to.
* @param {String} content The content to write.
*/
/*RadJav.IO.TextFile.writeTextToFile = function (path, content)
{
}*/

/** @method readEntireFile
* Read from a text file.
* Available on platforms: Windows,Linux,OSX
* @param {String} path The path to the file to read from.
* @return {String} The content read from the text file.
*/
/*RadJav.IO.TextFile.readEntireFile = function (path, content)
{
}*/

/** @property {Number} [read=1]
* @static
* Read from a file.
*/
//RadJav.IO.TextFile.read = 1;
/** @property {Number} [write=2]
* @static
* Write to a file.
*/
//RadJav.IO.TextFile.write = 2;
/** @property {Number} [append=3]
* @static
* Append to a file.
*/
//RadJav.IO.TextFile.append = 3;

