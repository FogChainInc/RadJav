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

/** @namespace RadJav
* The main object that starts RadJav.
*/
declare namespace RadJav
{
	/** The minimum version of code that can be ran.
	* @default 0.05
	*/
	export let MIN_VERSION: Number;
	/** The current version.
	* @default 0.05
	*/
	export let VERSION: Number;
	/** The url to the directory where RadJav is located.
	* @default "./RadJav"
	*/
	export let baseUrl: String;
	/** The url to the directory where the theme will be loaded.
	* @default "./RadJav/themes/default"
	*/
	export let themeUrl: String;
	/** The selected language.
	* @default "en_us"
	*/
	export let selectedLanguage: String;
	/** The current theme that has been loaded.
	* @default null
	*/
	export let themes: Theme;
	/** If set to true, RadJav has been initialized.
	* @default false
	*/
	export let _isInitialized: boolean;
	/** If set to true, RadJav has been initialized.
	* @default []
	*/
	export let _included: String [];
	/** If set to true, RadJav has been initialized.
	* @default []
	*/
	export let _lang: String [];
	/** The width of the window's screen.
	* @default window.innerWidth
	*/
	export let _screenWidth: Number;
	/** The height of the window's screen.
	* @default window.innerHeight
	*/
	export let _screenHeight: Number;
	/** Miscellaneous theme utilities to use.
	* @default {}
	*/
	export let themeUtils: any;
	/** If set to true, each file loaded by RadJav will use ajax.
	* @default true
	*/
	export let useAjax: boolean;
	/** Is set to true if RadJav has been minified.
	* @default false
	*/
	export let isMinified: boolean;

	/** Load and return a module. If the module has not already been loaded, this will create 
	* an asynchronous connection to the server and include whatever javascript files it needs.
	* @param {String} path The path to the module to load.
	* @return {Promise} The promise containing the loaded module.
	*/
	export function include (path: String): Promise<void>;

	/** Initialize RadJav.
	* @param {Object[]} [libraries=null] The libraries to include.
	* @return {Promise} The promise to execute.
	*/
	export function initialize (): Promise<void>;
	export function initialize (...libraries: Object[]): Promise<void>;

	/** Get the paths to the standard library.
	* @return {Object[]} The standard library.
	*/
	export function getStandardLibrary (): Object[];

	/** Get the paths to the gui library.
	* @return {Object[]} The gui library.
	*/
	export function getGUILibrary (): Object[];

	/** Get the paths to the C3D library.
	* @return {Object[]} The C3D library.
	*/
	export function getC3DLibrary (): Object[];

	/** Get the paths to the Net library.
	* @return {Object[]} The Net library.
	*/
	export function getNetLibrary (): Object[];

	/** @method includeLibraries
	* Include libraries.
	* @param {Object[]} libraries The libraries to include.
	* @return {Promise} The promise to execute when the including has completed.
	*/
	export function includeLibraries (libraries: Object[]): Promise<void>;

	/** Load the selected language.
	* @return {Promise} The promise to execute when the language has been loaded.
	*/
	export function _loadLanguages (): Promise<void>;

	/** Load a theme.
	* @param {String} themeURL The URL to the theme to load.
	*/
	export function _loadTheme (themeURL: String);

	/** Run an application from a file or a function.
	* Available on platforms: Windows,Linux,OSX,HTML5
	* @param {String/Function} file The path to the file to execute the javascript. Or a 
	* function that will immediately be executed.
	* @return {Promise} The promise that will be executed when this module has completed executing.
	*/
	export function runApplication (file: String | (() => void)): Promise<void>;

	/** Run an application from a file.
	* Available on platforms: Windows,Linux,OSX,HTML5
	* @param {String} file The path to the file to execute the javascript. Or a 
	* function that will immediately be executed.
	* @return {Promise} The promise that will be executed when this module has completed executing.
	*/
	export function runApplicationFromFile (file: String): Promise<void>;

	/** Load RadJav objects.
	* Available on platforms: Windows,Linux,OSX,HTML5
	* @param {String/RadJav.GUI.GObject[]/RadJav.C3D.Object3D[]} objs The objects to load.
	* @return {Promise} When loading has completed, all loaded objects will be passed into 
	* the "then" function as an object with key/value pairs.
	*/
	export function loadObjects (objs: any): Promise<Object[]>;

	/** Checks to see if the current web browser is using Internet Explorer.
	* @return {Boolean} Returns true if the web browser is Internet Explorer.
	*/
	export function _isUsingInternetExplorerTheWorstWebBrowserEver (): boolean;

