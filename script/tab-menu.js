let foodArray = []; // Declare a variable to store the array
let activeMenuItems = [];
// dragging part of menu
let htmlObject; // declare variable for use later
let menuHeader;
let htmlObject2;
let htmlObject3;
let placeholder;
let foodItem;
let menuRefer = ["Mains","Burgers","Pasta","Pizza","Sides","Drinks","Desserts"];
let defaultMenu = ["Mains","Burgers","Pasta","Pizza","Sides","Drinks","Desserts"];
let pagetitle = document.getElementById("page");
let counter = 0;

let importedFilter = JSON.parse(localStorage.getItem('filterArray')) || [];
console.log(importedFilter);

fetch("http://localhost:8080/category/all")
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON contentDesserts
  })
  .then((data) => {
    console.log(data);
    if (importedFilter.length === 0){         
      foodArray = data;
      foodArray.forEach(element => {
        htmlObject = document.createElement("li");
        htmlObject.innerText = element.category;
        htmlObject.classList.add("tab-btn");
        htmlObject.setAttribute("value",element.id);
        htmlObject.setAttribute("id","mainmenu" + element.id);
        htmlObject.addEventListener("click", (event) => {
          event.preventDefault();
          activeMenuItems = [];       // reset activeMenuItems on each click
          tab_Nav(element.id); 
        });
        if(counter===0){
          htmlObject.classList.add("active");
        }
        tabMenu.appendChild(htmlObject);
        counter++;
      });
      tab_Nav(1);// load mains after data is fetched
    }else{
      //TODO: TO check with Yirong
      foodArray=data.filter(item => importedFilter.every((element) => item.tags.includes(element)));
      defaultMenu = menuCleaner(defaultMenu,foodArray);
      defaultMenu.forEach(element => {
      htmlObject = document.createElement("li");
      htmlObject.innerText = element;
      htmlObject.classList.add("tab-btn");
      htmlObject.setAttribute("id",element);
      if(counter===0){
        htmlObject.classList.add("active");
      }
      tabMenu.appendChild(htmlObject);
      counter++;
      
    });
  }
    // defaultMenu.forEach(element => {
      console.log(tabBtns);
      tabBtns = document.querySelectorAll(".tab-btn");

      tabBtns.forEach((tabBtn, i) => {
        tabBtn.addEventListener("click", () => {
          activeMenuItems = [];       // reset activeMenuItems on each click
          tab_Nav(i); 
        })
      })

      tab_Nav(0);
    // });
  })
  .catch((error) => {
    console.error('There was a problem fetching the JSON:', error);
  //   const itemsContainer = document.getElementById("menu-middle");
  
  // // Create a new div for displaying the "No data found" message
  // const noDataDiv = document.createElement("div");
  // noDataDiv.textContent = "No data found"; // Set the text content

  // // Append the newly created div to the items container
  // itemsContainer.appendChild(noDataDiv);
  //   console.error('Error:', error);
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



// document.addEventListener("DOMContentLoaded", (event)=>{
//   tab_Nav(1);
// });

const tab_Nav = function(catId){
    let tabBtns = document.querySelectorAll(".tab-btn");
    // clearing all childs in middle section
    while (pagetitle.firstChild) {
        pagetitle.removeChild(pagetitle.lastChild);
    }
                                                                      
    tabBtns.forEach((tabBtn) => {
        tabBtn.classList.remove("active");
    });
 
    const activeBtn = document.getElementById("mainmenu" + catId);  
    activeBtn.classList.add("active");
    // let activeMenu = tabBtnClick;

    // foodArray.forEach(item => { if (item.category === activeMenu) activeMenuItems.push(item);});    // getting all the relevant items out
    activeMenuItems = foodArray.filter(item => item.id === activeBtn.value);   // getting all the relevant items out using filter
    // add the category title at the top
    menuHeader = document.createElement("h1");
    menuHeader.innerText = activeMenuItems[0].category;
    pagetitle.appendChild(menuHeader);
    productsByCategory(catId);
   
    
   
}

// FETCH PRODUCTS BY CATEGORY
function productsByCategory(id = null){
 // TODO: Fetch and populate the menucards 
    fetch("http://localhost:8080/product/"+ id)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON contentDesserts
    }).then((data) => {

         // Clear previous content if needed (e.g., remove old cards)
         const htmlObject = document.createElement("div");
         htmlObject.id = "cardrow";
         htmlObject.classList.add("item-cards", "row");
 
         // Add the menuheader class to the main container
         const menuHeader = document.createElement("div");
         menuHeader.classList.add("menuheader");
         pagetitle.appendChild(menuHeader); // Assuming pagetitle is already defined, append it to that
         menuHeader.appendChild(htmlObject); //
   
        data.forEach((element) => {
          console.log(element);
                const cartPopulation = document.querySelector(".item-cards.row");
                // Create the position container for the card (column layout)
                // Create the column layout for the card
                      const cardPos = document.createElement("div");
                      cardPos.className = "col-sm-12 col-md-6 col-lg-4";
                      cartPopulation.appendChild(cardPos);

                      // Create the food card container
                      const itemCol = document.createElement("div");
                      itemCol.className = "food-card";
                      cardPos.appendChild(itemCol);

                      // Add the image container
                      const cardItem = document.createElement("div");
                      cardItem.className = "food-card-img";
                      itemCol.appendChild(cardItem);

                      const cardImage = document.createElement("img");
                      cardImage.src = element.image;  
                      cardImage.alt = element.title;  
                      cardItem.appendChild(cardImage);

                      // Add the content container
                      const cardBody = document.createElement("div");
                      cardBody.className = "food-card-content";
                      itemCol.appendChild(cardBody);

                      // Add the title
                      const cardTitle = document.createElement("h3");
                      cardTitle.className = "food-title";
                      cardTitle.innerText = element.title;  // Use the correct product title
                      cardBody.appendChild(cardTitle);

                      // Add the description
                      const cardDesc = document.createElement("p");
                      cardDesc.className = "food-desc";
                      cardDesc.innerText = element.description;  // Use the correct description
                      cardBody.appendChild(cardDesc);

                      // Add the price
                      const cardPrice = document.createElement("p");
                      cardPrice.className = "price";
                      cardPrice.innerText = `$${element.price.toFixed(2)}`;  // Format the price
                      cardBody.appendChild(cardPrice);

                      // Add the add button
                      const cardButton = document.createElement("div");
                      cardButton.className = "card-button";
                      cardBody.appendChild(cardButton);

                      const cardAddBtn = document.createElement("button");
                      cardAddBtn.className = "btn-add";
                      cardAddBtn.textContent = "+";  // Add "+" button
                      cardButton.appendChild(cardAddBtn);
  

                          //Populating the Modal
                  cardPos.addEventListener("click", () => {
                  // Populate modal with the item's data
                  document.getElementById("modal-title").innerText = element.title;
                  document.getElementById("modal-img").src = element.image;
                  document.getElementById("modal-desc").innerText = element.description;
                  document.getElementById("modal-price").innerText = `$${element.price.toFixed(2)}`;

                  // Show the Modal on Click
                  const modal = new bootstrap.Modal(document.getElementById("food-item-modal"));
                  modal.show();
              });
        });

      
    });
 
}



document.getElementById("filter").addEventListener("click", () => {
  localStorage.setItem('menuArray', JSON.stringify(importedFilter));
  console.log('Array saved to sessionStorage:', filter);
});

function menuCleaner(menu, itemArray){  
  
  let menuArray = [];

  itemArray.forEach(element => {
    if(!menuArray.includes(element.category)){
      menuArray.push(element.category)
    }
  });

  menu.forEach(element => {
    if(!menuArray.includes(element)){
      menu = menu.filter((elem) => elem !== element)
    }
  });

  return menu;
};
