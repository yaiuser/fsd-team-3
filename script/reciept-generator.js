const orderId = localStorage.getItem("orderId");
fetch(`http://localhost:8080/order/${orderId}/all`)
.then(response => response.json())
.then(data => {
   document.getElementById('orderNumber').innerText = data.id;
   document.getElementById('time').innerText = data.createdAt;
   document.getElementById('seat').innerText = data.seatNumber;
   const itemsList = document.getElementById('itemsList');

   let totalPrice = 0;
   let subtotal = 0;
   let taxRate = 0.10; 
   let gstRate = 0.09; 

   data.orderItems.forEach(orderItem => {
       const menuItem = orderItem.menuItem; // Access menuItem inside orderItem

       // Calculate the total price for this item
       const itemTotal = orderItem.quantityOrdered * menuItem.price;
       subtotal += itemTotal; 

       totalPrice += itemTotal; 

       const li = document.createElement('li');
       
       const itemText = document.createElement('span');
       itemText.innerText = `${orderItem.quantityOrdered}x ${menuItem.title}`;

       const priceText = document.createElement('span');
       priceText.className = 'price-text';  
       priceText.innerText = `$${itemTotal.toFixed(2)}`; 

       li.appendChild(itemText);
       li.appendChild(priceText);

       itemsList.appendChild(li);
   });

   // Calculate the tax and GST based on subtotal
   const gstAmount = subtotal * gstRate;
   const taxAmount = subtotal * taxRate;
   const total = subtotal + gstAmount + taxAmount;

   document.getElementById('total').innerText = `${(total).toFixed(2)}`;
   document.getElementById('subtotal').innerText = `${(subtotal).toFixed(2)}`;
   document.getElementById('serviceAmount').innerText = `${(taxAmount).toFixed(2)}`;
   document.getElementById('gstAmount').innerText = `${(gstAmount).toFixed(2)}`;
});

function orderAgain() {
const seatNumber = localStorage.getItem('seatNumber');
const orderAgainBtn = document.getElementById('orderAgainBtn');
event.preventDefault(); // Prevent the default behavior
window.location.href = `custlogin.html?seatNumber=${seatNumber}`;
}