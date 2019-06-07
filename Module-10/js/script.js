'use strict';

const showGetAll = document.querySelector('.show_get-all-users');
const showAddedUser = document.querySelector('.show_add_user');
const showUserById = document.querySelector('.show_user-by-id');
const showUpdatedUser = document.querySelector('.show_up');
/*
const btnGetAll = document.querySelector('.btn_get-all-users');
const btnAddUser = document.querySelector('.btn_add');
const btnGetUserById = document.querySelector('.btn_user-by-id');
const btnEditUserById = document.querySelector('.btn_up');
const btnDeleteUserById = document.querySelector('.btn_del');*/

const inputUserById = document.querySelector('.input_user-by-id');
const inputNewName = document.querySelector('.input_add-user-name');
const inputNewAge = document.querySelector('.input_add-user-age');
const inputDeleteUserById = document.querySelector('.input_del-ID');

const inputUserIdToUpdate = document.querySelector('.input_up-id');
const inputNewUserName = document.querySelector('.input_up-name');
const inputNewUserAge = document.querySelector('.input_up-age');

const notifyDataDeleted = document.querySelector('.result_del');

const url = 'https://test-users-api.herokuapp.com/users/';

/*btnGetAll.addEventListener("click", getAllUsers);
btnAddUser.addEventListener('click', addUser);
btnGetUserById.addEventListener('click', getUser);
btnEditUserById.addEventListener('click', editUser);
btnDeleteUserById.addEventListener('click', deleteUser);*/

const btn = document.body;

btn.addEventListener("click", handleBtnClick);

function handleBtnClick(event) {
    const target = event.target;

    if (target.nodeName !== "BUTTON") return;

    switch (target.id) {
        case 'getAllUsers':
            getAllUsers(target);
            break;
        case 'addUser':
            addUser(target);
            break;
        case 'getUser':
            getUser(target);
            break;
        case 'editUser':
            editUser(target);
            break;
        case 'deleteUser':
            deleteUser(target);
            break;
    }
}

function getAllUsers(evt) {
    fetch(url)
        .then(response => response.json())
        .then(data => addingAll(data))
        .catch(error => console.log(error));
}

function addUser(evt) {
    const post = {
        name: `${inputNewName.value}`,
        age: `${Number(inputNewAge.value)}`
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then(data => addingNameAge(data))
        .catch(error => console.log(error));
    clearInput(inputNewName, inputNewAge);
}

function getUser(evt) {
    fetch(`${url}${inputUserById.value}`)
        .then(response => response.json())
        .then(data => addingById(data))
        .catch(error => console.log(error));
    clearInput(inputUserById);
}

function editUser(evt) {
    let update = {};
    if (inputNewUserName.value === '' || inputNewUserAge.value === '') {
        return alert("Error");
    } else {
        update.name = inputNewUserName.value;
        update.age = inputNewUserAge.value;
    }
    console.log(update);
    fetch(`${url}${inputUserIdToUpdate.value}`, {
        method: 'PUT',
        body: JSON.stringify(update),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())
        .then(data => addingUpdate(data))
        .catch(error => console.log(error));
    clearInput(inputNewUserName, inputNewUserAge, inputUserIdToUpdate);
}

function deleteUser(evt) {
    fetch(`${url}${inputDeleteUserById.value}`, {
        method: 'DELETE'
    })
        .then(response => respStatus(response.status))
        .catch(error => console.log(error));
    clearInput(inputDeleteUserById);
}




function addingAll(data) {
    deleteAll();
    const HTMLString = data.data.reduce((acc, el) => acc += createTable(el), '');
    showGetAll.insertAdjacentHTML('afterbegin', `${HTMLString}`);
}

function addingById(data) {
    deleteAll();
    const HTMLString = createTable(data.data);
    showUserById.insertAdjacentHTML('afterbegin', `${HTMLString}`);
}

function addingNameAge(data) {
    deleteAll();
    const HTMLString = createTable(data.data);
    showAddedUser.insertAdjacentHTML('afterbegin', `${HTMLString}`);
}

function addingUpdate(data) {
    deleteAll();
    const HTMLString = createTable(data.data);
    showUpdatedUser.insertAdjacentHTML('afterbegin', `${HTMLString}`);
}


function createTable({id, name, age}) {
    return `<tr>
        <td class="id">${id}</td>
        <td class="name">${name}</td>
        <td class="age">${Number(age)}</td>
      </tr>`;
}

function respStatus(status) {
    notifyDataDeleted.innerHTML = status === 200 ?
        `${inputDeleteUserById.value} user deleted` :
        'Something went wrong'
}

function deleteAll() {
    notifyDataDeleted.innerHTML = '';
    showUpdatedUser.innerHTML = '';
    showAddedUser.innerHTML = '';
    showUserById.innerHTML = '';
    showGetAll.innerHTML = '';
}

function clearInput(...inputs) {
    inputs.forEach(input => input.value = "");
}