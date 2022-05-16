// common variables
const wrapper = document.querySelector('.wrapper');

// helper functions 
function createElement(name) {
    const element = document.createElement(name);
    return element;
}

function addClass(element, className) {
    element.classList.add(className)
}