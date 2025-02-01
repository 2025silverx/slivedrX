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
                    <button  onclick="showAddFundModal('${user._id}')">Add Found</button>
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
                method: "DELETE",
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

// ✅ Show Add Fund Modal
function showAddFundModal(userId) {
    document.getElementById("addFundModal").style.display = "block";
    localStorage.setItem("currentUserId", userId);
}

// ✅ Close Modal
function closeAddFundModal() {
    document.getElementById("addFundModal").style.display = "none";
}

// ✅ Add Fund Function
// async function addFund() {
//     const userId = localStorage.getItem("currentUserId");
//     const amount = document.getElementById("fundAmount").value;

//     if (!userId || !amount) {
//         alert("User ID and Amount are required!");
//         return;
//     }

//     const token = localStorage.getItem("authToken");

//     try {
//         const response = await fetch("https://wallet-seven-fawn.vercel.app/api/v1/transaction/addfund/admin", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "token": token
//             },
//             body: JSON.stringify({
//                 UserId: userId,
//                 amount: parseFloat(amount)
//             })
//         });

//         const result = await response.json();
//         if (result.status) {
//             alert("Fund Added Successfully!");
//             closeAddFundModal(); // Hide Popup
//         } else {
//             alert("Failed to Add Fund: " + result.message);
//         }
//     } catch (error) {
//         console.error("Error while adding fund:", error);
//     }
// }

// ✅ Add Fund Function (Sending Amount as Number)
async function addFund() {
    const userId = localStorage.getItem("currentUserId");
    const amount = document.getElementById("fundAmount").value;

    // ✅ Convert amount to number
    const numericAmount = parseFloat(amount);

    if (!userId || isNaN(numericAmount) || numericAmount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch("https://wallet-seven-fawn.vercel.app/api/v1/transaction/addfund/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify({
                UserId: userId,
                amount: numericAmount // ✅ Sending as Number
            })
        });

        const result = await response.json();
        if (result.status) {
            alert("Fund Added Successfully!");
            closeAddFundModal(); // Hide Popup
        } else {
            alert("Failed to Add Fund: " + result.message);
        }
    } catch (error) {
        console.error("Error while adding fund:", error);
    }
}




// Function to show the "Add User" form and hide the user listing
function showAddUserForm() {
    // Hide the user table
    document.getElementById("userTable").style.display = "none"; 
    // Show the Add User form
    document.getElementById("add-user-form-container").style.display = "block";
}

function closeAddUserForm() {
    document.getElementById("add-user-form-container").style.display = "none";
    document.getElementById("userTable").style.display = "table"; 
}

async function addUser(event) {
    event.preventDefault(); 

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



function showAddUserForm() {
    document.getElementById("add-user-form-container").style.display = "block";
    document.getElementById("userTable").style.display = "none"; // Hide user table
}

function closeAddUserForm() {
    document.getElementById("add-user-form-container").style.display = "none";
    document.getElementById("userTable").style.display = "table"; // Show user table
}


// ✅ Fetch Users on Page Load
document.addEventListener("DOMContentLoaded", fetchUsers);
