// State
const allEmployees = getEmployeesFromLocalStorage()
const allDepartmentData = initializeAllDepartment();
const total = {
    name: 'Total',
    numOfEmployee: 0,
    totalSalary: 0,
    avgSalary: 0
}

// Selector
const table = document.getElementById('accounting-table')
const tableBody = table.querySelector('tbody')
const tableFooter = table.querySelector('tfoot')

// init 
updateAllDepartmentData();
renderTable();


// render functions
function renderTable() {
    for (const dep of Object.values(allDepartmentData)) {
        const rowEl = createTableRow(dep)
        tableBody.append(rowEl)
    }

    // footer
    tableFooter.append(createTableRow(total))
}

function createTableRow(rowData) {
    const trEl = document.createElement('tr');

    const departmentNameTD = document.createElement('td')
    trEl.append(departmentNameTD);
    departmentNameTD.textContent = rowData.name;

    const numOfEmployeeTD = document.createElement('td')
    trEl.append(numOfEmployeeTD);
    numOfEmployeeTD.textContent = rowData.numOfEmployee;

    const totalSalaryTD = document.createElement('td')
    trEl.append(totalSalaryTD)
    totalSalaryTD.textContent = Math.round(rowData.totalSalary);

    const avgSalaryTD = document.createElement('td')
    trEl.append(avgSalaryTD)
    avgSalaryTD.textContent = Math.round(rowData.avgSalary);

    return trEl
}

// functions
function updateAllDepartmentData() {

    for (let i = 0; i < allEmployees.length; i++) {
        const employee = allEmployees[i];

        if (allDepartmentData[employee.department]) {
            const dep = allDepartmentData[employee.department]
            dep.numOfEmployee++;
            dep.totalSalary += employee.salary;
            dep.avgSalary = dep.totalSalary / dep.numOfEmployee
        }

        total.numOfEmployee++;
        total.totalSalary += employee.salary;
    }

    total.avgSalary = total.totalSalary / total.numOfEmployee || 0

}

function getEmployeesFromLocalStorage() {
    try {
        const jsonData = localStorage.getItem('employees');
        const data = JSON.parse(jsonData);
        if (!Array.isArray(data)) return []
        return data;
    } catch (error) {
        return []
    }
}

function initializeAllDepartment() {
    const sharedData = {
        numOfEmployee: 0,
        totalSalary: 0,
        avgSalary: 0,
    }
    return {
        Administration: {
            name: "Administration",
            ...sharedData
        },
        Marketing: {
            name: "Marketing",
            ...sharedData

        },
        Development: {
            name: "Development",
            ...sharedData

        },
        Finance: {
            name: "Finance",
            ...sharedData
        },
    };
}

