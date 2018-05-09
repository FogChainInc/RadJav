var RadJav;
(function (RadJav) {
    var Vector3 = (function () {
        function Vector3(x, y, z) {
            if (x == null)
                x = 0;
            if (y == null)
                y = 0;
            if (z == null)
                z = 0;
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
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Vector3.prototype.toString = function () {
            return this.x + "," + this.y + "," + this.z;
        };
        Vector3.prototype.add = function (vector3) {
            var result = new RadJav.Vector3();
            if (vector3 instanceof RadJav.Vector3) {
                result.x = this.x + vector3.x;
                result.y = this.y + vector3.y;
                result.z = this.z + vector3.z;
            }
            else {
                result.x = this.x + vector3;
                result.y = this.y + vector3;
                result.z = this.z + vector3;
            }
            return result;
        };
        Vector3.prototype.subtract = function (vector3) {
            var result = new RadJav.Vector3();
            if (vector3 instanceof RadJav.Vector3) {
                result.x = this.x - vector3.x;
                result.y = this.y - vector3.y;
                result.z = this.z - vector3.z;
            }
            else {
                result.x = this.x - vector3;
                result.y = this.y - vector3;
                result.z = this.z - vector3;
            }
            return result;
        };
        Vector3.prototype.multiply = function (vector3) {
            var result = new RadJav.Vector3();
            if (vector3 instanceof RadJav.Vector3) {
                result.x = this.x * vector3.x;
                result.y = this.y * vector3.y;
                result.z = this.z * vector3.z;
            }
            else {
                result.x = this.x * vector3;
                result.y = this.y * vector3;
                result.z = this.z * vector3;
            }
            return result;
        };
        Vector3.prototype.divide = function (vector3) {
            var result = new RadJav.Vector3();
            if (vector3 instanceof RadJav.Vector3) {
                result.x = this.x / vector3.x;
                result.y = this.y / vector3.y;
                result.z = this.z / vector3.z;
            }
            else {
                result.x = this.x / vector3;
                result.y = this.y / vector3;
                result.z = this.z / vector3;
            }
            return result;
        };
        Vector3.prototype.dot = function (vector3) {
            var dReturn = this.x * vector3.x + this.y * vector3.y + this.z * vector3.z;
            return dReturn;
        };
        Vector3.prototype.cross = function (vector3) {
            var result = new RadJav.Vector3();
            result.x = this.y * vector3.z - this.z * vector3.y;
            result.y = this.z * vector3.x - this.x * vector3.z;
            result.z = this.x * vector3.y - this.y * vector3.x;
            return result;
        };
        Vector3.prototype.length = function () {
            var dReturn = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            return dReturn;
        };
        Vector3.prototype.normalize = function () {
            var dReturn = this.divide(this.length());
            return dReturn;
        };
        Vector3.prototype.squaredLength = function () {
            var dReturn = this.x * this.x + this.y * this.y + this.z * this.z;
            return dReturn;
        };
        Vector3.prototype.absDotProduct = function (vector3) {
            var dReturn = Math.abs(this.dot(vector3));
            return dReturn;
        };
        Vector3.prototype.angleBetween = function (vector3) {
            var dTheta = this.dot(vector3) / (this.length() * vector3.length());
            var dReturn = Math.acos(Math.clamp(dTheta, -1, 1));
            return dReturn;
        };
        Vector3.prototype.distance = function (vector3) {
            var dX = this.x - vector3.x;
            var dY = this.y - vector3.y;
            var dZ = this.z - vector3.z;
            var dReturn = Math.sqrt(dX * dX + dY * dY + dZ * dZ);
            return dReturn;
        };
        return Vector3;
    }());
    RadJav.Vector3 = Vector3;
})(RadJav || (RadJav = {}));
