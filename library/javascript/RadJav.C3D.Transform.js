var RadJav;
(function (RadJav) {
    var C3D;
    (function (C3D) {
        var Transform = (function () {
            function Transform(object3d, obj, position) {
                if (object3d == null) {
                    throw (RadJav._lang.object3dNotIncluded);
                }
                if (obj == null) {
                    obj = {};
                }
                if (position == null) {
                    position = new RadJav.Vector3();
                }
                if (obj.parent != null) {
                    if (parent._transform != null) {
                        obj._parent = obj.parent._transform;
                    }
                    else {
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
                }
                else {
                    this._sceneNode = this._object3d.getCanvas3D()._sceneManager;
                }
            }
            Transform.prototype.addChild = function (child) {
                if (this._sceneNode != null) {
                    this._sceneNode.add(child.getObj3D());
                    this._movable = child.getObj3D();
                }
            };
            Transform.prototype.setPosition = function (x, y, z) {
                var obj = {
                    x: 0,
                    y: 0,
                    z: 0
                };
                if (x.x != null) {
                    obj.x = x.x;
                    obj.y = x.y;
                    obj.z = x.z;
                }
                else {
                    obj.x = x;
                    obj.y = y;
                    obj.z = z;
                }
                this._movable.position.set(obj.x, obj.y, obj.z);
            };
            Transform.prototype.getPosition = function () {
                var pos = this._movable.position;
                var obj = new RadJav.Vector3(pos);
                return obj;
            };
            return Transform;
        }());
        C3D.Transform = Transform;
    })(C3D = RadJav.C3D || (RadJav.C3D = {}));
})(RadJav || (RadJav = {}));
