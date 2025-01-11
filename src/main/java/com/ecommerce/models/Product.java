package com.ecommerce.models;

public class Product {
    private String id;
    private String name;
    private String category;
    private double price; // Change from String to double
    private int stock;
    private String status;

    // Constructors
    public Product(String id, String name, String category, double price, int stock, String status) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.status = status;
    }

    public Product() {

    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {  // Change the return type to double
        return price;
    }

    public void setPrice(double price) {  // Change the parameter to double
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
