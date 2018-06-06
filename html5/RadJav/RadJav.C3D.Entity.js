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
            Entity.Types = {
                None: 0,
                Cube: 1,
                Sphere: 2,
                Plane: 3,
                Camera: 4,
                Light: 5
            };
            return Entity;
        }(RadJav.C3D.Object3D));
        C3D.Entity = Entity;
    })(C3D = RadJav.C3D || (RadJav.C3D = {}));
})(RadJav || (RadJav = {}));
