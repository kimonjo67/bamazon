//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Mandela@10",
    database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

//Displays all products for sale in the store from mySQL bamazon database
var displayProducts = function () {
    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) throw err;
        console.log('~~~~~~~~~~~Products available at Bamazon~~~~~~~~~~')
        console.log('-------------------------------------------------------------------------------------------------')
        //For loop for response length and display the products table
        for (var i = 0; i < res.length; i++) {
            console.table("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " +
                "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        }
    })
};

var start = function () {
    console.log('\n  ');
    inquirer.prompt({
        name: "ShopOrExit",
        type: "rawlist",
        message: "Would you like to [SHOP] an item or [EXIT] the store?",
        choices: ["SHOP", "EXIT"]
    }).then(function (answer) {
        if (answer.ShopOrExit.toUpperCase() === "SHOP") {
            makePurchase();
        } else {
            console.log("Thank you for shopping with Bamazon.");
            connection.end();
        }
    });
};

// Prompt user to choose item_id and stock_quantity
var makePurchase = function () {
    console.log('\n  ');
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: " Enter the item_id of the product you want to buy",

    }, {
        name: "quantity",
        type: "input",
        message: " Enter the stock_quantity you want to purchase",

    }]).then(function (answer) {
        // Query the bamazon database for info about the item including the quantity currently in stock. 
        connection.query('SELECT * FROM products WHERE ?', { item_id: answer.id }, function (err, res) {
            if (err) throw err;

            if (res.length === 0) {
                console.log("*******ERROR: Please enter a valid input********");
                displayProducts();
            }

            console.log('\n  Shopping cart ' + answer.quantity + ' ' + res[0].product_name + ' at $' + res[0].price + ' each');
            if (res[0].stock_quantity >= answer.quantity) {
                //If successful purchase then prompt start again 
                var itemQuantity = res[0].stock_quantity - answer.quantity;
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: itemQuantity
                }, {
                    item_id: answer.id
                }], function (err, res) { });
                var cost = res[0].price * answer.quantity;
                console.log('\n  Your Total cost is $' + cost.toFixed(2) + '\n');
                // Order completed
                displayProducts();
                start();

            } else {
                //If not enough stock notify customer and prompt customer to keep shopping
                console.log('\n  Sorry, Insufficient products in store!\n');
                // Order not completed
                start();
            }
        })
    });
}

displayProducts();
start();