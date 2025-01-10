// Sample data - Replace with your actual data source
let currentPage = 1;
const ordersPerPage = 10;
let currentCustomerPage = 1;
const customersPerPage = 10;

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

const products = [
    { id: 'P001', name: 'Comfort Fit T-shirt', category: 'T-shirts', price: 'RM 39.00', stock: 70, status: 'In Stock' },
    { id: 'P002', name: 'V-Neck Top', category: 'Top', price: 'RM 49.00', stock: 20, status: 'In Stock' },
    { id: 'P003', name: 'High-Waist Skinny Jeans', category: 'Bottom', price: 'RM 89.00', stock: 5, status: 'Low Stock' },
    { id: 'P004', name: 'Floral Summer Dress', category: 'Dress', price: 'RM 109.00', stock: 0, status: 'Out of Stock' },
    { id: 'P005', name: 'Classic Black Blazer', category: 'Outwear', price: 'RM 199.00', stock: 15, status: 'In Stock' },
    { id: 'P006', name: 'Basic Crew Neck Tee', category: 'Basic', price: 'RM 29.00', stock: 100, status: 'In Stock' },
    { id: 'P007', name: 'CNY Red Blouse', category: 'CNYSales', price: 'RM 79.00', stock: 30, status: 'In Stock' },
    { id: 'P008', name: 'Final Markdown Midi Skirt', category: 'LastChances', price: 'RM 59.00', stock: 3, status: 'Low Stock' },
    { id: 'P009', name: 'Loose Fit T-shirt', category: 'T-shirts', price: 'RM 35.00', stock: 50, status: 'In Stock' },
    { id: 'P010', name: 'Sleeveless Basic Top', category: 'Basic', price: 'RM 39.00', stock: 25, status: 'In Stock' },
    { id: 'P011', name: 'Elegant Evening Gown', category: 'Dress', price: 'RM 259.00', stock: 8, status: 'Low Stock' },
    { id: 'P012', name: 'Light Denim Shorts', category: 'Bottom', price: 'RM 79.00', stock: 0, status: 'Out of Stock' },
    { id: 'P013', name: 'Fitted Blouse', category: 'Top', price: 'RM 69.00', stock: 60, status: 'In Stock' },
    { id: 'P014', name: 'CNY Printed Qipao', category: 'CNYSales', price: 'RM 149.00', stock: 10, status: 'In Stock' },
    { id: 'P015', name: 'Oversized Cardigan', category: 'Outwear', price: 'RM 149.00', stock: 12, status: 'In Stock' },
    { id: 'P016', name: 'Final Clearance Joggers', category: 'LastChances', price: 'RM 79.00', stock: 2, status: 'Low Stock' },
    { id: 'P017', name: 'Ribbed Tank Top', category: 'Top', price: 'RM 45.00', stock: 40, status: 'In Stock' },
    { id: 'P018', name: 'Slim Fit Chinos', category: 'Bottom', price: 'RM 109.00', stock: 15, status: 'In Stock' },
    { id: 'P019', name: 'Graphic Print T-shirt', category: 'T-shirts', price: 'RM 49.00', stock: 0, status: 'Out of Stock' },
    { id: 'P020', name: 'Wrap Maxi Dress', category: 'Dress', price: 'RM 169.00', stock: 20, status: 'In Stock' },
    { id: 'P021', name: 'Hooded Sweatshirt', category: 'Outwear', price: 'RM 119.00', stock: 25, status: 'In Stock' },
    { id: 'P022', name: 'Final Sale Leggings', category: 'LastChances', price: 'RM 49.00', stock: 1, status: 'Low Stock' },
    { id: 'P023', name: 'CNY Satin Skirt', category: 'CNYSales', price: 'RM 99.00', stock: 35, status: 'In Stock' },
    { id: 'P024', name: 'Basic Sweatpants', category: 'Basic', price: 'RM 69.00', stock: 50, status: 'In Stock' },
    { id: 'P025', name: 'Wide Leg Trousers', category: 'Bottom', price: 'RM 139.00', stock: 5, status: 'Low Stock' },
    { id: 'P026', name: 'Casual Striped T-shirt', category: 'T-shirts', price: 'RM 39.00', stock: 45, status: 'In Stock' },
    { id: 'P027', name: 'Lace Party Dress', category: 'Dress', price: 'RM 199.00', stock: 0, status: 'Out of Stock' },
    { id: 'P028', name: 'Cropped Jacket', category: 'Outwear', price: 'RM 179.00', stock: 18, status: 'In Stock' },
    { id: 'P029', name: 'CNY Floral Tank Top', category: 'CNYSales', price: 'RM 59.00', stock: 60, status: 'In Stock' },
    { id: 'P030', name: 'Last Call Denim Jacket', category: 'LastChances', price: 'RM 99.00', stock: 4, status: 'Low Stock' }
];

