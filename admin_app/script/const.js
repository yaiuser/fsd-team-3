// Navigation menu titles
const _DASHBOARD_TITLE = "Dashboard";
const _ORDERS_TITLE = "Order";
const _DISHES_TITLE = "Dishes";
//const _LOGIN_TITLE = "Login";
const _LOGOUT_TITLE = "Logout";

// correspononding site pages' links
const _DASHBOARD_URL = "dashboard.html"; 
const _ORDERS_URL = "orders.html"; 
const _DISHES_URL = "dishes.html"; 
//const _LOGIN_URL = "#"; 
const _LOGOUT_URL = "login.html";
const _SERVER_URL = "http://localhost:8080";

const SIDEBAR_ITEMS = [
	{ 
		title: 'Dashboard', 
		url: 'dashboard.html',
		icon: 'fa fa-sliders',
		submenu: [],
	},
	{ 
		title: 'Orders', 
		url: '#',
		icon: 'fa fa-bell',
		submenu: [
			{title: 'Orders List', url: 'orders.html'},
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
		title: 'Logout', 
		url: '#',
		icon: 'fa fa-right-from-bracket',
		submenu: [],
	},

]

const _USERTOKEN = "usertoken";