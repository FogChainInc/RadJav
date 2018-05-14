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
