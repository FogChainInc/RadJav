/*
	MIT-LICENSE
	Copyright (c) 2015 Higher Edge Software, LLC

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

/** @class Promise
 * An object that executes when a process has completed.
 */

/** @class RadJav
 * @static
 * The main object that starts RadJav.
 */
namespace RadJav {
  /** @property {Boolean} [useEval=false]
   * Allow the use of eval.
   */
  export let useEval: boolean = true;

  /** @property {Number} [MIN_VERSION=0.05]
   * The minimum version of code that can be ran.
   */
  export let MIN_VERSION: number = 0.05;

  /** @property {Number} [VERSION=0.05]
   * The current version.
   */
  export let VERSION: number = 0.05;

  /** @property {String} [baseUrl="./RadJav"]
   * The url to the directory where RadJav is located.
   */
  export let baseUrl: string = "./RadJav/";

  /** @property {String} [themeUrl="./RadJav/themes/default"]
   * The url to the directory where the theme will be loaded.
   */
  export let themeUrl: string = "./RadJav/themes/default";

  /** @property {String} [selectedLanguage="en_us"]
   * The selected language.
   */
  export let selectedLanguage: string = "en_us";

  /** @property {RadJav.Theme} [themes=null]
   * The current theme that has been loaded.
   */
  export let themes: Theme = null;

  /** @property {Boolean} [_isInitialized=false]
   * If set to true, RadJav has been initialized.
   */
  export let _isInitialized: boolean = false;

  /** @property {String[]} [_included=[]]
   * If set to true, RadJav has been initialized.
   */
  export let _included: string[] = [];

  /** @property {String[]} [_lang=[]]
   * If set to true, RadJav has been initialized.
   */
  export let _lang: { [key: string]: string[] } = {};

  /** @property {Number} [_screenWidth=window.innerWidth]
   * The width of the window's screen.
   */
  export let _screenWidth: number = window.innerWidth;

  /** @property {Number} [_screenHeight=window.innerHeight]
   * The height of the window's screen.
   */
  export let _screenHeight: number = window.innerHeight;

  /** @property {Object} [themeUtils={}]
   * Miscellaneous theme utilities to use.
   */
  export let themeUtils: any = {};

  /** @property {Boolean} [useAjax=true]
   * If set to true, each file loaded by RadJav will use ajax.
   */
  export let useAjax: boolean = true;

  /** @property {Boolean} [isMinified=false]
   * Is set to true if RadJav has been minified.
   */
  export let isMinified: boolean = false;

  /** @method quit
   * Exit the application.
   * Available on platforms: Windows,Linux,OSX
   * @param {Number} [exitCode=0] The exit code to end the application with.
   */
  export function quit(exitCode: number = 0) {}

  /** @method exit
   * Exit the application.
   * Available on platforms: Windows,Linux,OSX
   * @param {Number} [exitCode=0] The exit code to end the application with.
   */
  export function exit(exitCode: number) {}

  /** @method include
   * Load and return a module. If the module has not already been loaded, this will create
   * an asynchronous connection to the server and include whatever javascript files it needs.
   * @param {String} path The path to the module to load.
   * @return {Promise} The promise containing the loaded module.
   */
  export function include(path: string): Promise<void> {
    var promise = null;

    if (RadJav.useAjax == true) {
      promise = RadJav._getResponse(path).then(
        RadJav.keepContext(function(response) {
          if (response != null) {
            if (response != "") {
              var func = new Function(response);
              func.apply(window, []);
            }
          }
        }, this)
      );
    } else {
      promise = new Promise(
        RadJav.keepContext(function(resolve, reject) {
          var script = document.createElement("script");
          script.type = "text/javascript";
          //script.async = false;
          //script.defer = false;
          var str = "";

          if (RadJav._isUsingInternetExplorerTheWorstWebBrowserEver() == true) {
            script.text = str;
          } else {
            var textNode = document.createTextNode(str);
            script.appendChild(textNode);
          }

          script.onreadystatechange = RadJav.keepContext(
            function(evt, script2) {
              var s = script2[0];

              if (s.readyState == null) {
                s.readyState = "complete";
              }

              if (s.readyState == "complete") {
                resolve();
              }
            },
            this,
            [script]
          );

          script.onload = script.onreadystatechange;

          script.onerror = RadJav.keepContext(function(err) {
            throw RadJav.getLangString(
              "errorWhileIncludingFile",
              err.message,
              path
            );
          }, this);

          script.src = path;

          document.documentElement.insertBefore(
            script,
            document.documentElement.firstChild
          );
        }, this)
      );
    }

    return promise;
  }

