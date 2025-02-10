// populate the category drop-down
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

    function saveProduct() {
        // Get form values
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
        
        // Append the image file if there's one selected
        let imageFile = document.getElementById("fileInput").files[0];
        if (imageFile) {
            formData.append("image", imageFile);
        }
        
        // Send the request
        fetch("http://localhost:8080/product/add/new", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            alert("Product added successfully!");
            console.log("Response:", data);
            window.location.href = '../admin_app/dishes.html';
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to add product.");
        });
    }


// Function for the placeholder to change to uploaded image.
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