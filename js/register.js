document.addEventListener('DOMContentLoaded', () => {
    initializeRegistration();
});

function initializeRegistration() {
    const registerForm = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const strengthIndicator = document.getElementById('passwordStrength');

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }
}

async function handleRegistration(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Get form values
    const firstName = form.querySelector('#firstName').value;
    const lastName = form.querySelector('#lastName').value;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    const confirmPassword = form.querySelector('#confirmPassword').value;
    const terms = form.querySelector('#terms').checked;

    // Validate form
    if (!validateRegistrationForm(firstName, lastName, email, password, confirmPassword, terms)) {
        return;
    }

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Creating account...';

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showSuccessMessage();
        
        // Redirect to email verification page
        setTimeout(() => {
            window.location.href = 'verify-email.html';
        }, 2000);
    } catch (error) {
        showError('general', 'An error occurred. Please try again.');
        submitButton.disabled = false;
        submitButton.innerHTML = 'Create Account <i class="bi bi-arrow-right"></i>';
    }
}

function validateRegistrationForm(firstName, lastName, email, password, confirmPassword, terms) {
    let isValid = true;

    // Name validation
    if (firstName.length < 2) {
        showError('firstName', 'First name is too short');
        isValid = false;
    }

    if (lastName.length < 2) {
        showError('lastName', 'Last name is too short');
        isValid = false;
    }

    // Email validation
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Password validation
    if (password.length < 8) {
        showError('password', 'Password must be at least 8 characters');
        isValid = false;
    }

    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        isValid = false;
    }

    // Terms validation
    if (!terms) {
        showError('terms', 'You must accept the terms and conditions');
        isValid = false;
    }

    return isValid;
}

function checkPasswordStrength(e) {
    const password = e.target.value;
    const strengthBar = document.querySelector('#passwordStrength .progress-bar');
    const strengthText = document.querySelector('#passwordStrength .strength-text');

    // Calculate password strength
    let strength = 0;
    let feedback = '';

    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;

    // Update UI
    strengthBar.style.width = strength + '%';
    
    if (strength < 25) {
        strengthBar.className = 'progress-bar bg-danger';
        feedback = 'Too weak';
    } else if (strength < 50) {
        strengthBar.className = 'progress-bar bg-warning';
        feedback = 'Could be stronger';
    } else if (strength < 75) {
        strengthBar.className = 'progress-bar bg-info';
        feedback = 'Getting better';
    } else {
        strengthBar.className = 'progress-bar bg-success';
        feedback = 'Strong password';
    }

    strengthText.textContent = `Password strength: ${feedback}`;
}

function showSuccessMessage() {
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success mt-3';
    successAlert.role = 'alert';
    successAlert.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        Account created successfully! Redirecting to verification page...
    `;
    
    const form = document.getElementById('registerForm');
    form.insertAdjacentElement('beforebegin', successAlert);
}