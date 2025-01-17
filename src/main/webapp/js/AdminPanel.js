
// Navigation functionality
document.querySelectorAll('.nav-links li').forEach(link => {
    link.addEventListener('click', function() {
        // Remove active class from all links
        document.querySelectorAll('.nav-links li').forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');

        // Show corresponding content section
        const tabId = this.getAttribute('data-tab');
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    });
});

function populateOrdersTable() {
    const tableBody = document.getElementById('ordersTableBody');
    tableBody.innerHTML = ''; // Clear existing table content

    // Fetch orders data from orders.json file
    fetch('/CAT-Project-WebApp/orders')  // Adjust path as needed
        .then(response => response.json())
        .then(orders => {
            const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort orders by date
            const recentOrders = sortedOrders.slice(0, 15); // Get the most recent 15 orders

            if (recentOrders.length === 0) {
                // Show indicator if no data is available
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="7" class="empty-table-indicator">No orders available</td>
                `;
                tableBody.appendChild(row);
            } else {
                // Populate table with order data
                recentOrders.forEach(order => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${order.id}</td>
                        <td>${order.customer}</td>
                        <td>${order.products.join(', ')}</td>
                        <td>${order.total}</td>
                        <td>
                            <span class="status-tag status-${order.status.toLowerCase()}">
                                ${order.status}
                            </span>
                        </td>
                        <td>${order.date}</td>
                        <td>
                            <button class="action-btn edit-btn" data-id="${order.id}">
                                <img src="./Sources/EditPenIcon.png" class="edit"></img>
                            </button>
                            <button class="action-btn delete-btn" data-id="${order.id}">
                                <img src="./Sources/TrashIcon.png" class="trash"></img>
                            </button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching orders data:', error);
        });
}

// Modal functionality
const modal = document.getElementById('orderModal');
const closeModal = document.querySelector('.close-modal');

function showOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        const orderDetails = document.querySelector('.order-details');
        orderDetails.innerHTML = `
            <div class="detail-row">
                <span class="label">Order ID:</span>
                <span class="value">${order.id}</span>
            </div>
            <div class="detail-row">
                <span class="label">Customer:</span>
                <span class="value">${order.customer}</span>
            </div>
            <div class="detail-row">
                <span class="label">Products:</span>
                <span class="value">${order.products.join(', ')}</span>
            </div>
            <div class="detail-row">
                <span class="label">Total:</span>
                <span class="value">${order.total}</span>
            </div>
            <div class="detail-row">
                <span class="label">Status:</span>
                <span class="status-tag status-${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="detail-row">
                <span class="label">Date:</span>
                <span class="value">${order.date}</span>
            </div>
        `;
        modal.style.display = 'block';
    }
}

// Event listeners for action buttons
document.addEventListener('click', function(e) {
    if (e.target.closest('.view-btn')) {
        const orderId = e.target.closest('.view-btn').getAttribute('data-id');
        showOrderDetails(orderId);
    } else if (e.target.closest('.edit-btn')) {
        const orderId = e.target.closest('.edit-btn').getAttribute('data-id');
        handleEditOrder(orderId);
    } else if (e.target.closest('.delete-btn')) {
        const orderId = e.target.closest('.delete-btn').getAttribute('data-id');
        handleDeleteOrder(orderId);
    }
});

// Close modal when clicking the close button or outside the modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle edit order
async function handleEditOrder(orderId) {
    try {
        // Fetch the order data
        const response = await fetch(`/CAT-Project-WebApp/orders/${orderId}`);
        const order = await response.json();

        if (order) {
            const editForm = document.createElement('div');
            editForm.innerHTML = `
                <h3>Edit Order ${order.id}</h3>
                <form id="editOrderForm">
                    <div class="form-group">
                        <label>Status:</label>
                        <select name="status">
                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                    </div>
                    <button type="submit">Update Order</button>
                </form>
            `;

            document.querySelector('.order-details').innerHTML = '';
            document.querySelector('.order-details').appendChild(editForm);
            modal.style.display = 'block';

            // Handle form submission
            document.getElementById('editOrderForm').addEventListener('submit', async function (e) {
                e.preventDefault();

                const updatedOrder = {
                    id: order.id,
                    status: this.status.value,
                };

                const updateResponse = await fetch(`/CAT-Project-WebApp/orders/${order.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedOrder),
                });

                if (updateResponse.ok) {
                    // Show success alert
                    alert('Order updated successfully!');

                    // Repopulate the orders table with the updated data
                    populateOrdersTable();
                    displayOrdersPage();

                    // Close the modal after the update
                    modal.style.display = 'none';
                } else {
                    alert('Failed to update the order');
                }
            });
        } else {
            alert('Order not found');
        }
    } catch (error) {
        console.error('Error fetching order:', error);
        alert('Error fetching order details');
    }
}

