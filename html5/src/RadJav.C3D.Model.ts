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

namespace RadJav {
	export namespace C3D {
	/** @class RadJav.C3D.Model
	* A 3d Model.
	* Available on platforms: Windows,Linux,OSX,HTML5
	*/
		export class Model {
			constructor(object3d, obj, materials) {
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

			/** @property {RadJav.C3D.Object3D} [_object3d=object3d]
			* @protected
			* The 3d object that is associated with this transform.
			*/
			protected _object3d: RadJav.C3D.Object3D;

			/** @property {String} [_name=""]
			* @protected
			* The name.
			*/
			protected _name: string = '';

			/** @property {RadJav.C3D.Model.Mesh} [mesh=null]
			* @protected
			* The model mesh to load.
			*/
			protected mesh: Model.Mesh;

			/** @property {RadJav.C3D.Material[]} [materials=[]]
			* The materials used in this model.
			*/
			protected materials: RadJav.C3D.Material[] = [];

			/** @method create
			* Create the model.
			* @return {Promise} The promise to execute when completed.
			*/
			public create(): Promise<Model> {
				var promise = null;
		
				if (this.mesh != null) {
					promise = this.mesh.create ().then (RadJav.keepContext (function (mesh){
						this._object3d._canvas3D.addModel (this);
		
						return (this);
					}, this));
				}
		
				return (promise);
			};

			/** @method _setName
			* @protected
			* Set the name of the model.
			* @param {String} name The name of the model.
			*/
			protected _setName(name: string): void {
				this._name = name;
			}

			/** @method getName
			* Get the name of the model.
			* @return {String} The name of the model.
			*/
			getName(): string {
				return this._name;
			}
		}

		export namespace Model {
			/** @class RadJav.C3D.Model.Mesh
			* Information about the 3d Model mesh to load.
			* Available on platforms: Windows,Linux,OSX,HTML5
			*/
			export class Mesh {

				constructor(model, obj) {
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

				/** @property {String} [_name=""]
				* The name of this mesh.
				*/
				_name: String = '';

				/** @property {String} [filePath=""]
				* The path to the file to load.
				*/
				filePath: String = '';

				/** @property {String} [type="json"]
				* @protected
				* The type of model to load.
				*/
				type: String = 'json';

				/** @property {RadJav.C3D.Model.Mesh.Data} [data=null]
				* @protected
				* The mesh data.
				*/
				data: Mesh.Data | object= null;

				/** @property {Object} [_mesh=null]
				* @protected
				* The 3d engine mesh associated with the model.
				*/
				_mesh: Object = null;
		
				/** @property {RadJav.C3D.Model} [model=null]
				* @protected
				* The model that contains this mesh.
				*/
				model: Model = null;

				/** @method getName
				* Get the name of this object.
				* @return {String} The name.
				*/
				getName()
				{
					return this._name;
				}

				create() 	{
					var promise = new Promise (RadJav.keepContext (function (resolve, reject) {
						if (this.type == "json") {
							var jsonLoader = new THREE.JSONLoader();
							jsonLoader.load(this.filePath, RadJav.keepContext (function (geometry, materials){
								var meshMaterial = new THREE.MeshFaceMaterial(materials);
								this._mesh = new THREE.Mesh(geometry, meshMaterial);
								this._mesh.radJavModel = this;
								this._mesh.name = this._name;
								RadJav.C3D.Material._createMaterials(this.model._object3d._canvas3D, materials);
								resolve (this);
							}, this));
						}
			
						if (this.type == "primitive") {
							if (this.data.type == "sphere") {
								var radius = this.data.radius;
		
								if (radius == null) {
									radius = 100;
								}
								
								var geometry = new THREE.SphereGeometry (radius);
								var meshMaterial = null;
								
								if (this.model.materials.length > 0) {
									meshMaterial = this.model.materials[0]._material;
								}
			
								if (meshMaterial == null) {
									meshMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
								}
			
								this._mesh = new THREE.Mesh(geometry, meshMaterial);
								this._mesh.name = this._name;
								RadJav.C3D.Material._createMaterials(this.model._object3d._canvas3D, meshMaterial);
							}
			
							resolve (this);
						}
					}, this));
			
					return (promise);
				}
			
			}

			export namespace Mesh {
				/** @class RadJav.C3D.Model.Mesh.Data
				* 3d Model mesh data.
				* Available on platforms: Windows,Linux,OSX,HTML5
				*/
				export class Data {
					constructor(mesh, obj) {
						this.type = RadJav.setDefaultValue(obj.type, "mesh");
						this.radius = RadJav.setDefaultValue(obj.radius, 100);
						this.width = RadJav.setDefaultValue(obj.width, 0);
						this.height = RadJav.setDefaultValue(obj.height, 0);
						this.depth = RadJav.setDefaultValue(obj.depth, 0);
						this.widthSegments = RadJav.setDefaultValue(obj.widthSegments, 1);
						this.heightSegments = RadJav.setDefaultValue(obj.heightSegments, 1);
						this.depthSegments = RadJav.setDefaultValue(obj.depthSegments, 1);
					}

					/** @property {String} [type="mesh"]
					* @protected
					* The type of mesh data. Can be: 
					* - mesh
					* - sphere
					* - cube
					* - plane
					*/
					type: 'mesh'|'sphere'|'cube'|'plane' = 'mesh';

					/** @property {Number} [radius=100]
					* @protected
					* The radius of the sphere.
					*/
					radius: Number = 100;

					/** @property {Number} [width=0]
					* @protected
					* The width of the mesh.
					*/
					width: Number = 0;

					/** @property {Number} [height=0]
					* @protected
					* The height of the mesh.
					*/
					height: Number = 0;

					/** @property {Number} [depth=0]
					* @protected
					* The depth of the mesh.
					*/
					depth: Number = 0;

					/** @property {Number} [widthSegments=1]
					* @protected
					* The width segments in the cube.
					*/
					widthSegments: Number = 1;

					/** @property {Number} [heightSegments=1]
					* @protected
					* The height segments in the cube.
					*/
					heightSegments: Number = 1;

					/** @property {Number} [depthSegments=1]
					* @protected
					* The depth segments in the cube.
					*/
					depthSegments: Number = 1;
				}
			}
		}

			/** @class RadJav.C3D.Model.Sphere
			* Create a sphere.
			* Available on platforms: Windows,Linux,OSX,HTML5
			*/
			class Sphere extends Model {
				constructor(object3d, obj, materials, radius) {
					super(object3d, obj, materials);
					this.mesh = new RadJav.C3D.Model.Mesh(this, this._name);
					this.mesh.type = "primitive";
					this.mesh.data = {
						type: "sphere", 
						radius: radius
					};
				}
			}
		}
	}