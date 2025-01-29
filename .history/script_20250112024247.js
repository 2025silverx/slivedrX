import { postData } from './api.js'; // Importing API POST function

// Function: View User
export function viewUser() {
    alert('Viewing user details...');
}

// Function: Block User
export function blockUser() {
    alert('User has been blocked!');
}

// Function: Edit User
export function editUser() {
    alert('Editing user...');
}

// Login form validation and API call
async function validateForm(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get username and password values from the form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if fields are not empty
    if (username && password) {
        try {
            // API endpoint and body setup
            const endpoint = 'admin/signin'; // Your API endpoint
            const body = { email: username, password };

            // Call the API
            const response = await postData(endpoint, body);

            // Handle API response
            if (response.success) {
                // On successful login, redirect to the dashboard
                window.location.href = "index.html"; // Replace with your dashboard URL
            } else {
                // If login fails, show an error message
                alert(`Login Failed: ${response.message || 'Invalid credentials'}`);
            }
        } catch (error) {
            // Handle any API errors
            alert(`Error: ${error.message}`);
        }
    } else {
        // Show alert if any field is empty
        alert("Please fill in both fields.");
    }
}

// Example function: Add additional functionality here
function applyFilters() {
    alert('Filters applied!');
}

// Example function: For handling search functionality
function searchUser() {
    alert('Searching for a user...');
}

// Add event listener for the login form
document.getElementById('loginForm').addEventListener('submit', validateForm);

// Export other functions for use in different files if needed
export { applyFilters, searchUser };
