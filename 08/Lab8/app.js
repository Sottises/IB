const express = require('express');
const app = express();

// Функция для генерации ПСП на основе RSA
function generatePseudoRandomSequence(p, q, e, x0, t) {
    const n = p * q;
    let sequence = [];
    let xt = x0;
    for (let i = 0; i < t; i++) {
        xt = (xt ** e) % n;
        sequence.push(xt); // Сохраняем значение xt
    }
    return sequence;
}

// Маршрут для обработки запросов генерации ПСП
app.get('/generate', (req, res) => {
    // Получаем параметры из запроса (p, q, e, x0, t)
    const { p, q, e, x0, t } = req.query;

    // Преобразуем параметры в числа
    const pInt = parseInt(p);
    const qInt = parseInt(q);
    const eInt = parseInt(e);
    const x0Int = parseInt(x0);
    const tInt = parseInt(t);

    // Генерируем ПСП
    const sequence = generatePseudoRandomSequence(pInt, qInt, eInt, x0Int, tInt);

    // Отправляем результат в браузер
    res.send(sequence.join(' '));
});

// Маршрут для обработки запросов к корневому URL
app.get('/', (req, res) => {
    const p = 11;
    const q = 13;
    const e = 7;
    const x0 = 3;
    const t = 10;

    // Генерируем ПСП
    const sequence = generatePseudoRandomSequence(p, q, e, x0, t);

    // Отправляем результат в браузер
    res.send(`Generated pseudo-random sequence based on RSA: ${sequence.join(' ')}`);
});

// Запускаем сервер на порту 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
