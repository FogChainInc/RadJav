#ifndef _RADJAV_JAVASCRIPTCODE_H_
	#define _RADJAV_JAVASCRIPTCODE_H_

	#include "RadJavString.h"
	#include "RadJavHashMap.h"
	#include "RadJavJSFile.h"

	namespace RadJAV
	{
		Array<JSFile> javascriptFiles;

		inline void loadJavascriptLibrary ()
		{
			javascriptFiles.push_back (JSFile ("Math.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class Math\n\
* The math class.\n\
*/\n\
\n\
/** @property {Number} [inv180=(1 / 180)]\n\
* @static\n\
* The value of 1 / 180.\n\
*/\n\
Math.inv180 = 1 / 180;\n\
/** @property {Number} [invPI=(1 / Math.PI)]\n\
* @static\n\
* The value of 1 / Math.PI.\n\
*/\n\
Math.invPI = 1 / Math.PI;\n\
\n\
/** @method map\n\
* @static\n\
* Map a value.\n\
*/\n\
Math.map = function (value, start1, stop1, start2, stop2)\n\
{\n\
	return (start2 + (stop2 - start2) * (value - start1) / (stop1 - start1));\n\
}\n\
\n\
/** @method cosh\n\
* @static\n\
* Get a cosh value.\n\
*/\n\
Math.cosh = function (arg)\n\
{\n\
	// http://kevin.vanzonneveld.net\n\
	// +   original by: Onno Marsman\n\
	return (Math.exp(arg) + Math.exp(-arg)) / 2;\n\
}\n\
\n\
/** @method tanh\n\
* @static\n\
* Get a tanh value.\n\
*/\n\
Math.tanh = function (arg)\n\
{\n\
	// http://kevin.vanzonneveld.net\n\
	// +   original by: Onno Marsman\n\
	return (Math.exp(arg) - Math.exp(-arg)) / (Math.exp(arg) + Math.exp(-arg));\n\
}\n\
\n\
/** @method log10\n\
* @static\n\
* Get a log value.\n\
*/\n\
Math.log10 = function (arg)\n\
{\n\
	// http://kevin.vanzonneveld.net\n\
	// +   original by: Philip Peterson\n\
	// +   improved by: Onno Marsman\n\
	// +   improved by: Tod Gentille\n\
	// +   improved by: Brett Zamir (http://brett-zamir.me)\n\
	return Math.log(arg) / 2.302585092994046; // Math.LN10\n\
}\n\
\n\
/** @method clamp\n\
* @static\n\
* Clamp a value.\n\
*/\n\
Math.clamp = function (x, a, b)\n\
{\n\
	var dReturn = 0;\n\
\n\
	if (x < a)\n\
		dReturn = a;\n\
	else\n\
	{\n\
		if (x > b)\n\
			dReturn = b;\n\
		else\n\
			dReturn = x;\n\
	}\n\
\n\
	return (dReturn);\n\
}\n\
\n\
/** @method degreesToRadians\n\
* @static\n\
* Convert degrees to radians.\n\
* @param {Number} degrees The degrees value to convert.\n\
* @return {Number} The radians.\n\
*/\n\
Math.degreesToRadians = function (degrees)\n\
{\n\
	return (degrees * (Math.PI * Math.inv180));\n\
}\n\
\n\
/** @method radiansToDegrees\n\
* @static\n\
* Convert radians to degrees.\n\
* @param {Number} radians The radians value to convert.\n\
* @return {Number} The degrees.\n\
*/\n\
Math.radiansToDegrees = function (radians)\n\
{\n\
	return (radians * (180 * Math.invPI));\n\
}\n\
\n\
/** @method randomRange\n\
* @static\n\
* Get a random number within a range.\n\
* @param {Number} min The minimum value.\n\
* @param {Number} max The maximum value.\n\
* @return {Number} The random number within the range.\n\
*/\n\
Math.randomRange = function (min, max)\n\
{\n\
	return (Math.floor (Math.random () * ((max - min) + 1)) + min);\n\
}\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("String.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class String\n\
* The string class.\n\
*/\n\
\n\
/** @method insertAt\n\
* Insert a string at a specific position.\n\
* @param {Number} startPos The starting position to insert the string.\n\
* @param {String} str The string to insert.\n\
* @return {String} The final string.\n\
*/\n\
String.prototype.insertAt = function (startPos, str)\n\
{\n\
	var finalStr = \"\";\n\
\n\
	finalStr += this.substr (0, startPos);\n\
	finalStr += str;\n\
	finalStr += this.substr (startPos + 1);\n\
\n\
	return (finalStr);\n\
}\n\
\n\
/** @method removeAt\n\
* Remove string at a specific position.\n\
* @param {Number} startPos The starting position to insert the string.\n\
* @param {Number} [length=-1] The number of characters to remove.\n\
* @return {String} The final string.\n\
*/\n\
String.prototype.removeAt = function (startPos, length)\n\
{\n\
	var str = this;\n\
\n\
	if (length < 0)\n\
		length = str.length;\n\
\n\
	var finalStr = str.substr (0, startPos);\n\
	finalStr += str.substr ((startPos + length));\n\
\n\
	return (finalStr);\n\
}\n\
\n\
/** @method replaceAll\n\
* Replace all occurances of a string with another.\n\
* @param {String} str The string to replace.\n\
* @param {String} replacement The string to replace str with.\n\
* @return {String} The final string.\n\
*/\n\
String.prototype.replaceAll = function (str, replacement)\n\
{\n\
	return (this.replace (new RegExp (str, \"g\"), replacement));\n\
}\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
var RadJav = {};\n\
RadJav._isInitialized = false;\n\
RadJav._included = [];\n\
\n\
RadJav.GUI = function ()\n\
{\n\
}\n\
\n\
RadJav.C3D = function ()\n\
{\n\
}\n\
\n\
RadJav.Net = function ()\n\
{\n\
}\n\
\n\
RadJav.BlockchainV1 = function ()\n\
{\n\
}\n\
\n\
RadJav.IO = function ()\n\
{\n\
}\n\
\n\
RadJav.Console = function ()\n\
{\n\
}\n\
\n\
RadJav.OS = function ()\n\
{\n\
}\n\
\n\
RadJav.OS.type = \"\";\n\
RadJav.OS.numBits = 32;\n\
\n\
RadJav.initialize = function (libraries)\n\
{\n\
	var promise = new Promise (RadJav.keepContext (function (resolve, reject, args)\n\
		{\n\
			if (RadJav._isInitialized == true)\n\
			{\n\
				resolve ();\n\
\n\
				return;\n\
			}\n\
\n\
			var promises = [];\n\
			promises.push (RadJav._loadLanguages ());\n\
\n\
			if ((libraries == null) || (libraries.length == 0))\n\
			{\n\
				promises.push (RadJav.includeLibraries (RadJav.getStandardLibrary ()));\n\
				promises.push (RadJav.includeLibraries (RadJav.getGUILibrary ()));\n\
			}\n\
\n\
			if (libraries != null)\n\
			{\n\
				if (args.length > 1)\n\
				{\n\
					for (var iIdx = 1; iIdx < args.length; iIdx++)\n\
					{\n\
						var tempArg = args[iIdx];\n\
\n\
						for (var iJdx = 0; iJdx < tempArg.length; iJdx++)\n\
							libraries.push (tempArg[iJdx]);\n\
					}\n\
				}\n\
\n\
				promises.push (RadJav.includeLibraries (libraries));\n\
			}\n\
\n\
			Promise.all (promises).then (function ()\n\
				{\n\
					RadJav._isInitialized = true;\n\
					resolve ();\n\
				});\n\
		}, RadJav, arguments));\n\
\n\
	return (promise);\n\
};\n\
RadJav.getStandardLibrary = function ()\n\
{\n\
	var includes = [{ file: \"RadJav.Circle\", themeFile: false }, { file: \"RadJav.Rectangle\", themeFile: false }, \n\
			{ file: \"RadJav.Vector2\", themeFile: false }, { file: \"RadJav.Color\", themeFile: false }];\n\
\n\
	return (includes);\n\
};\n\
\n\
RadJav.getGUILibrary = function ()\n\
{\n\
	var includes = [{ file: \"RadJav.GUI.GObject\", themeFile: false, loadFirst: true }, \n\
			{ file: \"RadJav.GUI.Window\", themeFile: true }, \n\
			{ file: \"RadJav.GUI.Button\", themeFile: true }, { file: \"RadJav.GUI.Textbox\", themeFile: true }, \n\
			{ file: \"RadJav.GUI.Checkbox\", themeFile: true }, { file: \"RadJav.GUI.Radio\", themeFile: true }, \n\
			{ file: \"RadJav.GUI.Table\", themeFile: true }, \n\
			{ file: \"RadJav.GUI.HTMLElement\", themeFile: true }, \n\
			{ file: \"RadJav.GUI.Combobox\", themeFile: true }];\n\
\n\
	return (includes);\n\
};\n\
\n\
RadJav.getC3DLibrary = function ()\n\
{\n\
	var includes = [{ file: \"RadJav.GUI.Canvas3D\", themeFile: true }, \n\
			{ file: \"RadJav.C3D.Object3D\", themeFile: false, loadFirst: true }, \n\
			{ file: \"RadJav.C3D.Camera\", themeFile: false }, { file: \"RadJav.C3D.Entity\", themeFile: false }, \n\
			{ file: \"RadJav.C3D.Transform\", themeFile: false }, { file: \"RadJav.Vector3\", themeFile: false }, \n\
			{ file: \"RadJav.Vector4\", themeFile: false }, { file: \"RadJav.Quaternion\", themeFile: false }, \n\
			{ file: \"RadJav.C3D.Model\", themeFile: false, loadFirst: false }, \n\
			{ file: \"RadJav.C3D.Material\", themeFile: false, loadFirst: false }];\n\
\n\
	return (includes);\n\
};\n\
\n\
RadJav.getNetLibrary = function ()\n\
{\n\
	var includes = [{ file: \"RadJav.Net.WebSocketClient\", themeFile: false }];\n\
\n\
	return (includes);\n\
};\n\
\n\
RadJav.getGameLibrary = function ()\n\
{\n\
	var includes = [{ file: \"RadJav.GUI.Canvas3D\", themeFile: true }, \n\
			{ file: \"RadJav.C3D.Object3D\", themeFile: false, loadFirst: true }, \n\
			{ file: \"RadJav.C3D.Camera\", themeFile: false }, { file: \"RadJav.C3D.Entity\", themeFile: false }, \n\
			{ file: \"RadJav.C3D.Transform\", themeFile: false }, { file: \"RadJav.Vector3\", themeFile: false }, \n\
			{ file: \"RadJav.Vector4\", themeFile: false }, { file: \"RadJav.Quaternion\", themeFile: false }, \n\
			{ file: \"RadJav.C3D.Model\", themeFile: false, loadFirst: false }, \n\
			{ file: \"RadJav.C3D.Material\", themeFile: false, loadFirst: false }];\n\
\n\
	return (includes);\n\
};\n\
\n\
RadJav._loadLanguages = function ()\n\
{\n\
	var promise = new Promise (function (resolve, reject)\n\
		{\n\
			//var data = \"\";\n\
			//RadJav._lang = JSON.parse (data);\n\
			resolve ();\n\
		});\n\
\n\
	return (promise);\n\
};\n\
\n\
RadJav.runApplication = function (file)\n\
{\n\
	var promise = RadJav.initialize ().then (function ()\n\
		{\n\
			var promise = null;\n\
\n\
			if (typeof (file) == \"string\")\n\
			{\n\
				promise = include (file).then (function (data)\n\
					{\n\
						var func = new Function (data);\n\
						func ();\n\
						resolve ();\n\
					});\n\
			}\n\
			else\n\
			{\n\
				promise = new Promise (RadJav.keepContext (function (resolve, reject, func)\n\
					{\n\
						func ();\n\
						resolve ();\n\
					}, this, file));\n\
			}\n\
\n\
			return (promise);\n\
		});\n\
\n\
	return (promise);\n\
}\n\
\n\
RadJav.includeLibraries = function (libraries)\n\
{\n\
	for (var iIdx = 0; iIdx < libraries.length; iIdx++)\n\
		RadJav._included.push (libraries[iIdx]);\n\
\n\
	var promise = new Promise (RadJav.keepContext (function (resolve, reject)\n\
				{\n\
					resolve ();\n\
					/*var promises = [];\n\
\n\
					for (var iIdx = 0; iIdx < RadJav._included.length; iIdx++)\n\
					{\n\
						var includeObj = RadJav._included[iIdx];\n\
\n\
						if (typeof (includeObj) != \"string\")\n\
						{\n\
							if (includeObj.loadFirst == true)\n\
							{\n\
								var file = \"\";\n\
\n\
								if (typeof (includeObj) != \"string\")\n\
								{\n\
									if (typeof (includeObj.file) == \"string\")\n\
										file = includeObj.file;\n\
								}\n\
								else\n\
									file = includeObj;\n\
\n\
								var includeFile = RadJav.baseUrl + \"/\" + file + \".js\";\n\
								promises.push (include (includeFile));\n\
							}\n\
						}\n\
					}\n\
\n\
					Promise.all (promises).then (function ()\n\
						{\n\
							var promises2 = [];\n\
\n\
							for (var iIdx = 0; iIdx < RadJav._included.length; iIdx++)\n\
							{\n\
								var includeObj = RadJav._included[iIdx];\n\
								var file = \"\";\n\
\n\
								if (typeof (includeObj) != \"string\")\n\
								{\n\
									if (typeof (includeObj.file) == \"string\")\n\
										file = includeObj.file;\n\
								}\n\
								else\n\
									file = includeObj;\n\
\n\
								var includeFile = RadJav.baseUrl + \"/\" + file + \".js\";\n\
								promises2.push (include (includeFile));\n\
							}\n\
\n\
							Promise.all (promises2).then (function ()\n\
								{\n\
									resolve ();\n\
								});\n\
						});*/\n\
				}, RadJav));\n\
\n\
	return (promise);\n\
}\n\
\n\
/** @method loadObjects\n\
* Load RadJav objects.\n\
* @param {String/RadJav.GUI.GObject[]/RadJav.C3D.Object3D[]} objs The objects to load.\n\
* @return {Promise} When loading has completed, all loaded objects will be passed into \n\
* the \"then\" function as an object with key/value pairs.\n\
*/\n\
RadJav.loadObjects = function (objs)\n\
{\n\
	var promise = new Promise (function (resolve, reject)\n\
		{\n\
			var promises = [];\n\
			var createdObjs = {};\n\
\n\
			if (typeof (objs) == \"string\")\n\
				objs = JSON.parse (objs);\n\
\n\
			for (var iIdx = 0; iIdx < objs.length; iIdx++)\n\
			{\n\
				var obj = objs[iIdx];\n\
				var type = obj.type;\n\
				var name = obj.name;\n\
				var createdObj = null;\n\
				var promise2 = null;\n\
\n\
				if (type.indexOf (\".GUI\") > -1)\n\
				{\n\
					createdObj = new RadJav.GUI[type] (obj);\n\
					promise2 = createdObj.create ();\n\
				}\n\
\n\
				if (type.indexOf (\".C3D\") > -1)\n\
				{\n\
					createdObj = new RadJav.C3D[type] (obj);\n\
					promise2 = createdObj.create ();\n\
				}\n\
\n\
				if (createdObj != null)\n\
					createdObjs[name] = createdObj;\n\
\n\
				if (promise2 != null)\n\
					promises.push (promise2);\n\
			}\n\
\n\
			Promise.all (promises).then (function ()\n\
				{\n\
					resolve (createdObjs);\n\
				});\n\
		});\n\
\n\
	return (promise);\n\
}\n\
\n\
/** @method clone\n\
* Perform a deep copy of an object. This has been copied from jQuery.\n\
* @param {Object} obj The object to clone.\n\
* @return {Object} The cloned object.\n\
*/\n\
RadJav.clone = function ()\n\
{\n\
	var options, name, src, copy, copyIsArray, clone,\n\
		target = arguments[ 0 ] || {},\n\
		i = 1,\n\
		length = arguments.length,\n\
		deep = false;\n\
\n\
	// Handle a deep copy situation\n\
	if ( typeof target === \"boolean\" ) {\n\
		deep = target;\n\
\n\
		// Skip the boolean and the target\n\
		target = arguments[ i ] || {};\n\
		i++;\n\
	}\n\
\n\
	var isPlainObject = function( obj )\n\
		{\n\
			var proto, Ctor;\n\
\n\
			// Detect obvious negatives\n\
			// Use toString instead of jQuery.type to catch host objects\n\
			if ( !obj || obj.toString () !== \"[object Object]\" ) {\n\
				return false;\n\
			}\n\
\n\
			proto = Object.getPrototypeOf( obj );\n\
\n\
			// Objects with no prototype (e.g., `Object.create( null )`) are plain\n\
			if ( !proto ) {\n\
				return true;\n\
			}\n\
\n\
			// Objects with prototype are plain iff they were constructed by a global Object function\n\
			Ctor = proto.hasOwnProperty(\"constructor\" ) && proto.constructor;\n\
			return typeof Ctor === \"function\" && Ctor.toString() === Ctor.toString.call (Object);\n\
		};\n\
\n\
	var isFunction = function( obj )\n\
		{\n\
			return typeof (obj) === \"function\";\n\
		};\n\
\n\
	// Handle case when target is a string or something (possible in deep copy)\n\
	if ( typeof target !== \"object\" && !isFunction( target ) ) {\n\
		target = {};\n\
	}\n\
\n\
	// Extend jQuery itself if only one argument is passed\n\
	if ( i === length ) {\n\
		target = this;\n\
		i--;\n\
	}\n\
\n\
	for ( ; i < length; i++ ) {\n\
\n\
		// Only deal with non-null/undefined values\n\
		if ( ( options = arguments[ i ] ) != null ) {\n\
\n\
			// Extend the base object\n\
			for ( name in options ) {\n\
				src = target[ name ];\n\
				copy = options[ name ];\n\
\n\
				// Prevent never-ending loop\n\
				if ( target === copy ) {\n\
					continue;\n\
				}\n\
\n\
				// Recurse if we're merging plain objects or arrays\n\
				if ( deep && copy && ( isPlainObject( copy ) ||\n\
					( copyIsArray = Array.isArray( copy ) ) ) ) {\n\
\n\
					if ( copyIsArray ) {\n\
						copyIsArray = false;\n\
						clone = src && Array.isArray( src ) ? src : [];\n\
\n\
					} else {\n\
						clone = src && isPlainObject( src ) ? src : {};\n\
					}\n\
\n\
					// Never move original objects, clone them\n\
					target[ name ] = RadJav.clone( deep, clone, copy );\n\
\n\
				// Don't bring in undefined values\n\
				} else if ( copy !== undefined ) {\n\
					target[ name ] = copy;\n\
				}\n\
			}\n\
		}\n\
	}\n\
\n\
	// Return the modified object\n\
	return target;\n\
}\n\
\n\
RadJav.cloneObject = function (obj)\n\
{\n\
	return (RadJav.clone ({}, obj));\n\
}\n\
\n\
RadJav.cloneArray = function (obj)\n\
{\n\
	return (RadJav.clone ([], obj));\n\
}\n\
\n\
RadJav.copyProperties = function (obj1, obj2, overwriteExisting)\n\
{\n\
	if (overwriteExisting == null)\n\
		overwriteExisting = true;\n\
\n\
	for (var key in obj2)\n\
	{\n\
		if (overwriteExisting == false)\n\
		{\n\
			if (obj1[key] == null)\n\
				obj1[key] = obj2[key];\n\
		}\n\
		else\n\
			obj1[key] = obj2[key];\n\
	}\n\
\n\
	return (obj1);\n\
}\n\
\n\
RadJav._resolveThis = function (resolve, reject)\n\
{\n\
	resolve (this);\n\
}\n\
\n\
RadJav._emptyResolve = function (resolve, reject)\n\
{\n\
	return (resolve ());\n\
}\n\
\n\
RadJav._guiFinishedCreatingGObject = function (resolve, reject)\n\
{\n\
	var promises = [];\n\
\n\
	for (var iIdx = 0; iIdx < this._children.length; iIdx++)\n\
	{\n\
		this._children[iIdx] = \n\
			RadJav.GUI.initObj (this._children[iIdx], \"\", \"\", this);\n\
\n\
		this._children[iIdx].create ();\n\
	}\n\
\n\
	Promise.all (promises).then (RadJav.keepContext (function ()\n\
		{\n\
			for (var key in this._events)\n\
			{\n\
				if (this._events[key] != null)\n\
				{\n\
					/// @bug Must separate .'s so classes can be used.\n\
					var func = window[this._events[key]];\n\
					RadJav.theme.event (this.type, \"on\", this, key, func);\n\
				}\n\
			}\n\
\n\
			if (this.onCreated != null)\n\
				this.onCreated ();\n\
\n\
			resolve (this);\n\
		}, this));\n\
}\n\
\n\
RadJav.GUI.initObj = function (type, name, text, parent)\n\
{\n\
	var tempType = type;\n\
\n\
	if (typeof (type) == \"object\")\n\
	{\n\
		tempType = type.type;\n\
\n\
		if (type.name != null)\n\
			name = type.name;\n\
\n\
		if (type.text != null)\n\
			text = type.text;\n\
\n\
		if (type._text != null)\n\
			text = type._text;\n\
	}\n\
\n\
	if (tempType.indexOf (\"RadJav.GUI\") > -1)\n\
		tempType = tempType.substr (11);\n\
\n\
	if (RadJav.GUI[tempType] == null)\n\
		throw (RadJav.getLangString (\"unableToFindClass\", tempType));\n\
\n\
	var properties = {\n\
			name: name, \n\
			text: text, \n\
			parent: parent\n\
		};\n\
\n\
	if (typeof (type) == \"object\")\n\
		RadJav.copyProperties (properties, type, false);\n\
\n\
	var obj = new RadJav.GUI[tempType] (properties);\n\
\n\
	return (obj);\n\
}\n\
\n\
RadJav.GUI.create = function (type, name, text, parent)\n\
{\n\
	var obj = RadJav.GUI.initObj (type, name, text, parent);\n\
\n\
	return (obj.create ());\n\
}\n\
\n\
RadJav.GUI.createObjects = function (objects, parent, beforeCreated)\n\
{\n\
	var promises = [];\n\
\n\
	if (beforeCreated == undefined)\n\
		beforeCreated = null;\n\
	\n\
	for (var iIdx = 0; iIdx < objects.length; iIdx++)\n\
	{\n\
		var obj = objects[iIdx];\n\
		var createObject = true;\n\
\n\
		if (beforeCreated != null)\n\
		{\n\
			obj.onBeforeChildCreated = beforeCreated;\n\
			var result = beforeCreated (obj, parent);\n\
\n\
			if (result != null)\n\
				createObject = result;\n\
		}\n\
\n\
		if (createObject == true)\n\
			promises.push (RadJav.GUI.create (obj, \"\", \"\", parent));\n\
	}\n\
\n\
	return (Promise.all (promises));\n\
}\n\
\n\
RadJav.C3D.create = function (type, name, parent)\n\
{\n\
	if (type.indexOf(\"RadJav.C3D\") > -1)\n\
		type = type.substr(10);\n\
\n\
	if (RadJav.C3D[type] == null)\n\
		throw (RadJav.getLangString(\"unableToFindClass\", type));\n\
\n\
	var obj = new RadJav.C3D[type](name, parent);\n\
\n\
	return (obj.create());\n\
}\n\
\n\
RadJav.setDefaultValue = function (param, defaultValue, onValue)\n\
{\n\
	if (param == undefined)\n\
		return (defaultValue);\n\
\n\
	if (onValue != null)\n\
		return (onValue(param));\n\
\n\
	return (param);\n\
}\n\
\n\
RadJav.keepContext = function(func, context, val)\n\
{\n\
	var objReturn = function()\n\
	{\n\
		var aryArgs = Array.prototype.slice.call(arguments);\n\
\n\
		if (val != undefined)\n\
			aryArgs.push(val);\n\
\n\
		if (context == null)\n\
			return (func.apply(this, aryArgs));\n\
		else\n\
			return (func.apply(context, aryArgs));\n\
	};\n\
\n\
	return (objReturn);\n\
}\n\
\n\
RadJav.getLangString = function(keyword)\n\
{\n\
	var args = Array.prototype.slice.call(arguments);\n\
	args.splice(0, 1);\n\
	args.splice(0, 0, RadJav._lang[keyword]);\n\
\n\
	return (RadJav.combineString.apply(RadJav, args));\n\
}\n\
\n\
RadJav.combineString = function()\n\
{\n\
	var strReturn = \"\";\n\
\n\
	if (arguments[0] != null)\n\
		strReturn = arguments[0];\n\
\n\
	for (var iIdx = 1; iIdx < arguments.length; iIdx++)\n\
		strReturn = strReturn.replace(\"%s\", arguments[iIdx]);\n\
\n\
	return (strReturn);\n\
}\n\
\n\
RadJav.classInitializing = false; \n\
RadJav.fnTest = / xyz / .test(function() { xyz; }) ? / \\b_super\\b / : / .* / ; \n\
\n\
// The base Class implementation (does nothing)\n\
RadJav.Class = function() {};\n\
\n\
// Create a new Class that inherits from this class\n\
RadJav.Class.extend = function(prop) {\n\
	var _super = this.prototype;\n\
\n\
	// Instantiate a base class (but only create the instance,\n\
	// don't run the init constructor)\n\
	RadJav.classInitializing = true;\n\
	var prototype = new this();\n\
	RadJav.classInitializing = false;\n\
\n\
	// Copy the properties over onto the new prototype\n\
	for (var name in prop) {\n\
		// Check if we're overwriting an existing function\n\
		prototype[name] = typeof prop[name] == \"function\" &&\n\
			typeof _super[name] == \"function\" && RadJav.fnTest.test(prop[name]) ?\n\
			(function(name, fn) {\n\
			return function() {\n\
				var tmp = this._super;\n\
\n\
				// Add a new ._super() method that is the same method\n\
				// but on the super-class\n\
				this._super = _super[name];\n\
\n\
				// The method only need to be bound temporarily, so we\n\
				// remove it when we're done executing\n\
				var ret = fn.apply(this, arguments);\n\
				this._super = tmp;\n\
\n\
				return ret;\n\
			};\n\
		})(name, prop[name]) :\n\
			prop[name];\n\
	}\n\
\n\
	// The dummy class constructor\n\
	function Class() {\n\
		// All construction is actually done in the init method\n\
		if (!RadJav.classInitializing && this.init)\n\
			this.init.apply(this, arguments);\n\
	}\n\
\n\
	// Populate our constructed prototype object\n\
	Class.prototype = prototype;\n\
\n\
	// Enforce the constructor to be what we expect\n\
	Class.prototype.constructor = Class;\n\
\n\
	// And make this class extendable\n\
	Class.extend = arguments.callee;\n\
\n\
	return Class;\n\
};\n\
\n\
RadJav.OS.type = \"windows\";\n\
RadJav.OS.Windows = function()\n\
{\n\
}\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.Color.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.Color\n\
* Represents a color.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.Color = function (r, g, b, a)\n\
{\n\
	if (typeof (r) == \"object\")\n\
	{\n\
		var color = r;\n\
		r = color.r;\n\
		g = color.g;\n\
		b = color.b;\n\
		a = color.a;\n\
	}\n\
\n\
	if (r == null)\n\
		r = 0;\n\
\n\
	if (g == null)\n\
		g = 0;\n\
\n\
	if (b == null)\n\
		b = 0;\n\
\n\
	if (a == null)\n\
		a = 1;\n\
\n\
	/** @property {Number} [r=0]\n\
	* Red, between 0 and 1.\n\
	*/\n\
	this.r = r;\n\
	/** @property {Number} [g=0]\n\
	* Green, between 0 and 1.\n\
	*/\n\
	this.g = g;\n\
	/** @property {Number} [b=0]\n\
	* Blue, between 0 and 1.\n\
	*/\n\
	this.b = b;\n\
	/** @property {Number} [a=0]\n\
	* Alpha, between 0 and 1.\n\
	*/\n\
	this.a = a;\n\
\n\
	/** @method toHex\n\
	* Return this color as a hex string.\n\
	* @return {String} The hex string representing the color.\n\
	*/\n\
	this.toHex = function ()\n\
	{\n\
		var red = this.r;\n\
		var green = this.g;\n\
		var blue = this.b;\n\
\n\
		red *= 255;\n\
		green *= 255;\n\
		blue *= 255;\n\
\n\
		red = parseInt (red).toString (16);\n\
		green = parseInt (green).toString (16);\n\
		blue = parseInt (blue).toString (16);\n\
\n\
		if (parseInt (red) <= 9)\n\
			red = \"0\" + red;\n\
\n\
		if (parseInt (green) <= 9)\n\
			green = \"0\" + green;\n\
\n\
		if (parseInt (blue) <= 9)\n\
			blue = \"0\" + blue;\n\
\n\
		return (\"0x\" + red + green + blue);\n\
	}\n\
\n\
	/** @method toHTMLColor\n\
	* Return this color as a HTML color string.\n\
	* @return {String} The html string representing the color.\n\
	*/\n\
	this.toHTMLColor = function ()\n\
	{\n\
		var hex = this.toHex ();\n\
		hex = hex.substring (2);\n\
		return (\"#\" + hex);\n\
	}\n\
\n\
	/** @method toHexInt\n\
	* Return this color as a hex color integer.\n\
	* @return {Number} The hex integer representing the color.\n\
	*/\n\
	this.toHexInt = function ()\n\
	{\n\
		var hex = this.toHex ();\n\
		return (parseInt (hex));\n\
	}\n\
}\n\
\n\
RadJav.Color.Black = new RadJav.Color (0, 0, 0, 1);\n\
RadJav.Color.White = new RadJav.Color (1, 1, 1, 1);\n\
RadJav.Color.Red = new RadJav.Color (1, 0, 0, 1);\n\
RadJav.Color.Green = new RadJav.Color (0, 1, 0, 1);\n\
RadJav.Color.Blue = new RadJav.Color (0, 0, 1, 1);\n\
\n\
/** \n\
* Parse a color string.\n\
* @param {String} str The color string to parse.\n\
* @return {RadJav.Color} The color.\n\
*/\n\
function parseColor (str)\n\
{\n\
	var color = new RadJav.Color (0, 0, 0, 1);\n\
\n\
	if (str == \"\")\n\
		return (color);\n\
\n\
	var iPos = 0;\n\
	iPos = str.indexOf (\"#\");\n\
	str = str.toLowerCase ();\n\
\n\
	if (str == \"black\")\n\
		color = RadJav.Color.Black;\n\
\n\
	if (str == \"white\")\n\
		color = RadJav.Color.White;\n\
\n\
	if (str == \"red\")\n\
		color = RadJav.Color.Red;\n\
\n\
	if (str == \"green\")\n\
		color = RadJav.Color.Green;\n\
\n\
	if (str == \"blue\")\n\
		color = RadJav.Color.Blue;\n\
\n\
	if (iPos > -1)\n\
		iPos++;\n\
\n\
	var strR = str.substr ((iPos + 0), 2);\n\
	var strG = str.substr ((iPos + 2), 2);\n\
	var strB = str.substr ((iPos + 4), 2);\n\
	var iR = parseInt (strR, 16);\n\
	var iG = parseInt (strG, 16);\n\
	var iB = parseInt (strB, 16);\n\
	var dR = (iR / 255.0);\n\
	var dG = (iG / 255.0);\n\
	var dB = (iB / 255.0);\n\
\n\
	color.r = dR;\n\
	color.g = dG;\n\
	color.b = dB;\n\
\n\
	return (color);\n\
}\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.Quaternion.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.Quaternion\n\
* A Quaternion class.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.Quaternion = function (w, x, y, z)\n\
{\n\
	if (w == null)\n\
		w = 1;\n\
\n\
	if (x == null)\n\
		x = 0;\n\
\n\
	if (y == null)\n\
		y = 0;\n\
\n\
	if (z == null)\n\
		z = 0;\n\
\n\
	if (x instanceof RadJav.Vector4)\n\
	{\n\
		var temp = x;\n\
		x = temp.x;\n\
		y = temp.y;\n\
		z = temp.z;\n\
		w = temp.w;\n\
	}\n\
\n\
	if (x instanceof RadJav.Quaternion)\n\
	{\n\
		var temp = x;\n\
		w = temp.w;\n\
		x = temp.x;\n\
		y = temp.y;\n\
		z = temp.z;\n\
	}\n\
\n\
	/** @property {Number} [w=1]\n\
	* The W component.\n\
	*/\n\
	this.w = w;\n\
	/** @property {Number} [x=0]\n\
	* The X component.\n\
	*/\n\
	this.x = x;\n\
	/** @property {Number} [y=0]\n\
	* The Y component.\n\
	*/\n\
	this.y = y;\n\
	/** @property {Number} [z=0]\n\
	* The Z component.\n\
	*/\n\
	this.z = z;\n\
}\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.Vector2.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.Vector2\n\
* A Vector2 class.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.Vector2 = function (x, y)\n\
{\n\
	if (typeof (x) == \"object\")\n\
	{\n\
		var temp = x;\n\
		x = temp.x;\n\
		y = temp.y;\n\
	}\n\
	\n\
	if (x == null)\n\
		x = 0;\n\
\n\
	if (y == null)\n\
		y = 0;\n\
\n\
	/** @property {Number} [x=0]\n\
	* The X component.\n\
	*/\n\
	this.x = x;\n\
	/** @property {Number} [y=0]\n\
	* The X component.\n\
	*/\n\
	this.y = y;\n\
\n\
	/** @method toString\n\
	* Convert this object to a string.\n\
	* @return {String} The string representing this object.\n\
	*/\n\
	this.toString = function ()\n\
	{\n\
		return (this.x + \",\" + this.y);\n\
	}\n\
\n\
	/** @method setX\n\
	* Set the X component of this object.\n\
	* @param {Number} n The new X component of this object.\n\
	*/\n\
	this.setX = function (n) // JR\n\
	{\n\
		this.x = n;\n\
	}\n\
\n\
	/** @method setY\n\
	* Set the X component of this object.\n\
	* @param {Number} n The new X component of this object.\n\
	*/\n\
	this.setY = function (n) // JR\n\
	{\n\
		this.y = n;\n\
	}\n\
\n\
	/** @method set\n\
	* Set the X,Y component of this object.\n\
	* @param {Number} x The new X component of this object.\n\
	* @param {Number} y The new Y component of this object.\n\
	*/\n\
	this.set = function (x, y) // JR\n\
	{\n\
		this.x = x;\n\
		this.y = y;\n\
	}\n\
\n\
	/** @method add\n\
	* Add X and Y values to the X and Y components of this object.\n\
	* @param {Number} x The X component to add.\n\
	* @param {Number} y The Y component to add.\n\
	*/\n\
	this.add = function (x, y) // JR\n\
	{\n\
		this.x += x;\n\
		this.y += y;\n\
	}\n\
\n\
	/** @method sub\n\
	* Subtract X and Y values from the X and Y components of this object.\n\
	* @param {Number} x The X component to subtract.\n\
	* @param {Number} y The Y component to subtract.\n\
	*/\n\
	this.sub = function (subVector2) //JR\n\
	{\n\
		this.x -= subVector2.x;\n\
		this.y -= subVector2.y;\n\
	}\n\
\n\
	/** @method mult\n\
	* Multiply X and Y values to the X and Y components of this object.\n\
	* @param {Number} x The X component to subtract.\n\
	* @param {Number} y The Y component to subtract.\n\
	*/\n\
	this.mult = function (n) // JR\n\
	{\n\
		this.x *= n;\n\
		this.y *= n;\n\
	}\n\
\n\
	/** @method divide\n\
	* Divide this object by another Vector2 object or number.\n\
	* @param {RadJav.Vector2|Number} vector2 The Vector2 or Number to divide by.\n\
	*/\n\
	this.divide = function (vector2) // JR\n\
	{\n\
		var result = new RadJav.Vector2 ();\n\
\n\
		if (typeof (vector2) == \"object\")\n\
		{\n\
			result.x = this.x / vector2.x;\n\
			result.y = this.y / vector2.y;\n\
		}\n\
		else\n\
		{\n\
			result.x = this.x / vector2;\n\
			result.y = this.y / vector2;\n\
		}\n\
\n\
		return (result);\n\
	}\n\
\n\
	/** @method dot\n\
	* Perform a dot product on this object.\n\
	* @param {RadJav.Vector2} dotVector2 The Vector2 to perform the dot product.\n\
	* @return {Number} The result of the dot product.\n\
	*/\n\
	this.dot = function (dotVector2) // JR\n\
	{\n\
		return (this.x * dotVector2.x + this.y * dotVector2.y);\n\
	}\n\
\n\
	/** @method length\n\
	* Get the length of this object using a square root. This will use Math.sqrt.\n\
	* @return {Number} The length of this object.\n\
	*/\n\
	this.length = function () // JR\n\
	{\n\
		return Math.sqrt ((this.x * this.x) + (this.y * this.y));\n\
	}\n\
\n\
	/** @method normalize\n\
	* Normalize this object, this will use this object's length method.\n\
	* @return {Number} The normalized length of this object.\n\
	*/\n\
	this.normalize = function () // JR\n\
	{\n\
		return this.divide (this.length ());\n\
	}\n\
}\n\
\n\
/** @method parseVector2\n\
* @static\n\
* Parse a Vector2 string and create a Vector2 object from it.\n\
* @param {String} str The string to parse.\n\
* @return {RadJav.Vector2} The new Vector2 created from this string.\n\
*/\n\
RadJav.Vector2.parseVector2 = function (str)\n\
{\n\
	var obj = new RadJav.Vector2 ();\n\
\n\
	if (str == \"\")\n\
		return (obj);\n\
\n\
	str = str.toLowerCase ();\n\
	str = str.replace (/ /g, \"\");\n\
	var strs = str.split (\",\");\n\
\n\
	if (strs.length > 0)\n\
		obj.x = parseFloat (strs[0]);\n\
\n\
	if (strs.length > 1)\n\
		obj.y = parseFloat (strs[1]);\n\
\n\
	return (obj);\n\
}\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.Vector3.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.Vector3\n\
* A Vector3 class.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.Vector3 = function (x, y, z)\n\
{\n\
	if (x == null)\n\
		x = 0;\n\
\n\
	if (y == null)\n\
		y = 0;\n\
\n\
	if (z == null)\n\
		z = 0;\n\
\n\
	if (x instanceof RadJav.Vector2)\n\
	{\n\
		var temp = x;\n\
		x = temp.x;\n\
		y = temp.y;\n\
	}\n\
\n\
	if (x instanceof RadJav.Vector3)\n\
	{\n\
		var temp = x;\n\
		x = temp.x;\n\
		y = temp.y;\n\
		z = temp.z;\n\
	}\n\
\n\
	/** @property {Number} [x=0]\n\
	* The X component.\n\
	*/\n\
	this.x = x;\n\
	/** @property {Number} [y=0]\n\
	* The Y component.\n\
	*/\n\
	this.y = y;\n\
	/** @property {Number} [z=0]\n\
	* The Z component.\n\
	*/\n\
	this.z = z;\n\
\n\
	/** @method toString\n\
	* Convert this object to a string.\n\
	* @return {String} The string representing this object.\n\
	*/\n\
	this.toString = function ()\n\
	{\n\
		return (this.x + \",\" + this.y + \",\" + this.z);\n\
	}\n\
\n\
	/** @method add\n\
	* Add x,y,z values to the x,y,z components of this object.\n\
	* @param {Number} x The X component to add.\n\
	* @param {Number} y The Y component to add.\n\
	* @param {Number} z The Z component to add.\n\
	*/\n\
	this.add = function (vector3)\n\
	{\n\
		var result = new RadJav.Vector3 ();\n\
\n\
		if (vector3 instanceof RadJav.Vector3)\n\
		{\n\
			result.x = this.x + vector3.x;\n\
			result.y = this.y + vector3.y;\n\
			result.z = this.z + vector3.z;\n\
		}\n\
		else\n\
		{\n\
			result.x = this.x + vector3;\n\
			result.y = this.y + vector3;\n\
			result.z = this.z + vector3;\n\
		}\n\
\n\
		return (result);\n\
	}\n\
\n\
	/** @method sub\n\
	* Subtract X and Y values from the X and Y components of this object.\n\
	* @param {Number} x The X component to subtract.\n\
	* @param {Number} y The Y component to subtract.\n\
	* @param {Number} z The Z component to subtract.\n\
	*/\n\
	this.subtract = function (vector3)\n\
	{\n\
		var result = new RadJav.Vector3 ();\n\
\n\
		if (vector3 instanceof RadJav.Vector3)\n\
		{\n\
			result.x = this.x - vector3.x;\n\
			result.y = this.y - vector3.y;\n\
			result.z = this.z - vector3.z;\n\
		}\n\
		else\n\
		{\n\
			result.x = this.x - vector3;\n\
			result.y = this.y - vector3;\n\
			result.z = this.z - vector3;\n\
		}\n\
\n\
		return (result);\n\
	}\n\
\n\
	/** @method multiply\n\
	* Multiply x,y,z values to the x,y,z components of this object.\n\
	* @param {Number} x The X component to subtract.\n\
	* @param {Number} y The Y component to subtract.\n\
	* @param {Number} z The Z component to subtract.\n\
	*/\n\
	this.multiply = function (vector3)\n\
	{\n\
		var result = new RadJav.Vector3 ();\n\
\n\
		if (vector3 instanceof RadJav.Vector3)\n\
		{\n\
			result.x = this.x * vector3.x;\n\
			result.y = this.y * vector3.y;\n\
			result.z = this.z * vector3.z;\n\
		}\n\
		else\n\
		{\n\
			result.x = this.x * vector3;\n\
			result.y = this.y * vector3;\n\
			result.z = this.z * vector3;\n\
		}\n\
\n\
		return (result);\n\
	}\n\
\n\
	/** @method divide\n\
	* Divide this object by another Vector3 object or number.\n\
	* @param {RadJav.Vector3|Number} Vector3 The Vector3 or Number to divide by.\n\
	*/\n\
	this.divide = function (vector3)\n\
	{\n\
		var result = new RadJav.Vector3 ();\n\
\n\
		if (vector3 instanceof RadJav.Vector3)\n\
		{\n\
			result.x = this.x / vector3.x;\n\
			result.y = this.y / vector3.y;\n\
			result.z = this.z / vector3.z;\n\
		}\n\
		else\n\
		{\n\
			result.x = this.x / vector3;\n\
			result.y = this.y / vector3;\n\
			result.z = this.z / vector3;\n\
		}\n\
\n\
		return (result);\n\
	}\n\
\n\
	/** @method dot\n\
	* Perform a dot product on this object.\n\
	* @param {RadJav.Vector3} vector3 The Vector3 to perform the dot product.\n\
	* @return {Number} The result of the dot product.\n\
	*/\n\
	this.dot = function (vector3)\n\
	{\n\
		var dReturn = ((this.x * vector3.x) + (this.y * vector3.y) + (this.z * vector3.z));\n\
\n\
		return (dReturn);\n\
	}\n\
\n\
	/** @method cross\n\
	* Perform a cross product on this object.\n\
	* @param {RadJav.Vector3} vector3 The Vector3 to perform the dot product.\n\
	* @return {Number} The result of the dot product.\n\
	*/\n\
	this.cross = function (vector3)\n\
	{\n\
		var result = new RadJav.Vector3 ();\n\
\n\
		result.x = (this.y * vector3.z - this.z * vector3.y);\n\
		result.y = (this.z * vector3.x - this.x * vector3.z);\n\
		result.z = (this.x * vector3.y - this.y * vector3.x);\n\
\n\
		return (result);\n\
	}\n\
\n\
	/** @method length\n\
	* Get the length of this object using a square root. This will use Math.sqrt.\n\
	* @return {Number} The length of this object.\n\
	*/\n\
	this.length = function ()\n\
	{\n\
		var dReturn = Math.sqrt ((this.x * this.x) + (this.y * this.y) + (this.z * this.z));\n\
\n\
		return (dReturn);\n\
	}\n\
\n\
	/** @method normalize\n\
	* Normalize this object, this will use this object's length method.\n\
	* @return {Number} The normalized length of this object.\n\
	*/\n\
	this.normalize = function ()\n\
	{\n\
		var dReturn = this.divide (this.length ());\n\
\n\
		return (dReturn);\n\
	}\n\
\n\
	/** @method squaredLength\n\
	* Normalize this object, this will use this object's length method.\n\
	* @return {Number} The normalized length of this object.\n\
	*/\n\
	this.squaredLength = function ()\n\
	{\n\
		var dReturn = ((this.x * this.x) + (this.y * this.y) + (this.z * this.z));\n\
\n\
		return (dReturn);\n\
	}\n\
\n\
	/** @method absDotProduct\n\
	* Get the dot product as an absolute value.\n\
	* @param {RadJav.Vector3} vector3 The Vector3 to perform the dot product.\n\
	* @return {Number} The absolute value of the dot product.\n\
	*/\n\
	this.absDotProduct = function (vector3)\n\
	{\n\
		var dReturn = Math.abs (this.dot (vector3));\n\
\n\
		return (dReturn);\n\
	}\n\
\n\
	/** @method angleBetween\n\
	* Get the angle between two vectors.\n\
	* @param {RadJav.Vector3} vector3 The Vector3 to get the angle from.\n\
	* @return {Number} The angle.\n\
	*/\n\
	this.angleBetween = function (vector3)\n\
	{\n\
		var dTheta = this.dot (vector3) / (this.length () * vector3.length ());\n\
		var dReturn = Math.acos (Math.clamp (dTheta, -1, 1));\n\
\n\
		return (dReturn);\n\
	}\n\
\n\
	/** @method distance\n\
	* Get the distance between two vectors.\n\
	* @param {RadJav.Vector3} vector3 The Vector3 to get the distance from.\n\
	* @return {Number} The distance.\n\
	*/\n\
	this.distance = function (vector3)\n\
	{\n\
		var dX = (this.x - vector3.x);\n\
		var dY = (this.y - vector3.y);\n\
		var dZ = (this.z - vector3.z);\n\
		var dReturn = Math.sqrt ((dX * dX) + (dY * dY) + (dZ * dZ));\n\
\n\
		return (dReturn);\n\
	}\n\
\n\
	/*this.getRotationTo = function (vector3)\n\
	{\n\
		return (null);\n\
	}\n\
\n\
	this.makeCeil = function ()\n\
	{\n\
		return (null);\n\
	}\n\
\n\
	this.makeFloor = function ()\n\
	{\n\
		return (null);\n\
	}\n\
\n\
	this.midPoint = function (vector3)\n\
	{\n\
		return (null);\n\
	}\n\
\n\
	this.perpendicular = function ()\n\
	{\n\
		return (null);\n\
	}\n\
\n\
	this.reflect = function ()\n\
	{\n\
		return (null);\n\
	}*/\n\
}\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.Vector4.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.Vector4\n\
* A Vector4 class.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.Vector4 = function (x, y, z, w)\n\
{\n\
	if (x == null)\n\
		x = 0;\n\
\n\
	if (y == null)\n\
		y = 0;\n\
\n\
	if (z == null)\n\
		z = 0;\n\
\n\
	if (w == null)\n\
		w = 0;\n\
\n\
	if (x instanceof RadJav.Vector2)\n\
	{\n\
		var temp = x;\n\
		x = temp.x;\n\
		y = temp.y;\n\
	}\n\
\n\
	if (x instanceof RadJav.Vector3)\n\
	{\n\
		var temp = x;\n\
		x = temp.x;\n\
		y = temp.y;\n\
		z = temp.z;\n\
	}\n\
\n\
	if (x instanceof RadJav.Vector4)\n\
	{\n\
		var temp = x;\n\
		x = temp.x;\n\
		y = temp.y;\n\
		z = temp.z;\n\
		w = temp.w;\n\
	}\n\
\n\
	/** @property {Number} [x=0]\n\
	* The X component.\n\
	*/\n\
	this.x = x;\n\
	/** @property {Number} [y=0]\n\
	* The Y component.\n\
	*/\n\
	this.y = y;\n\
	/** @property {Number} [z=0]\n\
	* The Z component.\n\
	*/\n\
	this.z = z;\n\
	/** @property {Number} [w=0]\n\
	* The W component.\n\
	*/\n\
	this.w = w;\n\
\n\
	/** @method toString\n\
	* Convert this object to a string.\n\
	* @return {String} The string representing this object.\n\
	*/\n\
	this.toString = function ()\n\
	{\n\
		return (this.x + \",\" + this.y + \",\" + this.z + \",\" + this.w);\n\
	}\n\
}\n\
\n\
function parseVector4 (string)\n\
{\n\
	var v4dReturn = new RadJav.Vector4 ();\n\
\n\
	if (string == \"\")\n\
		return (v4dReturn);\n\
\n\
	string = string.toLowerCase ();\n\
	string = string.replace (/ /g, \"\");\n\
	var aryStrings = string.split (\",\");\n\
\n\
	v4dReturn.x = parseFloat (aryStrings[0]);\n\
	v4dReturn.y = parseFloat (aryStrings[1]);\n\
	v4dReturn.z = parseFloat (aryStrings[2]);\n\
	v4dReturn.w = parseFloat (aryStrings[3]);\n\
\n\
	return (v4dReturn);\n\
}\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.Circle.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.Circle\n\
* A basic circle.\n\
* @author Jason Ryan\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.Circle = function (x, y, r)\n\
{\n\
	if (typeof (x) == \"object\")\n\
	{\n\
		var circle = x;\n\
		x = circle.x;\n\
		y = circle.y;\n\
		r = circle.z;\n\
	}\n\
\n\
	if (x == null)\n\
		x = 0;\n\
\n\
	if (y == null)\n\
		y = 0;\n\
\n\
	if (r == null)\n\
		r = 0;\n\
\n\
	this.x = x;\n\
	this.y = y;\n\
	this.radius_squared = r * r;\n\
\n\
	/** @method pointInside\n\
	* Returns true if the point provided is inside the circle.\n\
	* @param {Number/RadJav.Vector2} x The x coordinate or Vector2 position.\n\
	* @param {Number} [y=null] The y coordinate of the position.\n\
	* @return {Boolean} Returns true if the point is inside the circle.\n\
	*/\n\
	this.pointInside = function (x, y)\n\
	{\n\
		if (typeof (x) == \"object\")\n\
		{\n\
			var pos = x;\n\
			x = pos.x;\n\
			y = pos.y;\n\
		}\n\
\n\
		var distance_squared = ((x - this.x) * (x - this.x) + (y - this.y) * (y - this.y));\n\
\n\
		if(distance_squared < this.radius_squared)\n\
			return (true);\n\
\n\
		return (false);\n\
	}\n\
\n\
	/** @method dsqPointInside\n\
	* Get the distance from the inside of the circle to a point.\n\
	* @param {Number} distance_squared The distance away that would be considered inside the circle.\n\
	* @return {Boolean} Returns true if the distance from the point is inside the circle.\n\
	*/\n\
	this.dsqPointInside = function (distance_squared)\n\
	{\n\
		if(distance_squared < this.radius_squared)\n\
			return (true);\n\
\n\
		return (false);\n\
	}\n\
}\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.Rectangle.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.Rectangle\n\
* A basic rectangle.\n\
* @param {Number|RadJav.Vector2|RadJav.Vector4} [x=0] The x coordinate of the rectangle. Can also be a Vector2 \n\
* representing the position of this rectangle. Lastly, it can also be a Vector4 representing the \n\
* rectangle's position and size.\n\
* @param {Number|RadJav.Vector2} [y=0] The y coordinate of the rectangle. Can also be a Vector2 \n\
* representing the size of this rectangle.\n\
* @param {Number} [w=0] The width of this rectangle.\n\
* @param {Number} [h=0] The height of this rectangle.\n\
* @author Jason Ryan\n\
* @author Nathanael Coonrod\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.Rectangle = function (x, y, w, h)\n\
{\n\
	if (typeof (x) == \"object\")\n\
	{\n\
		if (x.w != null)\n\
		{\n\
			var rect = x;\n\
\n\
			x = pos.x;\n\
			y = pos.y;\n\
			w = pos.z;\n\
			h = pos.w;\n\
		}\n\
		else\n\
		{\n\
			var pos = x;\n\
\n\
			x = pos.x;\n\
			y = pos.y;\n\
		}\n\
	}\n\
\n\
	if (typeof (y) == \"object\")\n\
	{\n\
		var size = x;\n\
\n\
		w = size.x;\n\
		h = size.y;\n\
	}\n\
\n\
	if (x == null)\n\
		x = 0;\n\
\n\
	if (y == null)\n\
		y = 0;\n\
\n\
	if (w == null)\n\
		w = 0;\n\
\n\
	if (h == null)\n\
		h = 0;\n\
\n\
	this.x = x;\n\
	this.y = y;\n\
	this.width = w;\n\
	this.height = h;\n\
	this.top = this.y + this.height;\n\
	this.bottom = this.y - this.height;\n\
	this.left = this.x - this.width;\n\
	this.right = this.x + this.width;\n\
\n\
	/** @method setPosition\n\
	* Set the position of this object.\n\
	* @param {Number|RadJav.Vector2} x The x coordinate of this object, or the Vector2 \n\
	* representing the coordinates of this object.\n\
	* @param {Number} [y=null] The y coordinate of this object.\n\
	*/\n\
	this.setPosition = function (x, y)\n\
	{\n\
		if (typeof (x) == \"object\")\n\
		{\n\
			var pos = x;\n\
			x = pos.x;\n\
			y = pos.y;\n\
		}\n\
\n\
		this.x = x;\n\
		this.y = y;	\n\
		this.top = this.y + this.height;\n\
		this.bottom = this.y - this.height;\n\
		this.left = this.x - this.width;\n\
		this.right = this.x + this.width;\n\
	}\n\
\n\
	/** @method getPosition\n\
	* Get the position of this object.\n\
	* @return {RadJav.Vector2} The Vector2 representing the position of this object.\n\
	*/\n\
	this.getPosition = function ()\n\
	{\n\
		return (new RadJav.Vector2 (this.x, this.y));\n\
	}\n\
\n\
	/** @method setSize\n\
	* Set the size of this object.\n\
	* @param {Number|RadJav.Vector2} w The width of this object, or the Vector2 \n\
	* representing the size of this object.\n\
	* @param {Number} [h=null] The height of this object.\n\
	*/\n\
	this.setSize = function (w, h)\n\
	{\n\
		if (typeof (w) == \"object\")\n\
		{\n\
			var size = w;\n\
			w = size.x;\n\
			h = size.y;\n\
		}\n\
\n\
		this.width = w;\n\
		this.height = h;\n\
		this.top = this.y + this.height;\n\
		this.bottom = this.y - this.height;\n\
		this.left = this.x - this.width;\n\
		this.right = this.x + this.width;\n\
	}\n\
\n\
	/** @method getSize\n\
	* Get the size of this object.\n\
	* @return {RadJav.Vector2} The Vector2 representing the size of this object.\n\
	*/\n\
	this.getSize = function ()\n\
	{\n\
		return (new RadJav.Vector2 (this.width, this.height));\n\
	}\n\
\n\
	/** @method pointInside\n\
	* Check if a point is inside this object.\n\
	* @param {Number|RadJav.Vector2} x The x coordinate of the point, or the Vector2 \n\
	* representing the coordinates of the point to check.\n\
	* @param {Number} [y=null] The y coordinate of the point.\n\
	* @return {Boolean} Returns true if the point is inside the rectangle.\n\
	*/\n\
	this.pointInside = function (x, y)\n\
	{\n\
		if (typeof (x) == \"object\")\n\
		{\n\
			var pos = x;\n\
			x = pos.x;\n\
			y = pos.y;\n\
		}\n\
\n\
		if (x > this.right)\n\
			return (false);\n\
\n\
		if (x < this.left)\n\
			return (false);\n\
\n\
		if (y > this.top)\n\
			return (false);\n\
\n\
		if (y < this.bottom)\n\
			return (false);\n\
\n\
		return (true);\n\
	}\n\
\n\
	/** @method xInside\n\
	* Check if a x coordinate is inside this rectangle.\n\
	* @param {Number} x The x coordinate of the point to check.\n\
	* @return {Boolean} Returns true if the x coordinate is inside the rectangle.\n\
	*/\n\
	this.xInside = function (x)\n\
	{\n\
		if (x > this.right)\n\
			return (false);\n\
\n\
		if (x < this.left)\n\
			return (false);\n\
\n\
		return (true);\n\
	}\n\
\n\
	/** @method yInside\n\
	* Check if a y coordinate is inside this rectangle.\n\
	* @param {Number} y The y coordinate of the point to check.\n\
	* @return {Boolean} Returns true if the y coordinate is inside the rectangle.\n\
	*/\n\
	this.yInside = function (y)\n\
	{\n\
		if (y > this.top)\n\
			return (false);\n\
\n\
		if (y < this.bottom)\n\
			return (false);\n\
\n\
		return (true);\n\
	}\n\
}\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.Font.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.Font\n\
* The font class.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.Font = function (obj)\n\
{\n\
	if (obj == null)\n\
		obj = {};\n\
\n\
	if (obj.color != null)\n\
		obj.color = new RadJav.Color (obj.color);\n\
\n\
	/** @property {String} [fontFamily=\"\"]\n\
	* The font family used.\n\
	*/\n\
	this.fontFamily = RadJav.setDefaultValue (obj.fontFamily, \"\");\n\
	/** @property {Number} [size=12]\n\
	* The font size.\n\
	*/\n\
	this.size = RadJav.setDefaultValue (obj.size, 12);\n\
	/** @property {RadJav.Color} [color=RadJav.Color.Black]\n\
	* The font color.\n\
	*/\n\
	this.color = RadJav.setDefaultValue (obj.color, RadJav.Color.Black);\n\
	/** @property {Boolean} [underline=false]\n\
	* Whether or not this font is underlined.\n\
	*/\n\
	this.underline = RadJav.setDefaultValue (obj.underline, false);\n\
	/** @property {Boolean} [bold=false]\n\
	* Whether or not this font is bold.\n\
	*/\n\
	this.bold = RadJav.setDefaultValue (obj.bold, false);\n\
	/** @property {Boolean} [italic=false]\n\
	* Whether or not this font is italic.\n\
	*/\n\
	this.italic = RadJav.setDefaultValue (obj.italic, false);\n\
}\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.IO.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.IO.TextFile\n\
* Handles text files.\n\
* Available on platforms: Windows,Linux,OSX\n\
*/\n\
RadJav.IO.TextFile = function ()\n\
{\n\
}\n\
\n\
/** @property {Number} [read=1]\n\
* @static\n\
* Read from a file.\n\
*/\n\
RadJav.IO.TextFile.read = 1;\n\
/** @property {Number} [write=2]\n\
* @static\n\
* Write to a file.\n\
*/\n\
RadJav.IO.TextFile.write = 2;\n\
/** @property {Number} [append=3]\n\
* @static\n\
* Append to a file.\n\
*/\n\
RadJav.IO.TextFile.append = 3;\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.IO.SerialComm.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.IO.SerialComm\n\
* The serial communications class.\n\
* Available on platforms: Windows,Linux,OSX\n\
*/\n\
RadJav.IO.SerialComm = function ()\n\
{\n\
	/** @property {String} [_port=0]\n\
	* @protected\n\
	* The port to connect to.\n\
	*/\n\
	this._port = RadJav.setDefaultValue(obj._port, \"\");\n\
	/** @property {Number} [_baud=9600]\n\
	* @protected\n\
	* The baud to use.\n\
	*/\n\
	this._baud = RadJav.setDefaultValue(obj._baud, 9600);\n\
	/** @property {Number} [_byteSize=8]\n\
	* @protected\n\
	* The byte size to use.\n\
	*/\n\
	this._byteSize = RadJav.setDefaultValue(obj._byteSize, 8);\n\
	/** @property {Number} [_stopBits=RadJav.IO.SerialComm.oneStopBit]\n\
	* @protected\n\
	* The stop bits to use.\n\
	*/\n\
	this._stopBits = RadJav.setDefaultValue(obj._stopBits, RadJav.IO.SerialComm.oneStopBit);\n\
	/** @property {Number} [_parity=RadJav.IO.SerialComm.noParity]\n\
	* @protected\n\
	* The parity to use.\n\
	*/\n\
	this._parity = RadJav.setDefaultValue(obj._parity, RadJav.IO.SerialComm.noParity);\n\
	/** @property {Boolean} [_isOpen=false]\n\
	* @protected\n\
	* Whether or not this connection is open.\n\
	*/\n\
	this._isOpen = RadJav.setDefaultValue(obj._isOpen, false);\n\
	/** @property {Number} [_appObj=null]\n\
	* @protected\n\
	* The app object associated with this object.\n\
	*/\n\
	this._appObj = RadJav.setDefaultValue(obj._appObj, null);\n\
}\n\
\n\
/** @property {Number} [oneStopBit=0]\n\
* @static\n\
* One stop bit\n\
*/\n\
RadJav.IO.SerialComm.oneStopBit = 0;\n\
/** @property {Number} [one5StopBits=1]\n\
* @static\n\
* One 5 stop bits.\n\
*/\n\
RadJav.IO.SerialComm.one5StopBits = 1;\n\
/** @property {Number} [twoStopBits=2]\n\
* @static\n\
* Two stop bits.\n\
*/\n\
RadJav.IO.SerialComm.twoStopBits = 1;\n\
/** @property {Number} [noParity=0]\n\
* @static\n\
* No parity.\n\
*/\n\
RadJav.IO.SerialComm.noParity = 0;\n\
/** @property {Number} [oddParity=1]\n\
* @static\n\
* Odd parity.\n\
*/\n\
RadJav.IO.SerialComm.oddParity = 1;\n\
/** @property {Number} [evenParity=2]\n\
* @static\n\
* Even parity.\n\
*/\n\
RadJav.IO.SerialComm.evenParity = 2;\n\
/** @property {Number} [markParity=3]\n\
* @static\n\
* Mark parity.\n\
*/\n\
RadJav.IO.SerialComm.markParity = 3;\n\
/** @property {Number} [spaceParity=4]\n\
* @static\n\
* Space parity.\n\
*/\n\
RadJav.IO.SerialComm.spaceParity = 4;\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.GObject.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
RadJav.GUI.GObject = RadJav.Class.extend (\n\
{\n\
	init: function(obj, text, parent, beforeCreatedChild)\n\
	{\n\
		if (obj == null)\n\
			obj = new Object ();\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var tempObj = obj;\n\
			obj = {};\n\
			obj.name = tempObj;\n\
		}\n\
\n\
		if (beforeCreatedChild == undefined)\n\
			beforeCreatedChild = null;\n\
\n\
		if (text != null)\n\
			obj._text = text;\n\
\n\
		if (parent != null)\n\
			obj._parent = parent;\n\
\n\
		if (obj.text != null)\n\
			obj._text = obj.text;\n\
\n\
		if (obj.cursor != null)\n\
			obj._cursor = obj.cursor;\n\
\n\
		if (obj.visible != null)\n\
			obj._visible = obj.visible;\n\
\n\
		if (obj.visibility != null)\n\
			obj._visible = obj.visibility;\n\
\n\
		if (obj.zIndex != null)\n\
			obj._zIndex = obj.zIndex;\n\
\n\
		if (obj.font != null)\n\
			obj._font = new RadJav.Font (obj.font);\n\
\n\
		if (obj.parent != null)\n\
			obj._parent = obj.parent;\n\
\n\
		/** @property {String} [name=\"\"]\n\
		* The name of this object.\n\
		*/\n\
		this.name = RadJav.setDefaultValue (obj.name, \"\");\n\
		/** @property {String} [type=\"\"]\n\
		* The type of object.\n\
		*/\n\
		this.type = RadJav.setDefaultValue (obj.type, \"\");\n\
		/** @property {RadJav.Rectangle} [_transform=new Rectangle ()]\n\
		* @protected\n\
		* The transform of this object.\n\
		*/\n\
		this._transform = RadJav.setDefaultValue (obj._transform, new RadJav.Rectangle ());\n\
		/** @property {Boolean} [_visible=true]\n\
		* @protected\n\
		* The visibility of the object.\n\
		*/\n\
		this._visible = RadJav.setDefaultValue (obj._visible, true);\n\
		/** @property {Number} [_zIndex=0]\n\
		* @protected\n\
		* The initial z-index of this object. The higher the value the more \"on top\" the \n\
		* object will be compared to other objects.\n\
		*/\n\
		this._zIndex = RadJav.setDefaultValue (obj._zIndex, 0);\n\
		/** @property {String} [_text=\"\"]\n\
		* @protected\n\
		* The text associated with this object.\n\
		*/\n\
		this._text = RadJav.setDefaultValue (obj._text, \"\");\n\
		/** @property {RadJav.Font} [_font=new RadJav.Font ()]\n\
		* @protected\n\
		* The font associated with this object.\n\
		*/\n\
		this._font = RadJav.setDefaultValue (obj._font, new RadJav.Font ());\n\
		/** @property {String} [_cursor=\"default\"]\n\
		* @protected\n\
		* The cursor to use.\n\
		*/\n\
		this._cursor = RadJav.setDefaultValue (obj._cursor, \"default\");\n\
		/** @property {Mixed} [_parent=null]\n\
		* @protected\n\
		* The parent of this object.\n\
		*/\n\
		this._parent = RadJav.setDefaultValue (obj._parent, null);\n\
		/** @property {RadJav.GUI.GObject[]} [_children=[]]\n\
		* @protected\n\
		* This object's children.\n\
		*/\n\
		this._children = RadJav.setDefaultValue (obj._children, []);\n\
		/** @property {Mixed} [_html=null]\n\
		* @protected\n\
		* The native web object associated with this object.\n\
		*/\n\
		this._html = RadJav.setDefaultValue (obj._html, null);\n\
		/** @property {Mixed} [_appObj=null]\n\
		* @protected\n\
		* The native os gui object associated with this object.\n\
		*/\n\
		this._appObj = RadJav.setDefaultValue(obj._appObj, null);\n\
		/** @property {Object} [createOnPlatforms=null]\n\
		* @protected\n\
		* Create this object only on certain platforms. All platforms will be enabled \n\
		* by default, only the ones listed in each key will either be created or \n\
		* denied by their boolean value. Ex: { \"WIN32\": true, \"HTML5\": false }.\n\
		* Possible keys are: \n\
		* WIN32\n\
		* WIN64\n\
		* LINUX32\n\
		* LINUX64\n\
		* MACOSX32\n\
		* MACOSX64\n\
		* HTML5\n\
		*/\n\
		this.createOnPlatforms = RadJav.setDefaultValue(obj.createOnPlatforms, null);\n\
		/** @event [onBeforeChildCreated=null]\n\
		* The function to execute before a child is created.\n\
		*/\n\
		this.onBeforeChildCreated = RadJav.setDefaultValue(obj.onBeforeChildCreated, null);\n\
		/** @event [onCreated=null]\n\
		* The function to execute once the object has been created.\n\
		*/\n\
		this.onCreated = RadJav.setDefaultValue(obj.onCreated, null);\n\
		/** @event [_events={}]\n\
		* Events to call.\n\
		*/\n\
		this._events = RadJav.setDefaultValue(obj._events, {});\n\
\n\
		//this._text = this._text.replaceAll (\" \", \"&nbsp;\");\n\
\n\
		//if (this._parent != null)\n\
			//this._parent._children.push (this);\n\
\n\
		if (obj.events != null)\n\
			this._events = obj.events;\n\
\n\
		if (obj.click != null)\n\
			this._events.click = obj.click;\n\
\n\
		if (obj.children != null)\n\
		{\n\
			for (var iIdx = 0; iIdx < obj.children.length; iIdx++)\n\
			{\n\
				var obj2 = obj.children[iIdx];\n\
				var createObject = true;\n\
\n\
				if (this.onBeforeChildCreated != null)\n\
				{\n\
					var result = this.onBeforeChildCreated (obj2, parent);\n\
\n\
					if (result != null)\n\
						createObject = result;\n\
				}\n\
\n\
				if (createObject == true)\n\
					this._children.push (obj2);\n\
			}\n\
		}\n\
\n\
		if (obj.position != null)\n\
		{\n\
			var position = new RadJav.Vector2 ();\n\
\n\
			if (typeof (obj.position) == \"string\")\n\
				position = RadJav.Vector2.parseVector2 (obj.position);\n\
			else\n\
				position = obj.position;\n\
\n\
			this._transform.setPosition (position);\n\
		}\n\
\n\
		if (obj.size != null)\n\
		{\n\
			var size = new RadJav.Vector2 ();\n\
\n\
			if (typeof (obj.size) == \"string\")\n\
				size = RadJav.Vector2.parseVector2 (obj.size);\n\
			else\n\
				size = obj.size;\n\
\n\
			this._transform.setSize (size);\n\
		}\n\
	}, \n\
\n\
	show : function()\n\
	{\n\
		this.setVisibility(true);\n\
	},\n\
\n\
	hide: function()\n\
	{\n\
		this.setVisibility(false);\n\
	}\n\
});\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.Button.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.Button\n\
* @extends RadJav.GUI.GObject\n\
* A button.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.Button = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.Button\", \n\
					size: \"80,40\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.Canvas3D.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.Canvas3D\n\
* @extends RadJav.GUI.GObject\n\
* A 3d canvas.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.Canvas3D = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.Canvas3D\", \n\
					size: \"500,350\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
\n\
		/** @property {Mixed} [_renderer=null]\n\
		* @protected\n\
		* The renderer used to render the canvas.\n\
		*/\n\
		this._renderer = RadJav.setDefaultValue (obj._renderer, null);\n\
		/** @property {Number} [_rendererType=1]\n\
		* @protected\n\
		* The renderer type used to render the canvas.\n\
		*/\n\
		this._rendererType = RadJav.setDefaultValue (obj._renderer, 1);\n\
		/** @property {Object} [_currentCamera=null]\n\
		* @protected\n\
		* The current camera used to render the scene.\n\
		*/\n\
		this._currentCamera = RadJav.setDefaultValue (obj._currentCamera, null);\n\
		/** @property {Object} [_models={}]\n\
		* @protected\n\
		* The models that have been loaded for use. Each key is a RadJav.C3D.Model.\n\
		*/\n\
		this._models = RadJav.setDefaultValue (obj._models, {});\n\
		/** @property {Object} [_materials={}]\n\
		* @protected\n\
		* The materials that have been loaded for use. Each key is a RadJav.C3D.Material.\n\
		*/\n\
		this._materials = RadJav.setDefaultValue (obj._materials, {});\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
/** @class RadJav.GUI.Canvas3D.RendererTypes\n\
* A 3d canvas.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.Canvas3D.RendererTypes = function ()\n\
{\n\
}\n\
\n\
RadJav.GUI.Canvas3D.RendererTypes.AnyAvailable = 1;\n\
RadJav.GUI.Canvas3D.RendererTypes.WebGL = 2;\n\
RadJav.GUI.Canvas3D.RendererTypes.Context2D = 3;\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.Checkbox.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.Checkbox\n\
* @extends RadJav.GUI.GObject\n\
* A checkbox.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.Checkbox = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		if (obj.checked != null)\n\
			obj._checked = obj.checked;\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.Checkbox\", \n\
					size: \"80, 40\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
\n\
		/** @property {Boolean} [_checked=false]\n\
		* If set to true, the box is checked.\n\
		*/\n\
		this._checked = RadJav.setDefaultValue (obj._checked, false);\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.Combobox.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.Combobox\n\
* @extends RadJav.GUI.GObject\n\
* A Textbox.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.Combobox = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		if (obj.items != null)\n\
			obj._items = obj.items;\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.Combobox\", \n\
					size: \"120, 40\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
\n\
		/** @property {String} [_items=[]]\n\
		* The items associated with this object.\n\
		*/\n\
		this._items = RadJav.setDefaultValue (obj._items, []);\n\
		this.onCreated = function ()\n\
			{\n\
				for (var iIdx = 0; iIdx < this._items.length; iIdx++)\n\
				{\n\
					var item = this._items[iIdx];\n\
					this.addItem (item);\n\
				}\n\
			};\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
/** @class RadJav.GUI.Combobox.Item\n\
* A combobox item.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.Combobox.Item = RadJav.Class.extend (\n\
{\n\
	init: function (obj)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		/** @property {String} [name=\"\"]\n\
		* The name.\n\
		*/\n\
		this.name = RadJav.setDefaultValue (obj.name, \"\");\n\
		/** @property {String} [text=\"\"]\n\
		* The item's display text.\n\
		*/\n\
		this.text = RadJav.setDefaultValue (obj.text, \"\");\n\
	}\n\
});\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.Container.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.Container\n\
* @extends RadJav.GUI.GObject\n\
* A container.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.Container = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.Container\", \n\
					size: \"100,100\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.Image.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.Image\n\
* @extends RadJav.GUI.GObject\n\
* An image.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.Image = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.Image\", \n\
					size: \"100,100\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
\n\
		if (obj.image != null)\n\
			obj._image = obj.image;\n\
\n\
		/** @property {String/Image} [_image=null]\n\
		* @protected\n\
		* The image thats being used. If a string, it will be converted into \n\
		* an Image when the image is set.\n\
		*/\n\
		this._image = RadJav.setDefaultValue (obj._image, null);\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.Label.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.Label\n\
* @extends RadJav.GUI.GObject\n\
* A label.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.Label = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.Label\", \n\
					size: \"120, 40\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.List.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.List\n\
* @extends RadJav.GUI.GObject\n\
* A List.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.List = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.List\", \n\
					size: \"350, 300\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
\n\
		if (obj.columns != null)\n\
			obj._columns = obj.columns;\n\
\n\
		/** @property {Boolean} [_hasCheckBoxes=false]\n\
		* @protected\n\
		* If set to true, each row will have a checkbox.\n\
		*/\n\
		this._hasCheckBoxes = RadJav.setDefaultValue (obj._hasCheckBoxes, false);\n\
		/** @property {RadJav.GUI.List.Column[]} [_columns=[]]\n\
		* @protected\n\
		* The columns in the list box.\n\
		*/\n\
		this._columns = RadJav.setDefaultValue (obj._columns, []);\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
/** @class RadJav.GUI.List.Row\n\
* A List row.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.List.Row = RadJav.Class.extend (\n\
{\n\
	init: function (obj)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		/** @property {RadJav.GUI.List.Item[]} [items=[]]\n\
		* The items to display.\n\
		*/\n\
		this.items = RadJav.setDefaultValue (obj.items, []);\n\
	}, \n\
\n\
	/** @method addItem\n\
	* Add an item to this row.\n\
	* @param {RadJav.GUI.List.Item} item The item to add.\n\
	*/\n\
	addItem: function (item)\n\
	{\n\
		if (typeof (item) != \"object\")\n\
			item = new RadJav.GUI.List.Item ({ text: item });\n\
\n\
		this.items.push (item);\n\
	}\n\
});\n\
\n\
/** @class RadJav.GUI.List.Item\n\
* A List item.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.List.Item = RadJav.Class.extend (\n\
{\n\
	init: function (obj)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		/** @property {String} [name=\"\"]\n\
		* The name to display.\n\
		*/\n\
		this.name = RadJav.setDefaultValue (obj.name, \"\");\n\
		/** @property {String} [text=\"\"]\n\
		* The text to display.\n\
		*/\n\
		this.text = RadJav.setDefaultValue (obj.text, \"\");\n\
	}\n\
});\n\
\n\
/** @class RadJav.GUI.List.Column\n\
* A List column.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.List.Column = RadJav.Class.extend (\n\
{\n\
	init: function (obj)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		/** @property {String} [text=\"\"]\n\
		* The text to display.\n\
		*/\n\
		this.text = RadJav.setDefaultValue (obj.text, \"\");\n\
		/** @property {Number} [width=0]\n\
		* The column width. If set to 0, the width will be automatic.\n\
		*/\n\
		this.width = RadJav.setDefaultValue (obj.width, 0);\n\
		/** @property {Object} [key=null]\n\
		* The key associated with this column.\n\
		*/\n\
		this.key = RadJav.setDefaultValue (obj.key, null);\n\
	}\n\
});\n\
\n\
/** @class RadJav.GUI.List.Selection\n\
* A List selection.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.List.Selection = RadJav.Class.extend (\n\
{\n\
	init: function (obj)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		/** @property {Mixed} [_html=null]\n\
		* @protected\n\
		* The HTML object associated with this selection.\n\
		*/\n\
		this._html = RadJav.setDefaultValue (obj._html, null);\n\
		/** @property {Mixed} [_appObj=null]\n\
		* @protected\n\
		* The os object associated with this selection.\n\
		*/\n\
		this._appObj = RadJav.setDefaultValue (obj._appObj, null);\n\
	}\n\
});\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.Radio.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.Radio\n\
* @extends RadJav.GUI.GObject\n\
* A Radio button.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.Radio = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		if (obj.radioGroup != null)\n\
			obj._radioGroup = obj.radioGroup;\n\
\n\
		if (obj.checked != null)\n\
			obj._checked = obj.checked;\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.Radio\", \n\
					size: \"80, 40\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
\n\
		/** @property {String} [_radioGroup=\"\"]\n\
		* @protected\n\
		* The group this box is associated grouped with.\n\
		*/\n\
		this._radioGroup = RadJav.setDefaultValue (obj._radioGroup, \"\");\n\
		/** @property {Boolean} [_checked=false]\n\
		* @protected\n\
		* Whether or not this object is checked when created.\n\
		*/\n\
		this._checked = RadJav.setDefaultValue (obj._checked, false);\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.Textarea.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.Textarea\n\
* @extends RadJav.GUI.GObject\n\
* A Textarea.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.Textarea = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.Textarea\", \n\
					size: \"120, 120\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.Textbox.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.Textbox\n\
* @extends RadJav.GUI.GObject\n\
* A Textbox.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.Textbox = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.Textbox\", \n\
					size: \"120, 40\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.WebView.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.WebView\n\
* @extends RadJav.GUI.GObject\n\
* A button.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.WebView = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.WebView\", \n\
					size: \"400,400\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.Window.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.Window\n\
* @extends RadJav.GUI.GObject\n\
* A window.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.Window = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.Window\", \n\
					size: \"500, 350\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.MenuBar.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.MenuBar\n\
* @extends RadJav.GUI.GObject\n\
* A menu Bar.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.MenuBar = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.MenuBar\", \n\
					size: \"120, 40\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
"));
			javascriptFiles.push_back (JSFile ("RadJav.GUI.MenuItem.js", "/*\n\
	MIT-LICENSE\n\
	Copyright (c) 2017 Higher Edge Software, LLC\n\
\n\
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software \n\
	and associated documentation files (the \"Software\"), to deal in the Software without restriction, \n\
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, \n\
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, \n\
	subject to the following conditions:\n\
\n\
	The above copyright notice and this permission notice shall be included in all copies or substantial \n\
	portions of the Software.\n\
\n\
	THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT \n\
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \n\
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n\
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION \n\
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\
*/\n\
\n\
/** @class RadJav.GUI.MenuItem\n\
* @extends RadJav.GUI.GObject\n\
* A menu item.\n\
* Available on platforms: Windows,Linux,OSX,HTML5\n\
*/\n\
RadJav.GUI.MenuItem = RadJav.GUI.GObject.extend (\n\
{\n\
	init: function (obj, text, parent)\n\
	{\n\
		if (obj == null)\n\
			obj = {};\n\
\n\
		if (typeof (obj) == \"string\")\n\
		{\n\
			var name = obj;\n\
			obj = { name: name };\n\
		}\n\
\n\
		RadJav.copyProperties (obj, {\n\
					type: \"RadJav.GUI.MenuItem\", \n\
					size: \"120, 40\"\n\
				}, false);\n\
		this._super (obj, text, parent);\n\
		this._createAppObj();\n\
	}\n\
});\n\
\n\
"));

		}
	}
#endif

