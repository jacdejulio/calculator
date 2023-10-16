const keys = document.querySelector(".calc_keys");
const digits = document.querySelectorAll(".digit");
const displayB = document.querySelector(".calc_display_b");
let displayBVal = displayB.innerText;


keys.addEventListener('click', e => {
    if (e.target.classList.contains('digit')) {
        if (displayBVal === '0') {
            displayBVal = e.target.textContent;
        } else {
            // Append the clicked digit to the existing content
            displayBVal += e.target.textContent;
        }
        // Update the display with the new value
        displayB.innerText = displayBVal;
    }


});
