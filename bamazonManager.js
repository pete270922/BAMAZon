var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "User",

  // Your password
  password: "1234",
  database: "bamazon1"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What product would like to purchase?",
      choices: [
        "Find product by product_id",
        "Find department_name",
        "Find price within a specific range",
        "Search for a product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        view_products();
        break;

      case "View Low Inventoryt":
        view_inventory();
        break;

      case "Add to Inventory":
        purchase_inventory();
        break;
      
      case "Add New Product":
        add_new_product();

      }
    });
}


function view_products() {
  inquirer
    .prompt({
      name: "product_id",
      type: "input",
      message: "View Products?"
    })
    .then(function(answer) {
      var query = "SELECT item_id, product_id, department_name, FROM products WHERE ?";
      connection.query(query, { product_id: answer.product_id }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Item: " + res[I].item_id + " || Product: " + res[I].product_id + "Department_name: " + res[I].department_name);
        }
        view_products();
      });
    });
}

function view_inventory() {
  var query = "SELECT item_id, product_id, department_name, Price, Stock_Quantity FROM products GROUP BY department_name HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("Item: " + res[I].item_id+ " || Product: " + res[I].product_id + "Department_name: " + res[I].department_name+ " || Price: " + res[I].price + " || Stock Quantity: " + res[I].Stock_Quantity);
    }
    view_inventory();
  });
}

function purchase_inventory() {
  inquirer
    .prompt([
      {
        name: "product_id",
        type: "input",
        message: "Enter product_id ",
        validate: function(value) {
          if (product_id(value) === false) {
            return true;
          }
          return product; 
        }
      },
      {
        name: "Stock_Quantity",
        type: "input",
        message: "Enter Stock Quantity added",
      }
    ])
    .then(function(answer) {
      var query = "Update Stock_Quantity FROM products WHERE product_id";
      connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Item: " + res[i].item_id+ " || Product: " + res[i].product_id + "Department_name: " + res[i].department_name+ " || Stock Quantity: " + res[i].Stock_Quantity);
        }
        purchase_inventory();
      });

    });

function add_new_product(){
    add_new_product, function(event){
        event.preventDefault();
        var newProduct = {
            item_id: $("item_id").val().trim(),
            product_id: $("product_id").val().trim(),
            department_name: $("department_name").val().trim(),
            price: $("price").val().trim(),
            Stock_Quantity: $("Stock_Quantity").val().trim(),
        };
        $.post("/products", newProduct)
        .then(function(data) {
          console.log("product.csv", data);
          alert("Adding product...");
        });
    }
}
}

