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

/** @class RadJav.C3D.Camera
* A camera object.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.C3D.Camera = (function (_super)
{
	__extends(Camera, _super);

	function Camera (canvas3d, obj, parent)
	{
		var _this = _super.call(this, canvas3d, obj, parent) || this;

		_this.type = "RadJav.C3D.Camera";

		/** @property {Boolean} [_perspective=true]
		* @protected
		* If this is set to true, the perspective view will be used.
		*/
		_this._perspective = RadJav.setDefaultValue (obj._perspective, true);
		/** @property {Number} [_aspectRatio=parseFloat (canvas3d.getWidth ()) / parseFloat (canvas3d.getHeight ()]
		* @protected
		* The camera's aspect ratio.
		*/
		_this._aspectRatio = RadJav.setDefaultValue (obj._aspectRatio, parseFloat (canvas3d.getWidth ()) / 
							parseFloat (canvas3d.getHeight ()));
		/** @property {Number} [_fov=(90 / _this._aspectRatio)]
		* @protected
		* The camera's fov.
		*/
		_this._fov = RadJav.setDefaultValue (obj._fov, (90 / _this._aspectRatio));
		/** @property {Number} [_nearClip=1.0]
		* @protected
		* The camera's near clip distance.
		*/
		_this._nearClip = RadJav.setDefaultValue (obj._nearClip, 1.0);
		/** @property {Number} [_farClip=1.0]
		* @protected
		* The camera's far clip distance.
		*/
		_this._farClip = RadJav.setDefaultValue (obj._farClip, 10000000000.0);
		/** @property {Object} [_rayCaster=null]
		* @protected
		* The ray caster used to get ray casts from the screen.
		*/
		_this._rayCaster = RadJav.setDefaultValue (obj._rayCaster, null);

		return (_this);
	}

	/** @method create
	* Using the existing parameters in this object, create it.
	* @return {Promise} The promise to execute when the creation is completed.
	*/
	Camera.prototype.create = function ()
	{
		var promise = new Promise (RadJav.keepContext (function (resolve, reject)
			{
				if (this._perspective == true)
				{
					this._obj3d = new THREE.PerspectiveCamera (this._fov, 
						this._aspectRatio, this._nearClip, this._farClip);
				}
				else
				{
					var width = this._canvas3D.getWidth ();
					var height = this._canvas3D.getHeight ();
					this._obj3d = new THREE.OrthographicCamera ((width / -2), (width / 2), 
											(height / 2), (height / -2), this._nearClip, this._farClip);
				}

				this._rayCaster = new THREE.Raycaster ();
				resolve (this);
			}, this));

		return (promise);
	}

	return (Camera);
}(RadJav.C3D.Object3D));

