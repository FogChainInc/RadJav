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
    /** The font class.
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    var Font = /** @class */ (function () {
        function Font(obj) {
            if (obj == null) {
                obj = {};
            }
            if (obj.color != null) {
                obj.color = new RadJav.Color(obj.color);
            }
            this.fontFamily = RadJav.setDefaultValue(obj.fontFamily, "Open Sans");
            this.size = RadJav.setDefaultValue(obj.size, 10);
            this.color = RadJav.setDefaultValue(obj.color, RadJav.Color.Black);
            this.underline = RadJav.setDefaultValue(obj.underline, false);
            this.bold = RadJav.setDefaultValue(obj.bold, false);
            this.italic = RadJav.setDefaultValue(obj.italic, false);
        }
        return Font;
    }());
    RadJav.Font = Font;
})(RadJav || (RadJav = {}));
