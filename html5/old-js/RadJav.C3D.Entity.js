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

/** @class RadJav.C3D.Entity
* An entity object.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.C3D.Entity = (function (_super)
{
	__extends(Entity, _super);

	function Entity (canvas3d, obj, parent, model)
	{
		var _this = _super.call(this, canvas3d, obj, parent) || this;

		if (typeof (obj) == "string")
		{
			var tempObj = obj;
			obj = {};
			obj._name = tempObj;
		}

		_this.type = "RadJav.C3D.Entity";

		if (model != null)
			obj._model = model;

		if (obj.model != null)
			obj._model = obj.model;

		/** @property {Object} [_model=null]
		* @protected
		* The name of the 3d model being used.
		*/
		_this._model = RadJav.setDefaultValue (obj._model, null);
		/** @property {Mixed} [_c3dEntity=null]
		* @protected
		* The entity object being used by the 3D engine.
		*/
		_this._c3dEntity = RadJav.setDefaultValue (obj._c3dEntity, null);

		if (_this._model != null)
		{
			if (_this._model._object3d == null)
				_this._model._object3d = _this;
		}

		return (_this);
	}

	/** @method create
	* Using the existing parameters in this object, create it.
	* @return {Promise} The promise to execute when the creation is completed.
	*/
	Entity.prototype.create = function ()
	{
		var promise = null;

		if (this._model != null)
		{
			promise = this._model.create ().then (RadJav.keepContext (function (model)
				{
					this._obj3d = model.mesh._mesh;
					this._transform.addChild (this);

					return (this);
				}, this));
		}

		return (promise);
	}

	/** @method setModel
	* Set a model.
	* @param {String} newModel The model to set.
	*/
	Entity.prototype.setModel = function (newModel)
	{
		this._model = newModel;
	}

	/** @method getModel
	* Get the model.
	* @return {String} The model being used.
	*/
	Entity.prototype.getModel = function ()
	{
		return (this._model);
	}

	return (Entity);
}(RadJav.C3D.Object3D));

/** @class RadJav.C3D.Entity.Types
* Types of entities.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.C3D.Entity.Types = {};
RadJav.C3D.Entity.Types.None = 0;
RadJav.C3D.Entity.Types.Cube = 1;
RadJav.C3D.Entity.Types.Sphere = 2;
RadJav.C3D.Entity.Types.Plane = 3;
RadJav.C3D.Entity.Types.Camera = 4;
RadJav.C3D.Entity.Types.Light = 5;

