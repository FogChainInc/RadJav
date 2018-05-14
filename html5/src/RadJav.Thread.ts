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

namespace RadJav
{
	/** @class RadJav.Thread
	* A thread class.
	* Available on platforms: Windows,Linux,OSX,HTML5
	*/
	export class Thread
	{
		constructor()
		{
			this._appObj = null;
			this._htmlObj = null;
			this._threadFunc = null;

			if ((<any>this)._init != null)
				(<any>this)._init ();
		}

		/** @property {Any} [_appObj=null]
		* The OS thread object.
		*/
		_appObj: any;
		/** @property {Any} [_htmlObj=null]
		* The HTML5 thread object.
		*/
		_htmlObj: any;
		/** @property {((...args: any[]) => any)} [_threadFunc=null]
		* The function to execute when the thread starts.
		*/
		_threadFunc: ((...args: any[]) => any);

		/** @method start
		* Start the thread and execute the function in the event thread.
		*/
		start ()
		{
			let script = document.createElement("script");
			script.type = "javascript/worker";
			let str: string = "(" + this._threadFunc.toString () + ")()";

			if (RadJav._isUsingInternetExplorerTheWorstWebBrowserEver() == true)
				script.text = str;
			else
			{
				var textNode = document.createTextNode(str);
				script.appendChild(textNode);
			}

			document.documentElement.insertBefore(script, document.documentElement.firstChild);

			var blob = new Blob ([ script.textContent ], { type: script.type });
			var url = window.URL.createObjectURL (blob);

			this._htmlObj = new Worker (url);
			this._htmlObj.postMessage ();
		}

		/** @method close
		* Close the thread.
		*/
		close ()
		{
			this._htmlObj.close ();
		}

		/** @method on
		* Calls a function when an event is triggered.
		* @param {String} eventName The name of the event to trigger.
		* @param {Function} func The function to execute.
		*/
		on (eventName: string, func: ((...args: any[]) => any)): any
		{
			if (eventName == "thread")
				this._threadFunc = func;
		}
	}
}
