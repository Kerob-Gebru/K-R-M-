// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  const loginForm = document.getElementById('loginForm');
  
  // Get all form fields
  const firstname = document.getElementById('firstname');
  const lastname = document.getElementById('lastname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');
  const department = document.getElementById('department');
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  
  // Get all error message elements or create them if they don't exist
  const createErrorElement = (fieldId) => {
      let errorElement = document.getElementById(`${fieldId}-error`);
      
      if (!errorElement) {
          errorElement = document.createElement('span');
          errorElement.id = `${fieldId}-error`;
          errorElement.className = 'error-message';
          errorElement.style.color = '#e74c3c';
          errorElement.style.fontSize = '14px';
          errorElement.style.marginTop = '5px';
          errorElement.style.display = 'block';
          errorElement.style.height = '20px';
          
          const field = document.getElementById(fieldId);
          field.parentNode.appendChild(errorElement);
      }
      
      return errorElement;
  };
  
  // Create error elements for all fields
  const firstnameError = createErrorElement('firstname');
  const lastnameError = createErrorElement('lastname');
  const emailError = createErrorElement('email');
  const passwordError = createErrorElement('password');
  const confirmPasswordError = createErrorElement('confirm-password');
  const departmentError = createErrorElement('department');
  const genderError = createErrorElement('gender');
  
  // Create success message element if it doesn't exist
  let successMessage = document.getElementById('success-message');
  if (!successMessage) {
      successMessage = document.createElement('div');
      successMessage.id = 'success-message';
      successMessage.style.color = '#2ecc71';
      successMessage.style.textAlign = 'center';
      successMessage.style.marginTop = '20px';
      successMessage.style.fontWeight = '600';
      successMessage.style.display = 'none';
      
      loginForm.parentNode.appendChild(successMessage);
  }
  
  // Function to validate email format
  function isValidEmail(emailValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(emailValue);
  }
  
  // Function to show error message
  function showError(field, errorElement, message) {
      field.style.borderColor = '#e74c3c';
      errorElement.textContent = message;
      return false;
  }
  
  // Function to clear error message
  function clearError(field, errorElement) {
      field.style.borderColor = '';
      errorElement.textContent = '';
  }
  
  // Add input event listeners to clear errors when user types
  firstname.addEventListener('input', () => clearError(firstname, firstnameError));
  lastname.addEventListener('input', () => clearError(lastname, lastnameError));
  email.addEventListener('input', () => clearError(email, emailError));
  password.addEventListener('input', () => clearError(password, passwordError));
  confirmPassword.addEventListener('input', () => clearError(confirmPassword, confirmPasswordError));
  department.addEventListener('input', () => clearError(department, departmentError));
  
  // Add change event listeners for radio buttons
  genderInputs.forEach(radio => {
      radio.addEventListener('change', () => clearError(radio, genderError));
  });
  
  // Form submission handler
  loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      let isValid = true;
      
      // Validate firstname
      if (firstname.value.trim() === '') {
          isValid = showError(firstname, firstnameError, 'Please enter your first name');
      } else if (firstname.value.trim().length < 2) {
          isValid = showError(firstname, firstnameError, 'First name must be at least 2 characters');
      }
      
      // Validate lastname
      if (lastname.value.trim() === '') {
          isValid = showError(lastname, lastnameError, 'Please enter your last name');
      } else if (lastname.value.trim().length < 2) {
          isValid = showError(lastname, lastnameError, 'Last name must be at least 2 characters');
      }
      
      // Validate email
      if (email.value.trim() === '') {
          isValid = showError(email, emailError, 'Please enter your email');
      } else if (!isValidEmail(email.value.trim())) {
          isValid = showError(email, emailError, 'Please enter a valid email address');
      }
      
      // Validate password
      if (password.value === '') {
          isValid = showError(password, passwordError, 'Please enter a password');
      } else if (password.value.length < 6) {
          isValid = showError(password, passwordError, 'Password must be at least 6 characters');
      }
      
      // Validate confirm password
      if (confirmPassword.value === '') {
          isValid = showError(confirmPassword, confirmPasswordError, 'Please confirm your password');
      } else if (confirmPassword.value !== password.value) {
          isValid = showError(confirmPassword, confirmPasswordError, 'Passwords do not match');
      }
      
      // Validate gender
      const genderSelected = document.querySelector('input[name="gender"]:checked');
      if (!genderSelected) {
          isValid = showError(genderInputs[0], genderError, 'Please select your gender');
      }
      
      // Validate department
      if (department.value.trim() === '') {
          isValid = showError(department, departmentError, 'Please enter your department');
      }
      
      // If form is valid, submit it
      if (isValid) {
          // In a real application, you would send the data to a server here
          // For this example, we'll just show a success message
          loginForm.style.display = 'none';
          successMessage.style.display = 'block';
          successMessage.textContent = 'Account created successfully!';
          
          // Log the form data (for demonstration purposes)
          console.log({
              firstname: firstname.value.trim(),
              lastname: lastname.value.trim(),
              email: email.value.trim(),
              password: password.value,
              gender: genderSelected ? genderSelected.value : '',
              department: department.value.trim()
          });
      }
  });
});