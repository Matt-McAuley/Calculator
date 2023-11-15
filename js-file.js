function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1*num2;
}

function divide(num1, num2) {
    return num1/num2;
}

function operate(num1, num2, operator) {
    if (operator == "+") {
        return add(num1, num2);
    }
    if (operator == "-") {
        return subtract(num1, num2);
    }
    if (operator == "x") {
        return multiply(num1, num2);
    }
    if (operator == "÷") {
        return divide(num1, num2);
    }
    if (operator == "pass") {
        return num1;
    }
}

let num2;
let clearScreen = false;
let num1 = 0;
let operator = "+"; 
let equalsPressed = false;

const numberButtons = document.querySelectorAll(".numberButton");
const screen = document.querySelector(".text")

let screenNumber = "";

//Populates screen with numbers
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (equalsPressed) {
            screen.textContent = "";
            screenNumber = "";
            num1 = 0;
            operator = "+";
            equalsPressed = false;
        }
        if (clearScreen) {
                screenNumber = "";
        }
        if (screenNumber.length <= 8) {
                screenNumber += button.textContent;
                screen.textContent = screenNumber;
        }
            clearScreen = false;
    })
});

//Clears screen of numbers
const clearButton = document.querySelector(".clearButton");
clearButton.addEventListener('click', () => {
    screen.textContent = "";
    screenNumber = "";
    num1 = 0;
    operator = "+";
    equalsPressed = false;
});

//Performs operations
let result;
const operators = document.querySelectorAll(".operatorButton");
operators.forEach((button) => {
    button.addEventListener('click', (event) => {
        num2 = Number(screen.textContent);
        result = operate(num1, num2, operator);
        screen.textContent = result;
        num1 = result;
        operator = event.target.textContent;
        clearScreen = true;
    })
})

const equals = document.querySelector(".equalsButton");
equals.addEventListener('click', () => {
    num2 = Number(screen.textContent);
    result = operate(num1, num2, operator);
    num1 = result;
    screen.textContent = result;
    operator = "pass";
    clearScreen = true;
    equalsPressed = true;
})

const del = document.querySelector(".deleteButton");
del.addEventListener('click', () => {
    screen.textContent = screen.textContent.slice(0,-1);
    screenNumber = screenNumber.slice(0,-1);
})