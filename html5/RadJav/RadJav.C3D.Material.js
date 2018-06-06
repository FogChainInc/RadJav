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
var RadJav;
(function (RadJav) {
    var C3D;
    (function (C3D) {
        /** @class RadJav.C3D.Material
         * A 3d tranform.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var Material = /** @class */ (function () {
            function Material(canvas3d, obj, parent, model) {
                /** @property {String} [_name=""]
                 * @protected
                 * The name.
                 */
                this._name = "";
                /** @property {Object} [_material=null]
                 * @protected
                 * The 3d engine material.
                 */
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
            /** @method getName
             * Get the name of this object.
             * @return {String} The name.
             */
            Material.prototype.getName = function () {
                return this._name;
            };
            /** @method createMaterials
             * @static
             * Create materials from the 3d engine materials
             * @param {Object/Object[]} materials The materials to create.
             * @return {RadJav.C3D.Material[]} The materials.
             */
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
