const ElGamal = require("elgamal");
const NodeRSA = require('node-rsa');
const Crypto = require('./elgamal');
const fs = require("fs");

function moduloMultiplication(a, x, n) {  
    let result = BigInt(1);
    let temp = BigInt(a);
    while (x > BigInt(0)) {    
        if (x & BigInt(1)) {
            result = (result * temp) % BigInt(n);    
        }
        temp = (temp * temp) % BigInt(n);    
        x >>= BigInt(1);
        setTimeout(() => {}, 100);
    }
    return result;
}

function runModuloMultiplication() {
    const aValues = [5, 10, 15, 20, 25, 30, 35];  
    const xValues = [1000000007n, 1000000009n, 1000000021n, 1000000033n, 1000000087n];
    const nValues = [20000000000n, 40000000000n];
    for (const a of aValues) {    
        for (const x of xValues) {
            for (const n of nValues) {
                const startTime = process.hrtime.bigint();        
                const y = moduloMultiplication(a, x, n);
                const endTime = process.hrtime.bigint();        
                const elapsedTime = (endTime - startTime) / BigInt(1e6); // Время в миллисекундах
                console.log(`a = ${a}, x = ${x}, n = ${n.toString(2)}, y = ${y}, time = ${elapsedTime} ms`);
            }    
        }
    }
}

runModuloMultiplication();

var Alphabet = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ π®ƒ©∆";
Alphabet = Alphabet.split("");

let Alice ;
let Bob ;

//ElGamal
Alice = Crypto(Alphabet, 69);
Bob = Crypto(Alphabet, 69);
var message1 = "Koktysh"
message1 = Alice.encrypt(message1, Bob.pubKey);
fs.writeFileSync("enc-elgamal.txt", message1);
fs.writeFileSync("dec-elgamal.txt", Bob.decrypt(fs.readFileSync("enc-elgamal.txt").toString()));

function runRSA() {
    console.log("RSA:")
    console.time('Key generation');
    const key = new NodeRSA({b: 2048});
    console.timeEnd('Key generation');
    const text = 'Buranko Valeria Dmitrievna';
    console.time('Encryption');
    const encrypted = key.encrypt(text, 'base64');
    console.timeEnd('Encryption');
    fs.writeFileSync("enc-RSA.txt", encrypted);
    console.time('Decryption');
    const decrypted = key.decrypt(encrypted, 'utf8');
    console.timeEnd('Decryption');
    fs.writeFileSync("dec-RSA.txt", decrypted);
}

async function runElGamal() {
    console.log("ELGAMAL:")
    console.time('Key generation');
    const eg = await ElGamal.default.generateAsync(2048);
    console.timeEnd('Key generation');
    const secret = 'Koktysh';
    console.time('Encryption');
    const encrypted = await eg.encryptAsync(secret);
    console.timeEnd('Encryption');
    console.time('Decryption');
    const decrypted = await eg.decryptAsync(encrypted);
    console.timeEnd('Decryption');
}

runRSA();
runElGamal();
