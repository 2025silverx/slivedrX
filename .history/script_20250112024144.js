import { postData } from './api.js'; // POST function from api.js

// View User Functionality
export function viewUser() {
    alert('Viewing user details...');
}

// Block User Functionality
export function blockUser() {
    alert('User has been blocked!');
}

// Edit User Functionality
export function editUser() {
    alert('Editing user...');
}

// Login form validation and API call
async function validateForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Fetch username and password values from the form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation: Check if fields are not empty
    if (username && password) {
        try {
            // API endpoint and body setup
            const endpoint = 'admin/signin'; // Your API endpoint
            const body = { email: username, password };

            // API call
            const response = await postData(endpoint, body);

            // Handle response
            if (response.success) {
                // On success, redirect to the next page
                window.location.href = "index.html"; // Replace with your actual next page URL
            } else {
                // Show error if login fails
                alert(`Login Failed: ${response.message || 'Invalid credentials'}`);
            }
        } catch (error) {
            // Handle API errors
            alert(`Error: ${error.message}`);
        }
    } else {
        // Show alert if fields are empty
        alert("Please fill in both fields.");
    }
}

// Add event listener to the login form
document.getElementById('loginForm').addEventListener('submit', validateForm);
