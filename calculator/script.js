const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operator');
const clearButtons = document.querySelectorAll('.clear-btn');
const decimalButton = document.getElementById('decimal');
const result = document.getElementById('result');
const display = document.getElementById('display');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';
let MinusMode = false;

for (let i = 0; i < numberButtons.length; i++) {
   let number = numberButtons[i];
   number.addEventListener('click', function (e) {
      numberPress(e.target.textContent);
   });
}

for (let i = 0; i < operationButtons.length; i++) {
  let operationBtn = operationButtons[i];
  operationBtn.addEventListener('click', function (e) {
    operationPress(e.target.textContent);
  });
}

for (let i = 0; i < clearButtons.length; i++) {
  let clearBtn = clearButtons[i];
  clearBtn.addEventListener('click', function (e) {
    clear(e.target.textContent);
  });
}

decimalButton.addEventListener('click', decimal);

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = display.value === '-' ? `-${number}` : number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operationPress(op) {
  let localOperationMemory = display.value;

  if (op === '-' && (MemoryPendingOperation !== '') && !MinusMode && MemoryNewNumber) {
    MinusMode = true;
    MemoryNewNumber = true;
    return;
  }

  if (MinusMode) {
    localOperationMemory *= -1;
    MinusMode = false;
  }
  //Unary operators
  if (op === '√') {
    if (localOperationMemory >= 0) {
      MemoryCurrentNumber = Math.sqrt(localOperationMemory);
      display.value = MemoryCurrentNumber;
    } else display.value = 'ERROR';
  } else if (op === '-' && localOperationMemory === '0') {
    display.value = '-';
    MemoryNewNumber = true;
  }
