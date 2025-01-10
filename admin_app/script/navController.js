/* To create dynamic navigation */
class NavController{

    constructor(element){
        this.siteMenu = document.getElementById(element);
        this.dropdownMenu = document.createElement("ul");
        this.dropdownItems = [
            {"title":_ORDERS_TITLE, "url": _ORDERS_URL}, 
            {"title":_DISHES_TITLE, "url": _DISHES_URL}, 
            {"title":_USERS_TITLE, "url": _USERS_URL},
            {"title":_LOGIN_TITLE, "url": _LOGIN_URL}, 
            {"title":_LOGOUT_TITLE, "url": _LOGOUT_URL},
        ];
    }

    // Function to display dropdown navigation menu dynamically
    displayNav(){

    }
}