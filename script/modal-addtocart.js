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

// * Update Cart Item Badge based on database *//
function updateCartItemBadge(orderItems) {
    const orderBadge = document.querySelector(".order_badge");

    // Calculate total quantity ordered for all items
    const totalItems = orderItems.reduce((total, orderItem) => total + orderItem.quantityOrdered, 0);

    // Update the badge count with the total quantity
    if (orderBadge) {
        orderBadge.textContent = totalItems;
    }
}
const orderId = localStorage.getItem("orderId"); // Retrieve orderId from localStorage

fetch(`http://localhost:8080/order/${orderId}/all`)
.then((response) => {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
})
.then((orderData) => {
    const orderItems = orderData.orderItems; // Directly access the `orderItems` since you're fetching only one order
    updateCartItemBadge(orderItems);  // Update the cart item badge count
   
})
.catch((error) => {
    console.error("Error fetching order data:", error);
});

