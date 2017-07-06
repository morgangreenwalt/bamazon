//Required variables
var inquirer = require("inquirer");
// var require =require("require");
var mysql = require("mysql");


//Connect database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
});

// Initial prompt to view menu
function menu(){

	inquirer.prompt([
		{
			name: "viewMenu",
			type: "list",
			message: "Hi Manager. What would you like to do today?",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
		}
		
	]).then(function(answers){
		if (answers.viewMenu === "View Products for Sale"){
			menu_viewProd();
		}

		else if (answers.viewMenu === "View Low Inventory"){
			menu_viewLowInv();
		}

		else if (answers.viewMenu === "Add to Inventory"){
			menu_addInv();
		}

		else if (answers.viewMenu === "Add New Product"){
			menu_addProd();
		}
	});
}

function menu_viewProd(){
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;

	inquirer.prompt([
		{
			name: "viewProducts",
			type: "list",
			message: "Which Product Id would you like to purchase?",
			choices: function(){
				var choices =[];
			    for (var i = 0; i < res.length; i++) {
		        	choices.push(res[i].item_id+": " +res[i].product_name+ " $" +res[i].price)
		    	}
				return choices
			}
		}

	]).then(function(answers){
	});
}

function menu_viewLowInv(){
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;

	inquirer.prompt([
		{
			name: "viewLowInventory",
			type: "input",
			message: "How many units would you like to buy?"
		}
		
	]).then(function(answers){
	});
}

function menu_addInv(){
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;

	inquirer.prompt([
		{
			name: "addInventory",
			type: "input",
			message: "How many units would you like to buy?"
		}
		
	]).then(function(answers){
	});
}

function menu_addProd(){
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;

	inquirer.prompt([
		{
			name: "addProduct",
			type: "input",
			message: "How many units would you like to buy?"
		}
		
	]).then(function(answers){
	});
}

		// {
		// 	name: "viewLowInventory",
		// 	type: "input",
		// 	message: "How many units would you like to buy?",
		// 	when: function(answers){
		// 		return answers.productId
		// 	}
		// },
		// {
		// 	name: "addInventory",
		// 	type: "input",
		// 	message: "How many units would you like to buy?",
		// 	when: function(answers){
		// 		return answers.productId
		// 	}
		// },
		// {
		// 	name: "addProduct",
		// 	type: "input",
		// 	message: "How many units would you like to buy?",
		// 	when: function(answers){
		// 		return answers.productId
		// 	}
		// }