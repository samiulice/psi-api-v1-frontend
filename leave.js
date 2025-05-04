document.addEventListener('DOMContentLoaded', function() {
    // Sample leave requests data
    const leaveRequests = [
        {
            id: 1,
            employeeName: 'John Smith',
            employeeId: 'EMP001',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            leaveType: 'Annual Leave',
            startDate: '2023-01-15',
            endDate: '2023-01-16',
            days: 2,
            reason: 'Family vacation',
            status: 'Approved',
            appliedOn: '2023-01-05'
        },
        {
            id: 2,
            employeeName: 'Emily Johnson',
            employeeId: 'EMP002',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            leaveType: 'Sick Leave',
            startDate: '2023-01-16',
            endDate: '2023-01-16',
            days: 1,
            reason: 'Not feeling well',
            status: 'Approved',
            appliedOn: '2023-01-15'
        },
        {
            id: 3,
            employeeName: 'Michael Brown',
            employeeId: 'EMP003',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            leaveType: 'Personal Leave',
            startDate: '2023-01-22',
            endDate: '2023-01-22',
            days: 1,
            reason: 'Personal matter',
            status: 'Approved',
            appliedOn: '2023-01-10'
        },
        {
            id: 4,
            employeeName: 'Sarah Davis',
            employeeId: 'EMP004',
            avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
            leaveType: 'Annual Leave',
            startDate: '2023-01-25',
            endDate: '2023-01-27',
            days: 3,
            reason: 'Family event',
            status: 'Pending',
            appliedOn: '2023-01-12'
        },
        {
            id: 5,
            employeeName: 'David Wilson',
            employeeId: 'EMP005',
            avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
            leaveType: 'Annual Leave',
            startDate: '2023-02-05',
            endDate: '2023-02-09',
            days: 5,
            reason: 'Vacation',
            status: 'Pending',
            appliedOn: '2023-01-15'
        },
        {
            id: 6,
            employeeName: 'Jennifer Taylor',
            employeeId: 'EMP006',
            avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
            leaveType: 'Sick Leave',
            startDate: '2023-01-18',
            endDate: '2023-01-19',
            days: 2,
            reason: 'Doctor appointment',
            status: 'Rejected',
            appliedOn: '2023-01-17'
        },
        {
            id: 7,
            employeeName: 'Robert Anderson',
            employeeId: 'EMP007',
            avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
            leaveType: 'Personal Leave',
            startDate: '2023-01-30',
            endDate: '2023-01-30',
            days: 1,
            reason: 'Personal matter',
            status: 'Pending',
            appliedOn: '2023-01-20'
        }
    ];

    // Sample my leave requests data (for current user - Sarah Johnson)
    const myLeaveRequests = [
        {
            id: 8,
            leaveType: 'Annual Leave',
            startDate: '2023-02-15',
            endDate: '2023-02-17',
            days: 3,
            reason: 'Family vacation',
            status: 'Approved',
            appliedOn: '2023-01-10'
        },
        {
            id: 9,
            leaveType: 'Sick Leave',
            startDate: '2023-01-08',
            endDate: '2023-01-08',
            days: 1,
            reason: 'Not feeling well',
            status: 'Approved',
            appliedOn: '2023-01-07'
        },
        {
            id: 10,
            leaveType: 'Personal Leave',
            startDate: '2023-03-05',
            endDate: '2023-03-05',
            days: 1,
            reason: 'Personal matter',
            status: 'Pending',
            appliedOn: '2023-01-25'
        }
    ];

    // Populate leave requests table
    populateLeaveRequestsTable(leaveRequests);

    // Populate my leave requests table
    populateMyLeaveRequestsTable(myLeaveRequests);

    // Generate leave calendar
    generateLeaveCalendar();

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

    // Apply for Leave Modal
    const applyLeaveModal = document.getElementById('apply-leave-modal');
    const applyLeaveBtn = document.getElementById('add-leave-btn');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const submitLeaveBtn = document.getElementById('submit-leave-btn');

    // Open modal
    applyLeaveBtn.addEventListener('click', function() {
        applyLeaveModal.style.display = 'flex';
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === applyLeaveModal) {
            closeModal();
        }
    });

    // Calculate number of days between dates
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const daysInput = document.getElementById('days');

    function calculateDays() {
        if (startDateInput.value && endDateInput.value) {
            const startDate = new Date(startDateInput.value);
            const endDate = new Date(endDateInput.value);
            
            // Check if end date is before start date
            if (endDate < startDate) {
                endDateInput.value = startDateInput.value;
                daysInput.value = 1;
                return;
            }
            
            // Calculate difference in days
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            
            daysInput.value = diffDays;
        }
    }

    startDateInput.addEventListener('change', calculateDays);
    endDateInput.addEventListener('change', calculateDays);

    // Submit leave request
    submitLeaveBtn.addEventListener('click', function() {
        // Get form data
        const leaveType = document.getElementById('leave-type').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const days = document.getElementById('days').value;
        const reason = document.getElementById('reason').value;

        // Validate form
        if (!leaveType || !startDate || !endDate || !days || !reason) {
            alert('Please fill in all required fields');
            return;
        }

        // Create new leave request object
        const newLeaveRequest = {
            id: myLeaveRequests.length + 11,
            leaveType: getLeaveTypeName(leaveType),
            startDate,
            endDate,
            days: parseInt(days),
            reason,
            status: 'Pending',
            appliedOn: new Date().toISOString().split('T')[0]
        };

        // Add to my leave requests array
        myLeaveRequests.unshift(newLeaveRequest);

        // Update table
        populateMyLeaveRequestsTable(myLeaveRequests);

        // Close modal and reset form
        closeModal();
        document.getElementById('apply-leave-form').reset();

        // Show success message
        alert('Leave request submitted successfully!');
    });

    // Filter functionality
    const departmentFilter = document.getElementById('department-filter');
    const statusFilter = document.getElementById('status-filter');
    const dateFromInput = document.getElementById('date-from');
    const dateToInput = document.getElementById('date-to');

    departmentFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    dateFromInput.addEventListener('change', applyFilters);
    dateToInput.addEventListener('change', applyFilters);

    function applyFilters() {
        const departmentValue = departmentFilter.value;
        const statusValue = statusFilter.value;
        const dateFrom = new Date(dateFromInput.value);
        const dateTo = new Date(dateToInput.value);

        let filteredRequests = [...leaveRequests];

        if (departmentValue !== 'all') {
            // This is a mock filter since we don't have department in the leave requests
            // In a real application, you would filter by department
        }

        if (statusValue !== 'all') {
            filteredRequests = filteredRequests.filter(req => req.status.toLowerCase() === statusValue);
        }

        // Filter by date range
        filteredRequests = filteredRequests.filter(req => {
            const reqStartDate = new Date(req.startDate);
            return reqStartDate >= dateFrom && reqStartDate <= dateTo;
        });

        populateLeaveRequestsTable(filteredRequests);
    }

    // Helper functions
    function populateLeaveRequestsTable(requests) {
        const tableBody = document.getElementById('leave-requests-table');
        tableBody.innerHTML = '';

        requests.forEach(request => {
            const row = document.createElement('tr');
            
            // Create status badge class
            let statusClass = '';
            if (request.status === 'Approved') {
                statusClass = 'badge-success';
            } else if (request.status === 'Pending') {
                statusClass = 'badge-warning';
            } else if (request.status === 'Rejected') {
                statusClass = 'badge-danger';
            }

            // Format dates
            const startDate = new Date(request.startDate);
            const endDate = new Date(request.endDate);
            const formattedStartDate = startDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            const formattedEndDate = endDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            row.innerHTML = `
                <td>
                    <div class="employee-info">
                        <img src="${request.avatar}" alt="${request.employeeName}" class="employee-avatar">
                        <div>
                            <div class="employee-name">${request.employeeName}</div>
                            <div class="employee-id">${request.employeeId}</div>
                        </div>
                    </div>
                </td>
                <td>${request.leaveType}</td>
                <td>${formattedStartDate}</td>
                <td>${formattedEndDate}</td>
                <td>${request.days}</td>
                <td>${request.reason}</td>
                <td><span class="status-badge ${statusClass}">${request.status}</span></td>
                <td>
                    <div class="action-buttons">
                        ${request.status === 'Pending' ? `
                            <button class="action-btn approve-btn" title="Approve" data-id="${request.id}">
                                <span class="material-symbols-outlined">check_circle</span>
                            </button>
                            <button class="action-btn reject-btn" title="Reject" data-id="${request.id}">
                                <span class="material-symbols-outlined">cancel</span>
                            </button>
                        ` : `
                            <button class="action-btn view-btn" title="View Details" data-id="${request.id}">
                                <span class="material-symbols-outlined">visibility</span>
                            </button>
                        `}
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });

        // Add event listeners for approve and reject buttons
        document.querySelectorAll('.approve-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                updateLeaveStatus(id, 'Approved');
            });
        });

        document.querySelectorAll('.reject-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                updateLeaveStatus(id, 'Rejected');
            });
        });

        // Add CSS for leave requests table elements
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
            .badge-danger {
                background-color: rgba(241, 85, 85, 0.1);
                color: var(--danger-color);
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
            .approve-btn {
                color: var(--secondary-color);
            }
            .reject-btn {
                color: var(--danger-color);
            }
            .view-btn {
                color: var(--dark-color);
            }
        `;
        document.head.appendChild(style);
    }

    function populateMyLeaveRequestsTable(requests) {
        const tableBody = document.getElementById('my-leave-requests-table');
        tableBody.innerHTML = '';

        requests.forEach(request => {
            const row = document.createElement('tr');
            
            // Create status badge class
            let statusClass = '';
            if (request.status === 'Approved') {
                statusClass = 'badge-success';
            } else if (request.status === 'Pending') {
                statusClass = 'badge-warning';
            } else if (request.status === 'Rejected') {
                statusClass = 'badge-danger';
            }

            // Format dates
            const startDate = new Date(request.startDate);
            const endDate = new Date(request.endDate);
            const appliedDate = new Date(request.appliedOn);
            
            const formattedStartDate = startDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            const formattedEndDate = endDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            const formattedAppliedDate = appliedDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            row.innerHTML = `
                <td>${request.leaveType}</td>
                <td>${formattedStartDate}</td>
                <td>${formattedEndDate}</td>
                <td>${request.days}</td>
                <td>${request.reason}</td>
                <td>${formattedAppliedDate}</td>
                <td><span class="status-badge ${statusClass}">${request.status}</span></td>
                <td>
                    <div class="action-buttons">
                        ${request.status === 'Pending' ? `
                            <button class="action-btn edit-btn" title="Edit" data-id="${request.id}">
                                <span class="material-symbols-outlined">edit</span>
                            </button>
                            <button class="action-btn delete-btn" title="Cancel" data-id="${request.id}">
                                <span class="material-symbols-outlined">delete</span>
                            </button>
                        ` : `
                            <button class="action-btn view-btn" title="View Details" data-id="${request.id}">
                                <span class="material-symbols-outlined">visibility</span>
                            </button>
                        `}
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }

    function generateLeaveCalendar() {
        const calendarContainer = document.getElementById('leave-calendar');
        calendarContainer.innerHTML = '';

        // Get current month details
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Get first day of month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Get days from previous month
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Day names
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        // Add day headers
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.innerHTML = `<div class="day-name">${day}</div>`;
            calendarContainer.appendChild(dayHeader);
        });
        
        // Add days from previous month
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day other-month';
            dayElement.innerHTML = `
                <div class="calendar-day-header">
                    <div class="day-number">${day}</div>
                </div>
            `;
            calendarContainer.appendChild(dayElement);
        }
        
        // Add days of current month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            // Check if it's today
            if (i === currentDate.getDate()) {
                dayElement.classList.add('today');
            }
            
            dayElement.innerHTML = `
                <div class="calendar-day-header">
                    <div class="day-number">${i}</div>
                </div>
            `;
            
            // Add leave data from our leave requests
            leaveRequests.forEach(request => {
                const startDate = new Date(request.startDate);
                const endDate = new Date(request.endDate);
                
                // Check if this day is within the leave period
                if (startDate.getMonth() === month && startDate.getFullYear() === year) {
                    if (startDate.getDate() <= i && endDate.getDate() >= i) {
                        let leaveColor = '';
                        
                        // Set color based on leave type
                        if (request.leaveType === 'Annual Leave') {
                            leaveColor = '#6884E7';
                        } else if (request.leaveType === 'Sick Leave') {
                            leaveColor = '#F15555';
                        } else if (request.leaveType === 'Personal Leave') {
                            leaveColor = '#42C27D';
                        } else {
                            leaveColor = '#FF9F43';
                        }
                        
                        dayElement.innerHTML += `
                            <div class="leave-item" style="background-color: rgba(${leaveColor.substring(1, 3)}, ${leaveColor.substring(3, 5)}, ${leaveColor.substring(5, 7)}, 0.2); color: ${leaveColor};">
                                ${request.employeeName.split(' ')[0]} - ${request.leaveType}
                            </div>
                        `;
                    }
                }
            });
            
            calendarContainer.appendChild(dayElement);
        }
        
        // Add days from next month
        const totalCells = 42; // 6 rows of 7 days
        const cellsToAdd = totalCells - (firstDay + daysInMonth);
        
        for (let i = 1; i <= cellsToAdd; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day other-month';
            dayElement.innerHTML = `
                <div class="calendar-day-header">
                    <div class="day-number">${i}</div>
                </div>
            `;
            calendarContainer.appendChild(dayElement);
        }
    }

    function updateLeaveStatus(id, status) {
        // Find the leave request
        const request = leaveRequests.find(req => req.id === id);
        
        if (request) {
            // Update status
            request.status = status;
            
            // Update table
            populateLeaveRequestsTable(leaveRequests);
            
            // Show success message
            alert(`Leave request ${status.toLowerCase()} successfully!`);
        }
    }

    function getLeaveTypeName(value) {
        const leaveTypes = {
            'annual': 'Annual Leave',
            'sick': 'Sick Leave',
            'personal': 'Personal Leave',
            'maternity': 'Maternity Leave',
            'paternity': 'Paternity Leave',
            'unpaid': 'Unpaid Leave'
        };
        
        return leaveTypes[value] || value;
    }

    function closeModal() {
        applyLeaveModal.style.display = 'none';
    }
});