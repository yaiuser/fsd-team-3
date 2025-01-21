/* Sidebar dynamic navigation */
class SidebarController {
	constructor(elementId, sidebarItems) {
		this.sidebarMenu = document.getElementById(elementId);
		this.sidebarItems = sidebarItems;
	}

	// Function to display sidebar navigation menu dynamically
	renderSidebar() {

		if (!this.sidebarMenu){																// Check if sidebar container exists
			console.error(`Sidebar element with ID "${this.sidebarMenu}" not found.`);
			return;
		}

		this.sidebarMenu.textContent = '';
		this.sidebarMenu.className= 'p-3 w-100';

		const sidebarList = document.createElement('ul');
		sidebarList.className = 'list-unstyled ms-2';

		this.sidebarItems.forEach((item, index) => {
			this.renderSidebarItem(item, sidebarList, index);

			if (item.title === 'Users') {
				this.addDivider();
				
			}
		});

		this.sidebarMenu.appendChild(sidebarList);

	}

	// Function to display sidebar navigation item + submenu dynamically
	renderSidebarItem(item, parentElement, index) {
		const listItem = document.createElement('li');
		listItem.className = 'sidebar-btn rounded-4 mb-2';

		if (item.icon) {
			const icon = document.createElement('i');
			icon.className = `${item.icon}`;
			listItem.appendChild(icon);
			
		}


		const button = document.createElement('button');
		button.className = 'btn btn-toggle d-inline-flex align-items-center collapsed ms-2';
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

	addDivider(){
		const sidebarDivider = document.createElement("li");
		sidebarDivider.className = "sidebar-divider";
		this.sidebarMenu.appendChild(sidebarDivider);
	}
}




