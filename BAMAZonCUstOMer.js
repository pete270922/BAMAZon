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
      case "Find product":
        product_idSearch();
        break;

      case "Find department_name":
        department_nameSearch();
        break;

      case "Find price within a specific range":
        rangeSearch();
        break;
      
      case "What is the product would you like to purchase?":
        purchaseProduct();

      }
    });
}


function product_idSearch() {
  inquirer
    .prompt({
      name: "product_id",
      type: "input",
      message: "What product would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT item_id, product_id, department_name, Price FROM products WHERE ?";
      connection.query(query, { product_id: answer.product_id }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Item: " + res[I].item_id + " || Product: " + res[I].product_id + "Department_name: " + res[I].department_name+ " || Price: " + res[I].price);
        }
        product_idSearch();
      });
    });
}

function department_nameSearch() {
  var query = "SELECT item_id, product_id, department_name, Price FROM products GROUP BY department_name HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("Item: " + res[I].item_id+ " || Product: " + res[I].product_id + "Department_name: " + res[I].department_name+ " || Price: " + res[I].price);
    }
    department_nameSearch();
  });
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting Price: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending Price: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
       }
    ])
    .then(function(answer) {
      var query = "SELECT item_id, product_id, department_name, Price FROM products WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Item: " + res[i].item_id+ " || Product: " + res[i].product_id + "Department_name: " + res[i].department_name+ " || Price: " + res[i].price);
        }
        runSearch();
      });
    });
}
function purchase(){
  inquirer
    .prompt([{
     name: "item_id",
     type: "input",
     message: "What is the product that you would like to purchase?"
    },
    {
    name: "Purchase_Quantity",
    type: "input",
    quantity: "Select quantity of products to purchase."
    }])
   .then(function(answer){
      var query = "SELECT item_id, product_id, Price FROM products"
      connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Item: " + res[i].item_id+ " || Product: " + res[i].product_id + " || Price: " + res[i].price);
        }
        if (Purchase_Quantity < Stock_Quantity){
            res[i].Stock_Quantity -= Purchase_Quantity;
            var sale_revenue = res[i].price*Purchase_Quantity;
          }
          else()=>{
              "There is not enough in stock. You need to order more."
          };
   })
})
}
