var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var KeyEvent = (function () {
            function KeyEvent(key) {
                this.key = key;
            }
            return KeyEvent;
        }());
        GUI.KeyEvent = KeyEvent;
    })(GUI = RadJav.GUI || (RadJav.GUI = {}));
})(RadJav || (RadJav = {}));
