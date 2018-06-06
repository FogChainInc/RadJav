var RadJav;
(function (RadJav) {
    var C3D;
    (function (C3D) {
        var Object3D = (function () {
            function Object3D(canvas3d, obj, parent) {
                this.name = "";
                this.type = "";
                this._visible = true;
                this._parent = null;
                this._obj3d = null;
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
                this._transform = RadJav.setDefaultValue(obj._transform, new RadJav.C3D.Transform(this));
            }
            Object3D.prototype.getCanvas3D = function () {
                return this._canvas3D;
            };
            Object3D.prototype.getObj3D = function () {
                return this._obj3d;
            };
            Object3D.prototype.create = function () {
                return null;
            };
            Object3D.prototype.destroy = function () { };
            Object3D.prototype.getParent = function () {
                return this._parent;
            };
            Object3D.prototype.getTransform = function () {
                return this._transform;
            };
            Object3D.prototype.setPosition = function (x, y, z) {
                return this._transform.setPosition(x, y, z);
            };
            Object3D.prototype.getPosition = function () {
                return this._transform.getPosition();
            };
            Object3D.prototype.setVisibility = function (visible) {
                RadJav.Theme.event(this.type, "setVisibility", this, visible);
            };
            Object3D.prototype.getVisibility = function () {
                return RadJav.Theme.eventSync(this.type, "getVisibility");
            };
            Object3D.prototype.show = function () {
                this.setVisibility(true);
            };
            Object3D.prototype.hide = function () {
                this.setVisibility(false);
            };
            Object3D.prototype.on = function (eventName, func) { };
            return Object3D;
        }());
        C3D.Object3D = Object3D;
    })(C3D = RadJav.C3D || (RadJav.C3D = {}));
})(RadJav || (RadJav = {}));
