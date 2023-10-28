const displayNum1 = document.querySelector('.display-num1')
const displayNum2 = document.querySelector('.display-num2')
const displayOperator = document.querySelector('.display-operator')
const displayEqual = document.querySelector('.display-equal')
const displayResult = document.querySelector('.display-2')
const keys = document.querySelector('.keys');
const equalBtn = document.querySelector('.equal');
const equalBtnDefBg = '#6c757d';
const equalBtnClkBg = '#f6b327';


keys.addEventListener('click', e => {
    const eTarget = e.target;
    const keyText = eTarget.textContent;
    let num1Content = displayNum1.textContent;
    let num2Content = displayNum2.textContent;
    let numResult = displayResult.textContent;
    let operatorContent = displayOperator.textContent;
    let equalContent = displayEqual.textContent;

    if (eTarget.classList.contains('digit')) {
        //Add btn textcontent to num1
        if (num1Content === '0' &&
            operatorContent === '') {
            displayNum1.textContent = keyText;
        } else if (num1Content !== '0' &&
            operatorContent === '') {
            displayNum1.textContent += keyText;
            //Add btn textcontent to num2
        } else if (num2Content === '0' &&
            num2Content.length === 1 &&
            equalContent === '') {
            displayNum2.textContent = keyText;
        } else if (num1Content.length >= 1 &&
            operatorContent !== '' &&
            equalContent === '') {
            displayNum2.textContent += keyText;
            //Add btn textcontent to num1 after pressing equal sign
        } else if (numResult !== '' && num2Content !== '') {
            resetValues();
            displayNum1.textContent = ''
            displayNum1.textContent += keyText;
        }

    } else if (eTarget.classList.contains('operator')) {
        let operateResult = '';
        //Press another operator after pressing equal sign
        if (numResult !== '' &&
            equalContent !== '') {
            equalBtn.style.background = equalBtnDefBg;
            displayNum1.textContent = numResult;
            displayEqual.textContent = '';
            displayOperator.textContent = keyText;
            displayNum2.textContent = '';
            displayResult.textContent = '';
            displayResult.textContent = operate(num1Content, num2Content, operatorContent);
        }
        //Press another operator without pressing equal sign
        else if (num1Content !== '' &&
            num2Content !== '') {
            operateResult = operate(num1Content, num2Content, operatorContent);
            // Error handler when dividing by zero then pressing another key operator
            if (operateResult === 'Math Error') {
                resetValues();
                displayResult.textContent = 'Math Error';
            } else {
                displayOperator.textContent = keyText;
                displayResult.textContent = operateResult;
                displayNum1.textContent = operateResult;
                displayNum2.textContent = '';
            }



            //Press operator after num1
        } else if (num1Content !== '' && num2Content === '') {
            displayOperator.textContent = keyText;
        }


    } else if (eTarget.className === 'decimal') {
        if (operatorContent === '' && !num1Content.includes('.') &&
            num2Content === '') {
            displayNum1.textContent += keyText;

        } else if (num2Content.length >= 1 &&
            !num2Content.includes('.') &&
            operatorContent !== '' &&
            equalContent === '') {
            displayNum2.textContent += keyText;
        } else if (num2Content === '' &&
            !num2Content.includes('.') &&
            operatorContent !== '') {
            displayNum2.textContent += `0${keyText}`;
        }

    } else if (eTarget.className === 'equal') {
        if (num2Content !== '' &&
            equalContent === '') {
            equalBtn.style.background = equalBtnClkBg;
            displayEqual.textContent += keyText;
            displayResult.textContent = operate(num1Content, num2Content, operatorContent);
        } //Press operator after operate()
        else if (numResult !== '' &&
            equalContent !== '') {
            // displayResult.textContent = '';
            operateResult = operate(num1Content, num2Content, operatorContent);
            displayNum1.textContent = operateResult;
            displayResult.textContent = operate(operateResult, num2Content, operatorContent);
        }

    } else if (eTarget.className === 'reset') {
        resetValues();

    } else if (eTarget.className === 'delete') {
        if (num1Content.length > 1 &&
            num2Content === '' &&
            operatorContent === '') {
            displayNum1.textContent =
                displayNum1.textContent.slice(0, num1Content.length - 1);
        } else if (num1Content.length === 1 &&
            num2Content === '' &&
            operatorContent === '') {
            displayNum1.textContent = '0';
        } else if (equalContent !== '') {
            resetValues();
        } else if (num2Content.length > 1 &&
            operatorContent !== '') {
            displayNum2.textContent =
                displayNum2.textContent.slice(0, num2Content.length - 1);
        } else if (num2Content.length === 1 &&
            operatorContent !== '') {
            displayNum2.textContent = '0';
        }
    }
})

