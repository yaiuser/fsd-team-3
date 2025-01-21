/* Sidebar dynamic navigation */
class SidebarController {
	constructor(elementId, sidebarItems) {
		this.sidebarMenu = document.getElementById(elementId);
		this.sidebarItems = sidebarItems;
	}

	// Function to display sidebar navigation menu dynamically
	renderSidebar() {

		if (!this.sidebarMenu){
			console.error(`Sidebar element with ID "${this.sidebarMenu}" not found.`);
			return;
		}

		this.sidebarMenu.textContent = '';
		this.sidebarMenu.className= 'p-3 w-100';

		const sidebarList = document.createElement('ul');
		sidebarList.className = 'list-unstyled';

		this.sidebarItems.forEach((item, index) => {
			this.renderSidebarItem(item, sidebarList, index);
		});

		this.sidebarMenu.appendChild(sidebarList);

	}

	// Function to display sidebar navigation item dynamically
	renderSidebarItem(item, parentElement, index) {
		const listItem = document.createElement('li');
		listItem.className = 'sidebar-btn rounded-4 mb-2';

		if (item.icon) {
			const icon = document.createElement('i');
			icon.className = `${item.icon} ms-2`;
			listItem.appendChild(icon);
			
		}


		const button = document.createElement('button');
		button.className = 'btn btn-toggle d-inline-flex align-items-center collapsed';
		button.setAttribute('data-bs-toggle', 'collapse');
		button.setAttribute('data-bs-target', `#${item.title.toLowerCase().replace(/\s/g, '-')}-collapse-${index}`);
		button.textContent = item.title;

		listItem.appendChild(button);
		parentElement.appendChild(listItem);

		if (item.submenu && item.submenu.length > 0) {
			const submenuDiv = document.createElement('div');
			submenuDiv.className = 'collapse';
			submenuDiv.id = `#${item.title.toLowerCase().replace(/\s/g, '-')}-collapse-${index}`;

			const submenuList = document.createElement('ul');
			submenuList.className = 'btn-toggle-nav list-unstyled fw-normal pb-1 small ms-5';

			item.submenu.forEach((submenuItem) => {
				const submenuListItem = document.createElement('li');
				const submenuLink = document.createElement('a');
				submenuLink.className = 'link-body-emphasis d-inline-flex text-decoration-none';
				submenuLink.href = submenuItem.url;
				submenuLink.textContent = submenuItem.title;

				submenuListItem.appendChild(submenuLink);
				submenuList.appendChild(submenuListItem);
			});

			submenuDiv.appendChild(submenuList);
			listItem.appendChild(submenuDiv);
		}


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
    sidebarController.renderSidebar();
});
