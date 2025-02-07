
// Select the dish container
const dishContainer = document.querySelector("#dish-container");

// Function to fetch data and append dishes
async function fetchDishes(){
	try{
		const response = await fetch('http://localhost:8080/product/all');	// fetch the JSON data
		console.log('Fetch response:', response); 							// log the response
		if(!response.ok){
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const dishes = await response.json();								// convert JSON response to a JavaScript Object
		console.log('Dishes data:', dishes);								// log the fetched dishes

		appendDishes(dishes.reverse());										// pass the data to appendDishes

	} catch (error){
		console.log("Failed to fetch or render dshes:", error);
	}
}

// function to append each dish into a table
function appendDishes(dishes) {
	const tbl = document.createElement("table"); 			// create the table
	tbl.className = "table bg-light border-1 border";
	dishContainer.append(tbl);

	const thead = tbl.createTHead();						// create the table header
	const theadRow = thead.insertRow(0);					// insert row into the header

	const trHeadings = [
		"ID No.",
		"Dish Name",
		"Category",
		"Price",
		"Quantity",
		"Status",
		"Action",
	];
	trHeadings.forEach((heading) => {				// add each column header to the header row
		const thCell = theadRow.insertCell(0);		// create a header cell
		thCell.setAttribute("scope", "col");
		thCell.className = "fw-bolder text-center text-nowrap px-1 border-bottom";
		thCell.innerText = heading;
		thead.append(thCell);
	});

	const tbody = tbl.createTBody();			// create table body

	dishes.forEach((dish) => {					// loop through the dishes array to create rows
		const tbodyRow = tbody.insertRow(0);

		// append cells with dish data
		[
			{text: dish.id, className: "text-center"},
			{text: dish.title, className: "text-center"},
			{text: dish.category.category, className: "text-center"},			
			{text: `$${dish.price.toFixed(2)}`, className: "text-center"},
			{text: dish.quantityAvailable, className: "text-center"},
			{text: dish.quantityAvailable > 0 ? "Available" : "Out of Stock", 
			className: `text-center ${dish.quantityAvailable > 0 ? "text-success" : "text-danger"}`},		// if dish quantity is > 0 means available. if quantity is < 0 means out of stock
		].forEach(({ text, className }) => {
			const cell = tbodyRow.insertCell();
			cell.className = className;
			cell.innerText = text;
		});``


		const btnAction = document.createElement("button");							// add "More" button
		btnAction.setAttribute("data-bs-toggle", "modal");
		btnAction.setAttribute("data-bs-target", "#modalSheet");
		btnAction.className = "btn btn-sm btn-secondary text-white fw-bold";
		btnAction.innerText = "More";
		btnAction.setAttribute("value", dish.id);

		btnAction.addEventListener("click", (event) => {
			event.preventDefault();
			// pass dish data to the modal itself (title, image, description)
			const modalSheet = document.getElementById("modalSheet");

			const dishName = modalSheet.querySelector(".modal-title"); 				// display dish.title on modal
			dishName.textContent = dish.title;

			const dishImage = modalSheet.querySelector("#modalDishImage");			// display dish.image on modal
			dishImage.setAttribute("src", dish.image);
			dishImage.setAttribute("alt", dish.title);

			const dishDesc = modalSheet.querySelector("#modal-body-description");	// display dish.description on modal
			dishDesc.textContent = dish.description;

			const btnDelete = document.getElementById("btndelete");
			btnDelete.setAttribute("value", dish.id);
			btnDelete.onclick = () => {
			const dishId = btnAction.getAttribute("value");
			deleteDish(dishId);

		} 
		});

		const tbCellMoreBtn = tbodyRow.insertCell(0);
		tbCellMoreBtn.className = "text-center";
		tbCellMoreBtn.append(btnAction);
		tbodyRow.append(tbCellMoreBtn);


	});
}

function deleteDish(dishId) {
    fetch(`http://localhost:8080/product/delete/${dishId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert("Dish deleted successfully!");
        } else {
            alert("Failed to delete the dish.");
        }
    })
    .catch(error => {
        console.error("Error deleting dish:", error);
        alert("Error occurred while trying to delete.");
    });
}

fetchDishes();
