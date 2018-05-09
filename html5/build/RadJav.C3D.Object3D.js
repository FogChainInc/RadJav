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
