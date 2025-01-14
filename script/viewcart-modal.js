// DOM Content loaded to make sure all the HTML has finish loading first before manipulating 
document.addEventListener('DOMContentLoaded', () => {
    const minusButtons = document.querySelectorAll('.btn-minus');
    const plusButtons = document.querySelectorAll('.btn-add');
    const numberDisplays = document.querySelectorAll('.number');

    minusButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const numberDisplay = numberDisplays[index]; 
            let counter = parseInt(numberDisplay.textContent); 
            if (counter > 1) {
                counter--; 
                numberDisplay.textContent = counter; 
            } else {
                
                const card = button.closest('.triggerDiv'); 
                card.remove(); 
            }
        });
    });

    // Loop through each plus button and attach an event listener
    plusButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const numberDisplay = numberDisplays[index];
            let counter = parseInt(numberDisplay.textContent); 
            counter++;
            numberDisplay.textContent = counter; 
        });
    });


    const deleteCard = document.querySelectorAll('.trash-icon');

    deleteCard.forEach((button, index) => {
        button.addEventListener('click', () => {
            const card = button.closest('.triggerDiv');
            card.remove();
        });
    });

});
        // * Populating modal cards

function MyFunction() {
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
                modalImage.style.width = '100%';  // Ensure it takes up full width
                modalImage.style.height = '200px'; // Adjust the height
            };

            // Show the modal
            modal.show();
                 });
                 // Ensure the modal gets focus
            // Focus management
                modalElement.addEventListener('shown.bs.modal', () => {
                    modalElement.focus(); // Move focus to modal
                });

                modalElement.addEventListener('hidden.bs.modal', () => {
                    const triggerElement = document.getElementById('myLink');
                    if (triggerElement) {
                        triggerElement.focus(); // Return focus to trigger
                    }
               
            });
         });
        }

// // //* Add the total quantity of items into the badge
// let sum = 0;
// numberDisplays.forEach(numberDisplay => { 
//     sum += parseInt(numberDisplay.textContent); 
// });
//     const badge = document.querySelector('#btnConfirmOrder .order_badge');
//       badge.textContent = sum; 

