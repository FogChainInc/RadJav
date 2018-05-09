var RadJav;
(function (RadJav) {
    var Net;
    (function (Net) {
        var WebSocketServer = (function () {
            function WebSocketServer() {
                this.port = 0;
                this.clients = [];
                this._webSocket = null;
                if (this._init != null)
                    this._init();
            }
            return WebSocketServer;
        }());
        Net.WebSocketServer = WebSocketServer;
        var WebSocketClient = (function () {
            function WebSocketClient() {
                this.port = 0;
                this.url = "";
                this._webSocket = null;
            }
            return WebSocketClient;
        }());
        Net.WebSocketClient = WebSocketClient;
    })(Net || (Net = {}));
})(RadJav || (RadJav = {}));