// Handle delete order
function handleDeleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        // Send DELETE request to the server
        fetch(`/CAT-Project-WebApp/orders/${orderId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    alert('Order deleted successfully!');

                    // Fetch the updated list of orders after deletion
                    fetch('/CAT-Project-WebApp/orders')
                        .then(response => response.json())
                        .then(orders => {
                            // Repopulate the orders table with the updated data
                            populateOrdersTable();
                            displayOrdersPage();
                        })
                        .catch(error => {
                            console.error('Error fetching updated orders:', error);
                            alert('An error occurred while fetching the updated orders');
                        });
                } else {
                    alert('Failed to delete the order');
                }
            })
            .catch(error => {
                console.error('Error deleting order:', error);
                alert('An error occurred while deleting the order');
            });
    }
}




// Populate table with filtered data
function populateOrdersTableWithData(orders) {  // Accept 'orders' as an argument
    const tableBody = document.getElementById('ordersTableBody');
    tableBody.innerHTML = ''; // Clear the table body before populating new data

    if (orders.length === 0) {
        // Show indicator if no data is available
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="7" class="empty-table-indicator">No orders available</td>
        `;
        tableBody.appendChild(row);
    } else {
        // Populate the table with orders
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.products.join(', ')}</td>
                <td>${order.total}</td>
                <td>
                    <span class="status-tag status-${order.status.toLowerCase()}">
                        ${order.status}
                    </span>
                </td>
                <td>${order.date}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${order.id}">
                        <img src="./Sources/EditPenIcon.png" class="edit"></img>
                    </button>
                    <button class="action-btn delete-btn" data-id="${order.id}">
                        <img src="./Sources/TrashIcon.png" class="trash"></img>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

function applyFilters() {
    const filterOptions = {
        status: Array.from(document.querySelectorAll('.filter-options input[type="checkbox"]:checked')).map(input => input.value),
        dateRange: document.querySelector('.filter-options select').value
    };

    // Fetch orders data from orders.json for filtering
    fetch('/CAT-Project-WebApp/orders')  // Adjust the path to match where orders.json is located in your project
        .then(response => response.json())
        .then(orders => {
            const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date
            const recentOrders = sortedOrders.slice(0, 15); // Get the most recent 15 orders

            // Filter orders based on selected criteria
            const filteredOrders = recentOrders.filter(order => {
                // Check if order status matches the selected filter options
                const statusMatch = filterOptions.status.length === 0 || filterOptions.status.includes(order.status);

                // Check if order date matches the selected date range filter
                const dateMatch = checkDateRange(order.date, filterOptions.dateRange);

                return statusMatch && dateMatch;
            });

            // Populate the table with filtered data
            populateOrdersTableWithData(filteredOrders);

            // Close the filter modal
            const modal = document.querySelector('.modal');  // Make sure modal is defined
            if (modal) modal.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching orders data:', error);
        });
}

function checkDateRange(orderDate, dateRange) {
    const orderDateObj = new Date(orderDate);
    const today = new Date();
    const startDate = new Date(today);

    switch (dateRange) {
        case '-':
            return true;
        case 'today':
            return orderDateObj.toDateString() === today.toDateString();
        case 'week':
            startDate.setDate(today.getDate() - 7);
            return orderDateObj >= startDate;
        case 'month':
            startDate.setMonth(today.getMonth() - 1);
            return orderDateObj >= startDate;
        case 'year':
            startDate.setFullYear(today.getFullYear() - 1);
            return orderDateObj >= startDate;
        default:
            return true;
    }
}

const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', function() {
    populateOrdersTable();  // Re-populate the table after reset
});

