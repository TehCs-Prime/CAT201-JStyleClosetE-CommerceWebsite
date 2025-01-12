package com.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Product {
    private String id;
    private String name;
    private String category;
    private String price;
    private int stock;
    private String status;

    // Constructor
    @JsonCreator
    public Product(@JsonProperty("id") String id,
                   @JsonProperty("name") String name,
                   @JsonProperty("category") String category,
                   @JsonProperty("price") String price,
                   @JsonProperty("stock") int stock,
                   @JsonProperty("status") String status) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.status = status;
    }

    // Getters and Setters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getPrice() { return price; }
    public int getStock() { return stock; }
    public String getStatus() { return status; }

    public void setStock(int stock) { this.stock = stock; }
    public void setStatus(String status) { this.status = status; }

    public void setId(String newProductId) {
        this.id = newProductId;
    }

    public void setPrice(String s) {
        this.price = s;
    }

    public void setCategory(String s) {
        this.category = s;
    }

    public void setName(String s) {
        this.name = s;
    }
}

