package com.ecommerce.dao;

import com.ecommerce.database.DatabaseConnection;
import com.ecommerce.models.Product;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductDAO {
    private Connection connection;

    public ProductDAO(Connection connection) {
        this.connection = connection;
    }

    // Add product to the database
    public void addProduct(Product product) {
        String query = "INSERT INTO product (id, name, description, price, quantity) VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            // Generate the custom product ID
            String productId = generateProductId();

            // Set the product ID and other fields
            stmt.setString(1, productId);
            stmt.setString(2, product.getName());
            stmt.setString(3, product.getCategory());
            stmt.setDouble(4, product.getPrice());
            stmt.setInt(5, product.getStock());

            int rowsInserted = stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Method to generate the custom product ID (e.g., P001, P002, etc.)
    private String generateProductId() throws SQLException {
        String query = "SELECT MAX(id) FROM product";

        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            if (rs.next()) {
                String maxId = rs.getString(1);
                if (maxId == null) {
                    return "P001";  // First product, start with P001
                }

                // Extract the numeric part of the ID and increment it
                int numericPart = Integer.parseInt(maxId.substring(1)) + 1;
                return String.format("P%03d", numericPart);  // Format as P001, P002, etc.
            }
        }

        throw new SQLException("Unable to generate product ID");
    }

    // Get product by its ID
    public Product getProductById(String id) throws SQLException {
        String sql = "SELECT * FROM products WHERE id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Product(
                            rs.getString("id"),
                            rs.getString("name"),
                            rs.getString("category"),
                            rs.getDouble("price"), // Handle price as double
                            rs.getInt("stock"),
                            rs.getString("status")
                    );
                }
            }
        }
        return null;
    }

    // Get all products
        public List<Product> getAllProducts() {
            List<Product> products = new ArrayList<>();
            String query = "SELECT * FROM products"; // Modify this query if needed

            try (Connection conn = DatabaseConnection.getConnection();
                 PreparedStatement ps = conn.prepareStatement(query);
                 ResultSet rs = ps.executeQuery()) {

                while (rs.next()) {
                    Product product = new Product();
                    product.setId(rs.getString("id"));
                    product.setName(rs.getString("name"));
                    product.setCategory(rs.getString("category"));
                    product.setPrice(rs.getDouble("price"));
                    product.setStock(rs.getInt("stock"));
                    product.setStatus(rs.getString("status"));
                    products.add(product);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
            return products;
        }

    public void updateProduct(Product product) {
        String query = "UPDATE product SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?";

        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, product.getName());
            stmt.setString(2, product.getCategory()); // Assuming category is being updated
            stmt.setDouble(3, product.getPrice());
            stmt.setInt(4, product.getStock());
            stmt.setString(5, product.getId());

            int rowsUpdated = stmt.executeUpdate();
            if (rowsUpdated == 0) {
                throw new SQLException("Product with ID " + product.getId() + " not found.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}



