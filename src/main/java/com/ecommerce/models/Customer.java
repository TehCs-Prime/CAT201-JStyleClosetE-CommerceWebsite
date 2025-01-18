package com.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Customer {
    private String id;
    private String name;
    private String email;
    private String password;
    private int totalOrders;
    private String totalSpent;
    private String lastOrder;
    private String status;

    // Constructor
    @JsonCreator
    public Customer(@JsonProperty("id") String id,
                    @JsonProperty("name") String name,
                    @JsonProperty("email") String email,
                    @JsonProperty("password") String password,
                    @JsonProperty("totalOrders") int totalOrders,
                    @JsonProperty("totalSpent") String totalSpent,
                    @JsonProperty("lastOrder") String lastOrder,
                    @JsonProperty("status") String status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.totalOrders = totalOrders;
        this.totalSpent = totalSpent;
        this.lastOrder = lastOrder;
        this.status = status;
    }

    // Getters and Setters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public int getTotalOrders() { return totalOrders; }
    public String getTotalSpent() { return totalSpent; }
    public String getLastOrder() { return lastOrder; }
    public String getStatus() { return status; }

    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setTotalOrders(int totalOrders) { this.totalOrders = totalOrders; }
    public void setTotalSpent(String totalSpent) { this.totalSpent = totalSpent; }
    public void setLastOrder(String lastOrder) { this.lastOrder = lastOrder; }
    public void setStatus(String status) { this.status = status; }
}
