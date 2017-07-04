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

//Display items
function showItemList(){
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;

	inquirer.prompt([
		{
			name: "productId",
			type: "list",
			message: "Which Product Id would you like to purchase?",
			choices: function(){
				var choices =[];
			    for (var i = 0; i < res.length; i++) {
		        	choices.push(res[i].item_id+": " +res[i].product_name+ " $" +res[i].price)
		    	}
				return choices
			}
		},

		{
			name: "productQuant",
			type: "input",
			message: "How many units would you like to buy?",
			when: function(answers){
				return answers.productId
			}
		}
	]).then(function(answers){
		
		var splitSelectedItem = answers.productId.split(":");
		var selectedItem = splitSelectedItem[0];
		var productQuantity = parseInt(answers.productQuant);
		var total;
		var stockQuantity;
		var newProdQuant;
		var productPrice;

		connection.query("SELECT * FROM products WHERE ?", [{item_id: selectedItem}],function(error, res){
        	if (error) throw error;
			stockQuantity = parseInt(res[0].stock_quantity);
			newProdQuant = stockQuantity - productQuantity;
			productPrice = parseInt(res[0].price);
			total = productQuantity * productPrice;
			
			console.log(stockQuantity);
			console.log(newProdQuant);
			console.log(productPrice);
			console.log(total);

			if (stockQuantity >= productQuantity){
				console.log("Successfully added to your cart!");
				connection.query(
		            "UPDATE products SET ? WHERE ?", [{stock_quantity: newProdQuant}, {item_id: selectedItem}],function(error) {
		              if (error) throw error;
				});		
			}

			else {
				console.log("There are not enough products in storage. Try back later!")
			}
		});	
		// checkQuantity();	
	});
	});
}
showItemList();

// function checkQuantity(){
// 	if (stockQuantity >= productQuantity){
// 		console.log("successfully added to cart");
			
// 		connection.query(
//             "UPDATE products SET ? WHERE ?", [{stock_quantity: newProdQuant}, {item_id: selectedItem}],function(error) {
//               if (error) throw error;
// 		});		
// 	}

// 	else {
// 		console.log("there are not enough products in storage. try back later")
// 	}
// }

function purchaseMore(){
	inquirer.prompt([
		{
			name: "addMoreItems",
			type: "list",
		    message: "Do you want to purchase another item?",
		    choices: ["Yes", "No"]
		}
	]).then(function(answers){
		if (answers.addMoreItems === "Yes") {
			showItemList();
		}

		else {
			console.log("You're total comes to: " + total);
		}
	});
}