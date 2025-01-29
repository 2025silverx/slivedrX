// Function to apply the filters to the table rows
function filterTransactions() {
    const dateFilter = document.getElementById("dateFilter").value;
    const typeFilter = document.getElementById("typeFilter").value;
    const statusFilter = document.getElementById("statusFilter").value;
    const rows = document.querySelectorAll("#transactionTable tr");

    rows.forEach(row => {
        const date = row.cells[1].innerText;
        const type = row.cells[3].innerText.toLowerCase();
        const status = row.cells[4].innerText.toLowerCase();

        let isVisible = true;

        // Apply Date filter
        if (dateFilter && date !== dateFilter) {
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

        // Show or hide the row based on the filters
        if (isVisible) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Event listeners for filters
document.getElementById("dateFilter").addEventListener("input", filterTransactions);
document.getElementById("typeFilter").addEventListener("change", filterTransactions);
document.getElementById("statusFilter").addEventListener("change", filterTransactions);

// Initial call to filter transactions based on the current filter settings
filterTransactions();
