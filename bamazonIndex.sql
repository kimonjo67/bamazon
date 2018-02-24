DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100)NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ( 111, "Lebrons 2018", "NBA Shoes", 199.70, 12);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ( 222, "Non-stick pan", "Kitchen", 21.99, 50);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ( 333, "Lavender scent Candle", "Livingroom", 7.99, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ( 444, "BMX", "Sports", 170, 15);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ( 555, "Beats by Dre", "Entertainment", 320, 2);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ( 666, "Dell Inspiron", "Electronics", 769.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ( 777, "Eloquent JS", "Book", 319, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ( 888, "Roku", "Electronics", 187.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ( 999, "Silver Lamp", "Bedroom", 17, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ( 1010, "Black Panther", "Movies/Music", 9.99, 15);