	/** Get a synchronous response from HTTP. This will lock whatever thread it is currently on!
	* @param {String} addr The address to connect to.
	* @return {String} The response from the HTTP server.
	*/
	export function _getSyncResponse (addr: String): String;

	/** Get an asynchronous response from HTTP.
	* @param {String} addr The address to connect to.
	* @return {String} The response from the HTTP server.
	*/
	export function _getResponse (addr: String): Promise<String>;

	/** Get the width of the current screen.
	* @return {Number} The width of the current screen.
	*/
	export function getWidth (): Number;

	/** Get the height of the current screen.
	* @return {Number} The height of the current screen.
	*/
	export function getHeight (): Number;

	/** Perform a deep copy of an object. This has been copied from jQuery.
	* Thank you jQuery!
	* Available on platforms: Windows,Linux,OSX,HTML5
	* @param {Object} obj The object to clone.
	* @return {Object} The cloned object.
	*/
	export function clone (...args): any;

	/** Perform a deep copy of an object.
	* Available on platforms: Windows,Linux,OSX,HTML5
	* @param {Object} obj The object to clone.
	* @return {Object} The cloned object.
	*/
	export function cloneObject (obj: any): any;

	/** Perform a deep copy of an array.
	* Available on platforms: Windows,Linux,OSX,HTML5
	* @param {Array} obj The array to clone.
	* @return {Array} The cloned array.
	*/
	export function cloneArray (obj: any): any;

	/** Copy the properties of one object to another.
	* Available on platforms: Windows,Linux,OSX,HTML5
	* @param {Object} obj1 The object to receive the properties.
	* @param {Object} obj2 The object to send the properties.
	* @param {Boolean} [overwriteExisting=true] If set to true, this will overwrite any 
	* existing keys.
	* @return {Object} The completed object.
	*/
	export function copyProperties (obj1: Object, obj2: Object, overwriteExisting?: boolean): Object;

	/** @static
	* Set a default value to a parameter should it the parameter be set to 
	* undefined.
	* Available on platforms: Windows,Linux,OSX,HTML5
	* @param {Mixed} param The parameter value to check.
	* @param {Mixed} defaultValue The default value to set should param be set to undefined.
	* @param {Function} [onValue=null] This function is called when a value can be retrieved from the 
	* param parameter.
	* @return {Mixed} Will return the value of param should it not be set to undefined. If param 
	* is set to undefined, defaultValue will be returned instead.
	*/
	export function setDefaultValue (param: any, defaultValue: any, onValue?: ((val: any) => void)): any;

	/** @static
	* Keep the context the object is currently in.
	* Available on platforms: Windows,Linux,OSX,HTML5
	* @param {Function} func The document element's id.
	* @param {Object} context The object to remain in context.
	* @param {Mixed} [val=undefined] An additional value to pass to the context.
	* @return {Mixed} The returned result from the function func.
	*/
	export function keepContext (func: Function, context: Function, val: any): any;

	/** @static
	* Get a language string from the current lanuage. Additional arguments can be 
	* added to this method to combine the strings together using Utils.combineString.
	* @param {String} keyword The keyword to use when getting the language string.
	* @return {String} The string associated with the keyword.
	*/
	export function getLangString (keyword: String): String;

	/** @static
	* Combine multiple strings together using %s in the first argument.
	* 
	*     @example
	*     var firstName = "John";
	*     var lastName = "Doe";
	*     var result = RadJav.combineString ("Hi there %s %s!", firstName, lastname);
	*     // The result will contain:
	*     // Hi there John Doe!
	* @param {String} primaryString The primary string that contains %s. Each %s will be 
	* replaced with an argument specified in the order in which each argument is received.
	* @return {String} The result of the string combining.
	*/
	export function combineString (): String;

	/** @class RadJav.Theme
	* A RadJav theme.
	* Available on platforms: Windows,Linux,OSX,HTML5
	*/
	class Theme
	{
		/** The name of the theme.
		* @default ""
		*/
		name: String;
		/** The theme's version.
		* @default ""
		*/
		version: String;
		/** The theme's author.
		* @default ""
		*/
		author: String;
		/** The theme's last update date.
		* @default null
		*/
		lastUpdated: Date;
		/** The theme's description.
		* @default ""
		*/
		description: String;
		/** The url to this theme.
		* @default ""
		*/
		url: String;
		/** The initialization file to start.
		* @default ""
		*/
		initFile: String;
		/** CSS files to load.
		* @default []
		*/
		cssFiles: String [];
		/** Fonts to load.
		* @default []
		*/
		fonts: Object[];

