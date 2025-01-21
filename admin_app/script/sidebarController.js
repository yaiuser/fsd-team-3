/* Sidebar dynamic navigation */
class SidebarController {
	constructor(elementId, sidebarItems) {							// Constructor to initialize the sidebar container and the list of menu items						
		this.sidebarMenu = document.getElementById(elementId);		// Get the sidebar container element by its ID
		this.sidebarItems = sidebarItems;							// Store the array of sidebar items
	}

	// Function to display sidebar navigation menu dynamically
	renderSidebar() {

		if (!this.sidebarMenu){																// Check if sidebar container exists
			console.error(`Sidebar element with ID "${this.sidebarMenu}" not found.`);
			return;
		}

		this.sidebarMenu.textContent = '';						// Clear any existing content in the sidebar container
		this.sidebarMenu.className= 'p-3 w-100';

		const sidebarList = document.createElement('ul');		// Create a <ul> element to hold the sidebar items
		sidebarList.className = 'list-unstyled ms-2';

		this.sidebarItems.forEach((item, index) => {			// Loop through each sidebar item in the array
			this.renderSidebarItem(item, sidebarList, index);

			if (item.title === 'Users') {						// If the item is "Users", add a divider below it
				this.addDivider(sidebarList);
				
			}
		});

		this.sidebarMenu.appendChild(sidebarList);				// Append the list to the sidebar container

	}

	// Function to display sidebar navigation item + submenu dynamically
	renderSidebarItem(item, parentElement, index) {
		const listItem = document.createElement('li');			// Create a <li> element for the sidebar item
		listItem.className = 'sidebar-btn rounded-4 mb-2';

		if (item.icon) {										// if the item has an icon, create an <i> element for it
			const icon = document.createElement('i');
			icon.className = `${item.icon}`;
			listItem.appendChild(icon);							// Append the icon to the list item
			
		}


		const button = document.createElement('button');																// Create a <button> element for the item's title
		button.className = 'btn btn-toggle d-inline-flex align-items-center collapsed ms-2';
		button.setAttribute('data-bs-toggle', 'collapse');
		button.setAttribute('data-bs-target', `#${item.title.toLowerCase().replace(/\s/g, '-')}-collapse-${index}`);
		button.textContent = item.title;
		listItem.appendChild(button);																					// Append the button to the list item
		parentElement.appendChild(listItem);																			// Append the list item to the parent <ul> element

		if (item.submenu && item.submenu.length > 0) {																	// Check if the item has a submenu
			const submenuDiv = document.createElement('div');															// Create a <div> for the collapsible menu
			submenuDiv.className = 'collapse';
			submenuDiv.id = `${item.title.toLowerCase().replace(/\s/g, '-')}-collapse-${index}`;
			

			const submenuList = document.createElement('ul');															// Create a <ul> for the submenu items
			submenuList.className = 'btn-toggle-nav list-unstyled fw-normal pb-1 small ms-5';
																	

			item.submenu.forEach((submenuItem) => {														// Loop through the submenu items
				const submenuListItem = document.createElement('li');									// Create a <li> for each submenu item
				const submenuLink = document.createElement('a');										// Create an <a> link for the submenu item
				submenuLink.className = 'link-body-emphasis d-inline-flex text-decoration-none';
				submenuLink.href = submenuItem.url;
				submenuLink.textContent = submenuItem.title;

				submenuListItem.appendChild(submenuLink);				// Append the link to the submenu list item
				submenuList.appendChild(submenuListItem);				// Append the submenu list item to the submenu <ul>
			});

			submenuDiv.appendChild(submenuList);	// Append the submenu list to the submenu container
			listItem.appendChild(submenuDiv);		// Append the submenu container to the main list item

			
			
		}

	}

	// Function to add a divider between sections in the sidebar
	addDivider(parentElement){
		const sidebarDivider = document.createElement("li");				// Create a <li> element to act as a divider
		sidebarDivider.className = "sidebar-divider border-top my-3";
		parentElement.appendChild(sidebarDivider);							// Append the divider to the parent <ul>
	}
}




