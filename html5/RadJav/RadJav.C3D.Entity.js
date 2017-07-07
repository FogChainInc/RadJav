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
RadJav.C3D.Entity = RadJav.C3D.Object3D.extend (
{
	init: function (canvas3d, obj, parent, model)
	{
		this._super (canvas3d, obj, parent);

		if (typeof (obj) == "string")
		{
			var tempObj = obj;
			obj = {};
			obj._name = tempObj;
		}

		this.type = "RadJav.C3D.Entity";

		if (model != null)
			obj._model = model;

		if (obj.model != null)
			obj._model = obj.model;

		/** @property {Object} [_model=null]
		* @protected
		* The name of the 3d model being used.
		*/
		this._model = RadJav.setDefaultValue (obj._model, null);

		if (this._model._object3d == null)
			this._model._object3d = this;
	}, 

	/** @method create
	* Using the existing parameters in this object, create it.
	* @return {Promise} The promise to execute when the creation is completed.
	*/
	create: function ()
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
	}, 

	/** @method setModel
	* Set a model.
	* @param {String} newModel The model to set.
	*/
	setModel: function (newModel)
	{
		this._model = newModel;
	}, 

	/** @method getModel
	* Get the model.
	* @return {String} The model being used.
	*/
	getModel: function ()
	{
		return (this._model);
	}
});

