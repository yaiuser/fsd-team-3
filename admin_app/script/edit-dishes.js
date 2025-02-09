document.addEventListener("DOMContentLoaded", function () {
   
    fetch("http://localhost:8080/category/all") // Populate categories in the form
        .then(response => response.json())
        .then(categories => {
            let categorySelect = document.getElementById("productCat");

            // Clear existing options first
            categorySelect.innerHTML = '<option value="">Choose...</option>';

            categories.forEach(category => {
                let option = document.createElement("option");
                option.value = category.id; // Use category ID as value
                option.textContent = category.category; // Use category name for display
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading categories:", error));

    });



// Get the dish ID from the query string in the URL
const dishId = localStorage.getItem("editDishId");

// Fetch the dish details from the backend
fetch(`http://localhost:8080/product/get/${dishId}`)
  .then(response => response.json())
  .then(dish => {
    // Prepopulate the form fields with the dish data
    document.getElementById("productName").value = dish.title;
    document.getElementById("productCat").value = dish.category;
    document.getElementById("Price").value = dish.price;
    document.getElementById("Quantity").value = dish.quantityAvailable;
    document.getElementById("tags").value = dish.tags;
    document.getElementById("productDesc").value = dish.description;
    document.getElementById("imagePreview").src = dish.image;
    
    // Attach the update function to the form
    const form = document.querySelector("form");
    form.onsubmit = (event) => {
      event.preventDefault();
      updateDish(dishId);
    };
  })
  .catch(error => {
    console.error("Error fetching dish data:", error);
  });

// Function to handle updating the dish
function saveEditedDish(dishId) {
  const updatedDish = {
    title: document.getElementById("productName").value,
    category: document.getElementById("productCat").value,
    price: parseFloat(document.getElementById("Price").value),
    quantity: parseInt(document.getElementById("Quantity").value),
    tags: document.getElementById("tags").value,
    description: document.getElementById("productDesc").value,
    image: document.getElementById("imagePreview").src,  // Assuming image is updated
  };

  fetch(`http://localhost:8080/product/update/${dishId}`, {
    method: "POST",  // PATCH for partial updates
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedDish),
  })
    .then(response => {
      if (response.ok) {
        alert("Dish updated successfully!");
        window.location.href = "/dishes.html";  // Redirect to dishes list page
      } else {
        alert("Error updating dish.");
      }
    })
    .catch(error => {
      console.error("Error updating dish:", error);
      alert("An error occurred.");
    });
}
