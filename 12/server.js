// server.js
const express = require('express');
const fs = require('fs');
const multer  = require('multer');
const { ServerSignShnorr, ClientVerifyShnorr } = require('./ESignatureShnorr');
const { ServerSignElgam, ClientVerifyElgam } = require('./ESignatureElgamal');
const { ServerSignRSA, ClientVerifyRSA } = require('./ESignatureRSA');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle file upload and signature verification
app.post('/signAndVerify', upload.single('file'), (req, res) => {
    const file = fs.readFileSync(req.file.path, 'utf8');

    // Perform signature and verification
    let result = '';

    // Shnorr
    const shnorrServer = new ServerSignShnorr();
    const shnorrSignature = shnorrServer.getSignContext(file);
    const shnorrClient = new ClientVerifyShnorr();
    const shnorrVerification = shnorrClient.verify(shnorrSignature, file);
    result += `Shnorr: ${shnorrVerification ? 'Verified' : 'Fake'}\n`;

    // ElGamal
    const elgamalServer = new ServerSignElgam();
    const elgamalSignature = elgamalServer.getSignContext(file);
    const elgamalClient = new ClientVerifyElgam();
    const elgamalVerification = elgamalClient.verify(elgamalSignature, file);
    result += `ElGamal: ${elgamalVerification ? 'Verified' : 'Fake'}\n`;

    // RSA
    const rsaServer = new ServerSignRSA();
    const rsaSignature = rsaServer.getSignContext(file);
    const rsaClient = new ClientVerifyRSA();
    const rsaVerification = rsaClient.verify(rsaSignature, file);
    result += `RSA: ${rsaVerification ? 'Verified' : 'Fake'}`;

    // Send result to client
    res.send(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
