// variables for filter

let filter = JSON.parse(localStorage.getItem('menuArray')) || [];
let index;

console.log('Array from menu side:', filter);

// checking for clicks on each button that has tags

document.getElementById("cr").addEventListener("click", () => addRemoveTags("cr"));

document.getElementById("gf").addEventListener("click", () => addRemoveTags("gf"));

document.getElementById("veg").addEventListener("click", () => addRemoveTags("veg"));

// checking if the filter array is empty to make sure none is selected if empty

document.addEventListener("DOMContentLoaded", () => checkNone());
document.addEventListener("DOMContentLoaded", () => 
    filter.forEach(element => {
        document.getElementById(element).classList.add("selected");
    })
);
document.getElementById("filter").addEventListener("click", () => checkNone());

// if click none, clear the css on other buttons so only none is elected

document.getElementById("none").addEventListener("click", () => {
    filter = [];
    document.getElementById("cr").classList.remove("selected");
    document.getElementById("gf").classList.remove("selected");
    document.getElementById("veg").classList.remove("selected");
});

// function to check if tag should be selected or not

function addRemoveTags(tag){
    if(!filter.includes(tag)){
        filter.push(tag);
        document.getElementById(tag).classList.add("selected");
    }else if(filter.includes(tag)){
        filter = filter.filter((element) => element!=tag);
        document.getElementById(tag).classList.remove("selected");
    };
};

// function to check if none should be selected or not

function checkNone(){
    if (filter.length === 0) {
        document.getElementById("none").classList.add("selected");
    } else if (filter.length >= 0) {
        document.getElementById("none").classList.remove("selected");
    }
};

// exporting the filter array for use in tab-menu.js

document.getElementById("back").addEventListener("click", () => {
    localStorage.setItem('filterArray', JSON.stringify(filter));
    console.log('Array saved to sessionStorage:', filter);
});