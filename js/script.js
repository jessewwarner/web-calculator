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

numBtns.forEach((button) => {
    button.addEventListener('click', addNumberToScreen);
});
