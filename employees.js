document.addEventListener('DOMContentLoaded', function () {
    let employees
    // fetch employee data from backend
    fetch("https://psi-api-v1-3.onrender.com/api/v1/users/list", { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            employees = data.employees || []
            console.log(data)
            if (data.error == false) {
                // Populate employees table
                populateEmployeesTable(employees);
            }
        })



    // Add Employee Modal
    const addEmployeeModal = document.getElementById('add-employee-modal');
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const saveEmployeeBtn = document.getElementById('save-employee-btn');

    // Open modal
    addEmployeeBtn.addEventListener('click', function () {
        addEmployeeModal.style.display = 'flex';
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === addEmployeeModal) {
            closeModal();
        }
    });

    // Save employee
    saveEmployeeBtn.addEventListener('click', function () {
        // Get form data
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const department = document.getElementById('department').value;
        const position = document.getElementById('position').value;
        const hireDate = document.getElementById('hire-date').value;

        // Validate form
        if (!firstName || !lastName || !email || !department || !position || !hireDate) {
            alert('Please fill in all required fields');
            return;
        }

        // Create new employee object
        const newEmployee = {
            id: 'EMP' + (employees.length + 1).toString().padStart(3, '0'),
            firstName,
            lastName,
            avatar: 'https://randomuser.me/api/portraits/men/' + (Math.floor(Math.random() * 50) + 1) + '.jpg',
            department,
            position,
            status: 'Active',
            hireDate
        };

        // Add to employees array
        employees.unshift(newEmployee);

        // Update table
        populateEmployeesTable(employees);

        // Close modal and reset form
        closeModal();
        document.getElementById('add-employee-form').reset();
    });

    // Filter functionality
    const departmentFilter = document.getElementById('department-filter');
    const positionFilter = document.getElementById('position-filter');
    const statusFilter = document.getElementById('status-filter');

    departmentFilter.addEventListener('change', applyFilters);
    positionFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);

    function applyFilters() {
        const departmentValue = departmentFilter.value;
        const positionValue = positionFilter.value;
        const statusValue = statusFilter.value;

        let filteredEmployees = [...employees];

        if (departmentValue !== 'all') {
            filteredEmployees = filteredEmployees.filter(emp => emp.department.toLowerCase() === departmentValue);
        }

        if (positionValue !== 'all') {
            filteredEmployees = filteredEmployees.filter(emp => emp.position.toLowerCase().includes(positionValue));
        }

        if (statusValue !== 'all') {
            filteredEmployees = filteredEmployees.filter(emp => emp.status.toLowerCase().replace(' ', '-') === statusValue);
        }

        populateEmployeesTable(filteredEmployees);
    }

    // Helper functions
    function populateEmployeesTable(employeesList) {
        const tableBody = document.getElementById('employees-table-body');
        tableBody.innerHTML = '';

        employeesList.forEach(employee => {
            const row = document.createElement('tr');

            // Create status badge class
            let statusClass = '';
            if (employee.status === 'Active') {
                statusClass = 'badge-success';
            } else if (employee.status === 'On Leave') {
                statusClass = 'badge-warning';
            } else if (employee.status === 'Terminated') {
                statusClass = 'badge-danger';
            }

            // Format hire date
            const hireDate = new Date(employee.hireDate);
            employee.avatar= "unknown.png";

            const formattedDate = hireDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            row.innerHTML = `
                <td><input type="checkbox" class="employee-checkbox"></td>
                <td>
                    <div class="employee-info">
                        <img src="${employee.avatar}" alt="${employee.name}" class="employee-avatar">
                        <div>
                            <div class="employee-name">${employee.name}</div>
                            <div class="employee-email">employee${employee.id}@company.com</div>
                        </div>
                    </div>
                </td>
                <td>${employee.id}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td><span class="status-badge ${statusClass}">${employee.status}</span></td>
                <td>${formattedDate}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" title="Edit">
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button class="action-btn delete-btn" title="Delete">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        });

        // Add CSS for employee table elements
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
            .edit-btn {
                color: var(--primary-color);
            }
            .delete-btn {
                color: var(--danger-color);
            }
        `;
        document.head.appendChild(style);
    }

    function closeModal() {
        addEmployeeModal.style.display = 'none';
    }
});