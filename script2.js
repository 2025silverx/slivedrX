async function fetchTransactions() {
    const token = localStorage.getItem("authToken")
    console.log("token",token)
    const apiUrl = "https://wallet-seven-fawn.vercel.app/api/v1/transaction/getfund";
   
 
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
 
        const result = await response.json();
        populateTable(result.data);
    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
}
 
// Function to populate table with API data
function populateTable(transactions) {
    const tableBody = document.getElementById("transactionTable");
    tableBody.innerHTML = ""; // Clear existing rows
 
    transactions.forEach(transaction => {
        const row = document.createElement("tr");
 
        // Ensure UserId is not null before accessing Name
        const userName = transaction.UserId ? transaction.UserId.Name : "--";
 
        row.innerHTML = `
            <td>$${transaction.amount}</td>
            <td>${new Date(transaction.createdAt).toISOString().split('T')[0]}</td>
            <td>${userName}</td>
            <td>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
            <td><span class="status-label ${transaction.status.toLowerCase()}">${transaction.status}</span></td>
        `;
 
        tableBody.appendChild(row);
    });
 
    filterTransactions(); // Apply filters after populating the table
}
 
 
// Function to apply filters to the table rows
function filterTransactions() {
    const dateFilter = document.getElementById("startDateFilter").value;
    const endDateFilter = document.getElementById("endDateFilter").value;
    const typeFilter = document.getElementById("typeFilter").value.toLowerCase();
    const statusFilter = document.getElementById("statusFilter").value.toLowerCase();
    const nameFilter = document.getElementById("nameFilter").value.toLowerCase();
 
    const rows = document.querySelectorAll("#transactionTable tr");
 
    rows.forEach(row => {
        const date = row.cells[1].innerText;
        const name = row.cells[2].innerText.toLowerCase();
        const type = row.cells[3].innerText.toLowerCase();
        const status = row.cells[4].innerText.toLowerCase();
 
        let isVisible = true;
 
        // Apply Name filter
        if (nameFilter && !name.includes(nameFilter)) {
            isVisible = false;
        }
 
        // Apply Date filter (Start Date)
        if (dateFilter && new Date(date) < new Date(dateFilter)) {
            isVisible = false;
        }
 
        // Apply Date filter (End Date)
        if (endDateFilter && new Date(date) > new Date(endDateFilter)) {
            isVisible = false;
        }
 
        // Apply Type filter
        if (typeFilter !== "all" && type !== typeFilter) {
            isVisible = false;
        }
 
        // Apply Status filter
        if (statusFilter !== "all" && status !== statusFilter) {
            isVisible = false;
        }
 
        // Show or hide the row based on filters
        row.style.display = isVisible ? "" : "none";
    });
}
 
// Event listeners for filters
document.getElementById("nameFilter").addEventListener("input", filterTransactions);
document.getElementById("startDateFilter").addEventListener("change", filterTransactions);
document.getElementById("endDateFilter").addEventListener("change", filterTransactions);
document.getElementById("typeFilter").addEventListener("change", filterTransactions);
document.getElementById("statusFilter").addEventListener("change", filterTransactions);
 
// Fetch transactions when the page loads
fetchTransactions();