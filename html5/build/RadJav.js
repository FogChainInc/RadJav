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
/** @property {Number} [inv180=(1 / 180)]
* @static
* The value of 1 / 180.
*/
Math.inv180 = 1 / 180;
/** @property {Number} [invPI=(1 / this.PI)]
* @static
* The value of 1 / Math.PI.
*/
Math.invPI = 1 / this.PI;
/** @method map
* @static
* Map a value.
*/
Math.map = function (value, start1, stop1, start2, stop2) {
    return (start2 + (stop2 - start2) * (value - start1) / (stop1 - start1));
};
/** @method sinh
* @static
* Get a sinh value.
*/
Math.sinh = function (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    return (this.exp(arg) - this.exp(-arg)) / 2;
};
/** @method cosh
* @static
* Get a cosh value.
*/
Math.cosh = function (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    return (this.exp(arg) + Math.exp(-arg)) / 2;
};
/** @method tanh
* @static
* Get a tanh value.
*/
Math.tanh = function (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    return (this.exp(arg) - this.exp(-arg)) / (this.exp(arg) + this.exp(-arg));
};
/** @method log10
* @static
* Get a log value.
*/
Math.log10 = function (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: Onno Marsman
    // +   improved by: Tod Gentille
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    return this.log(arg) / 2.302585092994046; // Math.LN10
};
/** @method clamp
* @static
* Clamp a value.
*/
Math.clamp = function (x, a, b) {
    var dReturn = 0;
    if (x < a)
        dReturn = a;
    else {
        if (x > b)
            dReturn = b;
        else
            dReturn = x;
    }
    return (dReturn);
};
/** @method degreesToRadians
* @static
* Convert degrees to radians.
* @param {Number} degrees The degrees value to convert.
* @return {Number} The radians.
*/
Math.degreesToRadians = function (degrees) {
    return (degrees * (this.PI * this.inv180));
};
/** @method radiansToDegrees
* @static
* Convert radians to degrees.
* @param {Number} radians The radians value to convert.
* @return {Number} The degrees.
*/
Math.radiansToDegrees = function (radians) {
    return (radians * (180 * this.invPI));
};
/** @method randomRange
* @static
* Get a random number within a range.
* @param {Number} min The minimum value.
* @param {Number} max The maximum value.
* @return {Number} The random number within the range.
*/
Math.randomRange = function (min, max) {
    return (this.floor(this.random() * ((max - min) + 1)) + min);
};
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
/** @method insertAt
* Insert a string at a specific position.
* @param {Number} startPos The starting position to insert the string.
* @param {String} str The string to insert.
* @return {String} The final string.
*/
String.prototype.insertAt = function (startPos, str) {
    var finalStr = "";
    finalStr += this.substr(0, startPos);
    finalStr += str;
    finalStr += this.substr(startPos + 1);
    return finalStr;
};
/** @method removeAt
* Remove string at a specific position.
* @param {Number} startPos The starting position to insert the string.
* @param {Number} [length=-1] The number of characters to remove.
* @return {String} The final string.
*/
String.prototype.removeAt = function (startPos, length) {
    var str = this;
    if (length < 0)
        length = str.length;
    var finalStr = str.substr(0, startPos);
    finalStr += str.substr(startPos + length);
    return finalStr;
};
/** @method replaceAll
* Replace all occurances of a string with another.
* @param {String} str The string to replace.
* @param {String} replacement The string to replace str with.
* @return {String} The final string.
*/
String.prototype.replaceAll = function (str, replacement) {
    return this.replace(new RegExp(str, "g"), replacement);
};
/** @class Promise
 * An object that executes when a process has completed.
 */
/** @class RadJav
 * @static
 * The main object that starts RadJav.
 */
