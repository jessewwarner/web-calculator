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

function addNumberToScreen(){
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
    if (newOp.textContent.includes('.')) {
        alert("You cannot have more than one decimal!");
    } else {
        newOp.textContent += this.textContent;
    }
}

function addSignToScreen(){
    if (newOp.textContent === '0') return;

    if (newOp.textContent[0] === '-'){
        newOp.textContent = newOp.textContent.slice(1);
    } else {
        newOp.textContent = '-' + newOp.textContent;
    }
}

numBtns.forEach((button) => {
    button.addEventListener('click', addNumberToScreen);
});

decimalBtn.addEventListener('click', addDecimalToScreen);

signBtn.addEventListener('click', addSignToScreen);

clearBtn.addEventListener('click', () => {
    newOp.textContent = '0';
});