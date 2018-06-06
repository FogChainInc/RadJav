Math.inv180 = 1 / 180;
Math.invPI = 1 / this.PI;
Math.map = function (value, start1, stop1, start2, stop2) {
    return (start2 + (stop2 - start2) * (value - start1) / (stop1 - start1));
};
Math.sinh = function (arg) {
    return (this.exp(arg) - this.exp(-arg)) / 2;
};
Math.cosh = function (arg) {
    return (this.exp(arg) + Math.exp(-arg)) / 2;
};
Math.tanh = function (arg) {
    return (this.exp(arg) - this.exp(-arg)) / (this.exp(arg) + this.exp(-arg));
};
Math.log10 = function (arg) {
    return this.log(arg) / 2.302585092994046;
};
Math.clamp = function (x, a, b) {
    var dReturn = 0;
    if (x < a)
        dReturn = a;
    else {
        if (x > b)
            dReturn = b;
        else
            dReturn = x;
    }
    return (dReturn);
};
Math.degreesToRadians = function (degrees) {
    return (degrees * (this.PI * this.inv180));
};
Math.radiansToDegrees = function (radians) {
    return (radians * (180 * this.invPI));
};
Math.randomRange = function (min, max) {
    return (this.floor(this.random() * ((max - min) + 1)) + min);
};
