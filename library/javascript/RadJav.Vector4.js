var RadJav;
(function (RadJav) {
    var Vector4 = (function () {
        function Vector4(x, y, z, w) {
            if (x == null)
                x = 0;
            if (y == null)
                y = 0;
            if (z == null)
                z = 0;
            if (w == null)
                w = 0;
            if (x instanceof RadJav.Vector2) {
                var temp = x;
                x = temp.x;
                y = temp.y;
            }
            if (x instanceof RadJav.Vector3) {
                var temp_1 = x;
                x = temp_1.x;
                y = temp_1.y;
                z = temp_1.z;
            }
            if (x instanceof RadJav.Vector4) {
                var temp_2 = x;
                x = temp_2.x;
                y = temp_2.y;
                z = temp_2.z;
                w = temp_2.w;
            }
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        Vector4.prototype.toString = function () {
            return this.x + "," + this.y + "," + this.z + "," + this.w;
        };
        return Vector4;
    }());
    RadJav.Vector4 = Vector4;
})(RadJav || (RadJav = {}));
function parseVector4(string) {
    var v4dReturn = new RadJav.Vector4();
    if (string == "")
        return v4dReturn;
    string = string.toLowerCase();
    string = string.replace(/ /g, "");
    var aryStrings = string.split(",");
    v4dReturn.x = parseFloat(aryStrings[0]);
    v4dReturn.y = parseFloat(aryStrings[1]);
    v4dReturn.z = parseFloat(aryStrings[2]);
    v4dReturn.w = parseFloat(aryStrings[3]);
    return v4dReturn;
}
;
