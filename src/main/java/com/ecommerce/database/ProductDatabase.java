package com.ecommerce.database;

import com.ecommerce.models.Product;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class ProductDatabase {
    private static final String FILE_PATH = "D:\\Y2S1\\CAT201\\CAT-Project-WebApp\\src\\main\\webapp\\products.json";

    // Method to read the products from the JSON file
    public List<Product> readProducts() throws IOException {
        List<Product> products = new ArrayList<>();
        String content = new String(Files.readAllBytes(Paths.get(FILE_PATH))); // Read file content
        JSONArray jsonArray = new JSONArray(content); // Parse JSON content

        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            // Create Product objects from JSON data
            Product product = new Product(
                    jsonObject.getString("id"),
                    jsonObject.getString("name"),
                    jsonObject.getString("category"),
                    jsonObject.getString("price"),
                    jsonObject.getInt("stock"),
                    jsonObject.getString("status")
            );
            products.add(product); // Add to the product list
        }

        return products;
    }
}

