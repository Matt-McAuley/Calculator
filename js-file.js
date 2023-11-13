function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiplty(num1, num2) {
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
    if (operator == "*") {
        return multiply(num1, num2);
    }
    if (operator == "/") {
        return divide(num1, num2);
    }
}

let num1, operator, num2;

const numberButtons = document.querySelectorAll(".numberButton");
const screen = document.querySelector(".text")

let screenNumber = "";

//Populates screen with numbers
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (screenNumber.length <= 8) {
            screenNumber += button.textContent;
            screen.textContent = screenNumber;
        }
    })
});

//Clears screen of numbers
const clearButton = document.querySelector(".clearButton");
clearButton.addEventListener('click', () => {
    screen.textContent = "";
    screenNumber = "";
});