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

function updatePrevOpText(newText){
    prevOp.textContent = newText;
}

function updateNewOpText(newText){
    newOp.textContent = newText;
}

function onNumberClick(){
    if (isPlaceHolder) {
        updateNewOpText('0');
        isPlaceHolder = false;
    }

    if (newOp.textContent === '0'){
        updateNewOpText(this.textContent);
    } else {
        if (newOp.textContent.length >= 21){
            alert("Maxinum numbers reached")
        } else {
            updateNewOpText(newOp.textContent + this.textContent);
        }
    }
}

function onDecimalClick(){
    if (isPlaceHolder) {
        updateNewOpText('0');
        isPlaceHolder = false;
    }
    if (newOp.textContent.includes('.')) {
        alert("You cannot have more than one decimal!");
    } else {
        updateNewOpText(newOp.textContent + this.textContent);
    }
}

function addSignToScreen(){
    if (newOp.textContent == 0) return;

    if (newOp.textContent[0] === '-'){
        updateNewOpText(newOp.textContent.slice(1));
    } else {
        updateNewOpText('-' + newOp.textContent);
    }
}

function removeLastNumber(){
    if (newOp.textContent === '0') return;

    isPlaceHolder = false;
    let backspacedText = newOp.textContent.slice(0, -1);
    let newText;

    if(newOp.textContent.length === 1 || backspacedText === '-') {
        newText = '0';
    } else if (backspacedText == 0 && backspacedText[0] === '-'){
        newText = backspacedText.slice(1);
    } else {
        newText = backspacedText;
    }

    updateNewOpText(newText)    
}

function getSquareRoot(){
    updatePrevOpText(`\u221A ${newOp.textContent} =`);
    firstNumber = NaN;
    secondNumber = NaN;
    updateNewOpText(Math.sqrt(parseFloat(newOp.textContent)));
    isPlaceHolder = true;
}

function operatorClicked(){
    let result = 0;
    if (isNaN(firstNumber)){
        firstNumber = parseFloat(newOp.textContent);
        operator = this.textContent;
        isPlaceHolder = true;
        updatePrevOpText(`${firstNumber} ${operator}`);
    } else if (isNaN(secondNumber)) {
        secondNumber = parseFloat(newOp.textContent);
        if (operator === null){
            console.log('Second number with null op');
            operator = this.textContent;
            result = operation(firstNumber, secondNumber, operator);
            updatePrevOpText(`${firstNumber} ${operator} ${secondNumber} =`);
        } else {
            result = operation(firstNumber, secondNumber, operator);
            operator = this.textContent;
            updatePrevOpText(`${result} ${operator}`);
        }        
        firstNumber = result;
        secondNumber = NaN;
        isPlaceHolder = true;
    }
    updateNewOpText('0');
}

function equalsClick(){
    if (isNaN(firstNumber)){
        updatePrevOpText(`${parseFloat(newOp.textContent)} =`);
        isPlaceHolder = true;
    } else if (isNaN(secondNumber) && operator !== null) {
        secondNumber = parseFloat(newOp.textContent);
        const result = operation(firstNumber, secondNumber, operator);
        updatePrevOpText(`${firstNumber} ${operator} ${secondNumber} =`);
        updateNewOpText(result);
        firstNumber = NaN;
        secondNumber = NaN;
        operator = null;
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
    button.addEventListener('click', onNumberClick);
});

operatorBtns.forEach((button) => {
    button.addEventListener('click', operatorClicked);
});

decimalBtn.addEventListener('click', onDecimalClick);

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



