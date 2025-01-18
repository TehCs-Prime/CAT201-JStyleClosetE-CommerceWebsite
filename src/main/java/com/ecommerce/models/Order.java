package com.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class Order {
    private String id;
    private String customer;
    private List<ProductItem> products; // List of product IDs
    private String total;
    private String status;
    private String date;

    public static class ProductItem {
        private String productId;
        private int quantity;

        @JsonCreator
        public ProductItem(@JsonProperty("productId") String productId,
                           @JsonProperty("quantity") int quantity) {
            this.productId = productId;
            this.quantity = quantity;
        }

        public String getProductId() {
            return productId;
        }

        public void setProductId(String productId) {
            this.productId = productId;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }

    // Constructor
    @JsonCreator
    public Order(@JsonProperty("id") String id,
                 @JsonProperty("customer") String customer,
                 @JsonProperty("products") List<ProductItem> products,
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
    public List<ProductItem> getProducts() { return products; }
    public String getTotal() { return total; }
    public String getStatus() { return status; }
    public String getDate() { return date; }

    public void setId(String id) { this.id = id; }
    public void setCustomer(String customer) { this.customer = customer; }
    public void setProducts(List<ProductItem> products) { this.products = products; }
    public void setTotal(String total) { this.total = total; }
    public void setStatus(String status) { this.status = status; }
    public void setDate(String date) { this.date = date; }
}
