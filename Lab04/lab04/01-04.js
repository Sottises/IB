const http = require('http');
const fs = require('fs');
const url = require('url');
const { performance } = require('perf_hooks');

function Get(text) {
    let frequency = {};
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (frequency[char]) {
            frequency[char]++;
        } else {
            frequency[char] = 1;
        }
    }
    for (let char in frequency) {
        console.log(`Символ: ${char}, Частота: ${frequency[char]}\n`);
    }
    console.log('\n');

}

function caesarEncrypt(text, keyword, alphabet) {
    let encryptedText = '';
    let keywordIndex = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);
        let charIndex = alphabet.indexOf(char);

        if (charIndex === -1) {
            encryptedText += char;
            continue;
        }

        let keywordChar = keyword[keywordIndex % keyword.length];
        let shift = alphabet.indexOf(keywordChar);

        let encryptedIndex = (charIndex + shift) % alphabet.length;
        encryptedText += alphabet[encryptedIndex];

        keywordIndex++;
    }

    Get(encryptedText);

    return encryptedText;
}

function caesarDecrypt(text, keyword, alphabet) {
    let decryptedText = '';
    let keywordIndex = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);
        let charIndex = alphabet.indexOf(char);

        if (charIndex === -1) {
            decryptedText += char;
            continue;
        }

        let keywordChar = keyword[keywordIndex % keyword.length];
        let shift = alphabet.indexOf(keywordChar);

        let decryptedIndex = (charIndex - shift + alphabet.length) % alphabet.length;
        decryptedText += alphabet[decryptedIndex];

        keywordIndex++;
    }

    return decryptedText;
}

class Cipher {
    constructor(alphabet) {
        this.alphabet = alphabet;
    }

    getCodeTable(alphabet) {
        let count = 1;
        const resultArr = new Array(alphabet.length).fill(null).map(() => new Array(alphabet.length));

        for (let i = 0; i < alphabet.length; i++) {
            for (let j = 0; j < alphabet.length; j++) {
                if (count < 10) {
                    resultArr[i][j] = "00" + count;
                    count++;
                } else if (count < 100) {
                    resultArr[i][j] = "0" + count;
                    count++;
                } else {
                    resultArr[i][j] = String(count);
                    count++;
                }
            }
        }

        return resultArr;
    }

    codePort(fileText) {
        let result = "";
        let codeTable = this.getCodeTable(this.alphabet);

        if (fileText.length % 2 !== 0)
            fileText += this.alphabet[0];

        for (let i = 0; i < fileText.length - 1; i += 2) {
            let row = this.alphabet.indexOf(fileText[i]);
            let column = this.alphabet.indexOf(fileText[i + 1]);

            result += codeTable[row][column] + ' ';
        }

        return result;
    }

    decodePort(fileText) {
        let result = "";
        let charFromFileText = fileText.split(' ');
        let codeTable = this.getCodeTable(this.alphabet);

        for (let i = 0; i < charFromFileText.length; i++) {
            if (charFromFileText[i] === "\r\n")
                break;
            for (let r = 0; r < this.alphabet.length; r++) {
                for (let c = 0; c < this.alphabet.length; c++) {
                    if (charFromFileText[i] === codeTable[r][c]) {
                        result += this.alphabet[r] + this.alphabet[c];
                        break;
                    }
                }
            }
        }
        return result;
    }

    countChar(fileText) {
        let count = new Array(this.alphabet.length).fill(0);
        fileText = fileText.toUpperCase();
        for (let i = 0; i < this.alphabet.length; i++) {
            count[i] = fileText.split(this.alphabet[i]).length - 1;
        }
        return count;
    }

    handleRequest(request, response) {
        const parsedUrl = url.parse(request.url, true);

        if (parsedUrl.pathname === '/process') {
            let text = fs.readFileSync("text.txt", "utf-8").toUpperCase().replace(/[^А-Я]+/g, '');
            const cipher = new Cipher(this.alphabet);

            const t0 = performance.now();

            Get(text);

            let codedText = cipher.codePort(text);
            let decodedText = cipher.decodePort(codedText);

            const encryptionTime = performance.now() - t0;

            const t1 = performance.now();
            let decodedTextPort = cipher.decodePort(codedText);
            const decryptionTime = performance.now() - t1;

            fs.writeFileSync("codedText.txt", codedText);
            fs.writeFileSync("decodedText.txt", decodedText);

            const keyword = "КОКТЫШ";

            const t0EncryptionCaesar = performance.now();
            let encryptedTextCaesar = caesarEncrypt(text, keyword, this.alphabet);
            const encryptionTimeCaesar = performance.now() - t0EncryptionCaesar;

            const t0DecryptionCaesar = performance.now();
            let decryptedTextCaesar = caesarDecrypt(encryptedTextCaesar, keyword, this.alphabet);
            const decryptionTimeCaesar = performance.now() - t0DecryptionCaesar;

            fs.writeFileSync("encrCaesar.txt", encryptedTextCaesar);
            fs.writeFileSync("decrCaesar.txt", decryptedTextCaesar);

            Get(decodedTextPort);

            Get(decryptedTextCaesar);

            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({
                codedText,
                decodedText,
                executionTime: encryptionTime,
                decryptionTime,
                codedTextCaesar: encryptedTextCaesar,
                decodedTextCaesar: decryptedTextCaesar,
                executionTimeCaesar: {
                    encryption: encryptionTimeCaesar,
                    decryption: decryptionTimeCaesar
                },
                totalEncryptionTime: encryptionTime + encryptionTimeCaesar,
                totalDecryptionTime: decryptionTime + decryptionTimeCaesar
            }));
        } else {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('404 Not Found');
        }
    }
}

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);

    if (parsedUrl.pathname === '/') {
        fs.readFile('lab4.html', (err, data) => {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('404 Not Found');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            }
        });
    } else if (parsedUrl.pathname === '/process') {
        const cipher = new Cipher("АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ");
        cipher.handleRequest(request, response);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000/');
});
