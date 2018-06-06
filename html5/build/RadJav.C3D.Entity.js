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
        }(RadJav.C3D.Object3D));
        C3D.Entity = Entity;
    })(C3D = RadJav.C3D || (RadJav.C3D = {}));
})(RadJav || (RadJav = {}));
