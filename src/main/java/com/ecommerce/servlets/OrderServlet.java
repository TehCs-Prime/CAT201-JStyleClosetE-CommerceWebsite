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

        newOrder.getProducts().forEach(product -> {
            System.out.println("Product ID: " + product.getProductId() + ", Quantity: " + product.getQuantity());
        });

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
