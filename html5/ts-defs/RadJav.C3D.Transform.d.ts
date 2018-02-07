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
	/** @class RadJav.C3D.Transform
	* A 3d tranform.
	* Available on platforms: Windows,Linux,OSX,HTML5
	*/
	class Transform
	{
		constructor (object3d, obj);

		/** @property {RadJav.C3D.Object3D} [_object3d=object3d]
		* @protected
		* The 3d object that is associated with this transform.
		*/
		_object3d: Object3D;
		/** @property {RadJav.C3D.Transform} [_parent=null]
		* @protected
		* This object's parent transform.
		*/
		_parent: Transform;
		/** @property {Mixed} [_sceneNode=null]
		* @protected
		* This object's scene node.
		*/
		_sceneNode: any;
		/** @property {Mixed} [_movable=null]
		* @protected
		* The object that is being moved.
		*/
		_movable: any;

		/** @method addChild
		* Add a child RadJav.C3D.Object3D to this transform.
		* @param {RadJav.C3D.Object3D} child The child to add.
		*/
		addChild (child: Object3D): void;

		/** @method setPosition
		* Set the position of this object.
		* @param {Number/RadJav.Vector3} x The x position or full vector3 position.
		* @param {Number} y The y position.
		* @param {Number} z The z position.
		*/
		setPosition (x: Number | Vector3, y: Number, z: Number): void;

		/** @method getPosition
		* Get the position of this object.
		* @return {RadJav.Vector3} The position.
		*/
		getPosition (): Vector3;
	}
}

