'use strict'

let numbers = [];
const messageEnter = 'Введите пожалуйста число';
const messageWarning = 'Это не число, попробуйте ещё раз';
const messageNoEnter = 'Число не введено';
let input;
let sum = 0;

do {
    input = prompt(messageEnter);
    if (input === null) {
        alert(messageNoEnter);
    } else if (!isNaN(parseFloat(input))) {
      numbers.push(Number(input));  
    } else {
        alert(messageWarning);
    }
} while (input !== null);

if (numbers.length) {
    for (const value of numbers) {
        sum += value;
    }
    alert(`Общая сумма чисел равна ${sum}`);
}
