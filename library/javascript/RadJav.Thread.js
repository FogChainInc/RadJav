var RadJav;
(function (RadJav) {
    var Thread = (function () {
        function Thread() {
            this._appObj = null;
            this._htmlObj = null;
            this._threadFunc = null;
            if (this._init != null)
                this._init();
        }
        Thread.prototype.start = function () {
            var script = document.createElement("script");
            script.type = "javascript/worker";
            var str = "(" + this._threadFunc.toString() + ")()";
            if (RadJav._isUsingInternetExplorerTheWorstWebBrowserEver() == true)
                script.text = str;
            else {
                var textNode = document.createTextNode(str);
                script.appendChild(textNode);
            }
            document.documentElement.insertBefore(script, document.documentElement.firstChild);
            var blob = new Blob([script.textContent], { type: script.type });
            var url = window.URL.createObjectURL(blob);
            this._htmlObj = new Worker(url);
            this._htmlObj.postMessage();
        };
        Thread.prototype.close = function () {
            this._htmlObj.close();
        };
        Thread.prototype.on = function (eventName, func) {
            if (eventName == "thread")
                this._threadFunc = func;
        };
        return Thread;
    }());
    RadJav.Thread = Thread;
})(RadJav || (RadJav = {}));
