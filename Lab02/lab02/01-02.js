const express = require('express');
const app = express();

const port = 3000;



app.get('/', (req, res) => {
    let n = 577;
    let m = 540;

    let arr = [];
    nextPrime:
    for (let i = 2; i <= n; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j == 0) continue nextPrime;
        }
        arr.push(i);
    }

    let compaire = (a, b) => {
        let c = b / Math.log(b);
        if (a > c) {
            return `----- ${a},  ${ c}`;
        } else if (c > a) {
            return `Length is less ${a},  ${c}`;
        } else {
            return `Length is equal to ${a},   ${c}`;
        }
    };

    let array = [];
    nextPrime:
    for (m; m <= n; m++) {
        for (let j = 2; j < m; j++) {
            if (m % j == 0) continue nextPrime;
        }
        array.push(m);
    }
    m = 540;

    let eratosthenes = function (n) {
        let array = [],
            upperLimit = Math.sqrt(n),
            output = [];

        for (let i = 0; i < n; i++) {
            array.push(true);
        }

        for (let i = 2; i <= upperLimit; i++) {
            if (array[i]) {
                for (let j = i * i; j < n; j += i) {
                    array[j] = false;
                }
            }
        }

        for (let i = 2; i < n; i++) {
            if (array[i]) {
                output.push(i);
            }
        }

        return output;
    };

    let formatArray = (arr) => {
        let result = '';
        for (let i = 0; i < arr.length; i++) {
            result += arr[i];
            if (i !== arr.length - 1) {
                result += ', ';
            }
            if ((i + 1) % 20 === 0) {
                result += '<br>';
            }
        }
        return result;
    };

    const mul = (a) => {
        let result = '';
        let num = a;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            while (num % i === 0) {
                result += `${i} * `;
                num /= i;
            }
        }
        if (num > 1) {
            result += `${num}`;
        } else {
            result = result.slice(0, -3); 
        }
        return result;
    };
    
    const M = [540];
  const N = [577];
  let p = M.concat(N);
  p = p.toString().replace(/,/g,'');
  
  const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) return false;
    }
    return num > 1;
  }
    
    const NOD = (arg) => {
        for (var x = arg[0], i = 1; i < arg.length; i++) {
            var y = arg[i];
            while (x && y) {
                x > y ? x %= y : y %= x;
            }
            x += y;
        }
        return x;
    }
   

    let NODValue = NOD([m, n]);

    let response = `
        <h1>Задание 1</h1>
        <p>Простые числа [2; ${n}]</p>
        <pre>${formatArray(arr)}</pre>
        <p>Количество простых чисел в интервале[${arr.length}]</p>
        <p>Сравнение с n/ln  [${compaire(arr.length, n)}]</p>

        <h1>Задание 2</h1>
        <p>Простые числа [${m}; ${n}]</p>
        <pre>${formatArray(array)}</pre>
        <p>${compaire(array.length, Math.sqrt(n) / Math.log(Math.sqrt(n)))}</p>

        <h1>Задание 3</h1>
        <p>m: ${mul(m)}</p>
        <p>n: ${mul(n)}</p>

        <h1>Задание 4</h1>
        <p>конкатенация m|n: ${p}</p>
        <p>Является ли простым: ${isPrime(parseInt(p))}</p>
     

        <h1>Задание 5</h1>
        <p>NOD(${m};${n})=${NODValue}</p>
        <p>NOD(3,6,9)=${NOD([4, 2, 0])}</p>
    `;

    res.send(response);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
