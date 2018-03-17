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
  namespace C3D {
    /** @class RadJav.C3D.Object3D
     * The base 3D object.
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    export class Object3D {
      /** The name of this object.
       * @default ""
       */
      name: String = "";

      /** The type of object.
       * @default ""
       */
      type: String = "";

      /** The visibility of the object.
       * @default true
       * @protected
       */
      protected _visible: boolean = true;

      /** The parent of this object.
       * @protected
       * @default null
       */
      protected _parent: Object3D = null;

      /** The canvas 3d object used to display this object.
       * @protected
       * @default canvas3d
       */
      protected _canvas3D: GUI.Canvas3D;

      /** The 3d object associated with this object.
       * @protected
       * @default null
       */
      protected _obj3d: any = null;

      /** This object's transform.
       * @default new RadJav.C3D.Transform (this)
       * @protected
       */
      protected _transform: C3D.Transform;

      constructor(canvas3d, obj, parent) {
        if (obj == null) {
          obj = new Object();
        }

        if (typeof obj == "string") {
          var tempObj = obj;
          obj = {};
          obj.name = tempObj;
        }

        if (parent != null) {
          obj._parent = parent;
        }

        if (obj.visible != null) {
          obj._visible = obj.visible;
        }

        if (obj.parent != null) {
          obj._parent = obj.parent;
        }

        this.name = RadJav.setDefaultValue(obj.name, "");
        this.type = RadJav.setDefaultValue(obj.type, "");
        this._visible = RadJav.setDefaultValue(obj._visible, true);
        this._parent = RadJav.setDefaultValue(obj._parent, null);
        this._canvas3D = canvas3d;
        this._c3dObj = RadJav.setDefaultValue(obj._c3dObj, null);
        this._transform = RadJav.setDefaultValue(
          obj._transform,
          new RadJav.C3D.Transform(this)
        );
      }

      /** Using the existing parameters in this object, create it.
       * @return {Promise} The promise to execute when the creation is completed.
       */
      create(): Promise<Object3D> {
        return null;
      }

      /** Destroy this object.
       */
      destroy(): void {}

      /** Get the parent.
       * @return {RadJav.C3D.Object3D} The parent of this object.
       */
      getParent(): Object3D {
        return this._parent;
      }

      /** Get the transform.
       * @return {RadJav.C3D.Transform} The transform.
       */
      getTransform(): C3D.Transform {
        return this._transform;
      }

      /** Set the position of this object.
       * @param {Number/RadJav.Vector3} x The x position or full vector3 position.
       * @param {Number} y The y position.
       * @param {Number} z The z position.
       */
      setPosition(x: Number, y: Number, z: Number): void {
        return this._transform.setPosition(x, y, z);
      }

      /** Get the position of this object.
       * @return {RadJav.Vector3} The position.
       */
      getPosition(): Vector3 {
        return this._transform.getPosition();
      }

      /** Set the visibility of this object.
       * Theme Event: setVisibility
       * Is Theme Event Asynchronous: Yes
       * Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
       * @param {Boolean} visible The visibility of the object
       */
      setVisibility(visible: boolean): void {
        RadJav.theme.event(this.type, "setVisibility", this, visible);
      }

      /** Get the visibility of this object.
       * Theme Event: setVisibility
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject
       * @return {Boolean} The visibility of this object
       */
      getVisibility(): boolean {
        return RadJav.theme.eventSync(this.type, "getVisibility", this);
      }

      /** Show this object.
       * Theme Event: setVisibility
       * Is Theme Event Asynchronous: Yes
       * Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
       */
      show(): void {
        this.setVisibility(true);
      }

      /** Show this object.
       * Theme Event: setVisibility
       * Is Theme Event Asynchronous: Yes
       * Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
       */
      hide(): void {
        this.setVisibility(false);
      }

      /** Calls a function when an event is triggered.
       * Theme Event: on
       * Is Theme Event Asynchronous: Yes
       * Parameters Passed to Theme Event: RadJav.GUI.GObject, String, Function
       * @param {String} eventName The name of the event to trigger.
       * @param {Function} func The function to execute.
       */
      on(eventName: String, func: Function): void {}
    }
  }
}
