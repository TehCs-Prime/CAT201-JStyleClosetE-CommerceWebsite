package com.ecommerce.database;

import com.ecommerce.models.Order;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.util.List;

public class OrderDatabase {

    private static final String FILE_PATH = "S:\\USM\\Year2.Sem I\\CAT201 SoftwareDevelopment\\Java\\CAT-Project-WebApp\\src\\main\\webapp\\orders.json";

    // Read orders from the JSON file
    public List<Order> readOrders() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(new File(FILE_PATH), objectMapper.getTypeFactory().constructCollectionType(List.class, Order.class));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Add a new order to the database (JSON file)
    public void addOrder(Order newOrder) {
        List<Order> orders = readOrders();
        if (orders != null) {
            orders.add(newOrder);
            saveOrders(orders);
        }
    }

    // Update an existing order
    public void updateOrder(Order updatedOrder) {
        List<Order> orders = readOrders();
        if (orders != null) {
            // Find the order to update
            for (int i = 0; i < orders.size(); i++) {
                if (orders.get(i).getId().equals(updatedOrder.getId())) {
                    orders.set(i, updatedOrder);
                    break;
                }
            }
            saveOrders(orders);
        }
    }

    // Save orders back to the JSON file
    public void saveOrders(List<Order> orders) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            objectMapper.writeValue(new File(FILE_PATH), orders);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
