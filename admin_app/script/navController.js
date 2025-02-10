/* Class to dynamically create and display a dropdown navigation menu */
class NavController {
	constructor(element) {											// Constructor to initialize the dropdown menu and its items
		this.siteMenu = document.getElementById(element);			// Get the parent element where the dropdown menu will be appended
		this.dropdownMenu = document.createElement("ul");			// Create the container for the dropdown menu
		this.dropdownItems = [										// Define the dropdown menu items (title and URL for each item)
			{ title: _ORDERS_TITLE, url: _ORDERS_URL },
			{ title: _DISHES_TITLE, url: _DISHES_URL },
			{ title: _LOGIN_TITLE, url: _LOGIN_URL },
			{ title: _LOGOUT_TITLE, url: _LOGOUT_URL },
		];
	}

	// Function to display dropdown navigation menu dynamically
	displayNav() {
		this.dropdownMenu.className = "dropdown-menu text-small shadow";
		this.siteMenu.appendChild(this.dropdownMenu);							// Append the dropdown menu to the parent element

		this.dropdownItems.forEach((item) => {									// Loop through the array of dropdown items
			this.displayNavItem(item);

			if (item.title === _DISHES_TITLE) {									// If the current item is "Users", add a divider after it
				this.addDivider();
				
			}
		});
	}

	// Function to display dropdown navigation item dynamically
	displayNavItem(item) {
		const dropdownItem = document.createElement("li");								// Create a <li> element for the dropdown item
		dropdownItem.className = "dropdown-item";
		this.dropdownMenu.appendChild(dropdownItem);									// Append the <li> element to the dropdown menu

		const dropdownLink = document.createElement("a");								// Create an <a> element (link) for the dropdown item
		dropdownLink.className = "dropdown-link link-dark link-underline-opacity-0";
		dropdownLink.style.cursor = "pointer";
		dropdownLink.textContent = item.title;											// Set the text of the link to the item's title
		dropdownLink.href = item.url;													// Set the link's href attribute to the item's URL
		dropdownItem.appendChild(dropdownLink);	
		
		// if(item.title === _LOGOUT_TITLE){                                                                       // If title is 'logout', 
        //     navLink.href = "#";                                                                                 // Apply a placeholder anchor (#)
        //     navLink.addEventListener("click", (event) => {                                                      // add eventListener                                                                    
        //         logout();                                                                                       // call function logout()                                                                        
        //     })  
    	// }// Append the <a> link to the <li> element
	}

	// Function to add a divider line to the dropdown menu
	addDivider(){	
		const divider = document.createElement("li");			// Create an <li> element to serve as a divider
		divider.className = "dropdown-divider";
		this.dropdownMenu.appendChild(divider);					// Append the divider to the dropdown menu
	}
}

