const prevOp = document.querySelector('.prev-op');
const newOp = document.querySelector('.new-op');
const numBtns = document.querySelectorAll('.num');
const operatorBtns = document.querySelectorAll('.op');
const decimalBtn = document.querySelector('.decimal');
const clearBtn = document.querySelector('.clear');
const backBtn = document.querySelector('.backspace');
const signBtn = document.querySelector('.sign');
const sqrtBtn = document.querySelector('.sqrt');
const powBtn = document.querySelector('.pow');
const equalsBtn = document.querySelector('.equals');

let isPlaceHolder = false;
let firstNumber = NaN;
let secondNumber = NaN;
let operator = null;

function addNumberToScreen(){
    if (isPlaceHolder) {
        newOp.textContent = 0;
        isPlaceHolder = false;
    }

    if (newOp.textContent === '0'){
        newOp.textContent = this.textContent;
    } else {
        if (newOp.textContent.length >= 21){
            alert("Maxinum numbers reached")
        } else {
            newOp.textContent += this.textContent;
        }
    }
}

function addDecimalToScreen(){
    if (isPlaceHolder) {
        newOp.textContent = 0;
        isPlaceHolder = false;
    }
    if (newOp.textContent.includes('.')) {
        alert("You cannot have more than one decimal!");
    } else {
        newOp.textContent += this.textContent;
    }
}

function addSignToScreen(){
    if (newOp.textContent == 0) return;

    if (newOp.textContent[0] === '-'){
        newOp.textContent = newOp.textContent.slice(1);
    } else {
        newOp.textContent = '-' + newOp.textContent;
    }
}

function removeLastNumber(){
    isPlaceHolder = false;
    newText = newOp.textContent.slice(0, -1);
    if (newOp.textContent === '0') return;
    if(newOp.textContent.length === 1 || newText === '-') {
        newOp.textContent = 0;
        return;
    }
    if (newText == 0 && newText[0] === '-'){
        newOp.textContent = newText.slice(1);
        return;
    }
    newOp.textContent = newText;
}

function getSquareRoot(){
    prevOp.textContent = '\u221A' + newOp.textContent + ' ='
    newOp.textContent = Math.sqrt(parseFloat(newOp.textContent));
    isPlaceHolder = true;
}

function operatorClicked(){
    if (isNaN(firstNumber)){
        firstNumber = newOp.textContent.includes('.') ? 
            parseFloat(newOp.textContent) : parseInt(newOp.textContent);
        operator = this.textContent;
        prevOp.textContent = `${firstNumber} ${this.textContent}`;
        isPlaceHolder = true;
    } else if (isNaN(secondNumber) && operator === null) {
        secondNumber = newOp.textContent.includes('.') ? 
            parseFloat(newOp.textContent) : parseInt(newOp.textContent);
        operator = this.textContent;
        result = operation(firstNumber, secondNumber, operator);
        prevOp.textContent = `${result} ${this.textContent}`;
        firstNumber = result;
        secondNumber = NaN;
        isPlaceHolder = true;
    } else if (isNaN(secondNumber) && operator !== null) {
        secondNumber = newOp.textContent.includes('.') ? 
            parseFloat(newOp.textContent) : parseInt(newOp.textContent);
        result = operation(firstNumber, secondNumber, operator);
        operator = this.textContent;
        prevOp.textContent = `${result} ${this.textContent}`;
        firstNumber = result;
        secondNumber = NaN;
        isPlaceHolder = true;
    } 
}

function equalsClick(){
    if (isNaN(firstNumber)){
        firstNumber = newOp.textContent.includes('.') ? 
            parseFloat(newOp.textContent) : parseInt(newOp.textContent);
        prevOp.textContent = `${firstNumber} ${this.textContent}`;
        isPlaceHolder = true;
    } else if (isNaN(secondNumber) && operator !== null) {
        secondNumber = newOp.textContent.includes('.') ? 
            parseFloat(newOp.textContent) : parseInt(newOp.textContent);
        result = operation(firstNumber, secondNumber, operator);
        prevOp.textContent = `${firstNumber} ${operator} ${secondNumber} ${this.textContent}`;
        firstNumber = result;
        secondNumber = NaN;
        operator = null;
        newOp.textContent = result;
        isPlaceHolder = true;
    } 
}

function operation(firstNum, secondNum, op){
    let result = 0;
    switch (op) {
        case '+':
            result = firstNum + secondNum;
            break;
        case '-':
            result = firstNum - secondNum;
            break;
        case '\u00D7':
            result = firstNum * secondNum;
            break;
        case '\u00F7':
            result = firstNum / secondNum;
            break;
        case '%':
            result = firstNum % secondNum;
            break;
        default:
            break;
    }
    isPlaceHolder = true;
    return result;
}

numBtns.forEach((button) => {
    button.addEventListener('click', addNumberToScreen);
});

operatorBtns.forEach((button) => {
    button.addEventListener('click', operatorClicked);
});

decimalBtn.addEventListener('click', addDecimalToScreen);

signBtn.addEventListener('click', addSignToScreen);

clearBtn.addEventListener('click', () => {
    newOp.textContent = '0';
    prevOp.textContent = '';
    firstNumber = NaN;
    secondNumber = NaN;
    operator = null;
});

backBtn.addEventListener('click', removeLastNumber);

sqrtBtn.addEventListener('click', getSquareRoot);

equalsBtn.addEventListener('click', equalsClick);