var RadJav;
(function (RadJav) {
    /** @property {Boolean} [useEval=false]
    * Allow the use of eval.
    */
    RadJav.useEval = true;
    /** @property {Number} [MIN_VERSION=0.05]
    * The minimum version of code that can be ran.
    */
    RadJav.MIN_VERSION = 0.05;
    /** @property {Number} [VERSION=0.05]
    * The current version.
    */
    RadJav.VERSION = 0.05;
    /** @property {String} [baseUrl="./RadJav"]
    * The url to the directory where RadJav is located.
    */
    RadJav.baseUrl = "./RadJav/";
    /** @property {String} [themeUrl="./RadJav/themes/default"]
    * The url to the directory where the theme will be loaded.
    */
    RadJav.themeUrl = "./RadJav/themes/default";
    /** @property {String} [selectedLanguage="en_us"]
    * The selected language.
    */
    RadJav.selectedLanguage = "en_us";
    /** @property {RadJav.Theme} [themes=null]
    * The current theme that has been loaded.
    */
    RadJav.themes = null;
    /** @property {Boolean} [_isInitialized=false]
    * If set to true, RadJav has been initialized.
    */
    RadJav._isInitialized = false;
    /** @property {String[]} [_included=[]]
    * If set to true, RadJav has been initialized.
    */
    RadJav._included = [];
    /** @property {String[]} [_lang=[]]
    * If set to true, RadJav has been initialized.
    */
    RadJav._lang = {};
    /** @property {Number} [_screenWidth=window.innerWidth]
    * The width of the window's screen.
    */
    RadJav._screenWidth = window.innerWidth;
    /** @property {Number} [_screenHeight=window.innerHeight]
    * The height of the window's screen.
    */
    RadJav._screenHeight = window.innerHeight;
    /** @property {Object} [themeUtils={}]
    * Miscellaneous theme utilities to use.
    */
    RadJav.themeUtils = {};
    /** @property {Boolean} [useAjax=true]
    * If set to true, each file loaded by RadJav will use ajax.
    */
    RadJav.useAjax = true;
    /** @property {Boolean} [isMinified=false]
    * Is set to true if RadJav has been minified.
    */
    RadJav.isMinified = false;
    /** @method quit
    * Exit the application.
    * Available on platforms: Windows,Linux,OSX
    * @param {Number} [exitCode=0] The exit code to end the application with.
    */
    function quit(exitCode) {
        if (exitCode === void 0) { exitCode = 0; }
    }
    RadJav.quit = quit;
    /** @method exit
    * Exit the application.
    * Available on platforms: Windows,Linux,OSX
    * @param {Number} [exitCode=0] The exit code to end the application with.
    */
    function exit(exitCode) { }
    RadJav.exit = exit;
    /** @method include
    * Load and return a module. If the module has not already been loaded, this will create
    * an asynchronous connection to the server and include whatever javascript files it needs.
    * @param {String} path The path to the module to load.
    * @return {Promise} The promise containing the loaded module.
    */
    function include(path) {
        var promise = null;
        if (RadJav.useAjax == true) {
            promise = RadJav._getResponse(path).then(RadJav.keepContext(function (response) {
                if (response != null) {
                    if (response != "") {
                        var func = new Function(response);
                        func.apply(window, []);
                    }
                }
            }, this));
        }
        else {
            promise = new Promise(RadJav.keepContext(function (resolve, reject) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                //script.async = false;
                //script.defer = false;
                var str = "";
                var event = document.createEvent('');
                if (RadJav._isUsingInternetExplorerTheWorstWebBrowserEver() == true)
                    script.text = str;
                else {
                    var textNode = document.createTextNode(str);
                    script.appendChild(textNode);
                }
                script.onreadystatechange = RadJav.keepContext(function (evt, script2) {
                    var s = script2[0];
                    if (s.readyState == null)
                        s.readyState = "complete";
                    if (s.readyState == "complete")
                        resolve();
                }, this, [script]);
                script.onload = script.onreadystatechange;
                script.onerror = RadJav.keepContext(function (err) {
                    throw RadJav.getLangString("errorWhileIncludingFile", err.message, path);
                }, this);
                script.src = path;
                document.documentElement.insertBefore(script, document.documentElement.firstChild);
            }, this));
        }
        return promise;
    }
    RadJav.include = include;
    /** @method initialize
    * Initialize RadJav.
    * @param {Object[]} [libraries=null] The libraries to include.
    * @return {Promise} The promise to execute.
    */
    function initialize(libraries) {
        var promise = new Promise(RadJav.keepContext(function (resolve, reject, args) {
            if (RadJav._isInitialized == true) {
                resolve();
                return;
            }
            var promises = [];
            promises.push(RadJav._loadLanguages());
            if (libraries == null || libraries.length == 0) {
                promises.push(RadJav.includeLibraries(RadJav.getStandardLibrary()));
                promises.push(RadJav.includeLibraries(RadJav.getGUILibrary()));
            }
            if (libraries != null) {
                if (args.length > 1) {
                    for (var iIdx = 1; iIdx < args.length; iIdx++) {
                        var tempArg = args[iIdx];
                        for (var iJdx = 0; iJdx < tempArg.length; iJdx++) {
                            libraries.push(tempArg[iJdx]);
                        }
                    }
                }
                promises.push(RadJav.includeLibraries(libraries));
            }
            promises.push(RadJav._loadTheme(RadJav.themeUrl));
            Promise.all(promises).then(function () {
                RadJav._isInitialized = true;
                if (RadJav.useEval == false) {
                    var evalu = function () {
                        var msg = "RadJav disables eval by default. Set RadJav.useEval = true; to enable it.";
                        alert(msg);
                        throw msg;
                    };
                }
                resolve();
            });
        }, RadJav, arguments));
        return promise;
    }
    RadJav.initialize = initialize;
    /** @method getStandardLibrary
    * Get the paths to the standard library.
    * @return {Object[]} The standard library.
    */
    function getStandardLibrary() {
        var includes = [
            { file: "RadJav.Circle", themeFile: false },
            { file: "RadJav.Rectangle", themeFile: false },
            { file: "RadJav.Vector2", themeFile: false },
            { file: "RadJav.Color", themeFile: false },
            { file: "Math", themeFile: false, loadFirst: true },
            { file: "String", themeFile: false, loadFirst: true }
        ];
        return includes;
    }
    RadJav.getStandardLibrary = getStandardLibrary;
    /** @method getGUILibrary
    * Get the paths to the gui library.
    * @return {Object[]} The gui library.
    */
    function getGUILibrary() {
        var includes = [
            { file: "RadJav.GUI.GObject", themeFile: true, loadFirst: true },
            { file: "RadJav.Font", themeFile: false, loadFirst: true },
            { file: "RadJav.GUI.Window", themeFile: true },
            { file: "RadJav.GUI.MenuBar", themeFile: true },
            { file: "RadJav.GUI.MenuItem", themeFile: true },
            { file: "RadJav.GUI.Button", themeFile: true },
            { file: "RadJav.GUI.Textbox", themeFile: true },
            { file: "RadJav.GUI.Checkbox", themeFile: true },
            { file: "RadJav.GUI.Radio", themeFile: true },
            { file: "RadJav.GUI.List", themeFile: true },
            { file: "RadJav.GUI.Image", themeFile: true },
            { file: "RadJav.GUI.Label", themeFile: true },
            { file: "RadJav.GUI.Container", themeFile: true },
            { file: "RadJav.GUI.HTMLElement", themeFile: true },
            { file: "RadJav.GUI.Combobox", themeFile: true },
            { file: "RadJav.GUI.Textarea", themeFile: true }
        ];
        return includes;
    }
    RadJav.getGUILibrary = getGUILibrary;
    /** @method getC3DLibrary
    * Get the paths to the C3D library.
    * @return {Object[]} The C3D library.
    */
    function getC3DLibrary() {
        var includes = [
            { file: "RadJav.GUI.Window", themeFile: true },
            { file: "RadJav.GUI.Canvas3D", themeFile: true },
            { file: "RadJav.C3D.Object3D", themeFile: false, loadFirst: true },
            { file: "RadJav.GUI.GObject", themeFile: false, loadFirst: true },
            { file: "RadJav.Font", themeFile: false },
            { file: "RadJav.C3D.Camera", themeFile: false },
            { file: "RadJav.C3D.Entity", themeFile: false },
            { file: "RadJav.C3D.Transform", themeFile: false },
            { file: "RadJav.Vector3", themeFile: false },
            { file: "RadJav.Vector4", themeFile: false },
            { file: "RadJav.Quaternion", themeFile: false },
            { file: "RadJav.C3D.Model", themeFile: false, loadFirst: false },
            { file: "RadJav.C3D.Material", themeFile: false, loadFirst: false }
        ];
        return includes;
    }
    RadJav.getC3DLibrary = getC3DLibrary;
    /** @method getNetLibrary
    * Get the paths to the Net library.
    * @return {Object[]} The Net library.
    */
    function getNetLibrary() {
        var includes = [{ file: "RadJav.Net.WebSocketClient", themeFile: false }];
        return includes;
    }
    RadJav.getNetLibrary = getNetLibrary;
    /** @method includeLibraries
     * Include libraries.
     * @param {Object[]} libraries The libraries to include.
     * @return {Promise} The promise to execute when the including has completed.
     */
    function includeLibraries(libraries) {
        for (var iIdx = 0; iIdx < libraries.length; iIdx++) {
            RadJav._included.push(libraries[iIdx]);
        }
        var promise = new Promise(RadJav.keepContext(function (resolve, reject) {
            var promises = [];
            for (var iIdx = 0; iIdx < RadJav._included.length; iIdx++) {
                var includeObj = RadJav._included[iIdx];
            }
            var promise = new Promise(RadJav.keepContext(function (resolve, reject) {
                var promises = [];
                for (var iIdx = 0; iIdx < RadJav._included.length; iIdx++) {
                    var includeObj = RadJav._included[iIdx];
                    if (typeof includeObj != "string") {
                        if (includeObj.loadFirst == true) {
                            var file = "";
                            var shouldIncludeFile = false;
                            if (typeof includeObj != "string") {
                                if (typeof includeObj.file == "string") {
                                    file = includeObj.file;
                                }
                            }
                            else {
                                file = includeObj;
                            }
                            if (_eval("if (" + file + " != null){true;}else{false;}") ==
                                false) {
                                shouldIncludeFile = true;
                            }
                            if (RadJav.isMinified == false) {
                                if (file == "Math" || file == "String") {
                                    shouldIncludeFile = true;
                                }
                            }
                            if (shouldIncludeFile == true) {
                                var includeFile = RadJav.baseUrl + "/" + file + ".js";
                                promises.push(RadJav.include(includeFile));
                            }
                        }
                    }
                }
                Promise.all(promises).then(function () {
                    var promises2 = [];
                    for (var iIdx = 0; iIdx < RadJav._included.length; iIdx++) {
                        var includeObj = RadJav._included[iIdx];
                        var file = "";
                        var shouldIncludeFile = false;
                        if (typeof includeObj != "string") {
                            if (typeof includeObj.file == "string") {
                                file = includeObj.file;
                            }
                        }
                        else {
                            file = includeObj;
                        }
                        if (_eval("if (" + file + " != null){true;}else{false;}") == false) {
                            shouldIncludeFile = true;
                        }
                        if (RadJav.isMinified == false) {
                            if (file == "Math" || file == "String") {
                                shouldIncludeFile = true;
                            }
                        }
                        if (shouldIncludeFile == true) {
                            var includeFile = RadJav.baseUrl + "/" + file + ".js";
                            promises2.push(RadJav.include(includeFile));
                        }
                    }
                    Promise.all(promises2).then(function () {
                        resolve();
                    });
                });
            }, RadJav));
        }, null, null));
        return promise;
    }
    RadJav.includeLibraries = includeLibraries;
    /** @method _loadLanguages
     * Load the selected language.
     * @return {Promise} The promise to execute when the language has been loaded.
     */
    function _loadLanguages() {
        var promise = new Promise(function (resolve, reject) {
            if (RadJav.useAjax == true) {
                RadJav._getResponse(RadJav.baseUrl + "/languages/" + RadJav.selectedLanguage + ".js").then(function (data) {
                    RadJav._lang = _eval(data);
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
        return promise;
    }
    RadJav._loadLanguages = _loadLanguages;
    /** @method _loadTheme
     * Load a theme.
     * @param {String} themeURL The URL to the theme to load.
     */
    function _loadTheme(themeURL) {
        var url = themeURL;
        if (url[themeURL.length - 1] == "/") {
            url = url.substr(0, themeURL.length - 1);
        }
        var promise = new Promise(function (resolve, reject) {
            if (RadJav.useAjax == true) {
                RadJav._getResponse(url + "/theme.js").then(function (data) {
                    var theme = RadJav.Theme.loadTheme(url, data);
                    RadJav.Theme = theme;
                    var promises2 = [];
                    promises2.push(RadJav.Theme.loadInitializationFile());
                    promises2.push(RadJav.Theme.loadJavascriptFiles());
                    Promise.all(promises2).then(function () {
                        resolve();
                    });
                });
            }
            else {
                var theme = RadJav.Theme.loadTheme(url, RadJav.Theme);
                RadJav.Theme = theme;
                var promises2 = [];
                promises2.push(RadJav.Theme.loadInitializationFile());
                promises2.push(RadJav.Theme.loadJavascriptFiles());
                Promise.all(promises2).then(function () {
                    resolve();
                });
            }
        });
        return promise;
    }
    RadJav._loadTheme = _loadTheme;
    /** @method runApplication
     * Run an application from a file or a function.
     * Available on platforms: Windows,Linux,OSX,HTML5
     * @param {String/Function} file The path to the file to execute the javascript. Or a
     * function that will immediately be executed.
     * @return {Promise} The promise that will be executed when this module has completed executing.
     */
    function runApplication(file) {
        var promise = null;
        if (typeof file == "string") {
            promise = RadJav.include(file).then(RadJav.keepContext(function (data) {
                var func = new _Function(data);
                func();
            }, this));
        }
        else {
            promise = new Promise(RadJav.keepContext(function (resolve, reject, func) {
                func();
                resolve();
            }, this, file));
        }
        return promise;
    }
    RadJav.runApplication = runApplication;
    /** @method runApplicationFromFile
     * Run an application from a file.
     * Available on platforms: Windows,Linux,OSX,HTML5
     * @param {String} file The path to the file to execute the javascript. Or a
     * function that will immediately be executed.
     * @return {Promise} The promise that will be executed when this module has completed executing.
     */
    function runApplicationFromFile(file) {
        return RadJav.runApplication(file);
    }
    RadJav.runApplicationFromFile = runApplicationFromFile;
    /** @method loadObjects
     * Load RadJav objects.
     * Available on platforms: Windows,Linux,OSX,HTML5
     * @param {String/RadJav.GUI.GObject[]/RadJav.C3D.Object3D[]} objs The objects to load.
     * @return {Promise} When loading has completed, all loaded objects will be passed into
     * the "then" function as an object with key/value pairs.
     */
    function loadObjects(objs) {
        var promise = new Promise(function (resolve, reject) {
            var promises = [];
            var createdObjs = {};
            if (typeof objs == "string") {
                objs = JSON.parse(objs);
            }
            for (var iIdx = 0; iIdx < objs.length; iIdx++) {
                var obj = objs[iIdx];
                var type = obj.type;
                var name = obj.name;
                var createdObj = null;
                var promise2 = null;
                if (type.indexOf(".GUI") > -1) {
                    createdObj = new RadJav.GUI[type](obj);
                    promise2 = createdObj.create();
                }
                if (type.indexOf(".C3D") > -1) {
                    createdObj = new RadJav.C3D[type](obj);
                    promise2 = createdObj.create();
                }
                if (createdObj != null) {
                    createdObjs[name] = createdObj;
                }
                if (promise2 != null) {
                    promises.push(promise2);
                }
            }
            Promise.all(promises).then(function () {
                resolve(createdObjs);
            });
        });
        return promise;
    }
    RadJav.loadObjects = loadObjects;
    /** @method _isUsingInternetExplorerTheWorstWebBrowserEver
     * Checks to see if the current web browser is using Internet Explorer.
     * @return {Boolean} Returns true if the web browser is Internet Explorer.
     */
    function _isUsingInternetExplorerTheWorstWebBrowserEver() {
        if (navigator.appName) {
            if (navigator.appName == "Microsoft Internet Explorer") {
                return true;
            }
        }
        return false;
    }
    RadJav._isUsingInternetExplorerTheWorstWebBrowserEver = _isUsingInternetExplorerTheWorstWebBrowserEver;
    /** @method _getSyncResponse
     * Get a synchronous response from HTTP. This will lock whatever thread it is currently on!
     * @param {String} addr The address to connect to.
     * @return {String} The response from the HTTP server.
     */
    function _getSyncResponse(addr) {
        var request = null;
        var response = null;
        if (RadJav.useAjax == false) {
            throw RadJav.getLangString("cannotGetAjaxResponse");
        }
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        }
        else {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        request.onreadystatechange = RadJav.keepContext(function (evt, request2) {
            var req = request2[0];
            try {
                if (req.readyState == 4 && req.status == 200) {
                    response = req.responseText;
                }
            }
            catch (ex) { }
        }, this, [request]);
        request.open("GET", addr, false);
        request.send();
        return response;
    }
    RadJav._getSyncResponse = _getSyncResponse;
    /** @method _getResponse
     * Get an asynchronous response from HTTP.
     * @param {String} addr The address to connect to.
     * @return {String} The response from the HTTP server.
     */
    function _getResponse(addr) {
        var promise = null;
        if (RadJav.useAjax == true) {
            promise = RadJav.Net.httpRequest(addr);
        }
        else {
            RadJav._lang["cannotGetAjaxResponse"] =
                "Cannot get ajax response, RadJav is set to not use Ajax.";
            throw RadJav.getLangString("cannotGetAjaxResponse");
        }
        return promise;
    }
    RadJav._getResponse = _getResponse;
    /** @method getWidth
     * Get the width of the current screen.
     * @return {Number} The width of the current screen.
     */
    function getWidth() {
        /// @note THE - 16 IS A TEMPORARY HACK TO MATCH THE DESKTOP VERSION OF RADJAV
        return RadJav._screenWidth - 16;
    }
    RadJav.getWidth = getWidth;
    /** @method getHeight
     * Get the height of the current screen.
     * @return {Number} The height of the current screen.
     */
    function getHeight() {
        /// @note THE - 38 IS A TEMPORARY HACK TO MATCH THE DESKTOP VERSION OF RADJAV
        return RadJav._screenHeight - 38;
    }
    RadJav.getHeight = getHeight;
    /** @method clone
     * Perform a deep copy of an object. This has been copied from jQuery.
     * Thank you jQuery!
     * Available on platforms: Windows,Linux,OSX,HTML5
     * @param {Object} obj The object to clone.
     * @return {Object} The cloned object.
     */
    function clone() {
        var obj = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            obj[_i] = arguments[_i];
        }
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;
            // Skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }
        var isPlainObject = function (obj) {
            var proto, Ctor;
            // Detect obvious negatives
            // Use toString instead of jQuery.type to catch host objects
            if (!obj || obj.toString() !== "[object Object]") {
                return false;
            }
            proto = Object.getPrototypeOf(obj);
            // Objects with no prototype (e.g., `Object.create( null )`) are plain
            if (!proto) {
                return true;
            }
            // Objects with prototype are plain iff they were constructed by a global Object function
            Ctor = proto.hasOwnProperty("constructor") && proto.constructor;
            return (typeof Ctor === "function" &&
                Ctor.toString() === Ctor.toString.call(Object));
        };
        var isFunction = function (obj) {
            return typeof obj === "function";
        };
        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !isFunction(target)) {
            target = {};
        }
        // Extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }
                    // Recurse if we're merging plain objects or arrays
                    if (deep &&
                        copy &&
                        (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        }
                        else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        // Never move original objects, clone them
                        target[name] = RadJav.clone(deep, clone, copy);
                        // Don't bring in undefined values
                    }
                    else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // Return the modified object
        return target;
    }
    RadJav.clone = clone;
    /** @method cloneObject
     * Perform a deep copy of an object.
     * Available on platforms: Windows,Linux,OSX,HTML5
     * @param {Object} obj The object to clone.
     * @return {Object} The cloned object.
     */
    function cloneObject(obj) {
        return RadJav.clone({}, obj);
    }
    RadJav.cloneObject = cloneObject;
    /** @method cloneArray
     * Perform a deep copy of an array.
     * Available on platforms: Windows,Linux,OSX,HTML5
     * @param {Array} obj The array to clone.
     * @return {Array} The cloned array.
     */
    function cloneArray(obj) {
        return RadJav.clone([], obj);
    }
    RadJav.cloneArray = cloneArray;
    /** @method copyProperties
     * Copy the properties of one object to another.
     * Available on platforms: Windows,Linux,OSX,HTML5
     * @param {Object} obj1 The object to receive the properties.
     * @param {Object} obj2 The object to send the properties.
     * @param {Boolean} [overwriteExisting=true] If set to true, this will overwrite any
     * existing keys.
     * @return {Object} The completed object.
     */
    function copyProperties(obj1, obj2, overwriteExisting) {
        if (overwriteExisting == null) {
            overwriteExisting = true;
        }
        for (var key in obj2) {
            if (overwriteExisting == false) {
                if (obj1[key] == null) {
                    obj1[key] = obj2[key];
                }
            }
            else {
                obj1[key] = obj2[key];
            }
        }
        return obj1;
    }
    RadJav.copyProperties = copyProperties;
    /** @method setDefaultValue
    * @static
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
    function setDefaultValue(param, defaultValue, onValue) {
        if (param == undefined)
            return (defaultValue);
        if (onValue != null)
            return (onValue(param));
        return (param);
    }
    RadJav.setDefaultValue = setDefaultValue;
    /** @method keepContext
     * @static
     * Keep the context the object is currently in.
     * Available on platforms: Windows,Linux,OSX,HTML5
     * @param {Function} func The document element's id.
     * @param {Object} context The object to remain in context.
     * @param {Mixed} [val=undefined] An additional value to pass to the context.
     * @return {Mixed} The returned result from the function func.
     */
    function keepContext(func, context, val) {
        var objReturn = function () {
            var aryArgs = Array.prototype.slice.call(arguments);
            if (val != undefined) {
                aryArgs.push(val);
            }
            if (context == null) {
                return func.apply(this, aryArgs);
            }
            else {
                return func.apply(context, aryArgs);
            }
        };
        return objReturn;
    }
    RadJav.keepContext = keepContext;
    /** @method getLangString
     * @static
     * Get a language string from the current lanuage. Additional arguments can be
     * added to this method to combine the strings together using Utils.combineString.
     * @param {String} keyword The keyword to use when getting the language string.
     * @return {String} The string associated with the keyword.
     */
    function getLangString(keyword) {
        var other = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            other[_i - 1] = arguments[_i];
        }
        var args = Array.prototype.slice.call(arguments);
        args.splice(0, 1);
        args.splice(0, 0, RadJav._lang[keyword]);
        return RadJav.combineString.apply(RadJav, args);
    }
    RadJav.getLangString = getLangString;
    /** @method combineString
     * @static
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
    function combineString(primaryString) {
        var otherStrings = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            otherStrings[_i - 1] = arguments[_i];
        }
        var strReturn = "";
        if (primaryString != null) {
            strReturn = primaryString;
        }
        for (var iIdx = 1; iIdx < arguments.length; iIdx++) {
            strReturn = strReturn.replace("%s", arguments[iIdx]);
        }
        return strReturn;
    }
    RadJav.combineString = combineString;
    var Theme = /** @class */ (function () {
        function Theme(obj) {
            /** @property {String} [name=""]
             * The name of the theme.
             */
            this.name = "";
            /** @property {String} [version=""]
             * The theme's version.
             */
            this.version = "";
            /** @property {String} [author=""]
             * The theme's author.
             */
            this.author = "";
            /** @property {Date} [lastUpdated=null]
             * The theme's last update date.
             */
            this.lastUpdated = null;
            /** @property {String} [description=""]
             * The theme's description.
             */
            this.description = "";
            /** @property {String} [url=""]
             * The url to this theme.
             */
            this.url = "";
            /** @property {String} [initFile=""]
             * The initialization file to start.
             */
            this.initFile = "";
            /** @property {String[]} [cssFiles=[]]
             * CSS files to load.
             */
            this.cssFiles = [];
            /** @property {Object[]}[fonts=[]]
             * Fonts to load.
             */
            this.fonts = [];
            this.obj = obj;
            this.name = RadJav.setDefaultValue(this.obj.name, "");
            this.version = RadJav.setDefaultValue(this.obj.version, "");
            this.author = RadJav.setDefaultValue(this.obj.author, "");
            this.lastUpdated = RadJav.setDefaultValue(this.obj.lastUpdated, null);
            this.description = RadJav.setDefaultValue(this.obj.description, "");
            this.url = RadJav.setDefaultValue(this.obj.url, "");
            this.initFile = RadJav.setDefaultValue(this.obj.initFile, "");
            this.cssFiles = RadJav.setDefaultValue(this.obj.cssFiles, []);
            this.fonts = RadJav.setDefaultValue(this.obj.fonts, []);
        }
        /** @method loadInitializationFile
         * Load the initialization file and execute it.
         * @return {Promise} Executes when the loading has completed.
         */
        Theme.loadInitializationFile = function () {
            var promise = new Promise(RadJav.keepContext(function (resolve, reject) {
                var func = RadJav.keepContext(function (data) {
                    try {
                        if (typeof data == "string") {
                            RadJav.Theme.exports = _eval(data);
                        }
                        if (RadJav.Theme.exports().init != null) {
                            RadJav.Theme.exports().init();
                        }
                        var fontCSS = "";
                        for (var iIdx = 0; iIdx < this.fonts.length; iIdx++) {
                            var fontName = this.fonts[iIdx].name;
                            var fontUrl = this.url + "/" + this.fonts[iIdx].relPath;
                            fontCSS += "@font-face\n";
                            fontCSS += "{\n";
                            fontCSS += '\tfont-family: "' + fontName + '";\n';
                            fontCSS += '\tsrc: url("' + fontUrl + '");\n';
                            fontCSS += "}\n\n";
                        }
                        if (this.fonts.length > 0) {
                            var style = document.createElement("style");
                            style.innerHTML = fontCSS;
                            document.head.appendChild(style);
                        }
                        var promises = [];
                        if (RadJav.useAjax == true) {
                            for (var iIdx = 0; iIdx < this.cssFiles.length; iIdx++) {
                                promises.push(RadJav._getResponse(this.url + "/" + this.cssFiles[iIdx]).then(function (data) {
                                    var style = document.createElement("style");
                                    style.innerHTML = data;
                                    document.head.appendChild(style);
                                }));
                            }
                        }
                        Promise.all(promises).then(function () {
                            resolve();
                        });
                    }
                    catch (ex) {
                        throw RadJav.getLangString("themeThrewErrorInFile", this.name, this.initFile, ex.message);
                    }
                }, this);
                if (RadJav.useAjax == true) {
                    RadJav._getResponse(this.url + "/" + this.initFile).then(func);
                }
                else {
                    func(RadJav.Theme.exports);
                    resolve();
                }
            }, this));
            return promise;
        };
        /** @method loadJavascriptFiles
         * Load the javascript files for this theme.
         * @return {Promise} Executes when the loading has completed.
         */
        Theme.loadJavascriptFiles = function () {
            var promise = new Promise(RadJav.keepContext(function (resolve, reject) {
                var files = [];
                for (var iIdx = 0; iIdx < RadJav._included.length; iIdx++) {
                    var includeObj = RadJav._included[iIdx];
                    if (typeof includeObj != "string") {
                        if (typeof includeObj.themeFile == "string") {
                            files.push(includeObj.themeFile);
                        }
                        else {
                            if (includeObj.themeFile == true) {
                                files.push(includeObj.file);
                            }
                            else {
                                continue;
                            }
                        }
                    }
                }
                for (var iIdx = 0; iIdx < files.length; iIdx++) {
                    var file = files[iIdx];
                    (function (theme, url, tfile, index, numFiles) {
                        try {
                            if (RadJav.Theme.themeObjects[tfile] == null) {
                                RadJav.Theme.themeObjects[tfile] = new Object();
                            }
                            if (RadJav.useAjax == true) {
                                RadJav._getResponse(url + "/" + tfile + ".js").then(function (data) {
                                    try {
                                        RadJav.Theme.themeObjects[tfile] = _eval(data);
                                    }
                                    catch (ex) {
                                        throw RadJav.getLangString("themeThrewErrorInFile", theme.name, tfile + ".js", ex.message);
                                    }
                                    /*var js = "return (function (module, theme){";
                                                                js += data + "\n";
                                                                js += "});";
                
                                                                try
                                                                {
                                                                    var obj = new Function (js);
                                                                    RadJav.Theme.themeObjects[tfile].javascript = obj.apply (this, [{}, theme]);
                                                                }
                                                                catch (ex)
                                                                {
                                                                    throw (RadJav.getLangString ("themeThrewErrorInFile", theme.name,
                                                                            tfile + ".js", ex.message));
                                                                }*/
                                    if (index >= numFiles - 1) {
                                        resolve();
                                    }
                                });
                            }
                            else {
                                resolve();
                            }
                        }
                        catch (ex) { }
                    })(this, this.url, file, iIdx, files.length);
                }
            }, this));
            return promise;
        };
        /** @method event
         * Execute a theme event.
         * @param {String} file The file associated with the event.
         * @param {String} event The name of the event to trigger.
         * @return {Promise} The promise to execute when this event is completed.
         */
        Theme.event = function (file, event) {
            var other = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                other[_i - 2] = arguments[_i];
            }
            var args = new Array();
            for (var iIdx = 2; iIdx < arguments.length; iIdx++) {
                args.push(arguments[iIdx]);
            }
            try {
                if (RadJav.Theme.themeObjects[file] != null) {
                    if (RadJav.Theme.themeObjects[file][event] != null) {
                        return RadJav.Theme.themeObjects[file][event].apply(RadJav.Theme.themeObjects[file], args);
                    }
                    else {
                        if (file.indexOf("GUI") > -1) {
                            var tempfile = "RadJav.GUI.GObject";
                            if (RadJav.Theme.themeObjects[tempfile][event] != null) {
                                return RadJav.Theme.themeObjects[tempfile][event].apply(RadJav.Theme.themeObjects[tempfile], args);
                            }
                        }
                    }
                }
            }
            catch (ex) {
                throw "Error in " +
                    file +
                    " message: " +
                    ex.message +
                    "\nStack: " +
                    ex.stack;
            }
            /*var jsModule = null;
      
                  if (RadJav.theme.themeObjects[file] != null)
                      jsModule = RadJav.theme.themeObjects[file].javascript;
      
                  if (jsModule != null)
                  {
                      var mod = {};
                      jsModule (mod, this);
      
                      if (mod.exports[event] != null)
                          return (mod.exports[event].apply (mod.exports, args));
                  }*/
            return null;
        };
        /** @method eventSync
         * Execute a theme event synchronously.
         * @param {String} file The file associated with the event.
         * @param {String} event The name of the event to trigger.
         * @return {Mixed} The data returned from the event.
         */
        Theme.eventSync = function (file, event) {
            var other = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                other[_i - 2] = arguments[_i];
            }
            var args = new Array();
            var result = null;
            for (var iIdx = 2; iIdx < arguments.length; iIdx++) {
                args.push(arguments[iIdx]);
            }
            try {
                if (RadJav.Theme.themeObjects[file] != null) {
                    if (RadJav.Theme.themeObjects[file][event] != null) {
                        result = RadJav.Theme.themeObjects[file][event].apply(RadJav.Theme.themeObjects[file], args);
                    }
                    else {
                        if (file.indexOf("GUI") > -1) {
                            var tempfile = "RadJav.GUI.GObject";
                            if (RadJav.Theme.themeObjects[tempfile][event] != null) {
                                result = RadJav.Theme.themeObjects[tempfile][event].apply(RadJav.Theme.themeObjects[tempfile], args);
                            }
                        }
                    }
                }
            }
            catch (ex) {
                throw "Error in " +
                    file +
                    " message: " +
                    ex.message +
                    "\nStack: " +
                    ex.stack;
            }
            /*var jsModule = null;
      
                  if (RadJav.Theme.themeObjects[file] != null)
                      jsModule = RadJav.Theme.themeObjects[file].javascript;
      
                  if (jsModule != null)
                  {
                      var mod = {};
                      jsModule (mod, this);
      
                      if (mod.exports[event] != null)
                          result = mod.exports[event].apply (mod.exports, args);
                  }*/
            return result;
        };
        /** @property exports
         * @static
         * The functions and properties associated with this theme.
         */
        Theme.exports = function () { };
        ;
        /** @property themeObjects
         * @static
         * The theme objects associated with this theme.
         */
        Theme.themeObjects = function () { };
        ;
        /** @method loadTheme
         * @static
         * Load the theme.
         * @param {String} url The URL to this theme.
         * @param {String} data The JSON to parse and get the data from.
         */
        Theme.loadTheme = function (url, data) {
            var theme = null;
            try {
                var obj = _eval(data);
                theme = new RadJav.Theme(obj);
                theme.url = url;
            }
            catch (ex) {
                console.error(ex.message);
            }
            return theme;
        };
        return Theme;
    }());
    RadJav.Theme = Theme;
    var GUI;
    (function (GUI) {
        /** @method initObj
        * @static
        * Initialize a GUI object.
        * @param {String} type The object type to create.
        * @param {String/Mixed} name The name of the object.
        * @param {String} text The text associated with the object.
        * @param {RadJav.GUI.GObject} parent The parent of this object.
        * @param {Promise} The promise to execute when this object has finished being created.
        */
        function initObj(type, name, text, parent) {
            var tempType = type;
            if (typeof type == "object") {
                tempType = type.type;
                if (type.name != null) {
                    name = type.name;
                }
                if (type.text != null) {
                    text = type.text;
                }
                if (type._text != null) {
                    text = type._text;
                }
            }
            if (tempType.indexOf("RadJav.GUI") > -1) {
                tempType = tempType.substr(11);
            }
            if (RadJav.GUI[tempType] == null) {
                throw RadJav.getLangString("unableToFindClass", tempType);
            }
            var properties = {
                name: name,
                text: text,
                parent: parent
            };
            if (typeof type == "object") {
                RadJav.copyProperties(properties, type, false);
            }
            var obj = new RadJav.GUI[tempType](properties);
            return obj;
        }
        GUI.initObj = initObj;
        /** @method create
        * @static
        * Create a GUI object.
        * @param {String} type The object type to create.
        * @param {String/Mixed} name The name of the object.
        * @param {String} text The text associated with the object.
        * @param {RadJav.GUI.GObject} parent The parent of this object.
        * @param {Promise} The promise to execute when this object has finished being created.
        */
        function create(type, name, text, parent) {
            var obj = this.initObj(type, name, text, parent);
            return obj.create();
        }
        GUI.create = create;
        /** @method createObjects
        * @static
        * Create GUI objects.
        * @param {String/RadJav.GUI.GObject[]} objects The objects to create.
        * @param {RadJav.GUI.GObject} parent The parent of this object.
        * @param {Function} [beforeCreated=null] The function to execute before the object is created.
        * If this function returns false, the object will not be created.
        * @return {Promise} The promise to execute when the objects have finished being created.
        */
        function createObjects(objects, parent, beforeCreated) {
            if (beforeCreated === void 0) { beforeCreated = null; }
            var promises = [];
            if (beforeCreated == undefined) {
                beforeCreated = null;
            }
            for (var iIdx = 0; iIdx < objects.length; iIdx++) {
                var obj = objects[iIdx];
                var createObject = true;
                if (beforeCreated != null) {
                    obj.onBeforeChildCreated = beforeCreated;
                    var result = beforeCreated(obj, parent);
                    if (result != null) {
                        createObject = result;
                    }
                }
                if (createObject == true) {
                    promises.push(this.create(obj, "", "", parent));
                }
            }
            return Promise.all(promises);
        }
        GUI.createObjects = createObjects;
    })(GUI = RadJav.GUI || (RadJav.GUI = {}));
    /** @class C3D
    * @static
    * Contains classes for 3d operations in a RadJav.GUI.Canvas3D object.
    */
    var C3D;
    (function (C3D) {
        /** @method create
        * @static
        * Create a 3D object.
        * @param {String} type The object type to create.
        * @param {String|Mixed} name The name of the object.
        * @param {RadJav.C3D.Object3D} parent The parent of this object.
        * @param {Promise} The promise to execute when this object has finished being created.
        */
        function create(type, name, parent) {
            if (type.indexOf("RadJav.C3D") > -1) {
                type = type.substr(10);
            }
            if (RadJav.C3D[type] == null) {
                throw RadJav.getLangString("unableToFindClass", type);
            }
            var obj = new RadJav.C3D[type](name, parent);
            return obj.create();
        }
    })(C3D = RadJav.C3D || (RadJav.C3D = {}));
    /** @class Net
    * @static
    * Contains classes for network operations.
    */
    var Net;
    (function (Net) {
        /** @method httpRequest
        * @static
        * Make an ajax request to a HTTP server.
        * Available on platforms: Windows,Linux,OSX,HTML5
        * @param {String/Object} req The URL or request object to send to the server.
        * @return {Promise} The promise to execute when the request has completed.
        */
        function httpRequest(req) {
            var promise = new Promise(RadJav.keepContext(function (resolve, reject) {
                var addr = req;
                var request = null;
                var response = null;
                try {
                    if (XMLHttpRequest != null)
                        request = new XMLHttpRequest();
                    else
                        request = new ActiveXObject("Microsoft.XMLHTTP");
                    request.onreadystatechange = RadJav.keepContext(function (evt, request2) {
                        var req2 = request2[0];
                        try {
                            if (req2.readyState == 4 && req2.status == 200)
                                resolve(req2.responseText);
                        }
                        catch (ex) {
                            reject(ex);
                        }
                    }, this, [request]);
                    request.open("GET", addr);
                    request.send();
                }
                catch (ex) {
                    reject(ex);
                }
            }, this));
            return promise;
        }
        Net.httpRequest = httpRequest;
    })(Net = RadJav.Net || (RadJav.Net = {}));
    /** @class Console
     * @static
     * Contains classes handling console operations.
     */
    var Console = /** @class */ (function () {
        function Console() {
        }
        /** @method print
         * @static
         * Print a message to the console.
         * @param {String} message The message to output.
         */
        Console.prototype.print = function (message) {
            console.log(message);
        };
        /** @method println
         * @static
         * Print a message to the console with a new line at the end.
         * @param {String} message The message to output.
         */
        Console.prototype.println = function (message) {
            this.print(message + "\n");
        };
        return Console;
    }());
    RadJav.Console = Console;
    /** @class RadJav.OS
     * @static
     * Contains Operating System specific functions.
     */
    var OS;
    (function (OS) {
        /** @property {String} [type="html5"]
         * @static
         * Represents the current type of operating system.
         * Can be:
         * * windows
         * * linux
         * * macosx
         * * html5
         */
        OS.type = "html5";
        /** @property {Number} [numBits=32]
         * @static
         * The number of bits this operating system is.
         */
        OS.numBits = 32;
        /** @method onReady
         * Execute code when RadJav has finished loading.
         * Available on platforms: Windows,Linux,OSX,HTML5
         * @param {Function} func The function to execute.
         * @return {Promise} The promise to execute.
         */
        function onReady(func) {
            return RadJav.OS.HTML5.ready(window).then(func);
        }
        OS.onReady = onReady;
        /** @method getDocumentsPath
         * @static
         * Get the path to the user's documents folder.
         * Available on platforms: Windows,Linux,OSX
         * @return {String} The current user's documents folder path.
         */
        /*export function getDocumentsPath() {
            }*/
        /** @method getTempPath
         * @static
         * Get the path to the user's temporary files folder.
         * Available on platforms: Windows,Linux,OSX
         * @return {String} The current user's temporary files path.
         */
        /*export functiongetTempPath() {
            }*/
        /** @method getUserDataPath
         * @static
         * Get the path to the user's data files folder.
         * Available on platforms: Windows,Linux,OSX
         * @return {String} The current user's data files path.
         */
        /*export function getUserDataPath() {
            }*/
        /** @method getApplicationPath
         * @static
         * Get the path to the application.
         * Available on platforms: Windows,Linux,OSX
         * @return {String} The path to the application.
         */
        /*export function getApplicationPath(){
            }*/
        /** @method getCurrentWorkingPath
         * @static
         * Get the current working path.
         * Available on platforms: Windows,Linux,OSX
         * @return {String} The current working path.
         */
        /*export function getCurrentWorkingPath(){
            }*/
        /** @method openWebBrowserURL
         * @static
         * Open a URL in the default web browser.
         * Available on platforms: Windows,Linux,OSX,HTML5
         * @param {String} url The url to open.
         */
        function openWebBrowserURL(url) {
            window.open(url, "_blank");
        }
        OS.openWebBrowserURL = openWebBrowserURL;
        /** Contains HTML5 specific functions.
         * Available on platforms: HTML5
         */
        var HTML5;
        (function (HTML5) {
            /** If set to true, all objects will be positioned using absolute positioning.
             * @default true
             */
            HTML5.absolutePositioning = true;
            /** @method showElement
             * @static
             * Show a HTML element.
             * @param {String/HTMLElement} elm The element to show or hide.
             * @param {Boolean} [show=true] If set to true the element will be shown.
             */
            function showElement(elm, show) {
                if (typeof elm == "string") {
                    elm = RadJav.OS.HTML5.selectDOM(null, elm);
                }
                if (show == true) {
                    elm.style.visibility = "visible";
                }
                else {
                    elm.style.visibility = "hidden";
                }
            }
            HTML5.showElement = showElement;
            /** @static
             * Get the operating system from the browser's user agent.
             * @return {String} The operating system.
             */
            function getOS() {
                var userAgent = navigator.userAgent.toLowerCase();
                if (userAgent.indexOf("win32") > -1) {
                    return "windows";
                }
                if (userAgent.indexOf("win64") > -1) {
                    return "windows";
                }
                if (userAgent.indexOf("windows") > -1) {
                    return "windows";
                }
                if (userAgent.indexOf("android") > -1) {
                    return "android";
                }
                if (userAgent.indexOf("iphone") > -1) {
                    return "iphone";
                }
                if (userAgent.indexOf("ipad") > -1) {
                    return "ipad";
                }
                if (userAgent.indexOf("ipod") > -1) {
                    return "ipod";
                }
                if (userAgent.indexOf("mac os x") > -1) {
                    return "macosx";
                }
                if (userAgent.indexOf("linux") > -1) {
                    return "linux";
                }
                return "";
            }
            HTML5.getOS = getOS;
            /** @static
             * Get the URL parameters as an object.
             * @return {Object} The url parameters.
             */
            function getUrlParamObj() {
                var params = window.location.search;
                var paramsObj = {};
                if (params == "") {
                    return paramsObj;
                }
                var nextStart = "?";
                var prevPos = -1;
                var pos = -1;
                while (true) {
                    prevPos = params.indexOf(nextStart, pos);
                    pos = params.indexOf("=", prevPos);
                    if (prevPos > -1 && pos > -1) {
                        nextStart = "&";
                        var key = params.substring(prevPos + 1, pos);
                        prevPos = params.indexOf(nextStart, pos);
                        if (prevPos < 0) {
                            prevPos = undefined;
                        }
                        var value = params.substring(pos + 1, prevPos);
                        if (isNaN(value) == false) {
                            value = parseFloat(value);
                        }
                        paramsObj[key] = value;
                    }
                    else {
                        break;
                    }
                }
                return paramsObj;
            }
            HTML5.getUrlParamObj = getUrlParamObj;
            /** @static
             * Get a URL parameters value.
             * @param {String} name The url parameters name.
             * @return {Mixed} The url parameters value. Returns undefined if the parameter was
             * not able to be found.
             */
            function getUrlParam(name) {
                var params = RadJav.OS.HTML5.getUrlParamObj();
                return params[name];
            }
            HTML5.getUrlParam = getUrlParam;
            /** @static
             * Set whether or not each gui object placed is placed using absolute positioning.
             * @param {Boolean} absolutePositioning If set to true, all objects will be
             * positioned using absolute positioning.
             */
            function useAbsolutePositioning(absolutePositioning) {
                RadJav.OS.HTML5.absolutePositioning = absolutePositioning;
            }
            HTML5.useAbsolutePositioning = useAbsolutePositioning;
            /** @static
             * Start downloading a text file.
             * @param {String} text The text to download.
             * @param {String} fileName The filename.
             * @param {String} [mimeType="text/plain"] The mime type.
             */
            function downloadTextAsFile(text, fileName, mimeType) {
                if (mimeType == null) {
                    mimeType = "text/plain";
                }
                var elm = document.createElement("a");
                elm.setAttribute("href", "data:" + mimeType + "," + text);
                elm.setAttribute("download", fileName);
                if (document.createEvent != null) {
                    var evt = document.createEvent("MouseEvents");
                    evt.initEvent("click", true, true);
                    elm.dispatchEvent(evt);
                }
                else {
                    elm.click();
                }
            }
            HTML5.downloadTextAsFile = downloadTextAsFile;
            /** @static
             * Reloads the current page.
             * @param {Boolean} [forceNewPage=false] If set to true, this will force the browser
             * to get a new page from the server.
             */
            function reloadPage(forceNewPage) {
                if (forceNewPage == null) {
                    forceNewPage = false;
                }
                location.reload(forceNewPage);
            }
            HTML5.reloadPage = reloadPage;
            /** Get the parent HTML from an object.
             * @param {RadJav.GUI.GObject} obj The parent object to get the HTML from.
             * @return {Mixed} The parent HTML object.
             */
            function getParentHTML(obj) {
                var parent = obj.getParent();
                var parentHTML = null;
                if (parent == null) {
                    parentHTML = document.body;
                }
                else {
                    parentHTML = parent.getHTML();
                }
                return parentHTML;
            }
            HTML5.getParentHTML = getParentHTML;
            /** Get the HTML DOM object from some HTML string.
             * @param {String} str The string to convert into an HTML DOM.
             * @return {Mixed} The HTML DOM object.
             */
            function getHTMLDOM(str) {
                var div = document.createElement("div");
                div.innerHTML = str;
                return div.firstChild;
            }
            HTML5.getHTMLDOM = getHTMLDOM;
            /** Append HTML to an existing HTML DOM object.
             * @param {Mixed} obj The HTML DOM object to append this HTML to.
             * @param {String/Mixed} html The HTML to append.
             */
            function appendHTML(obj, html) {
                if (typeof obj == "string") {
                    var tempObj = document.querySelector(obj);
                    if (tempObj == null) {
                        throw RadJav.getLangString("unableToFindSelector", obj);
                    }
                }
                if (typeof html == "string") {
                    html = RadJav.OS.HTML5.getHTMLDOM(html);
                }
                return obj.appendChild(html);
            }
            HTML5.appendHTML = appendHTML;
            /** Use a selector to get a DOM object.
             * @param {Mixed/String} obj The HTML DOM object to get the selection from. If
             * this is a string, it will be treated as the selector.
             * @param {String} selector The selector to use to get the DOM object.
             * @return {Mixed} The selected DOM object.
             */
            function selectDOM(obj, selector) {
                if (typeof obj == "string") {
                    selector = obj;
                    obj = null;
                }
                if (obj == null)
                    obj = document.body;
                var dom = obj.querySelector(selector);
                return dom;
            }
            HTML5.selectDOM = selectDOM;
            /** When a dom object has finished loading, execute a promise.
             * @param {Object} obj The object to check.
             * @return {Promise} The promise to execute.
             */
            function ready(obj) {
                var promise = new Promise(function (resolve, reject) {
                    if (obj.readyState != null) {
                        if (obj.readyState == "complete") {
                            resolve();
                            return;
                        }
                    }
                    obj.addEventListener("load", function () {
                        resolve();
                    });
                });
                return promise;
            }
            HTML5.ready = ready;
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
            function interfaceConnector(connectorName, methodName) {
                var result = null;
                var args = Array.prototype.slice.call(arguments);
                args.splice(0, 2);
                var name = "";
                var webViewType = "";
                if (typeof connectorName == "string") {
                    name = connectorName;
                }
                else {
                    name = connectorName.name;
                    if (connectorName.webViewType != null) {
                        webViewType = connectorName.webViewType;
                    }
                }
                if (name == null || name == "") {
                    throw RadJav.getLangString("connectorNameCannotBeEmptyForInterfaceConnector");
                }
                var found = false;
                if (window[name] != null) {
                    // Android
                    result = window[name][methodName].apply(window, args);
                    found = true;
                }
                if (window["webkit"] != null) {
                    // iOS WKWebView
                    if (window["webkit"].messageHandlers != null) {
                        if (window["webkit"].messageHandlers[name] != null) {
                            args = Array.prototype.slice.call(arguments);
                            args.splice(0, 1);
                            window["webkit"].messageHandlers[name].postMessage(args);
                            found = true;
                        }
                    }
                }
                if (found == false) {
                    if (webViewType == "iOSWebView") {
                        var userAgent = window.navigator.userAgent.toLowerCase();
                        if (userAgent.match(/iphone/i) ||
                            userAgent.match(/ipad/i) ||
                            userAgent.match(/ipod/i)) {
                            var standalone = window.navigator.standalone;
                            var isSafari = userAgent.match(/safari/i);
                            if (standalone == false && isSafari == null) {
                                document.location.href =
                                    name + "://" + methodName + "/" + JSON.stringify(args);
                            }
                        }
                    }
                }
                return result;
            }
            HTML5.interfaceConnector = interfaceConnector;
        })(HTML5 = OS.HTML5 || (OS.HTML5 = {}));
    })(OS = RadJav.OS || (RadJav.OS = {}));
})(RadJav || (RadJav = {}));
var _eval = eval;
var _Function = Function;
RadJav.defaults = RadJav;
// This is taken from generated TypeScript code. Thanks Microsoft!
var __extends = (this && this.__extends) ||
    (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
                function (d, b) {
                    d.__proto__ = b;
                }) ||
            function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
            };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();
