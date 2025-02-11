// Select the order container
const orderContainer = document.querySelector("#order-container");

async function fetchOrders() {
    try {
        const response = await fetch('http://localhost:8080/order/all'); // fetch data
        console.log('Fetch response:', response); // log the response
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const orders = await response.json(); // convert JSON response to a JavaScript Object
        console.log('Orders data:', orders); // log the fetched orders

		// orderContainer.innerHTML = '';
        
            appendOrders(orders); // pass the data to appendOrders
      
    } catch (error) {
        console.log("Failed to fetch or render orders:", error);
    }
}

// Function to append each order into a table
function appendOrders(orders) {
    const tbl = document.createElement("table"); // create the table
    tbl.className = "table bg-light border-1 border";
    orderContainer.append(tbl);

    const thead = tbl.createTHead(); // create the table header
    const theadRow = thead.insertRow(0); // insert row into the header

    const trHeadings = [
        "Order No.",
        "Items Ordered",
        "Order Time",
        "Amount(w/GST)",
        "Action",
        "Seat Number", // Added column for seat number
        "More",
    ];
    trHeadings.forEach((heading) => { // add each column header to the header row
        const thCell = theadRow.insertCell();
        thCell.setAttribute("scope", "col");
        thCell.className = "fw-bolder text-center text-nowrap px-1 border-bottom";
        thCell.innerText = heading;
		thead.append(thCell);
    });

    const tbody = tbl.createTBody(); // create table body

    orders.forEach((order) => { // loop through the orders array to create rows
        const tbodyRow = tbody.insertRow();

        // Append cells with order data
        [
            { text: order.id, className: "text-center" },
            {
                text: order.orderItems.map(item => `${item.menuItem.title} (x${item.quantityOrdered})`).join(", "), // Join items in a single string
                className: "text-center",
            },
            { text: new Date(order.createdAt).toLocaleString(), className: "text-center" }, // Format the createdAt timestamp
            {
                text: `$${order.orderItems.reduce((sum, item) => sum + (item.menuItem.price * item.quantityOrdered * 1.19) , 0).toFixed(2)}`,
                className: "text-center",
            },
            {
                text: order.orderItems.length > 0 ? "Served" : "Preparing",
                className: `text-center ${order.orderItems.length > 0 ? "text-success" : "text-danger"}`,
            },
            { text: order.seatNumber, className: "text-center" }, // Display seat number in the last column
        ].forEach(({ text, className }) => {
            const cell = tbodyRow.insertCell();
            cell.className = className;
            cell.innerText = text;
        });

        const moreButton = document.createElement("button");	
        moreButton.setAttribute("data-bs-toggle", "modal");
		moreButton.setAttribute("data-bs-target", "#modalSheet");
		moreButton.className = "btn btn-sm btn-secondary text-white fw-bold";
		moreButton.innerText = "More";
		moreButton.setAttribute("value", order.id);
		
		moreButton.addEventListener("click", (event) => {
			event.preventDefault();

			const btnDelete = document.getElementById("btndelete");
			btnDelete.setAttribute("value", order.id);
			btnDelete.onclick = () => {
			const dishId = moreButton.getAttribute("value");
			deleteDish(dishId);	
			};

            const btnReciept = document.getElementById("btnreciept");
            btnReciept.setAttribute("value", order.id); 
            btnReciept.onclick = () => { 
                window.location.href = `orderreciept.html?orderId=${order.id}`;
            };

		
	});

		const tbCellMoreBtn = tbodyRow.insertCell(0);
		tbCellMoreBtn.className = "text-center";
		tbCellMoreBtn.append(moreButton);
		tbodyRow.append(tbCellMoreBtn);

		
    });
}


function deleteDish(dishId) {
    fetch(`http://localhost:8080/order/delete/${dishId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert("Dish deleted successfully!");
			closeModal();
			fetchOrders();
	
        } else {
            alert("Dish is being used in orders, unable to delete dish.");
        }
    })
    .catch(error => {
        console.error("Error deleting dish:", error);
        alert("Error occurred while trying to delete.");
    });
}
	function closeModal() {
		const modal = bootstrap.Modal.getInstance(document.getElementById("modalSheet"));
		if (modal) {
		  modal.hide();
		  
		}
	}


fetchOrders();

// Fetch all Sales
fetch("http://localhost:8080/order/all")
    .then(response => response.json()) 
    .then(orders => {
        const totalPrice = orders.reduce((total, order) => {
            return total + order.orderItems.reduce((sum, item) => {
                return sum + (item.menuItem.price * item.quantityOrdered);
            }, 0);
        }, 0);

        const totalPriceCharge = totalPrice * 1.19;
        // Fix here:
        document.getElementById("total-sales").textContent = `$${totalPriceCharge.toFixed(2)}`;
    })
    .catch(error => console.error("Error fetching orders:", error));

//Fetch all Orders    
    fetch("http://localhost:8080/order/all")
    .then(response => response.json()) 
    .then(orders => {
        const totalQuantity = orders.reduce((total, order) => {
            return total + order.orderItems.reduce((sum, item) => {
                return sum + item.quantityOrdered; 
            }, 0);
        }, 0);

        document.getElementById("total-quantity").textContent = totalQuantity;
    })
    .catch(error => console.error("Error fetching orders:", error));

//Fetch Avg Value
    fetch("http://localhost:8080/order/all")
    .then(response => response.json()) 
    .then(orders => {
        const totalPrice = orders.reduce((total, order) => {
            return total + order.orderItems.reduce((sum, item) => {
                return sum + (item.menuItem.price * item.quantityOrdered);
            }, 0);
        }, 0);

        const numberOfOrders = orders.length; 
        const averageOrderValue = numberOfOrders > 0 ? (totalPrice / numberOfOrders) : 0; 

        document.getElementById("average-order-value").textContent = `$${averageOrderValue.toFixed(2)}`;
    })
    .catch(error => console.error("Error fetching orders:", error));


