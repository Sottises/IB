const express = require('express');
const app = express();
const port = 3000;

function changeSl(arr) {
  const x = arr.slice(1, arr.length);
  x.push(arr[0]);
  return x;
}

function encoding(message, a, b, c) {
  let rotorBeta = Array.from('LEYJVCNIXWPBQMDRTAKZGFUHOS');
  let rotorGamma = Array.from('FSOKANUERHMBTIYCWLQPZXVGJD');
  let rotorV = Array.from('VZBRGITYUPSDNHLXAWMJQOFECK');
  let reflectorB = Array.from('ENKQAUYWJICOPBLMDXZVFTHRGS');
  let alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  for (let i = 0; i < a; i++) {
    rotorBeta = changeSl(rotorBeta);
  }
  for (let i = 0; i < b; i++) {
    rotorGamma = changeSl(rotorGamma);
  }
  for (let i = 0; i < c; i++) {
    rotorV = changeSl(rotorV);
  }

  let ind;
  let result = [];

  ind = rotorV[alphabet.indexOf(message[0])];
  ind = rotorGamma[alphabet.indexOf(ind)];
  ind = rotorBeta[alphabet.indexOf(ind)];
  ind = reflectorB[alphabet.indexOf(ind)];
  ind = alphabet[rotorBeta.indexOf(ind)];
  ind = alphabet[rotorGamma.indexOf(ind)];
  ind = alphabet[rotorV.indexOf(ind)];
  result.push(ind);

  for (let i = 1; i < message.length; i++) {
    rotorBeta = changeSl(rotorBeta);
    rotorGamma = changeSl(rotorGamma);

    ind = rotorV[alphabet.indexOf(message[i])];
    ind = rotorGamma[alphabet.indexOf(ind)];
    ind = rotorBeta[alphabet.indexOf(ind)];
    ind = reflectorB[alphabet.indexOf(ind)];
    ind = alphabet[rotorBeta.indexOf(ind)];
    ind = alphabet[rotorGamma.indexOf(ind)];
    ind = alphabet[rotorV.indexOf(ind)];
    result.push(ind);
  }
  return result.join('');
}

function decoding(message, a, b, c) {
  let rotorBeta = Array.from('LEYJVCNIXWPBQMDRTAKZGFUHOS');
  let rotorGamma = Array.from('FSOKANUERHMBTIYCWLQPZXVGJD');
  let rotorV = Array.from('VZBRGITYUPSDNHLXAWMJQOFECK');
  let reflectorB = Array.from('ENKQAUYWJICOPBLMDXZVFTHRGS');
  let alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  for (let i = 0; i < a; i++) {
    rotorBeta = changeSl(rotorBeta);
  }
  for (let i = 0; i < b; i++) {
    rotorGamma = changeSl(rotorGamma);
  }
  for (let i = 0; i < c; i++) {
    rotorV = changeSl(rotorV);
  }

  let ind;
  let result = [];

  ind = rotorV[alphabet.indexOf(message[0])];
  ind = rotorGamma[alphabet.indexOf(ind)];
  ind = rotorBeta[alphabet.indexOf(ind)];
  ind = reflectorB[alphabet.indexOf(ind)];
  ind = alphabet[rotorBeta.indexOf(ind)];
  ind = alphabet[rotorGamma.indexOf(ind)];
  ind = alphabet[rotorV.indexOf(ind)];
  result.push(ind);

  for (let i = 1; i < message.length; i++) {
    rotorBeta = changeSl(rotorBeta);
    rotorGamma = changeSl(rotorGamma);

    ind = rotorV[alphabet.indexOf(message[i])];
    ind = rotorGamma[alphabet.indexOf(ind)];
    ind = rotorBeta[alphabet.indexOf(ind)];
    ind = reflectorB[alphabet.indexOf(ind)];
    ind = alphabet[rotorBeta.indexOf(ind)];
    ind = alphabet[rotorGamma.indexOf(ind)];
    ind = alphabet[rotorV.indexOf(ind)];
    result.push(ind);
  }
  return result.join('');
}

// Главная страница
app.get('/', (req, res) => {
  let results = ""; // Инициализируем переменную для хранения результатов

  // Выводим результат для набора 0-2-2
  results += "0,2,2\n";
  results += "Decoded: " + encoding("KOKTYSHEVGENIASERGEEVNA", 0, 2, 2) + "\n";
  results += "Encoded: " + decoding(encoding("KOKTYSHEVGENIASERGEEVNA", 0, 2, 2), 0, 2, 2) + "\n\n";

  // Применяем 4 случайных набора параметров для установок роторов
  for (let i = 0; i < 4; i++) {
    const a = Math.floor(Math.random() * 3); // Случайное целое число от 0 до 25
    const b = Math.floor(Math.random() * 3); // Случайное целое число от 0 до 25
    const c = Math.floor(Math.random() * 3); // Случайное целое число от 0 до 25

    // Создаем строку с результатом для текущих установок роторов
    results += `${a},${b},${c}\n`;
    results += "Decoded: " + encoding("KOKTYSHEVGENIASERGEEVNA", a, b, c) + "\n";
    results += "Encoded: " + decoding(encoding("KOKTYSHEVGENIASERGEEVNA", a, b, c), a, b, c) + "\n\n";
  }

  res.send(results); // Отправляем результаты на клиент
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
