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
        var Image = (function (_super) {
            __extends(Image, _super);
            function Image(obj, text, parent) {
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
                    obj.size.x = 100;
                    obj.size.y = 100;
                }
                _this = _super.call(this, obj, text, parent) || this;
                _this.type = "RadJav.GUI.Image";
                if (obj.image != null) {
                    obj._image = obj.image;
                }
                _this._image = RadJav.setDefaultValue(obj._image, null);
                return _this;
            }
            Image.prototype.onCreated = function () {
                if (this._image != null) {
                    this.setImage(this._image);
                }
            };
            Image.prototype.setImage = function (image) {
                RadJav.Theme.event(this.type, "setImage", this, image);
            };
            return Image;
        }(RadJav.GUI.GObject));
        GUI.Image = Image;
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
