// State
const allEmployees = getEmployeesFromLocalStorage()
const employeesByDepartment = separateEmployeeByDepartment();

// Selector
const table = document.getElementById('accounting-table')

// init 
renderTable();

// render functions
function renderTable() {
    const allDepartmentData = getAllDepartmentData();
    console.log(allDepartmentData);
    for (let i = 0; i < allDepartmentData.length; i++) {
        const rowEl = createDepartmentRow(allDepartmentData[i])
        table.append(rowEl)
    }
}

function createDepartmentRow(departmentData) {
    const trEl = document.createElement('tr');

    const departmentNameTD = document.createElement('td')
    trEl.append(departmentNameTD);
    departmentNameTD.textContent = departmentData.departmentName;

    const numOfEmployeeTD = document.createElement('td')
    trEl.append(numOfEmployeeTD);
    numOfEmployeeTD.textContent = departmentData.numOfEmployee;

    const totalSalaryTD = document.createElement('td')
    trEl.append(totalSalaryTD)
    totalSalaryTD.textContent = departmentData.totalSalary;

    const avgSalaryTD = document.createElement('td')
    trEl.append(avgSalaryTD)
    avgSalaryTD.textContent = departmentData.avgSalary;

    return trEl
}

// functions
function getDepartmentData(departmentName) {
    const employees = employeesByDepartment[departmentName]
    let totalSalary = 0;
    for (let i = 0; i < employees.length; i++) {
        totalSalary += employees[i].salary;
    }

    return {
        departmentName: departmentName,
        numOfEmployee: employees.length,
        totalSalary: totalSalary,
        avgSalary: totalSalary / employees.length || 0
    }
}

function getAllDepartmentData() {
    const allDepartmentData = [];

    const total = {
        departmentName: 'Total',
        numOfEmployee: 0,
        totalSalary: 0,
        avgSalary: 0
    }

    for (const department in employeesByDepartment) {
        console.log(department);
        const departmentData = getDepartmentData(department)
        allDepartmentData.push(departmentData)

        total.numOfEmployee += departmentData.numOfEmployee;
        total.totalSalary += departmentData.totalSalary;
    }

    if (total.numOfEmployee > 0)
        total.avgSalary = total.totalSalary / total.numOfEmployee

    allDepartmentData.push(total)

    return allDepartmentData;
}

function separateEmployeeByDepartment() {
    const departmentEmployee = {
        Administration: [],
        Marketing: [],
        Development: [],
        Finance: [],
    }

    for (let i = 0; i < allEmployees.length; i++) {
        const employee = allEmployees[i];
        departmentEmployee[employee.department]?.push(employee)
    }

    return departmentEmployee;
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