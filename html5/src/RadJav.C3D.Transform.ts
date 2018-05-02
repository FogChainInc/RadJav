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
    /** @class RadJav.C3D.Transform
     * A 3d tranform.
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    export class Transform {
      constructor(object3d, obj?,position?) {
        if (object3d == null) {
          throw (_lang.object3dNotIncluded);
        }

        if (obj == null) {
          obj = {};
        }

        if (position == null) {
          position = new RadJav.Vector3();
        }

        if (obj.parent != null) {
          if ((<any>parent)._transform != null) {
            obj._parent = obj.parent._transform;
          } else {
            obj._parent = obj.parent;
          }
        }

        this._object3d = object3d;
        this._parent = RadJav.setDefaultValue(obj._parent, null);
        this._sceneNode = RadJav.setDefaultValue(obj._sceneNode, null);
        this._movable = RadJav.setDefaultValue(obj._movable, null);
        this.position = position;

        if (this._parent != null) {
          this._sceneNode = this._parent._sceneNode;
        } else {
          this._sceneNode = (<any>this._object3d.getCanvas3D())._sceneManager;
        }
      }


      protected position: any;

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
      addChild(child: Object3D): void {
        if (this._sceneNode != null) {
          this._sceneNode.add(child.getObj3D());
          this._movable = child.getObj3D();
        }
      }

      /** @method setPosition
       * Set the position of this object.
       * @param {Number/RadJav.Vector3} x The x position or full vector3 position.
       * @param {Number} y The y position.
       * @param {Number} z The z position.
       */
      setPosition(x: any | Vector3, y: number, z: number): void {
        var obj = {
          x: 0,
          y: 0,
          z: 0
        };

        if (x.x != null) {
          obj.x = x.x;
          obj.y = x.y;
          obj.z = x.z;
        } else {
          obj.x = x;
          obj.y = y;
          obj.z = z;
        }

        this._movable.position.set(obj.x, obj.y, obj.z);
      }

      /** @method getPosition
       * Get the position of this object.
       * @return {RadJav.Vector3} The position.
       */
      getPosition(): Vector3 {
        var pos = this._movable.position;
        var obj = new RadJav.Vector3(pos);

        return obj;
      }
    }
  }
}
