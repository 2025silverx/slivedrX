// ✅ Login Function
fetchUsers();
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
    const userTable = document.getElementById("userTable");
    userTable.innerHTML = "";

    users.forEach((user, index) => {
        const statusClass = user.active ? "active" : "inactive";
        const statusText = user.active ? "Active" : "Inactive";
        const verificationStatus = user.isBlocked ? "Unverified" : "Verified";
        const balance = user.rewards || 0; 

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
        userTable.innerHTML += row;
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

// ✅ Fetch Users on Page Load
document.addEventListener("DOMContentLoaded", fetchUsers);
