var RadJav;
(function (RadJav) {
    var Net;
    (function (Net) {
        var WebSocketClient = (function () {
            function WebSocketClient(obj) {
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var tempobj = obj;
                    obj = {};
                    obj.url = tempobj;
                }
                this.url = RadJav.setDefaultValue(obj.url, "");
                this._socket = RadJav.setDefaultValue(obj._socket, null);
                this._events = RadJav.setDefaultValue(obj._events, {});
                if (this._init != null)
                    this._init();
            }
            WebSocketClient.prototype.connect = function (eventName, func) {
                var promise = new Promise(RadJav.keepContext(function (resolve, reject) {
                    if (WebSocket == null) {
                        reject(RadJav._lang.websocketsNotSupported);
                        return;
                    }
                    this._socket = new WebSocket(this.url, ["xmpp"]);
                    this._socket.onopen = RadJav.keepContext(function () {
                        resolve();
                        if (this._events["onopen"] != null) {
                            this._events["onopen"]();
                        }
                    }, this);
                    this._socket.onerror = RadJav.keepContext(function (error) {
                        reject(error);
                        if (this._events["onerror"] != null) {
                            this._events["onerror"](error);
                        }
                    }, this);
                    this._socket.onmessage = RadJav.keepContext(function (message) {
                        if (this._events["onmessage"] != null) {
                            this._events["onmessage"](message);
                        }
                    }, this);
                    this._socket.onclose = RadJav.keepContext(function (message) {
                        if (this._events["onclose"] != null) {
                            this._events["onclose"]();
                        }
                    }, this);
                }, this));
                return promise;
            };
            WebSocketClient.prototype.send = function (message) {
                this._socket.send(message);
            };
            WebSocketClient.prototype.on = function (eventName, func) {
                this._events[eventName] = func;
            };
            return WebSocketClient;
        }());
        Net.WebSocketClient = WebSocketClient;
    })(Net = RadJav.Net || (RadJav.Net = {}));
})(RadJav || (RadJav = {}));
