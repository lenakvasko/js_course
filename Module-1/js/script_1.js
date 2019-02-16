'use strict';

//First part//

const adminLogin = 'Kvasko';
const adminPass = 'password';

const messageCancel = 'Отменено пользователе!';
const messageProhibited = 'Доступ запрещён, неверный логин!';
const messageWelcome = 'Добро пожаловать!';

let userName = prompt('Введите свой логин:');

if (userName === null) {
    alert(messageCancel);
} else if (userName === adminLogin) {
    let pass = prompt('Введите пароль:');

    if (pass === null) {
        alert(messageCancel);
    } else if (pass === adminPass) {
        alert(messageWelcome);
    } else {
        alert(messageProhibited);
    }
} else {
    alert(messageProhibited);
}
