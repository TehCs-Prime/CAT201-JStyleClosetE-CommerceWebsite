package com.ecommerce.servlets;

import com.ecommerce.dao.CustomerDAO;
import com.ecommerce.models.Customer;
import com.google.gson.Gson;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.*;
import java.sql.*;
import java.util.List;

@WebServlet("/customers")
public class CustomerServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private CustomerDAO customerDAO;

    // Initialize DAO and DB connection
    @Override
    public void init() throws ServletException {
        try {
            // Initialize CustomerDAO with database connection
            Connection connection = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/ecommerce", "root", "0607");
            customerDAO = new CustomerDAO(connection);
        } catch (SQLException e) {
            throw new ServletException("Error establishing database connection", e);
        }
    }

    // Handle GET requests (e.g., to fetch customers for a page)
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String pageParam = request.getParameter("page");
        int page = 1;  // Default to page 1 if no page parameter is provided

        // Parse page number, default to 1 if invalid
        try {
            if (pageParam != null) {
                page = Integer.parseInt(pageParam);
            }
        } catch (NumberFormatException e) {
            page = 1; // Log and use default value if page is not a valid number
            log("Invalid page number, defaulting to 1", e);
        }

        int customersPerPage = 10; // Number of customers per page
        List<Customer> customers = customerDAO.getCustomers(page, customersPerPage);

        // Send response as JSON
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            String jsonResponse = new Gson().toJson(customers);
            out.println(jsonResponse);
        }
    }

    // Handle POST requests (e.g., to update a customer's details)
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            int id = Integer.parseInt(request.getParameter("id"));
            String name = request.getParameter("name");
            String email = request.getParameter("email");
            String status = request.getParameter("status");

            // Create customer object and set properties
            Customer customer = new Customer();
            customer.setId(id);
            customer.setName(name);
            customer.setEmail(email);
            customer.setStatus(status);

            // Update customer in the database
            boolean isUpdated = customerDAO.updateCustomer(customer);

            // Send response indicating success or failure
            response.setContentType("application/json");
            try (PrintWriter out = response.getWriter()) {
                out.println("{\"success\": " + isUpdated + "}");
            }
        } catch (NumberFormatException e) {
            log("Invalid customer ID provided", e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid customer ID");
        } catch (Exception e) {
            log("Error updating customer", e);
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred while updating customer");
        }
    }
}
