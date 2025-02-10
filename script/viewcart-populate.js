document.addEventListener("DOMContentLoaded", () => {
  
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

  function calculateServiceCharge(totalPrice) {
    const serviceChargePercentage = 0.10;                                    // 10% service charge
    return totalPrice * serviceChargePercentage;
  }

  function calculateGST(subtotal) {
    const gstPercentage = 0.09;                                              // 9% GST
    return subtotal * gstPercentage;
  }
  
  function calculateTotalPrice(orderItems) {
    return orderItems.reduce((total, orderItem) => {
      const itemPrice = orderItem.menuItem.price;  
      const quantityOrdered = orderItem.quantityOrdered; 
      return total + (itemPrice * quantityOrdered);                           // Calculate the total for this order item and add it to the running total
    }, 0);  
    

  }



  // Function to render the cart items
  function renderCartItems(orderItems) {
    const cartPopulation = document.querySelector(".item-cards.row");

    orderItems.forEach((orderItem) => {
      const menuItem = orderItem.menuItem;

      // Create the position container for the card
      const cardPos = document.createElement("div");
      cardPos.className = "col-sm-12 col-md-6 col-lg-4 triggerDiv";
      cardPos.setAttribute("data-id", orderItem.id); // Add orderItem.id to data-id attribute for easier editing....
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
      cardImage.src = menuItem.image;
      cardImage.alt = menuItem.title;
      cardItem.appendChild(cardImage);

      // Add the content container
      const cardBody = document.createElement("div");
      cardBody.className = "food-card-content";
      itemCol.appendChild(cardBody);

      // Add the title
      const cardTitle = document.createElement("h3");
      cardTitle.className = "food-title";
      cardTitle.innerText = menuItem.title;
      cardBody.appendChild(cardTitle);

      // Add the Price
      const cardPrice = document.createElement("p");
      cardPrice.className = "price";
      cardPrice.innerText = `$${menuItem.price.toFixed(2)}`;
      cardBody.appendChild(cardPrice);

      // Add the Special request
      const cardText = document.createElement("p");
      cardText.className = "food-desc";
      cardText.innerText = orderItem.additionalRequests;
      cardBody.appendChild(cardText);

      // Add an edit link
      const cardEdit = document.createElement("span");
      cardEdit.className = "edit";
      cardEdit.innerText = "Edit";
      cardBody.appendChild(cardEdit);

      // Add the quantity controls container
      const cardQtyContainer = document.createElement("div");
      cardQtyContainer.className = "card-button";
      cardBody.appendChild(cardQtyContainer);

      // Add the "+" button
      const cardAddBtn = document.createElement("button");
      cardAddBtn.className = "btn-add";
      cardAddBtn.textContent = "+";
      cardQtyContainer.appendChild(cardAddBtn);

      // Add the quantity number
      const cardQtyNumber = document.createElement("span");
      cardQtyNumber.className = "number";
      cardQtyNumber.textContent = orderItem.quantityOrdered;
      cardQtyContainer.appendChild(cardQtyNumber);

      // Add the "-" button
      const cardMinusBtn = document.createElement("button");
      cardMinusBtn.className = "btn-minus";
      cardMinusBtn.textContent = "-";
      cardQtyContainer.appendChild(cardMinusBtn);

      // Edit Button - Show Modal
      cardEdit.addEventListener("click", () => {
        // Populate the modal with the current item details
        document.getElementById("modal-title").innerText = menuItem.title;
        document.getElementById("modal-img").src = menuItem.image;
        document.getElementById("modal-desc").innerText = menuItem.description;
        document.getElementById(
          "modal-price"
        ).innerText = `$${menuItem.price.toFixed(2)}`;
        document.getElementById("Additional-requests-text").value =
          orderItem.additionalRequests;

        const modal = new bootstrap.Modal(
          document.getElementById("food-item-modal")
        );
        modal.show();

        
        const currentOrderItemId = cardPos.getAttribute("data-id");                         // Get the current orderItemId

        // Save button event listener for this specific modal
        const saveButton = document.getElementById("save-edit-btn");
        saveButton.onclick = () => {
          const updatedRequest = document.getElementById(
            "Additional-requests-text"
          ).value;

          // Prepare the update data object
          const updateData = {
            additionalRequests: updatedRequest,
          };

          // Send the PATCH request to update the order item with the given id
          fetch(
            `http://localhost:8080/orderItem/update/${currentOrderItemId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updateData),                                     // Send the updated additionalRequests field
            }
          )
            .then((response) => response.json())
            .then((updatedOrder) => {
              console.log("Updated order item:", updatedOrder);

              // Update the correct card description in the UI
              const cardDesc = document.querySelector(
                `.triggerDiv[data-id="${currentOrderItemId}"] .food-desc`
              );
              if (cardDesc) {
                cardDesc.innerText = updatedRequest;                                 // Update the food description text
              }
            })
            .catch((error) =>
              console.error("Error updating additional request:", error)
            );
        };
      });

      // Quantity Decrease
      cardMinusBtn.addEventListener("click", () => {
        let counter = parseInt(cardQtyNumber.textContent);
        const currentOrderItemId = cardPos.getAttribute("data-id");

        if (counter > 1) {
          counter--;
          
          const orderItem = orderItems.find(item => item.id == currentOrderItemId);
          if (orderItem) {
            orderItem.quantityOrdered = counter; // Update the quantity in the local array
          }
        
          
          fetch(                                                                        // Send PATCH request to update quantity
            `http://localhost:8080/orderitem/update/${currentOrderItemId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ quantityOrdered: counter }),
            }
          )
            .then((response) => response.json())
            .then((updatedOrder) => {
              console.log("Updated order item:", updatedOrder);
              cardQtyNumber.textContent = counter;                                       // Update UI with new quantity
              updateTotalPrice(orderItems);                                              //Update New Price
             
              updateCartItemBadge(getCurrentOrderItems());                              // Update the cart item badge count dynamically
            })
            .catch((error) => console.error("Error updating quantity:", error));
        } else {                                                                        // If quantity is 1, send DELETE request
          
          fetch(
            `http://localhost:8080/orderitem/delete/${currentOrderItemId}`,
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
                           
                updateCartItemBadge(getCurrentOrderItems());                                // Update the cart item badge count dynamically after deletion
              } else {
                console.error("Error deleting order item.");
              }
            })
            .catch((error) =>
              console.error("Error deleting order item:", error)
            );
        }
      });

      // Quantity Increase
        cardAddBtn.addEventListener("click", () => {
          let counter = parseInt(cardQtyNumber.textContent);
          counter++;

          const currentOrderItemId = cardPos.getAttribute("data-id");

          // Find the item in the local orderItems array
          const orderItem = orderItems.find(item => item.id == currentOrderItemId);
          if (orderItem) {
            orderItem.quantityOrdered = counter;                                        // Update the quantity in the local array
          }

    
          fetch(`http://localhost:8080/orderitem/update/${currentOrderItemId}`, {       // Send PATCH request to update quantity in the backend
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantityOrdered: counter }),
          })
            .then((response) => response.json())
            .then((updatedOrder) => {
              console.log("Updated order item:", updatedOrder);
              cardQtyNumber.textContent = counter;                                        // Update UI with new quantity

              updateTotalPrice(orderItems);                                                // Update the total price dynamically
            })
            .catch((error) => console.error("Error updating quantity:", error));
        });


      function updateTotalPrice(orderItems) {
        const totalPrice = calculateTotalPrice(orderItems);
        const formattedTotalPrice = totalPrice.toFixed(2);
        document.getElementById("totalPrice").textContent = `${formattedTotalPrice}`;
      }

      // Function to get the current order items displayed in the UI
      function getCurrentOrderItems() {
        const orderItems = [];
        document.querySelectorAll(".triggerDiv").forEach((card) => {
          const quantity = parseInt(card.querySelector(".number").textContent);
          orderItems.push({ quantityOrdered: quantity });
        });
        return orderItems;
      }
    }); 
  }
  

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

       
        const totalPrice = calculateTotalPrice(allOrderItems);                          // Calculate the total price of the order
        document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);                        
        updateCartItemBadge(allOrderItems);                                             // Update the cart item badge with the total quantity
        renderCartItems(allOrderItems);                                                 // Render the cart items in the UI using the renderCartItems function above
      } else {
        console.error("Invalid order data structure:", orderData);
      }
    })
    .catch((error) => {
      console.error("Error fetching order data:", error);
    });

    // Function to update table number based on table in localStorage
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
    updateTableNumber();


});
