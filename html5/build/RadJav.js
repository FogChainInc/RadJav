Math.inv180 = 1 / 180;
Math.invPI = 1 / this.PI;
Math.map = function (value, start1, stop1, start2, stop2) {
    return (start2 + (stop2 - start2) * (value - start1) / (stop1 - start1));
};
Math.sinh = function (arg) {
    return (this.exp(arg) - this.exp(-arg)) / 2;
};
Math.cosh = function (arg) {
    return (this.exp(arg) + Math.exp(-arg)) / 2;
};
Math.tanh = function (arg) {
    return (this.exp(arg) - this.exp(-arg)) / (this.exp(arg) + this.exp(-arg));
};
Math.log10 = function (arg) {
    return this.log(arg) / 2.302585092994046;
};
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
Math.degreesToRadians = function (degrees) {
    return (degrees * (this.PI * this.inv180));
};
Math.radiansToDegrees = function (radians) {
    return (radians * (180 * this.invPI));
};
Math.randomRange = function (min, max) {
    return (this.floor(this.random() * ((max - min) + 1)) + min);
};
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
var RadJavString = (function (_super) {
    __extends(RadJavString, _super);
    function RadJavString() {
        return _super.call(this) || this;
    }
    RadJavString.prototype.insertAt = function (startPos, str) {
        var finalStr = "";
        finalStr += this.substr(0, startPos);
        finalStr += str;
        finalStr += this.substr(startPos + 1);
        return finalStr;
    };
    RadJavString.prototype.removeAt = function (startPos, length) {
        var str = this;
        if (length < 0)
            length = str.length;
        var finalStr = str.substr(0, startPos);
        finalStr += str.substr(startPos + length);
        return finalStr;
    };
    RadJavString.prototype.replaceAll = function (str, replacement) {
        return this.replace(new RegExp(str, "g"), replacement);
    };
    return RadJavString;
}(String));
var RadJav;
(function (RadJav) {
    var Circle = (function () {
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
var RadJav;
(function (RadJav) {
    var Color = (function () {
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
        Color.prototype.toHTMLColor = function () {
            var hex = this.toHex();
            hex = hex.substring(2);
            return "#" + hex;
        };
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
;
var RadJav;
(function (RadJav) {
    var Font = (function () {
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
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var IO = (function () {
            function IO() {
            }
            IO.isDir = function (path) { };
            IO.isFile = function (path) { };
            IO.mkdir = function (path) { };
            IO.deleteFile = function (path) { };
            return IO;
        }());
        (function (IO) {
            var SerialComm = (function () {
                function SerialComm() {
                }
                SerialComm.prototype.getPort = function () { };
                SerialComm.prototype.getBaud = function () { };
                SerialComm.prototype.getByteSize = function () { };
                SerialComm.prototype.getStopBits = function () { };
                SerialComm.prototype.getParity = function () { };
                SerialComm.prototype.open = function () { };
                SerialComm.prototype.isOpen = function () { };
                SerialComm.prototype.read = function (bufferSize) { };
                SerialComm.prototype.write = function (buffer, bufferSize) { };
                SerialComm.prototype.close = function () { };
                return SerialComm;
            }());
            IO.SerialComm = SerialComm;
            var TextFile = (function () {
                function TextFile() {
                }
                TextFile.writeTextToFile = function (path, content) { };
                TextFile.readEntireFile = function (path) { };
                return TextFile;
            }());
        })(IO = GUI.IO || (GUI.IO = {}));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var Net;
    (function (Net) {
        var WebSocketClient = (function () {
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
            }
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
            WebSocketClient.prototype.send = function (message) {
                this._socket.send(message);
            };
            WebSocketClient.prototype.on = function (eventName, func) {
                this._events[eventName] = func;
            };
            return WebSocketClient;
        }());
        Net.WebSocketClient = WebSocketClient;
    })(Net || (Net = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var Quaternion = (function () {
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
var RadJav;
(function (RadJav) {
    var Rectangle = (function () {
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
        Rectangle.prototype.getPosition = function () {
            return new RadJav.Vector2(this.x, this.y);
        };
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
        Rectangle.prototype.getSize = function () {
            return new RadJav.Vector2(this.width, this.height);
        };
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
        Rectangle.prototype.xInside = function (x) {
            if (x > this.right)
                return false;
            if (x < this.left)
                return false;
            return true;
        };
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
var RadJav;
(function (RadJav) {
    var Vector2 = (function () {
        function Vector2(x, y) {
            if (typeof x == "object") {
                var temp = x;
                x = temp.x;
                y = temp.y;
            }
            if (x == null)
                x = 0;
            if (y == null)
                y = 0;
            this.x = x;
            this.y = y;
        }
        Vector2.prototype.toString = function () {
            return this.x + "," + this.y;
        };
        Vector2.prototype.setX = function (n) {
            this.x = n;
        };
        Vector2.prototype.setY = function (n) {
            this.y = n;
        };
        Vector2.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
        };
        Vector2.prototype.add = function (x, y) {
            this.x += x;
            this.y += y;
        };
        Vector2.prototype.sub = function (subVector2) {
            this.x -= subVector2.x;
            this.y -= subVector2.y;
        };
        Vector2.prototype.mult = function (n) {
            this.x *= n;
            this.y *= n;
        };
        Vector2.prototype.divide = function (vector2) {
            var result = new RadJav.Vector2();
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
        Vector2.prototype.dot = function (dotVector2) {
            return this.x * dotVector2.x + this.y * dotVector2.y;
        };
        Vector2.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Vector2.prototype.normalize = function () {
            return this.divide(this.length());
        };
        Vector2.prototype.parseVector2 = function (str) {
            var obj = new RadJav.Vector2();
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
var RadJav;
(function (RadJav) {
    var Vector3 = (function () {
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
                var temp = x;
                x = temp.x;
                y = temp.y;
                z = temp.z;
            }
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Vector3.prototype.toString = function () {
            return this.x + "," + this.y + "," + this.z;
        };
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
        Vector3.prototype.dot = function (vector3) {
            var dReturn = this.x * vector3.x + this.y * vector3.y + this.z * vector3.z;
            return dReturn;
        };
        Vector3.prototype.cross = function (vector3) {
            var result = new RadJav.Vector3();
            result.x = this.y * vector3.z - this.z * vector3.y;
            result.y = this.z * vector3.x - this.x * vector3.z;
            result.z = this.x * vector3.y - this.y * vector3.x;
            return result;
        };
        Vector3.prototype.length = function () {
            var dReturn = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            return dReturn;
        };
        Vector3.prototype.normalize = function () {
            var dReturn = this.divide(this.length());
            return dReturn;
        };
        Vector3.prototype.squaredLength = function () {
            var dReturn = this.x * this.x + this.y * this.y + this.z * this.z;
            return dReturn;
        };
        Vector3.prototype.absDotProduct = function (vector3) {
            var dReturn = Math.abs(this.dot(vector3));
            return dReturn;
        };
        Vector3.prototype.angleBetween = function (vector3) {
            var dTheta = this.dot(vector3) / (this.length() * vector3.length());
            var dReturn = Math.acos(Math.clamp(dTheta, -1, 1));
            return dReturn;
        };
        Vector3.prototype.distance = function (vector3) {
            var dX = this.x - vector3.x;
            var dY = this.y - vector3.y;
            var dZ = this.z - vector3.z;
            var dReturn = Math.sqrt(dX * dX + dY * dY + dZ * dZ);
            return dReturn;
        };
        return Vector3;
    }());
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var Vector4 = (function () {
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
                var temp = x;
                x = temp.x;
                y = temp.y;
                z = temp.z;
            }
            if (x instanceof RadJav.Vector4) {
                var temp = x;
                x = temp.x;
                y = temp.y;
                z = temp.z;
                w = temp.w;
            }
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        Vector4.prototype.toString = function () {
            return this.x + "," + this.y + "," + this.z + "," + this.w;
        };
        return Vector4;
    }());
})(RadJav || (RadJav = {}));
;
var RadJav;
(function (RadJav) {
    var C3D;
    (function (C3D) {
        var Object3D = (function () {
            function Object3D(canvas3d, obj, parent) {
                this.name = "";
                this.type = "";
                this._visible = true;
                this._parent = null;
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
            Object3D.prototype.create = function () {
                return null;
            };
            Object3D.prototype.destroy = function () { };
            Object3D.prototype.getParent = function () {
                return this._parent;
            };
            Object3D.prototype.getTransform = function () {
                return this._transform;
            };
            Object3D.prototype.setPosition = function (x, y, z) {
                return this._transform.setPosition(x, y, z);
            };
            Object3D.prototype.getPosition = function () {
                return this._transform.getPosition();
            };
            Object3D.prototype.setVisibility = function (visible) {
                RadJav.theme.event(this.type, "setVisibility", this, visible);
            };
            Object3D.prototype.getVisibility = function () {
                return RadJav.theme.eventSync(this.type, "getVisibility", this);
            };
            Object3D.prototype.show = function () {
                this.setVisibility(true);
            };
            Object3D.prototype.hide = function () {
                this.setVisibility(false);
            };
            Object3D.prototype.on = function (eventName, func) { };
            return Object3D;
        }());
        C3D.Object3D = Object3D;
    })(C3D || (C3D = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var C3D;
    (function (C3D) {
        var Camera = (function (_super) {
            __extends(Camera, _super);
            function Camera(canvas3d, obj, parent) {
                var _this = _super.call(this, canvas3d, obj, parent) || this;
                _this._perspective = true;
                _this._perspective = RadJav.setDefaultValue(obj._perspective, true);
                _this._aspectRatio = RadJav.setDefaultValue(obj._aspectRatio, parseFloat(canvas3d.getWidth()) / parseFloat(canvas3d.getHeight()));
                _this._fov = RadJav.setDefaultValue(obj._fov, 90 / _this._aspectRatio);
                _this._nearClip = RadJav.setDefaultValue(obj._nearClip, 1.0);
                _this._farClip = RadJav.setDefaultValue(obj._farClip, 10000000000.0);
                _this._rayCaster = RadJav.setDefaultValue(obj._rayCaster, null);
                return _this;
            }
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
        }(Object3D));
        C3D.Camera = Camera;
    })(C3D || (C3D = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var C3D;
    (function (C3D) {
        var Entity = (function (_super) {
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
            Entity.prototype.setModel = function (newModel) {
                this._model = newModel;
            };
            Entity.prototype.getModel = function () {
                return this._model;
            };
            return Entity;
        }(Object3D));
        C3D.Entity = Entity;
    })(C3D || (C3D = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var C3D;
    (function (C3D) {
        var Material = (function () {
            function Material(canvas3d, obj, parent, model) {
                this._name = "";
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
            Material.prototype.getName = function () {
                return this._name;
            };
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
    })(C3D || (C3D = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var C3D;
    (function (C3D) {
        var Model = (function () {
            function Model(canvas3d, obj, parent, model) {
                this._name = '';
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
            Model.prototype._setName = function (name) {
                this._name = name;
            };
            Model.prototype.getName = function () {
                return this._name;
            };
            return Model;
        }());
        C3D.Model = Model;
        (function (Model) {
            var Mesh = (function () {
                function Mesh(mode, obj) {
                    this._name = '';
                    this.filePath = '';
                    this.type = 'json';
                    this.data = null;
                    this._mesh = null;
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
            (function (Mesh) {
                var Data = (function () {
                    function Data(mesh, obj) {
                        this.type = 'mesh';
                        this.radius = 100;
                        this.width = 0;
                        this.height = 0;
                        this.depth = 0;
                        this.widthSegments = 1;
                        this.heightSegments = 1;
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
            })(Mesh = Model.Mesh || (Model.Mesh = {}));
        })(Model = C3D.Model || (C3D.Model = {}));
        var Sphere = (function (_super) {
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
    })(C3D || (C3D = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var C3D;
    (function (C3D) {
        var Transform = (function () {
            function Transform(object3d, obj) {
                if (object3d == null) {
                    throw Lang.object3dNotIncluded;
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
                    this._sceneNode = this._object3d._canvas3D._sceneManager;
                }
            }
            Transform.prototype.addChild = function (child) {
                if (this._sceneNode != null) {
                    this._sceneNode.add(child._obj3d);
                    this._movable = child._obj3d;
                }
            };
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
            Transform.prototype.getPosition = function () {
                var pos = this._movable.position;
                var obj = new RadJav.Vector3(pos);
                return obj;
            };
            return Transform;
        }());
        C3D.Transform = Transform;
    })(C3D || (C3D = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var Button = (function (_super) {
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
        }(GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var Canvas3D = (function (_super) {
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
                var promise = RadJav.theme.event(this.type, "create", this).then(RadJav.keepContext(function (html) {
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
            Canvas3D.prototype._setupDefaultCamera = function () {
                var camera = new RadJav.C3D.Camera(this, "camera");
                return camera.create().then(RadJav.keepContext(function (cam) {
                    this._currentCamera = cam;
                }, this));
            };
            Canvas3D.prototype._setupDefaultSceneManager = function () {
                this._sceneManager = new THREE.Scene();
            };
            Canvas3D.prototype.setAmbientLightColor = function (colour) {
                this._sceneManager.add(new THREE.AmbientLight(colour.toHexInt()));
            };
            Canvas3D.prototype.createEntity = function (name, parent, model) {
                var entity = new RadJav.C3D.Entity(this, name, parent, model);
                return entity.create();
            };
            Canvas3D.prototype.addModel = function (model) {
                this._models[model._name] = model;
            };
            Canvas3D.prototype.addMaterial = function (material) {
                this._materials[material._name] = material;
            };
            Canvas3D.prototype.getNumModels = function () {
                return Object.keys(this._models).length;
            };
            Canvas3D.prototype.getNumMaterials = function () {
                return Object.keys(this._materials).length;
            };
            Canvas3D.prototype.render = function () {
                requestAnimationFrame(RadJav.keepContext(this.render, this));
                this._renderer.render(this._sceneManager, this._currentCamera._obj3d);
            };
            Canvas3D.prototype.createWorld = function (colour) {
                this._sceneManager.add(new THREE.AmbientLight(colour.toHexInt()));
            };
            Canvas3D.prototype.setWorld = function (colour) {
                this._sceneManager.add(new THREE.AmbientLight(colour.toHexInt()));
            };
            return Canvas3D;
        }(GObject));
        (function (Canvas3D) {
            var RendererTypes;
            (function (RendererTypes) {
                RendererTypes[RendererTypes["AnyAvailable"] = 1] = "AnyAvailable";
                RendererTypes[RendererTypes["WebGL"] = 2] = "WebGL";
                RendererTypes[RendererTypes["Context2D"] = 3] = "Context2D";
            })(RendererTypes = Canvas3D.RendererTypes || (Canvas3D.RendererTypes = {}));
        })(Canvas3D = GUI.Canvas3D || (GUI.Canvas3D = {}));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var Checkbox = (function (_super) {
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
                _this._checked = RadJav.setDefaultValue(obj._checked, false);
                return _this;
            }
            Checkbox.prototype.setChecked = function (checked) {
                RadJav.theme.eventSync(this.type, "setChecked", this, checked);
            };
            Checkbox.prototype.isChecked = function () {
                return RadJav.theme.eventSync(this.type, "isChecked", this);
            };
            return Checkbox;
        }(GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var Combobox = (function (_super) {
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
            Combobox.prototype.addItem = function (item) {
                if (typeof item == "string") {
                    item = { text: item };
                }
                RadJav.theme.eventSync(this.type, "addItem", this, item);
            };
            Combobox.prototype.setItems = function (items) {
                RadJav.theme.eventSync(this.type, "setItems", this, items);
            };
            Combobox.prototype.deleteItem = function (index) {
                RadJav.theme.eventSync(this.type, "deleteItem", this, index);
            };
            Combobox.prototype.getItem = function (index) {
                return RadJav.theme.eventSync(this.type, "getItem", this, index);
            };
            Combobox.prototype.getItems = function () {
                return RadJav.theme.eventSync(this.type, "getItems", this);
            };
            Combobox.prototype.getNumItems = function () {
                return RadJav.theme.eventSync(this.type, "getNumItems", this);
            };
            Combobox.prototype.clear = function () {
                return RadJav.theme.eventSync(this.type, "clear", this);
            };
            Combobox.prototype.setSelectedItemIndex = function (index) {
                RadJav.theme.eventSync(this.type, "setSelectedItemIndex", this, index);
            };
            Combobox.prototype.getSelectedItemIndex = function () {
                return RadJav.theme.eventSync(this.type, "getSelectedItemIndex", this);
            };
            return Combobox;
        }(GObject));
        (function (Combobox) {
            var Item = (function () {
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
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var Container = (function (_super) {
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
        }(GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var HTMLElement = (function (_super) {
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
        }(GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var Image = (function (_super) {
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
            Image.prototype.setImage = function (image) {
                RadJav.theme.event(this.type, "setImage", this, image);
            };
            return Image;
        }(GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var Label = (function (_super) {
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
        }(GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var Label = (function (_super) {
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
            Label.prototype.addColumn = function (column, width, key) {
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
                RadJav.theme.eventSync(this.type, "addColumn", this, tempColumn);
            };
            Label.prototype.setColumns = function (columns) {
                this._columns = columns;
                RadJav.theme.eventSync(this.type, "setColumns", this, columns);
            };
            Label.prototype.addRow = function (row, hiddenValue) {
                RadJav.theme.eventSync(this.type, "addRow", this, row, hiddenValue);
            };
            Label.prototype.setRows = function (rows, hiddenRows) {
                RadJav.theme.eventSync(this.type, "setRows", this, rows, hiddenRows);
            };
            Label.prototype.getSelectedRows = function () {
                return RadJav.theme.eventSync(this.type, "getSelectedRows", this);
            };
            Label.prototype.deleteRows = function (selection) {
                return RadJav.theme.eventSync(this.type, "deleteRows", this, selection);
            };
            return Label;
        }(GObject));
        var Row = (function () {
            function Row(obj) {
                if (obj == null) {
                    obj = {};
                }
                this.items = RadJav.setDefaultValue(obj.items, []);
            }
            Row.prototype.addItem = function (item) {
                if (typeof item != "object") {
                    item = new RadJav.GUI.List.Item({ text: item });
                }
                this.items.push(item);
            };
            return Row;
        }());
        var Item = (function () {
            function Item(obj) {
                if (obj == null) {
                    obj = {};
                }
                this.name = RadJav.setDefaultValue(obj.name, "");
                this.text = RadJav.setDefaultValue(obj.text, "");
            }
            return Item;
        }());
        var Column = (function () {
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
        var Selection = (function () {
            function Selection(obj) {
                if (obj == null) {
                    obj = {};
                }
                this._html = RadJav.setDefaultValue(obj._html, null);
                this._appObj = RadJav.setDefaultValue(obj._appObj, null);
            }
            return Selection;
        }());
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var MenuBar = (function (_super) {
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
            MenuBar.prototype.setHTMLElement = function (element) {
                var elm = element;
                if (typeof element == "string") {
                    elm = new RadJav.GUI.HTMLElement(this.name);
                }
                this._htmlElement = elm;
            };
            return MenuBar;
        }(GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var MenuItem = (function (_super) {
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
        }(GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var Radio = (function (_super) {
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
            Radio.prototype.setChecked = function (checked) {
                RadJav.theme.eventSync(this.type, "setChecked", this, checked);
            };
            Radio.prototype.isChecked = function () {
                return RadJav.theme.eventSync(this.type, "isChecked", this);
            };
            return Radio;
        }(GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var Textarea = (function (_super) {
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
        }(GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var Textbox = (function (_super) {
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
        }(GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var Window = (function (_super) {
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
        }(GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
RadJav.isMinified = true;
