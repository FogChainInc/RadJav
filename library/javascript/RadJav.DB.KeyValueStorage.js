var RadJav;
(function (RadJav) {
    var DB;
    (function (DB) {
        var KeyValueStorage = (function () {
            function KeyValueStorage() {
                this._storage = null;
                if (this._init != null)
                    this._init();
            }
            KeyValueStorage.prototype.open = function (path) {
                return;
            };
            KeyValueStorage.prototype.write = function (key, value) {
                return new Promise(function () { return null; });
            };
            KeyValueStorage.prototype.read = function (key) {
                return new Promise(function () { return null; });
            };
            KeyValueStorage.prototype.close = function () {
            };
            return KeyValueStorage;
        }());
        DB.KeyValueStorage = KeyValueStorage;
    })(DB = RadJav.DB || (RadJav.DB = {}));
})(RadJav || (RadJav = {}));