if (define != null) {
    define(function () {
        return RadJav;
    });
}
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
    /** A basic circle.
     * @author Jason Ryan
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    var Circle = /** @class */ (function () {
        function Circle(x, y, r) {
            if (typeof x == "object") {
                var circle = x;
                x = circle.x;
                y = circle.y;
                r = circle.z;
            }
            this.x = x;
            this.y = y;
            this.radius_squared = r * r;
        }
        /** Returns true if the point provided is inside the circle.
         * @param {Number/RadJav.Vector2} x The x coordinate or Vector2 position.
         * @param {Number} [y=null] The y coordinate of the position.
         * @return {Boolean} Returns true if the point is inside the circle.
         */
        Circle.prototype.pointInside = function (x, y) {
            if (typeof x == "object") {
                var pos = x;
                x = pos.x;
                y = pos.y;
            }
            var distance_squared = (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y);
            if (distance_squared < this.radius_squared) {
                return true;
            }
            return false;
        };
        /** @method dsqPointInside
         * Get the distance from the inside of the circle to a point.
         * @param {Number} distance_squared The distance away that would be considered inside the circle.
         * @return {Boolean} Returns true if the distance from the point is inside the circle.
         */
        Circle.prototype.dsqPointInside = function (distance_squared) {
            if (distance_squared < this.radius_squared) {
                return true;
            }
            return false;
        };
        return Circle;
    }());
    RadJav.Circle = Circle;
})(RadJav || (RadJav = {}));
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
    /** @class RadJav.Color
     * Represents a color.
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    var Color = /** @class */ (function () {
        function Color(r, g, b, a) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            if (a === void 0) { a = 1; }
            if (typeof r == "object") {
                var color = r;
                this.r = color.r;
                this.g = color.g;
                this.b = color.b;
                this.a = color.a;
            }
            else {
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
            }
        }
        /** @method toHex
         * Return this color as a hex string.
         * @return {String} The hex string representing the color.
         */
        Color.prototype.toHex = function () {
            var red = this.r;
            var green = this.g;
            var blue = this.b;
            red *= 255;
            green *= 255;
            blue *= 255;
            red = parseInt(red).toString(16);
            green = parseInt(green).toString(16);
            blue = parseInt(blue).toString(16);
            if (parseInt(red) <= 9) {
                red = "0" + red;
            }
            if (parseInt(green) <= 9) {
                green = "0" + green;
            }
            if (parseInt(blue) <= 9) {
                blue = "0" + blue;
            }
            return "0x" + red + green + blue;
        };
        /** @method toHTMLColor
         * Return this color as a HTML color string.
         * @return {String} The html string representing the color.
         */
        Color.prototype.toHTMLColor = function () {
            var hex = this.toHex();
            hex = hex.substring(2);
            return "#" + hex;
        };
        /** @method toHexInt
         * Return this color as a hex color integer.
         * @return {Number} The hex integer representing the color.
         */
        Color.prototype.toHexInt = function () {
            var hex = this.toHex();
            return parseInt(hex);
        };
        return Color;
    }());
    RadJav.Color = Color;
})(RadJav || (RadJav = {}));
RadJav.Color.Black = new RadJav.Color(0, 0, 0, 1);
RadJav.Color.White = new RadJav.Color(1, 1, 1, 1);
RadJav.Color.Red = new RadJav.Color(1, 0, 0, 1);
RadJav.Color.Green = new RadJav.Color(0, 1, 0, 1);
RadJav.Color.Blue = new RadJav.Color(0, 0, 1, 1);
/**
 * Parse a color string.
 * @param {String} str The color string to parse.
 * @return {RadJav.Color} The color.
 */
