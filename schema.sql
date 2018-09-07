DROP DATABASE IF EXISTS bamazon1;
CREATE DATABASE bamazon1;

USE bamazon1;

CREATE TABLE products(
Item_id INT AUTOINCREMENT NOT NULL,
product_id VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
Price DECIMAL(10,2) NULL,
Stock_Quantity INTEGER NULL,
PRIMARY KEY (Item_id)
);

Select * FROM products;