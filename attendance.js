document.addEventListener('DOMContentLoaded', function() {
    // Set current month
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long' };
    document.getElementById('current-month').textContent = currentDate.toLocaleDateString('en-US', options);

    // Sample attendance data
    const attendanceData = [
        {
            id: 'EMP001',
            name: 'John Smith',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            department: 'IT',
            clockIn: '08:55 AM',
            clockOut: '05:30 PM',
            status: 'Present',
            workingHours: '8h 35m'
        },
        {
            id: 'EMP002',
            name: 'Emily Johnson',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            department: 'Marketing',
            clockIn: '09:10 AM',
            clockOut: '06:15 PM',
            status: 'Late',
            workingHours: '9h 05m'
        },
        {
            id: 'EMP003',
            name: 'Michael Brown',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            department: 'Design',
            clockIn: '',
            clockOut: '',
            status: 'Absent',
            workingHours: '0h 00m'
        },
        {
            id: 'EMP004',
            name: 'Sarah Davis',
            avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
            department: 'HR',
            clockIn: '08:45 AM',
            clockOut: '05:15 PM',
            status: 'Present',
            workingHours: '8h 30m'
        },
        {
            id: 'EMP005',
            name: 'David Wilson',
            avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
            department: 'Finance',
            clockIn: '08:30 AM',
            clockOut: '05:00 PM',
            status: 'Present',
            workingHours: '8h 30m'
        },
        {
            id: 'EMP006',
            name: 'Jennifer Taylor',
            avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
            department: 'IT',
            clockIn: '09:05 AM',
            clockOut: '05:45 PM',
            status: 'Late',
            workingHours: '8h 40m'
        },
        {
            id: 'EMP007',
            name: 'Robert Anderson',
            avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
            department: 'Operations',
            clockIn: '08:50 AM',
            clockOut: '01:30 PM',
            status: 'Half Day',
            workingHours: '4h 40m'
        },
        {
            id: 'EMP008',
            name: 'Lisa Thomas',
            avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
            department: 'Marketing',
            clockIn: '08:40 AM',
            clockOut: '05:10 PM',
            status: 'Present',
            workingHours: '8h 30m'
        },
        {
            id: 'EMP009',
            name: 'James White',
            avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
            department: 'IT',
            clockIn: '08:35 AM',
            clockOut: '05:05 PM',
            status: 'Present',
            workingHours: '8h 30m'
        },
        {
            id: 'EMP010',
            name: 'Patricia Clark',
            avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
            department: 'Finance',
            clockIn: '',
            clockOut: '',
            status: 'Absent',
            workingHours: '0h 00m'
        }
    ];

    // Populate daily attendance table
    populateAttendanceTable(attendanceData);

    // Generate monthly calendar
    generateMonthlyCalendar();

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

    // Filter functionality
    const departmentFilter = document.getElementById('department-filter');
    const statusFilter = document.getElementById('status-filter');
    const dateFilter = document.getElementById('date-filter');

    departmentFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    dateFilter.addEventListener('change', applyFilters);

    function applyFilters() {
        const departmentValue = departmentFilter.value;
        const statusValue = statusFilter.value;

        let filteredData = [...attendanceData];

        if (departmentValue !== 'all') {
            filteredData = filteredData.filter(item => item.department.toLowerCase() === departmentValue);
        }

        if (statusValue !== 'all') {
            filteredData = filteredData.filter(item => item.status.toLowerCase() === statusValue);
        }

        populateAttendanceTable(filteredData);
    }

    // Helper functions
    function populateAttendanceTable(data) {
        const tableBody = document.getElementById('daily-attendance-table');
        tableBody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');
            
            // Create status badge class
            let statusClass = '';
            if (item.status === 'Present') {
                statusClass = 'badge-success';
            } else if (item.status === 'Late') {
                statusClass = 'badge-warning';
            } else if (item.status === 'Absent') {
                statusClass = 'badge-danger';
            } else if (item.status === 'Half Day') {
                statusClass = 'badge-info';
            }

            row.innerHTML = `
                <td>
                    <div class="employee-info">
                        <img src="${item.avatar}" alt="${item.name}" class="employee-avatar">
                        <div>
                            <div class="employee-name">${item.name}</div>
                        </div>
                    </div>
                </td>
                <td>${item.id}</td>
                <td>${item.department}</td>
                <td>${item.clockIn || '-'}</td>
                <td>${item.clockOut || '-'}</td>
                <td><span class="status-badge ${statusClass}">${item.status}</span></td>
                <td>${item.workingHours}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" title="Edit">
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button class="action-btn view-btn" title="View Details">
                            <span class="material-symbols-outlined">visibility</span>
                        </button>
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });

        // Add CSS for attendance table elements
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
            .badge-info {
                background-color: rgba(104, 132, 231, 0.1);
                color: var(--primary-color);
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
            .edit-btn {
                color: var(--primary-color);
            }
            .view-btn {
                color: var(--dark-color);
            }
        `;
        document.head.appendChild(style);
    }

    function generateMonthlyCalendar() {
        const calendarContainer = document.getElementById('monthly-calendar');
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
            
            // Add some sample leave data
            if (i === 15) {
                dayElement.innerHTML += `
                    <div class="leave-item" style="background-color: rgba(104, 132, 231, 0.2); color: #6884E7;">
                        John S. - Annual Leave
                    </div>
                `;
            }
            
            if (i === 16) {
                dayElement.innerHTML += `
                    <div class="leave-item" style="background-color: rgba(104, 132, 231, 0.2); color: #6884E7;">
                        John S. - Annual Leave
                    </div>
                    <div class="leave-item" style="background-color: rgba(241, 85, 85, 0.2); color: #F15555;">
                        Emily J. - Sick Leave
                    </div>
                `;
            }
            
            if (i === 22) {
                dayElement.innerHTML += `
                    <div class="leave-item" style="background-color: rgba(66, 194, 125, 0.2); color: #42C27D;">
                        Michael B. - Personal Leave
                    </div>
                `;
            }
            
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
});