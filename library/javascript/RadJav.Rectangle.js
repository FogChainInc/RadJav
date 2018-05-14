var RadJav;
(function (RadJav) {
    var Rectangle = (function () {
        function Rectangle(x, y, w, h) {
            if (typeof x == "object") {
                if (x.w != null) {
                    var rect = x;
                    x = pos.x;
                    y = pos.y;
                    w = pos.z;
                    h = pos.w;
                }
                else {
                    var pos = x;
                    x = pos.x;
                    y = pos.y;
                }
            }
            if (typeof y == "object") {
                var size = x;
                w = size.x;
                h = size.y;
            }
            if (x == null)
                x = 0;
            if (y == null)
                y = 0;
            if (w == null)
                w = 0;
            if (h == null)
                h = 0;
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.top = this.y + this.height;
            this.bottom = this.y - this.height;
            this.left = this.x - this.width;
            this.right = this.x + this.width;
        }
        Rectangle.prototype.setPosition = function (x, y) {
            if (typeof x == "object") {
                var pos = x;
                x = pos.x;
                y = pos.y;
            }
            this.x = x;
            this.y = y;
            this.top = this.y + this.height;
            this.bottom = this.y - this.height;
            this.left = this.x - this.width;
            this.right = this.x + this.width;
        };
        Rectangle.prototype.getPosition = function () {
            return new RadJav.Vector2(this.x, this.y);
        };
        Rectangle.prototype.setSize = function (w, h) {
            if (typeof w == "object") {
                var size = w;
                w = size.x;
                h = size.y;
            }
            this.width = w;
            this.height = h;
            this.top = this.y + this.height;
            this.bottom = this.y - this.height;
            this.left = this.x - this.width;
            this.right = this.x + this.width;
        };
        Rectangle.prototype.getSize = function () {
            return new RadJav.Vector2(this.width, this.height);
        };
        Rectangle.prototype.pointInside = function (x, y) {
            if (typeof x == "object") {
                var pos = x;
                x = pos.x;
                y = pos.y;
            }
            if (x > this.right)
                return false;
            if (x < this.left)
                return false;
            if (y > this.top)
                return false;
            if (y < this.bottom)
                return false;
            return true;
        };
        Rectangle.prototype.xInside = function (x) {
            if (x > this.right)
                return false;
            if (x < this.left)
                return false;
            return true;
        };
        Rectangle.prototype.yInside = function (y) {
            if (y > this.top)
                return false;
            if (y < this.bottom)
                return false;
            return true;
        };
        return Rectangle;
    }());
    RadJav.Rectangle = Rectangle;
})(RadJav || (RadJav = {}));
