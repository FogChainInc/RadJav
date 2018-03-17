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

namespace RadJav {
  namespace GUI {
    /** @class RadJav.IO
     * The IO class.
     * Available on platforms: Windows,Linux,OSX
     */
    class IO {
      /** @method isDir
       * Check to see if a directory exists.
       * Available on platforms: Windows,Linux,OSX
       * @param {String} path The path to check.
       * @return {Boolean} Returns true if the directory exists.
       */
      static isDir(path: String): boolean {}

      /** @method isFile
       * Check to see if a file exists.
       * Available on platforms: Windows,Linux,OSX
       * @param {String} path The path to check.
       * @return {Boolean} Returns true if the file exists.
       */
      static isFile(path: String): boolean {}

      /** @method mkdir
       * Make a directory.
       * Available on platforms: Windows,Linux,OSX
       * @param {String} path The path to the directory to create.
       */
      static mkdir(path: String): void {}

      /** @method deleteFile
       * Delete a file.
       * Available on platforms: Windows,Linux,OSX
       * @param {String} path The path to the file to delete.
       */
      static deleteFile(path: String): void {}
    }

    export namespace IO {
      /** @class RadJav.IO.SerialComm
       * Handles serial communications.
       * Available on platforms: Windows,Linux,OSX
       */
      export class SerialComm {
        /** @method getPort
         * Get the serial port.
         * Available on platforms: Windows,Linux,OSX
         * @return {String} The port being used.
         */
        getPort(): String {}

        /** @method getBaud
         * Get the baud.
         * Available on platforms: Windows,Linux,OSX
         * @return {String} The baud being used.
         */
        getBaud(): Number {}

        /** @method getByteSize
         * Get the byte size being used.
         * Available on platforms: Windows,Linux,OSX
         * @return {String} The byte size being used.
         */
        getByteSize(): Number {}

        /** @method getStopBits
         * Get the stop bits being used.
         * Available on platforms: Windows,Linux,OSX
         * @return {String} The stop bits being used.
         */
        getStopBits(): Number {}

        /** @method getParity
         * Get the parity being used.
         * Available on platforms: Windows,Linux,OSX
         * @return {String} The parity being used.
         */
        getParity(): Number {}

        /** @method open
         * Open the serial communications.
         * Available on platforms: Windows,Linux,OSX
         * @return {Boolean} Whether or not communications were able to be established.
         */
        open(): boolean {}

        /** @method isOpen
         * Check if serial communications were opened.
         * Available on platforms: Windows,Linux,OSX
         * @return {Boolean} Whether or not communications were able to be established.
         */
        isOpen(): boolean {}

        /** @method read
         * Read from the opened port.
         * Available on platforms: Windows,Linux,OSX
         * @param {Number} bufferSize The size of the buffer to read in bytes.
         * @return {String} The string buffer from the opened port.
         */
        read(bufferSize: Number): String {}

        /** @method write
         * Write to the opened port.
         * Available on platforms: Windows,Linux,OSX
         * @param {Number} buffer The string buffer to write.
         * @param {Number} [bufferSize=buffer.length] The number of bytes to write from the buffer.
         * @return {Number} The number of bytes written.
         */
        write(buffer: Number, bufferSize?: Number): Number {}

        /** @method close
         * Close the opened port.
         * Available on platforms: Windows,Linux,OSX
         */
        close(): void {}
      }

      /** @class RadJav.IO.TextFile
       * Handles text files.
       * Available on platforms: Windows,Linux,OSX
       */
      class TextFile {
        /** @method writeTextToFile
         * Write to a text file.
         * Available on platforms: Windows,Linux,OSX
         * @param {String} path The path to the file to write to.
         * @param {String} content The content to write.
         */
        static writeTextToFile(path: String, content: String): void {}

        /** @method readEntireFile
         * Read from a text file.
         * Available on platforms: Windows,Linux,OSX
         * @param {String} path The path to the file to read from.
         * @return {String} The content read from the text file.
         */
        static readEntireFile(path: String): String {}

        /** @property {Number} [read=1]
         * @static
         * Read from a file.
         */
        static read: Number;
        /** @property {Number} [write=2]
         * @static
         * Write to a file.
         */
        static write: Number;
        /** @property {Number} [append=3]
         * @static
         * Append to a file.
         */
        static append: Number;
      }
    }
  }
}
