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
