"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecryptedBinary = exports.decrypt = exports.encrypt = exports.generatePublicKey = exports.getPublicKeyParams = exports.generatePrivateKey = exports.Encoding = void 0;
var big_integer_1 = __importDefault(require("big-integer"));
var mathUtils_1 = require("./mathUtils");
var base64_1 = require("./base64");
var Encoding;
(function (Encoding) {
    Encoding[Encoding["ASCII"] = 0] = "ASCII";
    Encoding[Encoding["BASE64"] = 1] = "BASE64";
})(Encoding || (exports.Encoding = Encoding = {}));
var generatePrivateKey = function (initialNumber, z) {
    var sequence = [];
    var element = initialNumber;
    var sum = initialNumber;
    for (var i = 0; i < z; i++) {
        sequence.push(element);
        element = sum.add((0, big_integer_1.default)(z));
        sum = sum.add(element);
    }
    return sequence;
};
exports.generatePrivateKey = generatePrivateKey;
var getPublicKeyParams = function (privateKey) {
    var sum = privateKey.reduce(function (prev, curr) { return prev.plus(curr); });
    var n = (0, big_integer_1.default)(sum).add(1n);
    var a = (0, mathUtils_1.generateCoprime)(n);
    return { a: a, n: n };
};
exports.getPublicKeyParams = getPublicKeyParams;
var generatePublicKey = function (privateKey, a, n) {
    var sequence = [];
    var d;
    var e;
    for (var i = 0; i < privateKey.length; i++) {
        d = privateKey[i];
        e = d.multiply(a).mod(n);
        sequence.push(e);
    }
    return sequence;
};
exports.generatePublicKey = generatePublicKey;
var encrypt = function (publicKey, plaintext, encoding) {
    var encryptedList = [];
    if (encoding === Encoding.BASE64) {
        plaintext = (0, base64_1.base64Encode)(plaintext);
    }
    plaintext.split('').forEach(function (b, index) {
        var binaryString;
        if (encoding === Encoding.ASCII) {
            binaryString = plaintext.charCodeAt(index).toString(2).padStart(8, '0');
        }
        else {
            binaryString = (0, base64_1.convertBase64ToBinary)(plaintext[index]);
        }
        var positions = [];
        for (var i = 0; i < binaryString.length; i++) {
            if (binaryString[i] === '1') {
                positions.push(i);
            }
        }
        var sum = big_integer_1.default.zero;
        positions.forEach(function (position) {
            if (position < publicKey.length) {
                sum = sum.add(publicKey[position]);
            }
        });
        encryptedList.push(sum);
    });
    return encryptedList;
};
exports.encrypt = encrypt;
var decrypt = function (privateKey, encryptedText, a, n) {
    var decryptedBytes = [];
    var binaryResult = "";
    var inverse = (0, mathUtils_1.getInverseNumber)(a, n);
    for (var _i = 0, encryptedText_1 = encryptedText; _i < encryptedText_1.length; _i++) {
        var cipher = encryptedText_1[_i];
        var decryptedValue = cipher.times(inverse).mod(n);
        var binaryString = (0, exports.getDecryptedBinary)(decryptedValue, privateKey);
        binaryResult += binaryString;
        var decryptedByte = parseInt(binaryString, 2);
        decryptedBytes.push(decryptedByte);
    }
    return { decoded: new Uint8Array(decryptedBytes), binary: binaryResult };
};
exports.decrypt = decrypt;
var getDecryptedBinary = function (number, privateKey) {
    var binaryString = '';
    for (var i = privateKey.length - 1; i >= 0; i--) {
        if (number.greaterOrEquals(privateKey[i])) {
            binaryString += '1';
            number = number.minus(privateKey[i]);
        }
        else {
            binaryString += '0';
        }
    }
    return binaryString.split('').reverse().join('');
};
exports.getDecryptedBinary = getDecryptedBinary;
