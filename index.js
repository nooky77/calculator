const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const undo = document.querySelector(".undo");
const clear = document.querySelector(".clear");
const display = document.querySelector(".display");
let leftOperand = "";
let rightOperand = "";
let operator = "";
let result = "";

numbers.forEach((number) => {
	number.addEventListener("click", (e) => handleOperand(e));
});

document.addEventListener("keydown", (e) => {
	const value = e.key;
	if (isOperator(value)) handleOperator(e);
	else if (isOperand(value)) handleOperand(e);
	else if (isBackspace(value)) handleUndo();
	else return;
});

function isOperand(value) {
	if (
		value.charCodeAt() === 46 ||
		(value.charCodeAt() > 47 && value.charCodeAt() < 58)
	) {
		return true;
	}
	return false;
}

function isOperator(value) {
	if (
		(value.charCodeAt() > 41 && value.charCodeAt() < 44) ||
		value.charCodeAt() === 45 ||
		value.charCodeAt() === 47 ||
		value === "Enter"
	) {
		return true;
	}
	return false;
}

function isBackspace(value) {
	if (value === "Backspace") return true;
	return false;
}

operators.forEach((operator) => {
	operator.addEventListener("click", (e) => handleOperator(e));
});

undo.addEventListener("click", handleUndo);

clear.addEventListener("click", handleClear);

function handleOperand(e) {
	let value;
	if (e.key) value = e.key;
	else value = e.target.textContent;
	if (leftOperand.length > 11 || rightOperand.length > 11) return;
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
	if (!result && !leftOperand) leftOperand = display.textContent;
	if (e.target.textContent === "=" || e.key === "Enter") {
		if (!leftOperand || !rightOperand) return;
		if (handleDivideByZero()) return;
		result = operate(+leftOperand, +rightOperand, operator);
		if (isFloat(result)) display.textContent = result.toFixed(2);
		else display.textContent = result;
		result = "";
		resetVar();
		return;
	}
	if (leftOperand && rightOperand && operator) {
		result = operate(+leftOperand, +rightOperand, operator);
		leftOperand = result;
		rightOperand = "";
		operator = "";
		displayText();
	}
	if (e.key) operator = e.key;
	else operator = e.target.textContent;
}

function handleClear() {
	resetVar();
	display.textContent = "0";
}

function handleDivideByZero() {
	if (operator === "/" && rightOperand === "0") {
		display.textContent = "Can't divide by 0";
		resetVar();
		return true;
	}
	return false;
}

function handleUndo() {
	if (!leftOperand && !rightOperand) return;
	if (operator) {
		rightOperand = rightOperand.slice(0, -1);
	} else {
		leftOperand = leftOperand.slice(0, -1);
	}
	displayText();
}

function displayText() {
	if (!operator) display.textContent = leftOperand;
	else display.textContent = rightOperand;
}
function resetVar() {
	operator = "";
	leftOperand = "";
	rightOperand = "";
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

function isFloat(value) {
	if (typeof value === "number") {
		if (!Number.isNaN(value) && !Number.isInteger(value)) {
			return true;
		}
	}
	return false;
}
