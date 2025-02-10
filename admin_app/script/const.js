// Navigation menu titles
//const _DASHBOARD_TITLE = "dashboard";
const _ORDERS_TITLE = "Order";
const _DISHES_TITLE = "Dishes";
const _USERS_TITLE = "Users";
const _LOGIN_TITLE = "Login";
const _LOGOUT_TITLE = "Logout";

// correspononding site pages' links
//const _DASHBOARD_URL = "#"; 
const _ORDERS_URL = "orders.html"; 
const _DISHES_URL = "dishes.html"; 
const _USERS_URL = "#";
const _HOME_URL = "dashboard.html"; 
const _LOGIN_URL = "login.html"; 
const _LOGOUT_URL = "login.html";

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
		title: 'Users', 
		url: '#',
		icon: 'fa fa-users fa-sm',
		submenu: [
			{title: 'Voucher', url: '#'},
		],
	},
    { 
		title: 'Login', 
		url: '#',
		icon: 'fa fa-right-to-bracket',
		submenu: [],
	},
    { 
		title: 'Logout', 
		url: '#',
		icon: 'fa fa-right-from-bracket',
		submenu: [],
	},

]

const _USERTOKEN = "usertoken";