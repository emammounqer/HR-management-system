'use strict'

// ----------- Employee Object Definition -----------
const DEPARTMENTS = {
    Administration: 'Administration',
    Marketing: 'Marketing',
    Development: 'Development',
    Finance: 'Finance'
}

const LEVELS = {
    Junior: 'Junior',
    MidSenior: 'Mid-Senior',
    Senior: 'Senior'
}

function Employee(id, fullName, department, level, imgUrl, salary) {
    if (Employee.prototype._employeesIds.includes(id)) throw `id : ${id} is already exist`
    if (!Object.values(DEPARTMENTS).includes(department)) throw `department :${department} is not valid`
    if (!Object.values(LEVELS).includes(level)) throw `level :${level} is not valid`

    this.id = id;
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.imgUrl = imgUrl;
    if (salary) {
        this.salary = salary;
        this.netSalary = salary - salary * .075
    } else this.calculateSalary();

    Employee.prototype._employeesIds.push(id)
}

Employee.prototype._employeesIds = []
Employee.prototype.calculateSalary = function () {
    switch (this.level) {
        case LEVELS.Junior:
            this.salary = getRandomNumBetween(500, 1000)
            break;
        case LEVELS.MidSenior:
            this.salary = getRandomNumBetween(1000, 1500)
            break;
        case LEVELS.Senior:
            this.salary = getRandomNumBetween(1500, 2000)
        default:
            break;
    }
    this.netSalary = this.salary - this.salary * 0.075
}
Employee.prototype.render = function () {
    document.write(`${this.fullName} | ${this.netSalary} <br/>`)
}

// ----------- instantiate the employees object -----------
const employees = [
    new Employee(1000, 'Ghazi Samer', DEPARTMENTS.Administration, LEVELS.Senior, getRandomImgUrl()),
    new Employee(1001, 'Lana Ali', DEPARTMENTS.Finance, LEVELS.Senior, getRandomImgUrl()),
    new Employee(1002, 'Tamara Ayoub', DEPARTMENTS.Marketing, LEVELS.Senior, getRandomImgUrl()),
    new Employee(1003, 'Safi Walid', DEPARTMENTS.Administration, LEVELS.MidSenior, getRandomImgUrl()),
    new Employee(1004, 'Omar Zaid', DEPARTMENTS.Development, LEVELS.Senior, getRandomImgUrl()),
    new Employee(1005, 'Rana Saleh', DEPARTMENTS.Development, LEVELS.Junior, getRandomImgUrl()),
    new Employee(1006, 'Hadi Ahmad', DEPARTMENTS.Finance, LEVELS.MidSenior, getRandomImgUrl()),
]

// ----------- render the employee -----------
document.write(`<b>Full Name | Salary </b> <br/>`)
for (let i = 0; i < employees.length; i++) {
    employees[i].render();
}

// ----------- util functions -----------
function getRandomNumBetween(num1, num2) {
    let min = num1;
    let max = num2;
    if (min > max) [min, max] = [max, min]
    return Math.floor(min + Math.random() * (max - min + 1))
}

function getRandomImgUrl() {
    return 'https://source.unsplash.com/random/300×300'
}