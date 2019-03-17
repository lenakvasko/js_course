'use strict';


const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];
const messageError = "Ошибка! Логин должен быть от 4 до 16 символов";
const messageInUse = "Такой логин уже используется!";
const messageSuccess = "Логин успешно добавлен!";

const isLoginValid = function (login) {
    return login.length >= 4 && login.length <= 16;
};

const isLoginUnique = function (login) {
    return logins.includes(login);
}

const addLogin = function (login) {
    if (!isLoginValid(login)) {
        return messageError;
    } else if (!isLoginUnique(login)) {
        logins.push(login);
        return messageSuccess;
    } else {
        return messageInUse;
    }
};



// Вызовы функции для проверки
console.log(addLogin('Ajax')); // 'Логин успешно добавлен!'
console.log(addLogin('robotGoogles')); // 'Такой логин уже используется!'
console.log(addLogin('Zod')); // 'Ошибка! Логин должен быть от 4 до 16 символов'
console.log(addLogin('jqueryisextremelyfast')); // 'Ошибка! Логин должен быть от 4 до 16 символов'