var RadJav;
(function (RadJav) {
    var Circle = (function () {
        function Circle(x, y, r) {
            if (typeof x == "object") {
                var circle = x;
                x = circle.x;
                y = circle.y;
                r = circle.z;
            }
            this.x = x;
            this.y = y;
            this.radius_squared = r * r;
        }
        Circle.prototype.pointInside = function (x, y) {
            if (typeof x == "object") {
                var pos = x;
                x = pos.x;
                y = pos.y;
            }
            var distance_squared = (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y);
            if (distance_squared < this.radius_squared) {
                return true;
            }
            return false;
        };
        Circle.prototype.dsqPointInside = function (distance_squared) {
            if (distance_squared < this.radius_squared) {
                return true;
            }
            return false;
        };
        return Circle;
    }());
    RadJav.Circle = Circle;
})(RadJav || (RadJav = {}));
