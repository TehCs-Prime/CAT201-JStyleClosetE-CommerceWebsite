package com.ecommerce.servlets;

import com.ecommerce.database.OrderDatabase;
import com.ecommerce.models.Order;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@WebServlet("/orders/*")  // Endpoint for order-related requests
public class OrderServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        List<Order> orders = new OrderDatabase().readOrders();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        ObjectMapper mapper = new ObjectMapper();

        if (pathInfo != null && !pathInfo.equals("/")) {
            String orderId = pathInfo.substring(1); // No need for URL decoding or `#` handling
            Order order = orders.stream()
                    .filter(o -> o.getId().equals(orderId))
                    .findFirst()
                    .orElse(null);

            if (order != null) {
                response.getWriter().write(mapper.writeValueAsString(order));
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Order not found");
            }
        } else {
            response.getWriter().write(mapper.writeValueAsString(orders));
        }
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Read existing orders from JSON file
        String ordersFilePath = getServletContext().getRealPath("/orders.json");
        ObjectMapper objectMapper = new ObjectMapper();
        List<Order> orders = objectMapper.readValue(new File(ordersFilePath), new TypeReference<List<Order>>() {});

        // Find the highest numeric ID
        int maxId = 0;
        for (Order order : orders) {
            int numericId = Integer.parseInt(order.getId()); // Assume IDs are numeric strings
            if (numericId > maxId) {
                maxId = numericId;
            }
        }

        // Generate new sequential numeric ID
        int newOrderId = maxId + 1;

        // Create a new order from the incoming JSON
        BufferedReader reader = request.getReader();
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }

        String jsonRequest = stringBuilder.toString();
        Order newOrder = objectMapper.readValue(jsonRequest, Order.class);

        newOrder.setId(String.valueOf(newOrderId)); // Assign the new numeric ID
        orders.add(newOrder); // Add the new order to the list

        // Save updated orders back to the JSON file
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(ordersFilePath), orders);

        // Respond with success
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("Order added successfully with ID " + newOrderId);
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

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        String orderId = pathInfo != null ? pathInfo.substring(1) : null;

        if (orderId == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Order ID is required");
            return;
        }

        OrderDatabase db = new OrderDatabase();
        List<Order> orders = db.readOrders();
        Order orderToDelete = orders.stream()
                .filter(o -> o.getId().equals(orderId))
                .findFirst()
                .orElse(null);

        if (orderToDelete != null) {
            // Remove the order
            orders.remove(orderToDelete);
            db.saveOrders(orders);  // Save the updated orders to the JSON file

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("Order deleted successfully with ID " + orderId);
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Order not found");
        }
    }
}
