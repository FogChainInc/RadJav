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

namespace RadJav {
  /** @class RadJav.Vector2
   * A Vector2 class.
   * Available on platforms: Windows,Linux,OSX,HTML5
   */
  export class Vector2 {
    constructor(x: Number, y: Number) {
      if (typeof x == "object") {
        var temp = x;
        x = temp.x;
        y = temp.y;
      }

      if (x == null) x = 0;

      if (y == null) y = 0;

      this.x = x;
      this.y = y;
    }

    /** @property {Number} [x=0]
     * The X component.
     */
    x: Number;
    /** @property {Number} [y=0]
     * The X component.
     */
    y: Number;

    /** @method toString
     * Convert this object to a string.
     * @return {String} The string representing this object.
     */
    toString(): String {
      return this.x + "," + this.y;
    }

    /** @method setX
     * Set the X component of this object.
     * @param {Number} n The new X component of this object.
     */
    setX(n: Number): void {
      this.x = n;
    }

    /** @method setY
     * Set the X component of this object.
     * @param {Number} n The new X component of this object.
     */
    setY(n: Number): void {
      this.y = n;
    }

    /** @method set
     * Set the X,Y component of this object.
     * @param {Number} x The new X component of this object.
     * @param {Number} y The new Y component of this object.
     */
    set(x: Number, y: Number): void {
      this.x = x;
      this.y = y;
    }

    /** @method add
     * Add X and Y values to the X and Y components of this object.
     * @param {Number} x The X component to add.
     * @param {Number} y The Y component to add.
     */
    add(x: Number, y: Number): void {
      this.x += x;
      this.y += y;
    }

    /** @method sub
     * Subtract X and Y values from the X and Y components of this object.
     * @param {Number} x The X component to subtract.
     * @param {Number} y The Y component to subtract.
     */
    sub(subVector2: Vector2): void {
      this.x -= subVector2.x;
      this.y -= subVector2.y;
    }

    /** @method mult
     * Multiply X and Y values to the X and Y components of this object.
     * @param {Number} x The X component to subtract.
     * @param {Number} y The Y component to subtract.
     */
    mult(n: Number): void {
      this.x *= n;
      this.y *= n;
    }

    /** @method divide
     * Divide this object by another Vector2 object or number.
     * @param {RadJav.Vector2|Number} vector2 The Vector2 or Number to divide by.
     */
    divide(vector2: Vector2): Vector2 {
      var result = new RadJav.Vector2();

      if (typeof vector2 == "object") {
        result.x = this.x / vector2.x;
        result.y = this.y / vector2.y;
      } else {
        result.x = this.x / vector2;
        result.y = this.y / vector2;
      }

      return result;
    }

    /** @method dot
     * Perform a dot product on this object.
     * @param {RadJav.Vector2} dotVector2 The Vector2 to perform the dot product.
     * @return {Number} The result of the dot product.
     */
    dot(dotVector2: Vector2): Number {
      return this.x * dotVector2.x + this.y * dotVector2.y;
    }

    /** @method length
     * Get the length of this object using a square root. This will use Math.sqrt.
     * @return {Number} The length of this object.
     */
    length(): Number {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /** @method normalize
     * Normalize this object, this will use this object's length method.
     * @return {Number} The normalized length of this object.
     */
    normalize(): Number {
      return this.divide(this.length());
    }
    /** @method parseVector2
     * @static
     * Parse a Vector2 string and create a Vector2 object from it.
     * @param {String} str The string to parse.
     * @return {RadJav.Vector2} The new Vector2 created from this string.
     */
    parseVector2(str: String): RadJav.Vector2 {
      var obj = new RadJav.Vector2();

      if (str == "") return obj;

      str = str.toLowerCase();
      str = str.replace(/ /g, "");
      var strs = str.split(",");

      if (strs.length > 0) obj.x = parseFloat(strs[0]);

      if (strs.length > 1) obj.y = parseFloat(strs[1]);

      return obj;
    }
  }
}
