var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var MouseEvent = (function () {
            function MouseEvent(x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                this.x = x;
                this.y = y;
            }
            return MouseEvent;
        }());
        GUI.MouseEvent = MouseEvent;
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
