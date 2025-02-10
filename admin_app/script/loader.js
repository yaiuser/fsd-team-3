// Initializing the dropdown navigation 
document.addEventListener("DOMContentLoaded", (event) => {  
    const navController = new NavController("dropdownNav");         // Create a new instance of the NavController class
   navController.displayNav();
});

// Initializing the sidebar navigation 
document.addEventListener("DOMContentLoaded", () => {
    const sidebarController = new SidebarController ("sidebarNav", SIDEBAR_ITEMS);     // Create a new instance of the SideBarController class
    sidebarController.renderSidebar();
});