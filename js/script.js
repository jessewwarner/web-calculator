const prevOp = document.querySelector('.prev-op');
const newOp = document.querySelector('.new-op');

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

function nullifyValues(){
    isPlaceHolder = false;
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
    console.log(`Operator: ${op} - Denom: ${denom}`);
    if ((op === '\u00F7' || op === '%') && denom == 0){
        alert("Cannot divide by zero!")
        secondNumber = NaN;
        return true;
    }
    return false;
}

function onNumberClick(num){
    if (isPlaceHolder) {
        updateNewOpText('0');
        isPlaceHolder = false;
    }

    if (newOp.textContent === '0'){
        updateNewOpText(num);
    } else {
        if (newOp.textContent.length >= 21){
            alert("Maxinum numbers reached")
        } else {
            updateNewOpText(newOp.textContent + num);
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
        updateNewOpText(newOp.textContent + '.');
    }
}

function onSignClick(){
    if (newOp.textContent == 0) return;

    if (newOp.textContent[0] === '-'){
        updateNewOpText(newOp.textContent.slice(1));
    } else {
        updateNewOpText('-' + newOp.textContent);
    }
}

function onBackspaceClick(){
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

function onSqrtClick(){
    // add check for negative number
    if (isNaN(firstNumber)){
        updatePrevOpText(`\u221A ${newOp.textContent} =`);
        updateNewOpText(Math.sqrt(parseFloat(newOp.textContent)));
        isPlaceHolder = true;
    } else {
        updatePrevOpText(`${firstNumber} ${operator} \u221A ${newOp.textContent} =`);
        updateNewOpText(firstNumber + Math.sqrt(parseFloat(newOp.textContent)));
        nullifyValues()
    }
}

function onPowerClick(){

}

function onOperatorClick(op){
    let result = 0;
    if (isNaN(firstNumber)){
        firstNumber = parseFloat(newOp.textContent);
        operator = op;
        isPlaceHolder = true;
        updatePrevOpText(`${firstNumber} ${operator}`);
    } else if (isNaN(secondNumber)) {
        secondNumber = parseFloat(newOp.textContent);

        if (isDivideByZero(operator, secondNumber)) return;
        console.log("No divide by zero");

        if (operator === null){
            console.log('Second number with null op');
            operator = op;
            result = operation(firstNumber, secondNumber, operator);
            updatePrevOpText(`${firstNumber} ${operator} ${secondNumber} =`);
        } else {
            result = operation(firstNumber, secondNumber, operator);
            operator = op;
            updatePrevOpText(`${result} ${operator}`);
        }        
        firstNumber = result;
        secondNumber = NaN;
        isPlaceHolder = true;
    }
    updateNewOpText('0');
}

function onEqualsClick(){
    if (isNaN(firstNumber)){
        updatePrevOpText(`${parseFloat(newOp.textContent)} =`);
        isPlaceHolder = true;
    } else if (isNaN(secondNumber) && operator !== null) {
        secondNumber = parseFloat(newOp.textContent);
        const result = operation(firstNumber, secondNumber, operator);
        updatePrevOpText(`${firstNumber} ${operator} ${secondNumber} =`);
        updateNewOpText(result);
        nullifyValues()
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


