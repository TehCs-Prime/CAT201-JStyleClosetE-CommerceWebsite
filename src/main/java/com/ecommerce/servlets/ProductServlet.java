package com.ecommerce.servlets;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.ecommerce.database.ProductDatabase;
import com.ecommerce.models.Product;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@WebServlet("/products/*")  // The endpoint for the frontend to call
public class ProductServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set the content type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Extract path information (e.g., /P001)
        String pathInfo = request.getPathInfo();  // Get the path info (e.g., "/P001")

        List<Product> products = new ArrayList<>();

        // If a product ID is provided (e.g., /products/P001)
        if (pathInfo != null && !pathInfo.equals("/")) {
            String productId = pathInfo.substring(1); // Remove the leading slash

            // Get the product by ID from the database
            ProductDatabase db = new ProductDatabase();
            products = db.readProducts();  // Get the list of all products

            // Filter the product with the matching ID
            Product product = products.stream()
                    .filter(p -> p.getId().equals(productId))
                    .findFirst()
                    .orElse(null);

            // If product is found, write it to response, otherwise send 404
            if (product != null) {
                String jsonResponse = convertToJson(Collections.singletonList(product));
                response.getWriter().write(jsonResponse);
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Product not found");
            }
        } else {
            // No product ID provided, return all products
            ProductDatabase db = new ProductDatabase();
            products = db.readProducts();

            // Convert the products to JSON format
            String jsonResponse = convertToJson(products);
            response.getWriter().write(jsonResponse);
        }
    }


    private String convertToJson(List<Product> products) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // Serialize the list of products into a JSON string
            return objectMapper.writeValueAsString(products);
        } catch (IOException e) {
            e.printStackTrace();
            return "[]"; // Return empty array in case of error
        }
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Read the incoming JSON request body
        BufferedReader reader = request.getReader();
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }
        String jsonRequest = stringBuilder.toString();

        // Parse the JSON request into a Product object (without ID)
        ObjectMapper objectMapper = new ObjectMapper();
        Product newProduct = objectMapper.readValue(jsonRequest, Product.class);

        // Load current products from the JSON file
        File file = new File(getServletContext().getRealPath("/products.json"));
        List<Product> products = new ArrayList<>();

        if (file.exists()) {
            products = objectMapper.readValue(file, new TypeReference<List<Product>>() {
            });
        }

        // Generate a new ID for the product (e.g., P001, P002, etc.)
        String newProductId = String.format("P%03d", products.size() + 1); // Format ID with leading zeros
        newProduct.setId(newProductId);  // Set the generated ID to the new product


        // Add the new product to the list
        products.add(newProduct);

        // Write the updated products list back to the JSON file
        objectMapper.writeValue(file, products);

        // Send a response back to the client
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("Product added successfully with ID " + newProductId);
    }


    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String productId = request.getPathInfo().substring(1); // Extract product ID from URL
        ObjectMapper objectMapper = new ObjectMapper();

        // Parse incoming JSON request
        BufferedReader reader = request.getReader();
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }
        String jsonRequest = stringBuilder.toString();

        Product updatedProduct;
        try {
            updatedProduct = objectMapper.readValue(jsonRequest, Product.class);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Invalid JSON format");
            return;
        }

        // Load current products from JSON file
        File file = new File(getServletContext().getRealPath("/products.json"));
        List<Product> products = new ArrayList<>();
        if (file.exists()) {
            try {
                products = objectMapper.readValue(file, new TypeReference<List<Product>>() {});
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("Failed to load products");
                return;
            }
        }

        // Find and update the product by ID
        boolean productUpdated = false;
        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getId().equals(productId)) {
                // Merge the updated product's fields
                Product currentProduct = products.get(i);
                currentProduct.setName(updatedProduct.getName() != null ? updatedProduct.getName() : currentProduct.getName());
                currentProduct.setCategory(updatedProduct.getCategory() != null ? updatedProduct.getCategory() : currentProduct.getCategory());
                currentProduct.setPrice(updatedProduct.getPrice() != null ? updatedProduct.getPrice() : currentProduct.getPrice());
                int updatedStock = updatedProduct.getStock() == -1 ? currentProduct.getStock() : updatedProduct.getStock();
                currentProduct.setStock(updatedStock);
                currentProduct.setStatus(updatedProduct.getStatus() != null ? updatedProduct.getStatus() : currentProduct.getStatus());

                products.set(i, currentProduct);
                productUpdated = true;
                break;
            }
        }

        if (!productUpdated) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("Product not found");
            return;
        }

        // Write updated product list back to the JSON file
        try {
            objectMapper.writeValue(file, products);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Failed to save products");
            return;
        }

        // Respond with success
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("Product updated successfully");
    }


    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String productId = request.getPathInfo().substring(1); // Extract product ID from the URL

        // Load current products from the JSON file
        File file = new File(getServletContext().getRealPath("/products.json"));
        List<Product> products = new ArrayList<>();

        if (file.exists()) {
            ObjectMapper objectMapper = new ObjectMapper();
            products = objectMapper.readValue(file, new TypeReference<List<Product>>() {
            });
        }

        // Find the product to delete by ID
        Product productToDelete = products.stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst()
                .orElse(null);

        if (productToDelete != null) {
            // Remove the product from the list
            products.remove(productToDelete);

            // Write the updated list back to the JSON file
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(file, products);

            // Send a response indicating success
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("Product deleted successfully");
        } else {
            // Send an error response if the product is not found
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Product not found");
        }
    }
}