const customers = [
    { id: 'C001', name: 'John Doe', email: 'john.doe@email.com', totalOrders: 5, totalSpent: 'RM 824.00', lastOrder: '2025-01-08', status: 'active' },
    { id: 'C002', name: 'Jane Smith', email: 'jane.smith@email.com', totalOrders: 3, totalSpent: 'RM 245.00', lastOrder: '2025-01-07', status: 'active' },
    { id: 'C003', name: 'Alice Brown', email: 'alice.b@email.com', totalOrders: 8, totalSpent: 'RM 1230.00', lastOrder: '2025-01-06', status: 'active' },
    { id: 'C004', name: 'Michael Green', email: 'm.green@email.com', totalOrders: 2, totalSpent: 'RM 320.00', lastOrder: '2025-01-05', status: 'inactive' },
    { id: 'C005', name: 'Emily White', email: 'e.white@email.com', totalOrders: 6, totalSpent: 'RM 900.00', lastOrder: '2025-01-04', status: 'active' },
    { id: 'C006', name: 'David Black', email: 'david.b@email.com', totalOrders: 1, totalSpent: 'RM 80.00', lastOrder: '2025-01-03', status: 'inactive' },
    { id: 'C007', name: 'Sophia Gray', email: 's.gray@email.com', totalOrders: 4, totalSpent: 'RM 610.00', lastOrder: '2025-01-02', status: 'active' },
    { id: 'C008', name: 'Daniel Wilson', email: 'd.wilson@email.com', totalOrders: 7, totalSpent: 'RM 1150.00', lastOrder: '2025-01-01', status: 'active' },
    { id: 'C009', name: 'Laura Evans', email: 'l.evans@email.com', totalOrders: 3, totalSpent: 'RM 385.00', lastOrder: '2024-12-31', status: 'active' },
    { id: 'C010', name: 'Chris Taylor', email: 'c.taylor@email.com', totalOrders: 2, totalSpent: 'RM 195.00', lastOrder: '2024-12-30', status: 'inactive' },
    { id: 'C011', name: 'Oliver Harris', email: 'o.harris@email.com', totalOrders: 9, totalSpent: 'RM 1600.00', lastOrder: '2025-01-09', status: 'active' },
    { id: 'C012', name: 'Megan Johnson', email: 'm.johnson@email.com', totalOrders: 3, totalSpent: 'RM 250.00', lastOrder: '2025-01-07', status: 'inactive' },
    { id: 'C013', name: 'James Miller', email: 'james.m@email.com', totalOrders: 5, totalSpent: 'RM 785.00', lastOrder: '2025-01-06', status: 'active' },
    { id: 'C014', name: 'Rachel Moore', email: 'r.moore@email.com', totalOrders: 2, totalSpent: 'RM 150.00', lastOrder: '2025-01-05', status: 'inactive' },
    { id: 'C015', name: 'Henry Lee', email: 'h.lee@email.com', totalOrders: 8, totalSpent: 'RM 1300.00', lastOrder: '2025-01-04', status: 'active' },
    { id: 'C016', name: 'Zoe Harris', email: 'z.harris@email.com', totalOrders: 4, totalSpent: 'RM 500.00', lastOrder: '2025-01-03', status: 'active' },
    { id: 'C017', name: 'George King', email: 'g.king@email.com', totalOrders: 7, totalSpent: 'RM 1100.00', lastOrder: '2025-01-02', status: 'active' },
    { id: 'C018', name: 'Lily Clark', email: 'l.clark@email.com', totalOrders: 3, totalSpent: 'RM 315.00', lastOrder: '2025-01-01', status: 'inactive' },
    { id: 'C019', name: 'Jack Adams', email: 'j.adams@email.com', totalOrders: 6, totalSpent: 'RM 950.00', lastOrder: '2024-12-31', status: 'active' },
    { id: 'C020', name: 'Charlotte White', email: 'charlotte.w@email.com', totalOrders: 4, totalSpent: 'RM 620.00', lastOrder: '2024-12-30', status: 'active' },
    { id: 'C021', name: 'Oscar Scott', email: 'o.scott@email.com', totalOrders: 5, totalSpent: 'RM 825.00', lastOrder: '2024-12-29', status: 'inactive' },
    { id: 'C022', name: 'Emma Walker', email: 'e.walker@email.com', totalOrders: 2, totalSpent: 'RM 210.00', lastOrder: '2024-12-28', status: 'active' },
    { id: 'C023', name: 'Lucas Turner', email: 'l.turner@email.com', totalOrders: 3, totalSpent: 'RM 375.00', lastOrder: '2024-12-27', status: 'active' },
    { id: 'C024', name: 'Sophie Robinson', email: 's.robinson@email.com', totalOrders: 7, totalSpent: 'RM 1050.00', lastOrder: '2024-12-26', status: 'inactive' },
    { id: 'C025', name: 'William Martinez', email: 'w.martinez@email.com', totalOrders: 1, totalSpent: 'RM 50.00', lastOrder: '2024-12-25', status: 'inactive' },
    { id: 'C026', name: 'Chloe Evans', email: 'c.evans@email.com', totalOrders: 6, totalSpent: 'RM 870.00', lastOrder: '2024-12-24', status: 'active' },
    { id: 'C027', name: 'Benjamin Rodriguez', email: 'b.rodriguez@email.com', totalOrders: 2, totalSpent: 'RM 230.00', lastOrder: '2024-12-23', status: 'inactive' },
    { id: 'C028', name: 'Madison Martinez', email: 'm.martinez@email.com', totalOrders: 8, totalSpent: 'RM 1155.00', lastOrder: '2024-12-22', status: 'active' },
    { id: 'C029', name: 'Joshua Lopez', email: 'j.lopez@email.com', totalOrders: 4, totalSpent: 'RM 520.00', lastOrder: '2024-12-21', status: 'active' },
    { id: 'C030', name: 'Amelia Perez', email: 'a.perez@email.com', totalOrders: 3, totalSpent: 'RM 400.00', lastOrder: '2024-12-20', status: 'inactive' }
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
    populateProductsTable();
    displayCustomersPage(1);
    setupCustomerEventListeners();
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

function populateProductsTable() {
    const PtableBody = document.getElementById('productsTableBody');
    if (!PtableBody) {
        const productsSection = document.getElementById('products');
        productsSection.innerHTML = ``;
    }

    PtableBody.innerHTML = '';
    
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
                <button class="action-btn edit-btn" data-id="${product.id}">
                    <img src="/Sources/EditPenIcon.png" class="edit"></img>
                </button>
                <button class="action-btn Pdelete-btn" data-id="${product.id}">
                    <img src="/Sources/TrashIcon.png" class="trash"></img>
                </button>
            </td>
        `;
        PtableBody.appendChild(row);
    });
}

function handleAddProduct() {
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
                <button type="submit">Add Product</button>
            </form>
        </div>
    `;

    document.querySelector('.order-details').innerHTML = '';
    document.querySelector('.order-details').appendChild(productForm);
    modal.style.display = 'block';

    document.getElementById('addProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const newProduct = {
            id: 'P' + (products.length + 1).toString().padStart(3, '0'),
            name: this.name.value,
            category: this.category.value,
            price: 'RM ' + parseFloat(this.price.value).toFixed(2),
            stock: parseInt(this.stock.value),
            status: parseInt(this.stock.value) === 0 ? 'Out of Stock' : 
                   parseInt(this.stock.value) <= 10 ? 'Low Stock' : 'In Stock'
        };
        products.push(newProduct);
        populateProductsTable();
        modal.style.display = 'none';
    });
}