function parseColor(str) {
    var color = new RadJav.Color(0, 0, 0, 1);
    if (str == "") {
        return color;
    }
    var iPos = 0;
    iPos = str.indexOf("#");
    str = str.toLowerCase();
    if (str == "black") {
        color = RadJav.Color.Black;
    }
    if (str == "white") {
        color = RadJav.Color.White;
    }
    if (str == "red") {
        color = RadJav.Color.Red;
    }
    if (str == "green") {
        color = RadJav.Color.Green;
    }
    if (str == "blue") {
        color = RadJav.Color.Blue;
    }
    if (iPos > -1) {
        iPos++;
    }
    var strR = str.substr(iPos + 0, 2);
    var strG = str.substr(iPos + 2, 2);
    var strB = str.substr(iPos + 4, 2);
    var iR = parseInt(strR, 16);
    var iG = parseInt(strG, 16);
    var iB = parseInt(strB, 16);
    var dR = iR / 255.0;
    var dG = iG / 255.0;
    var dB = iB / 255.0;
    color.r = dR;
    color.g = dG;
    color.b = dB;
    return color;
}
;
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
    /** The font class.
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    var Font = /** @class */ (function () {
        function Font(obj) {
            if (obj == null) {
                obj = {};
            }
            if (obj.color != null) {
                obj.color = new RadJav.Color(obj.color);
            }
            this.fontFamily = RadJav.setDefaultValue(obj.fontFamily, "Open Sans");
            this.size = RadJav.setDefaultValue(obj.size, 10);
            this.color = RadJav.setDefaultValue(obj.color, RadJav.Color.Black);
            this.underline = RadJav.setDefaultValue(obj.underline, false);
            this.bold = RadJav.setDefaultValue(obj.bold, false);
            this.italic = RadJav.setDefaultValue(obj.italic, false);
        }
        return Font;
    }());
    RadJav.Font = Font;
})(RadJav || (RadJav = {}));
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
/// <reference path="RadJav.ts" />
var RadJav;
(function (RadJav) {
    var Net;
    (function (Net) {
        /** @class RadJav.Net.WebSocketClient
         * A web socket.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var WebSocketClient = /** @class */ (function () {
            function WebSocketClient(obj) {
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var tempobj = obj;
                    obj = {};
                    obj.url = tempobj;
                }
                this.url = RadJav.setDefaultValue(obj.url, "");
                this._socket = RadJav.setDefaultValue(obj._socket, null);
                this._events = RadJav.setDefaultValue(obj._events, {});
                if (this._init != null)
                    this._init();
            }
            /** @method connect
             * Connect to the URL.
             * @return {Promise} The promise to execute when the connection has completed.
             */
            WebSocketClient.prototype.connect = function (eventName, func) {
                var promise = new Promise(RadJav.keepContext(function (resolve, reject) {
                    if (WebSocket == null) {
                        reject(RadJav._lang.websocketsNotSupported);
                        return;
                    }
                    this._socket = new WebSocket(this.url, ["xmpp"]);
                    this._socket.onopen = RadJav.keepContext(function () {
                        resolve();
                        if (this._events["onopen"] != null) {
                            this._events["onopen"]();
                        }
                    }, this);
                    this._socket.onerror = RadJav.keepContext(function (error) {
                        reject(error);
                        if (this._events["onerror"] != null) {
                            this._events["onerror"](error);
                        }
                    }, this);
                    this._socket.onmessage = RadJav.keepContext(function (message) {
                        if (this._events["onmessage"] != null) {
                            this._events["onmessage"](message);
                        }
                    }, this);
                    this._socket.onclose = RadJav.keepContext(function (message) {
                        if (this._events["onclose"] != null) {
                            this._events["onclose"]();
                        }
                    }, this);
                }, this));
                return promise;
            };
            /** @method send
             * Send a message to the server.
             * @param {String/Object} message The message to send.
             */
            WebSocketClient.prototype.send = function (message) {
                this._socket.send(message);
            };
            /** @method on
             * Call a function when an event is executed.
             * @param {String} eventName The name of the event.
             * @param {Function} func The function to execute when the event has been executed.
             */
            WebSocketClient.prototype.on = function (eventName, func) {
                this._events[eventName] = func;
            };
            return WebSocketClient;
        }());
        Net.WebSocketClient = WebSocketClient;
    })(Net || (Net = {}));
})(RadJav || (RadJav = {}));
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
    /** @class RadJav.Quaternion
     * A Quaternion class.
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    var Quaternion = /** @class */ (function () {
        function Quaternion(w, x, y, z) {
            if (w == null)
                w = 1;
            if (x == null)
                x = 0;
            if (y == null)
                y = 0;
            if (z == null)
                z = 0;
            if (x instanceof RadJav.Vector4) {
                var temp = x;
                x = temp.x;
                y = temp.y;
                z = temp.z;
                w = temp.w;
            }
            if (x instanceof RadJav.Quaternion) {
                var temp = x;
                w = temp.w;
                x = temp.x;
                y = temp.y;
                z = temp.z;
            }
            this.w = w;
            this.x = x;
            this.y = y;
            this.z = z;
        }
        return Quaternion;
    }());
    RadJav.Quaternion = Quaternion;
})(RadJav || (RadJav = {}));
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
    /** @class RadJav.Rectangle
     * A basic rectangle.
     * @param {Number|RadJav.Vector2|RadJav.Vector4} [x=0] The x coordinate of the rectangle. Can also be a Vector2
     * representing the position of this rectangle. Lastly, it can also be a Vector4 representing the
     * rectangle's position and size.
     * @param {Number|RadJav.Vector2} [y=0] The y coordinate of the rectangle. Can also be a Vector2
     * representing the size of this rectangle.
     * @param {Number} [w=0] The width of this rectangle.
     * @param {Number} [h=0] The height of this rectangle.
     * @author Jason Ryan
     * @author Nathanael Coonrod
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    var Rectangle = /** @class */ (function () {
        function Rectangle(x, y, w, h) {
            if (typeof x == "object") {
                if (x.w != null) {
                    var rect = x;
                    x = pos.x;
                    y = pos.y;
                    w = pos.z;
                    h = pos.w;
                }
                else {
                    var pos = x;
                    x = pos.x;
                    y = pos.y;
                }
            }
            if (typeof y == "object") {
                var size = x;
                w = size.x;
                h = size.y;
            }
            if (x == null)
                x = 0;
            if (y == null)
                y = 0;
            if (w == null)
                w = 0;
            if (h == null)
                h = 0;
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.top = this.y + this.height;
            this.bottom = this.y - this.height;
            this.left = this.x - this.width;
            this.right = this.x + this.width;
        }
        /** @method setPosition
         * Set the position of this object.
         * @param {Number|RadJav.Vector2} x The x coordinate of this object, or the Vector2
         * representing the coordinates of this object.
         * @param {Number} [y=null] The y coordinate of this object.
         */
        Rectangle.prototype.setPosition = function (x, y) {
            if (typeof x == "object") {
                var pos = x;
                x = pos.x;
                y = pos.y;
            }
            this.x = x;
            this.y = y;
            this.top = this.y + this.height;
            this.bottom = this.y - this.height;
            this.left = this.x - this.width;
            this.right = this.x + this.width;
        };
        /** @method getPosition
         * Get the position of this object.
         * @return {RadJav.Vector2} The Vector2 representing the position of this object.
         */
        Rectangle.prototype.getPosition = function () {
            return new RadJav.Vector2(this.x, this.y);
        };
        /** @method setSize
         * Set the size of this object.
         * @param {Number|RadJav.Vector2} w The width of this object, or the Vector2
         * representing the size of this object.
         * @param {Number} [h=null] The height of this object.
         */
        Rectangle.prototype.setSize = function (w, h) {
            if (typeof w == "object") {
                var size = w;
                w = size.x;
                h = size.y;
            }
            this.width = w;
            this.height = h;
            this.top = this.y + this.height;
            this.bottom = this.y - this.height;
            this.left = this.x - this.width;
            this.right = this.x + this.width;
        };
        /** @method getSize
         * Get the size of this object.
         * @return {RadJav.Vector2} The Vector2 representing the size of this object.
         */
        Rectangle.prototype.getSize = function () {
            return new RadJav.Vector2(this.width, this.height);
        };
        /** @method pointInside
         * Check if a point is inside this object.
         * @param {Number/RadJav.Vector2} x The x coordinate of the point, or the Vector2
         * representing the coordinates of the point to check.
         * @param {Number} [y=null] The y coordinate of the point.
         * @return {Boolean} Returns true if the point is inside the rectangle.
         */
        Rectangle.prototype.pointInside = function (x, y) {
            if (typeof x == "object") {
                var pos = x;
                x = pos.x;
                y = pos.y;
            }
            if (x > this.right)
                return false;
            if (x < this.left)
                return false;
            if (y > this.top)
                return false;
            if (y < this.bottom)
                return false;
            return true;
        };
        /** @method xInside
         * Check if a x coordinate is inside this rectangle.
         * @param {Number} x The x coordinate of the point to check.
         * @return {Boolean} Returns true if the x coordinate is inside the rectangle.
         */
        Rectangle.prototype.xInside = function (x) {
            if (x > this.right)
                return false;
            if (x < this.left)
                return false;
            return true;
        };
        /** @method yInside
         * Check if a y coordinate is inside this rectangle.
         * @param {Number} y The y coordinate of the point to check.
         * @return {Boolean} Returns true if the y coordinate is inside the rectangle.
         */
        Rectangle.prototype.yInside = function (y) {
            if (y > this.top)
                return false;
            if (y < this.bottom)
                return false;
            return true;
        };
        return Rectangle;
    }());
    RadJav.Rectangle = Rectangle;
})(RadJav || (RadJav = {}));
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
    /** @class RadJav.Vector2
     * A Vector2 class.
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    var Vector2 = /** @class */ (function () {
        function Vector2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (typeof x == "object")
                this.x = x.x;
            else
                this.x = x;
            this.y = y;
        }
        /** @method tostring
         * Convert this object to a string.
         * @return {string} The string representing this object.
         */
        Vector2.prototype.tostring = function () {
            return this.x + "," + this.y;
        };
        /** @method setX
         * Set the X component of this object.
         * @param {number} n The new X component of this object.
         */
        Vector2.prototype.setX = function (n) {
            this.x = n;
        };
        /** @method setY
         * Set the X component of this object.
         * @param {number} n The new X component of this object.
         */
        Vector2.prototype.setY = function (n) {
            this.y = n;
        };
        /** @method set
         * Set the X,Y component of this object.
         * @param {number} x The new X component of this object.
         * @param {number} y The new Y component of this object.
         */
        Vector2.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
        };
        /** @method add
         * Add X and Y values to the X and Y components of this object.
         * @param {number} x The X component to add.
         * @param {number} y The Y component to add.
         */
        Vector2.prototype.add = function (x, y) {
            this.x += x;
            this.y += y;
        };
        /** @method sub
         * Subtract X and Y values from the X and Y components of this object.
         * @param {number} x The X component to subtract.
         * @param {number} y The Y component to subtract.
         */
        Vector2.prototype.sub = function (subVector2) {
            this.x -= subVector2.x;
            this.y -= subVector2.y;
        };
        /** @method mult
         * Multiply X and Y values to the X and Y components of this object.
         * @param {number} x The X component to subtract.
         * @param {number} y The Y component to subtract.
         */
        Vector2.prototype.mult = function (n) {
            this.x *= n;
            this.y *= n;
        };
        /** @method divide
         * Divide this object by another Vector2 object or number.
         * @param {RadJav.Vector2|number} vector2 The Vector2 or number to divide by.
         */
        Vector2.prototype.divide = function (vector2) {
            var result = new Vector2();
            if (typeof vector2 == "object") {
                result.x = this.x / vector2.x;
                result.y = this.y / vector2.y;
            }
            else {
                result.x = this.x / vector2;
                result.y = this.y / vector2;
            }
            return result;
        };
        /** @method dot
         * Perform a dot product on this object.
         * @param {RadJav.Vector2} dotVector2 The Vector2 to perform the dot product.
         * @return {number} The result of the dot product.
         */
        Vector2.prototype.dot = function (dotVector2) {
            return this.x * dotVector2.x + this.y * dotVector2.y;
        };
        /** @method length
         * Get the length of this object using a square root. This will use Math.sqrt.
         * @return {number} The length of this object.
         */
        Vector2.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        /** @method normalize
         * Normalize this object, this will use this object's length method.
         * @return {number} The normalized length of this object.
         */
        Vector2.prototype.normalize = function () {
            return this.divide(this.length());
        };
        /** @method parseVector2
         * @static
         * Parse a Vector2 string and create a Vector2 object from it.
         * @param {string} str The string to parse.
         * @return {RadJav.Vector2} The new Vector2 created from this string.
         */
        Vector2.parseVector2 = function (str) {
            var obj = new Vector2();
            if (str == "")
                return obj;
            str = str.toLowerCase();
            str = str.replace(/ /g, "");
            var strs = str.split(",");
            if (strs.length > 0)
                obj.x = parseFloat(strs[0]);
            if (strs.length > 1)
                obj.y = parseFloat(strs[1]);
            return obj;
        };
        return Vector2;
    }());
    RadJav.Vector2 = Vector2;
})(RadJav || (RadJav = {}));
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
    /** @class RadJav.Vector3
     * A Vector3 class.
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    var Vector3 = /** @class */ (function () {
        function Vector3(x, y, z) {
            if (x == null)
                x = 0;
            if (y == null)
                y = 0;
            if (z == null)
                z = 0;
            if (x instanceof RadJav.Vector2) {
                var temp = x;
                x = temp.x;
                y = temp.y;
            }
            if (x instanceof RadJav.Vector3) {
                var temp_1 = x;
                x = temp_1.x;
                y = temp_1.y;
                z = temp_1.z;
            }
            this.x = x;
            this.y = y;
            this.z = z;
        }
        /** @method toString
         * Convert this object to a string.
         * @return {String} The string representing this object.
         */
        Vector3.prototype.toString = function () {
            return this.x + "," + this.y + "," + this.z;
        };
        /** @method add
         * Add x,y,z values to the x,y,z components of this object.
         * @param {Number} x The X component to add.
         * @param {Number} y The Y component to add.
         * @param {Number} z The Z component to add.
         */
        Vector3.prototype.add = function (vector3) {
            var result = new RadJav.Vector3();
            if (vector3 instanceof RadJav.Vector3) {
                result.x = this.x + vector3.x;
                result.y = this.y + vector3.y;
                result.z = this.z + vector3.z;
            }
            else {
                result.x = this.x + vector3;
                result.y = this.y + vector3;
                result.z = this.z + vector3;
            }
            return result;
        };
        /** @method sub
         * Subtract X and Y values from the X and Y components of this object.
         * @param {Number} x The X component to subtract.
         * @param {Number} y The Y component to subtract.
         * @param {Number} z The Z component to subtract.
         */
        Vector3.prototype.subtract = function (vector3) {
            var result = new RadJav.Vector3();
            if (vector3 instanceof RadJav.Vector3) {
                result.x = this.x - vector3.x;
                result.y = this.y - vector3.y;
                result.z = this.z - vector3.z;
            }
            else {
                result.x = this.x - vector3;
                result.y = this.y - vector3;
                result.z = this.z - vector3;
            }
            return result;
        };
        /** @method multiply
         * Multiply x,y,z values to the x,y,z components of this object.
         * @param {Number} x The X component to subtract.
         * @param {Number} y The Y component to subtract.
         * @param {Number} z The Z component to subtract.
         */
        Vector3.prototype.multiply = function (vector3) {
            var result = new RadJav.Vector3();
            if (vector3 instanceof RadJav.Vector3) {
                result.x = this.x * vector3.x;
                result.y = this.y * vector3.y;
                result.z = this.z * vector3.z;
            }
            else {
                result.x = this.x * vector3;
                result.y = this.y * vector3;
                result.z = this.z * vector3;
            }
            return result;
        };
        /** @method divide
         * Divide this object by another Vector3 object or number.
         * @param {RadJav.Vector3|Number} Vector3 The Vector3 or Number to divide by.
         */
        Vector3.prototype.divide = function (vector3) {
            var result = new RadJav.Vector3();
            if (vector3 instanceof RadJav.Vector3) {
                result.x = this.x / vector3.x;
                result.y = this.y / vector3.y;
                result.z = this.z / vector3.z;
            }
            else {
                result.x = this.x / vector3;
                result.y = this.y / vector3;
                result.z = this.z / vector3;
            }
            return result;
        };
        /** @method dot
         * Perform a dot product on this object.
         * @param {RadJav.Vector3} vector3 The Vector3 to perform the dot product.
         * @return {Number} The result of the dot product.
         */
        Vector3.prototype.dot = function (vector3) {
            var dReturn = this.x * vector3.x + this.y * vector3.y + this.z * vector3.z;
            return dReturn;
        };
        /** @method cross
         * Perform a cross product on this object.
         * @param {RadJav.Vector3} vector3 The Vector3 to perform the dot product.
         * @return {Number} The result of the dot product.
         */
        Vector3.prototype.cross = function (vector3) {
            var result = new RadJav.Vector3();
            result.x = this.y * vector3.z - this.z * vector3.y;
            result.y = this.z * vector3.x - this.x * vector3.z;
            result.z = this.x * vector3.y - this.y * vector3.x;
            return result;
        };
        /** @method length
         * Get the length of this object using a square root. This will use Math.sqrt.
         * @return {Number} The length of this object.
         */
        Vector3.prototype.length = function () {
            var dReturn = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            return dReturn;
        };
        /** @method normalize
         * Normalize this object, this will use this object's length method.
         * @return {Number} The normalized length of this object.
         */
        Vector3.prototype.normalize = function () {
            var dReturn = this.divide(this.length());
            return dReturn;
        };
        /** @method squaredLength
         * Normalize this object, this will use this object's length method.
         * @return {Number} The normalized length of this object.
         */
        Vector3.prototype.squaredLength = function () {
            var dReturn = this.x * this.x + this.y * this.y + this.z * this.z;
            return dReturn;
        };
        /** @method absDotProduct
         * Get the dot product as an absolute value.
         * @param {RadJav.Vector3} vector3 The Vector3 to perform the dot product.
         * @return {Number} The absolute value of the dot product.
         */
        Vector3.prototype.absDotProduct = function (vector3) {
            var dReturn = Math.abs(this.dot(vector3));
            return dReturn;
        };
        /** @method angleBetween
         * Get the angle between two vectors.
         * @param {RadJav.Vector3} vector3 The Vector3 to get the angle from.
         * @return {Number} The angle.
         */
        Vector3.prototype.angleBetween = function (vector3) {
            var dTheta = this.dot(vector3) / (this.length() * vector3.length());
            var dReturn = Math.acos(Math.clamp(dTheta, -1, 1));
            return dReturn;
        };
        /** @method distance
         * Get the distance between two vectors.
         * @param {RadJav.Vector3} vector3 The Vector3 to get the distance from.
         * @return {Number} The distance.
         */
        Vector3.prototype.distance = function (vector3) {
            var dX = this.x - vector3.x;
            var dY = this.y - vector3.y;
            var dZ = this.z - vector3.z;
            var dReturn = Math.sqrt(dX * dX + dY * dY + dZ * dZ);
            return dReturn;
        };
        return Vector3;
    }());
    RadJav.Vector3 = Vector3;
})(RadJav || (RadJav = {}));
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
    /** @class RadJav.Vector4
     * A Vector4 class.
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    var Vector4 = /** @class */ (function () {
        function Vector4(x, y, z, w) {
            if (x == null)
                x = 0;
            if (y == null)
                y = 0;
            if (z == null)
                z = 0;
            if (w == null)
                w = 0;
            if (x instanceof RadJav.Vector2) {
                var temp = x;
                x = temp.x;
                y = temp.y;
            }
            if (x instanceof RadJav.Vector3) {
                var temp_2 = x;
                x = temp_2.x;
                y = temp_2.y;
                z = temp_2.z;
            }
            if (x instanceof RadJav.Vector4) {
                var temp_3 = x;
                x = temp_3.x;
                y = temp_3.y;
                z = temp_3.z;
                w = temp_3.w;
            }
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        /** @method toString
         * Convert this object to a string.
         * @return {String} The string representing this object.
         */
        Vector4.prototype.toString = function () {
            return this.x + "," + this.y + "," + this.z + "," + this.w;
        };
        return Vector4;
    }());
    RadJav.Vector4 = Vector4;
})(RadJav || (RadJav = {}));
function parseVector4(string) {
    var v4dReturn = new RadJav.Vector4();
    if (string == "")
        return v4dReturn;
    string = string.toLowerCase();
    string = string.replace(/ /g, "");
    var aryStrings = string.split(",");
    v4dReturn.x = parseFloat(aryStrings[0]);
    v4dReturn.y = parseFloat(aryStrings[1]);
    v4dReturn.z = parseFloat(aryStrings[2]);
    v4dReturn.w = parseFloat(aryStrings[3]);
    return v4dReturn;
}
;
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
    var C3D;
    (function (C3D) {
        /** @class RadJav.C3D.Transform
         * A 3d tranform.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Transform = /** @class */ (function () {
            function Transform(object3d, obj, position) {
                if (object3d == null) {
                    throw (RadJav._lang.object3dNotIncluded);
                }
                if (obj == null) {
                    obj = {};
                }
                if (position == null) {
                    position = new RadJav.Vector3();
                }
                if (obj.parent != null) {
                    if (parent._transform != null) {
                        obj._parent = obj.parent._transform;
                    }
                    else {
                        obj._parent = obj.parent;
                    }
                }
                this._object3d = object3d;
                this._parent = RadJav.setDefaultValue(obj._parent, null);
                this._sceneNode = RadJav.setDefaultValue(obj._sceneNode, null);
                this._movable = RadJav.setDefaultValue(obj._movable, null);
                this.position = position;
                if (this._parent != null) {
                    this._sceneNode = this._parent._sceneNode;
                }
                else {
                    this._sceneNode = this._object3d.getCanvas3D()._sceneManager;
                }
            }
            /** @method addChild
             * Add a child RadJav.C3D.Object3D to this transform.
             * @param {RadJav.C3D.Object3D} child The child to add.
             */
            Transform.prototype.addChild = function (child) {
                if (this._sceneNode != null) {
                    this._sceneNode.add(child.getObj3D());
                    this._movable = child.getObj3D();
                }
            };
            /** @method setPosition
             * Set the position of this object.
             * @param {Number/RadJav.Vector3} x The x position or full vector3 position.
             * @param {Number} y The y position.
             * @param {Number} z The z position.
             */
            Transform.prototype.setPosition = function (x, y, z) {
                var obj = {
                    x: 0,
                    y: 0,
                    z: 0
                };
                if (x.x != null) {
                    obj.x = x.x;
                    obj.y = x.y;
                    obj.z = x.z;
                }
                else {
                    obj.x = x;
                    obj.y = y;
                    obj.z = z;
                }
                this._movable.position.set(obj.x, obj.y, obj.z);
            };
            /** @method getPosition
             * Get the position of this object.
             * @return {RadJav.Vector3} The position.
             */
            Transform.prototype.getPosition = function () {
                var pos = this._movable.position;
                var obj = new RadJav.Vector3(pos);
                return obj;
            };
            return Transform;
        }());
        C3D.Transform = Transform;
    })(C3D = RadJav.C3D || (RadJav.C3D = {}));
})(RadJav || (RadJav = {}));
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
/// <reference path="RadJav.C3D.Transform.ts" />
var RadJav;
(function (RadJav) {
    var C3D;
    (function (C3D) {
        /** @class RadJav.C3D.Object3D
         * The base 3D object.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Object3D = /** @class */ (function () {
            function Object3D(canvas3d, obj, parent) {
                /** The name of this object.
                 * @default ""
                 */
                this.name = "";
                /** The type of object.
                 * @default ""
                 */
                this.type = "";
                /** The visibility of the object.
                 * @default true
                 * @protected
                 */
                this._visible = true;
                /** The parent of this object.
                 * @protected
                 * @default null
                 */
                this._parent = null;
                /** The 3d object associated with this object.
                 * @protected
                 * @default null
                 */
                this._obj3d = null;
                if (obj == null) {
                    obj = new Object();
                }
                if (typeof obj == "string") {
                    var tempObj = obj;
                    obj = {};
                    obj.name = tempObj;
                }
                if (parent != null) {
                    obj._parent = parent;
                }
                if (obj.visible != null) {
                    obj._visible = obj.visible;
                }
                if (obj.parent != null) {
                    obj._parent = obj.parent;
                }
                this.name = RadJav.setDefaultValue(obj.name, "");
                this.type = RadJav.setDefaultValue(obj.type, "");
                this._visible = RadJav.setDefaultValue(obj._visible, true);
                this._parent = RadJav.setDefaultValue(obj._parent, null);
                this._canvas3D = canvas3d;
                this._c3dObj = RadJav.setDefaultValue(obj._c3dObj, null);
                this._transform = RadJav.setDefaultValue(obj._transform, new RadJav.C3D.Transform(this));
            }
            Object3D.prototype.getCanvas3D = function () {
                return this._canvas3D;
            };
            Object3D.prototype.getObj3D = function () {
                return this._obj3d;
            };
            /** Using the existing parameters in this object, create it.
             * @return {Promise} The promise to execute when the creation is completed.
             */
            Object3D.prototype.create = function () {
                return null;
            };
            /** Destroy this object.
             */
            Object3D.prototype.destroy = function () { };
            /** Get the parent.
             * @return {RadJav.C3D.Object3D} The parent of this object.
             */
            Object3D.prototype.getParent = function () {
                return this._parent;
            };
            /** Get the transform.
             * @return {RadJav.C3D.Transform} The transform.
             */
            Object3D.prototype.getTransform = function () {
                return this._transform;
            };
            /** Set the position of this object.
             * @param {Number/RadJav.Vector3} x The x position or full vector3 position.
             * @param {Number} y The y position.
             * @param {Number} z The z position.
             */
            Object3D.prototype.setPosition = function (x, y, z) {
                return this._transform.setPosition(x, y, z);
            };
            /** Get the position of this object.
             * @return {RadJav.Vector3} The position.
             */
            Object3D.prototype.getPosition = function () {
                return this._transform.getPosition();
            };
            /** Set the visibility of this object.
             * Theme Event: setVisibility
             * Is Theme Event Asynchronous: Yes
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
             * @param {Boolean} visible The visibility of the object
             */
            Object3D.prototype.setVisibility = function (visible) {
                RadJav.Theme.event(this.type, "setVisibility", this, visible);
            };
            /** Get the visibility of this object.
             * Theme Event: setVisibility
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject
             * @return {Boolean} The visibility of this object
             */
            Object3D.prototype.getVisibility = function () {
                return RadJav.Theme.eventSync(this.type, "getVisibility");
            };
            /** Show this object.
             * Theme Event: setVisibility
             * Is Theme Event Asynchronous: Yes
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
             */
            Object3D.prototype.show = function () {
                this.setVisibility(true);
            };
            /** Show this object.
             * Theme Event: setVisibility
             * Is Theme Event Asynchronous: Yes
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
             */
            Object3D.prototype.hide = function () {
                this.setVisibility(false);
            };
            /** Calls a function when an event is triggered.
             * Theme Event: on
             * Is Theme Event Asynchronous: Yes
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, String, Function
             * @param {String} eventName The name of the event to trigger.
             * @param {Function} func The function to execute.
             */
            Object3D.prototype.on = function (eventName, func) { };
            return Object3D;
        }());
        C3D.Object3D = Object3D;
    })(C3D = RadJav.C3D || (RadJav.C3D = {}));
})(RadJav || (RadJav = {}));
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
/// <reference path="RadJav.C3D.Object3D.ts" />
var RadJav;
(function (RadJav) {
    var C3D;
    (function (C3D) {
        /** @class RadJav.C3D.Camera
         * A camera object.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Camera = /** @class */ (function (_super) {
            __extends(Camera, _super);
            function Camera(canvas3d, obj, parent) {
                var _this = _super.call(this, canvas3d, obj, parent) || this;
                /** @property {Boolean} [_perspective=true]
                 * @protected
                 * If this is set to true, the perspective view will be used.
                 */
                _this._perspective = true;
                _this._perspective = RadJav.setDefaultValue(obj._perspective, true);
                _this._aspectRatio = RadJav.setDefaultValue(obj._aspectRatio, parseFloat(canvas3d.getWidth()) / parseFloat(canvas3d.getHeight()));
                _this._fov = RadJav.setDefaultValue(obj._fov, 90 / _this._aspectRatio);
                _this._nearClip = RadJav.setDefaultValue(obj._nearClip, 1.0);
                _this._farClip = RadJav.setDefaultValue(obj._farClip, 10000000000.0);
                _this._rayCaster = RadJav.setDefaultValue(obj._rayCaster, null);
                return _this;
            }
            /** @method create
             * Using the existing parameters in this object, create it.
             * @return {Promise} The promise to execute when the creation is completed.
             */
            Camera.prototype.create = function () {
                var promise = new Promise(RadJav.keepContext(function (resolve, reject) {
                    if (this._perspective == true) {
                        this._obj3d = new THREE.PerspectiveCamera(this._fov, this._aspectRatio, this._nearClip, this._farClip);
                    }
                    else {
                        var width = this._canvas3D.getWidth();
                        var height = this._canvas3D.getHeight();
                        this._obj3d = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, this._nearClip, this._farClip);
                    }
                    this._rayCaster = new THREE.Raycaster();
                    resolve(this);
                }, this));
                return promise;
            };
            return Camera;
        }(RadJav.C3D.Object3D));
        C3D.Camera = Camera;
    })(C3D = RadJav.C3D || (RadJav.C3D = {}));
})(RadJav || (RadJav = {}));
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
///<reference path="RadJav.C3D.Object3D.ts" />
var RadJav;
(function (RadJav) {
    var C3D;
    (function (C3D) {
        /** @class RadJav.C3D.Camera
         * A camera object.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Entity = /** @class */ (function (_super) {
            __extends(Entity, _super);
            function Entity(canvas3d, obj, parent, model) {
                var _this = _super.call(this, canvas3d, obj, parent) || this;
                _this.Types = {
                    None: 0,
                    Cube: 1,
                    Sphere: 2,
                    Plane: 3,
                    Camera: 4,
                    Light: 5
                };
                if (typeof obj == "string") {
                    var tempObj = obj;
                    obj = {};
                    obj._name = tempObj;
                }
                _this.type = "RadJav.C3D.Entity";
                if (model != null) {
                    obj._model = model;
                }
                if (obj.model != null) {
                    obj._model = obj.model;
                }
                _this._model = RadJav.setDefaultValue(obj._model, null);
                _this._c3dEntity = RadJav.setDefaultValue(obj._c3dEntity, null);
                if (_this._model != null) {
                    if (_this._model._object3d == null) {
                        _this._model._object3d = _this;
                    }
                }
                return _this;
            }
            /** @method create
             * Using the existing parameters in this object, create it.
             * @return {Promise} The promise to execute when the creation is completed.
             */
            Entity.prototype.create = function () {
                var promise = null;
                if (this._model != null) {
                    promise = this._model.create().then(RadJav.keepContext(function (model) {
                        this._obj3d = model.mesh._mesh;
                        this._transform.addChild(this);
                        return this;
                    }, this));
                }
                return promise;
            };
            /** @method setModel
             * Set a model.
             * @param {String} newModel The model to set.
             */
            Entity.prototype.setModel = function (newModel) {
                this._model = newModel;
            };
            /** @method getModel
             * Get the model.
             * @return {String} The model being used.
             */
            Entity.prototype.getModel = function () {
                return this._model;
            };
            return Entity;
        }(RadJav.C3D.Object3D));
        C3D.Entity = Entity;
    })(C3D = RadJav.C3D || (RadJav.C3D = {}));
})(RadJav || (RadJav = {}));
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
    var C3D;
    (function (C3D) {
        /** @class RadJav.C3D.Material
         * A 3d tranform.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Material = /** @class */ (function () {
            function Material(canvas3d, obj, parent, model) {
                /** @property {String} [_name=""]
                 * @protected
                 * The name.
                 */
                this._name = "";
                /** @property {Object} [_material=null]
                 * @protected
                 * The 3d engine material.
                 */
                this._material = {};
                if (obj == null) {
                    obj = new Object();
                }
                if (typeof obj == "string") {
                    var tempObj = obj;
                    obj = {};
                    obj.name = tempObj;
                }
                this._name = RadJav.setDefaultValue(obj._name, "");
                this._material = RadJav.setDefaultValue(obj._material, null);
            }
            /** @method getName
             * Get the name of this object.
             * @return {String} The name.
             */
            Material.prototype.getName = function () {
                return this._name;
            };
            /** @method createMaterials
             * @static
             * Create materials from the 3d engine materials
             * @param {Object/Object[]} materials The materials to create.
             * @return {RadJav.C3D.Material[]} The materials.
             */
            Material._createMaterials = function (canvas3d, materials) {
                var result = [];
                var materialCount = canvas3d.getNumMaterials();
                if (materials instanceof Array) {
                    for (var iIdx = 0; iIdx < materials.length; iIdx++) {
                        var material = new RadJav.C3D.Material(canvas3d, "material-" + materialCount++);
                        material._material = materials[iIdx];
                        canvas3d.addMaterial(material);
                    }
                }
                else {
                    var material = new RadJav.C3D.Material(canvas3d, "material-" + materialCount);
                    material._material = materials;
                    canvas3d.addMaterial(material);
                }
                return result;
            };
            return Material;
        }());
        C3D.Material = Material;
    })(C3D = RadJav.C3D || (RadJav.C3D = {}));
})(RadJav || (RadJav = {}));
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
    var C3D;
    (function (C3D) {
        /** @class RadJav.C3D.Model
        * A 3d Model.
        * Available on platforms: Windows,Linux,OSX,HTML5
        */
        var Model = /** @class */ (function () {
            function Model(object3d, obj, materials) {
                /** @property {String} [_name=""]
                * @protected
                * The name.
                */
                this._name = '';
                /** @property {RadJav.C3D.Material[]} [materials=[]]
                * The materials used in this model.
                */
                this.materials = [];
                if (obj == null) {
                    obj = {};
                }
                if (obj.name != null) {
                    obj._name = obj.name;
                }
                if (materials != null) {
                    obj.materials = materials;
                }
                this._object3d = object3d;
                this._name = RadJav.setDefaultValue(obj._name, "");
                this.mesh = RadJav.setDefaultValue(obj.mesh, null);
                this.materials = RadJav.setDefaultValue(obj.materials, []);
            }
            /** @method create
            * Create the model.
            * @return {Promise} The promise to execute when completed.
            */
            Model.prototype.create = function () {
                var promise = null;
                if (this.mesh != null) {
                    promise = this.mesh.create().then(RadJav.keepContext(function (mesh) {
                        this._object3d._canvas3D.addModel(this);
                        return (this);
                    }, this));
                }
                return (promise);
            };
            ;
            /** @method _setName
            * @protected
            * Set the name of the model.
            * @param {String} name The name of the model.
            */
            Model.prototype._setName = function (name) {
                this._name = name;
            };
            /** @method getName
            * Get the name of the model.
            * @return {String} The name of the model.
            */
            Model.prototype.getName = function () {
                return this._name;
            };
            return Model;
        }());
        C3D.Model = Model;
        (function (Model) {
            /** @class RadJav.C3D.Model.Mesh
            * Information about the 3d Model mesh to load.
            * Available on platforms: Windows,Linux,OSX,HTML5
            */
            var Mesh = /** @class */ (function () {
                function Mesh(model, obj) {
                    /** @property {String} [_name=""]
                    * The name of this mesh.
                    */
                    this._name = '';
                    /** @property {String} [filePath=""]
                    * The path to the file to load.
                    */
                    this.filePath = '';
                    /** @property {String} [type="json"]
                    * @protected
                    * The type of model to load.
                    */
                    this.type = 'json';
                    /** @property {RadJav.C3D.Model.Mesh.Data} [data=null]
                    * @protected
                    * The mesh data.
                    */
                    this.data = null;
                    /** @property {Object} [_mesh=null]
                    * @protected
                    * The 3d engine mesh associated with the model.
                    */
                    this._mesh = null;
                    /** @property {RadJav.C3D.Model} [model=null]
                    * @protected
                    * The model that contains this mesh.
                    */
                    this.model = null;
                    if (obj == null) {
                        obj = {};
                    }
                    if (typeof (obj) == "string") {
                        var tempObj = obj;
                        obj = {};
                        obj.name = tempObj;
                    }
                    if (obj.name != null) {
                        obj._name = obj.name;
                    }
                    this._name = RadJav.setDefaultValue(obj._name, "");
                    this.filePath = RadJav.setDefaultValue(obj.filePath, "");
                    this.type = RadJav.setDefaultValue(obj.type, "json");
                    this.data = RadJav.setDefaultValue(obj.data, null);
                    this._mesh = RadJav.setDefaultValue(obj._mesh, null);
                    this.model = model;
                }
                Mesh.prototype.create = function () {
                    var promise = new Promise(RadJav.keepContext(function (resolve, reject) {
                        if (this.type == "json") {
                            var jsonLoader = new THREE.JSONLoader();
                            jsonLoader.load(this.filePath, RadXML._keepContext(function (geometry, materials) {
                                var meshMaterial = new THREE.MeshFaceMaterial(materials);
                                this._mesh = new THREE.Mesh(geometry, meshMaterial);
                                this._mesh.radJavModel = this;
                                this._mesh.name = this._name;
                                RadJav.C3D.Material._createMaterials(this.model._object3d._canvas3D, materials);
                                resolve(this);
                            }, this));
                        }
                        if (this.type == "primitive") {
                            if (this.data.type == "sphere") {
                                var radius = this.data.radius;
                                if (radius == null) {
                                    radius = 100;
                                }
                                var geometry = new THREE.SphereGeometry(radius);
                                var meshMaterial = null;
                                if (this.model.materials.length > 0) {
                                    meshMaterial = this.model.materials[0]._material;
                                }
                                if (meshMaterial == null) {
                                    meshMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
                                }
                                this._mesh = new THREE.Mesh(geometry, meshMaterial);
                                this._mesh.name = this._name;
                                RadJav.C3D.Material._createMaterials(this.model._object3d._canvas3D, meshMaterial);
                            }
                            resolve(this);
                        }
                    }, this));
                    return (promise);
                };
                return Mesh;
            }());
            Model.Mesh = Mesh;
            (function (Mesh) {
                /** @class RadJav.C3D.Model.Mesh.Data
                * 3d Model mesh data.
                * Available on platforms: Windows,Linux,OSX,HTML5
                */
                var Data = /** @class */ (function () {
                    function Data(mesh, obj) {
                        /** @property {String} [type="mesh"]
                        * @protected
                        * The type of mesh data. Can be:
                        * - mesh
                        * - sphere
                        * - cube
                        * - plane
                        */
                        this.type = 'mesh';
                        /** @property {Number} [radius=100]
                        * @protected
                        * The radius of the sphere.
                        */
                        this.radius = 100;
                        /** @property {Number} [width=0]
                        * @protected
                        * The width of the mesh.
                        */
                        this.width = 0;
                        /** @property {Number} [height=0]
                        * @protected
                        * The height of the mesh.
                        */
                        this.height = 0;
                        /** @property {Number} [depth=0]
                        * @protected
                        * The depth of the mesh.
                        */
                        this.depth = 0;
                        /** @property {Number} [widthSegments=1]
                        * @protected
                        * The width segments in the cube.
                        */
                        this.widthSegments = 1;
                        /** @property {Number} [heightSegments=1]
                        * @protected
                        * The height segments in the cube.
                        */
                        this.heightSegments = 1;
                        /** @property {Number} [depthSegments=1]
                        * @protected
                        * The depth segments in the cube.
                        */
                        this.depthSegments = 1;
                        this.type = RadJav.setDefaultValue(obj.type, "mesh");
                        this.radius = RadJav.setDefaultValue(obj.radius, 100);
                        this.width = RadJav.setDefaultValue(obj.width, 0);
                        this.height = RadJav.setDefaultValue(obj.height, 0);
                        this.depth = RadJav.setDefaultValue(obj.depth, 0);
                        this.widthSegments = RadJav.setDefaultValue(obj.widthSegments, 1);
                        this.heightSegments = RadJav.setDefaultValue(obj.heightSegments, 1);
                        this.depthSegments = RadJav.setDefaultValue(obj.depthSegments, 1);
                    }
                    return Data;
                }());
                Mesh.Data = Data;
            })(Mesh = Model.Mesh || (Model.Mesh = {}));
        })(Model = C3D.Model || (C3D.Model = {}));
        /** @class RadJav.C3D.Model.Sphere
        * Create a sphere.
        * Available on platforms: Windows,Linux,OSX,HTML5
        */
        var Sphere = /** @class */ (function (_super) {
            __extends(Sphere, _super);
            function Sphere(object3d, obj, materials, radius) {
                var _this = _super.call(this, object3d, obj, materials) || this;
                _this.mesh = new RadJav.C3D.Model.Mesh(_this, _this._name);
                _this.mesh.type = "primitive";
                _this.mesh.data = {
                    type: "sphere",
                    radius: radius
                };
                return _this;
            }
            return Sphere;
        }(Model));
    })(C3D = RadJav.C3D || (RadJav.C3D = {}));
})(RadJav || (RadJav = {}));
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
/** The base GUI object.
 * Available on platforms: Windows,Linux,OSX,HTML5
 */
