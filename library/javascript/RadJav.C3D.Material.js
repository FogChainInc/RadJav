var RadJav;
(function (RadJav) {
    var C3D;
    (function (C3D) {
        var Material = (function () {
            function Material(canvas3d, obj, parent, model) {
                this._name = "";
                this._material = {};
                if (obj == null) {
                    obj = new Object();
                }
                if (typeof obj == "string") {
                    var tempObj = obj;
                    obj = {};
                    obj.name = tempObj;
                }
                this._name = RadJav.setDefaultValue(obj._name, "");
                this._material = RadJav.setDefaultValue(obj._material, null);
            }
            Material.prototype.getName = function () {
                return this._name;
            };
            Material._createMaterials = function (canvas3d, materials) {
                var result = [];
                var materialCount = canvas3d.getNumMaterials();
                if (materials instanceof Array) {
                    for (var iIdx = 0; iIdx < materials.length; iIdx++) {
                        var material = new RadJav.C3D.Material(canvas3d, "material-" + materialCount++);
                        material._material = materials[iIdx];
                        canvas3d.addMaterial(material);
                    }
                }
                else {
                    var material = new RadJav.C3D.Material(canvas3d, "material-" + materialCount);
                    material._material = materials;
                    canvas3d.addMaterial(material);
                }
                return result;
            };
            return Material;
        }());
        C3D.Material = Material;
    })(C3D = RadJav.C3D || (RadJav.C3D = {}));
})(RadJav || (RadJav = {}));
