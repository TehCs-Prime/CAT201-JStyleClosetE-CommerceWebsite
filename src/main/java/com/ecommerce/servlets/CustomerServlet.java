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

        if (pathInfo != null && !pathInfo.equals("/")) {
            String customerId = pathInfo.substring(1);
            Customer customer = customers.stream()
                    .filter(c -> c.getId().equals(customerId))
                    .findFirst()
                    .orElse(null);

            if (customer != null) {
                response.getWriter().write(new ObjectMapper().writeValueAsString(customer));
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Customer not found");
            }
        } else {
            response.getWriter().write(new ObjectMapper().writeValueAsString(customers));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }

        String jsonRequest = stringBuilder.toString();
        ObjectMapper objectMapper = new ObjectMapper();
        Customer newCustomer = objectMapper.readValue(jsonRequest, Customer.class);

        CustomerDatabase db = new CustomerDatabase();
        db.addCustomer(newCustomer);

        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("Customer added successfully with ID " + newCustomer.getId());
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        String customerId = pathInfo != null ? pathInfo.substring(1) : null;

        if (customerId == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Customer ID is required");
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
        Customer customer = customers.stream()
                .filter(c -> c.getId().equals(customerId))
                .findFirst()
                .orElse(null);

        if (customer != null) {
            customer.setName(updatedCustomer.getName());
            customer.setEmail(updatedCustomer.getEmail());
            customer.setPassword(updatedCustomer.getPassword());
            customer.setTotalOrders(updatedCustomer.getTotalOrders());
            customer.setTotalSpent(updatedCustomer.getTotalSpent());
            customer.setLastOrder(updatedCustomer.getLastOrder());
            customer.setStatus(updatedCustomer.getStatus());

            db.updateCustomer(customer);

            // Send a valid JSON response
            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\": \"Customer updated successfully\", \"customerId\": \"" + customerId + "\"}");
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
