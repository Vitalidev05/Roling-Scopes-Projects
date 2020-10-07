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





allClearButton.addEventListener('click', button => {
	calculator.clear();
	calculator.updateDisplay();
});

