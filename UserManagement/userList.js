const userTableBody = document.getElementById("userTableBody");

import { users } from './users.js';

const storedUserData = JSON.parse(localStorage.getItem('newUser'));
users.push(storedUserData);


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

        // users.push(this);
    }
}

// Initialize the table
function initializeTable() {
    users.forEach((user) => {
        addUserToTable(user);
    });
}

function addUserToTable(user) {
    let row = userTableBody.insertRow();

    for (let key in user) {
        let cell = row.insertCell();
        cell.textContent = user[key];
        if (key !== "isLogedIn" && user.isInEditMode == true) {
            cell.setAttribute("contentEditable", "true");
            cell.addEventListener("blur", () => {
                user[key] = cell.textContent;
            });
        }
    }

    let operations = row.insertCell();
    let operationsDiv = document.createElement("div");
    operationsDiv.className = "operationsDiv";

    let statusBtn = document.createElement("button");
    statusBtn.className = "operationsBtn";

    statusBtn.textContent = user.status ? "Online" : "Offline";
    statusBtn.style.backgroundColor = user.status ? "green" : "orange";
    statusBtn.addEventListener("click", () => {
        const logoutConfirmed = confirm('Are you sure you want to logout?');
        if (logoutConfirmed) {
            user.status = !user.status;
            location.href = "./index.html";
        }
        updateStatusOnPage();
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "operationsBtn";
    deleteBtn.style.backgroundColor = "red";
    deleteBtn.textContent = "Delete";


    deleteBtn.addEventListener("click", () => {
        const deleteConfirmed = confirm('Are you sure you want to delete your account?');
        if (deleteConfirmed) {
            alert('Account deleted successfully!');
            localStorage.removeItem(`newUser`);
            location.href = "./index.html";
        }
    });

    let editBtn = document.createElement("button");
    editBtn.className = "operationsBtn";
    editBtn.style.backgroundColor = "blue";
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {
        if (editBtn.textContent === "Edit") {
            row.classList.add("editMode");
            editBtn.textContent = "Save";
            user.isInEditMode = true;

            // חסימת שדות שאין לערוך
            for (let i = 0; i < row.cells.length; i++) {
                let cell = row.cells[i];
                let key = Object.keys(user)[i];
                if (key !== "isLogedIn" && key !== "isLoggedIn") {
                    cell.setAttribute("contentEditable", "true");
                }
            }
        } else {
            row.classList.remove("editMode");
            editBtn.textContent = "Edit";
            user.isInEditMode = false;

            // שחזור חסימת שדות
            for (let i = 0; i < row.cells.length - 1; i++) {
                let cell = row.cells[i];
                let key = Object.keys(user)[i];

                if (key !== "isLogedIn" && key !== "isLoggedIn") {
                    cell.removeAttribute("contentEditable");
                    // שמור את הערך החדש בLocalStorage
                    user[key] = cell.textContent;
                }
            }
        }
    });
    operations.appendChild(statusBtn);
    operations.appendChild(deleteBtn);
    operations.appendChild(editBtn);
    operations.appendChild(operationsDiv);
}

initializeTable();

function updateStatusOnPage() {
    const statusElements = document.querySelectorAll("#userTableBody td:nth-child(5)");
    statusElements.forEach((statusElement, index) => {
        const userStatus = storedUserData.status;
        statusElement.textContent = userStatus.status ? "true" : "false";

        const statusBtn = statusElement.parentElement.querySelector(".operationsBtn");
        statusBtn.style.backgroundColor = userStatus.status ? "green" : "orange";
    });

    // location.href = "./index.html";
}