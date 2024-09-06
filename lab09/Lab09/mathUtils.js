"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCoprime = exports.getInverseNumber = exports.gcd = exports.generateRandomNumber = void 0;
var big_integer_1 = __importDefault(require("big-integer"));
var generateRandomNumber = function (n) {
    var randomBits = [];
    for (var i = 0; i < n; i++) {
        var bit = Math.random() < 0.5 ? '0' : '1';
        randomBits.push(bit);
    }
    var randomString = randomBits.join('');
    return BigInt('0b' + randomString);
};
exports.generateRandomNumber = generateRandomNumber;
var gcd = function (a, b) {
    while (!b.isZero()) {
        var temp = b;
        b = a.mod(b);
        a = temp;
    }
    return a;
};
exports.gcd = gcd;
var getInverseNumber = function (number, modulus) {
    var m0 = modulus;
    var y = big_integer_1.default.zero;
    var x = big_integer_1.default.one;
    if (modulus.eq(1)) {
        return big_integer_1.default.zero;
    }
    while (number.gt(1)) {
        var quotient = number.divmod(modulus).quotient;
        var temp = modulus;
        modulus = number.divmod(modulus).remainder;
        number = temp;
        temp = y;
        y = x.minus(quotient.times(y));
        x = temp;
    }
    if (x.lt(0)) {
        x = x.plus(m0);
    }
    return x;
};
exports.getInverseNumber = getInverseNumber;
var generateCoprime = function (n) {
    var min = n.plus(1);
    var max = n.times(2);
    var coprime;
    do {
        coprime = big_integer_1.default.randBetween(min, max);
    } while (!(0, exports.gcd)(n, coprime).eq(1));
    return coprime;
};
exports.generateCoprime = generateCoprime;
