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
    public void addCustomer(Customer newCustomer) {
        List<Customer> customers = readCustomers();
        if (customers != null) {
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
