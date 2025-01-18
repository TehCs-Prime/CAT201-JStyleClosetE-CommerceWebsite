package com.ecommerce.database;

import com.ecommerce.models.Customer;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.util.List;

public class CustomerDatabase {

    private static final String FILE_PATH = "D:\\Y2S1\\CAT201\\CAT-Project-WebApp\\src\\main\\webapp\\customers.json";

    // Read customers from the JSON file
    public List<Customer> readCustomers() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(new File(FILE_PATH), objectMapper.getTypeFactory().constructCollectionType(List.class, Customer.class));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Add a new customer to the database (JSON file)
    public String generateCustomerId() {
        List<Customer> customers = readCustomers();
        if (customers == null || customers.isEmpty()) {
            return "C001"; // First customer, ID is "C001"
        }

        // Find the last customer's ID
        String lastId = customers.get(customers.size() - 1).getId();
        int lastNumber = Integer.parseInt(lastId.substring(1)); // Get the number part after "C"
        int nextNumber = lastNumber + 1; // Increment the number part
        return "C" + String.format("%03d", nextNumber); // Format it with leading zeros (e.g., "C002")
    }

    // Add a new customer to the database (JSON file)
    public void addCustomer(Customer newCustomer) {
        List<Customer> customers = readCustomers();
        if (customers != null) {
            // Generate the next customer ID
            String newCustomerId = generateCustomerId();
            newCustomer.setId(newCustomerId); // Assign the generated ID to the new customer

            customers.add(newCustomer);
            saveCustomers(customers);
        }
    }

    // Update an existing customer
    public void updateCustomer(Customer updatedCustomer) {
        List<Customer> customers = readCustomers();
        if (customers != null) {
            for (int i = 0; i < customers.size(); i++) {
                if (customers.get(i).getId().equals(updatedCustomer.getId())) {
                    customers.set(i, updatedCustomer);
                    break;
                }
            }
            saveCustomers(customers);
        }
    }

    // Save customers back to the JSON file
    public void saveCustomers(List<Customer> customers) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            objectMapper.writeValue(new File(FILE_PATH), customers);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
