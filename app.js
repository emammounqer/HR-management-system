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
    const allIds = Employee.prototype._employeesIds
    let id = (allIds[allIds.length - 1] || 1000) + 1

    if (allIds.includes(id)) throw `id : ${id} is already exist`
    if (!Object.values(DEPARTMENTS).includes(department)) throw `department :${department} is not valid`
    if (!Object.values(LEVELS).includes(level)) throw `level :${level} is not valid`

    this.id = id;
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.imgUrl = imgUrl || './assets/avatar.svg';
    if (salary) {
        this.salary = salary;
        this.netSalary = salary - salary * .075
    } else this.calculateSalary();

    allIds.push(id)
}

Employee.prototype._employeesIds = []
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
Employee.prototype.render = function (parentElem) {
    const cardDiv = document.createElement('div')
    parentElem.append(cardDiv);
    cardDiv.classList.add('card')

    const imgElem = document.createElement('img')
    cardDiv.append(imgElem)
    imgElem.setAttribute('src', this.imgUrl)
    imgElem.classList.add('card__img')

    const pElem = document.createElement('p')
    cardDiv.append(pElem)
    pElem.textContent = `Name: ${this.fullName} - ID: ${this.id} - Department: ${this.department} - Level: ${this.level} - ${this.netSalary}`
    pElem.classList.add('card__data')
}

// State
const allEmployees = []

// Selector
const form = document.getElementById('add-employee')
const employeesSections = {
    administration: document.getElementById('administration'),
    marketing: document.getElementById('marketing'),
    development: document.getElementById('development'),
    finance: document.getElementById('finance')
}

// Event
form.addEventListener('submit', addEmployeeFormHandler)

// functions
function addEmployeeFormHandler(e) {
    e.preventDefault();

    const name = e.target.name.value
    const department = e.target.department.value
    const level = e.target.level.value
    const imgUrl = e.target.imgUrl.value

    const employee = new Employee(name, DEPARTMENTS[department], LEVELS[level], imgUrl)

    employee.render(employeesSections[department]);
    allEmployees.push(employee)

    e.target.reset();
}

// ----------- util functions -----------
function getRandomNumBetween(num1, num2) {
    let min = num1;
    let max = num2;
    if (min > max) [min, max] = [max, min]
    return Math.floor(min + Math.random() * (max - min + 1))
}

function getRandomImgUrl() {
    return 'https://source.unsplash.com/random/300x300'
}