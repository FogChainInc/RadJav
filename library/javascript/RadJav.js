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

var RadJav = {};
RadJav.useEval = true;
RadJav._isInitialized = false;
RadJav._included = [];

RadJav.GUI = function ()
{
}

RadJav.C3D = function ()
{
}

RadJav.Net = function ()
{
}

RadJav.BlockchainV1 = function ()
{
}

RadJav.IO = function ()
{
}

RadJav.Console = function ()
{
}

RadJav.OS = function ()
{
}

RadJav.OS.type = "";
RadJav.OS.numBits = 32;

RadJav.initialize = function (libraries)
{
	var promise = new Promise (RadJav.keepContext (function (resolve, reject, args)
		{
			if (RadJav._isInitialized == true)
			{
				resolve ();

				return;
			}

			var promises = [];
			promises.push (RadJav._loadLanguages ());

			if ((libraries == null) || (libraries.length == 0))
			{
				promises.push (RadJav.includeLibraries (RadJav.getStandardLibrary ()));
				promises.push (RadJav.includeLibraries (RadJav.getGUILibrary ()));
			}

			if (libraries != null)
			{
				if (args.length > 1)
				{
					for (var iIdx = 1; iIdx < args.length; iIdx++)
					{
						var tempArg = args[iIdx];

						for (var iJdx = 0; iJdx < tempArg.length; iJdx++)
							libraries.push (tempArg[iJdx]);
					}
				}

				promises.push (RadJav.includeLibraries (libraries));
			}

			Promise.all (promises).then (function ()
				{
					RadJav._isInitialized = true;

					if (RadJav.useEval == false)
					{
						eval = Function = function ()
						{
							var msg = "RadJav disables eval by default. Set RadJav.useEval = true; to enable it.";

							alert (msg);
							throw msg;
						}
					}

					resolve ();
				});
		}, RadJav, arguments));

	return (promise);
};
RadJav.getStandardLibrary = function ()
{
	var includes = [{ file: "RadJav.Circle", themeFile: false }, { file: "RadJav.Rectangle", themeFile: false }, 
			{ file: "RadJav.Vector2", themeFile: false, loadFirst: true }, { file: "RadJav.Color", themeFile: false }];

	return (includes);
};

RadJav.getGUILibrary = function ()
{
	var includes = [{ file: "RadJav.GUI.GObject", themeFile: false, loadFirst: true }, 
			{ file: "RadJav.GUI.Window", themeFile: true }, 
			{ file: "RadJav.GUI.Button", themeFile: true }, { file: "RadJav.GUI.Textbox", themeFile: true }, 
			{ file: "RadJav.GUI.Checkbox", themeFile: true }, { file: "RadJav.GUI.Radio", themeFile: true }, 
			{ file: "RadJav.GUI.Table", themeFile: true }, 
			{ file: "RadJav.GUI.HTMLElement", themeFile: true }, 
			{ file: "RadJav.GUI.Combobox", themeFile: true }];

	return (includes);
};

RadJav.getC3DLibrary = function ()
{
	var includes = [{ file: "RadJav.GUI.Canvas3D", themeFile: true }, 
			{ file: "RadJav.C3D.Object3D", themeFile: false, loadFirst: true }, 
			{ file: "RadJav.C3D.Camera", themeFile: false }, { file: "RadJav.C3D.Entity", themeFile: false }, 
			{ file: "RadJav.C3D.Transform", themeFile: true }, { file: "RadJav.Vector3", themeFile: false, loadFirst: true }, 
			{ file: "RadJav.Vector4", themeFile: false, loadFirst: true }, { file: "RadJav.Quaternion", themeFile: false }, 
			{ file: "RadJav.C3D.Model", themeFile: false, loadFirst: false }, 
			{ file: "RadJav.C3D.Material", themeFile: false, loadFirst: false }];

	return (includes);
};

RadJav.getNetLibrary = function ()
{
	var includes = [{ file: "RadJav.Net.WebSocketClient", themeFile: false }];

	return (includes);
};

RadJav.getGameLibrary = function ()
{
	var includes = [{ file: "RadJav.GUI.Canvas3D", themeFile: true }, 
			{ file: "RadJav.C3D.Object3D", themeFile: false, loadFirst: true }, 
			{ file: "RadJav.C3D.Camera", themeFile: false }, { file: "RadJav.C3D.Entity", themeFile: false }, 
			{ file: "RadJav.C3D.Transform", themeFile: false }, { file: "RadJav.Vector3", themeFile: false }, 
			{ file: "RadJav.Vector4", themeFile: false }, { file: "RadJav.Quaternion", themeFile: false }, 
			{ file: "RadJav.C3D.Model", themeFile: false, loadFirst: false }, 
			{ file: "RadJav.C3D.Material", themeFile: false, loadFirst: false }];

	return (includes);
};

