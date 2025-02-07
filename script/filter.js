// variables for filter

let filter = JSON.parse(localStorage.getItem('exportFilter')) || "";
let currentState = filter; // saving the current filter if user presses back
let index;
let htmlObject;
const filters = ["cr","gf","veg"];

console.log('Array from menu side:', filter);

// checking for clicks on each button that has tags

document.getElementById("cr").addEventListener("click", () => addRemoveTags("cr"));

document.getElementById("gf").addEventListener("click", () => addRemoveTags("gf"));

document.getElementById("veg").addEventListener("click", () => addRemoveTags("veg"));

// checking if the filter is "" to make sure none is selected if ""

document.addEventListener("DOMContentLoaded", () => checkNone());
document.addEventListener("DOMContentLoaded", () => 
    document.getElementById(filter).classList.add("selected")
);
document.getElementById("filter").addEventListener("click", () => checkNone());

// if click none, clear the css on other buttons so only none is elected

document.getElementById("none").addEventListener("click", () => {
    filter = "";
    document.getElementById("cr").classList.remove("selected");
    document.getElementById("gf").classList.remove("selected");
    document.getElementById("veg").classList.remove("selected");
});

// function to check if tag should be selected or not

function addRemoveTags(tag){
    if(filter!==tag){
        filter=tag;
        document.getElementById(tag).classList.add("selected");
        filters.forEach(element => {
            if(element!==tag) document.getElementById(element).classList.remove("selected");
        });
    }else{
        filter="";
        document.getElementById(tag).classList.remove("selected");
    };
};

// function to check if none should be selected or not

function checkNone(){
    if (filter === "") {
        document.getElementById("none").classList.add("selected");
    } else {
        document.getElementById("none").classList.remove("selected");
    }
};

// exporting the filter array for use in tab-menu.js

document.getElementById("back").addEventListener("click", () => {
    localStorage.setItem('exporterFilter', JSON.stringify(currentState)); // exporting old filter if back
});

document.getElementById("apply").addEventListener("click", () => {
    localStorage.setItem('exporterFilter', JSON.stringify(filter));    // exporting new filter if apply
});