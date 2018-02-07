/*
	MIT-LICENSE
	Copyright (c) 2017 Higher Edge Software, LLC

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

/** @class RadJav.C3D.Model
* A 3d Model.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.C3D.Model = (function ()
{
	function Model (object3d, obj, materials)
	{
		if (obj == null)
			obj = {};

		if (obj.name != null)
			obj._name = obj.name;

		if (materials != null)
			obj.materials = materials;

		/** @property {RadJav.C3D.Object3D} [_object3d=object3d]
		* @protected
		* The 3d object that is associated with this transform.
		*/
		this._object3d = object3d;
		/** @property {String} [_name=""]
		* @protected
		* The name.
		*/
		this._name = RadJav.setDefaultValue (obj._name, "");
		/** @property {RadJav.C3D.Model.Mesh} [mesh=null]
		* @protected
		* The model mesh to load.
		*/
		this.mesh = RadJav.setDefaultValue (obj.mesh, null);
		/** @property {RadJav.C3D.Material[]} [materials=[]]
		* The materials used in this model.
		*/
		this.materials = RadJav.setDefaultValue (obj.materials, []);
	}

	return (Model);
} ());

/** @class RadJav.C3D.Model.Mesh
* Information about the 3d Model mesh to load.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.C3D.Model.Mesh = (function ()
{
	function Mesh (model, obj)
	{
		if (obj == null)
			obj = {};

		if (typeof (obj) == "string")
		{
			var tempObj = obj;
			obj = {};
			obj.name = tempObj;
		}

		if (obj.name != null)
			obj._name = obj.name;

		/** @property {String} [_name=""]
		* The name of this mesh.
		*/
		this._name = RadJav.setDefaultValue (obj._name, "");
		/** @property {String} [filePath=""]
		* The path to the file to load.
		*/
		this.filePath = RadJav.setDefaultValue (obj.filePath, "");
		/** @property {String} [type="json"]
		* @protected
		* The type of model to load.
		*/
		this.type = RadJav.setDefaultValue (obj.type, "json");
		/** @property {RadJav.C3D.Model.Mesh.Data} [data=null]
		* @protected
		* The mesh data.
		*/
		this.data = RadJav.setDefaultValue (obj.data, null);
		/** @property {Object} [_mesh=null]
		* @protected
		* The 3d engine mesh associated with the model.
		*/
		this._mesh = RadJav.setDefaultValue (obj._mesh, null);
		/** @property {RadJav.C3D.Model} [model=null]
		* @protected
		* The model that contains this mesh.
		*/
		this.model = model;
	}

	return (Mesh);
} ());

/** @class RadJav.C3D.Model.Mesh.Data
* 3d Model mesh data.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.C3D.Model.Mesh.Data = (function ()
{
	function Data (mesh, obj)
	{
		/** @property {String} [type="mesh"]
		* @protected
		* The type of mesh data. Can be: 
		* - mesh
		* - sphere
		* - cube
		* - plane
		*/
		this.type = RadJav.setDefaultValue (obj.type, "mesh");
		/** @property {Number} [radius=100]
		* @protected
		* The radius of the sphere.
		*/
		this.radius = RadJav.setDefaultValue (obj.radius, 100);
		/** @property {Number} [width=0]
		* @protected
		* The width of the mesh.
		*/
		this.width = RadJav.setDefaultValue (obj.width, 0);
		/** @property {Number} [height=0]
		* @protected
		* The height of the mesh.
		*/
		this.height = RadJav.setDefaultValue (obj.height, 0);
		/** @property {Number} [depth=0]
		* @protected
		* The depth of the mesh.
		*/
		this.depth = RadJav.setDefaultValue (obj.depth, 0);
		/** @property {Number} [widthSegments=1]
		* @protected
		* The width segments in the cube.
		*/
		this.widthSegments = RadJav.setDefaultValue (obj.widthSegments, 1);
		/** @property {Number} [heightSegments=1]
		* @protected
		* The height segments in the cube.
		*/
		this.heightSegments = RadJav.setDefaultValue (obj.heightSegments, 1);
		/** @property {Number} [depthSegments=1]
		* @protected
		* The depth segments in the cube.
		*/
		this.depthSegments = RadJav.setDefaultValue (obj.depthSegments, 1);
	}

	return (Data);
} ());

/** @class RadJav.C3D.Model.Sphere
* Create a sphere.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.C3D.Model.Sphere = (function (_super)
{
	__extends(Sphere, _super);

	function Sphere (object3d, obj, materials, radius)
	{
		var _this = _super.call(this, object3d, obj, materials) || this;
		_this.mesh = new RadJav.C3D.Model.Mesh (_this, _this._name);
		_this.mesh.type = "primitive";
		_this.mesh.data = {
					type: "sphere", 
					radius: radius
				};

		return (_this);
	}

	return (Sphere);
} (RadJav.C3D.Model));

