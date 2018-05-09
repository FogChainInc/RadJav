var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RadJav;
(function (RadJav) {
    var C3D;
    (function (C3D) {
        var Camera = (function (_super) {
            __extends(Camera, _super);
            function Camera(canvas3d, obj, parent) {
                var _this = _super.call(this, canvas3d, obj, parent) || this;
                _this._perspective = true;
                _this._perspective = RadJav.setDefaultValue(obj._perspective, true);
                _this._aspectRatio = RadJav.setDefaultValue(obj._aspectRatio, parseFloat(canvas3d.getWidth()) / parseFloat(canvas3d.getHeight()));
                _this._fov = RadJav.setDefaultValue(obj._fov, 90 / _this._aspectRatio);
                _this._nearClip = RadJav.setDefaultValue(obj._nearClip, 1.0);
                _this._farClip = RadJav.setDefaultValue(obj._farClip, 10000000000.0);
                _this._rayCaster = RadJav.setDefaultValue(obj._rayCaster, null);
                return _this;
            }
            Camera.prototype.create = function () {
                var promise = new Promise(RadJav.keepContext(function (resolve, reject) {
                    if (this._perspective == true) {
                        this._obj3d = new THREE.PerspectiveCamera(this._fov, this._aspectRatio, this._nearClip, this._farClip);
                    }
                    else {
                        var width = this._canvas3D.getWidth();
                        var height = this._canvas3D.getHeight();
                        this._obj3d = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, this._nearClip, this._farClip);
                    }
                    this._rayCaster = new THREE.Raycaster();
                    resolve(this);
                }, this));
                return promise;
            };
            return Camera;
        }(RadJav.C3D.Object3D));
        C3D.Camera = Camera;
    })(C3D = RadJav.C3D || (RadJav.C3D = {}));
})(RadJav || (RadJav = {}));
