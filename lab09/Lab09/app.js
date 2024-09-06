"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var asymmetric_1 = require("./asymmetric");
var big_integer_1 = __importDefault(require("big-integer"));
var mathUtils_1 = require("./mathUtils");
var base64_1 = require("./base64");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.redirect('/ascii');
});
app.get("/ascii", function (req, res) {
    var originalText = 'Koktysh Evgenia Sergeevna';
    var firstSequenceElement = (0, mathUtils_1.generateRandomNumber)(100);
    var privateKeyASCII = (0, asymmetric_1.generatePrivateKey)((0, big_integer_1.default)(firstSequenceElement), 8);
    var _a = (0, asymmetric_1.getPublicKeyParams)(privateKeyASCII), a = _a.a, n = _a.n;
    var publicKey = (0, asymmetric_1.generatePublicKey)(privateKeyASCII, a, n);
    var startTime = performance.now();
    var encrypted = (0, asymmetric_1.encrypt)(publicKey, originalText, asymmetric_1.Encoding.ASCII);
    var endTime = performance.now();
    var encodingTime = (endTime - startTime).toFixed(4);
    startTime = performance.now();
    var decrypted = (0, asymmetric_1.decrypt)(privateKeyASCII, encrypted, a, n);
    endTime = performance.now();
    var decodingTime = (endTime - startTime).toFixed(4);
    var decoder = new TextDecoder('utf-8');
    var decodedString = decoder.decode(decrypted.decoded);
    res.render('asymmetric-ascii', {
        originalText: originalText,
        privateKey: privateKeyASCII.join(', '),
        n: n,
        a: a,
        publicKey: publicKey.join(', '),
        encrypted: encrypted.join(', '),
        decrypted: decodedString,
        encodingTime: encodingTime,
        decodingTime: decodingTime
    });
});
app.get("/base64", function (req, res) {
    var originalText = 'Koktysh Evgenia Sergeevna';
    var originalBase64 = (0, base64_1.base64Encode)(originalText);
    var firstSequenceElement = (0, mathUtils_1.generateRandomNumber)(100);
    var privateKeyBase64 = (0, asymmetric_1.generatePrivateKey)((0, big_integer_1.default)(firstSequenceElement), 6);
    var _a = (0, asymmetric_1.getPublicKeyParams)(privateKeyBase64), a = _a.a, n = _a.n;
    var publicKey = (0, asymmetric_1.generatePublicKey)(privateKeyBase64, a, n);
    var startTime = performance.now();
    var encrypted = (0, asymmetric_1.encrypt)(publicKey, originalText, asymmetric_1.Encoding.BASE64);
    var endTime = performance.now();
    var encodingTime = (endTime - startTime).toFixed(4);
    startTime = performance.now();
    var decrypted = (0, asymmetric_1.decrypt)(privateKeyBase64, encrypted, a, n);
    endTime = performance.now();
    var decodingTime = (endTime - startTime).toFixed(4);
    var decodedString = (0, base64_1.convertBinaryToBase64String)(decrypted.binary);
    res.render('asymmetric-base64', {
        originalText: originalBase64,
        privateKey: privateKeyBase64.join(', '),
        n: n,
        a: a,
        publicKey: publicKey.join(', '),
        encrypted: encrypted.join(', '),
        decrypted: decodedString,
        encodingTime: encodingTime,
        decodingTime: decodingTime
    });
});
app.listen(3000, function () { return console.log("Server is running at http://localhost:3000"); });
