package com.ecommerce.dao;

import com.ecommerce.models.Customer;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CustomerDAO {
    private Connection connection;

    // Constructor that initializes the database connection
    public CustomerDAO(Connection connection) {
        this.connection = connection;
    }

    // Get all customers
    public List<Customer> getCustomers(int page, int customersPerPage) {
        List<Customer> customers = new ArrayList<>();
        String query = "SELECT * FROM customers LIMIT ?, ?";

        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setInt(1, (page - 1) * customersPerPage);
            stmt.setInt(2, customersPerPage);

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Customer customer = new Customer();
                customer.setId(rs.getInt("id"));
                customer.setName(rs.getString("name"));
                customer.setEmail(rs.getString("email"));
                customer.setTotalOrders(rs.getInt("totalOrders"));
                customer.setTotalSpent(rs.getDouble("totalSpent"));
                customer.setLastOrder(rs.getString("lastOrder"));
                customer.setStatus(rs.getString("status"));
                customers.add(customer);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return customers;
    }

    // Get customer by ID
    public Customer getCustomerById(int id) {
        Customer customer = null;
        String query = "SELECT * FROM customers WHERE id = ?";

        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                customer = new Customer();
                customer.setId(rs.getInt("id"));
                customer.setName(rs.getString("name"));
                customer.setEmail(rs.getString("email"));
                customer.setTotalOrders(rs.getInt("totalOrders"));
                customer.setTotalSpent(rs.getDouble("totalSpent"));
                customer.setLastOrder(rs.getString("lastOrder"));
                customer.setStatus(rs.getString("status"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return customer;
    }

    // Update customer details
    public boolean updateCustomer(Customer customer) {
        String query = "UPDATE customers SET name = ?, email = ?, status = ? WHERE id = ?";

        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, customer.getName());
            stmt.setString(2, customer.getEmail());
            stmt.setString(3, customer.getStatus());
            stmt.setInt(4, customer.getId());

            int rowsUpdated = stmt.executeUpdate();
            return rowsUpdated > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
