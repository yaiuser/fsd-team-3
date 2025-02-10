function renderCartItems(orderItems) {
  const cartPopulation = document.querySelector(".item-cards.row");

  orderItems.forEach((orderItem) => {
    const menuItem = orderItem.menuItem;

    const cardPos = document.createElement("div");
    cardPos.className = "col-sm-12 col-md-6 col-lg-4 triggerDiv";
    cardPos.setAttribute("data-id", orderItem.id); // Add orderItem.id to data-id attribute for easier editing....
    cartPopulation.appendChild(cardPos);

    // Create the food card container
    const itemCol = document.createElement("div");
    itemCol.className = "checkout-card";
    cardPos.appendChild(itemCol);

    // Add the image container and quantity
    const cardCounter = document.createElement("div");
    cardCounter.className = "checkout-card-counter";
    itemCol.appendChild(cardCounter);

    const cardCounterText = document.createElement("h4");
    cardCounter.appendChild(cardCounterText);

    const cardQty = document.createElement("span");
    cardQty.className = "qty";
    cardQty.innerText = orderItem.quantityOrdered + "x";
    cardCounterText.appendChild(cardQty);

    // Add the food card content container
    const cardContent = document.createElement("div");
    cardContent.className = "food-card-content";
    itemCol.appendChild(cardContent);

    // Add the header row
    const cardHeaderRow = document.createElement("div");
    cardHeaderRow.className = "header-row";
    cardContent.appendChild(cardHeaderRow);

    const cardTitle = document.createElement("h3");
    cardTitle.className = "food-title";
    cardTitle.innerText = menuItem.title;
    cardHeaderRow.appendChild(cardTitle);

    const trashButton = document.createElement("button");
    trashButton.className = "trash-button";
    cardHeaderRow.appendChild(trashButton);

    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash trash-icon";
    trashIcon.style.color = "#e96010";
    trashButton.appendChild(trashIcon);

    // Add special request
    const cardRequest = document.createElement("p");
    cardRequest.className = "spec-request";
    cardRequest.innerText = orderItem.additionalRequests;
    cardContent.appendChild(cardRequest);

    // Add the price
    const cardPrice = document.createElement("p");
    cardPrice.className = "price";
    cardPrice.innerText = `$${menuItem.price.toFixed(2)}`;
    cardContent.appendChild(cardPrice);

    // Delete Item When Trash is clicked
    trashButton.addEventListener("click", () => {
      deleteItem();
    });

    function deleteItem () {
      const currentOrderItemId = cardPos.getAttribute("data-id");
    
        const orderItem = orderItems.find(item => item.id == currentOrderItemId);
      
        fetch(
          `http://localhost:8080/orderItem/delete/${currentOrderItemId}`,
          {
            method: "DELETE",
          }
        )
          .then((response) => {
            if (response.ok) {
              console.log(
                `Deleted order item with ID: ${currentOrderItemId}`
              );
              cardPos.remove(); 
                         
              // updateCartItemBadge(getCurrentOrderItems());                                // Update the cart item badge count dynamically after deletion
            } else {
              console.error("Error deleting order item.");
            }
          })
          .catch((error) =>
            console.error("Error deleting order item:", error)
          );
    
    }
    
  });
} 

  document.addEventListener("DOMContentLoaded", () => {
    function updateTableNumber() {
      const seatNumber = localStorage.getItem("seatNumber");
    
      if (seatNumber) {
        // If seatNumber exists in localStorage, display it
        if (seatNumber <= 9) {
          // Add a 0 if the seatNumber is less than 10
          document.getElementById("tableNumber").textContent = "0" + seatNumber;
        } else {
          // Otherwise, display the seatNumber as is
          document.getElementById("tableNumber").textContent = seatNumber;
        }
      } else {
        // Optionally, you can handle the case where no seatNumber is found in localStorage
        console.log("No seat number stored in localStorage");
      }
    }
    updateTableNumber();
});

const orderId = localStorage.getItem("orderId");
fetch(`http://localhost:8080/order/${orderId}/all`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((orderData) => {
    console.log("Received order data:", orderData); 

    if (!orderData.ok) {
      const allOrderItems = orderData.orderItems;                                     // Extract the order items array

     
      // const totalPrice = calculateTotalPrice(allOrderItems);                          // Calculate the total price of the order
      // document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);                        
      // updateCartItemBadge(allOrderItems);                                             // Update the cart item badge with the total quantity
      renderCartItems(allOrderItems);                                                 // Render the cart items in the UI using the renderCartItems function above
    } else {
      console.error("Invalid order data structure:", orderData);
    }
  })
  .catch((error) => {
    console.error("Error fetching order data:", error);
  });

