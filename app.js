const keys = document.querySelector(".calc_keys");
const digits = document.querySelectorAll(".digit");
const displayB = document.querySelector(".calc_display_b");
let displayBVal = displayB.textContent;
const displayA = document.querySelector(".calc_display_a");
let displayAVal = displayA.textContent;


keys.addEventListener('click', e => {
    if (e.target.classList.contains('digit') || e.target.className === "decimal") {
        if (displayAVal === '0') {
            displayAVal = e.target.textContent;
        } else {
            displayAVal += e.target.textContent;
        }

    }
    if (e.target.className === "all-clear") {
        displayAVal = '0';
        displayBVal = '';
    }

    if (e.target.className === "clear") {
        if (displayAVal.length > 1) {
            displayAVal = displayAVal.slice(0, displayAVal.length - 1);

        } else {
            displayAVal = '0';
        }

    }

    if (e.target.className === "add" ||
        e.target.className === "subtract" ||
        e.target.className === "multiply" ||
        e.target.className === "divide") {
        displayAVal += " " + e.target.textContent + " ";
        // e.target.classList.add('is-depressed');
    }

    if (e.target.className === "equal") {
        displayAVal += " " + e.target.textContent;
        displayBVal = evaluateExpression(displayAVal.split(" "));
    }


    displayB.textContent = displayBVal;
    displayA.textContent = displayAVal;


});



function evaluateExpression(arr) {
    let result = '';

    let a = parseFloat(arr[0]);
    let b = parseFloat(arr[2]);
    let operator = arr[1];

    // if (operator === "+") {
    //     return add(a, b);
    // }

    switch (operator) {
        case '+':
            return result = a + b;
        case '-':
            return result = a - b;
        case '×':
            return result = a * b;
        case '÷':
            if (b === 0) {
                return result = "Cannot divide by zero";
            }
            return result = a / b;
    }
}
