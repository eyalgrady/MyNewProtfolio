let scrollContainer = document.querySelector('.slide-content');
let backBtn = document.querySelector('.backBtn');
let nextBtn = document.querySelector('.nextBtn');

scrollContainer.addEventListener('wheel', (event) => {
    event.preventDefault();
    scrollContainer.scrollLeft += event.deltaY;
    scrollContainer.style.scrollBehavior = 'auto';

});

nextBtn.addEventListener('click', () => {
    scrollContainer.scrollLeft += 1120;
});

backBtn.addEventListener('click', () => {
    scrollContainer.style.scrollBehavior = 'smooth';
    scrollContainer.scrollLeft -= 1120;
});

// < !-- ======================= contact ===================== -->

const form = document.querySelector('form');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

function checkInputs() {
    const inputs = document.querySelectorAll('.input-field');

    for (const input of inputs) {
        if (input.value == '') {
            input.classList.add('error');
            input.parentElement.classList.add('error');
        }

        if (inputs[1].value != '') {
            checkEmail();
        }

        inputs[1].addEventListener('keyup', () => {
            checkEmail();
        })


        if (inputs[2].value != '') {
            checkPhoneNumber();
        }
        inputs[2].addEventListener('keyup', () => {
            checkPhoneNumber();
        })

        input.addEventListener('keyup', () => {
            if (input.value != "") {
                input.classList.remove('error');
                input.parentElement.classList.remove('error');
            }
            else {
                input.classList.add('error');
                input.parentElement.classList.add('error');
            }
        })
    }
}

function checkEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    const errorTxtEmail = document.querySelector('.error-txt.email')
    if (!email.value.match(emailRegex)) {
        email.classList.add('error');
        email.parentElement.classList.add('error');

        if (email.value != '') {
            errorTxtEmail.innerText = 'Enter a valid email address'
        } else {
            errorTxtEmail.innerText = "Email Address can't be blank"
        }
    } else {
        email.classList.remove('error');
        email.parentElement.classList.remove('error');
    }
}

function checkPhoneNumber(phoneNumber) {
    const PhoneRegex = /^(0(5[^7]|[2-4]|[8-9]))([\d]{7})$/;
    const errorTxtPhone = document.querySelector('.error-txt.phone')
    if (!phone.value.match(PhoneRegex)) {
        phone.classList.add('error');
        phone.parentElement.classList.add('error');

        if (phone.value != '') {
            errorTxtPhone.innerText = 'Enter a valid Phone Number'
        } else {
            errorTxtPhone.innerText = "Phone Number can't be blank"
        }
    } else {
        phone.classList.remove('error');
        phone.parentElement.classList.remove('error');
    }
}

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${fullName.value}<br> Phone Number: ${phone.value}<br> Message: ${message.value}<br>`
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();

    // if (!fullName.classList.contains('error') && !email.classList.contains('error') && !phone.classList.contains('error') && !subject.classList.contains('error') && !message.classList.contains('error')) {

    //     sendEmail();

    //     form.reset();
    //     return false;
    // }
})