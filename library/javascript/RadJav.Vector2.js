var RadJav;
(function (RadJav) {
    var Vector2 = (function () {
        function Vector2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (typeof x == "object")
                this.x = x.x;
            else
                this.x = x;
            this.y = y;
        }
        Vector2.prototype.tostring = function () {
            return this.x + "," + this.y;
        };
        Vector2.prototype.setX = function (n) {
            this.x = n;
        };
        Vector2.prototype.setY = function (n) {
            this.y = n;
        };
        Vector2.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
        };
        Vector2.prototype.add = function (x, y) {
            this.x += x;
            this.y += y;
        };
        Vector2.prototype.sub = function (subVector2) {
            this.x -= subVector2.x;
            this.y -= subVector2.y;
        };
        Vector2.prototype.mult = function (n) {
            this.x *= n;
            this.y *= n;
        };
        Vector2.prototype.divide = function (vector2) {
            var result = new Vector2();
            if (typeof vector2 == "object") {
                result.x = this.x / vector2.x;
                result.y = this.y / vector2.y;
            }
            else {
                result.x = this.x / vector2;
                result.y = this.y / vector2;
            }
            return result;
        };
        Vector2.prototype.dot = function (dotVector2) {
            return this.x * dotVector2.x + this.y * dotVector2.y;
        };
        Vector2.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Vector2.prototype.normalize = function () {
            return this.divide(this.length());
        };
        Vector2.parseVector2 = function (str) {
            var obj = new Vector2();
            if (str == "")
                return obj;
            str = str.toLowerCase();
            str = str.replace(/ /g, "");
            var strs = str.split(",");
            if (strs.length > 0)
                obj.x = parseFloat(strs[0]);
            if (strs.length > 1)
                obj.y = parseFloat(strs[1]);
            return obj;
        };
        return Vector2;
    }());
    RadJav.Vector2 = Vector2;
})(RadJav || (RadJav = {}));
