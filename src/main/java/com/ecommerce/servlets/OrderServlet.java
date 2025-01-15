package com.ecommerce.servlets;

import com.ecommerce.database.OrderDatabase;
import com.ecommerce.models.Order;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.*;
import java.util.List;

@WebServlet("/orders/*")  // Endpoint for order-related requests
public class OrderServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set the content type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Extract order ID if provided (e.g., /orders/#12354)
        String pathInfo = request.getPathInfo();
        List<Order> orders = new OrderDatabase().readOrders();

        if (pathInfo != null && !pathInfo.equals("/")) {
            String orderId = pathInfo.substring(1); // Remove the leading slash

            // Find the order by ID
            Order order = orders.stream()
                    .filter(o -> o.getId().equals(orderId))
                    .findFirst()
                    .orElse(null);

            // Return the order or 404 if not found
            if (order != null) {
                response.getWriter().write(new ObjectMapper().writeValueAsString(order));
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Order not found");
            }
        } else {
            // If no order ID provided, return all orders
            response.getWriter().write(new ObjectMapper().writeValueAsString(orders));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Read incoming JSON body to create an order
        BufferedReader reader = request.getReader();
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }

        String jsonRequest = stringBuilder.toString();
        ObjectMapper objectMapper = new ObjectMapper();
        Order newOrder = objectMapper.readValue(jsonRequest, Order.class);

        // Add the new order
        OrderDatabase db = new OrderDatabase();
        db.addOrder(newOrder);

        // Respond with success
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("Order added successfully with ID " + newOrder.getId());
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Extract order ID from the URL (e.g., /orders/12345)
        String pathInfo = request.getPathInfo();
        String orderId = pathInfo != null ? pathInfo.substring(1) : null;

        if (orderId == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Order ID is required");
            return;
        }

        // Read incoming JSON body to update the order
        BufferedReader reader = request.getReader();
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }

        String jsonRequest = stringBuilder.toString();
        ObjectMapper objectMapper = new ObjectMapper();
        Order updatedOrder = objectMapper.readValue(jsonRequest, Order.class);

        // Find the existing order
        OrderDatabase db = new OrderDatabase();
        List<Order> orders = db.readOrders();
        Order order = orders.stream()
                .filter(o -> o.getId().equals(orderId))
                .findFirst()
                .orElse(null);

        if (order != null) {
            // Update the order
            order.setStatus(updatedOrder.getStatus());
            db.updateOrder(order);  // Method to save the updated order to the database or JSON file

            // Respond with success
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("Order updated successfully with ID " + orderId);
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Order not found");
        }
    }
}
