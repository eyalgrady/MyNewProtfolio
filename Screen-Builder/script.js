const mainContainer = document.querySelector(".main-container");
const createElementContainer = document.querySelector(".create-element-container");
const savedLayoutContainer = document.querySelector(".savedLayout-container");
let savedLayout = document.getElementById('savedLayout');
const header = document.querySelector("header");

let optionsButtons = document.querySelectorAll('.option-button');
let advancedOptionsButtons = document.querySelectorAll('.adv-option-button');
let fontName = document.getElementById('fontName');
let fontSizeRef = document.getElementById('fontSize');
let alignButtons = document.querySelectorAll('.align');
let formatButtons = document.querySelectorAll('.format');
let scriptButtons = document.querySelectorAll('.script');
const bgcInput = document.getElementById('bgcInput');
const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const addBtn = document.getElementById("addBtn");
const splitBtn = document.getElementById("splitBtn");
const deleteBtn = document.getElementById("deleteBtn");

let fontList = [
    'Arial',
    'Vardana',
    'Times New Roman',
    'Garamond',
    'Georgia',
    'Courier New',
    'cursive'
];

// create - element - container
// ---------------------------------

addBtn.addEventListener('click', createRow);

function createRow() {
    myTable = document.createElement('table');
    savedLayout.appendChild(myTable);
    myTable.classList.add("my-table");

    const newRow = myTable.insertRow();
    const cell1 = newRow.insertCell(0);

    newElement = document.createElement('Div');
    newElement.className = 'new-element';
    newElement.textContent = "New Element";
    newElement.setAttribute("contenteditable", true);
    cell1.appendChild(newElement);

    bgcInput.addEventListener('change', () => {
        let elementBgcColor = bgcInput.value;
        newElement.style.backgroundColor = elementBgcColor;
    })

    widthInput.addEventListener('change', () => {
        let width = widthInput.value;
        newElement.style.width = width + "px";
    })

    heightInput.addEventListener('change', () => {
        let height = heightInput.value;
        newElement.style.height = height + "px";
    })
}

splitBtn.addEventListener('click', createCells);

function createCells() {
    const myTable = document.querySelector(".my-table");
    const lastRow = myTable.rows[myTable.rows.length - 1];

    if (lastRow) {
        // Insert cells in the last row
        const cell2 = lastRow.insertCell(1);
        newElement = document.createElement('Div');
        newElement.className = 'new-element';
        newElement.textContent = "New Element";
        newElement.setAttribute("contenteditable", true);
        cell2.appendChild(newElement);
    } else {
        alert("Please create a row first.");
    }
}

deleteBtn.addEventListener('click', deleteElement);

function deleteElement() {
    const lastDiv = savedLayout.lastChild;
    if (lastDiv) {
        savedLayout.removeChild(lastDiv);
    }
}

// text - format
// ---------------------------------


const initializer = () => {

    highlighter(alignButtons, true);
    highlighter(formatButtons, true);
    highlighter(scriptButtons, true);

    fontList.map(value => {
        let option = document.createElement('option');
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    for (let i = 1; i <= 7; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
    button.addEventListener('click', () => {
        modifyText(button.id, false, null);
    })
})

advancedOptionsButtons.forEach((button) => {
    button.addEventListener('change', () => {
        modifyText(button.id, false, button.value);
    })
})


fontColor.addEventListener('change', () => {
    let fontColorv = fontColor.value;
    document.execCommand('color', fontColorv);

    newElement.style.color = fontColorv;
})

const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener('click', () => {
            if (needsRemoval) {
                let alreadyActive = false;

                if (button.classList.contains('active')) {
                    alreadyActive = true;
                }

                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add('active');
                }
            } else {
                button.classList.toggle('active');
            }
        })
    })
}

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove('active');
    })
}

window.onload = initializer();


// save - project
// --------------------------------

const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener('click', saveElement);

function saveElement() {
    newElement.style.border = 'none';

    const elementContent = document.getElementById("savedLayout").innerHTML;

    // localStorage.setItem("savedElement", elementContent);
    localStorage.setItem("savedElement", JSON.stringify(elementContent));

    const jsonString = localStorage.getItem("savedElement");
    const myObject = JSON.parse(jsonString);

    // const savedprojectLayout = document.querySelector(".savedprojectLayout");
    // savedprojectLayout.innerHTML += myObject;

    // savedLayout.innerHTML += localStorage.getItem("savedElement");

    // savedLayout.innerHTML += projectLayout.innerHTML;
    clearFields();
    // addElementdown()
}


function clearFields() {
    // Get references to the input fields
    // const bgcInput = document.getElementById('bgcInput');
    // const widthInput = document.getElementById('widthInput');
    // const heightInput = document.getElementById('heightInput');

    // Clear the values of the input fields
    widthInput.value = '';
    heightInput.value = '';
    bgcInput.value = '';
}