document.addEventListener('keydown', e => {
    // KB support
    // Happy path = num1 + operator + num2 + equal sign
    let operateResult = '';
    let eventKey = e.key;
    const isNumber = isFinite(eventKey);
    let num1Content = displayNum1.textContent;
    let num2Content = displayNum2.textContent;
    let numResult = displayResult.textContent;
    let operatorContent = displayOperator.textContent;
    let equalContent = displayEqual.textContent;


    if (operatorContent !== '' && equalContent === '' &&
        isNumber) {
        displayNum2.textContent += eventKey;
    } else if (num1Content === '0' &&
        isNumber) {
        displayNum1.textContent = eventKey;
    } else if (num1Content !== '0' && equalContent === '' &&
        isNumber) {
        displayNum1.textContent += eventKey;
    }

    if (eventKey === '+' || eventKey === '-' &&
        equalContent === '') {
        displayOperator.textContent = eventKey;
    } else if (equalContent === '' &&
        eventKey === '/') {
        displayOperator.textContent = '÷';
    } else if (equalContent === '' &&
        eventKey === '*') {
        displayOperator.textContent = '×';
    }

    if (eventKey === '=' || eventKey === 'Enter'
        && operatorContent !== ''
        && num2Content !== '') {
        displayEqual.textContent = '=';
        equalBtn.style.background = equalBtnClkBg;
        operateResult = operate(num1Content, num2Content, operatorContent);
        displayResult.textContent = operateResult;
    }


    if (eventKey === '.' && operatorContent === '' &&
        !num1Content.includes('.') && num2Content === '') {
        displayNum1.textContent += eventKey;
    } else if (eventKey === '.' && num2Content.length >= 1 &&
        !num2Content.includes('.') && operatorContent !== '' &&
        equalContent === '') {
        displayNum2.textContent += eventKey;
    } else if (eventKey === '.' && num2Content === '' &&
        !num2Content.includes('.') && operatorContent !== '') {
        displayNum2.textContent += `0${eventKey}`;
    }

    if (eventKey === 'Escape') {
        resetValues();
    }
})





const resetValues = () => {
    displayNum1.textContent = '0';
    displayResult.textContent = '';
    displayOperator.textContent = '';
    displayNum2.textContent = '';
    displayEqual.textContent = '';
    equalBtn.style.background = equalBtnDefBg;
}


const operate = (num1, num2, operator) => {
    let parseNum1 = parseFloat(num1);
    let parseNum2 = parseFloat(num2);
    let result = 0;

    switch (operator) {
        case '+':
            result = parseNum1 + parseNum2;
            break;
        case '-':
            result = parseNum1 - parseNum2;
            break;
        case '×':
            result = parseNum1 * parseNum2;
            break;
        case '÷':
            if (parseNum2 === 0) {
                resetValues();
                return 'Math Error';
            } else {
                result = parseNum1 / parseNum2;
            }
            break;
    }

    // Check if the result contains a decimal point and has more than 10 characters
    if (result.toString().includes('.') && result.toString().length > 10) {
        result = result.toFixed(4);
    }

    return result;
}



