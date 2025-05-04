document.addEventListener('DOMContentLoaded', function() {
    // Sample payslip data
    const payslips = [
        {
            id: 1,
            employeeName: 'John Smith',
            employeeId: 'EMP001',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            department: 'IT',
            position: 'Senior Developer',
            salary: 8500,
            overtime: 350,
            deductions: 2100,
            netPay: 6750,
            status: 'Paid'
        },
        {
            id: 2,
            employeeName: 'Emily Johnson',
            employeeId: 'EMP002',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            department: 'Marketing',
            position: 'Marketing Manager',
            salary: 7800,
            overtime: 0,
            deductions: 1950,
            netPay: 5850,
            status: 'Paid'
        },
        {
            id: 3,
            employeeName: 'Michael Brown',
            employeeId: 'EMP003',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            department: 'Design',
            position: 'Senior Designer',
            salary: 7200,
            overtime: 280,
            deductions: 1850,
            netPay: 5630,
            status: 'Paid'
        },
        {
            id: 4,
            employeeName: 'Sarah Davis',
            employeeId: 'EMP004',
            avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
            department: 'HR',
            position: 'HR Specialist',
            salary: 6500,
            overtime: 0,
            deductions: 1600,
            netPay: 4900,
            status: 'Paid'
        },
        {
            id: 5,
            employeeName: 'David Wilson',
            employeeId: 'EMP005',
            avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
            department: 'Finance',
            position: 'Financial Analyst',
            salary: 7000,
            overtime: 420,
            deductions: 1850,
            netPay: 5570,
            status: 'Paid'
        },
        {
            id: 6,
            employeeName: 'Jennifer Taylor',
            employeeId: 'EMP006',
            avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
            department: 'IT',
            position: 'QA Engineer',
            salary: 6800,
            overtime: 510,
            deductions: 1830,
            netPay: 5480,
            status: 'Paid'
        },
        {
            id: 7,
            employeeName: 'Robert Anderson',
            employeeId: 'EMP007',
            avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
            department: 'Operations',
            position: 'Operations Manager',
            salary: 8200,
            overtime: 0,
            deductions: 2050,
            netPay: 6150,
            status: 'Paid'
        },
        {
            id: 8,
            employeeName: 'Lisa Thomas',
            employeeId: 'EMP008',
            avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
            department: 'Marketing',
            position: 'Content Specialist',
            salary: 5800,
            overtime: 290,
            deductions: 1520,
            netPay: 4570,
            status: 'Paid'
        },
        {
            id: 9,
            employeeName: 'James White',
            employeeId: 'EMP009',
            avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
            department: 'IT',
            position: 'Frontend Developer',
            salary: 7500,
            overtime: 380,
            deductions: 1970,
            netPay: 5910,
            status: 'Paid'
        },
        {
            id: 10,
            employeeName: 'Patricia Clark',
            employeeId: 'EMP010',
            avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
            department: 'Finance',
            position: 'Accountant',
            salary: 6200,
            overtime: 0,
            deductions: 1550,
            netPay: 4650,
            status: 'Paid'
        }
    ];

    // Populate payslips table
    populatePayslipsTable(payslips);

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

    // Run Payroll Modal
    const runPayrollModal = document.getElementById('run-payroll-modal');
    const runPayrollBtn = document.getElementById('run-payroll-btn');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const confirmPayrollBtn = document.getElementById('confirm-payroll-btn');

    // Open modal
    runPayrollBtn.addEventListener('click', function() {
        runPayrollModal.style.display = 'flex';
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === runPayrollModal) {
            closeModal();
        }
    });

    // Confirm payroll
    confirmPayrollBtn.addEventListener('click', function() {
        alert('Payroll processed successfully!');
        closeModal();
    });

    // Filter functionality
    const departmentFilter = document.getElementById('department-filter');
    const statusFilter = document.getElementById('status-filter');
    const monthFilter = document.getElementById('month-filter');

    departmentFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    monthFilter.addEventListener('change', applyFilters);

    function applyFilters() {
        const departmentValue = departmentFilter.value;
        const statusValue = statusFilter.value;

        let filteredPayslips = [...payslips];

        if (departmentValue !== 'all') {
            filteredPayslips = filteredPayslips.filter(payslip => payslip.department.toLowerCase() === departmentValue);
        }

        if (statusValue !== 'all') {
            filteredPayslips = filteredPayslips.filter(payslip => payslip.status.toLowerCase() === statusValue);
        }

        populatePayslipsTable(filteredPayslips);
    }

    // Helper functions
    function populatePayslipsTable(payslipsList) {
        const tableBody = document.getElementById('payslips-table-body');
        tableBody.innerHTML = '';

        payslipsList.forEach(payslip => {
            const row = document.createElement('tr');
            
            // Create status badge class
            let statusClass = '';
            if (payslip.status === 'Paid') {
                statusClass = 'badge-success';
            } else if (payslip.status === 'Pending') {
                statusClass = 'badge-warning';
            } else if (payslip.status === 'Failed') {
                statusClass = 'badge-danger';
            }

            row.innerHTML = `
                <td>
                    <div class="employee-info">
                        <img src="${payslip.avatar}" alt="${payslip.employeeName}" class="employee-avatar">
                        <div>
                            <div class="employee-name">${payslip.employeeName}</div>
                            <div class="employee-email">employee${payslip.employeeId.substring(3)}@company.com</div>
                        </div>
                    </div>
                </td>
                <td>${payslip.employeeId}</td>
                <td>${payslip.department}</td>
                <td>${payslip.position}</td>
                <td>$${payslip.salary.toLocaleString()}</td>
                <td>$${payslip.overtime.toLocaleString()}</td>
                <td>$${payslip.deductions.toLocaleString()}</td>
                <td>$${payslip.netPay.toLocaleString()}</td>
                <td><span class="status-badge ${statusClass}">${payslip.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn view-btn" title="View Payslip" data-id="${payslip.id}">
                            <span class="material-symbols-outlined">visibility</span>
                        </button>
                        <button class="action-btn download-btn" title="Download PDF" data-id="${payslip.id}">
                            <span class="material-symbols-outlined">download</span>
                        </button>
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });

        // Add CSS for payslips table elements
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
            .employee-email {
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
            .view-btn {
                color: var(--primary-color);
            }
            .download-btn {
                color: var(--secondary-color);
            }
            .component-badge {
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
                background-color: rgba(104, 132, 231, 0.1);
                color: var(--primary-color);
            }
            .component-card {
                background-color: white;
                border-radius: 8px;
                box-shadow: var(--shadow);
                margin-bottom: 15px;
                overflow: hidden;
            }
            .component-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                border-bottom: 1px solid var(--border-color);
            }
            .component-details {
                padding: 15px;
            }
            .component-actions {
                margin-top: 15px;
                display: flex;
                gap: 10px;
            }
            .salary-header, .deductions-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            .salary-components-list, .deductions-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 15px;
            }
            .payroll-summary {
                margin-bottom: 20px;
            }
            .summary-item {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid var(--border-color);
            }
            .summary-item.total {
                font-weight: 600;
                font-size: 16px;
                border-top: 2px solid var(--border-color);
                border-bottom: none;
                padding-top: 15px;
            }
            .payroll-confirmation {
                margin-top: 20px;
            }
            .payroll-confirmation h3 {
                margin-bottom: 10px;
            }
            .payroll-confirmation ul {
                margin: 10px 0;
                padding-left: 20px;
            }
            .payroll-confirmation ul li {
                margin-bottom: 5px;
            }
            .danger-btn {
                background-color: var(--danger-color);
                color: white;
                border: none;
                border-radius: 4px;
                padding: 8px 15px;
                cursor: pointer;
                transition: var(--transition);
            }
            .danger-btn:hover {
                background-color: #e04141;
            }
        `;
        document.head.appendChild(style);

        // Add event listeners for action buttons
        document.querySelectorAll('.view-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                viewPayslip(id);
            });
        });

        document.querySelectorAll('.download-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                downloadPayslip(id);
            });
        });
    }

    function viewPayslip(id) {
        const payslip = payslips.find(p => p.id === id);
        if (payslip) {
            alert(`Viewing payslip for ${payslip.employeeName}`);
        }
    }

    function downloadPayslip(id) {
        const payslip = payslips.find(p => p.id === id);
        if (payslip) {
            alert(`Downloading payslip for ${payslip.employeeName}`);
        }
    }

    function closeModal() {
        runPayrollModal.style.display = 'none';
    }
});