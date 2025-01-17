package com.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Product {
    private String id;
    private String name;
    private String category;
    private String price;
    private int stock;
    private String status;
    private List<String> images; // List of image URLs
    private String description;  // Add description field

    // Constructor
    @JsonCreator
    public Product(@JsonProperty("id") String id,
                   @JsonProperty("name") String name,
                   @JsonProperty("category") String category,
                   @JsonProperty("price") String price,
                   @JsonProperty("stock") int stock,
                   @JsonProperty("status") String status,
                   @JsonProperty("images") List<String> images,
                   @JsonProperty("description") String description) {  // Include description in the constructor
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.status = status;
        this.images = images;
        this.description = description;  // Set the description
    }

    // Getters and Setters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getPrice() { return price; }
    public int getStock() { return stock; }
    public String getStatus() { return status; }
    public List<String> getImages() { return images; }
    public String getDescription() { return description; }  // Getter for description

    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setCategory(String category) { this.category = category; }
    public void setPrice(String price) { this.price = price; }
    public void setStock(int stock) { this.stock = stock; }
    public void setStatus(String status) { this.status = status; }
    public void setImages(List<String> images) { this.images = images; }
    public void setDescription(String description) { this.description = description; }  // Setter for description
}
