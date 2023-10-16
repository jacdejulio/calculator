const keys = document.querySelector(".calc_keys");
const digits = document.querySelectorAll(".digit");
const displayB = document.querySelector(".calc_display_b");
let displayBVal = displayB.textContent;
const displayA = document.querySelector(".calc_display_a");
let displayAVal = displayA.textContent;


keys.addEventListener('click', e => {
    let currDisplay = '';
    if (e.target.classList.contains('digit') || e.target.className === "decimal") {
        if (displayBVal === '0') {
            displayBVal = e.target.textContent;
        } else {
            displayBVal += e.target.textContent;
        }

    }
    if (e.target.className === "all-clear") {
        displayBVal = '0';
        displayAVal = '';
    }

    if (e.target.className === "clear") {
        if (displayBVal.length > 1) {
            displayBVal = displayBVal.slice(0, displayBVal.length - 1);

        } else {
            displayBVal = '0';
        }

    }

    if (e.target.className === "add") {
        displayAVal = displayBVal + e.target.textContent;
        displayBVal = '0'
    }

    if (e.target.className === "equal") {
        displayAVal = parseFloat(displayAVal.slice(0, displayAVal.length - 1));
        displayBVal = parseFloat(displayBVal);
        result = add(displayAVal, displayBVal);
        displayBVal = result;
    }


    displayB.textContent = displayBVal;
    displayA.textContent = displayAVal;


});


function add(a, b) {
    return a + b;
}