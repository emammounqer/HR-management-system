'use strict'

// ----------- Employee Object Definition -----------
const DEPARTMENTS = {
    administration: 'Administration',
    marketing: 'Marketing',
    development: 'Development',
    finance: 'Finance'
}

const LEVELS = {
    junior: 'Junior',
    midSenior: 'Mid-Senior',
    senior: 'Senior'
}

function Employee(fullName, department, level, imgUrl, salary) {
    const allIds = Employee._employeesIds
    let id = (allIds[allIds.length - 1] || 1000) + 1

    if (allIds.includes(id)) throw `id : ${id} is already exist`
    if (!Object.values(DEPARTMENTS).includes(department)) throw `department :${department} is not valid`
    if (!Object.values(LEVELS).includes(level)) throw `level :${level} is not valid`

    this.id = id;
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.imgUrl = imgUrl || './assets/avatar.png';
    if (salary) {
        this.salary = salary;
        this.netSalary = salary - salary * .075
    } else this.calculateSalary();

    allIds.push(id)
}

Employee._employeesIds = []
Employee.prototype.calculateSalary = function () {
    switch (this.level) {
        case LEVELS.junior:
            this.salary = getRandomNumBetween(500, 1000)
            break;
        case LEVELS.midSenior:
            this.salary = getRandomNumBetween(1000, 1500)
            break;
        case LEVELS.senior:
            this.salary = getRandomNumBetween(1500, 2000)
        default:
            break;
    }
    this.netSalary = this.salary - this.salary * 0.075
}


// State
const allEmployees = getEmployeesFromLocalStorage()

// Selector
const form = document.getElementById('add-employee')
const departmentSections = {
    Administration: document.getElementById('administration-employee'),
    Marketing: document.getElementById('marketing-employee'),
    Development: document.getElementById('development-employee'),
    Finance: document.getElementById('finance-employee')
}

// init 
renderCards(allEmployees)

// Events
form.addEventListener('submit', addEmployeeFormHandler)

// render functions
function renderCard(employee) {
    const cardDiv = document.createElement('div')
    const parentElem = departmentSections[employee.department]
    parentElem.append(cardDiv);
    cardDiv.classList.add('card')

    const imgElem = document.createElement('img')
    cardDiv.append(imgElem)
    imgElem.setAttribute('src', employee.imgUrl)
    imgElem.classList.add('card__img')

    const pElem = document.createElement('p')
    cardDiv.append(pElem)
    pElem.textContent = `Name: ${employee.fullName} - ID: ${employee.id} - Department: ${employee.department} - Level: ${employee.level} - ${employee.netSalary}`
    pElem.classList.add('card__data')
}

function renderCards(employees) {
    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        renderCard(employee)
    }
}

// functions
function addEmployeeFormHandler(e) {
    e.preventDefault();

    const name = e.target.name.value
    const department = e.target.department.value
    const level = e.target.level.value
    const imgUrl = e.target.imgUrl.value

    const employee = new Employee(name, DEPARTMENTS[department], LEVELS[level], imgUrl)

    allEmployees.push(employee)
    setEmployeesInLocalStorage()

    renderCard(employee)

    e.target.reset();
}

function setEmployeesInLocalStorage() {
    const jsonData = JSON.stringify(allEmployees);
    localStorage.setItem('employees', jsonData)
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
// ----------- util functions -----------
function getRandomNumBetween(num1, num2) {
    let min = num1;
    let max = num2;
    if (min > max) [min, max] = [max, min]
    return Math.floor(min + Math.random() * (max - min + 1))
}

