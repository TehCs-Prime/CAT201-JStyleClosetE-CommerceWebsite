package com.ecommerce.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://127.0.0.1:3306/ecommerce?useSSL=false&serverTimezone=UTC";  // Updated URL
    private static final String USER = "root";  // Change to your DB username
    private static final String PASSWORD = "0607";  // Change to your DB password

    public static Connection getConnection() throws SQLException {
        try {
            // Explicitly loading the MySQL JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Establishing connection
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            throw new SQLException("MySQL JDBC Driver not found.", e);
        } catch (SQLException e) {
            throw new SQLException("Error connecting to the database.", e);
        }
    }
}