		/** Load the initialization file and execute it.
		* @return {Promise} Executes when the loading has completed.
		*/
		loadInitializationFile (): Promise<void>;

		/** Load the javascript files for this theme.
		* @return {Promise} Executes when the loading has completed.
		*/
		loadJavascriptFiles (): Promise<void>;

		/** Execute a theme event.
		* @param {String} file The file associated with the event.
		* @param {String} event The name of the event to trigger.
		* @return {Promise} The promise to execute when this event is completed.
		*/
		event (file: String, event: String): Promise<any>;

		/** Execute a theme event synchronously.
		* @param {String} file The file associated with the event.
		* @param {String} event The name of the event to trigger.
		* @return {Mixed} The data returned from the event.
		*/
		eventSync (file: String, event: String): any;

		/** @static
		* The functions and properties associated with this theme.
		*/
		exports: Object;

		/** @static
		* The theme objects associated with this theme.
		*/
		themeObjects: Object[];

		/** @static
		* Load the theme.
		* @param {String} url The URL to this theme.
		* @param {String} data The JSON to parse and get the data from.
		*/
		static loadTheme (url: String, data: String): Theme;
	}

	/** Contains classes for the OS GUI
	*/
	export namespace GUI
	{
		/** @static
		* Initialize a GUI object.
		* @param {String} type The object type to create.
		* @param {String/Mixed} name The name of the object.
		* @param {String} text The text associated with the object.
		* @param {RadJav.GUI.GObject} parent The parent of this object.
		* @return {RadJav.GUI.GObject} The created object.
		*/
		export function initObj (type: String, name: String | GObject, text?: String, parent?: Object): GObject;

		/** @static
		* Create a GUI object.
		* @param {String} type The object type to create.
		* @param {String/Mixed} name The name of the object.
		* @param {String} text The text associated with the object.
		* @param {RadJav.GUI.GObject} parent The parent of this object.
		* @return {Promise} The promise to execute when this object has finished being created.
		*/
		export function create (type: String, name: String | GObject, text?: String, parent?: GObject): Promise<GObject>;

		/** @static
		* Create GUI objects.
		* @param {String/RadJav.GUI.GObject[]} objects The objects to create.
		* @param {RadJav.GUI.GObject} parent The parent of this object.
		* @param {Function} [beforeCreated=null] The function to execute before the object is created.
		* If this function returns false, the object will not be created.
		* @return {Promise} The promise to execute when the objects have finished being created.
		*/
		export function createObjects (objects: String | GObject[], parent?: GObject, 
			beforeCreated?: ((parameter: any, parent: GObject) => GObject)): Promise<GObject[]>;
	}

	/** Contains classes for 3d operations in a RadJav.GUI.Canvas3D object.
	*/
	export namespace C3D
	{
		/** @static
		* Create a 3D object.
		* @param {String} type The object type to create.
		* @param {String/Mixed} name The name of the object.
		* @param {RadJav.C3D.Object3D} parent The parent of this object.
		* @param {Promise} The promise to execute when this object has finished being created.
		*/
		export function create (type: String, name: String | Object3D, parent?: Object3D): Object3D;
	}

	/** Contains classes for network operations.
	*/
	export namespace Net
	{
		/** @static
		* Make an ajax request to a HTTP server.
		* Available on platforms: Windows,Linux,OSX,HTML5
		* @param {String/Object} req The URL or request object to send to the server.
		* @return {Promise} The promise to execute when the request has completed.
		*/
		export function httpRequest (req: String | Object): Promise<String>;
	}

	/** Contains classes handling console operations.
	*/
	export namespace Console
	{
		/** @static
		* Print a message to the console.
		* @param {String} message The message to output.
		*/
		export function print (message: String): void;

		/** @static
		* Print a message to the console with a new line at the end.
		* @param {String} message The message to output.
		*/
		export function println (message: String): void;
	}

	/** Contains Operating System specific functions.
	*/
	export namespace OS
	{
		/** Execute code when RadJav has finished loading.
		* Available on platforms: Windows,Linux,OSX,HTML5
		* @param {Function} func The function to execute.
		*/
		export function onReady (func: (() => void)): void;

		/** Open a URL in the default web browser.
		* Available on platforms: Windows,Linux,OSX,HTML5
		* @param {String} url The url to open.
		*/
		export function openWebBrowserURL (url: String): void;

		/** Represents the current type of operating system.
		* Can be: 
		* * windows
		* * linux
		* * macosx
		* * html5
		* @default "html5"
		*/
		export let type: String;
		/** The number of bits this operating system is.
		* @default 32
		*/
		export let numBits: Number;

