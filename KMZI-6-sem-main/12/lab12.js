const fs = require('fs');
const stream = require("stream");
const {ServerSignShnorr, ClientVerifyShnorr} = require('./ESignatureShnorr');
const {ServerSignElgam, ClientVerifyElgam} = require('./ESignatureElgamal');
const {ServerSignRSA, ClientVerifyRSA} = require('./ESignatureRSA');

SignRSA=()=>{
    text = fs.readFileSync(`${__dirname}/file.txt`, 'utf8');
    const textStream = fs.createReadStream(`${__dirname}/file.txt`);
    const passThrough = new stream.PassThrough({allowHalfOpen: false});
    const passThrough2 = new stream.PassThrough({allowHalfOpen: false});
    console.log("RSA");
    let ss = new ServerSignRSA();
    ss.getSignContext(passThrough2, (signContext) => {
        let response={
            file: text,
            sign: signContext}
        console.log(response);
        let signature = response.sign;
        let txt = response.file;
        console.log(signature)
        let cv = new ClientVerifyRSA();
        cv.verify(signature, txt).then((isVerify) => {
                if (isVerify) {
                    console.log('Fake RSA')
                } else {
                    console.log('Verified RSA')
                }
            }
        )
    });
    textStream.pipe(passThrough);
    textStream.pipe(passThrough2);

}

   
SignShnorr=()=>{
    console.log("SHNORR")
    let text = fs.readFileSync(`${__dirname}/file.txt`, 'utf8');
    let ss = new ServerSignShnorr();
    ss = ss.getSignContext(text);
    let response={
        file: text,
        sign: ss
    }
    console.log(response);
    let signature = response.sign;
    let txt = response.file;
    let cv = new ClientVerifyShnorr();
    cv.verify(signature, txt).then((isVerify) => {
            if (isVerify) {
                console.log('Verified Shnorr')
            } else {
                console.log('Fake Shnorr')
            }
        }
    )
}

SignElGamal=()=>{
    console.log("ELGAMAL")
    text = fs.readFileSync(`${__dirname}/file.txt`, 'utf8');
    const textStream = fs.createReadStream(`${__dirname}/file.txt`);
    const passThrough = new stream.PassThrough({allowHalfOpen: false});
    const passThrough2 = new stream.PassThrough({allowHalfOpen: false});
    const ss = new ServerSignElgam();
    ss.getSignContext(passThrough2, (signContext) => {
        let response={
            file: text,
            sign: signContext
        }
        console.log(response);
        let signature = response.sign;
        let txt = response.file;
        let cv = new ClientVerifyElgam();
        cv.verify(signature, txt).then((isVerify) => {
                if (isVerify) {
                    console.log('Verified ELGAM')
                } else {
                    console.log('Fake ELGAM')
                }
            }
        )
    });
    textStream.pipe(passThrough);
    textStream.pipe(passThrough2);
}
console.time("time")
 //SignShnorr() 
 SignElGamal()
//SignRSA()
console.timeEnd("time")