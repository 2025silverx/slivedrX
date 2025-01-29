// Data for the graphs
const commissionsData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
        label: 'Commissions Earned',
        data: [1000, 1500, 2000, 2500, 3000],
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1
    }]
};

const referralsData = {
    labels: ['Active Referrals', 'Inactive Referrals'],
    datasets: [{
        data: [70, 30],
        backgroundColor: ['#28a745', '#ffc107'],
        hoverBackgroundColor: ['#218838', '#e0a800']
    }]
};

const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [{
        label: 'Referral Performance',
        data: [10, 20, 30, 40, 50],
        backgroundColor: 'rgba(40, 167, 69, 0.5)',
        borderColor: 'rgba(40, 167, 69, 1)',
        borderWidth: 1
    }]
};

// Initialize the charts
window.onload = function() {
    const commissionsChart = new Chart(document.getElementById('commissionsChart'), {
        type: 'bar',
        data: commissionsData,
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    const referralsChart = new Chart(document.getElementById('referralsChart'), {
        type: 'pie',
        data: referralsData,
        options: {
            responsive: true
        }
    });

    const performanceChart = new Chart(document.getElementById('performanceChart'), {
        type: 'line',
        data: performanceData,
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
};