RadJav._loadLanguages = function ()
{
	var promise = new Promise (function (resolve, reject)
		{
			//var data = "";
			//RadJav._lang = JSON.parse (data);
			resolve ();
		});

	return (promise);
};

RadJav.runApplication = function (file)
{
	var promise = RadJav.initialize ().then (function ()
		{
			var promise = null;

			if (typeof (file) == "string")
			{
				promise = include (file).then (function (data)
					{
						var func = new _Function (data);
						func ();
						resolve ();
					});
			}
			else
			{
				promise = new Promise (RadJav.keepContext (function (resolve, reject, func)
					{
						func ();
						resolve ();
					}, this, file));
			}

			return (promise);
		});

	return (promise);
}

RadJav.includeLibraries = function (libraries)
{
	for (var iIdx = 0; iIdx < libraries.length; iIdx++)
		RadJav._included.push (libraries[iIdx]);

	var promise = new Promise (RadJav.keepContext (function (resolve, reject)
				{
					resolve ();
					/*var promises = [];

					for (var iIdx = 0; iIdx < RadJav._included.length; iIdx++)
					{
						var includeObj = RadJav._included[iIdx];

						if (typeof (includeObj) != "string")
						{
							if (includeObj.loadFirst == true)
							{
								var file = "";

								if (typeof (includeObj) != "string")
								{
									if (typeof (includeObj.file) == "string")
										file = includeObj.file;
								}
								else
									file = includeObj;

								var includeFile = RadJav.baseUrl + "/" + file + ".js";
								promises.push (include (includeFile));
							}
						}
					}

					Promise.all (promises).then (function ()
						{
							var promises2 = [];

							for (var iIdx = 0; iIdx < RadJav._included.length; iIdx++)
							{
								var includeObj = RadJav._included[iIdx];
								var file = "";

								if (typeof (includeObj) != "string")
								{
									if (typeof (includeObj.file) == "string")
										file = includeObj.file;
								}
								else
									file = includeObj;

								var includeFile = RadJav.baseUrl + "/" + file + ".js";
								promises2.push (include (includeFile));
							}

							Promise.all (promises2).then (function ()
								{
									resolve ();
								});
						});*/
				}, RadJav));

	return (promise);
}

/** @method loadObjects
* Load RadJav objects.
* @param {String/RadJav.GUI.GObject[]/RadJav.C3D.Object3D[]} objs The objects to load.
* @return {Promise} When loading has completed, all loaded objects will be passed into 
* the "then" function as an object with key/value pairs.
*/
RadJav.loadObjects = function (objs)
{
	var promise = new Promise (function (resolve, reject)
		{
			var promises = [];
			var createdObjs = {};

			if (typeof (objs) == "string")
				objs = JSON.parse (objs);

			for (var iIdx = 0; iIdx < objs.length; iIdx++)
			{
				var obj = objs[iIdx];
				var type = obj.type;
				var name = obj.name;
				var createdObj = null;
				var promise2 = null;

				if (type.indexOf (".GUI") > -1)
				{
					createdObj = new RadJav.GUI[type] (obj);
					promise2 = createdObj.create ();
				}

				if (type.indexOf (".C3D") > -1)
				{
					createdObj = new RadJav.C3D[type] (obj);
					promise2 = createdObj.create ();
				}

				if (createdObj != null)
					createdObjs[name] = createdObj;

				if (promise2 != null)
					promises.push (promise2);
			}

			Promise.all (promises).then (function ()
				{
					resolve (createdObjs);
				});
		});

	return (promise);
}

