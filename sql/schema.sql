CREATE DATABASE shopping_website;
USE shopping_website;

CREATE TABLE items(
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    main_image VARCHAR(100) NOT NULL,
    sub_image_1 VARCHAR(100) NOT NULL,
    sub_image_2 VARCHAR(100) NOT NULL,
    sub_image_3 VARCHAR(100) NOT NULL,
    item_description VARCHAR(255) NOT NULL,
    details VARCHAR(3000) NOT NULL,
    body VARCHAR(4000) NOT NULL,
    price DECIMAL(6, 2) NOT NULL,
    quantity INT NOT NULL,
    tags VARCHAR(500) NOT NULL,
    item_type VARCHAR(30) NOT NULL,
    mode VARCHAR(10) NOT NULL,
    visible VARCHAR(10) NOT NULL,
    discount DECIMAL(6, 2) NOT NULL,
    coin INT NOT NULL,
    rating INT NOT NULL,
    profit DECIMAL(5, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE records(
    id INT AUTO_INCREMENT PRIMARY KEY,
    record_name VARCHAR(30) NOT NULL,
    record_money DECIMAL(6, 2) NOT NULL,
    total DECIMAL(6, 2) NOT NULL,
    record_description VARCHAR(80) NOT NULL,
    record_type VARCHAR(20) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE coin_items(
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    main_image VARCHAR(100) NOT NULL,
    sub_image_1 VARCHAR(100) NOT NULL,
    sub_image_2 VARCHAR(100) NOT NULL,
    sub_image_3 VARCHAR(100) NOT NULL,
    item_description VARCHAR(255) NOT NULL,
    details VARCHAR(3000) NOT NULL,
    body VARCHAR(4000) NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL,
    mode VARCHAR(10) NOT NULL,
    visible VARCHAR(10) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(80) NOT NULL,
    phoneNumber VARCHAR(12) NOT NULL,
    user_password VARCHAR(800) NOT NULL,
    coin INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);