// Filter functionality
const filterBtn = document.querySelector('.filter-btn');
filterBtn.addEventListener('click', function() {
    const filterOptions = {
        status: ['pending', 'processing', 'completed', 'cancelled'],
        dateRange: ['-', 'today', 'week', 'month', 'year']
    };

    // Create and show filter modal
    const filterModal = document.createElement('div');
    filterModal.innerHTML = `
        <div class="filter-options">
            <h3>Filter Orders</h3>
            <div class="filter-group">
                <label>Status:</label>
                ${filterOptions.status.map(status => `
                    <label>
                        <input type="checkbox" value="${status}"> ${status.charAt(0).toUpperCase() + status.slice(1)}
                    </label>
                `).join('')}
            </div>
            <div class="filter-group">
                <label>Date Range:</label>
                <select>
                    ${filterOptions.dateRange.map(range => `
                        <option value="${range}">${range.charAt(0).toUpperCase() + range.slice(1)}</option>
                    `).join('')}
                </select>
            </div>
            <button onclick="applyFilters()">Apply Filters</button>
        </div>
    `;

    document.querySelector('.order-details').innerHTML = '';
    document.querySelector('.order-details').appendChild(filterModal);
    modal.style.display = 'block';
});

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function () {
    populateOrdersTable();
    displayOrdersPage();
    populateProductsTable();
    displayCustomersPage();
    setupCustomerEventListeners();
});



function displayOrdersPage() {
    // Fetch orders data from orders.json
    fetch('/CAT-Project-WebApp/orders')  // Adjust the path as needed
        .then(response => response.json())
        .then(orders => {
            const tableBody = document.getElementById('totalOrdersTableBody');
            tableBody.innerHTML = '';

            if (orders.length === 0) {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td colspan="7" class="empty-table-indicator">No orders available</td>
        `;
                tableBody.appendChild(row);
            } else {
                orders.forEach(order => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.products.join(', ')}</td>
                <td>${order.total}</td>
                <td>
                    <span class="status-tag status-${order.status.toLowerCase()}">
                        ${order.status}
                    </span>
                </td>
                <td>${order.date}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${order.id}">
                        <img src="./Sources/EditPenIcon.png" class="edit"></img>
                    </button>
                    <button class="action-btn delete-btn" data-id="${order.id}">
                        <img src="./Sources/TrashIcon.png" class="trash"></img>
                    </button>
                </td>
            `;
                    tableBody.appendChild(row);
                });
            }
        })
}


// Filter functionality for orders section
            document.querySelector('.filter-btn-orders').addEventListener('click', function () {
                const filterOptions = {
                    status: ['pending', 'processing', 'completed', 'cancelled'],
                    dateRange: ['-', 'today', 'week', 'month', 'year']
                };

                const filterModal = document.createElement('div');
                filterModal.innerHTML = `
        <div class="filter-options">
            <h3>Filter Orders</h3>
            <div class="filter-group">
                <label>Status:</label>
                ${filterOptions.status.map(status => `
                    <label>
                        <input type="checkbox" value="${status}"> ${status.charAt(0).toUpperCase() + status.slice(1)}
                    </label>
                `).join('')}
            </div>
            <div class="filter-group">
                <label>Date Range:</label>
                <select>
                    ${filterOptions.dateRange.map(range => `
                        <option value="${range}">${range.charAt(0).toUpperCase() + range.slice(1)}</option>
                    `).join('')}
                </select>
            </div>
            <button onclick="applyOrdersFilters()">Apply Filters</button>
        </div>
    `;

                document.querySelector('.order-details').innerHTML = '';
                document.querySelector('.order-details').appendChild(filterModal);
                modal.style.display = 'block';
            });

