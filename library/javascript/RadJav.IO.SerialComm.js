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

/** @class RadJav.IO.SerialComm
* The serial communications class.
* Available on platforms: Windows,Linux,OSX
*/
RadJav.IO.SerialComm = function ()
{
	/** @property {String} [_port=0]
	* @protected
	* The port to connect to.
	*/
	this._port = RadJav.setDefaultValue(obj._port, "");
	/** @property {Number} [_baud=9600]
	* @protected
	* The baud to use.
	*/
	this._baud = RadJav.setDefaultValue(obj._baud, 9600);
	/** @property {Number} [_byteSize=8]
	* @protected
	* The byte size to use.
	*/
	this._byteSize = RadJav.setDefaultValue(obj._byteSize, 8);
	/** @property {Number} [_stopBits=RadJav.IO.SerialComm.oneStopBit]
	* @protected
	* The stop bits to use.
	*/
	this._stopBits = RadJav.setDefaultValue(obj._stopBits, RadJav.IO.SerialComm.oneStopBit);
	/** @property {Number} [_parity=RadJav.IO.SerialComm.noParity]
	* @protected
	* The parity to use.
	*/
	this._parity = RadJav.setDefaultValue(obj._parity, RadJav.IO.SerialComm.noParity);
	/** @property {Boolean} [_isOpen=false]
	* @protected
	* Whether or not this connection is open.
	*/
	this._isOpen = RadJav.setDefaultValue(obj._isOpen, false);
	/** @property {Number} [_appObj=null]
	* @protected
	* The app object associated with this object.
	*/
	this._appObj = RadJav.setDefaultValue(obj._appObj, null);
}

/** @property {Number} [oneStopBit=0]
* @static
* One stop bit
*/
RadJav.IO.SerialComm.oneStopBit = 0;
/** @property {Number} [one5StopBits=1]
* @static
* One 5 stop bits.
*/
RadJav.IO.SerialComm.one5StopBits = 1;
/** @property {Number} [twoStopBits=2]
* @static
* Two stop bits.
*/
RadJav.IO.SerialComm.twoStopBits = 1;
/** @property {Number} [noParity=0]
* @static
* No parity.
*/
RadJav.IO.SerialComm.noParity = 0;
/** @property {Number} [oddParity=1]
* @static
* Odd parity.
*/
RadJav.IO.SerialComm.oddParity = 1;
/** @property {Number} [evenParity=2]
* @static
* Even parity.
*/
RadJav.IO.SerialComm.evenParity = 2;
/** @property {Number} [markParity=3]
* @static
* Mark parity.
*/
RadJav.IO.SerialComm.markParity = 3;
/** @property {Number} [spaceParity=4]
* @static
* Space parity.
*/
RadJav.IO.SerialComm.spaceParity = 4;

