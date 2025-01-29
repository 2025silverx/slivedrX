// Handle Tab Switching
document.getElementById("pending-tab").addEventListener("click", function() {
    switchTab("pending-payouts");
});

document.getElementById("approved-tab").addEventListener("click", function() {
    switchTab("approved-payouts");
});

document.getElementById("all-tab").addEventListener("click", function() {
    switchTab("all-transactions");
});

function switchTab(tabId) {
    // Hide all tab content
    const tabs = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => {
        tab.classList.remove("active");
    });

    // Show the selected tab
    const activeTab = document.getElementById(tabId);
    activeTab.classList.add("active");

    // Update tab button styles
    const buttons = document.querySelectorAll(".tab-button");
    buttons.forEach(button => {
        button.classList.remove("active");
    });
    document.getElementById(tabId.replace("-payouts", "-tab")).classList.add("active");
}
