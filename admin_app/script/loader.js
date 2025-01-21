document.addEventListener("DOMContentLoaded", (event) => {
    const navController = new NavController("dropdownNav");
   navController.displayNav();
});

document.addEventListener("DOMContentLoaded", () => {
    const sidebarController = new SidebarController ("sidebarNav", SIDEBAR_ITEMS);
    sidebarController.renderSidebar();
});