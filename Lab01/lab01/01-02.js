const fs = require('fs');
const http = require('http');

const regExpSimbols = /[ |0-9|,|;|:|\/|'|.|~|"|(|)|=|-|—|^|?|*|&|%|$|#|!|@|+|\||<|>|\\|\r|\n|\t]/g;

const alfabhetBelaryski = 'абвгдеёжзійклмнопрстуўфхцчшыьэюя';
const alfabhetPort = 'abcdefghijklmnopqrstuvwxyz';
const alfabhetBinary = '01';

let firstTask = fs.readFileSync('./text1.txt', 'utf8').toLowerCase().replace(regExpSimbols, '');
let firstTaskPort = fs.readFileSync('./text2.txt', 'utf8').toLowerCase().replace(regExpSimbols, '');
let secondTask = fs.readFileSync('./text3.txt');
let thirdTask = fs.readFileSync('./text3.txt');

let hartley = n => Math.log2(n);          // алгоритм Хартли(количество информации)

let shanon = (str, alphabet) => {
  let entropy = 0;                                                           // Энтропия Шеннона
  for (let i = 0; i < alphabet.length; i++) {    
    const symbol = alphabet.charAt(i);                                     
    const regex = new RegExp(symbol, 'g');                                  
    const probability = (str.match(regex) === null) ? 0 : str.match(regex).length / str.length; 
    console.log(`Symbol: '${symbol}', P(${symbol}) = ${probability}`);
    if (probability !== 0) {
      entropy += probability * Math.log2(probability);
    }
  }
  return -entropy;
};


let FIOBel = "Коктыш Яўгенія Сяргееўна";

let convbinary = (txt) => {
  let str = "";
  for (let i = 0; i < txt.length; i++) {
      str += txt[i].charCodeAt(0).toString(2);
  }
  return str;
}

let FIOlat = "Koktysh Evgenia Sergeevna";

let condEntropy = (p) => {//условная энтропия
  let q = 1 - p;
  let H = (-p * Math.log2(p) - q * Math.log2(q));
  return H;
}

let countInfBinMist = (p, txt) => {
  let count = (1 - condEntropy(p)) * convbinary(txt).length;
  return count;
}


http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    response.write(`\n             Задание 1\n`);
    response.write(`Длина текста = ${firstTask.length}\n`);
    response.write(`Энтропия по Шеннону(бел.): ${shanon(firstTask, alfabhetBelaryski)}\n`);
    response.write(`Энтропия по Хартли(бел.): ${hartley(alfabhetBelaryski.length)}\n`);
    response.write(`Энтропия по Шеннону(порт.): ${shanon(firstTaskPort, alfabhetPort)}\n`);
    response.write(`Энтропия по Хартли(порт.): ${hartley(alfabhetPort.length)}\n`);

    response.write(`\n               Задание 2              \n`);
    response.write('Энтропия бинарного алфавита: ' + shanon(secondTask.toString(), alfabhetBinary) + '\n');

    response.write(`\n               Задание 3            \n`);
    response.write(`Количество информации (порт.): ${FIOBel.length * shanon(FIOBel, alfabhetBelaryski)} \n`);
    response.write(`Количество информации (binary): ${convbinary(FIOBel).length * shanon(convbinary(FIOBel), alfabhetBinary)}\n`);
    response.write(`Количество информации (бел.): ${FIOlat.length * shanon(FIOlat, alfabhetPort)} \n`);
    response.write(`Количество информации (binary): ${convbinary(FIOlat).length * shanon(convbinary(FIOlat), alfabhetBinary)}\n`);

    response.write(`\n                Задание 4\n`);
    response.write(`FIOBel if p=0.1: ${countInfBinMist(0.1,FIOBel)}\n`);
   response.write(`FIOBel if p=0.5: ${countInfBinMist(0.5,FIOBel)}\n`);
    response.write(`FIOBel if p=1: ${countInfBinMist(0.99999999999,FIOBel)}\n`);

  
    
    response.write(`FIOlat if p=0.1: ${countInfBinMist(0.1,FIOlat)}\n`);
    response.write(`FIOlat if p=0.5: ${countInfBinMist(0.5,FIOlat)}\n`);
    response.write(`FIOlat if p=1: ${countInfBinMist(0.99999999999,FIOlat)}\n`);

    response.end();
}).listen(3000);


console.log('Server running at http://localhost:3000/');
