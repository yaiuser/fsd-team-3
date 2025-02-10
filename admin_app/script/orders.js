// Select the order container
const dishContainer = document.querySelector("#order-container");

async function fetchOrders() {
    try {
        const response = await fetch('http://localhost:8080/order/all'); // fetch data
        console.log('Fetch response:', response); // log the response
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const orders = await response.json(); // convert JSON response to a JavaScript Object
        console.log('Orders data:', orders); // log the fetched orders

        // Check if orders are present
        if (orders.length > 0) {
            appendOrders(orders.reverse()); // pass the data to appendOrders
        } else {
            console.log("No orders found!");
        }
        
    } catch (error) {
        console.log("Failed to fetch or render orders:", error);
    }
}

// Function to append each order into a table
function appendOrders(orders) {
    const tbl = document.createElement("table"); // create the table
    tbl.className = "table bg-light border-1 border";
    dishContainer.append(tbl);

    const thead = tbl.createTHead(); // create the table header
    const theadRow = thead.insertRow(0); // insert row into the header

    const trHeadings = [
        "Order No.",
        "Items Ordered",
        "Order Time",
        "Amount",
        "Action",
        "More",
    ];
    trHeadings.forEach((heading) => { // add each column header to the header row
        const thCell = theadRow.insertCell();
        thCell.setAttribute("scope", "col");
        thCell.className = "fw-bolder text-center text-nowrap px-1 border-bottom";
        thCell.innerText = heading;
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
                text: `$${order.orderItems.reduce((sum, item) => sum + item.menuItem.price * item.quantityOrdered, 0).toFixed(2)}`,
                className: "text-center",
            },
            {
                text: order.orderItems.length > 0 ? "Served" : "Preparing",
                className: `text-center ${order.orderItems.length > 0 ? "text-success" : "text-danger"}`,
            },
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
   
	const tbCellMoreBtn = tbodyRow.insertCell(0);
	tbCellMoreBtn.className = "text-center";
	tbCellMoreBtn.append(moreButton);
	tbodyRow.append(tbCellMoreBtn);

		
    });
}

fetchOrders();
