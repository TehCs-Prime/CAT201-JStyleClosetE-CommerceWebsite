// Sample data - Replace with your actual data source
let currentPage = 1;
const ordersPerPage = 10;
const orders = [
    { id: '#12345', customer: 'John Doe', products: ['Little Cupid Long Dress', "X'mas Gift Set"], total: 'RM 164.00', status: 'pending', date: '2025-01-08' },
    { id: '#12346', customer: 'Jane Smith', products: ['Elegant Silk Scarf'], total: 'RM 45.00', status: 'completed', date: '2025-01-07' },
    { id: '#12347', customer: 'Alice Brown', products: ['Classic Leather Wallet', 'Gift Box - Deluxe Edition'], total: 'RM 230.00', status: 'processing', date: '2025-01-06' },
    { id: '#12348', customer: 'Michael Green', products: ['Winter Wonderland Sweater'], total: 'RM 120.00', status: 'pending', date: '2025-01-08' },
    { id: '#12349', customer: 'Emily White', products: ['Pearl Necklace', 'Velvet Jewelry Box'], total: 'RM 300.00', status: 'completed', date: '2025-01-05' },
    { id: '#12350', customer: 'David Black', products: ['Digital Alarm Clock', 'Desk Organizer'], total: 'RM 80.00', status: 'cancelled', date: '2025-01-04' },
    { id: '#12351', customer: 'Sophia Gray', products: ['Fitness Tracker', 'Yoga Mat'], total: 'RM 210.00', status: 'processing', date: '2025-01-03' },
    { id: '#12352', customer: 'Daniel Wilson', products: ['Noise-Cancelling Headphones'], total: 'RM 350.00', status: 'pending', date: '2025-01-02' },
    { id: '#12353', customer: 'Laura Evans', products: ['Luxury Candle Set', 'Bathrobe'], total: 'RM 185.00', status: 'completed', date: '2025-01-01' },
    { id: '#12354', customer: 'Chris Taylor', products: ['Wireless Charger', 'Phone Case'], total: 'RM 95.00', status: 'processing', date: '2024-12-31' },
    { id: '#12355', customer: 'Mia Lopez', products: ['Floral Maxi Dress'], total: 'RM 150.00', status: 'pending', date: '2024-12-30' },
    { id: '#12356', customer: 'Liam Carter', products: ['Bluetooth Speaker'], total: 'RM 99.00', status: 'completed', date: '2024-12-29' },
    { id: '#12357', customer: 'Olivia Scott', products: ['Diamond Earrings'], total: 'RM 520.00', status: 'cancelled', date: '2024-12-28' },
    { id: '#12358', customer: 'Noah Bennett', products: ['Leather Briefcase'], total: 'RM 340.00', status: 'processing', date: '2024-12-27' },
    { id: '#12359', customer: 'Ava Morgan', products: ['Silk Tie Set'], total: 'RM 89.00', status: 'pending', date: '2024-12-26' },
    { id: '#12360', customer: 'Ethan Reed', products: ['Premium Coffee Maker'], total: 'RM 799.00', status: 'completed', date: '2024-12-25' },
    { id: '#12361', customer: 'Sophia Davis', products: ['Luxury Watch'], total: 'RM 1200.00', status: 'processing', date: '2024-12-24' },
    { id: '#12362', customer: 'Charlotte Walker', products: ['Handcrafted Vase'], total: 'RM 275.00', status: 'pending', date: '2024-12-23' },
    { id: '#12363', customer: 'James Parker', products: ['Noise-Cancelling Earbuds'], total: 'RM 350.00', status: 'cancelled', date: '2024-12-22' },
    { id: '#12364', customer: 'Emma Sanders', products: ['Wireless Keyboard', 'Mouse Combo'], total: 'RM 200.00', status: 'processing', date: '2024-12-21' },
    { id: '#12365', customer: 'Jack White', products: ['Gaming Chair'], total: 'RM 999.00', status: 'completed', date: '2024-12-20' },
    { id: '#12366', customer: 'Amelia Taylor', products: ['Smartphone Stand'], total: 'RM 45.00', status: 'pending', date: '2024-12-19' },
    { id: '#12367', customer: 'Benjamin Hill', products: ['Electric Toothbrush'], total: 'RM 145.00', status: 'cancelled', date: '2024-12-18' },
    { id: '#12368', customer: 'Harper King', products: ['Plush Toy Set'], total: 'RM 89.00', status: 'processing', date: '2024-12-17' },
    { id: '#12369', customer: 'Alexander Carter', products: ['Travel Backpack'], total: 'RM 250.00', status: 'pending', date: '2024-12-16' },
    { id: '#12370', customer: 'Grace Adams', products: ['Cookware Set'], total: 'RM 399.00', status: 'completed', date: '2024-12-15' },
    { id: '#12371', customer: 'Lucas Turner', products: ['Decorative Wall Art'], total: 'RM 500.00', status: 'processing', date: '2024-12-14' },
    { id: '#12372', customer: 'Ella Perez', products: ['Sunglasses', 'Hat'], total: 'RM 300.00', status: 'pending', date: '2024-12-13' },
    { id: '#12373', customer: 'Henry Foster', products: ['Bluetooth Earbuds'], total: 'RM 175.00', status: 'completed', date: '2024-12-12' },
    { id: '#12374', customer: 'Isabella Murphy', products: ['Gold Bracelet'], total: 'RM 450.00', status: 'cancelled', date: '2024-12-11' }
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

    const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentOrders = sortedOrders.slice(0, 15);

    if (recentOrders.length === 0) {
        // Show indicator if no data is present
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="7" class="empty-table-indicator">No orders available</td>
        `;
        tableBody.appendChild(row);
    }
    else {
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
            displayOrdersPage(currentPage);
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
            displayOrdersPage(currentPage);
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

    const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentOrders = sortedOrders.slice(0, 15);

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
    modal.style.display = 'none';
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
    populateOrdersTable();
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
    displayOrdersPage(1);
});



function displayOrdersPage(page) {
    const startIndex = (page - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    const paginatedOrders = orders.slice(startIndex, endIndex);
    
    const tableBody = document.getElementById('totalOrdersTableBody');
    tableBody.innerHTML = '';
    
    if (paginatedOrders.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="7" class="empty-table-indicator">No orders available</td>
        `;
        tableBody.appendChild(row);
    } else {
        paginatedOrders.forEach(order => {
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
    
    // Update pagination controls
    updatePaginationControls();
}

function updatePaginationControls() {
    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Event listeners for pagination
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayOrdersPage(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(orders.length / ordersPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayOrdersPage(currentPage);
    }
});

// Filter functionality for orders section
document.querySelector('.filter-btn-orders').addEventListener('click', function() {
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
document.querySelector('.reset-btn-orders').addEventListener('click', function() {
    currentPage = 1;
    displayOrdersPage(currentPage);
});

function applyOrdersFilters() {
    const filterOptions = {
        status: Array.from(document.querySelectorAll('.filter-options input[type="checkbox"]:checked')).map(input => input.value),
        dateRange: document.querySelector('.filter-options select').value
    };

    const filteredOrders = orders.filter(order => {
        const statusMatch = filterOptions.status.length === 0 || filterOptions.status.includes(order.status);
        const dateMatch = checkDateRange(order.date, filterOptions.dateRange);
        return statusMatch && dateMatch;
    });

    // Reset to first page when filtering
    populateTotalOrdersTableWithData(filteredOrders);
    modal.style.display = 'none';
} 

function populateTotalOrdersTableWithData(data) {
    currentPage = 1;
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    const tableBody = document.getElementById('totalOrdersTableBody');
    tableBody.innerHTML = '';

    if (paginatedData.length === 0) {
        // Show indicator if no data is present
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="7" class="empty-table-indicator">No orders available</td>
        `;
        tableBody.appendChild(row);
    }
    else {
        paginatedData.forEach(order => {
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
    const totalPages = Math.ceil(data.length / ordersPerPage);
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || data.length <= ordersPerPage;
}