/// <reference path="RadJav.ts" />
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var GObject = /** @class */ (function () {
            function GObject(obj, text, parent, beforeCreatedChild) {
                if (obj == null) {
                    obj = new Object();
                }
                if (typeof obj == "string") {
                    var tempObj = obj;
                    obj = {};
                    obj.name = tempObj;
                }
                if (beforeCreatedChild == undefined) {
                    beforeCreatedChild = null;
                }
                if (text != null) {
                    obj._text = text;
                }
                if (parent != null) {
                    obj._parent = parent;
                }
                if (obj.text != null) {
                    obj._text = obj.text;
                }
                if (obj.cursor != null) {
                    obj._cursor = obj.cursor;
                }
                if (obj.visible != null) {
                    obj._visible = obj.visible;
                }
                if (obj.visibility != null) {
                    obj._visible = obj.visibility;
                }
                if (obj.zIndex != null) {
                    obj._zIndex = obj.zIndex;
                }
                if (obj.font != null) {
                    obj._font = new RadJav.Font(obj.font);
                }
                if (obj.parent != null) {
                    obj._parent = obj.parent;
                }
                this.name = RadJav.setDefaultValue(obj.name, "");
                this.type = RadJav.setDefaultValue(obj.type, "");
                this._transform = RadJav.setDefaultValue(obj._transform, new RadJav.Rectangle());
                this._visible = RadJav.setDefaultValue(obj._visible, true);
                this._zIndex = RadJav.setDefaultValue(obj._zIndex, 0);
                this._text = RadJav.setDefaultValue(obj._text, "");
                this._font = RadJav.setDefaultValue(obj._font, new RadJav.Font());
                this._cursor = RadJav.setDefaultValue(obj._cursor, "default");
                this._parent = RadJav.setDefaultValue(obj._parent, null);
                this._children = RadJav.setDefaultValue(obj._children, []);
                this._html = RadJav.setDefaultValue(obj._html, null);
                this._appObj = RadJav.setDefaultValue(obj._appObj, null);
                this.createOnPlatforms = RadJav.setDefaultValue(obj.createOnPlatforms, null);
                this.onBeforeChildCreated = RadJav.setDefaultValue(obj.onBeforeChildCreated, null);
                this.onCreated = RadJav.setDefaultValue(obj.onCreated, null);
                this._events = RadJav.setDefaultValue(obj._events, {});
                if (obj.events != null) {
                    this._events = obj.events;
                }
                if (obj.click != null) {
                    this._events.click = obj.click;
                }
                if (obj.children != null) {
                    for (var iIdx = 0; iIdx < obj.children.length; iIdx++) {
                        var obj2 = obj.children[iIdx];
                        var createObject = true;
                        if (this.onBeforeChildCreated != null) {
                            var result = this.onBeforeChildCreated(obj2, parent);
                        }
                        if (result != null) {
                            createObject = result;
                        }
                    }
                    if (createObject == true) {
                        this._children.push(obj2);
                    }
                }
                if (obj.position != null) {
                    var position = new RadJav.Vector2();
                    if (typeof obj.position == "string") {
                        position = RadJav.Vector2.parseVector2(obj.position);
                    }
                    else {
                        position = obj.position;
                    }
                    this._transform.setPosition(position);
                }
                if (obj.size != null) {
                    var size = new RadJav.Vector2();
                    if (typeof obj.size == "string") {
                        size = RadJav.Vector2.parseVector2(obj.size);
                    }
                    else {
                        size = obj.size;
                    }
                    this._transform.setSize(size);
                }
            }
            /** @event [onBeforeChildCreated=null]
             * The function to execute before a child is created.
             */
            GObject.prototype.onBeforeChildCreated = function (obj, parent) { };
            ;
            /** @event [onCreated=null]
             * The function to execute once the object has been created.
             */
            GObject.prototype.onCreated = function (obj) { };
            /** @method create
             * Using the existing parameters in this object, create it.
             * Theme Event: create
             * Is Theme Event Asynchronous: Yes
             * @return {Promise} The promise to execute when the creation is completed.
             */
            GObject.prototype.create = function () {
                var promise = new Promise(RadJav.keepContext(function (resolve, reject) {
                    if (this.createOnPlatforms != null) {
                        for (var key in this.createOnPlatforms) {
                            if (key == "HTML5") {
                                if (this.createOnPlatforms[key] == false) {
                                    resolve(this);
                                    return;
                                }
                            }
                        }
                    }
                    var promise2 = RadJav.Theme.event(this.type, "create", this);
                    if (promise2 == null) {
                        debugger;
                    }
                    promise2.then(RadJav.keepContext(function (htmlObj) {
                        this._html = htmlObj;
                        var promises = [];
                        for (var iIdx = 0; iIdx < this._children.length; iIdx++) {
                            this._children[iIdx] = RadJav.GUI.initObj(this._children[iIdx], "", "", this);
                            promises.push(this._children[iIdx].create());
                        }
                        Promise.all(promises).then(RadJav.keepContext(function () {
                            for (var key in this._events) {
                                if (this._events[key] != null) {
                                    var func = new Function(this._events[key]);
                                    RadJav.Theme.event(this.type, "on", this, key, func);
                                }
                            }
                            if (this.onCreated != null) {
                                this.onCreated();
                            }
                            resolve(this);
                        }, this));
                    }, this));
                }, this));
                return promise;
            };
            /** @method setFont
             * Set this object's font.
             * Theme Event: setFont
             * Is Theme Event Asynchronous: No
             * @param {RadJav.Font} font The font to set.
             */
            GObject.prototype.setFont = function (font) {
                this._font = font;
                RadJav.Theme.eventSync(this.type, "setFont", this, font);
            };
            /** @method getFont
             * Get this object's font.
             * Theme Event: getFont
             * Is Theme Event Asynchronous: No
             * @return {RadJav.Font} The font.
             */
            GObject.prototype.getFont = function () {
                return RadJav.Theme.eventSync(this.type, "getFont", this);
            };
            /** @method setPosition
             * Set the position of this object.
             * Theme Event: None
             * Is Theme Event Asynchronous: No
             * @param {Number/RadJav.Vector2} x The new position, or the new x coordinate of the new position.
             * @param {Number} [y=null] The new y coordinate.
             */
            GObject.prototype.setPosition = function (x, y) {
                this._transform.setPosition(x, y);
            };
            /** @method getPosition
             * Get the position of this object.
             * Theme Event: None
             * Is Theme Event Asynchronous: No
             * @return {RadJav.Vector2} The position of this object.
             */
            GObject.prototype.getPosition = function () {
                return this._transform.getPosition();
            };
            /** @method getX
             * Get the X position of this object.
             * Theme Event: None
             * Is Theme Event Asynchronous: No
             * @return {RadJav.Vector2} The position of this object.
             */
            GObject.prototype.getX = function () {
                return this._transform.x;
            };
            /** @method getY
             * Get the Y position of this object.
             * Theme Event: None
             * Is Theme Event Asynchronous: No
             * @return {RadJav.Vector2} The position of this object.
             */
            GObject.prototype.getY = function () {
                return this._transform.y;
            };
            /** @method setSize
             * Set the size of this object.
             * Theme Event: None
             * Is Theme Event Asynchronous: No
             * @param {Number/RadJav.Vector2} width The object's new size, or new width.
             * @param {Number} [height=null] The object's new height.
             */
            GObject.prototype.setSize = function (width, height) {
                this._transform.setSize(width, height);
            };
            /** @method getSize
             * Get the size of this object.
             * Theme Event: None
             * Is Theme Event Asynchronous: No
             * @return {RadJav.Vector2} The size of this object.
             */
            GObject.prototype.getSize = function () {
                return this._transform.getSize();
            };
            /** @method getWidth
             * Get the width of this object.
             * Theme Event: None
             * Is Theme Event Asynchronous: No
             * @return {Number} The width of this object.
             */
            GObject.prototype.getWidth = function () {
                return this._transform.width;
            };
            /** @method getHeight
             * Get the height of this object.
             * Theme Event: None
             * Is Theme Event Asynchronous: No
             * @return {Number} The height of this object.
             */
            GObject.prototype.getHeight = function () {
                return this._transform.height;
            };
            /** @method setText
             * Set the object's text.
             * Theme Event: setText
             * Is Theme Event Asynchronous: Yes
             * @param {String} text The text to set.
             * @return {String} The text associated with this object.
             */
            GObject.prototype.setText = function (text) {
                RadJav.Theme.event(this.type, "setText", this, text);
            };
            /** @method getText
             * Get the object's text.
             * Theme Event: getText
             * Is Theme Event Asynchronous: No
             * @return {String} The text associated with this object.
             */
            GObject.prototype.getText = function () {
                return RadJav.Theme.eventSync(this.type, "getText", this);
            };
            /** @method getParent
             * Get the parent.
             * Theme Event: None
             * Is Theme Event Asynchronous: No
             * @return {RadJav.GUI.GObject} The parent of this object.
             */
            GObject.prototype.getParent = function () {
                return this._parent;
            };
            /** @method getHTML
             * Get the HTML from this object.
             * Theme Event: None
             * Is Theme Event Asynchronous: No
             * @return {Mixed} The HTML object associated with this object.
             */
            GObject.prototype.getHTML = function () {
                return this._html;
            };
            /** @method setVisibility
             * Set the visibility of this object.
             * Theme Event: setVisibility
             * Is Theme Event Asynchronous: Yes
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
             * @param {Boolean} visible The visibility of the object
             */
            GObject.prototype.setVisibility = function (visible) {
                RadJav.Theme.event(this.type, "setVisibility", this, visible);
            };
            /** @method getVisibility
             * Get the visibility of this object.
             * Theme Event: setVisibility
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject
             * @return {Boolean} The visibility of this object
             */
            GObject.prototype.getVisibility = function () {
                return RadJav.Theme.eventSync(this.type, "getVisibility", this);
            };
            /** @method show
             * Show this object.
             * Theme Event: setVisibility
             * Is Theme Event Asynchronous: Yes
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
             */
            GObject.prototype.show = function () {
                this.setVisibility(true);
            };
            /** @method hide
             * Show this object.
             * Theme Event: setVisibility
             * Is Theme Event Asynchronous: Yes
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
             */
            GObject.prototype.hide = function () {
                this.setVisibility(false);
            };
            /** @method setEnabled
             * Enable or disable this object.
             * Theme Event: setEnabled
             * Is Theme Event Asynchronous: Yes
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
             */
            GObject.prototype.setEnabled = function (enabled) {
                RadJav.Theme.event(this.type, "setEnabled", this, enabled);
            };
            /** @method getEnabled
             * Get whether or not this object is enabled.
             * Theme Event: getEnabled
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject
             * @return {Boolean} The enabled status of this object
             */
            GObject.prototype.getEnabled = function () {
                return RadJav.Theme.eventSync(this.type, "getEnabled", this);
            };
            /** @method on
             * Calls a function when an event is triggered.
             * Theme Event: on
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, String, Function
             * @param {String} eventName The name of the event to trigger.
             * @param {Function} func The function to execute.
             * @return {Mixed} The result.
             */
            GObject.prototype.on = function (eventName, func) {
                return RadJav.Theme.event(this.type, "on", this, eventName, func);
            };
            /** @method getHTMLDOM
             * Get the HTML dom object.
             * Theme Event: getHTMLDOM
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject
             * Available on platforms: HTML5
             * @return {Mixed} The html dom object.
             */
            GObject.prototype.getHTMLDOM = function () {
                return RadJav.Theme.eventSync(this.type, "getHTMLDOM", this);
            };
            return GObject;
        }());
        GUI.GObject = GObject;
    })(GUI = RadJav.GUI || (RadJav.GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.Button
         * @extends RadJav.GUI.GObject
         * A button.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Button = /** @class */ (function (_super) {
            __extends(Button, _super);
            function Button(obj, text, parent) {
                var _this = _super.call(this, obj, text, parent) || this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 80;
                    obj.size.y = 40;
                }
                return _this;
            }
            return Button;
        }(RadJav.GUI.GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.Combobox
         * @extends RadJav.GUI.GObject
         * A combobox.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Canvas3D = /** @class */ (function (_super) {
            __extends(Canvas3D, _super);
            function Canvas3D(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 500;
                    obj.size.y = 350;
                }
                _this = _super.call(this, obj, text, parent) || this;
                _this.type = "RadJav.GUI.Canvas3D";
                _this._renderer = RadJav.setDefaultValue(obj._renderer, null);
                _this._rendererType = RadJav.setDefaultValue(obj._renderer, 1);
                _this._currentCamera = RadJav.setDefaultValue(obj._currentCamera, null);
                _this._models = RadJav.setDefaultValue(obj._models, {});
                _this._materials = RadJav.setDefaultValue(obj._materials, {});
                return _this;
            }
            Canvas3D.prototype.create = function () {
                var promise = RadJav.Theme.event(this.type, "create", this).then(RadJav.keepContext(function (html) {
                    this._html = html;
                    if (this._rendererType ==
                        RadJav.GUI.Canvas3D.RendererTypes.AnyAvailable) {
                        try {
                            this._renderer = new THREE.WebGLRenderer({
                                canvas: this._html,
                                alpha: false
                            });
                        }
                        catch (ex) {
                            console.log(RadJav._lang.webglIsNotSupported);
                        }
                        if (this._renderer == null) {
                            this._renderer = new THREE.CanvasRenderer({
                                canvas: this._html,
                                alpha: false
                            });
                        }
                    }
                    else {
                        var rendererType = "WebGLRenderer";
                        if (this._rendererType == RadJav.GUI.Canvas3D.RendererTypes.WebGL) {
                            rendererType = "WebGLRenderer";
                        }
                        if (this._rendererType ==
                            RadJav.GUI.Canvas3D.RendererTypes.Context2D) {
                            rendererType = "CanvasRenderer";
                        }
                        this._renderer = new THREE[rendererType]({
                            canvas: this._html,
                            alpha: false
                        });
                    }
                    if (this._renderer == null) {
                        throw RadJav._lang.unableToCreateaRenderSystem;
                    }
                    this._renderer.setClearColor(RadJav.Color.Black.toHexInt());
                    this._setupDefaultSceneManager();
                    this.setAmbientLightColor(RadJav.Color.White);
                    this._renderer.setPixelRatio(window.devicePixelRatio);
                    this._renderer.setSize(this.getWidth(), this.getHeight());
                    if (this._html == null) {
                        this._html = document.body;
                        document.body.style.margin = "0px";
                        document.body.style.padding = "0px";
                    }
                    this._setupDefaultCamera().then(RadJav.keepContext(function () {
                        this.render();
                    }, this));
                    return this;
                }, this));
                return promise;
            };
            /** @method _setupDefaultCamera
             * @protected
             * Setup the default camera.
             * @return {Promise} The promise to execute when the camera has finished being
             * created.
             */
            Canvas3D.prototype._setupDefaultCamera = function () {
                var camera = new RadJav.C3D.Camera(this, "camera");
                return camera.create().then(RadJav.keepContext(function (cam) {
                    this._currentCamera = cam;
                }, this));
            };
            /** @method _setupDefaultSceneManager
             * @protected
             * Setup the default scene manager.
             * @return {RadJav.GUI.GObject} The parent of this object.
             */
            Canvas3D.prototype._setupDefaultSceneManager = function () {
                this._sceneManager = new THREE.Scene();
            };
            /** @method setAmbientLightColor
             * Set the ambient light color of the scene.
             * @param {RadJav.Color} color The color.
             */
            Canvas3D.prototype.setAmbientLightColor = function (colour) {
                this._sceneManager.add(new THREE.AmbientLight(colour.toHexInt()));
            };
            /** @method createEntity
             * Create an entity to display in the scene.
             * @param {String} name The name of the object.
             * @param {RadJav.C3D.Object3D} parent The parent object.
             * @param {RadJav.C3D.Model} model The 3d model to create.
             * @return {Promise} The promise to execute when the entity has finished creating.
             */
            Canvas3D.prototype.createEntity = function (name, parent, model) {
                var entity = new RadJav.C3D.Entity(this, name, parent, model);
                return entity.create();
            };
            /** @method addModel
             * Add a loaded model for use.
             * @param {RadJav.C3D.Model} model The model to add.
             */
            Canvas3D.prototype.addModel = function (model) {
                this._models[model.getName()] = model;
            };
            /** @method addMaterial
             * Add a loaded material for use.
             * @param {RadJav.C3D.Material} material The material to add.
             */
            Canvas3D.prototype.addMaterial = function (material) {
                this._materials[material.getName()] = material;
            };
            /** @method getNumModels
             * Get the number of models that have been loaded.
             */
            Canvas3D.prototype.getNumModels = function () {
                return Object.keys(this._models).length;
            };
            /** @method getNumMaterials
             * Get the number of materials that have been loaded.
             */
            Canvas3D.prototype.getNumMaterials = function () {
                return Object.keys(this._materials).length;
            };
            /** @method render
             * Perform the actual rendering.
             */
            Canvas3D.prototype.render = function () {
                requestAnimationFrame(RadJav.keepContext(this.render, this));
                this._renderer.render(this._sceneManager, this._currentCamera._obj3d);
            };
            /** @method createWorld
             * Set the ambient light color of the scene.
             * @param {RadJav.Color} color The color.
             */
            Canvas3D.prototype.createWorld = function (colour) {
                this._sceneManager.add(new THREE.AmbientLight(colour.toHexInt()));
            };
            /** @method createWorld
             * Set the ambient light color of the scene.
             * @param {RadJav.Color} color The color.
             */
            Canvas3D.prototype.setWorld = function (colour) {
                this._sceneManager.add(new THREE.AmbientLight(colour.toHexInt()));
            };
            return Canvas3D;
        }(RadJav.GUI.GObject));
        GUI.Canvas3D = Canvas3D;
        (function (Canvas3D) {
            /** A 3d canvas.
             * Available on platforms: Windows,Linux,OSX,HTML5
             */
            var RendererTypes;
            (function (RendererTypes) {
                RendererTypes[RendererTypes["AnyAvailable"] = 1] = "AnyAvailable";
                RendererTypes[RendererTypes["WebGL"] = 2] = "WebGL";
                RendererTypes[RendererTypes["Context2D"] = 3] = "Context2D";
            })(RendererTypes = Canvas3D.RendererTypes || (Canvas3D.RendererTypes = {}));
        })(Canvas3D = GUI.Canvas3D || (GUI.Canvas3D = {}));
    })(GUI = RadJav.GUI || (RadJav.GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.Checkbox
         * @extends RadJav.GUI.GObject
         * A checkbox.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Checkbox = /** @class */ (function (_super) {
            __extends(Checkbox, _super);
            function Checkbox(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 80;
                    obj.size.y = 40;
                }
                if (obj.checked != null) {
                    obj._checked = obj.checked;
                }
                _this = _super.call(this, obj, text, parent) || this;
                _this.type = "RadJav.GUI.Checkbox";
                /** @property {Boolean} [_checked=false]
                 * If set to true, the box is checked.
                 */
                _this._checked = RadJav.setDefaultValue(obj._checked, false);
                return _this;
            }
            /** Set whether or not this checkbox is checked.
             * Theme Event: setChecked
             * Is Theme Event Asynchronous: No
             * @param {Boolean} checked Whether or not this is checked.
             * @return {Promise} Executes the promise when the image has loaded.
             */
            Checkbox.prototype.setChecked = function (checked) {
                RadJav.Theme.eventSync(this.type, "setChecked", this, checked);
            };
            /** Checks if this checkbox is checked.
             * Theme Event: isChecked
             * Is Theme Event Asynchronous: No
             * @return {Boolean} Whether or not this is checked.
             */
            Checkbox.prototype.isChecked = function () {
                return RadJav.Theme.eventSync(this.type, "isChecked", this);
            };
            return Checkbox;
        }(RadJav.GUI.GObject));
        GUI.Checkbox = Checkbox;
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.Combobox
         * @extends RadJav.GUI.GObject
         * A combobox.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Combobox = /** @class */ (function (_super) {
            __extends(Combobox, _super);
            function Combobox(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.items != null) {
                    obj._items = obj.items;
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 120;
                    obj.size.y = 40;
                }
                _this = _super.call(this, obj, text, parent) || this;
                _this.type = "RadJav.GUI.Combobox";
                return _this;
            }
            Combobox.prototype.onCreated = function () {
                for (var iIdx = 0; iIdx < this._items.length; iIdx++) {
                    var item = this._items[iIdx];
                    this.addItem(item);
                }
            };
            /** @method addItem
             * Add an item to the combo box.
             * Theme Event: addItem
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.Combobox.Item
             * @param {RadJav.GUI.Combobox.Item/String} item The item to add.
             */
            Combobox.prototype.addItem = function (item) {
                if (typeof item == "string") {
                    item = { text: item };
                }
                RadJav.Theme.eventSync(this.type, "addItem", this, item);
            };
            /** @method setItems
             * Set an array of items to the combo box.
             * Theme Event: setItems
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.Combobox.Item[]
             * @param {RadJav.GUI.Combobox.Item[]} items The items to set to this combo box.
             */
            Combobox.prototype.setItems = function (items) {
                RadJav.Theme.eventSync(this.type, "setItems", this, items);
            };
            /** @method deleteItem
             * Remove an item from this combobox.
             * Theme Event: deleteItem
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, Number
             * @param {Number} The item index to delete.
             */
            Combobox.prototype.deleteItem = function (index) {
                RadJav.Theme.eventSync(this.type, "deleteItem", this, index);
            };
            /** @method getItem
             * Get an item from this combobox.
             * Theme Event: getItem
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, Number
             * @return {RadJav.GUI.Combobox.Item} The item.
             */
            Combobox.prototype.getItem = function (index) {
                return RadJav.Theme.eventSync(this.type, "getItem", this, index);
            };
            /** @method getItems
             * Get all items from this combobox.
             * Theme Event: getItems
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject
             * @return {RadJav.GUI.Combobox.Item[]} The items.
             */
            Combobox.prototype.getItems = function () {
                return RadJav.Theme.eventSync(this.type, "getItems", this);
            };
            /** @method getNumItems
             * Get the number of items.
             * Theme Event: getNumItems
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject
             * @return {Number} The number of items.
             */
            Combobox.prototype.getNumItems = function () {
                return RadJav.Theme.eventSync(this.type, "getNumItems", this);
            };
            /** @method clear
             * Clear this object of all items.
             * Theme Event: clear
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject
             */
            Combobox.prototype.clear = function () {
                return RadJav.Theme.eventSync(this.type, "clear", this);
            };
            /** @method setSelectedItemIndex
             * Set the selected item index.
             * Theme Event: setSelectedItemIndex
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject
             * Returned from Theme Event: Boolean
             * @param {Number} index The selected item index.
             */
            Combobox.prototype.setSelectedItemIndex = function (index) {
                RadJav.Theme.eventSync(this.type, "setSelectedItemIndex", this, index);
            };
            /** @method getSelectedItemIndex
             * Get the selected item index.
             * Theme Event: getSelectedItemIndex
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject
             * Returned from Theme Event: Boolean
             * @return {Number} The selected item index.
             */
            Combobox.prototype.getSelectedItemIndex = function () {
                return RadJav.Theme.eventSync(this.type, "getSelectedItemIndex", this);
            };
            return Combobox;
        }(RadJav.GUI.GObject));
        GUI.Combobox = Combobox;
        (function (Combobox) {
            /** @class RadJav.GUI.Combobox.Item
             * A combobox item.
             * Available on platforms: Windows,Linux,OSX,HTML5
             */
            var Item = /** @class */ (function () {
                function Item(obj) {
                    if (obj == null) {
                        obj = {};
                    }
                    this.name = RadJav.setDefaultValue(obj.name, "");
                    this.text = RadJav.setDefaultValue(obj.text, "");
                }
                return Item;
            }());
            Combobox.Item = Item;
        })(Combobox = GUI.Combobox || (GUI.Combobox = {}));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.Container
         * @extends RadJav.GUI.GObject
         * A container.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Container = /** @class */ (function (_super) {
            __extends(Container, _super);
            function Container(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 100;
                    obj.size.y = 100;
                }
                _this = _super.call(this, obj, text, parent) || this;
                _this.type = "RadJav.GUI.Container";
                return _this;
            }
            return Container;
        }(RadJav.GUI.GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.HTMLElement
         * @extends RadJav.GUI.GObject
         * An HTML element.
         * Available on platforms: HTML5
         */
        var HTMLElement = /** @class */ (function (_super) {
            __extends(HTMLElement, _super);
            function HTMLElement(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 500;
                    obj.size.y = 350;
                }
                (_this = _super.call(this, obj, text, parent) || this) || _this;
                _this.type = "RadJav.GUI.HTMLElement";
                return _this;
            }
            return HTMLElement;
        }(RadJav.GUI.GObject));
        GUI.HTMLElement = HTMLElement;
    })(GUI = RadJav.GUI || (RadJav.GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.Image
         * @extends RadJav.GUI.GObject
         * An image.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Image = /** @class */ (function (_super) {
            __extends(Image, _super);
            function Image(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 100;
                    obj.size.y = 100;
                }
                _this = _super.call(this, obj, text, parent) || this;
                _this.type = "RadJav.GUI.Image";
                if (obj.image != null) {
                    obj._image = obj.image;
                }
                _this._image = RadJav.setDefaultValue(obj._image, null);
                return _this;
            }
            Image.prototype.onCreated = function () {
                if (this._image != null) {
                    this.setImage(this._image);
                }
            };
            /** @method setImage
             * Set the image.
             * Theme Event: setImage
             * Is Theme Event Asynchronous: Yes
             * @param {String/Image} image The image to display.
             * @return {Promise} Executes the promise when the image has loaded.
             */
            Image.prototype.setImage = function (image) {
                RadJav.Theme.event(this.type, "setImage", this, image);
            };
            return Image;
        }(RadJav.GUI.GObject));
        GUI.Image = Image;
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.Label
         * @extends RadJav.GUI.GObject
         * A label.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Label = /** @class */ (function (_super) {
            __extends(Label, _super);
            function Label(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 120;
                    obj.size.y = 40;
                }
                _this = _super.call(this, obj, text, parent) || this;
                _this.type = "RadJav.GUI.Label";
                return _this;
            }
            return Label;
        }(RadJav.GUI.GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.Label
         * @extends RadJav.GUI.GObject
         * A label.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var List = /** @class */ (function (_super) {
            __extends(List, _super);
            function List(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 350;
                    obj.size.y = 300;
                }
                _this = _super.call(this, obj, text, parent) || this;
                _this.type = "RadJav.GUI.List";
                if (obj.canSort != null) {
                    obj._canSort = obj.canSort;
                }
                if (obj.columns != null) {
                    obj._columns = obj.columns;
                }
                _this._canSort = RadJav.setDefaultValue(obj._canSort, true);
                _this._hasCheckBoxes = RadJav.setDefaultValue(obj._hasCheckBoxes, false);
                _this._columns = RadJav.setDefaultValue(obj._columns, []);
                return _this;
            }
            ;
            /** @method addColumn
             * Add a column to this list.
             * Theme Event: addColumn
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.List.Column
             * @param {RadJav.GUI.List.Column/String} columns The columns to set to this list.
             * @param {Number} [width=null] The width.
             * @param {Mixed} [key=null] The key associated with this column.
             */
            List.prototype.addColumn = function (column, width, key) {
                var tempColumn = null;
                if (typeof column == "object") {
                    tempColumn = column;
                }
                else {
                    tempColumn = { text: column };
                    if (width != null) {
                        tempColumn.width = width;
                    }
                    if (key != null) {
                        tempColumn.key = key;
                    }
                }
                this._columns.push(tempColumn);
                RadJav.Theme.eventSync(this.type, "addColumn", this, tempColumn);
            };
            /** @method setColumns
             * Set the columns of this list.
             * Theme Event: setColumns
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.List.Column[]
             * @param {RadJav.GUI.List.Column[]} columns The columns to set to this list.
             */
            List.prototype.setColumns = function (columns) {
                this._columns = columns;
                RadJav.Theme.eventSync(this.type, "setColumns", this, columns);
            };
            /** @method addRow
             * Add a row to the list.
             * Theme Event: addRow
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, row, hiddenValue
             * @param {Mixed} row The row to add to the list.
             * @param {Mixed} [hiddenValue=undefined] The hidden value to add to the row. If
             * row has a property named hiddenRow, the value of that will be placed into this
             * parameter, and it will be deleted from the row object.
             */
            List.prototype.addRow = function (row, hiddenValue) {
                RadJav.Theme.eventSync(this.type, "addRow", this, row, hiddenValue);
            };
            /** @method setRows
             * Set the list's rows.
             * Theme Event: setRows
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, rows, hiddenRows
             * @param {Array} rows The rows of data to set.
             * @param {Array} [hiddenRows=null] The hidden rows of data to set.
             */
            List.prototype.setRows = function (rows, hiddenRows) {
                RadJav.Theme.eventSync(this.type, "setRows", this, rows, hiddenRows);
            };
            /** @method getSelectedRows
             * Get the selected rows.
             * Theme Event: getSelectedRows
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject
             * @return {RadJav.GUI.List.Selection} The selected objects.
             */
            List.prototype.getSelectedRows = function () {
                return RadJav.Theme.eventSync(this.type, "getSelectedRows", this);
            };
            /** @method deleteRows
             * Delete rows.
             * Theme Event: deleteRows
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.List.Selection
             * @param {RadJav.GUI.List.Selection} selection The selection to delete.
             */
            List.prototype.deleteRows = function (selection) {
                return RadJav.Theme.eventSync(this.type, "deleteRows", this, selection);
            };
            return List;
        }(RadJav.GUI.GObject));
        GUI.List = List;
        /** @class RadJav.GUI.List.Row
         * A List row.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Row = /** @class */ (function () {
            function Row(obj) {
                if (obj == null) {
                    obj = {};
                }
                this.items = RadJav.setDefaultValue(obj.items, []);
            }
            /** @method addItem
             * Add an item to this row.
             * @param {RadJav.GUI.List.Item} item The item to add.
             */
            Row.prototype.addItem = function (item) {
                if (typeof item != "object") {
                    item = new RadJav.GUI.List.Item({ text: item });
                }
                this.items.push(item);
            };
            return Row;
        }());
        GUI.Row = Row;
        (function (List) {
            /** @class RadJav.GUI.List.Item
             * A List item.
             * Available on platforms: Windows,Linux,OSX,HTML5
             */
            var Item = /** @class */ (function () {
                function Item(obj) {
                    if (obj == null) {
                        obj = {};
                    }
                    this.name = RadJav.setDefaultValue(obj.name, "");
                    this.text = RadJav.setDefaultValue(obj.text, "");
                }
                return Item;
            }());
            List.Item = Item;
            /** @class RadJav.GUI.List.Column
             * A List column.
             * Available on platforms: Windows,Linux,OSX,HTML5
             */
            var Column = /** @class */ (function () {
                function Column(obj) {
                    if (obj == null) {
                        obj = {};
                    }
                    this.text = RadJav.setDefaultValue(obj.text, "");
                    this.width = RadJav.setDefaultValue(obj.width, 0);
                    this.key = RadJav.setDefaultValue(obj.key, null);
                }
                return Column;
            }());
            List.Column = Column;
            /** @class RadJav.GUI.List.Selection
             * A List selection.
             * Available on platforms: Windows,Linux,OSX,HTML5
             */
            var Selection = /** @class */ (function () {
                function Selection(obj) {
                    if (obj == null) {
                        obj = {};
                    }
                    this._html = RadJav.setDefaultValue(obj._html, null);
                    this._appObj = RadJav.setDefaultValue(obj._appObj, null);
                }
                return Selection;
            }());
            List.Selection = Selection;
        })(List = GUI.List || (GUI.List = {}));
    })(GUI = RadJav.GUI || (RadJav.GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.MenuBar
         * @extends RadJav.GUI.GObject
         * A menu Bar.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var MenuBar = /** @class */ (function (_super) {
            __extends(MenuBar, _super);
            function MenuBar(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 120;
                    obj.size.y = 40;
                }
                _this = _super.call(this, obj, text, parent) || this;
                _this.type = "RadJav.GUI.MenuBar";
                if (obj.htmlElement != null) {
                    obj._htmlElement = obj.htmlElement;
                }
                _this._htmlElement = RadJav.setDefaultValue(obj._htmlElement, null);
                if (_this._htmlElement != null) {
                    _this.setHTMLElement(_this._htmlElement);
                }
                return _this;
            }
            /** @method setHTMLElement
             * Set the HTML element to use, if the OS being used is HTML5.
             * @param {RadJav.GUI.HTMLElement/String} element The element to be used.
             */
            MenuBar.prototype.setHTMLElement = function (element) {
                var elm = element;
                if (typeof element == "string") {
                    elm = new RadJav.GUI.HTMLElement(this.name);
                }
                this._htmlElement = elm;
            };
            return MenuBar;
        }(RadJav.GUI.GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.MenuItem
         * @extends RadJav.GUI.GObject
         * A menu item.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var MenuItem = /** @class */ (function (_super) {
            __extends(MenuItem, _super);
            function MenuItem(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 120;
                    obj.size.y = 40;
                }
                (_this = _super.call(this, obj, text, parent) || this) || _this;
                _this.type = "RadJav.GUI.MenuItem";
                return _this;
            }
            return MenuItem;
        }(RadJav.GUI.GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.Radio
         * @extends RadJav.GUI.GObject
         * A Radio button.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Radio = /** @class */ (function (_super) {
            __extends(Radio, _super);
            function Radio(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 80;
                    obj.size.y = 40;
                }
                (_this = _super.call(this, obj, text, parent) || this) || _this;
                _this.type = "RadJav.GUI.Radio";
                if (obj.radioGroup != null) {
                    obj._radioGroup = obj.radioGroup;
                }
                if (obj.checked != null) {
                    obj._checked = obj.checked;
                }
                _this._radioGroup = RadJav.setDefaultValue(obj._radioGroup, "");
                _this._checked = RadJav.setDefaultValue(obj._checked, false);
                return _this;
            }
            /** @method setChecked
             * Set whether or not this object is checked.
             * Theme Event: setChecked
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
             * @param {Boolean} checked Set to true if this item is checked.
             */
            Radio.prototype.setChecked = function (checked) {
                RadJav.Theme.eventSync(this.type, "setChecked", this, checked);
            };
            /** @method isChecked
             * Checks whether or not this object is checked.
             * Theme Event: isChecked
             * Is Theme Event Asynchronous: No
             * Parameters Passed to Theme Event: RadJav.GUI.GObject
             * Returned from Theme Event: Boolean
             * @return {Boolean} If set to true, this item is checked.
             */
            Radio.prototype.isChecked = function () {
                return RadJav.Theme.eventSync(this.type, "isChecked", this);
            };
            return Radio;
        }(RadJav.GUI.GObject));
        GUI.Radio = Radio;
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.Textarea
         * @extends RadJav.GUI.GObject
         * A Textarea.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Textarea = /** @class */ (function (_super) {
            __extends(Textarea, _super);
            function Textarea(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 120;
                    obj.size.y = 120;
                }
                (_this = _super.call(this, obj, text, parent) || this) || _this;
                _this.type = "RadJav.GUI.Textarea";
                return _this;
            }
            return Textarea;
        }(RadJav.GUI.GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.Textbox
         * @extends RadJav.GUI.GObject
         * A Textbox.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Textbox = /** @class */ (function (_super) {
            __extends(Textbox, _super);
            function Textbox(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 120;
                    obj.size.y = 40;
                }
                (_this = _super.call(this, obj, text, parent) || this) || _this;
                _this.type = "RadJav.GUI.Textbox";
                return _this;
            }
            return Textbox;
        }(RadJav.GUI.GObject));
        GUI.Textbox = Textbox;
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
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
        /** @class RadJav.GUI.Window
         * @extends RadJav.GUI.GObject
         * A window.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Window = /** @class */ (function (_super) {
            __extends(Window, _super);
            function Window(obj, text, parent) {
                var _this = this;
                if (obj == null)
                    obj = {};
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 500;
                    obj.size.y = 350;
                }
                (_this = _super.call(this, obj, text, parent) || this) || _this;
                _this.type = "RadJav.GUI.Window";
                return _this;
            }
            return Window;
        }(RadJav.GUI.GObject));
        GUI.Window = Window;
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
RadJav.isMinified = true;
