package com.ecommerce.servlets;

import java.io.*;

import com.ecommerce.dao.OrderDAO;
import com.ecommerce.models.Order;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.util.*;

public class OrderServlet extends HttpServlet {
    private OrderDAO orderDAO;

    @Override
    public void init() throws ServletException {
        super.init();
        // Initialize the DAO (Data Access Object) for order data
        orderDAO = new OrderDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Retrieve the most recent orders and all orders from the database
        List<Order> recentOrders = orderDAO.getRecentOrders();
        List<Order> allOrders = orderDAO.getAllOrders();

        // Set the orders as request attributes for use in JSP
        request.setAttribute("recentOrders", recentOrders);
        request.setAttribute("allOrders", allOrders);

        // Forward the request to a JSP page to display the orders
        RequestDispatcher dispatcher = request.getRequestDispatcher("/orders.jsp");
        dispatcher.forward(request, response);
    }
}

