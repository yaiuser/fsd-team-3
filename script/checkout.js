
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
