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
