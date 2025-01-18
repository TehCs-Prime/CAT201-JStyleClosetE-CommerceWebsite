package com.ecommerce.servlets;

import com.ecommerce.database.CustomerDatabase;
import com.ecommerce.models.Customer;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.*;
import java.util.List;

@WebServlet("/customers/*")
public class CustomerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        List<Customer> customers = new CustomerDatabase().readCustomers();

        // If there is an email query parameter, check if the customer with that email exists
        String email = request.getParameter("email");
        if (email != null && !email.isEmpty()) {
            Customer customer = customers.stream()
                    .filter(c -> c.getEmail().equals(email))
                    .findFirst()
                    .orElse(null);

            if (customer != null) {
                // Email found
                response.setContentType("application/json");
                response.getWriter().write("{\"exists\": true}");
            } else {
                // Email not found
                response.setContentType("application/json");
                response.getWriter().write("{\"exists\": false}");
            }
        } else if (pathInfo != null && !pathInfo.equals("/")) {
            // Check for customer by ID if no email is provided
            String customerId = pathInfo.substring(1);
            Customer customer = customers.stream()
                    .filter(c -> c.getId().equals(customerId))
                    .findFirst()
                    .orElse(null);

            if (customer != null) {
                response.setContentType("application/json");
                response.getWriter().write(new ObjectMapper().writeValueAsString(customer));
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Customer not found");
            }
        } else {
            // Return all customers
            response.setContentType("application/json");
            response.getWriter().write(new ObjectMapper().writeValueAsString(customers));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Read the JSON request body and convert it to a Customer object
        BufferedReader reader = request.getReader();
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }
        String jsonRequest = stringBuilder.toString();

        ObjectMapper objectMapper = new ObjectMapper();
        Customer newCustomer = objectMapper.readValue(jsonRequest, Customer.class);

        // Add the new customer to the database
        CustomerDatabase db = new CustomerDatabase();
        db.addCustomer(newCustomer);

        // Respond with a valid JSON object
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("{\"message\": \"Customer added successfully\"}");
    }

    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Extract customerId from the URL path (optional)
        String pathInfo = request.getPathInfo();
        String customerId = pathInfo != null ? pathInfo.substring(1) : null;

        // Extract email from the query string (optional)
        String email = request.getParameter("email");

        if (customerId == null && email == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Customer ID or email is required");
            return;
        }

        BufferedReader reader = request.getReader();
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }

        String jsonRequest = stringBuilder.toString();
        ObjectMapper objectMapper = new ObjectMapper();
        Customer updatedCustomer = objectMapper.readValue(jsonRequest, Customer.class);

        CustomerDatabase db = new CustomerDatabase();
        List<Customer> customers = db.readCustomers();

        // Find the customer by either customerId or email
        Customer customer = null;

        if (customerId != null) {
            customer = customers.stream()
                    .filter(c -> c.getId().equals(customerId))
                    .findFirst()
                    .orElse(null);
        }

        if (customer == null && email != null) {
            customer = customers.stream()
                    .filter(c -> c.getEmail().equals(email))
                    .findFirst()
                    .orElse(null);
        }

        if (customer != null) {
            // Update the customer's password if provided
            if (updatedCustomer.getPassword() != null) {
                customer.setPassword(updatedCustomer.getPassword());
            }

            // Update the customer's status if provided
            if (updatedCustomer.getStatus() != null) {
                customer.setStatus(updatedCustomer.getStatus());
            }

            // Update the customer data in the database
            db.updateCustomer(customer);

            // Send a valid JSON response
            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\": \"Customer updated successfully\", \"customerId\": \"" + customer.getId() + "\", \"email\": \"" + customer.getEmail() + "\"}");
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Customer not found");
        }
    }





    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        String customerId = pathInfo != null ? pathInfo.substring(1) : null;

        if (customerId == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Customer ID is required");
            return;
        }

        CustomerDatabase db = new CustomerDatabase();
        List<Customer> customers = db.readCustomers();
        Customer customerToDelete = customers.stream()
                .filter(c -> c.getId().equals(customerId))
                .findFirst()
                .orElse(null);

        if (customerToDelete != null) {
            customers.remove(customerToDelete);
            db.saveCustomers(customers);

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("Customer deleted successfully with ID " + customerId);
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Customer not found");
        }
    }
}
