// document.addEventListener("DOMContentLoaded", function () {
   

function fetchCategories (selectedId = -1) {
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

          if (category.id === selectedId)
            option.selected = true;

          categorySelect.appendChild(option);
      });
  })
  .catch(error => console.error("Error loading categories:", error));
}

// Get the dish ID from the query string in the URL
const dishId = localStorage.getItem("editDishId");

// Fetch the dish details from the backend
fetch(`http://localhost:8080/product/get/${dishId}`)
  .then(response => response.json())
  .then(dish => {
    // Prepopulate the form fields with the dish data
    document.getElementById("productName").value = dish.title;
    document.getElementById("Price").value = dish.price;
    document.getElementById("Quantity").value = dish.quantityAvailable;
    document.getElementById("tags").value = dish.tag;
    document.getElementById("productDesc").value = dish.description;
    document.getElementById("imagePreview").src = _SERVER_URL + dish.image;

    fetchCategories(dish.category.id);
    
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
async function saveEditedDish(dishId) {
  const dishId2 = localStorage.getItem("editDishId");
  //Get form values
  let formData = new FormData();

  // Append the whole data object as a JSON string
  formData.append("data", JSON.stringify({
      title: document.getElementById('productName').value,
      description: document.getElementById('productDesc').value,
      price: parseFloat(parseFloat(document.getElementById('Price').value).toFixed(2)),
      quantityAvailable: parseInt(document.getElementById("Quantity").value),
      category: { id: document.getElementById('productCat').value },
      tag: document.getElementById('tags').value
  }));
  
  // Check for a new image file selected
   let imageInput = document.getElementById("fileInput");
   let imageFile = imageInput.files[0];
 
   if (!imageFile) {
     // No new image selected, so get the existing image URL
     const existingImageUrl = document.getElementById("imagePreview").src;
     
     try {
       // Fetch the existing image and convert it to a blob
       const response = await fetch(existingImageUrl);
       if (!response.ok) {
         throw new Error("Failed to fetch existing image");
       }
       const blob = await response.blob();
      
       imageFile = new File([blob], "existing.jpg", { type: blob.type });
     } catch (error) {
       console.error("Error fetching existing image:", error);
       alert("Error updating dish image: cannot load existing image");
       return; 
     }
   }
   

   formData.append("image", imageFile);
  
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

