// Data for the charts
const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
        label: 'Revenue Growth',
        data: [100000, 120000, 130000, 150000, 160000, 180000, 200000, 210000, 230000, 240000, 250000, 270000],
        backgroundColor: 'rgba(0, 123, 255, 0.6)', // Blue for revenue
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1
    }]
};

const transactionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
        label: 'Transaction Volume',
        data: [80000, 100000, 120000, 130000, 150000, 170000, 180000, 190000, 210000, 220000, 240000, 250000],
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red for transaction volume
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

// Chart.js configuration for revenue growth
const revenueGrowthCtx = document.getElementById('revenueGrowthChart').getContext('2d');
const revenueGrowthChart = new Chart(revenueGrowthCtx, {
    type: 'bar',
    data: revenueData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return '$' + value.toLocaleString(); // Format y-axis as currency
                    }
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return '$' + tooltipItem.raw.toLocaleString();
                    }
                }
            }
        }
    }
});

// Chart.js configuration for transaction trends
const transactionTrendsCtx = document.getElementById('transactionTrendsChart').getContext('2d');
const transactionTrendsChart = new Chart(transactionTrendsCtx, {
    type: 'line',
    data: transactionData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return '$' + value.toLocaleString(); // Format y-axis as currency
                    }
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return '$' + tooltipItem.raw.toLocaleString();
                    }
                }
            }
        }
    }
});
