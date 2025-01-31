// ✅ Login Function
document.addEventListener("DOMContentLoaded", () => {
    fetchUsers();
});

async function validateForm(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    try {
        const response = await fetch("https://wallet-seven-fawn.vercel.app/api/v1/admin/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Email: username, Password: password })
        });

        const result = await response.json();
        console.log("Login Response:", result);

        if (result.status) {
            localStorage.setItem("authToken", result.token); // Store token
            alert("Login successful!");
            setTimeout(() => window.location.href = "index.html", 500);
        } else {
            alert(`Login Failed: ${result.message || 'Invalid credentials'}`);
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("An error occurred while logging in.");
    }
}

document.getElementById('loginForm').addEventListener('submit', validateForm);


// ✅ Fetch Users Function (With Token)
async function fetchUsers() {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Authentication token is missing. Please log in again.");
            return;
        }

        console.log("Authentication token",token)

        const response = await fetch("https://wallet-seven-fawn.vercel.app/api/v1/users/alluser", {
            method: "GET",
            headers: {
                "token": token,
                "Content-Type": "application/json",
            }
        });

        const result = await response.json();
        console.log("User Fetch Response:", result);

        if (result.status && Array.isArray(result.data)) {
            populateUserTable(result.data);
        } else {
            alert("Failed to fetch users.");
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        alert("Error fetching users.");
    }
}

// ✅ Populate User Table
function populateUserTable(users) {
    const userTableBody = document.getElementById("userTableBody"); // Target the table body
    userTableBody.innerHTML = ""; // Clear the table body before adding new rows

    // Iterate over the users array to populate the table
    users.forEach((user, index) => {
        const statusClass = user.active ? "active" : "inactive";
        const statusText = user.active ? "Active" : "Inactive";
        const verificationStatus = user.isBlocked ? "Unverified" : "Verified";
        const balance = user.rewards || 0; 

        // Create a new row for each user
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${user.Name}</td>
                <td>${user.Email}</td>
                <td>${user.Password}</td>
                <td>$${balance}</td>
                <td><button class="status-btn ${statusClass}" onclick="toggleStatus(this, '${user._id}')">${statusText}</button></td>
                <td>${verificationStatus}</td>
                <td>
                    <button class="action-btn view" onclick="viewUser('${user._id}')">View</button>
                    <button class="action-btn edit" onclick="editUser('${user._id}', '${user.name}', '${user.email}', '${balance}')">Edit</button>
                    <button class="action-btn delete" onclick="deleteUser('${user._id}')">Delete</button>
                </td>
            </tr>
        `;
        
        // Append the row to the table body
        userTableBody.innerHTML += row;
    });
}


// ✅ Toggle User Status
async function toggleStatus(button, userId) {
    const newStatus = button.classList.contains("active") ? false : true;
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch(`https://wallet-seven-fawn.vercel.app/api/v1/admin/update/user/${userId}`, {
            method: "PATCH",
            headers: {
                "token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ active: newStatus })
        });

        const result = await response.json();
        if (result.status) {
            button.classList.toggle("active");
            button.classList.toggle("inactive");
            button.textContent = newStatus ? "Active" : "Inactive";
        } else {
            alert("Failed to update status.");
        }
    } catch (error) {
        console.error("Error updating status:", error);
        alert("Error updating user status.");
    }
}

// ✅ Edit User Function
function editUser(userId, name, email, balance) {
    alert(`Edit User: ${Name} (${Email}) - Balance: $${balance}`);
    toggleStatus();
}

// ✅ Delete User Function
async function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        const token = localStorage.getItem("authToken");

        try {
            const response = await fetch(`https://wallet-seven-fawn.vercel.app/api/v1/users/blockuser/${userId}`, {
                method: "PATCH",
                headers: {
                    "token": token,
                    "Content-Type": "application/json",
                }
            });

            const result = await response.json();
            if (result.status) {
                alert("User deleted successfully.");
                fetchUsers(); 
            } else {
                alert("Failed to delete user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Error deleting user.");
        }
    }
}

// Function to show the "Add User" form and hide the user listing
function showAddUserForm() {
    // Hide the user table
    document.getElementById("userTable").style.display = "none"; 
    // Show the Add User form
    document.getElementById("add-user-form-container").style.display = "block";
}

// Function to close the "Add User" form and show the user listing again
function closeAddUserForm() {
    // Hide the Add User form
    document.getElementById("add-user-form-container").style.display = "none";
    // Show the user table
    document.getElementById("userTable").style.display = "table"; 
}

// Function to handle form submission for adding a user
async function addUser(event) {
    event.preventDefault(); // Prevents the form from submitting the default way

    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    if (!name || !email || !password) {
        alert("All fields are required!");
        return;
    }

    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch("https://wallet-seven-fawn.vercel.app/api/v1/admin/add/user", {
            method: "POST",
            headers: {
                "token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Name: name,
                Email: email,
                Password: password,
                referralCode: "OTUAL",
                rewards: 0,
                role: "user",
                active: true
            })
        });

        const result = await response.json();

        if (result.status) {
            alert("User Added Successfully!");
            fetchUsers(); // Refresh the user list
            closeAddUserForm(); // Close the form after submission
        } else {
            alert("Failed to add user: " + (result.message || "Unknown error"));
        }
    } catch (error) {
        console.error("Error adding user:", error);
        alert("An error occurred while adding the user.");
    }
}



// Function to show the "Add User" form and hide the user listing
function showAddUserForm() {
    document.getElementById("add-user-form-container").style.display = "block";
    document.getElementById("userTable").style.display = "none"; // Hide user table
}

// Function to close the "Add User" form and show the user listing again
function closeAddUserForm() {
    document.getElementById("add-user-form-container").style.display = "none";
    document.getElementById("userTable").style.display = "table"; // Show user table
}


// ✅ Fetch Users on Page Load
document.addEventListener("DOMContentLoaded", fetchUsers);
