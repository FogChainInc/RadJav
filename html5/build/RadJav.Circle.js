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
    /** A basic circle.
     * @author Jason Ryan
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    var Circle = /** @class */ (function () {
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
        /** Returns true if the point provided is inside the circle.
         * @param {Number/RadJav.Vector2} x The x coordinate or Vector2 position.
         * @param {Number} [y=null] The y coordinate of the position.
         * @return {Boolean} Returns true if the point is inside the circle.
         */
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
        /** @method dsqPointInside
         * Get the distance from the inside of the circle to a point.
         * @param {Number} distance_squared The distance away that would be considered inside the circle.
         * @return {Boolean} Returns true if the distance from the point is inside the circle.
         */
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
