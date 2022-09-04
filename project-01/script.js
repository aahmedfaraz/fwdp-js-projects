// DOM Elements
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// All Functions
// 1 - Function to check field length
const checkLength = (field, min, max) => {
    const text = field.value.trim();
    if(text === "")
        return;
    const fieldName = field.id.charAt(0).toUpperCase() + field.id.slice(1);
    if(text.length < min) {
        const small = field.parentNode.querySelector('small');
        small.innerHTML = `${fieldName} must be larger than ${min} characters.`;
        if(field.parentNode.classList.contains('success'))
            field.parentNode.classList.remove('success')
        if(!field.parentNode.classList.contains('error'))
            field.parentNode.classList.add('error')
        return;
    }
    if(text.length > max) {
        const small = field.parentNode.querySelector('small');
        small.innerHTML = `${fieldName} must be smaller than ${max} characters.`;
        if(field.parentNode.classList.contains('success'))
            field.parentNode.classList.remove('success')
        if(!field.parentNode.classList.contains('error'))
            field.parentNode.classList.add('error')
        return;
    };
    const small = field.parentNode.querySelector('small');
    small.innerHTML = "";
    if(field.parentNode.classList.contains('error'))
        field.parentNode.classList.remove('error')
    if(!field.parentNode.classList.contains('success'))
        field.parentNode.classList.add('success')
}

// 2 - Function to match password
const matchThem = (field1, field2) => {
    if(field2.value.trim() === "")
        return;
    if(field1.value === field2.value) {
        const small = field2.parentNode.querySelector('small');
        small.innerHTML = "";
        if(field2.parentNode.classList.contains('error'))
            field2.parentNode.classList.remove('error')
        if(!field2.parentNode.classList.contains('success'))
            field2.parentNode.classList.add('success')
    } else {
        const small = field2.parentNode.querySelector('small');
        small.innerHTML = "Passwords are not matching.";
        if(field2.parentNode.classList.contains('success'))
            field2.parentNode.classList.remove('success')
        if(!field2.parentNode.classList.contains('error'))
            field2.parentNode.classList.add('error')
    }
}

// 3 - Function to check if data is available
const checkAvailability = (field) => {
    const fieldName = field.id.charAt(0).toUpperCase() + field.id.slice(1);
    if(field.value.trim() === '') {
        const small = field.parentNode.querySelector('small');
        small.innerHTML = `Please enter ${fieldName}.`;
        if(field.parentNode.classList.contains('success'))
            field.parentNode.classList.remove('success')
        if(!field.parentNode.classList.contains('error'))
            field.parentNode.classList.add('error')
        return false;
    }
}

// 4 - Function to validate email
const validateEmail = (field) => {
    if(field.value.trim() === "")
        return;
    const email = field.value.trim();
    const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(email.match(regex)){
        const small = field.parentNode.querySelector('small');
        small.innerHTML = "";
        if(field.parentNode.classList.contains('error'))
            field.parentNode.classList.remove('error')
        if(!field.parentNode.classList.contains('success'))
            field.parentNode.classList.add('success')
    } else {
        const small = field.parentNode.querySelector('small');
        small.innerHTML = "Invalid email.";
        if(field.parentNode.classList.contains('success'))
            field.parentNode.classList.remove('success')
        if(!field.parentNode.classList.contains('error'))
            field.parentNode.classList.add('error')
    }
}

// Event Listeners
// 1 - Event Listener to submit form
form.addEventListener('submit', e => {
    e.preventDefault();
    [name, email, password, confirmPassword].map(field => checkAvailability(field));
    checkLength(name, 3, 10);
    checkLength(password, 5, 20);
    matchThem(password, confirmPassword);
    validateEmail(email);
})