// Reset functionality for orders section
            document.querySelector('.reset-btn-orders').addEventListener('click', function () {
                displayOrdersPage();
            });

            function applyOrdersFilters() {
                const filterOptions = {
                    status: Array.from(document.querySelectorAll('.filter-options input[type="checkbox"]:checked')).map(input => input.value),
                    dateRange: document.querySelector('.filter-options select').value
                };

                // Fetch orders data from orders.json file
                fetch('/CAT-Project-WebApp/orders')  // Adjust the path to where your orders.json is located
                    .then(response => response.json())
                    .then(orders => {
                        // Filter the orders based on selected filter options
                        const filteredOrders = orders.filter(order => {
                            const statusMatch = filterOptions.status.length === 0 || filterOptions.status.includes(order.status);
                            const dateMatch = checkDateRange(order.date, filterOptions.dateRange);
                            return statusMatch && dateMatch;
                        });

                        // Reset to first page when filtering
                        populateTotalOrdersTableWithData(filteredOrders);
                        modal.style.display = 'none';  // Close the modal after applying filters
                    })
                    .catch(error => {
                        console.error('Error fetching orders data:', error);
                    });
            }

            function populateTotalOrdersTableWithData(data) {
                const tableBody = document.getElementById('totalOrdersTableBody');
                tableBody.innerHTML = '';

                if (data.length === 0) {
                    // Show indicator if no data is present
                    const row = document.createElement('tr');
                    row.innerHTML = `
            <td colspan="7" class="empty-table-indicator">No orders available</td>
        `;
                    tableBody.appendChild(row);
                } else {
                    data.forEach(order => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.products.join(', ')}</td>
                <td>${order.total}</td>
                <td>
                    <span class="status-tag status-${order.status.toLowerCase()}">
                        ${order.status}
                    </span>
                </td>
                <td>${order.date}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${order.id}">
                        <img src="./Sources/EditPenIcon.png" class="edit"></img>
                    </button>
                    <button class="action-btn delete-btn" data-id="${order.id}">
                        <img src="./Sources/TrashIcon.png" class="trash"></img>
                    </button>
                </td>
            `;
                        tableBody.appendChild(row);
                    });
                }
            }

            function checkDateRange(orderDate, dateRange) {
                const orderDateObj = new Date(orderDate);
                const today = new Date();
                const startDate = new Date(today);

                switch (dateRange) {
                    case '-':
                        return true;
                    case 'today':
                        return orderDateObj.toDateString() === today.toDateString();
                    case 'week':
                        startDate.setDate(today.getDate() - 7);
                        return orderDateObj >= startDate;
                    case 'month':
                        startDate.setMonth(today.getMonth() - 1);
                        return orderDateObj >= startDate;
                    case 'year':
                        startDate.setFullYear(today.getFullYear() - 1);
                        return orderDateObj >= startDate;
                    default:
                        return true;
                }
            }


            async function populateProductsTable() {
                const PtableBody = document.getElementById('productsTableBody');
                if (!PtableBody) {
                    const productsSection = document.getElementById('products');
                    productsSection.innerHTML = `No Products Available`;
                    return;
                }

                // Clear any existing rows in the table body
                PtableBody.innerHTML = '';

                try {
                    // Fetch product data from your API
                    const response = await fetch('/CAT-Project-WebApp/products');  // Adjust the URL as per your backend
                    if (!response.ok) {
                        throw new Error('Failed to fetch products');
                    }

                    const products = await response.json();  // Assuming the backend returns a JSON array

                    if (products.length === 0) {
                        PtableBody.innerHTML = '<tr><td colspan="7">No products available</td></tr>';
                        return;
                    }

                    // Iterate through the products and create table rows
                    products.forEach(product => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td><span class="status-tag status-${product.status.toLowerCase().replace(' ', '-')}">${product.status}</span></td>
                <td>
                    <button class="action-btn Pedit-btn" data-id="${product.id}">
                        <img src="./Sources/EditPenIcon.png" class="edit"></img>
                    </button>
                    <button class="action-btn Pdelete-btn" data-id="${product.id}">
                        <img src="./Sources/TrashIcon.png" class="trash"></img>
                    </button>
                </td>
            `;
                        PtableBody.appendChild(row);
                    });

                } catch (error) {
                    console.error('Error fetching products:', error);
                    const productsSection = document.getElementById('products');
                    productsSection.innerHTML = `Error loading products. Please try again later.`;
                }
            }


            async function handleAddProduct() {
                const productForm = document.createElement('div');
                productForm.innerHTML = `
        <div class="product-form">
            <h3>Add New Product</h3>
            <form id="addProductForm">
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Category:</label>
                    <select name="category" required>
                        <option value="T-shirts">T-shirts</option>
                        <option value="Top">Top</option>
                        <option value="Dress">Dress</option>
                        <option value="Outwear">Outwear</option>
                        <option value="Bottom">Bottom</option>
                        <option value="Basic">Basic</option>
                        <option value="CNYSales">Chinese New Year Sales</option>
                        <option value="LastChances">Last Chances</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Price (RM):</label>
                    <input type="number" name="price" step="0.01" required>
                </div>
                <div class="form-group">
                    <label>Stock:</label>
                    <input type="number" name="stock" required>
                </div>
                <div class="form-group">
                    <label>Upload 5 Images:</label>
                    <input type="file" name="images" multiple accept="image/*" required>
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    `;

                document.querySelector('.order-details').innerHTML = '';
                document.querySelector('.order-details').appendChild(productForm);
                modal.style.display = 'block';

                // Handle form submission
                document.getElementById('addProductForm').addEventListener('submit', async function (e) {
                    e.preventDefault();

                    const images = Array.from(this.images.files).map(file => URL.createObjectURL(file));

                    // Prepare the new product data (WITHOUT the ID)
                    const newProduct = {
                        name: this.name.value,
                        category: this.category.value,
                        price: 'RM ' + parseFloat(this.price.value).toFixed(2),
                        stock: parseInt(this.stock.value),
                        status: parseInt(this.stock.value) === 0 ? 'Out of Stock' :
                            parseInt(this.stock.value) <= 10 ? 'Low Stock' : 'In Stock',
                        images,
                    };

                    // Send the new product data to the backend via POST request
                    try {
                        const response = await fetch('/CAT-Project-WebApp/products', {  // Adjust URL to match your backend endpoint
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newProduct)
                        });

                        if (!response.ok) {
                            throw new Error('Failed to add product');
                        }

                        // Update the products table after successfully adding the product
                        await populateProductsTable();

                        // Close the modal
                        modal.style.display = 'none';
                    } catch (error) {
                        console.error('Error adding product:', error);
                        alert('There was an error adding the product. Please try again.');
                    }
                });

            }


