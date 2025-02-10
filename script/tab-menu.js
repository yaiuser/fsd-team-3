let foodArray = []; // Declare a variable to store the array
// dragging part of menu
let menuTab;
let menuHeader;
let firstHeader;
let pagetitle = document.getElementById("page");
let counter = 0;
let endpoint = "";
let importedFilter = JSON.parse(localStorage.getItem("exporterFilter")) || "";
let selectedItemId = null; // For add to cart 

// fetching the categories
fetch("http://localhost:8080/category/all")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse the JSON content
  })
  .then((data) => {
    // creating the menu headers
    foodArray = data;
    foodArray.forEach((element) => {
      menuTab = document.createElement("li");
      menuTab.innerText = element.category;
      menuTab.classList.add("tab-btn");
      menuTab.setAttribute("value", element.id);
      menuTab.setAttribute("id", "mainmenu" + element.id);
      menuTab.addEventListener("click", (event) => {
        event.preventDefault();
        tab_Nav(element.id);
      });
      tabMenu.appendChild(menuTab);
    });

    if (importedFilter === "") {
      endpoint = "";
      tab_Nav(document.querySelector(".tab-btn").value); // load mains after data is fetched
    } else if (importedFilter == "cr") {
      endpoint = "/tag/RECOMMENDED";
      menuCleaner(endpoint)
      tab_Nav(document.querySelector(".tab-btn").value);
    } else if (importedFilter == "gf") {
      endpoint = "/tag/GLUTEN_FREE";
      menuCleaner(endpoint)
      tab_Nav(document.querySelector(".tab-btn").value);
    } else if (importedFilter == "veg") {
      endpoint = "/tag/VEGAN";
      menuCleaner(endpoint)
      tab_Nav(document.querySelector(".tab-btn").value);
    }
    // });
  })
  .catch((error) => {
    console.error("There was a problem fetching the JSON:", error);
  });

const tab_Nav = function (catId) {
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
  // add the category title at the top
  menuHeader = document.createElement("h1");
  menuHeader.innerText = activeBtn.innerText;
  pagetitle.appendChild(menuHeader);
  productsByCategory(catId);
};

// FETCH PRODUCTS BY CATEGORY
function productsByCategory(id = null) {
  fetch("http://localhost:8080/product/" + id + endpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON contentDesserts
    })
    .then((data) => {
      // Clear previous content if needed (e.g., remove old cards)

      // Add the menuheader class to the main container
      const menuHeader = document.createElement("div");
      menuHeader.classList.add("menuheader");
      pagetitle.appendChild(menuHeader); // Assuming pagetitle is already defined, append it to that

      // Container to contain the cards
      const cardContainer = document.createElement("div");
      cardContainer.id = "cardrow";
      cardContainer.classList.add("item-cards", "row");
      menuHeader.appendChild(cardContainer); 

      data.forEach((element) => {
        const cardPopulation = document.querySelector(".item-cards.row");
        // Create the position container for the card (column layout)
        // Create the column layout for the card
        const cardPos = document.createElement("div");
        cardPos.className = "col-sm-12 col-md-6 col-lg-4";
        cardPos.setAttribute("data-item-id", element.id); // Create orderItem id so can identify the card by clicking on it.
        cardPopulation.appendChild(cardPos);

        // Create the food card container
        const itemCol = document.createElement("div");
        itemCol.className = "food-card";
        cardPos.appendChild(itemCol);

        // Add the image container
        const cardItem = document.createElement("div");
        cardItem.className = "food-card-img";
        itemCol.appendChild(cardItem);

        const cardImage = document.createElement("img");
        cardImage.setAttribute("src", "http://localhost:8080" + element.image )
        cardImage.alt = element.title;
        cardItem.appendChild(cardImage);

        // Add the content container
        const cardBody = document.createElement("div");
        cardBody.className = "food-card-content";
        itemCol.appendChild(cardBody);

        // Add the title
        const cardTitle = document.createElement("h3");
        cardTitle.className = "food-title";
        cardTitle.innerText = element.title; // Use the correct product title
        cardBody.appendChild(cardTitle);

        // Add the description
        const cardDesc = document.createElement("p");
        cardDesc.className = "food-desc";
        cardDesc.innerText = element.description; // Use the correct description
        cardBody.appendChild(cardDesc);

        // Add the price
        const cardPrice = document.createElement("p");
        cardPrice.className = "price";
        cardPrice.innerText = `$${element.price.toFixed(2)}`; // Format the price
        cardBody.appendChild(cardPrice);

        // Add the add button
        const cardButton = document.createElement("div");
        cardButton.className = "card-button";
        cardBody.appendChild(cardButton);

        const cardAddBtn = document.createElement("button");
        cardAddBtn.className = "btn-add";
        cardAddBtn.textContent = "+"; // Add "+" button
        cardButton.appendChild(cardAddBtn);

        //Populating the Modal
        cardPos.addEventListener("click", () => {
        
          selectedItemId = cardPos.getAttribute("data-item-id");  // Capture the item ID for add to cart
          // Populate modal with the item's data
          document.getElementById("modal-title").innerText = element.title;
          document.getElementById("modal-img").src = "http://localhost:8080" + element.image;
          document.getElementById("modal-desc").innerText = element.description;
          document.getElementById(
            "modal-price"
          ).innerText = `$${element.price.toFixed(2)}`;

          // Show the Modal on Click
          const modal = new bootstrap.Modal(
            document.getElementById("food-item-modal")
          );
          modal.show();
        });
    
   

      });
    });
}

