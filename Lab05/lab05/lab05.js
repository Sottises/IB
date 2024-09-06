const http = require('http');
const fs = require('fs');
const url = require('url');
const { performance } = require('perf_hooks');

function probability(txt, alphabet) {
    let prob = {}
    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet.charAt(i);
        regExp = new RegExp(letter, 'g');
        if (txt.match(regExp) === null) {
            p = 0;
        } else {
            p = txt.match(regExp).length / txt.length;
        }
        prob[letter] = p
    }
    return prob;
}

function get2dimensional(array, limit) {
    const array2 = [];
    let section;

    for (const [index, element] of array.entries()) {
        if (index % limit === 0) array2.push(section = []);
        section.push(element);
    }

    return array2;
}

//25x25
let alphabet = "АБВГДЕЖЗИЙКЛМНПРОСТУФХЦЧШЩЪЫЬЭЮЯ";
let text = fs.readFileSync("text.txt", { encoding: 'utf8' }).toString().toUpperCase().replace(/[^А-Я]+/g, '').slice(0, 625);
let txt = get2dimensional(Array.from(text), 25);

function spiral(array) {
    var exitArray = [];
    while (array.length) {
        exitArray.push(...array.shift());

        array.map(row => exitArray.push(row.pop()));

        array.reverse().map(row => row.reverse());
    }
    return exitArray;
}

function despiral(mas, w, h) {
    let result = new Array(h).fill().map(() => new Array(w).fill(''));
    let counter = 0;
    let startCol = 0;
    let endCol = w - 1;
    let startRow = 0;
    let endRow = h - 1;
    while (startCol <= endCol && startRow <= endRow) {
        for (let i = startCol; i <= endCol; i++) {
            result[startRow][i] = mas[counter];
            counter++;
        }
        startRow++;
        for (let j = startRow; j <= endRow; j++) {
            result[j][endCol] = mas[counter];
            counter++;
        }

        endCol--;

        for (let i = endCol; i >= startCol; i--) {
            result[endRow][i] = mas[counter];
            counter++;
        }

        endRow--;
        for (let i = endRow; i >= startRow; i--) {
            result[i][startCol] = mas[counter];
            counter++;
        }

        startCol++;
    }

    return result;
}

function crypt(message, colsKey, rowsKey) {
    var result = [];

    var colsCount = colsKey.length;
    var rowsCount = rowsKey.length;
    for (var row = 0; row < rowsCount; row++) {
        for (var col = 0; col < colsCount; col++) {
            var newCol = colsKey[col] - 1;
            var newRow = rowsKey[row] - 1;
            result[newRow * colsCount + newCol] = message[row * colsCount + col];
        }
    }

    return result;
}

function decrypt(message, colsKey, rowsKey) {
    var result = [];

    var colsCount = colsKey.length;
    var rowsCount = rowsKey.length;
    for (var row = 0; row < rowsCount; row++) {
        for (var col = 0; col < colsCount; col++) {
            var newCol = colsKey[col] - 1;
            var newRow = rowsKey[row] - 1;
            result[row * colsCount + col] = message[newRow * colsCount + newCol];
        }
    }
    return result;
}

let encryptedSpiralText, decryptedSpiralText, encryptedMultText, decryptedMultText;
let encryptionTimeSpiral, decryptionTimeSpiral, encryptionTimeMult, decryptionTimeMult;

function runEncryptionDecryption() {
    const t0EncryptionSpiral = performance.now();
    encryptedSpiralText = spiral(txt).join('').replace(/[^А-Я]+/g, '');
    encryptionTimeSpiral = performance.now() - t0EncryptionSpiral;

    fs.writeFileSync("spiral.txt", encryptedSpiralText, { encoding: 'utf8' });

    const t0DecryptionSpiral = performance.now();
    decryptedSpiralText = despiral(Array.from(encryptedSpiralText), 25, 25).toString().replace(/[^А-Я]+/g, '');
    decryptionTimeSpiral = performance.now() - t0DecryptionSpiral;

    fs.writeFileSync("despiral.txt", decryptedSpiralText, { encoding: 'utf8' });

    const t0EncryptionMult = performance.now();
    encryptedMultText = crypt(text, '3124657', "132465").join('').replace(/[^А-Я]+/g, '');
    encryptionTimeMult = performance.now() - t0EncryptionMult;

    fs.writeFileSync("mult.txt", encryptedMultText, { encoding: 'utf8' });

    const t0DecryptionMult = performance.now();
    decryptedMultText = decrypt(encryptedMultText, '3124657', "132465").join('').replace(/[^А-Я]+/g, '');
    decryptionTimeMult = performance.now() - t0DecryptionMult;

    fs.writeFileSync("demult.txt", decryptedMultText, { encoding: 'utf8' });

    console.log("Encryption time for Spiral Cipher:", encryptionTimeSpiral, "milliseconds");
    console.log("Decryption time for Spiral Cipher:", decryptionTimeSpiral, "milliseconds");
    console.log("Encryption time for Multiple Permutation Cipher:", encryptionTimeMult, "milliseconds");
    console.log("Decryption time for Multiple Permutation Cipher:", decryptionTimeMult, "milliseconds");
}

runEncryptionDecryption();

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);

    if (parsedUrl.pathname === '/') {
        let html = `
            <html>
            <head><title>Encryption and Decryption Results</title></head>
            <body>
                <h1>TASK 1: THE SPIRAL CIPHER</h1>
                <h2>Encryption:</h2>
                <p>Encrypted Spiral Text: ${encryptedSpiralText}</p>
                <h2>Decryption:</h2>
                <p>Decrypted Spiral Text: ${decryptedSpiralText}</p>
                <h1>TASK 2: THE MULTIPLE PERMUTATION CIPHER</h1>
                <h2>Encryption:</h2>
                <p>Encrypted Multiple Permutation Text: ${encryptedMultText}</p>
                <h2>Decryption:</h2>
                <p>Decrypted Multiple Permutation Text: ${decryptedMultText}</p>
                <h1>Encryption and Decryption Time</h1>
                <p>Encryption time for Spiral Cipher: ${encryptionTimeSpiral} milliseconds</p>
                <p>Decryption time for Spiral Cipher: ${decryptionTimeSpiral} milliseconds</p>
                <p>Encryption time for Multiple Permutation Cipher: ${encryptionTimeMult} milliseconds</p>
                <p>Decryption time for Multiple Permutation Cipher: ${decryptionTimeMult} milliseconds</p>
            </body>
            </html>
        `;

        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(html);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

