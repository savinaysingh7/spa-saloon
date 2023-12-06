document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById('appointment-form');
    const formElements = ['name', 'email', 'phone', 'service', 'datetime'];
    const errorMessages = document.getElementById('error-messages');

    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
    });

    formElements.forEach(element => {
        const inputElement = document.getElementById(element);
        inputElement.addEventListener('input', () => validateInput(inputElement));
    });

    function validateForm() {
        errorMessages.innerHTML = '';
        const isValidForm = formElements.every(element => validateInput(element));
        isValidForm ? alert('Form submitted successfully!') : displayError('Please correct the errors in the form.');
    }

    function validateInput(element) {
        const inputElement = document.getElementById(element);
        const inputValue = inputElement.value.trim();
        const validationRules = {
            'name': () => validateRequired(inputValue, 'Name is required.'),
            'email': () => validateEmail(inputValue, 'Enter a valid email address.'),
            'phone': () => validatePhone(inputValue, 'Enter a 10-digit phone number.'),
            'service': () => validateRequired(inputValue, 'Please select a service.'),
            'datetime': () => validateRequired(inputValue, 'Select a date and time for your appointment.')
        };
        return validationRules[element]();
    }

    function validateRequired(value, errorMessage) {
        if (value === '') {
            displayError(errorMessage);
            return false;
        }
        return true;
    }

    function validateEmail(value, errorMessage) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            displayError(errorMessage);
            return false;
        }
        return true;
    }

    function validatePhone(value, errorMessage) {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
            displayError(errorMessage);
            return false;
        }
        return true;
    }

    function displayError(errorMessage) {
        const errorParagraph = document.createElement('p');
        errorParagraph.textContent = errorMessage;
        errorMessages.appendChild(errorParagraph);
    }
});
