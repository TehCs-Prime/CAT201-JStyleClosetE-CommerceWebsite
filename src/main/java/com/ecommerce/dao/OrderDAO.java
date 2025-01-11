package com.ecommerce.dao;

import com.ecommerce.models.Order;
import com.ecommerce.database.DatabaseConnection;
import java.sql.*;
import java.util.*;

public class OrderDAO {
    private Connection connection;

    // Constructor to initialize connection using DatabaseConnection class
    public OrderDAO() {
        try {
            this.connection = DatabaseConnection.getConnection();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Method to get the most recent 15 orders
    public List<Order> getRecentOrders() {
        List<Order> orders = new ArrayList<>();
        String query = "SELECT * FROM orders ORDER BY orderDate DESC LIMIT 15";

        try (PreparedStatement stmt = connection.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                int id = rs.getInt("id");
                String customerName = rs.getString("customerName");
                String orderDate = rs.getString("orderDate");
                String status = rs.getString("status");
                double totalAmount = rs.getDouble("totalAmount");

                Order order = new Order(id, customerName, orderDate, status, totalAmount);
                orders.add(order);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return orders;
    }

    // Method to get all orders (for admin view)
    public List<Order> getAllOrders() {
        List<Order> orders = new ArrayList<>();
        String query = "SELECT * FROM orders";

        try (PreparedStatement stmt = connection.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                int id = rs.getInt("id");
                String customerName = rs.getString("customerName");
                String orderDate = rs.getString("orderDate");
                String status = rs.getString("status");
                double totalAmount = rs.getDouble("totalAmount");

                Order order = new Order(id, customerName, orderDate, status, totalAmount);
                orders.add(order);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return orders;
    }
}
