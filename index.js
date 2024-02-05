const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const clear = document.querySelector(".clear");
const display = document.querySelector(".display");
let leftOperand = "";
let rightOperand = "";
let operator = "";
let result = "";

numbers.forEach((number) => {
	number.addEventListener("click", (e) => handleOperand(e));
});

operators.forEach((operator) => {
	operator.addEventListener("click", (e) => handleOperator(e));
});

clear.addEventListener("click", handleClear);

function handleOperand(e) {
	const value = e.target.textContent;
	if (value === ".") {
		if (!operator) {
			if (leftOperand.includes(value)) return;
		} else {
			if (rightOperand.includes(value)) return;
		}
		if (!leftOperand) leftOperand += "0";
		if (operator && !rightOperand) rightOperand += "0";
	}
	if (!operator) leftOperand += value;
	if (operator) rightOperand += value;
	displayText();
}

function handleOperator(e) {
	if (leftOperand && rightOperand && operator) {
		result = operate(+leftOperand, +rightOperand, operator);
		leftOperand = result;
		rightOperand = "";
		operator = "";
		displayText();
	}
	operator = e.target.textContent;
}

function handleClear() {
	leftOperand = "";
	rightOperand = "";
	operator = "";
	display.textContent = "0";
}

function displayText() {
	if (!operator) display.textContent = leftOperand;
	else display.textContent = rightOperand;
}

function operate(x, y = 0, operator) {
	switch (operator) {
		case "+":
			return add(x, y);
		case "-":
			return subtract(x, y);
		case "*":
			return multiply(x, y);
		case "/":
			return divide(x, y);
		default:
			return NaN;
	}
}

function add(x, y) {
	return x + y;
}
function subtract(x, y) {
	return x - y;
}
function multiply(x, y) {
	return x * y;
}
function divide(x, y) {
	return x / y;
}

function isValid(str) {
	let test = str.split("");
	let count = 0;
	for (let char of test) {
		if (char === ".") {
			count += 1;
			if (count > 1) return false;
		}
	}
	return true;
}