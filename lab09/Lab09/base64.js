"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertBinaryToString = exports.convertBinaryToBase64String = exports.convertBase64ToBinary = exports.base64Encode = void 0;
var base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64Encode = function (s) {
    var r = "";
    var p = "";
    var c = s.length % 3;
    if (c > 0) {
        for (; c < 3; c++) {
            p += '=';
            s += "\0";
        }
    }
    for (c = 0; c < s.length; c += 3) {
        if (c > 0 && (c / 3 * 4) % 76 == 0) {
            r += "\r\n";
        }
        var n = (s.charCodeAt(c) << 16) + (s.charCodeAt(c + 1) << 8) + s.charCodeAt(c + 2);
        var chars = [(n >>> 18) & 63, (n >>> 12) & 63, (n >>> 6) & 63, n & 63];
        r += base64chars[chars[0]] + base64chars[chars[1]] + base64chars[chars[2]] + base64chars[chars[3]];
    }
    return r.substring(0, r.length - p.length) + p;
};
exports.base64Encode = base64Encode;
var convertBase64ToBinary = function (base64String) {
    var binaryString = "";
    for (var i = 0; i < base64String.length; i++) {
        var base64Char = base64String[i];
        if (base64Char === "=") {
            binaryString += '0'.repeat(6);
        }
        else {
            var index = base64chars.indexOf(base64Char);
            var charBinary = index.toString(2);
            charBinary = charBinary.length < 6 ? charBinary.padStart(6, '0') : charBinary;
            binaryString += charBinary;
        }
    }
    return binaryString;
};
exports.convertBase64ToBinary = convertBase64ToBinary;
var convertBinaryToBase64String = function (binaryString) {
    var text = (0, exports.convertBinaryToString)(binaryString).replace(/\x00/g, '');
    return (0, exports.base64Encode)(text);
};
exports.convertBinaryToBase64String = convertBinaryToBase64String;
var convertBinaryToString = function (binaryString) {
    var text = '';
    for (var i = 0; i < binaryString.length; i += 8) {
        var byte = binaryString.slice(i, i + 8);
        var charCode = parseInt(byte, 2);
        var char = String.fromCharCode(charCode);
        text += char;
    }
    return text;
};
exports.convertBinaryToString = convertBinaryToString;
