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

    function deleteItem() {
      const currentOrderItemId = cardPos.getAttribute("data-id");
      
      // Delete the item from the backend
      fetch(`http://localhost:8080/orderItem/delete/${currentOrderItemId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Deleted order item with ID: ${currentOrderItemId}`);
            
            // Remove the item from the DOM
            cardPos.remove(); 
            
            // Fetch the updated order data to ensure everything is in sync
            fetch(`http://localhost:8080/order/${orderId}/all`) // Make sure `orderId` is available
              .then((response) => response.json())
              .then((orderData) => {
                if (!orderData.ok) {
                  const allOrderItems = orderData.orderItems;
    
                  // Recalculate total price
                  calculateTotalPrice(allOrderItems); 
    
                  // Update cart item badge
                  updateCartItemBadge(allOrderItems); 
                } else {
                  console.error("Invalid order data structure:", orderData);
                }
              })
              .catch((error) => console.error("Error fetching updated order data:", error));
            
          } else {
            console.error("Error deleting order item.");
          }
        })
        .catch((error) => console.error("Error deleting order item:", error));
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

      renderCartItems(allOrderItems); 
      calculateTotalPrice(allOrderItems);                    
      updateCartItemBadge(allOrderItems);                                             
                                                     
      console.error("Invalid order data structure:", orderData);
    }
  })
  .catch((error) => {
    console.error("Error fetching order data:", error);
  });

  function calculateTotalPrice(orderItems) {
    let totalPrice = 0;
    let subtotal = 0;
    let serviceRate = 0.10; // 10% tax rate
    let gstRate = 0.09; // 9% GST rate
  
    let totalService = 0; // Initialize total service charge
  let totalGst = 0; // Initialize total GST charge
    // Loop through each item in the orderItems array
    orderItems.forEach(item => {
        const itemPrice = item.menuItem.price * item.quantityOrdered; // Calculate the price for each item
        subtotal += itemPrice; // Add to subtotal
  
        // Optionally apply GST or tax to each item
        const gstAmount = itemPrice * gstRate;
        const serviceAmount = itemPrice * serviceRate;
  
        // Add the item price, GST, and tax to the total price
        totalPrice += itemPrice + gstAmount + serviceAmount;
  
        totalGst += gstAmount;
        totalService += serviceAmount;
    });
  
    // Update the DOM with the calculated prices
    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("servicePrice").textContent = totalService.toFixed(2);
    document.getElementById("gstPrice").textContent = totalService.toFixed(2);
  
    // Return the total price and subtotal if needed
    return { totalPrice, subtotal };
  }

  function updateCartItemBadge(orderItems) {                                  // Function to update the cart item badge count
    const orderBadge = document.querySelector(".order_badge");
    const totalItems = orderItems.reduce(                                     // Calculate total quantity ordered for all items
      (total, item) => total + item.quantityOrdered,
      0
    );
    
    if (orderBadge) {                                                         // Update the badge count
      orderBadge.textContent = totalItems;
    }
  }
  