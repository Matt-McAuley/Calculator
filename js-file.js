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
}

let num2;
let clearScreen = false;
let num1 = 0;
let operator = "+"; 
let equalsPressed = false;
let operatorPressed = false;
let error = false;

const numberButtons = document.querySelectorAll(".numberButton");
const screen = document.querySelector(".text")

let screenNumber = "0";
screen.textContent = "0";

//Populates screen with numbers
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (error) {
            return;
        }
        if (equalsPressed) {
            screen.textContent = "";
            screenNumber = "";
            operator = "+";
            num1 = 0;
            equalsPressed = false;
        }
        if (clearScreen) {
                screenNumber = "0";
        }
        if (screenNumber == "0") {
            console.log(screen.textContent)
            screen.textContent = "";
            screenNumber = ""
        }
        if (screenNumber.length <= 8) {
                screenNumber += button.textContent;
                screen.textContent = screenNumber;
        }
        clearScreen = false;
        operatorPressed = false;
    })
});

//Clears screen of numbers
const clearButton = document.querySelector(".clearButton");
clearButton.addEventListener('click', () => {
    screen.textContent = "0";
    screenNumber = "0";
    num1 = 0;
    operator = "+";
    equalsPressed = false;
    operatorPressed = false;
    error = false;
    screen.style.fontSize = "55px";
});

//Performs operations
let result;
const operators = document.querySelectorAll(".operatorButton");
operators.forEach((button) => {
    button.addEventListener('click', (event) => {
        if (error) {
            return;
        }
        if (equalsPressed) {
            num2 = 0;
            equalsPressed = false;
        }
        else {
            num2 = Number(screen.textContent);
        }
        console.log("num1: "+num1)
        console.log("num2: "+num2)
        console.log("operator: "+operator)
        result = operate(num1, num2, operator);
        if (String(result).length > 9) {
            let indexOfDecimal = String(result).indexOf(".")
            if (indexOfDecimal != -1) {
                if (indexOfDecimal <= 9) {
                    console.log("Initial result: " + result);
                    result = Number(result).toFixed(9-indexOfDecimal);
                    console.log("Later result: " + result);
                }
            }
        }
        console.log("result: "+result)
        screen.textContent = result;
        num1 = result;
        operator = event.target.textContent;
        clearScreen = true;
        operatorPressed = true;
        if (isNaN(result)) {
            error = true;
            screen.textContent = "Syntax Error"
            screen.style.fontSize = "50px";
        }
        else if (!isFinite(result)) {
            error = true;
            screen.textContent = "Divide by zero Error";
            screen.style.fontSize = "35px";
        }
        else if (result > 999999999) {
            error = true;
            screen.textContent = "Overflow Error"
            screen.style.fontSize = "45px";
        }
    })
})

const equals = document.querySelector(".equalsButton");
equals.addEventListener('click', () => {
    if (error) {
        return;
    }
    num2 = Number(screen.textContent);
    console.log("num1: "+num1)
    console.log("num2: "+num2)
    console.log("operator: "+operator)
    result = operate(num1, num2, operator);
    if (String(result).length > 9) {
        let indexOfDecimal = String(result).indexOf(".")
        if (indexOfDecimal != -1) {
            if (indexOfDecimal <= 9) {
                console.log("Initial result: " + result);
                result = Number(result).toFixed(9-indexOfDecimal);
                console.log("Later result: " + result);
            }
        }
    }
    console.log("result: "+result)
    num1 = result;
    screen.textContent = result;
    operator = "+";
    clearScreen = true;
    equalsPressed = true;
    operatorPressed = false;
    if (isNaN(result)) {
        error = true;
        screen.textContent = "Syntax Error"
        screen.style.fontSize = "50px";
    }
    else if (!isFinite(result)) {
        error = true;
        screen.textContent = "Divide by zero Error";
        screen.style.fontSize = "35px";
    }
    else if (result > 999999999 || result < -999999999) {
        error = true;
        screen.textContent = "Overflow Error"
        screen.style.fontSize = "45px";
    }
})

const del = document.querySelector(".deleteButton");
del.addEventListener('click', () => {
    if (error) {
        return
    }
    if (!operatorPressed && !equalsPressed) {
        screen.textContent = screen.textContent.slice(0,-1);
        screenNumber = screenNumber.slice(0,-1);
        if (screen.textContent == "-") {
            screen.textContent = "";
            screenNumber = "";
        }
    }
    else {
        screen.textContent = screen.textContent.slice(0,-1);
        screenNumber = screenNumber.slice(0,-1);
        if (screen.textContent == "-" || screen.textContent == "") {
            screen.textContent = "0";
            screenNumber = "0";
            num1 = 0;
            result = 0;
        }
        else {
            num1 = Number(String(num1).slice(0,-1));
            result = Number(String(result).slice(0,-1));
        }
    }
})