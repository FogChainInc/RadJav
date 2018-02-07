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

declare namespace RadJav.C3D
{
	/** @class RadJav.C3D.Model
	* A 3d Model.
	* Available on platforms: Windows,Linux,OSX,HTML5
	*/
	class Model
	{
		constructor (canvas3d, obj, parent, model);

		/** @property {RadJav.C3D.Object3D} [_object3d=object3d]
		* @protected
		* The 3d object that is associated with this transform.
		*/
		protected _object3d: Object3D;
		/** @property {String} [_name=""]
		* @protected
		* The name.
		*/
		protected _name: String;
		/** @property {RadJav.C3D.Model.Mesh} [mesh=null]
		* @protected
		* The model mesh to load.
		*/
		protected mesh: Model.Mesh;
		/** @property {RadJav.C3D.Material[]} [materials=[]]
		* The materials used in this model.
		*/
		protected materials: Material[];

		/** @method create
		* Create the model.
		* @return {Promise} The promise to execute when completed.
		*/
		create (): Promise<Model>;

		/** @method _setName
		* @protected
		* Set the name of the model.
		* @param {String} name The name of the model.
		*/
		protected _setName (name: String): void;

		/** @method getName
		* Get the name of the model.
		* @return {String} The name of the model.
		*/
		getName (): String;
	}

	export namespace Model
	{
		/** @class RadJav.C3D.Model.Mesh
		* Information about the 3d Model mesh to load.
		* Available on platforms: Windows,Linux,OSX,HTML5
		*/
		class Mesh
		{
			/** @property {String} [_name=""]
			* The name of this mesh.
			*/
			_name: String;
			/** @property {String} [filePath=""]
			* The path to the file to load.
			*/
			filePath: String;
			/** @property {String} [type="json"]
			* @protected
			* The type of model to load.
			*/
			type: String;
			/** @property {RadJav.C3D.Model.Mesh.Data} [data=null]
			* @protected
			* The mesh data.
			*/
			data: Mesh.Data;
			/** @property {Object} [_mesh=null]
			* @protected
			* The 3d engine mesh associated with the model.
			*/
			_mesh: Object;
			/** @property {RadJav.C3D.Model} [model=null]
			* @protected
			* The model that contains this mesh.
			*/
			model: Model;
		}

		export namespace Mesh
		{
			/** @class RadJav.C3D.Model.Mesh.Data
			* 3d Model mesh data.
			* Available on platforms: Windows,Linux,OSX,HTML5
			*/
			class Data
			{
				/** @property {String} [type="mesh"]
				* @protected
				* The type of mesh data. Can be: 
				* - mesh
				* - sphere
				* - cube
				* - plane
				*/
				type: String;
				/** @property {Number} [radius=100]
				* @protected
				* The radius of the sphere.
				*/
				radius: Number;
				/** @property {Number} [width=0]
				* @protected
				* The width of the mesh.
				*/
				width: Number;
				/** @property {Number} [height=0]
				* @protected
				* The height of the mesh.
				*/
				height: Number;
				/** @property {Number} [depth=0]
				* @protected
				* The depth of the mesh.
				*/
				depth: Number;
				/** @property {Number} [widthSegments=1]
				* @protected
				* The width segments in the cube.
				*/
				widthSegments: Number;
				/** @property {Number} [heightSegments=1]
				* @protected
				* The height segments in the cube.
				*/
				heightSegments: Number;
				/** @property {Number} [depthSegments=1]
				* @protected
				* The depth segments in the cube.
				*/
				depthSegments: Number;
			}
		}
	}

	/** @class RadJav.C3D.Model.Sphere
	* Create a sphere.
	* Available on platforms: Windows,Linux,OSX,HTML5
	*/
	class Sphere extends Model
	{
	}
}

