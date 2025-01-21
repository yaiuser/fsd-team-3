/* Sidebar dynamic navigation */
class SidebarController {
	constructor(elementId, sidebarItems) {
		this.sidebarMenu = document.getElementById(elementId);
		this.sidebarItems = sidebarItems;
	}

	// Function to display sidebar navigation menu dynamically
	displaySidebarNav() {

		if (!this.sidebarMenu){
			console.error(`Sidebar element with ID "${this.sidebarMenu}" not found.`);
			return;
		}
		
		this.sidebarMenu.className = "list-group text-small shadow";

		this.sidebarItems.forEach((item) => {
			this.displaySidebarItem(item);
		});


	}

	// Function to display sidebar navigation item dynamically
	displaySidebarItem(item) {
		const sidebarLink = document.createElement("a");
		sidebarLink.className = "list-group-item list-group-item-action";
		sidebarLink.href = item.url;
		sidebarLink.textContent = item.title;
		this.sidebarMenu.appendChild(sidebarLink);
	}
}

const SIDEBAR_ITEMS = [
	{ 
		title: 'Dashboard', 
		url: '#',
		icon: 'fa fa-sliders',
		submenu: [],
	},
	{ 
		title: 'Orders', 
		url: '#',
		icon: 'fa fa-bell',
		submenu: [
			{title: 'Orders List', url: '#'},
		],
	},
	{ 
		title: 'Dishes', 
		url: '#',
		icon: 'fa fa-cutlery',
		submenu: [
			{title: 'Dishes List', url: 'dishes.html'},
			{title: 'Add Dish', url: 'add_dish.html'},
		],
	},
	{ 
		title: 'Members', 
		url: '#',
		icon: 'fa fa-users',
		submenu: [
			{title: 'Voucher', url: '#'},
		],
	},

]

document.addEventListener("DOMContentLoaded", () => {
    const sidebarController = new SidebarController ("sidebarNav", SIDEBAR_ITEMS);
    sidebarController.displaySidebarNav();
});
