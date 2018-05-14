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
        var Radio = (function (_super) {
            __extends(Radio, _super);
            function Radio(obj, text, parent) {
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
                    obj.size.x = 80;
                    obj.size.y = 40;
                }
                (_this = _super.call(this, obj, text, parent) || this) || _this;
                _this.type = "RadJav.GUI.Radio";
                if (obj.radioGroup != null) {
                    obj._radioGroup = obj.radioGroup;
                }
                if (obj.checked != null) {
                    obj._checked = obj.checked;
                }
                _this._radioGroup = RadJav.setDefaultValue(obj._radioGroup, "");
                _this._checked = RadJav.setDefaultValue(obj._checked, false);
                return _this;
            }
            Radio.prototype.setChecked = function (checked) {
                RadJav.Theme.eventSync(this.type, "setChecked", this, checked);
            };
            Radio.prototype.isChecked = function () {
                return RadJav.Theme.eventSync(this.type, "isChecked", this);
            };
            return Radio;
        }(RadJav.GUI.GObject));
        GUI.Radio = Radio;
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
