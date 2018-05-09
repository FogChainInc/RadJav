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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="RadJav.ts" />
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        /** @class RadJav.GUI.MenuBar
         * @extends RadJav.GUI.GObject
         * A menu Bar.
         * Available on platforms: Windows,Linux,OSX,HTML5
         */
        var MenuBar = /** @class */ (function (_super) {
            __extends(MenuBar, _super);
            function MenuBar(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 120;
                    obj.size.y = 40;
                }
                _this = _super.call(this, obj, text, parent) || this;
                _this.type = "RadJav.GUI.MenuBar";
                if (obj.htmlElement != null) {
                    obj._htmlElement = obj.htmlElement;
                }
                _this._htmlElement = RadJav.setDefaultValue(obj._htmlElement, null);
                if (_this._htmlElement != null) {
                    _this.setHTMLElement(_this._htmlElement);
                }
                return _this;
            }
            /** @method setHTMLElement
             * Set the HTML element to use, if the OS being used is HTML5.
             * @param {RadJav.GUI.HTMLElement/String} element The element to be used.
             */
            MenuBar.prototype.setHTMLElement = function (element) {
                var elm = element;
                if (typeof element == "string") {
                    elm = new RadJav.GUI.HTMLElement(this.name);
                }
                this._htmlElement = elm;
            };
            return MenuBar;
        }(RadJav.GUI.GObject));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
