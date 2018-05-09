var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var IO = (function () {
            function IO() {
            }
            IO.isDir = function (path) { return; };
            IO.isFile = function (path) { return; };
            IO.mkdir = function (path) { };
            IO.deleteFile = function (path) { };
            return IO;
        }());
        GUI.IO = IO;
        (function (IO) {
            var SerialComm = (function () {
                function SerialComm() {
                }
                SerialComm.prototype.getPort = function () {
                    return;
                };
                SerialComm.prototype.getBaud = function () { return; };
                SerialComm.prototype.getByteSize = function () { return; };
                SerialComm.prototype.getStopBits = function () { return; };
                SerialComm.prototype.getParity = function () { return; };
                SerialComm.prototype.open = function () { return; };
                SerialComm.prototype.isOpen = function () { return; };
                SerialComm.prototype.read = function (bufferSize) { return; };
                SerialComm.prototype.write = function (buffer, bufferSize) { return; };
                SerialComm.prototype.close = function () { };
                return SerialComm;
            }());
            IO.SerialComm = SerialComm;
            var TextFile = (function () {
                function TextFile() {
                }
                TextFile.writeTextToFile = function (path, content) { };
                TextFile.readEntireFile = function (path) { return; };
                return TextFile;
            }());
        })(IO = GUI.IO || (GUI.IO = {}));
    })(GUI || (GUI = {}));
})(RadJav || (RadJav = {}));
