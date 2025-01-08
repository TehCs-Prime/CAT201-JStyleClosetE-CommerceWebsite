// Sample data - Replace with your actual data source
const orders = [
    {
        id: '#12345',
        customer: 'John Doe',
        products: ['Little Cupid Long Dress', "X'mas Gift Set"],
        total: 'RM 164.00',
        status: 'pending',
        date: '2025-01-08'
    },
    {
        id: '#12346',
        customer: 'Jane Smith',
        products: ['Elegant Silk Scarf'],
        total: 'RM 45.00',
        status: 'completed',
        date: '2025-01-07'
    }
];

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

// Populate orders table
function populateOrdersTable() {
    const tableBody = document.getElementById('ordersTableBody');
    tableBody.innerHTML = '';

    if (orders.length === 0) {
        // Show indicator if no data is present
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="7" class="empty-table-indicator">No orders available</td>
        `;
        tableBody.appendChild(row);
    }
    else {
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
                <button class="action-btn view-btn" data-id="${order.id}">
                    <img src="/Sources/EyeIcon.png" class="eye"></img>
                </button>
                <button class="action-btn edit-btn" data-id="${order.id}">
                    <img src="/Sources/EditPenIcon.png" class="edit"></img>
                </button>
                <button class="action-btn delete-btn" data-id="${order.id}">
                    <img src="/Sources/TrashIcon.png" class="trash"></img>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    }
    
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
function handleEditOrder(orderId) {
    // Implementation for editing order
    const order = orders.find(o => o.id === orderId);
    if (order) {
        // Create edit form
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
        
        // Show in modal
        document.querySelector('.order-details').innerHTML = '';
        document.querySelector('.order-details').appendChild(editForm);
        modal.style.display = 'block';

        // Handle form submission
        document.getElementById('editOrderForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const newStatus = this.status.value;
            // Update order status
            order.status = newStatus;
            // Refresh table
            populateOrdersTable();
            // Close modal
            modal.style.display = 'none';
        });
    }
}

// Handle delete order
function handleDeleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        // Remove order from array
        const index = orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            orders.splice(index, 1);
            // Refresh table
            populateOrdersTable();
        }
    }
}

// Populate table with filtered data
function populateOrdersTableWithData(data) {
    const tableBody = document.getElementById('ordersTableBody');
    tableBody.innerHTML = '';

    if (data.length === 0) {
        // Show indicator if no data is present
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="7" class="empty-table-indicator">No orders available</td>
        `;
        tableBody.appendChild(row);
    }
    else {
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
                <button class="action-btn view-btn" data-id="${order.id}">
                    <img src="/Sources/EyeIcon.png" class="eye"></img>
                </button>
                <button class="action-btn edit-btn" data-id="${order.id}">
                    <img src="/Sources/EditPenIcon.png" class="edit"></img>
                </button>
                <button class="action-btn delete-btn" data-id="${order.id}">
                    <img src="/Sources/TrashIcon.png" class="trash"></img>
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

    // Filter orders based on selected criteria
    const filteredOrders = orders.filter(order => {
        // Check if order status matches the selected filter options
        const statusMatch = filterOptions.status.length === 0 || filterOptions.status.includes(order.status);

        // Check if order date matches the selected date range filter
        const dateMatch = checkDateRange(order.date, filterOptions.dateRange);

        return statusMatch && dateMatch;
    });

    // Populate the table with filtered data
    populateOrdersTableWithData(filteredOrders);

    // Close the filter modal
    modal.style.display = 'none';
    console.log(filterOptions);
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

// Filter functionality
const filterBtn = document.querySelector('.filter-btn');
filterBtn.addEventListener('click', function() {
    const filterOptions = {
        status: ['pending', 'processing', 'completed', 'cancelled'],
        dateRange: ['-','today', 'week', 'month', 'year']
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
});

console.log(closeModal); // Should not be null
if (!closeModal) {
    console.error('close-modal element not found in the DOM.');
}