  /** @method initialize
   * Initialize RadJav.
   * @param {Object[]} [libraries=null] The libraries to include.
   * @return {Promise} The promise to execute.
   */
  export function initialize(
    libraries: { [key: string]: any }[]
  ): Promise<void> {
    var promise = new Promise(
      RadJav.keepContext(
        function(resolve, reject, args) {
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

          Promise.all(promises).then(function() {
            RadJav._isInitialized = true;

            if (RadJav.useEval == false) {
              var eval = function() {
                var msg =
                  "RadJav disables eval by default. Set RadJav.useEval = true; to enable it.";
                alert(msg);
                throw msg;
              };
            }

            resolve();
          });
        },
        RadJav,
        arguments
      )
    );

    return promise;
  }

  /** @method getStandardLibrary
   * Get the paths to the standard library.
   * @return {Object[]} The standard library.
   */
  export function getStandardLibrary(): {
    file: string;
    themeFile: boolean;
    loadFirst?: boolean;
  }[] {
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

  /** @method getGUILibrary
   * Get the paths to the gui library.
   * @return {Object[]} The gui library.
   */
  export function getGUILibrary(): {
    file: string;
    themeFile: boolean;
    loadFirst?: boolean;
  }[] {
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

  /** @method getC3DLibrary
   * Get the paths to the C3D library.
   * @return {Object[]} The C3D library.
   */
  export function getC3DLibrary(): {
    file: string;
    themeFile: boolean;
    loadFirst?: boolean;
  }[] {
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

  /** @method getNetLibrary
   * Get the paths to the Net library.
   * @return {Object[]} The Net library.
   */
  export function getNetLibrary(): { file: string; themeFile: boolean }[] {
    var includes = [{ file: "RadJav.Net.WebSocketClient", themeFile: false }];

    return includes;
  }

  /** @method includeLibraries
   * Include libraries.
   * @param {Object[]} libraries The libraries to include.
   * @return {Promise} The promise to execute when the including has completed.
   */
  export function includeLibraries(libraries): Promise<void> {
    for (var iIdx = 0; iIdx < libraries.length; iIdx++) {
      RadJav._included.push(libraries[iIdx]);
    }

    var promise = new Promise(
      RadJav.keepContext(function(resolve, reject) {
        var promises = [];

        for (var iIdx = 0; iIdx < RadJav._included.length; iIdx++) {
          var includeObj = RadJav._included[iIdx];
        }
        var promise = new Promise(
          RadJav.keepContext(function(resolve, reject) {
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
                  } else {
                    file = includeObj;
                  }
                  if (
                    _eval("if (" + file + " != null){true;}else{false;}") ==
                    false
                  ) {
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

            Promise.all(promises).then(function() {
              var promises2 = [];

              for (var iIdx = 0; iIdx < RadJav._included.length; iIdx++) {
                var includeObj = RadJav._included[iIdx];
                var file = "";
                var shouldIncludeFile = false;

                if (typeof includeObj != "string") {
                  if (typeof includeObj.file == "string") {
                    file = includeObj.file;
                  }
                } else {
                  file = includeObj;
                }
                if (
                  _eval("if (" + file + " != null){true;}else{false;}") == false
                ) {
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

              Promise.all(promises2).then(function() {
                resolve();
              });
            });
          }, RadJav)
        );
      })
    );
    return promise;
  }

  /** @method _loadLanguages
   * Load the selected language.
   * @return {Promise} The promise to execute when the language has been loaded.
   */
  export function _loadLanguages(): Promise<any> {
    var promise = new Promise(function(resolve, reject) {
      if (RadJav.useAjax == true) {
        RadJav._getResponse(
          RadJav.baseUrl + "/languages/" + RadJav.selectedLanguage + ".js"
        ).then(function(data) {
          RadJav._lang = _eval(data);
          resolve();
        });
      } else {
        resolve();
      }
    });

    return promise;
  }

  /** @method _loadTheme
   * Load a theme.
   * @param {String} themeURL The URL to the theme to load.
   */
  export function _loadTheme(themeURL: string): Promise<any> {
    var url = themeURL;

    if (url[themeURL.length - 1] == "/") {
      url = url.substr(0, themeURL.length - 1);
    }

    var promise = new Promise(function(resolve, reject) {
      if (RadJav.useAjax == true) {
        RadJav._getResponse(url + "/theme.js").then(function(data) {
          var theme = RadJav.Theme.loadTheme(url, data);
          RadJav.theme = theme;
          var promises2 = [];

          promises2.push(RadJav.theme.loadInitializationFile());
          promises2.push(RadJav.theme.loadJavascriptFiles());

          Promise.all(promises2).then(function() {
            resolve();
          });
        });
      } else {
        var theme = RadJav.Theme.loadTheme(url, RadJav.theme);
        RadJav.theme = theme;
        var promises2 = [];

        promises2.push(RadJav.theme.loadInitializationFile());
        promises2.push(RadJav.theme.loadJavascriptFiles());

        Promise.all(promises2).then(function() {
          resolve();
        });
      }
    });
    return promise;
  }

  /** @method runApplication
   * Run an application from a file or a function.
   * Available on platforms: Windows,Linux,OSX,HTML5
   * @param {String/Function} file The path to the file to execute the javascript. Or a
   * function that will immediately be executed.
   * @return {Promise} The promise that will be executed when this module has completed executing.
   */
  export function runApplication(file: string | Function): Promise<any> {
    var promise = null;

    if (typeof file == "string") {
      promise = RadJav.include(file).then(
        RadJav.keepContext(function(data) {
          var func = new _Function(data);
          func();
        }, this)
      );
    } else {
      promise = new Promise(
        RadJav.keepContext(
          function(resolve, reject, func) {
            func();
            resolve();
          },
          this,
          file
        )
      );
    }

    return promise;
  }

  /** @method runApplicationFromFile
   * Run an application from a file.
   * Available on platforms: Windows,Linux,OSX,HTML5
   * @param {String} file The path to the file to execute the javascript. Or a
   * function that will immediately be executed.
   * @return {Promise} The promise that will be executed when this module has completed executing.
   */
  export function runApplicationFromFile(file: string): Promise<void> {
    return RadJav.runApplication(file);
  }

  /** @method loadObjects
   * Load RadJav objects.
   * Available on platforms: Windows,Linux,OSX,HTML5
   * @param {String/RadJav.GUI.GObject[]/RadJav.C3D.Object3D[]} objs The objects to load.
   * @return {Promise} When loading has completed, all loaded objects will be passed into
   * the "then" function as an object with key/value pairs.
   */
  export function loadObjects(objs: any[]): Promise<{ [key: string]: any }> {
    var promise = new Promise(function(resolve, reject) {
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

      Promise.all(promises).then(function() {
        resolve(createdObjs);
      });
    });

    return promise;
  }

  /** @method _isUsingInternetExplorerTheWorstWebBrowserEver
   * Checks to see if the current web browser is using Internet Explorer.
   * @return {Boolean} Returns true if the web browser is Internet Explorer.
   */
  export function _isUsingInternetExplorerTheWorstWebBrowserEver(): boolean {
    if (navigator.appName) {
      if (navigator.appName == "Microsoft Internet Explorer") {
        return true;
      }
    }

    return false;
  }

  /** @method _getSyncResponse
   * Get a synchronous response from HTTP. This will lock whatever thread it is currently on!
   * @param {String} addr The address to connect to.
   * @return {String} The response from the HTTP server.
   */
  export function _getSyncResponse(addr: string): string {
    var request = null;
    var response = null;

    if (RadJav.useAjax == false) {
      throw RadJav.getLangString("cannotGetAjaxResponse");
    }

    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    request.onreadystatechange = RadJav.keepContext(
      function(evt, request2) {
        var req = request2[0];

        try {
          if (req.readyState == 4 && req.status == 200) {
            response = req.responseText;
          }
        } catch (ex) {}
      },
      this,
      [request]
    );

    request.open("GET", addr, false);
    request.send();

    return response;
  }

  /** @method _getResponse
   * Get an asynchronous response from HTTP.
   * @param {String} addr The address to connect to.
   * @return {String} The response from the HTTP server.
   */
  export function _getResponse(addr: String): Promise<String> {
    var promise = null;

    if (RadJav.useAjax == true) {
      promise = RadJav.Net.httpRequest(addr);
    } else {
      RadJav._lang["cannotGetAjaxResponse"] =
        "Cannot get ajax response, RadJav is set to not use Ajax.";
      throw RadJav.getLangString("cannotGetAjaxResponse");
    }

    return promise;
  }

  /** @method getWidth
   * Get the width of the current screen.
   * @return {Number} The width of the current screen.
   */
  export function getWidth(): number {
    /// @note THE - 16 IS A TEMPORARY HACK TO MATCH THE DESKTOP VERSION OF RADJAV
    return RadJav._screenWidth - 16;
  }

  /** @method getHeight
   * Get the height of the current screen.
   * @return {Number} The height of the current screen.
   */
  export function getHeight(): number {
    /// @note THE - 38 IS A TEMPORARY HACK TO MATCH THE DESKTOP VERSION OF RADJAV
    return RadJav._screenHeight - 38;
  }

  /** @method clone
   * Perform a deep copy of an object. This has been copied from jQuery.
   * Thank you jQuery!
   * Available on platforms: Windows,Linux,OSX,HTML5
   * @param {Object} obj The object to clone.
   * @return {Object} The cloned object.
   */
  export function clone(obj: { [key: string]: any }): { [key: string]: any } {
    var options,
      name,
      src,
      copy,
      copyIsArray,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;

      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    var isPlainObject = function(obj) {
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
      return (
        typeof Ctor === "function" &&
        Ctor.toString() === Ctor.toString.call(Object)
      );
    };

    var isFunction = function(obj) {
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
          if (
            deep &&
            copy &&
            (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
          ) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && Array.isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[name] = RadJav.clone(deep, clone, copy);

            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  }

  /** @method cloneObject
   * Perform a deep copy of an object.
   * Available on platforms: Windows,Linux,OSX,HTML5
   * @param {Object} obj The object to clone.
   * @return {Object} The cloned object.
   */
  export function cloneObject(obj: {
    [key: string]: any;
  }): { [key: string]: any } {
    return RadJav.clone({}, obj);
  }

  /** @method cloneArray
   * Perform a deep copy of an array.
   * Available on platforms: Windows,Linux,OSX,HTML5
   * @param {Array} obj The array to clone.
   * @return {Array} The cloned array.
   */
  export function cloneArray(obj: any[]): any[] {
    return RadJav.clone([], obj);
  }

  /** @method copyProperties
   * Copy the properties of one object to another.
   * Available on platforms: Windows,Linux,OSX,HTML5
   * @param {Object} obj1 The object to receive the properties.
   * @param {Object} obj2 The object to send the properties.
   * @param {Boolean} [overwriteExisting=true] If set to true, this will overwrite any
   * existing keys.
   * @return {Object} The completed object.
   */
  export function copyProperties(
    obj1: object,
    obj2: object,
    overwriteExisting: boolean
  ): object {
    if (overwriteExisting == null) {
      overwriteExisting = true;
    }

    for (var key in obj2) {
      if (overwriteExisting == false) {
        if (obj1[key] == null) {
          obj1[key] = obj2[key];
        }
      } else {
        obj1[key] = obj2[key];
      }
    }

    return obj1;
  }

  /** @method keepContext
   * @static
   * Keep the context the object is currently in.
   * Available on platforms: Windows,Linux,OSX,HTML5
   * @param {Function} func The document element's id.
   * @param {Object} context The object to remain in context.
   * @param {Mixed} [val=undefined] An additional value to pass to the context.
   * @return {Mixed} The returned result from the function func.
   */
  export function keepContext(func: Function, context: object, val: any): any {
    var objReturn = function() {
      var aryArgs = Array.prototype.slice.call(arguments);

      if (val != undefined) {
        aryArgs.push(val);
      }

      if (context == null) {
        return func.apply(this, aryArgs);
      } else {
        return func.apply(context, aryArgs);
      }
    };

    return objReturn;
  }

  /** @method getLangString
   * @static
   * Get a language string from the current lanuage. Additional arguments can be
   * added to this method to combine the strings together using Utils.combineString.
   * @param {String} keyword The keyword to use when getting the language string.
   * @return {String} The string associated with the keyword.
   */
  export function getLangString(keyword: string): string {
    var args = Array.prototype.slice.call(arguments);
    args.splice(0, 1);
    args.splice(0, 0, RadJav._lang[keyword]);

    return RadJav.combineString.apply(RadJav, args);
  }

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
  export function combineString(
    primaryString: string,
    ...otherStrings: string[]
  ): string {
    var strReturn = "";

    if (primaryString != null) {
      strReturn = primaryString;
    }

    for (var iIdx = 1; iIdx < arguments.length; iIdx++) {
      strReturn = strReturn.replace("%s", arguments[iIdx]);
    }

    return strReturn;
  }

  export class Theme {
    obj: { [key: string]: any };

    /** @property {String} [name=""]
     * The name of the theme.
     */
    name: string = "";

    /** @property {String} [version=""]
     * The theme's version.
     */
    version: string = "";

    /** @property {String} [author=""]
     * The theme's author.
     */
    author: string = "";

    /** @property {Date} [lastUpdated=null]
     * The theme's last update date.
     */
    lastUpdated: Date = null;

    /** @property {String} [description=""]
     * The theme's description.
     */
    description: string = "";

    /** @property {String} [url=""]
     * The url to this theme.
     */
    url: string = "";

    /** @property {String} [initFile=""]
     * The initialization file to start.
     */
    initFile: string = "";

    /** @property {String[]} [cssFiles=[]]
     * CSS files to load.
     */
    cssFiles: string[] = [];

    /** @property {Object[]}[fonts=[]]
     * Fonts to load.
     */
    fonts: object[] = [];

    constructor(obj?: {}) {
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
    loadInitializationFile(): Promise<any> {
      var promise = new Promise(
        RadJav.keepContext(function(resolve, reject) {
          var func = RadJav.keepContext(function(data) {
            try {
              if (typeof data == "string") {
                RadJav.Theme.exports = _eval(data);
              }

              if (RadJav.Theme.exports.init != null) {
                RadJav.Theme.exports.init();
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
                  promises.push(
                    RadJav._getResponse(
                      this.url + "/" + this.cssFiles[iIdx]
                    ).then(function(data) {
                      var style = document.createElement("style");
                      style.innerHTML = data;
                      document.head.appendChild(style);
                    })
                  );
                }
              }

              Promise.all(promises).then(function() {
                resolve();
              });
            } catch (ex) {
              throw RadJav.getLangString(
                "themeThrewErrorInFile",
                this.name,
                this.initFile,
                ex.message
              );
            }
          }, this);

          if (RadJav.useAjax == true) {
            RadJav._getResponse(this.url + "/" + this.initFile).then(func);
          } else {
            func(RadJav.Theme.exports);
            resolve();
          }
        }, this)
      );

      return promise;
    }

    /** @method loadJavascriptFiles
     * Load the javascript files for this theme.
     * @return {Promise} Executes when the loading has completed.
     */
    loadJavascriptFiles(): Promise<any> {
      var promise = new Promise(
        RadJav.keepContext(function(resolve, reject) {
          var files = [];

          for (var iIdx = 0; iIdx < RadJav._included.length; iIdx++) {
            var includeObj = RadJav._included[iIdx];

            if (typeof includeObj != "string") {
              if (typeof includeObj.themeFile == "string") {
                files.push(includeObj.themeFile);
              } else {
                if (includeObj.themeFile == true) {
                  files.push(includeObj.file);
                } else {
                  continue;
                }
              }
            }
          }

          for (var iIdx = 0; iIdx < files.length; iIdx++) {
            var file = files[iIdx];

            (function(theme, url, tfile, index, numFiles) {
              try {
                if (RadJav.Theme.themeObjects[tfile] == null) {
                  RadJav.Theme.themeObjects[tfile] = new Object();
                }

                if (RadJav.useAjax == true) {
                  RadJav._getResponse(url + "/" + tfile + ".js").then(function(
                    data
                  ) {
                    try {
                      RadJav.Theme.themeObjects[tfile] = _eval(data);
                    } catch (ex) {
                      throw RadJav.getLangString(
                        "themeThrewErrorInFile",
                        theme.name,
                        tfile + ".js",
                        ex.message
                      );
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
                } else {
                  resolve();
                }
              } catch (ex) {}
            })(this, this.url, file, iIdx, files.length);
          }
        }, this)
      );

      return promise;
    }

    /** @method event
     * Execute a theme event.
     * @param {String} file The file associated with the event.
     * @param {String} event The name of the event to trigger.
     * @return {Promise} The promise to execute when this event is completed.
     */
    event(file: string, event: string): Promise<any> {
      var args = new Array();

      for (var iIdx = 2; iIdx < arguments.length; iIdx++) {
        args.push(arguments[iIdx]);
      }
      try {
        if (RadJav.Theme.themeObjects[file] != null) {
          if (RadJav.Theme.themeObjects[file][event] != null) {
            return RadJav.Theme.themeObjects[file][event].apply(
              RadJav.Theme.themeObjects[file],
              args
            );
          } else {
            if (file.indexOf("GUI") > -1) {
              var tempfile = "RadJav.GUI.GObject";

              if (RadJav.Theme.themeObjects[tempfile][event] != null) {
                return RadJav.Theme.themeObjects[tempfile][event].apply(
                  RadJav.Theme.themeObjects[tempfile],
                  args
                );
              }
            }
          }
        }
      } catch (ex) {
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
    }

    /** @method eventSync
     * Execute a theme event synchronously.
     * @param {String} file The file associated with the event.
     * @param {String} event The name of the event to trigger.
     * @return {Mixed} The data returned from the event.
     */
    eventSync(file: string, event: string): any {
      var args = new Array();
      var result = null;

      for (var iIdx = 2; iIdx < arguments.length; iIdx++) {
        args.push(arguments[iIdx]);
      }

      try {
        if (RadJav.Theme.themeObjects[file] != null) {
          if (RadJav.Theme.themeObjects[file][event] != null) {
            result = RadJav.Theme.themeObjects[file][event].apply(
              RadJav.Theme.themeObjects[file],
              args
            );
          } else {
            if (file.indexOf("GUI") > -1) {
              var tempfile = "RadJav.GUI.GObject";

              if (RadJav.Theme.themeObjects[tempfile][event] != null) {
                result = RadJav.Theme.themeObjects[tempfile][event].apply(
                  RadJav.Theme.themeObjects[tempfile],
                  args
                );
              }
            }
          }
        }
      } catch (ex) {
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
    }

    /** @property exports
     * @static
     * The functions and properties associated with this theme.
     */
    exports(): any {}

    /** @property themeObjects
     * @static
     * The theme objects associated with this theme.
     */
    themeObjects(): any {}

    /** @method loadTheme
     * @static
     * Load the theme.
     * @param {String} url The URL to this theme.
     * @param {String} data The JSON to parse and get the data from.
     */
    loadTheme(url: string, data: string): any {
      var theme = null;

      try {
        var obj = _eval(data);
        theme = new RadJav.Theme(obj);
        theme.url = url;
      } catch (ex) {
        console.error(ex.message);
      }

      return theme;
    }
  }
}
