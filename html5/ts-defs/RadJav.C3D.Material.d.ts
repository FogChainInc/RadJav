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
	/** @class RadJav.C3D.Material
	* A 3d tranform.
	* Available on platforms: Windows,Linux,OSX,HTML5
	*/
	class Material
	{
		constructor (canvas3d, obj, parent, model);

		/** @property {String} [_name=""]
		* @protected
		* The name.
		*/
		protected _name: String;
		/** @property {Object} [_material=null]
		* @protected
		* The 3d engine material.
		*/
		protected _material: Object;
		
		/** @method getName
		* Get the name of this object.
		* @return {String} The name.
		*/
		getName (): String;

		/** @method createMaterials
		* @static
		* Create materials from the 3d engine materials
		* @param {Object/Object[]} materials The materials to create.
		* @return {RadJav.C3D.Material[]} The materials.
		*/
		static _createMaterials (canvas3d: GUI.Canvas3D, materials: Object[]);
	}
}

