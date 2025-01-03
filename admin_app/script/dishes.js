// Mock Dish Data
const dishes = [
    {id: 1, name: "Sphagetti", image: "images/sphagetti.jpg", description: "Classic Italian Pasta.", price: 12},
]
const dishContainer = document.querySelector("#dish-container");

// function to append each dish cards
function appendDishes (dishes) {
    
    dishes.forEach((dish) => {
        const card = document.createElement("div");                 // create card container
        card.className = 'card border-0  mb-4';
        dishContainer.append(card)                                  

        const image = document.createElement("img");                // add dish image
        image.className = "card-img-top img-fluid w-25 h-auto";
        image.src = dish.image;
        image.alt = dish.name;
        card.append(image);

        const cardBody = document.createElement("div");             // add dish card body
        cardBody.className = "card-body";
        card.append(cardBody);

        const cardTitle = document.createElement("h5");             // add dish name
        cardTitle.className = "card-title";
        cardTitle.textContent = dish.name;
        cardBody.append(cardTitle);

        const cardDescription = document.createElement("p");        // add dish description
        cardDescription.className = "card-text";
        cardDescription.textContent = dish.description;
        cardBody.append(cardDescription);

        const cardPrice = document.createElement("p");              // add dish price
        cardPrice.className = "card-text text=primary";
        cardPrice.textContent = `$${dish.price}`;
        cardBody.append(cardPrice);

    });
}

appendDishes(dishes);