		/** Contains HTML5 specific functions.
		* Available on platforms: HTML5
		*/
		export namespace HTML5
		{
			/** If set to true, all objects will be positioned using absolute positioning.
			* @default true
			*/
			export let absolutePositioning: boolean;

			/** @method showElement
			* @static
			* Show a HTML element.
			* @param {String/HTMLElement} elm The element to show or hide.
			* @param {Boolean} [show=true] If set to true the element will be shown.
			*/
			export function showElement (elm: String | Object, show: boolean): void;

			/** @static
			* Get the operating system from the browser's user agent.
			* @return {String} The operating system.
			*/
			export function getOS (): String;

			/** @static
			* Get the URL parameters as an object.
			* @return {Object} The url parameters.
			*/
			export function getUrlParamObj (): Object;

			/** @static
			* Get a URL parameters value.
			* @param {String} name The url parameters name.
			* @return {Mixed} The url parameters value. Returns undefined if the parameter was
			* not able to be found.
			*/
			export function getUrlParam (name: String): any;

			/** @static
			* Set whether or not each gui object placed is placed using absolute positioning.
			* @param {Boolean} absolutePositioning If set to true, all objects will be 
			* positioned using absolute positioning.
			*/
			export function useAbsolutePositioning (absolutePositioning: boolean): void;

			/** @static
			* Start downloading a text file.
			* @param {String} text The text to download.
			* @param {String} fileName The filename.
			* @param {String} [mimeType="text/plain"] The mime type.
			*/
			export function downloadTextAsFile (text: String, fileName: String, mimeType: String): void;

			/** @static
			* Reloads the current page.
			* @param {Boolean} [forceNewPage=false] If set to true, this will force the browser
			* to get a new page from the server.
			*/
			export function reloadPage (forceNewPage: boolean): void;

			/** Get the parent HTML from an object.
			* @param {RadJav.GUI.GObject} obj The parent object to get the HTML from.
			* @return {Mixed} The parent HTML object.
			*/
			export function getParentHTML (obj: Object): any;

			/** Get the HTML DOM object from some HTML string.
			* @param {String} str The string to convert into an HTML DOM.
			* @return {Mixed} The HTML DOM object.
			*/
			export function getHTMLDOM (str: String): Object;

			/** Append HTML to an existing HTML DOM object.
			* @param {Mixed} obj The HTML DOM object to append this HTML to.
			* @param {String/Mixed} html The HTML to append.
			*/
			export function appendHTML (obj: String | Object, html: String | Object): Object;

			/** Use a selector to get a DOM object.
			* @param {Mixed/String} obj The HTML DOM object to get the selection from. If 
			* this is a string, it will be treated as the selector.
			* @param {String} selector The selector to use to get the DOM object.
			* @return {Mixed} The selected DOM object.
			*/
			export function selectDOM (obj: String | Object, selector: String): Object;

			/** When a dom object has finished loading, execute a promise.
			* @param {Object} obj The object to check.
			* @return {Promise} The promise to execute.
			*/
			export function ready (obj: Object): Promise<void>;

			/** @method interfaceConnector
			* For use when using a javascript interface to a webview callback. It will attempt 
			* to call the native javascript interface using the connectorName.
			* @param {String/Object} connectorName On Android, this would be the name of the 
			* Javascript interface that is connected to the webview. On iOS this would be 
			* the name of the message handler for WKWebView. If you are using WebView on iOS 
			* you must set webViewType to iOSWebView in order to be captured, since a reload on 
			* the page is necessary. iOSWebView will not return any result, and when reloading 
			* the page, the next url will be in the format: 
			* connectorName://methodName/arguments in json string
			* 
			* If this is an object, this is the JSON Schema:
			* {
			*	"title": "Interface Connector JSON Schema", 
			*	"type": "object", 
			*	"properties": {
			*			"name": {
			*					"description": "The name of the javascript interface.", 
			*					"type": "string"
			*				}, 
			*			"webViewType": {
			*					"description": "The type of webview that's being used by the application. This can be: AndroidWebView,iOSWKWebView,iOSWebView", 
			*					"type": "string"
			*				}
			*		}, 
			*	"required": ["name"]
			* }
			* @param {String} methodName The name of the method to call. On iOS, this will be passed 
			* as an additional argument.
			* @return {Mixed} The returned result from the interface.
			*/
			export function interfaceConnector (connectorName: String | Object, methodName: String): Object;
		}
	}
}

declare module "RadJav"
{
	export default RadJav;
}

