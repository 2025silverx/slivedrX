async function validateForm(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        try {
            const endpoint = "https://wallet-seven-fawn.vercel.app/api/v1/admin/signin"; // Adjust this URL if needed
            const body = { Email: username, Password: password };

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const result = await response.json();

            console.log("Result:", result);

            if (result['status']) {
                console.log("Login successful, redirecting...");
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 100); // 500ms delay
            }
            else {
                alert(`Login Failed: ${result.message || 'Invalid credentials'}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    } else {
        alert("Please fill in both fields.");
    }
}

document.getElementById('loginForm').addEventListener('submit', validateForm);