/** @method clone
* Perform a deep copy of an object. This has been copied from jQuery.
* @param {Object} obj The object to clone.
* @return {Object} The cloned object.
*/
RadJav.clone = function ()
{
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	var isPlainObject = function( obj )
		{
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if ( !obj || obj.toString () !== "[object Object]" ) {
				return false;
			}

			proto = Object.getPrototypeOf( obj );

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if ( !proto ) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = proto.hasOwnProperty("constructor" ) && proto.constructor;
			return typeof Ctor === "function" && Ctor.toString() === Ctor.toString.call (Object);
		};

	var isFunction = function( obj )
		{
			return typeof (obj) === "function";
		};

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = RadJav.clone( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
}

RadJav.cloneObject = function (obj)
{
	return (RadJav.clone ({}, obj));
}

RadJav.cloneArray = function (obj)
{
	return (RadJav.clone ([], obj));
}

RadJav.copyProperties = function (obj1, obj2, overwriteExisting)
{
	if (overwriteExisting == null)
		overwriteExisting = true;

	for (var key in obj2)
	{
		if (overwriteExisting == false)
		{
			if (obj1[key] == null)
				obj1[key] = obj2[key];
		}
		else
			obj1[key] = obj2[key];
	}

	return (obj1);
}

RadJav._resolveThis = function (resolve, reject)
{
	resolve (this);
}

RadJav._emptyResolve = function (resolve, reject)
{
	return (resolve ());
}

RadJav._guiFinishedCreatingGObject = function (resolve, reject)
{
	var promises = [];

	for (var iIdx = 0; iIdx < this._children.length; iIdx++)
	{
		this._children[iIdx] = 
			RadJav.GUI.initObj (this._children[iIdx], "", "", this);

		this._children[iIdx].create ();
	}

	Promise.all (promises).then (RadJav.keepContext (function ()
		{
			for (var key in this._events)
			{
				if (this._events[key] != null)
				{
					/// @bug Must separate .'s so classes can be used.
					var func = window[this._events[key]];
					RadJav.theme.event (this.type, "on", this, key, func);
				}
			}

			if (this.onCreated != null)
				this.onCreated ();

			resolve (this);
		}, this));
}

RadJav.GUI.initObj = function (type, name, text, parent)
{
	var tempType = type;

	if (typeof (type) == "object")
	{
		tempType = type.type;

		if (type.name != null)
			name = type.name;

		if (type.text != null)
			text = type.text;

		if (type._text != null)
			text = type._text;
	}

	if (tempType.indexOf ("RadJav.GUI") > -1)
		tempType = tempType.substr (11);

	if (RadJav.GUI[tempType] == null)
		throw (RadJav.getLangString ("unableToFindClass", tempType));

	var properties = {
			name: name, 
			text: text, 
			parent: parent
		};

	if (typeof (type) == "object")
		RadJav.copyProperties (properties, type, false);

	var obj = new RadJav.GUI[tempType] (properties);

	return (obj);
}

RadJav.GUI.create = function (type, name, text, parent)
{
	var obj = RadJav.GUI.initObj (type, name, text, parent);

	return (obj.create ());
}

RadJav.GUI.createObjects = function (objects, parent, beforeCreated)
{
	var promises = [];

	if (beforeCreated == undefined)
		beforeCreated = null;
	
	for (var iIdx = 0; iIdx < objects.length; iIdx++)
	{
		var obj = objects[iIdx];
		var createObject = true;

		if (beforeCreated != null)
		{
			obj.onBeforeChildCreated = beforeCreated;
			var result = beforeCreated (obj, parent);

			if (result != null)
				createObject = result;
		}

		if (createObject == true)
			promises.push (RadJav.GUI.create (obj, "", "", parent));
	}

	return (Promise.all (promises));
}

RadJav.C3D.create = function (type, name, parent)
{
	if (type.indexOf("RadJav.C3D") > -1)
		type = type.substr(10);

	if (RadJav.C3D[type] == null)
		throw (RadJav.getLangString("unableToFindClass", type));

	var obj = new RadJav.C3D[type](name, parent);

	return (obj.create());
}

RadJav.setDefaultValue = function (param, defaultValue, onValue)
{
	if (param == undefined)
		return (defaultValue);

	if (onValue != null)
		return (onValue(param));

	return (param);
}

RadJav.keepContext = function(func, context, val)
{
	var objReturn = function()
	{
		var aryArgs = Array.prototype.slice.call(arguments);

		if (val != undefined)
			aryArgs.push(val);

		if (context == null)
			return (func.apply(this, aryArgs));
		else
			return (func.apply(context, aryArgs));
	};

	return (objReturn);
}

RadJav.getLangString = function(keyword)
{
	var args = Array.prototype.slice.call(arguments);
	args.splice(0, 1);
	args.splice(0, 0, RadJav._lang[keyword]);

	return (RadJav.combineString.apply(RadJav, args));
}

RadJav.combineString = function()
{
	var strReturn = "";

	if (arguments[0] != null)
		strReturn = arguments[0];

	for (var iIdx = 1; iIdx < arguments.length; iIdx++)
		strReturn = strReturn.replace("%s", arguments[iIdx]);

	return (strReturn);
}

_eval = eval;
_Function = Function;
RadJav.default = RadJav;

// This is taken from generated TypeScript code. Thanks Microsoft!
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var console = {};

