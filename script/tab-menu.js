let foodArray = []; // Declare a variable to store the array
let activeMenuItems = [];
// dragging part of menu
let htmlObject; // declare variable for use later
let htmlObject2;
let htmlObject3;
let placeholder;
let foodItem;
let pagetitle = document.getElementById("page");

fetch("../script/food-database.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON content
  })
  .then((data) => {
    foodArray = data; // Store the array in the variable
    tab_Nav(0); // load mains after data is fetched
  })
  .catch((error) => {
    console.error('There was a problem fetching the JSON:', error);
  });

const tabMenu = document.querySelector(".tab-menu");

let activeDrag = false;

tabMenu.addEventListener("mousemove", (drag) => {
    if(!activeDrag) return;
    tabMenu.scrollLeft -= drag.movementX;
    tabMenu.classList.add("dragging");
});

tabMenu.addEventListener("mouseup", () => {
    activeDrag = true;
    tabMenu.classList.remove("dragging");

});

tabMenu.addEventListener("mousedown", () => {
    activeDrag = true;
});

// Change Tab contents

// const tabs = document.querySelectorAll(".tab-content");
const tabBtns = document.querySelectorAll(".tab-btn");

tabBtns.forEach((tabBtn, i) => {
  tabBtn.addEventListener("click", () => {
    activeMenuItems = [];       // reset activeMenuItems on each click
    tab_Nav(i); 
  })
})

// document.addEventListener("DOMContentLoaded", (event)=>{
//   console.log(foodArray);
//   tab_Nav(0);
// });

const tab_Nav = function(tabBtnClick){
    // clearing all childs in middle section
    while (pagetitle.firstChild) {
        pagetitle.removeChild(pagetitle.lastChild);
    }
                                                                      
    tabBtns.forEach((tabBtn) => {
        tabBtn.classList.remove("active");
    });
    // tabs.forEach((tab) => {
    //     tab.classList.remove("active");
    // });

    tabBtns[tabBtnClick].classList.add("active");
    // tabs[tabBtnClick].classList.add("active");
    let activeMenu = tabBtns[tabBtnClick].getAttribute('id');
    // foodArray.forEach(item => { if (item.category === activeMenu) activeMenuItems.push(item);});    // getting all the relevant items out
    activeMenuItems = foodArray.filter(item => item.category === activeMenu);   // getting all the relevant items out using filter
    // add the category title at the top
    htmlObject = document.createElement("h1");
    htmlObject.innerText = activeMenu;
    pagetitle.appendChild(htmlObject);

    // add the
    htmlObject.classList.add("menuheader");
    htmlObject = document.createElement("div");
    htmlObject.id = "cardrow";
    htmlObject.classList.add("item-cards", "row");
    pagetitle.appendChild(htmlObject);
    activeMenuItems.forEach(element => {

        htmlObject3 = document.getElementById("cardrow");
        htmlObject = document.createElement("div");    
        htmlObject.classList.add("col-sm-12", "col-md-6", "col-lg-4", "triggerDiv");
        htmlObject3.appendChild(htmlObject);

        htmlObject3 = document.createElement("div");  
        htmlObject3.classList.add("food-card");
        htmlObject3.setAttribute("id",element.id)
        htmlObject.appendChild(htmlObject3);

        htmlObject = document.createElement("div");
        htmlObject.classList.add("food-card-img");
        htmlObject3.appendChild(htmlObject);

        htmlObject2 = document.createElement("img");
        htmlObject2.setAttribute("src",element.image);
        htmlObject.appendChild(htmlObject2);

        htmlObject = document.createElement("div");
        htmlObject.classList.add("food-card-content");
        htmlObject3.appendChild(htmlObject);

        htmlObject2 = document.createElement("h3");
        htmlObject2.classList.add("food-title");
        htmlObject2.innerText = element.title;
        htmlObject.appendChild(htmlObject2);

        htmlObject2 = document.createElement("p");
        htmlObject2.classList.add("food-desc");
        htmlObject2.innerText = element.description;
        htmlObject.appendChild(htmlObject2);

        htmlObject2 = document.createElement("p");
        htmlObject2.classList.add("price");
        placeholder = element.price;
        htmlObject2.innerText = "$" + placeholder.toFixed(2);
        htmlObject.appendChild(htmlObject2);

        htmlObject2 = document.createElement("div");
        htmlObject2.classList.add("card-button");
        htmlObject.appendChild(htmlObject2);
        
        htmlObject = document.createElement("button");
        htmlObject.classList.add("btn-add");
        htmlObject.innerText = "+";
        htmlObject2.appendChild(htmlObject)
    });
    

    // adding the modal

    cards = document.querySelectorAll(".food-card");
    
    cards.forEach((card, i) => {
      card.addEventListener("click", () => {
        const modalElement = document.getElementById('food-item-modal');
        const modal = new bootstrap.Modal(modalElement);
        foodItem = foodArray.filter(item => item.id == card.id)[0];
        document.getElementById('modal-title').textContent = foodItem.title;
        document.getElementById('modal-desc').textContent = foodItem.description;
        placeholder = foodItem.price;
        document.getElementById('modal-price').textContent = "$" + placeholder.toFixed(2);
        const modalImage = document.querySelector('#modal-img');
        modalImage.src = foodItem.image;  
        modal.show();

        
      })
    })


}

