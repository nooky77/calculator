const numbers = document.querySelectorAll(".numbers");
const operands = document.querySelectorAll(".operands");
const display = document.querySelector(".display");
let leftOperand = null;
let rightOperand = null;
let operator = null;
let result = "";

numbers.forEach((number) => {
	number.addEventListener("click", (e) => displayText(e));
});

operands.forEach((operand) => {
	operand.addEventListener("click", (e) => alert(42));
});

function displayText(e) {
	const value = e.target.textContent;
	if (!isNumber(value)) return;
	result += value;
	display.textContent = result;
}

function operate(x, y, operator) {
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

function isNumber(char) {
	if (
		(char.charCodeAt() > 47 && char.charCodeAt() < 58) ||
		char.charCodeAt() === 46
	) {
		return true;
	}
	return false;
}
