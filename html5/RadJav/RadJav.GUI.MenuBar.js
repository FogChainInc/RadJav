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
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var MenuBar = (function (_super) {
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
            MenuBar.prototype.setHTMLElement = function (element) {
                var elm = element;
                if (typeof element == "string") {
                    elm = new RadJav.GUI.HTMLElement(this.name);
                }
                this._htmlElement = elm;
            };
            return MenuBar;
        }(RadJav.GUI.GObject));
        GUI.MenuBar = MenuBar;
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
