var RadJav;
(function (RadJav) {
    var Quaternion = (function () {
        function Quaternion(w, x, y, z) {
            if (w == null)
                w = 1;
            if (x == null)
                x = 0;
            if (y == null)
                y = 0;
            if (z == null)
                z = 0;
            if (x instanceof RadJav.Vector4) {
                var temp = x;
                x = temp.x;
                y = temp.y;
                z = temp.z;
                w = temp.w;
            }
            if (x instanceof RadJav.Quaternion) {
                var temp = x;
                w = temp.w;
                x = temp.x;
                y = temp.y;
                z = temp.z;
            }
            this.w = w;
            this.x = x;
            this.y = y;
            this.z = z;
        }
        return Quaternion;
    }());
    RadJav.Quaternion = Quaternion;
})(RadJav || (RadJav = {}));
