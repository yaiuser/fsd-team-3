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
    isVisible = !isVisible; // Toggle visibility state
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

// * End of Hover effect for the cards *//


//* Create increased number to cart //
// Cart Counter Logic
let totalItems = 0; // Shared counter for all 'btn-add' buttons

// Selecting all .btn-add will increase my Cart counter.
document.querySelectorAll('.btn-add').forEach((button) => {
  button.addEventListener('click', (event) => {
    totalItems++; // Increment the shared counter

    
    // Update the global badge inside the 'btnConfirmOrder' button
    const badge = document.querySelector('#btnConfirmOrder .order_badge');
    if (badge) {
      badge.textContent = totalItems.toString(); // Update badge text
     
    } else {
      console.error('Order badge not found!');
    }

    // Prevent the event from propagating to parent (card click event)
    event.stopPropagation();
  });
});

// * Populating modal cards
document.addEventListener('DOMContentLoaded', function () {
  // Get all food cards, the food cards have the same class when populated
  const foodCards = document.querySelectorAll('.triggerDiv');
  
  // Initialize the modal
  const modalElement = document.getElementById('food-item-modal');
  const modal = new bootstrap.Modal(modalElement);

  // Add click event listener to each food card
  foodCards.forEach(card => {
    card.addEventListener('click', function () {
      // Get the content from the already populated clicked card
      const foodTitle = card.querySelector('.food-title').textContent;
      const foodDesc = card.querySelector('.food-desc').textContent;
      const foodPrice = card.querySelector('.price').textContent;
      const foodImage = card.querySelector('.food-card-img img'); // Get the image from the clicked card
      
      // Populate the modal with the content
      document.getElementById('modal-title').textContent = foodTitle;
      document.getElementById('modal-desc').textContent = foodDesc;
      document.getElementById('modal-price').textContent = foodPrice;
      
      // Set the modal image src
      const modalImage = document.querySelector('#modal-img');
      modalImage.src = foodImage.src;  
      modalImage.onload = function() {
      modalImage.style.width = 'auto';  // Ensure it takes up full width
      modalImage.style.height = 'auto'; // Adjust the height
        
      };
      // Show the modal
      modal.show();

      // Get the "Add to Cart" button inside the modal and add the event listener
      const btnAddModal = modalElement.querySelector('.cart-add');
      if (btnAddModal) {
        btnAddModal.addEventListener('click', function (event) {
          totalItems++; // Increment the cart counter on modal add button click
          
          // Update the cart badge in the 'btnConfirmOrder'
          const badge = document.querySelector('#btnConfirmOrder .order_badge');
          if (badge) {
            badge.textContent = totalItems.toString(); // Update badge text
          }

          // Prevent the click from propagating to the modal card click listener
          event.stopPropagation();
        });
      }
    });
  });
});
