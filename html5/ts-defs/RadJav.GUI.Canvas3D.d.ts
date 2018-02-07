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

declare namespace RadJav.GUI
{
	/** @class RadJav.GUI.Combobox
	* @extends RadJav.GUI.GObject
	* A combobox.
	* Available on platforms: Windows,Linux,OSX,HTML5
	*/
	class Canvas3D extends GObject
	{
		constructor (obj?: Object, text?: String, parent?: GObject);

		/** @property {Mixed} [_renderer=null]
		* @protected
		* The renderer used to render the canvas.
		*/
		protected _renderer: any;
		/** @property {Number} [_rendererType=1]
		* @protected
		* The renderer type used to render the canvas.
		*/
		protected _rendererType: Number;
		/** @property {Object} [_currentCamera=null]
		* @protected
		* The current camera used to render the scene.
		*/
		protected _currentCamera: any;
		/** @property {Object} [_models={}]
		* @protected
		* The models that have been loaded for use. Each key is a RadJav.C3D.Model.
		*/
		protected _models: Object[];
		/** @property {Object} [_materials={}]
		* @protected
		* The materials that have been loaded for use. Each key is a RadJav.C3D.Material.
		*/
		protected _materials: Object[];

		create (): Promise<GObject>;

		/** @method _setupDefaultCamera
		* @protected
		* Setup the default camera.
		* @return {Promise} The promise to execute when the camera has finished being 
		* created.
		*/
		_setupDefaultCamera (): void;

		/** @method _setupDefaultSceneManager
		* @protected
		* Setup the default scene manager.
		* @return {RadJav.GUI.GObject} The parent of this object.
		*/
		_setupDefaultSceneManager (): void;

		/** @method setAmbientLightColor
		* Set the ambient light color of the scene.
		* @param {RadJav.Color} color The color.
		*/
		setAmbientLightColor (colour: Color): void;

		/** @method addModel
		* Add a loaded model for use.
		* @param {RadJav.C3D.Model} model The model to add.
		*/
		addModel (model): void;

		/** @method addMaterial
		* Add a loaded material for use.
		* @param {RadJav.C3D.Material} material The material to add.
		*/
		addMaterial (material): void;

		/** @method getNumModels
		* Get the number of models that have been loaded.
		*/
		getNumModels (): Number;

		/** @method getNumMaterials
		* Get the number of materials that have been loaded.
		*/
		getNumMaterials (): Number;

		/** @method render
		* Perform the actual rendering.
		*/
		render (): void;

		/** @method createWorld
		* Set the ambient light color of the scene.
		* @param {RadJav.Color} color The color.
		*/
		createWorld (colour): void;

		/** @method createWorld
		* Set the ambient light color of the scene.
		* @param {RadJav.Color} color The color.
		*/
		setWorld (colour: Color): void;
	}

	export namespace Canvas3D
	{
		/** A 3d canvas.
		* Available on platforms: Windows,Linux,OSX,HTML5
		*/
		export enum RendererTypes
		{
			AnyAvailable = 1, 
			WebGL = 2, 
			Context2D = 3
		}
	}
}

