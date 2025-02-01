// // Data for the graphs
// const commissionsData = {
//     labels: ['January', 'February', 'March', 'April', 'May'],
//     datasets: [{
//         label: 'Commissions Earned',
//         data: [1000, 1500, 2000, 2500, 3000],
//         backgroundColor: 'rgba(0, 123, 255, 0.5)',
//         borderColor: 'rgba(0, 123, 255, 1)',
//         borderWidth: 1
//     }]
// };

// const referralsData = {
//     labels: ['Active Referrals', 'Inactive Referrals'],
//     datasets: [{
//         data: [70, 30],
//         backgroundColor: ['#28a745', '#ffc107'],
//         hoverBackgroundColor: ['#218838', '#e0a800']
//     }]
// };

// const performanceData = {
//     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
//     datasets: [{
//         label: 'Referral Performance',
//         data: [10, 20, 30, 40, 50],
//         backgroundColor: 'rgba(40, 167, 69, 0.5)',
//         borderColor: 'rgba(40, 167, 69, 1)',
//         borderWidth: 1
//     }]
// };

// // Initialize the charts
// window.onload = function() {
//     const commissionsChart = new Chart(document.getElementById('commissionsChart'), {
//         type: 'bar',
//         data: commissionsData,
//         options: {
//             responsive: true,
//             scales: {
//                 y: { beginAtZero: true }
//             }
//         }
//     });

//     const referralsChart = new Chart(document.getElementById('referralsChart'), {
//         type: 'pie',
//         data: referralsData,
//         options: {
//             responsive: true
//         }
//     });

//     const performanceChart = new Chart(document.getElementById('performanceChart'), {
//         type: 'line',
//         data: performanceData,
//         options: {
//             responsive: true,
//             scales: {
//                 y: { beginAtZero: true }
//             }
//         }
//     });
// };

document.addEventListener("DOMContentLoaded", () => {
    fetchReferralData();
});

async function fetchReferralData() {
    const token = localStorage.getItem("authToken"); // Authentication token

    try {
        const response = await fetch("https://wallet-seven-fawn.vercel.app/api/v1/admin/app/count", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        });

        const result = await response.json();
        console.log("Referral Data:", result);

        if (result.status) {
            updateReferralStats(result.data);
            updateReferralCharts(result.data);
        } else {
            alert("Failed to fetch referral data.");
        }
    } catch (error) {
        console.error("Error fetching referral data:", error);
    }
}

// ✅ Function to update referral statistics on UI
function updateReferralStats(data) {
    document.getElementById("totalReferrals").textContent = data.totalReferralCount;
    document.getElementById("successfulSignups").textContent = data.activeUserCount;
    document.getElementById("commissionsEarned").textContent = `$${data.totalReferralCommission}`;
}

// ✅ Function to update referral performance charts
function updateReferralCharts(data) {
    const ctx1 = document.getElementById("commissionsChart").getContext("2d");
    new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["Total Fund", "Total Profit", "Total Commission"],
            datasets: [{
                label: "Amount in USD",
                data: [data.totalFundAmount, data.totalProfitcredited, data.totalReferralCommission],
                backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"]
            }]
        }
    });

    const ctx2 = document.getElementById("referralsChart").getContext("2d");
    new Chart(ctx2, {
        type: "pie",
        data: {
            labels: ["Active Users", "Inactive Users"],
            datasets: [{
                data: [data.activeUserCount, data.unactiveUserCount],
                backgroundColor: ["#4CAF50", "#F44336"]
            }]
        }
    });

    // const ctx3 = document.getElementById("performanceChart").getContext("2d");
    // new Chart(ctx3, {
    //     type: "line",
    //     data: {
    //         labels: ["Total Transactions", "Total Referral"],
    //         datasets: [{
    //             label: "Referral Performance",
    //             data: [data.totalTransactionValue, data.totalReferralCount],
    //             backgroundColor: "#673AB7",
    //             borderColor: "#673AB7",
    //             fill: false
    //         }]
    //     }
    // });
}

document.addEventListener("DOMContentLoaded", () => {
    const userId = "678ff2c4d9ee428a30649919"; // Replace with dynamic userId
    fetchReferralTree(userId);
});

async function fetchReferralTree(userId) {
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch(`https://wallet-seven-fawn.vercel.app/api/v1/admin/downline/tree/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        });

        const result = await response.json();
        console.log("Referral Tree Data:", result);

        if (result.status) {
            renderReferralTree(result.data, "networkGraph");
        } else {
            alert("Failed to fetch referral tree.");
        }
    } catch (error) {
        console.error("Error fetching referral tree:", error);
    }
}

// ✅ Recursive Function to Render Tree
function renderReferralTree(node, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous tree

    const tree = document.createElement("div");
    tree.classList.add("tree");

    function createNode(user) {
        const nodeDiv = document.createElement("div");
        nodeDiv.classList.add("node");
        nodeDiv.innerHTML = `<strong>${user.name}</strong> <br> Level: ${user.level}`;

        if (user.downline && user.downline.length > 0) {
            const subTree = document.createElement("div");
            subTree.classList.add("subtree");

            user.downline.forEach(child => {
                subTree.appendChild(createNode(child));
            });

            nodeDiv.appendChild(subTree);
        }

        return nodeDiv;
    }

    tree.appendChild(createNode(node));
    container.appendChild(tree);
}


