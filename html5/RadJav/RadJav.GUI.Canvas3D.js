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

/** @class RadJav.GUI.Canvas3D
* @extends RadJav.GUI.GObject
* A 3d canvas.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.Canvas3D = RadJav.GUI.GObject.extend (
{
	init: function (obj, text, parent)
	{
		if (obj == null)
			obj = {};

		if (typeof (obj) == "string")
		{
			var name = obj;
			obj = { name: name };
		}

		RadJav.copyProperties (obj, {
					type: "RadJav.GUI.Canvas3D", 
					size: "500,350"
				}, false);
		this._super (obj, text, parent);

		/** @property {Mixed} [_renderer=null]
		* @protected
		* The renderer used to render the canvas.
		*/
		this._renderer = RadJav.setDefaultValue (obj._renderer, null);
		/** @property {Number} [_rendererType=1]
		* @protected
		* The renderer type used to render the canvas.
		*/
		this._rendererType = RadJav.setDefaultValue (obj._renderer, 1);
		/** @property {Object} [_currentCamera=null]
		* @protected
		* The current camera used to render the scene.
		*/
		this._currentCamera = RadJav.setDefaultValue (obj._currentCamera, null);
		/** @property {Object} [_models={}]
		* @protected
		* The models that have been loaded for use. Each key is a RadJav.C3D.Model.
		*/
		this._models = RadJav.setDefaultValue (obj._models, {});
		/** @property {Object} [_materials={}]
		* @protected
		* The materials that have been loaded for use. Each key is a RadJav.C3D.Material.
		*/
		this._materials = RadJav.setDefaultValue (obj._materials, {});
	}, 

	create: function ()
	{
		var promise = RadJav.theme.event (this.type, "create", this).then (
			RadJav.keepContext (function (html)
			{
				this._html = html;

				if (this._rendererType == RadJav.GUI.Canvas3D.RendererTypes.AnyAvailable)
				{
					try
					{
						this._renderer = new THREE.WebGLRenderer ({
							canvas: this._html, 
							alpha: false
						});
					}
					catch (ex)
					{
						console.log (RadJav._lang.webglIsNotSupported);
					}
		 
					if (this._renderer == null)
					{
						this._renderer = new THREE.CanvasRenderer ({
							canvas: this._html, 
							alpha: false
						});
					}
				}
				else
				{
					var rendererType = "WebGLRenderer";

					if (this._rendererType == RadJav.GUI.Canvas3D.RendererTypes.WebGL)
						rendererType = "WebGLRenderer";

					if (this._rendererType == RadJav.GUI.Canvas3D.RendererTypes.Context2D)
						rendererType = "CanvasRenderer";

					this._renderer = new THREE[rendererType] ({
						canvas: this._html, 
						alpha: false
					});
				}

				if (this._renderer == null)
					throw RadJav._lang.unableToCreateaRenderSystem;

				this._renderer.setClearColor (RadJav.Color.Black.toHexInt ());
				this._setupDefaultSceneManager ();
				this.setAmbientLightColor (RadJav.Color.White);
				this._renderer.setPixelRatio (window.devicePixelRatio);
				this._renderer.setSize (this.getWidth (), this.getHeight ());

				if (this._html == null)
				{
					this._html = document.body;
					document.body.style.margin = "0px";
					document.body.style.padding = "0px";
				}

				this._setupDefaultCamera ().then (RadJav.keepContext (function ()
					{
						this.render ();
					}, this));

				return (this);
			}, this));

		return (promise);
	}, 

	/** @method _setupDefaultCamera
	* @protected
	* Setup the default camera.
	* @return {Promise} The promise to execute when the camera has finished being 
	* created.
	*/
	_setupDefaultCamera: function ()
	{
		var camera = new RadJav.C3D.Camera (this, "camera");

		return (camera.create ().then (RadJav.keepContext (function (cam)
			{
				this._currentCamera = cam;
			}, this)));
	}, 

	/** @method _setupDefaultSceneManager
	* @protected
	* Setup the default scene manager.
	* @return {RadJav.GUI.GObject} The parent of this object.
	*/
	_setupDefaultSceneManager: function ()
	{
		this._sceneManager = new THREE.Scene ();
	}, 

	/** @method setAmbientLightColor
	* Set the ambient light color of the scene.
	* @param {RadJav.Color} color The color.
	*/
	setAmbientLightColor: function (colour)
	{
		this._sceneManager.add (new THREE.AmbientLight (colour.toHexInt ()));
	}, 

	/** @method createEntity
	* Create an entity to display in the scene.
	* @param {String} name The name of the object.
	* @param {RadJav.C3D.Object3D} parent The parent object.
	* @param {RadJav.C3D.Model} model The 3d model to create.
	* @return {Promise} The promise to execute when the entity has finished creating.
	*/
	createEntity: function (name, parent, model)
	{
		var entity = new RadJav.C3D.Entity (this, name, parent, model);

		return (entity.create ());
	}, 

	/** @method addModel
	* Add a loaded model for use.
	* @param {RadJav.C3D.Model} model The model to add.
	*/
	addModel: function (model)
	{
		this._models[model._name] = model;
	}, 

	/** @method addMaterial
	* Add a loaded material for use.
	* @param {RadJav.C3D.Material} material The material to add.
	*/
	addMaterial: function (material)
	{
		this._materials[material._name] = material;
	}, 

	/** @method getNumModels
	* Get the number of models that have been loaded.
	*/
	getNumModels: function ()
	{
		return (Object.keys (this._models).length);
	}, 

	/** @method getNumMaterials
	* Get the number of materials that have been loaded.
	*/
	getNumMaterials: function ()
	{
		return (Object.keys (this._materials).length);
	}, 

	/** @method render
	* Perform the actual rendering.
	*/
	render: function ()
	{
		requestAnimationFrame (RadJav.keepContext (this.render, this));
		this._renderer.render (this._sceneManager, this._currentCamera._obj3d);
	}
});

/** @class RadJav.GUI.Canvas3D.RendererTypes
* A 3d canvas.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.Canvas3D.RendererTypes = function ()
{
}

RadJav.GUI.Canvas3D.RendererTypes.AnyAvailable = 1;
RadJav.GUI.Canvas3D.RendererTypes.WebGL = 2;
RadJav.GUI.Canvas3D.RendererTypes.Context2D = 3;

