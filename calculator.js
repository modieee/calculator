const keys = document.querySelectorAll('.num-key');
const operator = document.querySelector('.operator')
const displayOne = document.querySelector('.display-1');
const displayTwo = document.querySelector('.display-2');
// const clearBtn = document.querySelector('.clr');

let expression = "";

function clear() {
    displayOne.innerText = "";
    displayTwo.innerText = "";
    expression = "";
}
function del() {
    expression = expression.slice(0, -1);
    displayTwo.innerText = expression;
}

function displayOperation (e) {
    if (e.target.innerText === '.') {
        if(expression !== "" && !expression.includes(".")) {
            expression += ".";
        }
    } else {
        expression += e.target.innerText;
    }
    displayTwo.innerText = expression;
}

keys.forEach(key => {
    key.addEventListener('click', displayOperation)
});

document.addEventListener('click', (e) => {
    if(e.target.matches('.clr')) clear();
    if(e.target.matches('.del')) del();
})

