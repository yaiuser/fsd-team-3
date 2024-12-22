const ordersContainer = document.getElementById('orders-container');
let orders = [
  { 
    tableNumber: 1, 
    orderNumber: 1001, 
    items: [
      { name: "Pizza", quantity: 2, remark: "Extra Cheese" },
      { name: "Salad", quantity: 1, remark: "No Dressing" }
    ]
  },
  // ... other orders ...
];

function createOrderChit(order) {
  const orderChit = document.createElement('div');
  orderChit.classList.add('order-chit');

  // ... your order chit creation logic ... 

  return orderChit;
}

function displayOrders() {
  ordersContainer.innerHTML = ""; 
  orders.forEach(order => {
    const orderChit = createOrderChit(order);
    ordersContainer.appendChild(orderChit); 
  });
}

displayOrders();