// *Start of add to Cart
const orderIdNumber = localStorage.getItem("orderId");
document.getElementById("addToCartBtn").addEventListener("click", () => {
  if (!selectedItemId) {
    console.log("No item selected");  // In case the user hasn't selected an item
    return;  // Prevent POST if no item is selected
  }

  const additionalRequests = document.getElementById("Additional-requests-text").value || "";  // Get additional request (default to empty if none)
  const quantityOrdered = 1;  // Default quantity is 1

  // The POST data to send to orderItems
  const postData = {
    additionalRequests: additionalRequests,
    quantityOrdered: quantityOrdered,
    menuItem: {
      id: parseInt(selectedItemId)  
    }
  };

  // Sending POST request to the backend
  fetch(`http://localhost:8080/order/${orderIdNumber}/orderItem/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  })
  .then(response => response.json())
  .then(data => {
    console.log("Item added to cart:", data);
    closeModal();

    fetch(`http://localhost:8080/order/${orderIdNumber}/all`)       //Fetch all orders again to update the cartnumber
    .then(response => response.json())
    .then(orderData => {
      const orderItems = orderData.orderItems; 
      updateCartItemBadge(orderItems);                              // Update the cart item badge count on adding new item

       // Update the total price
       const totalPrice = calculateTotalPrice(orderItems);  // Calculate the new total price
       document.getElementById("totalPrice").textContent = totalPrice.toFixed(2); // Update the total price on the page
  
    });
})
  .catch(error => {
    console.error("Error adding item to cart:", error);
  });
});

//*End of add to Cart

// Function to close the modal
function closeModal() {
  const modal = bootstrap.Modal.getInstance(document.getElementById("food-item-modal"));
  if (modal) {
    modal.hide();
  }
}
// End of add to cart//


// transferring filter from tab-menu.js to filter.js
document.getElementById("filter").addEventListener("click", () => {
  localStorage.setItem("exportFilter", JSON.stringify(importedFilter));
  console.log("Array saved to sessionStorage:", filter);
});

// Menu Dragging part

const tabMenu = document.querySelector(".tab-menu");

let activeDrag = false;

tabMenu.addEventListener("mousemove", (drag) => {
  if (!activeDrag) return;
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

// function to remove the menu headers if they are empty

function menuCleaner(endpoint) {
  fetch("http://localhost:8080/product/search" + endpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON contentDesserts
    })
    .then((data) => {

      let menuArray = [];
      data.forEach(element => {
        if (!menuArray.includes(element.category.id)) {
          menuArray.push(element.category.id);
          }
      });

      menuArray.forEach(element => console.log(typeof(element)))

      let tabBtns = document.querySelectorAll(".tab-btn");

      tabBtns.forEach((tabBtn) => {
        if(!menuArray.includes(tabBtn.value)){
          menuTab=document.getElementById("mainmenu" + tabBtn.value);
          menuTab.remove();
        }
      });
    });

}

function closeModal() {
  const modal = bootstrap.Modal.getInstance(document.getElementById("food-item-modal"));
  if (modal) {
    modal.hide();
  }
}


function updateTableNumber() {
  const seatNumber = localStorage.getItem("seatNumber");

  if (seatNumber) {
    if (seatNumber <= 9) {
      document.getElementById("tableNumber").textContent = "0" + seatNumber;
    } else {
      document.getElementById("tableNumber").textContent = seatNumber;
    }
  } else {
    console.log("No seat number stored in localStorage");
  }
}
window.onload = updateTableNumber;

function updateCartItemBadge(orderItems) {
  const orderBadge = document.querySelector(".order_badge");

  // Calculate total quantity ordered for all items
  const totalItems = orderItems.reduce((total, orderItem) => total + orderItem.quantityOrdered, 0);
  // Update the badge count with the total quantity
  if (orderBadge) {
      orderBadge.textContent = totalItems;
  }
 

}

function calculateTotalPrice(orderItems) {                                  
  return orderItems.reduce((total, orderItem) => {
    const itemPrice = orderItem.menuItem.price;  
    const quantityOrdered = orderItem.quantityOrdered; 
    return total + (itemPrice * quantityOrdered);                           // Calculate the total for this order item and add it to the running total
  }, 0);  
}

const orderId = localStorage.getItem("orderId"); // Retrieve orderId from localStorage

fetch(`http://localhost:8080/order/${orderId}/all`)
.then((response) => {
  if (!response.ok) {
      throw new Error("Network response was not ok");
  }
  return response.json();
})
.then((orderData) => {
  const orderItems = orderData.orderItems; // Directly access the `orderItems` since you're fetching only one order
  updateCartItemBadge(orderItems);  // Update the cart item badge count

  const totalPrice = calculateTotalPrice(orderItems);                          // Calculate the total price of the order
  document.getElementById("totalPrice").textContent = totalPrice.toFixed(2); 
 
})
.catch((error) => {
  console.error("Error fetching order data:", error);
});
