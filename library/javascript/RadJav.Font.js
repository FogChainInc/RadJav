var RadJav;
(function (RadJav) {
    var Font = (function () {
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
