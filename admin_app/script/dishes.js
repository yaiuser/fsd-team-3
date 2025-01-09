// Mock Dish Data
const dishes = [
	{
		id: 1,
		name: "Beef Burger",
		category: "Mains",
		price: 10,
		quantity: 20,
		status: "available",
		description: "Classic Smash Burger.",
		img: "../../img/Mains/Cheeseburger.jpg",
	},
	{
		id: 2,
		name: "Chicken Chop",
		category: "Mains",
		price: 8,
		quantity: 20,
		status: "available",
		description: "Classic Chicken Delight.",
		img: "../../img/Mains/Chicken%20Chop.jpg",
	},
	{
		id: 3,
		name: "Fish and Chips",
		category: "Mains",
		price: 15,
		quantity: 10,
		status: "not availabe",
		description: "For the Ocean Fanatics.",
		img: "../../img/Mains/Fish-and-chips.jpg",
	},
];

const dishContainer = document.querySelector("#dish-container");

// function to append each dish cards
function appendDishes(dishes) {
	const tbl = document.createElement("table"); // set up the table
	tbl.className = "table bg-light border-1 border";
	dishContainer.append(tbl);

	const thead = tbl.createTHead();
	const theadRow = thead.insertRow(0);

	const trHeadings = [
		"ID No.",
		"Dish Name",
		"Category",
		"Price",
		"Quantity",
		"Status",
		"Action",
		"Image",
	];
	trHeadings.forEach((heading) => {
		const thCell = theadRow.insertCell(0);
		thCell.setAttribute("scope", "col");
		thCell.className = "fw-bolder text-center text-nowrap px-1 border-bottom";
		thCell.innerText = heading;
		thead.append(thCell);
	});

	const tbody = tbl.createTBody();

	dishes.forEach((dish) => {
		const tbodyRow = tbody.insertRow(0);

		const tbCellId = tbodyRow.insertCell(0);
		tbCellId.className = "text-center";
		tbCellId.innerText = dish.id;
		tbodyRow.append(tbCellId);

		const tbCellName = tbodyRow.insertCell(0);
		tbCellName.className = "text-center";
		tbCellName.innerText = dish.name;
		tbodyRow.append(tbCellName);

		const tbCellCategory = tbodyRow.insertCell(0);
		tbCellCategory.className = "text-center";
		tbCellCategory.innerText = dish.category;
		tbodyRow.append(tbCellCategory);

		const tbCellPrice = tbodyRow.insertCell(0);
		tbCellPrice.className = "text-center";
		tbCellPrice.innerText = dish.price;
		tbodyRow.append(tbCellPrice);

		const tbCellQty = tbodyRow.insertCell(0);
		tbCellQty.className = "text-center";
		tbCellQty.innerText = dish.quantity;
		tbodyRow.append(tbCellQty);

		const tbCellStatus = tbodyRow.insertCell(0);
		tbCellStatus.className = "text-center";
		tbCellStatus.innerText = dish.status;
		tbodyRow.append(tbCellStatus);

		const btnAction = document.createElement("button");
		btnAction.setAttribute("data-bs-toggle", "modal");
		btnAction.setAttribute("data-bs-target", "#modalSheet");
		btnAction.className = "btn btn-sm btn-secondary text-white fw-bold";
		btnAction.innerText = "More";

		btnAction.addEventListener("click", (event) => {
			event.preventDefault();
			// pass dish data to the modal itself (name, image, description)
			const modalSheet = document.getElementById("modalSheet");

			const dishName = modalSheet.querySelector(".modal-title"); // display dish.name on modal
			dishName.textContent = dish.name;

			const dishImage = modalSheet.querySelector("#modalDishImage");
			dishImage.setAttribute("src", dish.img);
			dishImage.setAttribute("alt", dish.name);

			const dishDesc = modalSheet.querySelector(".modal-body");
			dishDesc.textContent = dish.description;
		});

		const tbCellMoreBtn = tbodyRow.insertCell(0);
		tbCellMoreBtn.className = "text-center";
		tbCellMoreBtn.append(btnAction);
		tbodyRow.append(tbCellMoreBtn);

		const imgDish = document.createElement("img");
		imgDish.className = "w-100 h-auto p-0 m-0 border-0 rounded-2";
		imgDish.src = dish.img;

		const tbCellImg = tbodyRow.insertCell(0);
		tbCellImg.append(imgDish);
		tbodyRow.append(tbCellImg);
	});
}

appendDishes(dishes.reverse()); // reverse the array when sent over as argument
