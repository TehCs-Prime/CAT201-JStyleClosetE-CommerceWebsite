package com.ecommerce.servlets;

import com.ecommerce.dao.ProductDAO;
import com.ecommerce.models.Product;
import com.ecommerce.database.DatabaseConnection;

import com.google.gson.Gson;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.*;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/products")
public class ProductServlet extends HttpServlet {
    private ProductDAO productDAO;

    @Override
    public void init() throws ServletException {
        try {
            // Initialize productDAO with database connection
            Connection connection = DatabaseConnection.getConnection();
            productDAO = new ProductDAO(connection);
        } catch (SQLException e) {
            throw new ServletException("Database connection error", e);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        List<Product> products = productDAO.getAllProducts();
        String jsonResponse = new Gson().toJson(products);
        response.getWriter().write(jsonResponse);
    }



    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("name");
        String price = request.getParameter("price");
        String quantity = request.getParameter("quantity");
        String category = request.getParameter("category");

        Product product = new Product();
        product.setName(name);
        product.setPrice(Double.parseDouble(price)); // Parse price as double
        product.setStock(Integer.parseInt(quantity)); // Assuming quantity is stock
        product.setCategory(category);
        product.setStatus("available"); // Default to "available", adjust as needed

        productDAO.addProduct(product);  // Add the product to the database
        response.sendRedirect("products"); // Redirect to product listing after adding
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Read the product ID from the URL
        String productId = request.getPathInfo().substring(1); // Removes the leading slash

        // Read the updated product data from the request body
        BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
        StringBuilder requestBody = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }
        String json = requestBody.toString();

        // Convert the JSON data to a Product object
        Gson gson = new Gson();
        Product updatedProduct = gson.fromJson(json, Product.class);

        // Update the product in the database
        updatedProduct.setId(productId);  // Ensure product ID is set correctly
        productDAO.updateProduct(updatedProduct);

        // Send a success response
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("{\"message\": \"Product updated successfully\"}");
    }

}
