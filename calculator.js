const display = document.querySelector('.display')

let firstNumber = "", secondNumber = "", operator = "", waitingForNewInput = false, result = null;

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
            result = (num1 === 0 || num2 === 0) ? result = '🤣🤣🤣' : divide(num1, num2);
        break;

        case '%':
            result = percentage(num1, num2)
        break;
    }
    if(typeof result === 'number') {
        result = Math.round(result * 1000) / 1000;
    };
    result = result.toString();
    updateDisplay(result)

    firstNumber = result;
    secondNumber = "";
    operator = "";
    waitingForNewInput = true;

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
        if (waitingForNewInput) firstNumber = result.toString();
        secondNumber= ""
    }
    operator = value;
    waitingForNewInput = false;
}

function clear() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    result = null;
    waitingForNewInput = false;
    updateDisplay("");
};

function del() {
    if(!operator){
        firstNumber = firstNumber.slice(0, -1);
        updateDisplay(firstNumber || "")
    } else if(secondNumber) {
        secondNumber = secondNumber.slice(0, -1);
        updateDisplay(secondNumber || "");
    }
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
document.querySelector('.del').addEventListener('click', () => {
    del();
});
