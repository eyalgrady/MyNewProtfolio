
const userFirstName = document.getElementById('userFirstName');
const userLaststName = document.getElementById('userLaststName');
const userEmail = document.getElementById('userEmail');
const userPass = document.getElementById('userPass');
const form = document.querySelector('form');
const loginBtn = document.getElementById('loginBtn');
const registrationForm = document.getElementById('registrationForm');
const container = document.querySelector('.main-container');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

// let numberOfUsers = -1;

import { users } from './users.js';


registerLink.addEventListener('click', () => {
    container.classList.add('active');
})

loginLink.addEventListener('click', () => {
    container.classList.remove('active');
})

class User {
    firstName;
    lastName;
    email;
    password;
    status;

    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.status = false;

        users.push(this);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newUser = new User(userFirstName.value, userLaststName.value, userEmail.value, userPass.value);

    localStorage.setItem("newUser", JSON.stringify(newUser));

    registrationForm.reset();
})


loginBtn.onclick = function (event) {
    event.preventDefault();

    const storedUserData = JSON.parse(localStorage.getItem('newUser'));
    const getEmail = storedUserData.email;
    const getPwd = storedUserData.password;

    const loginEmail = document.getElementById('loginEmail').value;
    const loginPass = document.getElementById('loginPass').value;

    if (loginEmail == '' && loginPass == '') {
        alert('ERROR: Missing details');
    } else if (loginEmail == getEmail && loginPass == getPwd) {
        window.location.href = './userList.html';
    } else {
        alert('ERROR: Wrong details');
    }
}

