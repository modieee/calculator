let display = document.querySelector('.display')

let firstNumber = "", secondNumber = "", operator = "", result = null;

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function percentage(a, b) {
    let temp = "";
    if (b > a) {
        temp = a;
        a = b;
        b = temp
    }

    return (b / 100) * a;
}

function operate(firstNumber, secondNumber, operator) {
    if(!firstNumber || !secondNumber || !operator) return;
    
    let num1 = parseFloat(firstNumber);
    let num2 = parseFloat(secondNumber);

    switch (operator) {
        case '+':
            result = add(num1, num2)
        break;

        case '-':
            result = subtract(num1, num2)
        break;

        case 'x':
            result = multiply(num1, num2)
        break;

        case '/':
            result = divide(num1, num2)
        break;

        case '%':
            result = percentage(num1, num2)
        break;
    }
    result = Math.round(result * 1000) / 1000;
    result = result.toString();
    updateDisplay(result)
}

function updateDisplay(value) {
    display.textContent = value;
}

function numberClick(value) {
    if(!operator) {
        if(value === '.') {
            if(!firstNumber) return;
            else if(firstNumber) {
                if(!firstNumber.includes('.')) {
                    firstNumber += value;
                }
            }
        } else firstNumber += value;
        
        updateDisplay(firstNumber);
    } 
    else if (operator) {
        if(value === '.') {
            if(!secondNumber) return;
            else if(secondNumber) {
                if(!secondNumber.includes('.')) {
                    secondNumber += value;
                }
            }
        } else secondNumber += value;
        updateDisplay(secondNumber)
    }
}

function operatorClick(value) {
    if(!firstNumber) return;
    if(secondNumber) {
        operate(firstNumber, secondNumber, operator)
        firstNumber = result.toString();
        secondNumber= ""
    }
    operator = value;
}

function clear() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    result = null;
    updateDisplay("");
};

function del() {
    
}

document.querySelectorAll('.num-key').forEach(key =>{
    key.addEventListener('click', (e)=> {
        numberClick(e.target.innerText);
    });
});
document.querySelectorAll('.operator').forEach(key =>{
    key.addEventListener('click', (e)=> {
        operatorClick(e.target.innerText);
    });
});

document.querySelector('.equals').addEventListener('click', () => {
    operate(firstNumber, secondNumber, operator);
});

document.querySelector('.clr').addEventListener('click', clear);