// Add event listeners
            document.addEventListener('click', function (e) {
                if (e.target.closest('.add-product-btn')) {
                    handleAddProduct();
                } else if (e.target.closest('.Pedit-btn')) {
                    const productId = e.target.closest('.Pedit-btn').getAttribute('data-id');
                    handleEditProduct(productId);
                } else if (e.target.closest('.Pdelete-btn')) {
                    const productId = e.target.closest('.Pdelete-btn').getAttribute('data-id');
                    handleDeleteProduct(productId);
                }
            });

            async function handleEditProduct(productId) {
                // Fetch the product data from the backend (your servlet)
                try {
                    const response = await fetch(`http://localhost:8080//CAT-Project-WebApp/products/${productId}`);
                    const product = await response.json();

                    if (product && product.length > 0) {
                        const selectedProduct = product[0]; // Since the response is wrapped in an array

                        // Create the edit form HTML
                        const editForm = document.createElement('div');
                        editForm.innerHTML = `
                <div class="product-form">
                    <h3>Edit Product ${selectedProduct.id}</h3>
                    <form id="editProductForm">
                        <div class="form-group">
                            <label>Name:</label>
                            <input type="text" name="name" value="${selectedProduct.name}" required>
                        </div>
                        <div class="form-group">
                            <label>Category:</label>
                            <select name="category" required>
                                <option value="T-shirts" ${selectedProduct.category === 'T-shirts' ? 'selected' : ''}>T-shirts</option>
                                <option value="Top" ${selectedProduct.category === 'Top' ? 'selected' : ''}>Top</option>
                                <option value="Dress" ${selectedProduct.category === 'Dress' ? 'selected' : ''}>Dress</option>
                                <option value="Outwear" ${selectedProduct.category === 'Outwear' ? 'selected' : ''}>Outwear</option>
                                <option value="Bottom" ${selectedProduct.category === 'Bottom' ? 'selected' : ''}>Bottom</option>
                                <option value="Basic" ${selectedProduct.category === 'Basic' ? 'selected' : ''}>Basic</option>
                                <option value="CNYSales" ${selectedProduct.category === 'CNYSales' ? 'selected' : ''}>Chinese New Year Sales</option>
                                <option value="LastChances" ${selectedProduct.category === 'LastChances' ? 'selected' : ''}>Last Chances</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Price (RM):</label>
                            <input type="number" name="price" step="0.01" value="${selectedProduct.price.replace('RM ', '')}" required>
                        </div>
                        <div class="form-group">
                            <label>Stock:</label>
                            <input type="number" name="stock" value="${selectedProduct.stock}" required>
                        </div>
                        <button type="submit">Update Product</button>
                    </form>
                </div>
            `;

                        // Clear the previous content and append the edit form
                        document.querySelector('.order-details').innerHTML = '';
                        document.querySelector('.order-details').appendChild(editForm);
                        modal.style.display = 'block';

                        // Handle the form submission
                        document.getElementById('editProductForm').addEventListener('submit', async function (e) {
                            e.preventDefault();

                            // Prepare the updated product data
                            const updatedProduct = {
                                id: selectedProduct.id,
                                name: this.name.value,
                                category: this.category.value,
                                price: 'RM ' + parseFloat(this.price.value).toFixed(2),
                                stock: parseInt(this.stock.value),
                                status: parseInt(this.stock.value) === 0 ? 'Out of Stock' :
                                    parseInt(this.stock.value) <= 10 ? 'Low Stock' : 'In Stock',
                            };

                            // Send the updated product data to the server using a PUT request
                            const updateResponse = await fetch(`http://localhost:8080/CAT-Project-WebApp/products/${selectedProduct.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(updatedProduct),
                            });

                            if (updateResponse.ok) {
                                // If successful, update the products table and close the modal
                                await populateProductsTable();
                                modal.style.display = 'none';
                            } else {
                                alert('Failed to update the product');
                            }
                        });
                    } else {
                        alert('Product not found');
                    }
                } catch (error) {
                    console.error('Error fetching product:', error);
                    alert('Error fetching product details');
                }
            }


            async function handleDeleteProduct(productId) {
                if (confirm('Are you sure you want to delete this product?')) {
                    try {
                        const response = await fetch(`/CAT-Project-WebApp/products/${productId}`, {
                            method: 'DELETE',
                        });

                        if (response.ok) {
                            alert('Product deleted successfully');
                            // After deleting, refresh the product table
                            await populateProductsTable();
                        } else {
                            alert('Failed to delete the product');
                        }
                    } catch (error) {
                        console.error('Error deleting product:', error);
                        alert('There was an error deleting the product. Please try again.');
                    }
                }
            }


            document.querySelector('.filter-btn-products').addEventListener('click', async function () {
                // Fetch unique categories from the database
                const response = await fetch('/CAT-Project-WebApp/products');
                const allProducts = await response.json();
                const categories = [...new Set(allProducts.map(product => product.category))];

                const filterModal = document.createElement('div');
                filterModal.innerHTML = `
        <div class="filter-options">
            <h3>Filter Products</h3>
            <div class="filter-group">
                <p>Category:</p>
                ${categories.map(category => `
                    <label>
                        <input type="checkbox" value="${category}"> ${category}
                    </label>
                `).join('')}
            </div>
            <div class="filter-group">
                <label>Stock Status:</label>
                <label>
                    <input type="checkbox" value="In Stock"> In Stock
                </label>
                <label>
                    <input type="checkbox" value="Low Stock"> Low Stock
                </label>
                <label>
                    <input type="checkbox" value="Out of Stock"> Out of Stock
                </label>
            </div>
            <button onclick="applyProductsFilters()">Apply Filters</button>
        </div>
    `;

                document.querySelector('.order-details').innerHTML = '';
                document.querySelector('.order-details').appendChild(filterModal);
                modal.style.display = 'block';
            });

// Reset functionality for products section
            document.querySelector('.reset-btn-products').addEventListener('click', function () {
                populateProductsTable();
            });

            async function applyProductsFilters() {
                const filterOptions = {
                    categories: Array.from(document.querySelectorAll('.filter-options input[type="checkbox"]:checked'))
                        .map(input => input.value)
                };

                // Fetch all products from the JSON database
                const response = await fetch('/CAT-Project-WebApp/products');
                const allProducts = await response.json();

                // Filter products based on the selected filters
                const filteredProducts = allProducts.filter(product => {
                    // If no categories are selected, show all products
                    if (filterOptions.categories.length === 0) return true;

                    // Check if product category or status matches any selected filter
                    return filterOptions.categories.includes(product.category) ||
                        filterOptions.categories.includes(product.status);
                });

                // Update products table with filtered data
                const PtableBody = document.getElementById('productsTableBody');
                PtableBody.innerHTML = '';

                if (filteredProducts.length === 0) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
            <td colspan="7" class="empty-table-indicator">No products found</td>
        `;
                    PtableBody.appendChild(row);
                } else {
                    filteredProducts.forEach(product => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td><span class="status-tag status-${product.status.toLowerCase().replace(' ', '-')}">${product.status}</span></td>
                <td>
                    <button class="action-btn Pedit-btn" data-id="${product.id}">
                        <img src="./Sources/EditPenIcon.png" class="edit"></img>
                    </button>
                    <button class="action-btn Pdelete-btn" data-id="${product.id}">
                        <img src="./Sources/TrashIcon.png" class="trash"></img>
                    </button>
                </td>
            `;
                        PtableBody.appendChild(row);
                    });
                }

                // Close the filter modal
                modal.style.display = 'none';
            }


// Display customers for current page
            let customers = []; // To hold the loaded customer data

            async function fetchCustomerData() {
                try {
                    const response = await fetch('/CAT-Project-WebApp/customers');
                    if (!response.ok) throw new Error('Failed to fetch customer data');
                    customers = await response.json();
                    displayCustomersPage(); // Display the first page
                    setupCustomerEventListeners(); // Setup event listeners after fetching the data
                } catch (error) {
                    console.error('Error fetching customer data:', error);
                }
            }

            function displayCustomersPage(page) {
                const tableBody = document.getElementById('customersTableBody');
                tableBody.innerHTML = '';

                if (customers.length === 0) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
            <td colspan="8" class="empty-table-indicator">No customers available</td>
        `;
                    tableBody.appendChild(row);
                } else {
                    customers.forEach(customer => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.totalOrders || 0}</td>
                <td>${customer.totalSpent || 'RM 0.00'}</td>
                <td>${customer.lastOrder || 'N/A'}</td>
                <td>
                    <span class="status-tag status-${customer.status.toLowerCase()}">
                        ${customer.status}
                    </span>
                </td>
                <td>
                    <button class="action-btn edit-customer-btn" data-id="${customer.id}">
                        <img src="./Sources/EditPenIcon.png" class="edit"></img>
                    </button>
                </td>
            `;
                        tableBody.appendChild(row);
                    });
                }
            }

// Setup event listeners for customers section
            function setupCustomerEventListeners() {
                // Filter button
                document.querySelector('.filter-btn-customers').addEventListener('click', showCustomerFilters);

                // Reset button
                document.querySelector('.reset-btn-customers').addEventListener('click', () => {
                    currentCustomerPage = 1;
                    displayCustomersPage(currentCustomerPage);
                });

                document.addEventListener('click', function (e) {
                    if (e.target.closest('.view-customer-btn')) {
                        const customerId = e.target.closest('.view-customer-btn').getAttribute('data-id');
                        showCustomerDetails(customerId);
                    }
                    if (e.target.closest('.edit-customer-btn')) {
                        const customerId = e.target.closest('.edit-customer-btn').getAttribute('data-id');
                        editCustomerDetails(customerId);
                    }
                });
            }

// Initialize the page with customer data and setup listeners
            function initializeCustomerManagement() {
                fetchCustomerData();  // Fetch customer data
            }

// Call the initialization function on page load
            window.onload = initializeCustomerManagement;

            function showCustomerFilters() {
                const filterModal = document.createElement('div');
                filterModal.innerHTML = `
        <div class="filter-options">
            <h3>Filter Customers</h3>
            <div class="filter-group">
                <label>Status:</label>
                <label>
                    <input type="checkbox" value="active"> Active
                </label>
                <label>
                    <input type="checkbox" value="inactive"> Inactive
                </label>
            </div>
            <button onclick="applyCustomerFilters()">Apply Filters</button>
        </div>
    `;

                document.querySelector('.order-details').innerHTML = '';
                document.querySelector('.order-details').appendChild(filterModal);
                modal.style.display = 'block';
            }

// Apply customer filters
            function applyCustomerFilters() {
                const statusFilters = Array.from(document.querySelectorAll('.filter-options input[type="checkbox"]:checked'))
                    .map(input => input.value);

                const filteredCustomers = customers.filter(customer => {
                    const statusMatch = statusFilters.length === 0 || statusFilters.includes(customer.status);

                    return statusMatch;
                });

                displayFilteredCustomers(filteredCustomers);
                modal.style.display = 'none';
            }

// Display filtered customers
            function displayFilteredCustomers(filteredCustomers) {
                const tableBody = document.getElementById('customersTableBody');
                tableBody.innerHTML = '';

                if (filteredCustomers.length === 0) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
            <td colspan="8" class="empty-table-indicator">No customers found</td>
        `;
                    tableBody.appendChild(row);
                } else {
                    filteredCustomers.forEach(customer => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.totalOrders}</td>
                <td>${customer.totalSpent}</td>
                <td>${customer.lastOrder}</td>
                <td>
                    <span class="status-tag status-${customer.status.toLowerCase()}">
                        ${customer.status}
                    </span>
                </td>
                <td>
                    <button class="action-btn edit-customer-btn" data-id="${customer.id}">
                        <img src="./Sources/EditPenIcon.png" class="edit"></img>
                    </button>
                </td>
            `;
                        tableBody.appendChild(row);
                    });
                }
            }

            function showCustomerDetails(customerId) {
                const customer = customers.find(c => c.id === customerId);
                if (customer) {
                    const modalContent = `
            <div class="detail-row">
                <span class="label">Customer ID:</span>
                <span class="value">${customer.id}</span>
            </div>
            <div class="detail-row">
                <span class="label">Name:</span>
                <span class="value">${customer.name}</span>
            </div>
            <div class="detail-row">
                <span class="label">Email:</span>
                <span class="value">${customer.email}</span>
            </div>
            <div class="detail-row">
                <span class="label">Total Orders:</span>
                <span class="value">${customer.totalOrders}</span>
            </div>
            <div class="detail-row">
                <span class="label">Total Spent:</span>
                <span class="value">${customer.totalSpent}</span>
            </div>
            <div class="detail-row">
                <span class="label">Last Order:</span>
                <span class="value">${customer.lastOrder}</span>
            </div>
            <div class="detail-row">
                <span class="label">Status:</span>
                <span class="value">${customer.status}</span>
            </div>
        `;
                    document.querySelector('.order-details').innerHTML = modalContent;
                    modal.style.display = 'block';
                }
            }

// Function to edit customer details
            function editCustomerDetails(customerId) {
                // Fetch the customer data from the backend (customers.json)
                fetch(`/CAT-Project-WebApp/customers/${customerId}`)
                    .then(response => response.json())
                    .then(customer => {
                        if (customer) {
                            // Create the form with only editable fields that need to be shown (e.g., name, email, status)
                            const editForm = `
                    <div class="customer-form">
                        <h3>Edit Customer ${customer.id}</h3>
                        <form id="editCustomerForm">
                            <div class="form-group">
                                <label>Name:</label>
                                <input type="text" name="name" value="${customer.name}" readonly>
                            </div>
                            <div class="form-group">
                                <label>Email:</label>
                                <input type="email" name="email" value="${customer.email}" readonly>
                            </div>
                            <div class="form-group">
                                <label>Status:</label>
                                <select name="status">
                                    <option value="active" ${customer.status === 'active' ? 'selected' : ''}>Active</option>
                                    <option value="inactive" ${customer.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                                </select>
                            </div>
                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                `;
                            document.querySelector('.order-details').innerHTML = editForm;
                            modal.style.display = 'block';

                            // Listen for form submission
                            document.getElementById('editCustomerForm').addEventListener('submit', function (e) {
                                e.preventDefault();

                                // Create an updated customer object with the form values
                                const updatedCustomer = {
                                    id: customer.id,
                                    name: this.name.value,
                                    email: this.email.value,
                                    status: this.status.value,
                                    password: customer.password,  // Retain the original password
                                    totalSpent: customer.totalSpent,  // Retain the original totalSpent
                                    lastOrder: customer.lastOrder  // Retain the original lastOrder
                                };

                                // Send the updated customer data to the backend
                                fetch(`/CAT-Project-WebApp/customers/${customer.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(updatedCustomer)
                                })
                                    .then(response => {
                                        return response.json();  // This will now properly parse the JSON response
                                    })
                                    .then(data => {
                                        // On success, close the modal and refresh the customer list
                                        alert("Customer updated successfully!");
                                        modal.style.display = 'none';
                                        fetchCustomerData();
                                        displayCustomersPage(currentCustomerPage); // Refresh the customers table
                                    })
                            });
                        } else {
                            alert("Customer not found!");
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching customer:", error);
                        alert("Failed to load customer details.");
                    });
            }
