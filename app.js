
const displayNum1 = document.querySelector('.display-num1')
const displayNum2 = document.querySelector('.display-num2')
const displayOperator = document.querySelector('.display-operator')
const displayEqual = document.querySelector('.display-equal')
const displayResult = document.querySelector('.display-2')
const keys = document.querySelector('.keys');
const equal = document.querySelector('#equal');
const operatorKeys = document.querySelectorAll('.operator')
const operators = [' ÷ ', ' × ', ' + ', ' - '];


keys.addEventListener('click', e => {
    const eTarget = e.target;
    const keyText = eTarget.textContent;
    let num1Content = displayNum1.textContent;
    let num2Content = displayNum2.textContent;
    let numResult = displayResult.textContent;
    let operatorContent = displayOperator.textContent;
    let equalContent = displayEqual.textContent;

    if (eTarget.classList.contains('digit')) {
        if (num1Content === '0') {
            displayNum1.textContent = keyText;
        } else if (num1Content !== '0' &&
            displayOperator.textContent === '') {
            displayNum1.textContent += keyText;
        } else if (displayNum1.textContent !== '0' &&
            displayOperator.textContent !== '') {
            displayNum2.textContent += keyText;
        }
    }

    else if (eTarget.classList.contains('operator')) {
        if (operatorContent === '') {
            displayOperator.textContent = keyText;

        } else if (numResult !== '' &&
            equalContent !== '') {
            displayNum1.textContent = displayResult.textContent;
            displayResult.textContent = '';
            displayOperator.textContent = keyText;
            displayNum2.textContent = '';
            displayEqual.textContent = '';

        } else if (numResult === '' &&
            equalContent === '') {
            displayResult.textContent = operate(num1Content, num2Content, operatorContent);
            displayNum1.textContent = displayResult.textContent;
            displayResult.textContent = '';
            displayOperator.textContent = keyText;
            displayNum2.textContent = '';
        }

    } else if (eTarget.className === 'decimal') {
        if (!num1Content.includes('.') &&
            equalContent === '') {
            displayNum1.textContent += keyText;

        } else if (num2Content !== '' &&
            !num2Content.includes('.') &&
            displayEqual.textContent === '') {
            displayNum2.textContent += keyText;
        }

    } else if (eTarget.className === 'equal') {
        if (num2Content !== '' &&
            displayEqual.textContent === '') {
            displayEqual.textContent += keyText;
            displayResult.textContent = operate(num1Content, num2Content, operatorContent);
        }

    } else if (eTarget.className === 'reset') {
        displayNum1.textContent = '0';
        displayResult.textContent = '';
        displayOperator.textContent = '';
        displayNum2.textContent = '';
        displayEqual.textContent = '';

    } else if (eTarget.className === 'delete') {
        if (num1Content.length > 1) {
            displayNum1.textContent =
                displayNum1.textContent.slice(0, num1Content.length - 1);

        } else {
            displayNum1.textContent = '0';
        }
    }

})


const operate = (num1, num2, operator) => {
    let parseNum1 = parseFloat(num1);
    let parseNum2 = parseFloat(num2);
    let result = null;

    switch (operator) {
        case '+':
            return parseNum1 + parseNum2;
        case '-':
            return parseNum1 - parseNum2;
        case '×':
            return parseNum1 * parseNum2;
        case '÷':
            if (parseNum1 === 0 && parseNum2 === 0) {
                return ('Result is undefined');
            } else if (parseNum2 === 0) {
                return ('Cannot divide by zero');
            } else {
                return parseNum1 / parseNum2;
            };
    }

}


