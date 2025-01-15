document.addEventListener("DOMContentLoaded", () => {
    // Fetch the mock items from a JSON file
    fetch("../script/mock-order.json") // TODO: Mock Data to be from server that collects added items from previous page.
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // Select the cart-population container
            const cartPopulation = document.querySelector(".item-cards.row");

            // Use a for loop to create cards for each item in the JSON data
            for (let i = 0; i < data.length; i++) {
                const mockItem = data[i];

                // Create the position container for the card (column layout)
                const cardPos = document.createElement("div");
                cardPos.className = "col-sm-12 col-md-6 col-lg-4 triggerDiv";
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
                cardImage.src = mockItem.image;
                cardImage.alt = mockItem.title;
                cardItem.appendChild(cardImage);

                // Add the content container
                const cardBody = document.createElement("div");
                cardBody.className = "food-card-content";
                itemCol.appendChild(cardBody);

                // Add the title
                const cardTitle = document.createElement("h3");
                cardTitle.className = "food-title";
                cardTitle.innerText = mockItem.title;
                cardBody.appendChild(cardTitle);

               
                // Add the Price
                const cardPrice = document.createElement("p");
                cardPrice.className = "price";
                cardPrice.innerText = `$${mockItem.price.toFixed(2)}`;
                cardBody.appendChild(cardPrice);

                 // Add the Special request
                const cardText = document.createElement("p");
                cardText.className = "food-desc";
                cardText.innerText = mockItem.additionalRequest;
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
                cardQtyNumber.textContent = mockItem.quantityOrdered;
                cardQtyContainer.appendChild(cardQtyNumber);

                // Add the "-" button
                const cardMinusBtn = document.createElement("button");
                cardMinusBtn.className = "btn-minus";
                cardMinusBtn.textContent = "-";
                cardQtyContainer.appendChild(cardMinusBtn);


              cardEdit.addEventListener("click", () => {
                    // Populate modal with the item's data
                    document.getElementById("modal-title").innerText = mockItem.title;
                    document.getElementById("modal-img").src = mockItem.image;
                    document.getElementById("modal-desc").innerText = mockItem.description;
                    document.getElementById("modal-price").innerText = `$${mockItem.price.toFixed(2)}`;
                    document.getElementById("Additional-requests-text").value = mockItem.additionalRequest;

                    // Show the Modal on Click
                    const modal = new bootstrap.Modal(document.getElementById("food-item-modal"));
                    modal.show();
                });
 
                   // TODO: Change this Simple Button Increase/Decrease to directly affect JSON File using Server
                const minusButtons = document.querySelectorAll(".btn-minus");

                minusButtons.forEach((button) => {
                    button.addEventListener('click', () => {
                        const card = button.closest('.triggerDiv'); // Get the closest card container
                        const numberDisplay = card.querySelector(".number"); // Get the number display within the card

                        let counter = parseInt(numberDisplay.textContent); // Get current quantity
                        if (counter > 1) {
                            counter--; // Decrease quantity
                            numberDisplay.textContent = counter; // Update the display
                        } else {
                            card.remove(); // Remove card if quantity is 1 and "-" is clicked
                        }
                    });
                });

                const addButtons = document.querySelectorAll(".btn-add");
                addButtons.forEach((button) => {
                    button.addEventListener('click', () => {
                        const card = button.closest('.triggerDiv'); // Get the closest card container
                        const numberDisplay = card.querySelector(".number"); // Get the number display within the card
                            
                        let counter = parseInt(numberDisplay.textContent); // Get current quantity  
                            counter++; // Increase Quantity
                            numberDisplay.textContent = counter; // Update the display
                    
                    });
                });
            }
        })
        .catch((error) => {
            console.error("Error fetching mock items:", error);
        });
});
