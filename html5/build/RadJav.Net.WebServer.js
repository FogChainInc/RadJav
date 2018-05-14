/*
    MIT-LICENSE
    Copyright (c) 2017-2018 Higher Edge Software, LLC

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software
    and associated documentation files (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial
    portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
    LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/// <reference path="RadJav.ts" />
var RadJav;
(function (RadJav) {
    var Net;
    (function (Net) {
        /// Web server
        var WebServer = /** @class */ (function () {
            function WebServer() {
                this.port = 80;
                this._serverType = RadJav.Net.WebServerTypes.HTTP;
                this._webServer = null;
                if (this._init != null)
                    this._init();
            }
            return WebServer;
        }());
        Net.WebServer = WebServer;
        var WebServerTypes;
        (function (WebServerTypes) {
            WebServerTypes[WebServerTypes["HTTP"] = 1] = "HTTP";
            WebServerTypes[WebServerTypes["HTTPS"] = 2] = "HTTPS";
        })(WebServerTypes = Net.WebServerTypes || (Net.WebServerTypes = {}));
    })(Net = RadJav.Net || (RadJav.Net = {}));
})(RadJav || (RadJav = {}));
