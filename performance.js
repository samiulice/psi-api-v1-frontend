document.addEventListener('DOMContentLoaded', function() {
    // Sample performance review data
    const performanceReviews = [
        {
            id: 1,
            employeeName: 'John Smith',
            employeeId: 'EMP001',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            department: 'IT',
            reviewPeriod: 'Q4 2022',
            reviewer: 'Sarah Johnson',
            rating: 'Excellent',
            completionDate: '2022-12-15',
            status: 'Completed'
        },
        {
            id: 2,
            employeeName: 'Emily Johnson',
            employeeId: 'EMP002',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            department: 'Marketing',
            reviewPeriod: 'Q4 2022',
            reviewer: 'Robert Anderson',
            rating: 'Good',
            completionDate: '2022-12-18',
            status: 'Completed'
        },
        {
            id: 3,
            employeeName: 'Michael Brown',
            employeeId: 'EMP003',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            department: 'Design',
            reviewPeriod: 'Q4 2022',
            reviewer: 'Jennifer Taylor',
            rating: 'Good',
            completionDate: '2022-12-20',
            status: 'Completed'
        },
        {
            id: 4,
            employeeName: 'Sarah Davis',
            employeeId: 'EMP004',
            avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
            department: 'HR',
            reviewPeriod: 'Q1 2023',
            reviewer: 'Sarah Johnson',
            rating: '',
            completionDate: '',
            status: 'In Progress'
        },
        {
            id: 5,
            employeeName: 'David Wilson',
            employeeId: 'EMP005',
            avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
            department: 'Finance',
            reviewPeriod: 'Q1 2023',
            reviewer: 'Robert Anderson',
            rating: '',
            completionDate: '',
            status: 'Pending'
        },
        {
            id: 6,
            employeeName: 'Jennifer Taylor',
            employeeId: 'EMP006',
            avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
            department: 'IT',
            reviewPeriod: 'Q1 2023',
            reviewer: 'Sarah Johnson',
            rating: '',
            completionDate: '',
            status: 'Pending'
        },
        {
            id: 7,
            employeeName: 'Robert Anderson',
            employeeId: 'EMP007',
            avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
            department: 'Operations',
            reviewPeriod: 'Q1 2023',
            reviewer: 'Sarah Johnson',
            rating: '',
            completionDate: '',
            status: 'Pending'
        },
        {
            id: 8,
            employeeName: 'Lisa Thomas',
            employeeId: 'EMP008',
            avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
            department: 'Marketing',
            reviewPeriod: 'Q1 2023',
            reviewer: 'Emily Johnson',
            rating: '',
            completionDate: '',
            status: 'Pending'
        },
        {
            id: 9,
            employeeName: 'James White',
            employeeId: 'EMP009',
            avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
            department: 'IT',
            reviewPeriod: 'Q1 2023',
            reviewer: 'John Smith',
            rating: '',
            completionDate: '',
            status: 'Pending'
        },
        {
            id: 10,
            employeeName: 'Patricia Clark',
            employeeId: 'EMP010',
            avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
            department: 'Finance',
            reviewPeriod: 'Q1 2023',
            reviewer: 'David Wilson',
            rating: '',
            completionDate: '',
            status: 'Pending'
        }
    ];

    // Populate reviews table
    populateReviewsTable(performanceReviews);

    // Initialize charts
    initializeCharts();

    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // New Review Modal
    const newReviewModal = document.getElementById('new-review-modal');
    const addReviewBtn = document.getElementById('add-review-btn');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const createReviewBtn = document.getElementById('create-review-btn');
    const saveDraftBtn = document.getElementById('save-draft-btn');

    // Open modal
    addReviewBtn.addEventListener('click', function() {
        newReviewModal.style.display = 'flex';
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === newReviewModal) {
            closeModal();
        }
    });

    // Create review
    createReviewBtn.addEventListener('click', function() {
        // Get form data
        const employee = document.getElementById('employee').value;
        const reviewPeriod = document.getElementById('review-period').value;
        const reviewer = document.getElementById('reviewer').value;
        const dueDate = document.getElementById('due-date').value;

        // Validate form
        if (!employee || !reviewPeriod || !reviewer || !dueDate) {
            alert('Please fill in all required fields');
            return;
        }

        // Create new review object
        const newReview = {
            id: performanceReviews.length + 1,
            employeeName: getEmployeeName(employee),
            employeeId: 'EMP' + employee.padStart(3, '0'),
            avatar: `https://randomuser.me/api/portraits/${parseInt(employee) % 2 === 0 ? 'women' : 'men'}/${employee}.jpg`,
            department: getDepartment(employee),
            reviewPeriod: getReviewPeriodName(reviewPeriod),
            reviewer: getReviewerName(reviewer),
            rating: '',
            completionDate: '',
            status: 'Pending'
        };

        // Add to reviews array
        performanceReviews.unshift(newReview);

        // Update table
        populateReviewsTable(performanceReviews);

        // Close modal and reset form
        closeModal();
        document.getElementById('new-review-form').reset();

        // Show success message
        alert('Performance review created successfully!');
    });

    // Save as draft
    saveDraftBtn.addEventListener('click', function() {
        alert('Review saved as draft');
        closeModal();
    });

    // Filter functionality
    const departmentFilter = document.getElementById('department-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const periodFilter = document.getElementById('period-filter');

    departmentFilter.addEventListener('change', applyFilters);
    ratingFilter.addEventListener('change', applyFilters);
    periodFilter.addEventListener('change', applyFilters);

    function applyFilters() {
        const departmentValue = departmentFilter.value;
        const ratingValue = ratingFilter.value;
        const periodValue = periodFilter.value;

        let filteredReviews = [...performanceReviews];

        if (departmentValue !== 'all') {
            filteredReviews = filteredReviews.filter(review => review.department.toLowerCase() === departmentValue);
        }

        if (ratingValue !== 'all') {
            filteredReviews = filteredReviews.filter(review => review.rating.toLowerCase() === ratingValue);
        }

        if (periodValue !== 'all') {
            filteredReviews = filteredReviews.filter(review => review.reviewPeriod.toLowerCase().replace(' ', '-') === periodValue);
        }

        populateReviewsTable(filteredReviews);
    }

    // Helper functions
    function populateReviewsTable(reviews) {
        const tableBody = document.getElementById('reviews-table-body');
        tableBody.innerHTML = '';

        reviews.forEach(review => {
            const row = document.createElement('tr');
            
            // Create status badge class
            let statusClass = '';
            if (review.status === 'Completed') {
                statusClass = 'badge-success';
            } else if (review.status === 'In Progress') {
                statusClass = 'badge-warning';
            } else if (review.status === 'Pending') {
                statusClass = 'badge-info';
            }

            // Create rating badge class
            let ratingClass = '';
            if (review.rating === 'Excellent') {
                ratingClass = 'rating-excellent';
            } else if (review.rating === 'Good') {
                ratingClass = 'rating-good';
            } else if (review.rating === 'Average') {
                ratingClass = 'rating-average';
            } else if (review.rating === 'Needs Improvement') {
                ratingClass = 'rating-poor';
            } else if (review.rating === 'Unsatisfactory') {
                ratingClass = 'rating-unsatisfactory';
            }

            row.innerHTML = `
                <td>
                    <div class="employee-info">
                        <img src="${review.avatar}" alt="${review.employeeName}" class="employee-avatar">
                        <div>
                            <div class="employee-name">${review.employeeName}</div>
                            <div class="employee-id">${review.employeeId}</div>
                        </div>
                    </div>
                </td>
                <td>${review.department}</td>
                <td>${review.reviewPeriod}</td>
                <td>${review.reviewer}</td>
                <td>${review.rating ? `<span class="rating-badge ${ratingClass}">${review.rating}</span>` : '-'}</td>
                <td>${review.completionDate || '-'}</td>
                <td><span class="status-badge ${statusClass}">${review.status}</span></td>
                <td>
                    <div class="action-buttons">
                        ${review.status === 'Pending' ? `
                            <button class="action-btn start-btn" title="Start Review" data-id="${review.id}">
                                <span class="material-symbols-outlined">play_arrow</span>
                            </button>
                        ` : review.status === 'In Progress' ? `
                            <button class="action-btn edit-btn" title="Continue Review" data-id="${review.id}">
                                <span class="material-symbols-outlined">edit</span>
                            </button>
                        ` : `
                            <button class="action-btn view-btn" title="View Review" data-id="${review.id}">
                                <span class="material-symbols-outlined">visibility</span>
                            </button>
                        `}
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });

        // Add CSS for reviews table elements
        const style = document.createElement('style');
        style.textContent = `
            .employee-info {
                display: flex;
                align-items: center;
            }
            .employee-avatar {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                margin-right: 10px;
            }
            .employee-name {
                font-weight: 500;
            }
            .employee-id {
                font-size: 12px;
                color: var(--text-muted);
            }
            .status-badge {
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
            }
            .badge-success {
                background-color: rgba(66, 194, 125, 0.1);
                color: var(--secondary-color);
            }
            .badge-warning {
                background-color: rgba(255, 159, 67, 0.1);
                color: var(--warning-color);
            }
            .badge-info {
                background-color: rgba(104, 132, 231, 0.1);
                color: var(--primary-color);
            }
            .rating-badge {
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
            }
            .rating-excellent {
                background-color: rgba(66, 194, 125, 0.1);
                color: var(--secondary-color);
            }
            .rating-good {
                background-color: rgba(104, 132, 231, 0.1);
                color: var(--primary-color);
            }
            .rating-average {
                background-color: rgba(255, 159, 67, 0.1);
                color: var(--warning-color);
            }
            .rating-poor {
                background-color: rgba(241, 85, 85, 0.1);
                color: var(--danger-color);
            }
            .rating-unsatisfactory {
                background-color: rgba(0, 0, 0, 0.1);
                color: #666;
            }
            .action-buttons {
                display: flex;
                gap: 5px;
            }
            .action-btn {
                width: 28px;
                height: 28px;
                border-radius: 4px;
                border: none;
                background: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .action-btn:hover {
                background-color: var(--light-color);
            }
            .start-btn {
                color: var(--primary-color);
            }
            .edit-btn {
                color: var(--warning-color);
            }
            .view-btn {
                color: var(--dark-color);
            }
            .goal-badge, .feedback-badge {
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
            }
            .in-progress {
                background-color: rgba(104, 132, 231, 0.1);
                color: var(--primary-color);
            }
            .completed {
                background-color: rgba(66, 194, 125, 0.1);
                color: var(--secondary-color);
            }
            .overdue {
                background-color: rgba(241, 85, 85, 0.1);
                color: var(--danger-color);
            }
            .active {
                background-color: rgba(104, 132, 231, 0.1);
                color: var(--primary-color);
            }
            .draft {
                background-color: rgba(0, 0, 0, 0.1);
                color: #666;
            }
            .goal-card, .feedback-card {
                background-color: white;
                border-radius: 8px;
                box-shadow: var(--shadow);
                margin-bottom: 15px;
                overflow: hidden;
            }
            .goal-header, .feedback-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                border-bottom: 1px solid var(--border-color);
            }
            .goal-details, .feedback-details {
                padding: 15px;
            }
            .goal-info, .goal-progress, .goal-description, .goal-actions {
                margin-bottom: 15px;
            }
            .goal-actions, .feedback-actions {
                display: flex;
                gap: 10px;
            }
            .progress-label {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }
            .goals-header, .goals-filters, .feedback-header, .feedback-filters, .analytics-filters {
                margin-bottom: 20px;
            }
            .goals-header, .feedback-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .goals-filters, .feedback-filters, .analytics-filters {
                display: flex;
                gap: 15px;
            }
            .analytics-charts {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 20px;
            }
            .checkbox-group {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
            }
            .checkbox-item {
                display: flex;
                align-items: center;
                gap: 5px;
            }
        `;
        document.head.appendChild(style);

        // Add event listeners for action buttons
        document.querySelectorAll('.start-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                startReview(id);
            });
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                continueReview(id);
            });
        });

        document.querySelectorAll('.view-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                viewReview(id);
            });
        });
    }

    function initializeCharts() {
        // Rating Distribution Chart
        const ratingDistributionCtx = document.getElementById('ratingDistributionChart').getContext('2d');
        const ratingDistributionChart = new Chart(ratingDistributionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Excellent', 'Good', 'Average', 'Needs Improvement', 'Unsatisfactory'],
                datasets: [{
                    data: [25, 45, 20, 8, 2],
                    backgroundColor: [
                        '#42C27D',
                        '#6884E7',
                        '#FF9F43',
                        '#F15555',
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
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });

        // Department Performance Chart
        const departmentPerformanceCtx = document.getElementById('departmentPerformanceChart').getContext('2d');
        const departmentPerformanceChart = new Chart(departmentPerformanceCtx, {
            type: 'bar',
            data: {
                labels: ['IT', 'HR', 'Marketing', 'Finance', 'Operations'],
                datasets: [{
                    label: 'Average Rating',
                    data: [4.2, 3.8, 4.0, 3.9, 3.7],
                    backgroundColor: '#6884E7',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });

        // Performance Trend Chart
        const performanceTrendCtx = document.getElementById('performanceTrendChart').getContext('2d');
        const performanceTrendChart = new Chart(performanceTrendCtx, {
            type: 'line',
            data: {
                labels: ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023'],
                datasets: [{
                    label: 'IT',
                    data: [3.8, 3.9, 4.0, 4.2, 4.3],
                    borderColor: '#6884E7',
                    tension: 0.4,
                    fill: false
                }, {
                    label: 'Marketing',
                    data: [3.7, 3.8, 3.9, 4.0, 4.1],
                    borderColor: '#42C27D',
                    tension: 0.4,
                    fill: false
                }, {
                    label: 'Finance',
                    data: [3.9, 3.8, 3.7, 3.9, 4.0],
                    borderColor: '#FF9F43',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 3.5,
                        max: 4.5,
                        ticks: {
                            stepSize: 0.5
                        }
                    }
                }
            }
        });

        // Goal Completion Chart
        const goalCompletionCtx = document.getElementById('goalCompletionChart').getContext('2d');
        const goalCompletionChart = new Chart(goalCompletionCtx, {
            type: 'bar',
            data: {
                labels: ['IT', 'HR', 'Marketing', 'Finance', 'Operations'],
                datasets: [{
                    label: 'Completed',
                    data: [85, 92, 78, 88, 80],
                    backgroundColor: '#42C27D',
                    borderRadius: 4
                }, {
                    label: 'In Progress',
                    data: [10, 5, 15, 7, 12],
                    backgroundColor: '#6884E7',
                    borderRadius: 4
                }, {
                    label: 'Overdue',
                    data: [5, 3, 7, 5, 8],
                    backgroundColor: '#F15555',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    function startReview(id) {
        const review = performanceReviews.find(r => r.id === id);
        if (review) {
            review.status = 'In Progress';
            populateReviewsTable(performanceReviews);
            alert(`Started review for ${review.employeeName}`);
        }
    }

    function continueReview(id) {
        const review = performanceReviews.find(r => r.id === id);
        if (review) {
            alert(`Continuing review for ${review.employeeName}`);
        }
    }

    function viewReview(id) {
        const review = performanceReviews.find(r => r.id === id);
        if (review) {
            alert(`Viewing review for ${review.employeeName}`);
        }
    }

    function closeModal() {
        newReviewModal.style.display = 'none';
    }

    function getEmployeeName(id) {
        const names = {
            '1': 'John Smith',
            '2': 'Emily Johnson',
            '3': 'Michael Brown',
            '4': 'Sarah Davis',
            '5': 'David Wilson'
        };
        return names[id] || `Employee ${id}`;
    }

    function getDepartment(id) {
        const departments = {
            '1': 'IT',
            '2': 'Marketing',
            '3': 'Design',
            '4': 'HR',
            '5': 'Finance'
        };
        return departments[id] || 'General';
    }

    function getReviewPeriodName(value) {
        const periods = {
            'q1-2023': 'Q1 2023',
            'q4-2022': 'Q4 2022',
            'q3-2022': 'Q3 2022',
            'q2-2022': 'Q2 2022'
        };
        return periods[value] || value;
    }

    function getReviewerName(id) {
        const reviewers = {
            '1': 'Sarah Johnson',
            '2': 'Robert Anderson',
            '3': 'Jennifer Taylor'
        };
        return reviewers[id] || `Reviewer ${id}`;
    }
});
