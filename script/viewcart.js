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
        })
    })
});


// // //* Add the total quantity of items into the badge
// let sum = 0;
// numberDisplays.forEach(numberDisplay => { 
//     sum += parseInt(numberDisplay.textContent); 
// });
//     const badge = document.querySelector('#btnConfirmOrder .order_badge');
//       badge.textContent = sum; 

