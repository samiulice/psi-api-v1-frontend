document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('en-US', options);

    // Initialize charts
    initializeDepartmentChart();
    initializeAttendanceChart();
});

function initializeDepartmentChart() {
    const ctx = document.getElementById('departmentChart').getContext('2d');
    
    const departmentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['IT', 'HR', 'Marketing', 'Finance', 'Operations'],
            datasets: [{
                data: [65, 25, 45, 35, 78],
                backgroundColor: [
                    '#6884E7',
                    '#42C27D',
                    '#F15555',
                    '#FF9F43',
                    '#2E3A59'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 15,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw} employees`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

function initializeAttendanceChart() {
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    
    const attendanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Present',
                data: [235, 240, 238, 242, 230, 180, 175],
                borderColor: '#42C27D',
                backgroundColor: 'rgba(66, 194, 125, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Absent',
                data: [8, 5, 7, 3, 10, 5, 3],
                borderColor: '#F15555',
                backgroundColor: 'rgba(241, 85, 85, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Late',
                data: [5, 3, 3, 3, 8, 3, 2],
                borderColor: '#FF9F43',
                backgroundColor: 'rgba(255, 159, 67, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        padding: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}