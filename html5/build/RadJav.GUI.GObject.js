var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var GObject = (function () {
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
            GObject.prototype.onBeforeChildCreated = function (obj, parent) { };
            ;
            GObject.prototype.onCreated = function (obj) { };
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
            GObject.prototype.setFont = function (font) {
                this._font = font;
                RadJav.Theme.eventSync(this.type, "setFont", this, font);
            };
            GObject.prototype.getFont = function () {
                return RadJav.Theme.eventSync(this.type, "getFont", this);
            };
            GObject.prototype.setPosition = function (x, y) {
                this._transform.setPosition(x, y);
            };
            GObject.prototype.getPosition = function () {
                return this._transform.getPosition();
            };
            GObject.prototype.getX = function () {
                return this._transform.x;
            };
            GObject.prototype.getY = function () {
                return this._transform.y;
            };
            GObject.prototype.setSize = function (width, height) {
                this._transform.setSize(width, height);
            };
            GObject.prototype.getSize = function () {
                return this._transform.getSize();
            };
            GObject.prototype.getWidth = function () {
                return this._transform.width;
            };
            GObject.prototype.getHeight = function () {
                return this._transform.height;
            };
            GObject.prototype.setText = function (text) {
                RadJav.Theme.event(this.type, "setText", this, text);
            };
            GObject.prototype.getText = function () {
                return RadJav.Theme.eventSync(this.type, "getText", this);
            };
            GObject.prototype.getParent = function () {
                return this._parent;
            };
            GObject.prototype.getHTML = function () {
                return this._html;
            };
            GObject.prototype.setVisibility = function (visible) {
                RadJav.Theme.event(this.type, "setVisibility", this, visible);
            };
            GObject.prototype.getVisibility = function () {
                return RadJav.Theme.eventSync(this.type, "getVisibility", this);
            };
            GObject.prototype.show = function () {
                this.setVisibility(true);
            };
            GObject.prototype.hide = function () {
                this.setVisibility(false);
            };
            GObject.prototype.setEnabled = function (enabled) {
                RadJav.Theme.event(this.type, "setEnabled", this, enabled);
            };
            GObject.prototype.getEnabled = function () {
                return RadJav.Theme.eventSync(this.type, "getEnabled", this);
            };
            GObject.prototype.on = function (eventName, func) {
                return RadJav.Theme.event(this.type, "on", this, eventName, func);
            };
            GObject.prototype.getHTMLDOM = function () {
                return RadJav.Theme.eventSync(this.type, "getHTMLDOM", this);
            };
            return GObject;
        }());
        GUI.GObject = GObject;
    })(GUI = RadJav.GUI || (RadJav.GUI = {}));
})(RadJav || (RadJav = {}));
