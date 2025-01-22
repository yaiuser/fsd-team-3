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
        cardQty.innerText = mockItem.quantityOrdered + "x";
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
        cardTitle.innerText = mockItem.title;
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
        cardRequest.innerText = mockItem.additionalRequest;
        cardContent.appendChild(cardRequest);

        // Add the price
        const cardPrice = document.createElement("p");
        cardPrice.className = "price";
        cardPrice.innerText = `$${mockItem.price.toFixed(2)}`;
        cardContent.appendChild(cardPrice);

        // Delete Item When Trash is clicked
        const minusButtons = document.querySelectorAll(".trash-button");

        minusButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const card = button.closest(".triggerDiv"); // Get the closest card container
            if (card) {
              card.remove(); // Remove the card immediately
            }
          });
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching mock items:", error);
    });
});
