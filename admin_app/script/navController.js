/* To create dynamic navigation */
class NavController {
	constructor(element) {
		this.siteMenu = document.getElementById(element);
		this.dropdownMenu = document.createElement("ul");
		this.dropdownItems = [
			{ title: _ORDERS_TITLE, url: _ORDERS_URL },
			{ title: _DISHES_TITLE, url: _DISHES_URL },
			{ title: _USERS_TITLE, url: _USERS_URL },
			{ title: _LOGIN_TITLE, url: _LOGIN_URL },
			{ title: _LOGOUT_TITLE, url: _LOGOUT_URL },
		];
	}

	// Function to display dropdown navigation menu dynamically
	displayNav() {
		this.dropdownMenu.className = "dropdown-menu text-small shadow";
		this.siteMenu.appendChild(this.dropdownMenu);

		this.dropdownItems.forEach((item) => {
			this.displayNavItem(item);

			if (item.title === _USERS_TITLE) {
				this.addDivider();
				
			}
		});
	}

	// Function to display dropdown navigation item dynamically
	displayNavItem(item) {
		const dropdownItem = document.createElement("li");
		this.dropdownMenu.appendChild(dropdownItem);
		dropdownItem.className = "dropdown-item";

		const dropdownLink = document.createElement("a");
		dropdownItem.appendChild(dropdownLink);
		dropdownLink.className = "dropdown-link link-dark link-underline-opacity-0";
		dropdownLink.style.cursor = "pointer";
		dropdownLink.textContent = item.title;
		dropdownLink.href = item.url;
	}

	addDivider(){
		const divider = document.createElement("li");
		divider.className = "dropdown-divider";
		this.dropdownMenu.appendChild(divider);
	}
}