// Add event listeners
document.addEventListener('click', function(e) {
    if (e.target.closest('.add-product-btn')) {
        handleAddProduct();
    } else if (e.target.closest('.edit-btn')) {
        const productId = e.target.closest('.edit-btn').getAttribute('data-id');
        handleEditProduct(productId);
    } else if (e.target.closest('.Pdelete-btn')) {
        const productId = e.target.closest('.Pdelete-btn').getAttribute('data-id');
        handleDeleteProduct(productId);
    }
});

function handleEditProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const editForm = document.createElement('div');
        editForm.innerHTML = `
            <div class="product-form">
                <h3>Edit Product ${product.id}</h3>
                <form id="editProductForm">
                    <div class="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" value="${product.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Category:</label>
                        <select name="category" required>
                            <option value="Clothing" ${product.category === 'Clothing' ? 'selected' : ''}>Clothing</option>
                            <option value="Accessories" ${product.category === 'Accessories' ? 'selected' : ''}>Accessories</option>
                            <option value="Gifts" ${product.category === 'Gifts' ? 'selected' : ''}>Gifts</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Price (RM):</label>
                        <input type="number" name="price" step="0.01" value="${product.price.replace('RM ', '')}" required>
                    </div>
                    <div class="form-group">
                        <label>Stock:</label>
                        <input type="number" name="stock" value="${product.stock}" required>
                    </div>
                    <button type="submit">Update Product</button>
                </form>
            </div>
        `;

        document.querySelector('.order-details').innerHTML = '';
        document.querySelector('.order-details').appendChild(editForm);
        modal.style.display = 'block';

        document.getElementById('editProductForm').addEventListener('submit', function(e) {
            e.preventDefault();
            product.name = this.name.value;
            product.category = this.category.value;
            product.price = 'RM ' + parseFloat(this.price.value).toFixed(2);
            product.stock = parseInt(this.stock.value);
            product.status = parseInt(this.stock.value) === 0 ? 'Out of Stock' : 
                           parseInt(this.stock.value) <= 10 ? 'Low Stock' : 'In Stock';
            
            populateProductsTable();
            modal.style.display = 'none';
        });
    }
}

function handleDeleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products.splice(index, 1);
            populateProductsTable();
        }
    }
}

document.querySelector('.filter-btn-products').addEventListener('click', function() {
    // Get unique categories from products
    const categories = [...new Set(products.map(product => product.category))];
    
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
document.querySelector('.reset-btn-products').addEventListener('click', function() {
    populateProductsTable();
});

function applyProductsFilters() {
    const filterOptions = {
        categories: Array.from(document.querySelectorAll('.filter-options input[type="checkbox"]:checked'))
            .map(input => input.value)
    };

    const filteredProducts = products.filter(product => {
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
                    <button class="action-btn edit-btn" data-id="${product.id}">
                        <img src="/Sources/EditPenIcon.png" class="edit"></img>
                    </button>
                    <button class="action-btn Pdelete-btn" data-id="${product.id}">
                        <img src="/Sources/TrashIcon.png" class="trash"></img>
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
function displayCustomersPage(page) {
    const startIndex = (page - 1) * customersPerPage;
    const endIndex = startIndex + customersPerPage;
    const paginatedCustomers = customers.slice(startIndex, endIndex);
    
    const tableBody = document.getElementById('customersTableBody');
    tableBody.innerHTML = '';
    
    if (paginatedCustomers.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="8" class="empty-table-indicator">No customers available</td>
        `;
        tableBody.appendChild(row);
    } else {
        paginatedCustomers.forEach(customer => {
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
                    <button class="action-btn view-customer-btn" data-id="${customer.id}">
                        <img src="/Sources/EyeIcon.png" class="eye"></img>
                    </button>
                    <button class="action-btn edit-customer-btn" data-id="${customer.id}">
                        <img src="/Sources/EditPenIcon.png" class="edit"></img>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    updateCustomerPaginationControls();
}

// Update pagination controls for customers
function updateCustomerPaginationControls() {
    const totalPages = Math.ceil(customers.length / customersPerPage);
    const pageInfo = document.getElementById('pageInfoCustomers');
    const prevBtn = document.getElementById('prevPageCustomers');
    const nextBtn = document.getElementById('nextPageCustomers');
    
    pageInfo.textContent = `Page ${currentCustomerPage} of ${totalPages}`;
    prevBtn.disabled = currentCustomerPage === 1;
    nextBtn.disabled = currentCustomerPage === totalPages;
}

// Setup event listeners for customers section
function setupCustomerEventListeners() {
    // Pagination
    document.getElementById('prevPageCustomers').addEventListener('click', () => {
        if (currentCustomerPage > 1) {
            currentCustomerPage--;
            displayCustomersPage(currentCustomerPage);
        }
    });

    document.getElementById('nextPageCustomers').addEventListener('click', () => {
        const totalPages = Math.ceil(customers.length / customersPerPage);
        if (currentCustomerPage < totalPages) {
            currentCustomerPage++;
            displayCustomersPage(currentCustomerPage);
        }
    });

    // Filter button
    document.querySelector('.filter-btn-customers').addEventListener('click', showCustomerFilters);
    
    // Reset button
    document.querySelector('.reset-btn-customers').addEventListener('click', () => {
        currentCustomerPage = 1;
        displayCustomersPage(currentCustomerPage);
    });

    document.addEventListener('click', function(e) {
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

// Show customer filters modal
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

        return statusMatch ;
    });

    displayFilteredCustomers(filteredCustomers);
    modal.style.display = 'none';
}

// Display filtered customers
function displayFilteredCustomers(filteredCustomers) {
    currentCustomerPage = 1;
    const startIndex = 0;
    const endIndex = customersPerPage;
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

    const tableBody = document.getElementById('customersTableBody');
    tableBody.innerHTML = '';

    if (paginatedCustomers.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="8" class="empty-table-indicator">No customers found</td>
        `;
        tableBody.appendChild(row);
    } else {
        paginatedCustomers.forEach(customer => {
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
                    <button class="action-btn view-customer-btn" data-id="${customer.id}">
                        <img src="/Sources/EyeIcon.png" class="eye"></img>
                    </button>
                    <button class="action-btn edit-customer-btn" data-id="${customer.id}">
                        <img src="/Sources/EditPenIcon.png" class="edit"></img>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
    const pageInfo = document.getElementById('pageInfoCustomers');
    const prevBtn = document.getElementById('prevPageCustomers');
    const nextBtn = document.getElementById('nextPageCustomers');
    
    pageInfo.textContent = `Page ${currentCustomerPage} of ${totalPages}`;
    prevBtn.disabled = currentCustomerPage === 1;
    nextBtn.disabled = currentCustomerPage === totalPages || filteredCustomers.length <= customersPerPage;
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
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
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

        document.getElementById('editCustomerForm').addEventListener('submit', function (e) {
            e.preventDefault();
            customer.name = this.name.value;
            customer.email = this.email.value;
            customer.status = this.status.value;



            displayCustomersPage(currentCustomerPage); // Refresh the customers table
            modal.style.display = 'none'; // Close modal
        });
    }
}