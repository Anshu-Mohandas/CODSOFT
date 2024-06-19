document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let operand1 = '';
    let operand2 = '';
    let result = '';

    function updateDisplay(value) {
        if (value === '.') {
            if (currentInput.includes('.')) return;
            if (currentInput === '') currentInput = '0';
        }
        currentInput += value;
        display.textContent = currentInput;
    }

    function clear() {
        currentInput = '';
        operand1 = '';
        operand2 = '';
        operator = '';
        result = '';
        display.textContent = '0';
    }

    function handleOperator(op) {
        if (currentInput === '') return;
        if (operand1 === '') {
            operand1 = parseFloat(currentInput);
            operator = op;
            display.textContent += ` ${op} `;
            currentInput = '';
        } else if (operand2 === '') {
            operand2 = parseFloat(currentInput);
            calculate();
            operator = op;
            display.textContent += ` ${op} `;
            currentInput = '';
        }
    }

    function calculate() {
        if (operand1 === '' || operand2 === '') return;
        switch (operator) {
            case '+':
                result = operand1 + operand2;
                break;
            case '-':
                result = operand1 - operand2;
                break;
            case '*':
                result = operand1 * operand2;
                break;
            case '/':
                if (operand2 === 0) {
                    result = 'Error';
                } else {
                    result = operand1 / operand2;
                }
                break;
        }
        operand1 = result;
        operand2 = '';
        currentInput = '';
        display.textContent = result;
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            if (!isNaN(value) || value === '.') {
                updateDisplay(value);
            } else if (value === 'AC') {
                clear();
            } else if (value === '+' || value === '-' || value === '*' || value === '/') {
                handleOperator(value);
            } else if (value === '=') {
                operand2 = parseFloat(currentInput);
                calculate();
            }
        });
    });
});
