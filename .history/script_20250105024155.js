function viewUser() {
    alert('Viewing user details...');
}

function blockUser() {
    alert('User has been blocked!');
}

function editUser() {
    alert('Editing user...');
}

// You can add additional JavaScript functionality for filters or search functionality.
function validateForm() {
    // Get the username and password values from the form
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Simple validation: Check if the fields are not empty
    if (username && password) {
        // Redirect to the next page (e.g., 'dashboard.html')
        window.location.href = "dashboard.html";  // Replace with the actual next page URL
        return false; // Prevent the form from actually submitting and refreshing the page
    } else {
        // Alert if either of the fields are empty
        alert("Please fill in both fields.");
        return false;  // Prevent form submission if validation fails
    }
}
