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
    /** @class RadJav.Rectangle
     * A basic rectangle.
     * @param {Number|RadJav.Vector2|RadJav.Vector4} [x=0] The x coordinate of the rectangle. Can also be a Vector2
     * representing the position of this rectangle. Lastly, it can also be a Vector4 representing the
     * rectangle's position and size.
     * @param {Number|RadJav.Vector2} [y=0] The y coordinate of the rectangle. Can also be a Vector2
     * representing the size of this rectangle.
     * @param {Number} [w=0] The width of this rectangle.
     * @param {Number} [h=0] The height of this rectangle.
     * @author Jason Ryan
     * @author Nathanael Coonrod
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    var Rectangle = /** @class */ (function () {
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
        /** @method setPosition
         * Set the position of this object.
         * @param {Number|RadJav.Vector2} x The x coordinate of this object, or the Vector2
         * representing the coordinates of this object.
         * @param {Number} [y=null] The y coordinate of this object.
         */
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
        /** @method getPosition
         * Get the position of this object.
         * @return {RadJav.Vector2} The Vector2 representing the position of this object.
         */
        Rectangle.prototype.getPosition = function () {
            return new RadJav.Vector2(this.x, this.y);
        };
        /** @method setSize
         * Set the size of this object.
         * @param {Number|RadJav.Vector2} w The width of this object, or the Vector2
         * representing the size of this object.
         * @param {Number} [h=null] The height of this object.
         */
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
        /** @method getSize
         * Get the size of this object.
         * @return {RadJav.Vector2} The Vector2 representing the size of this object.
         */
        Rectangle.prototype.getSize = function () {
            return new RadJav.Vector2(this.width, this.height);
        };
        /** @method pointInside
         * Check if a point is inside this object.
         * @param {Number/RadJav.Vector2} x The x coordinate of the point, or the Vector2
         * representing the coordinates of the point to check.
         * @param {Number} [y=null] The y coordinate of the point.
         * @return {Boolean} Returns true if the point is inside the rectangle.
         */
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
        /** @method xInside
         * Check if a x coordinate is inside this rectangle.
         * @param {Number} x The x coordinate of the point to check.
         * @return {Boolean} Returns true if the x coordinate is inside the rectangle.
         */
        Rectangle.prototype.xInside = function (x) {
            if (x > this.right)
                return false;
            if (x < this.left)
                return false;
            return true;
        };
        /** @method yInside
         * Check if a y coordinate is inside this rectangle.
         * @param {Number} y The y coordinate of the point to check.
         * @return {Boolean} Returns true if the y coordinate is inside the rectangle.
         */
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
