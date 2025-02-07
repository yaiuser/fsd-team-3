// * Function to make the footer clickable to hide or show 
let isVisible = false; // Track whether the footer is visible

// Select the drag button and footer elements
const dragButton = document.getElementById("dragButton");
const orderFooters = document.querySelectorAll(".orderFooter");

// Function to reveal content by changing opacity to 1
const revealContent = () => {
    orderFooters.forEach(orderFooter => {
        // Remove 'd-none' class to make the element visible
        orderFooter.classList.remove('d-none');
        // Set the opacity to fully visible
        orderFooter.style.opacity = 1;
    });
};

// Function to hide content by fading it out and removing from layout
const hideContent = () => {
    orderFooters.forEach(orderFooter => {
        // Fade out the content
        orderFooter.style.opacity = 0;
        // Add 'd-none' to completely remove it from the layout
        orderFooter.classList.add('d-none');
    });
};

// Handle the click event to reveal or hide the footer
dragButton.addEventListener("click", () => {
    if (isVisible) {
        hideContent(); // Hide the footer if it is visible
    } else {
        revealContent(); // Reveal the footer if it is hidden
    }
    isVisible = !isVisible; 
});


//* End of FUNCTION to hide show footer

//* Hover effect for the cards

document.querySelectorAll('.food-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// * Update Cart Item Badge based on database *//
function updateCartItemBadge(orderItems) {
    const orderBadge = document.querySelector(".order_badge");
    const totalItems = orderItems.reduce((total, item) => total + item.quantityOrdered, 0);
    orderBadge.textContent = totalItems;
}

fetch("http://localhost:8080/order/all")
.then((response) => {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
})
.then((orderData) => {
    // Get all order items
    const allOrderItems = orderData.flatMap(order => order.orderItems);
    
    // Update the cart item badge count
    updateCartItemBadge(allOrderItems);

})
.catch((error) => {
    console.error("Error fetching order data:", error);
});


// * Populating modal cards
document.addEventListener('DOMContentLoaded', function () {
  // Get all food cards, the food cards have the same class when populated
  const foodCards = document.querySelectorAll('.triggerDiv');
  
  // Initialize the modal
  const modalElement = document.getElementById('food-item-modal');
  const modal = new bootstrap.Modal(modalElement);

      // Set the modal image src
      const modalImage = document.querySelector('#modal-img');
      modalImage.src = foodImage.src;  
      modalImage.onload = function() {
      modalImage.style.width = 'auto';  // Ensure it takes up full width
      modalImage.style.height = 'auto'; // Adjust the height
        
      };
      // Show the modal
      modal.show();


});
