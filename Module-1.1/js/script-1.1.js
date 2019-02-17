'use strict';

//Second part (extra hw Module-1)

const sharm = 15;
const hurgada = 25;
const taba = 6;

const countOfGuests = Number(prompt('Введите количество необходимых мест в туре:'));
const isInteger = Number.isInteger(countOfGuests);
let status = false;

if (!isInteger || countOfGuests <= 0) {
    alert('Ошибка ввода!!!');
} else if (countOfGuests === null) {
    alert('Нам очень жаль, приходите ещё!');
} else {
    if (!status && countOfGuests <= hurgada) {
        status = confirm('Данное количество мест есть в туре Hurgada, вы согласны?');

        if (status) {
            alert('Приятного путешествия в туре Hurgada!');
        } else {
            alert('Нам очень жаль, приходите ещё!');
        }
    }

    if (!status && countOfGuests <= sharm) {
        status = confirm('Данное количество мест есть в туре Sharm, вы согласны?');

        if (status) {
            alert('Приятного путешествия в туре Sharm!');
        } else {
            alert('Нам очень жаль, приходите ещё!');
        }
    }
    
    if (!status && countOfGuests <= taba) {
        status = confirm('Данное количество мест есть в туре Taba, вы согласны?');

        if (status) {
            alert('Приятного путешествия в туре Taba!');
        } else {
            alert('Нам очень жаль, приходите ещё!');
        }
    }

    if (!status && countOfGuests >= hurgada && countOfGuests >= sharm && countOfGuests >= taba) {
        alert('Извините, столько мест нет ни в одном туре!!!');
    }
}

