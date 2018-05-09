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
/// <reference path="RadJav.ts" />
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        /** @class RadJav.IO
         * The IO class.
         * Available on platforms: Windows,Linux,OSX
         */
        var IO = /** @class */ (function () {
            function IO() {
            }
            /** @method isDir
             * Check to see if a directory exists.
             * Available on platforms: Windows,Linux,OSX
             * @param {String} path The path to check.
             * @return {Boolean} Returns true if the directory exists.
             */
            IO.isDir = function (path) { return; };
            /** @method isFile
             * Check to see if a file exists.
             * Available on platforms: Windows,Linux,OSX
             * @param {String} path The path to check.
             * @return {Boolean} Returns true if the file exists.
             */
            IO.isFile = function (path) { return; };
            /** @method mkdir
             * Make a directory.
             * Available on platforms: Windows,Linux,OSX
             * @param {String} path The path to the directory to create.
             */
            IO.mkdir = function (path) { };
            /** @method deleteFile
             * Delete a file.
             * Available on platforms: Windows,Linux,OSX
             * @param {String} path The path to the file to delete.
             */
            IO.deleteFile = function (path) { };
            return IO;
        }());
        GUI.IO = IO;
        (function (IO) {
            /** @class RadJav.IO.SerialComm
             * Handles serial communications.
             * Available on platforms: Windows,Linux,OSX
             */
            var SerialComm = /** @class */ (function () {
                function SerialComm() {
                }
                /** @method getPort
                 * Get the serial port.
                 * Available on platforms: Windows,Linux,OSX
                 * @return {String} The port being used.
                 */
                SerialComm.prototype.getPort = function () {
                    return;
                };
                /** @method getBaud
                 * Get the baud.
                 * Available on platforms: Windows,Linux,OSX
                 * @return {String} The baud being used.
                 */
                SerialComm.prototype.getBaud = function () { return; };
                /** @method getByteSize
                 * Get the byte size being used.
                 * Available on platforms: Windows,Linux,OSX
                 * @return {String} The byte size being used.
                 */
                SerialComm.prototype.getByteSize = function () { return; };
                /** @method getStopBits
                 * Get the stop bits being used.
                 * Available on platforms: Windows,Linux,OSX
                 * @return {String} The stop bits being used.
                 */
                SerialComm.prototype.getStopBits = function () { return; };
                /** @method getParity
                 * Get the parity being used.
                 * Available on platforms: Windows,Linux,OSX
                 * @return {String} The parity being used.
                 */
                SerialComm.prototype.getParity = function () { return; };
                /** @method open
                 * Open the serial communications.
                 * Available on platforms: Windows,Linux,OSX
                 * @return {Boolean} Whether or not communications were able to be established.
                 */
                SerialComm.prototype.open = function () { return; };
                /** @method isOpen
                 * Check if serial communications were opened.
                 * Available on platforms: Windows,Linux,OSX
                 * @return {Boolean} Whether or not communications were able to be established.
                 */
                SerialComm.prototype.isOpen = function () { return; };
                /** @method read
                 * Read from the opened port.
                 * Available on platforms: Windows,Linux,OSX
                 * @param {Number} bufferSize The size of the buffer to read in bytes.
                 * @return {String} The string buffer from the opened port.
                 */
                SerialComm.prototype.read = function (bufferSize) { return; };
                /** @method write
                 * Write to the opened port.
                 * Available on platforms: Windows,Linux,OSX
                 * @param {Number} buffer The string buffer to write.
                 * @param {Number} [bufferSize=buffer.length] The number of bytes to write from the buffer.
                 * @return {Number} The number of bytes written.
                 */
                SerialComm.prototype.write = function (buffer, bufferSize) { return; };
                /** @method close
                 * Close the opened port.
                 * Available on platforms: Windows,Linux,OSX
                 */
                SerialComm.prototype.close = function () { };
                return SerialComm;
            }());
            IO.SerialComm = SerialComm;
            /** @class RadJav.IO.TextFile
             * Handles text files.
             * Available on platforms: Windows,Linux,OSX
             */
            var TextFile = /** @class */ (function () {
                function TextFile() {
                }
                /** @method writeTextToFile
                 * Write to a text file.
                 * Available on platforms: Windows,Linux,OSX
                 * @param {String} path The path to the file to write to.
                 * @param {String} content The content to write.
                 */
                TextFile.writeTextToFile = function (path, content) { };
                /** @method readEntireFile
                 * Read from a text file.
                 * Available on platforms: Windows,Linux,OSX
                 * @param {String} path The path to the file to read from.
                 * @return {String} The content read from the text file.
                 */
                TextFile.readEntireFile = function (path) { return; };
                return TextFile;
            }());
        })(IO = GUI.IO || (GUI.IO = {}));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
