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
        var Model = (function () {
            function Model(object3d, obj, materials) {
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
                function Mesh(model, obj) {
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
                            jsonLoader.load(this.filePath, RadJav.keepContext(function (geometry, materials) {
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
                Mesh.Data = Data;
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
    })(C3D = RadJav.C3D || (RadJav.C3D = {}));
})(RadJav || (RadJav = {}));
