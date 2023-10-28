// Error handler when dividing by zero the pressing another key operator
// KB support


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
        if (num1Content === '0' &&
            operatorContent === '') {
            displayNum1.textContent = keyText;
        } else if (num1Content !== '0' &&
            operatorContent === '') {
            displayNum1.textContent += keyText;
        } else if (num2Content === '0' &&
            num2Content.length === 1 &&
            equalContent === '') {
            displayNum2.textContent = keyText;
        } else if (num1Content.length >= 1 &&
            operatorContent !== '' &&
            equalContent === '') {
            displayNum2.textContent += keyText;
        } else if (numResult !== '' && num2Content !== '') {
            resetValues();
            displayNum1.textContent = ''
            displayNum1.textContent += keyText;
        }

    } else if (eTarget.classList.contains('operator')) {
        let operateResult = '';
        //Press operator after operate()
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
        // //Press operator after operator
        else if (num1Content !== '' &&
            num2Content !== '') {
            displayOperator.textContent = keyText;
            operateResult = operate(num1Content, num2Content, operatorContent);
            displayResult.textContent = operateResult;
            displayNum1.textContent = operateResult;
            displayNum2.textContent = '';

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
            displayNum1.textContent = '0';
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



