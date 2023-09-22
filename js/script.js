const prevOp = document.querySelector('.prev-op');
const newOp = document.querySelector('.new-op');

let isPlaceholder = false;
let firstNumber = NaN;
let secondNumber = NaN;
let operator = null;

const SYMBOL_PLUS = '+';
const SYMBOL_MINUS = '-';
const SYMBOL_MULTIPLY = '\u00D7';
const SYMBOL_DIVIDE = '\u00F7';
const SYMBOL_MOD = '%';
const SYMBOL_POW = '^';

function updatePrevOpText(newText){
    prevOp.textContent = newText;
}

function updateNewOpText(newText){
    newOp.textContent = newText;
}

function placeholderCheck(){
    if (isPlaceholder) {
        updateNewOpText('0');
        isPlaceholder = false;
    }
}

function nullifyValues(){
    isPlaceholder = false;
    firstNumber = NaN;
    secondNumber = NaN;
    operator = null;
}

function onClearClick(){
    newOp.textContent = '0';
    prevOp.textContent = '';
    nullifyValues()
}

function isDivideByZero(op, denom){
    if ((op === SYMBOL_DIVIDE || op === SYMBOL_MOD) && denom == 0){
        alert("Cannot divide by zero!")
        secondNumber = NaN;
        return true;
    }
    return false;
}

function onNumberClick(num){
    placeholderCheck();

    if (newOp.textContent === '0'){
        updateNewOpText(num);
    } else if (newOp.textContent.length >= 16){
        alert("Maxinum numbers reached")
    } else {
        updateNewOpText(`${newOp.textContent}${num}`);
    }
}

function onDecimalClick(){
    if (newOp.textContent.includes('.')) {
        alert("You cannot have more than one decimal!");
    } else {
        updateNewOpText(`${newOp.textContent}.`);
        isPlaceholder = false;
    }
}

function onSignClick(){
    if (newOp.textContent == 0) return;

    if (newOp.textContent[0] === SYMBOL_MINUS){
        updateNewOpText(newOp.textContent.slice(1));
    } else {
        updateNewOpText(`-${newOp.textContent}`);
    }
}

function onBackspaceClick(){
    if (newOp.textContent === '0') return;

    isPlaceholder = false;
    const backspacedText = newOp.textContent.slice(0, -1);
    let newText;

    if(newOp.textContent.length === 1 || backspacedText === SYMBOL_MINUS) {
        newText = '0';
    } else if (backspacedText == 0 && backspacedText[0] === SYMBOL_MINUS) {
        newText = backspacedText.slice(1);
    } else {
        newText = backspacedText;
    }

    updateNewOpText(newText)    
}

function onSqrtClick(){
    const num = parseFloat(newOp.textContent);

    if (num < 0) {
        alert("Cannot use \u221Ax with negative numbers!");
        return;
    }

    const result = Math.sqrt(num);

    if (isNaN(firstNumber)){
        updatePrevOpText(`\u221A${num} =`);
        updateNewOpText(result);
    } else {
        updatePrevOpText(`${firstNumber} ${operator} \u221A${num} =`);
        updateNewOpText(operation(firstNumber, result, operator));
        nullifyValues()
    }
    isPlaceholder = true;
}

function onOperatorClick(op){
    if (isNaN(firstNumber)){
        firstNumber = parseFloat(newOp.textContent);
        operator = op;
        updatePrevOpText(`${firstNumber} ${operator}`);
    } else if (isNaN(secondNumber)) {
        secondNumber = parseFloat(newOp.textContent);

        if (isDivideByZero(operator, secondNumber)) return;

        const result = operation(firstNumber, secondNumber, operator);
        operator = op;
        updatePrevOpText(`${result} ${operator}`);      
        firstNumber = result;
        secondNumber = NaN;
    }
    isPlaceholder = true;
    updateNewOpText('0');
}

function onEqualsClick(){
    if (isNaN(firstNumber)){
        updatePrevOpText(`${parseFloat(newOp.textContent)} =`);
    } else if (isNaN(secondNumber) && operator !== null) {
        secondNumber = parseFloat(newOp.textContent);

        if (isDivideByZero(operator, secondNumber)) return;
        
        const result = operation(firstNumber, secondNumber, operator);
        updatePrevOpText(`${firstNumber} ${operator} ${secondNumber} =`);
        updateNewOpText(result);
        nullifyValues()
    } 
    isPlaceholder = true;
}

function operation(firstNum, secondNum, op){
    let result = 0;
    switch (op) {
        case SYMBOL_PLUS:
            result = firstNum + secondNum;
            break;
        case SYMBOL_MINUS:
            result = firstNum - secondNum;
            break;
        case SYMBOL_MULTIPLY:
            result = firstNum * secondNum;
            break;
        case SYMBOL_DIVIDE:
            result = firstNum / secondNum;
            break;
        case SYMBOL_MOD:
            result = firstNum % secondNum;
            break;
        case SYMBOL_POW:
            result = firstNum ** secondNum;
            break;
        default:
            break;
    }
    isPlaceholder = true;
    return result;
}
