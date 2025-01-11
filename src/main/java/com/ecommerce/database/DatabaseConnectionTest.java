package com.ecommerce.database;

import java.sql.Connection;
import java.sql.SQLException;

public class DatabaseConnectionTest {
    public static void main(String[] args) {
        try {
            // Try to get the connection to the database
            Connection connection = DatabaseConnection.getConnection();

            // If the connection is successful
            if (connection != null) {
                System.out.println("Database connection successful!");
            } else {
                System.out.println("Failed to connect to the database.");
            }
        } catch (SQLException e) {
            // Handle errors related to database connection
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
