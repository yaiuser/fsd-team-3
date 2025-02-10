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
    document.getElementById("imagePreview").src = _SERVER_URL + dish.image;
    
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
  const dishId2 = localStorage.getItem("editDishId");
  const formData = new FormData();  // Create FormData object

    // Prepare the updated dish data (not including the image here)
    const updatedDish = {
      title: document.getElementById('productName').value,
      description: document.getElementById('productDesc').value,
      price: document.getElementById('Price').value,
      quantityAvailable: document.getElementById('Quantity').value,
      category: { id: document.getElementById('productCat').value },
      tag: document.getElementById('tags').value,
    };

    console.log("Updated Dish Data:", updatedDish);

    // Append updated dish data as JSON string
    formData.append("data", JSON.stringify(updatedDish));

    // Check if an image file is selected
    let imageFile = document.getElementById("fileInput").files[0];
    if (imageFile) {
        // Append the image file to formData
        formData.append("image", imageFile);
    }

    // Sending the formData via a PUT request to update the dish
    fetch(`http://localhost:8080/product/update/${dishId2}`, {
        method: "PUT",
        body: formData,  // Send FormData as the request body
    })
        .then(response => {
            if (response.ok) {
                alert("Dish updated successfully!");
                window.location.href = "dishes.html";  // Redirect to dishes list page
            } else {
                alert("Error updating dish.");
            }
        })
        .catch(error => {
            console.error("Error updating dish:", error);
            alert("An error occurred.");
        });

    
}

// Move previewImage function outside of saveEditedDish
function previewImage(event) {
  const file = event.target.files[0];  // Get the file that was selected
  const reader = new FileReader();

  reader.onload = function() {
      // Set the image source to the selected file
      document.getElementById('imagePreview').src = reader.result;
  };

  if (file) {
      reader.readAsDataURL(file);  // Convert the image file to a data URL for preview
  }      
}

