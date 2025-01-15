package com.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class Order {
    private String id;
    private String customer;
    private List<String> products; // List of product IDs
    private String total;
    private String status;
    private String date;

    // Constructor
    @JsonCreator
    public Order(@JsonProperty("id") String id,
                 @JsonProperty("customer") String customer,
                 @JsonProperty("products") List<String> products,
                 @JsonProperty("total") String total,
                 @JsonProperty("status") String status,
                 @JsonProperty("date") String date) {
        this.id = id;
        this.customer = customer;
        this.products = products;
        this.total = total;
        this.status = status;
        this.date = date;
    }

    // Getters and Setters
    public String getId() { return id; }
    public String getCustomer() { return customer; }
    public List<String> getProducts() { return products; }
    public String getTotal() { return total; }
    public String getStatus() { return status; }
    public String getDate() { return date; }

    public void setId(String id) { this.id = id; }
    public void setCustomer(String customer) { this.customer = customer; }
    public void setProducts(List<String> products) { this.products = products; }
    public void setTotal(String total) { this.total = total; }
    public void setStatus(String status) { this.status = status; }
    public void setDate(String date) { this.date = date; }
}
