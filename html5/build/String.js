String.prototype.insertAt = function (startPos, str) {
    var finalStr = "";
    finalStr += this.substr(0, startPos);
    finalStr += str;
    finalStr += this.substr(startPos + 1);
    return finalStr;
};
String.prototype.removeAt = function (startPos, length) {
    var str = this;
    if (length < 0)
        length = str.length;
    var finalStr = str.substr(0, startPos);
    finalStr += str.substr(startPos + length);
    return finalStr;
};
String.prototype.replaceAll = function (str, replacement) {
    return this.replace(new RegExp(str, "g"), replacement);
};
