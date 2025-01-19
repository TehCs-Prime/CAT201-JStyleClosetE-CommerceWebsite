document.querySelectorAll('.decrement').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const input = e.target.nextElementSibling;
      const currentValue = parseInt(input.value);

      if (currentValue > 1) {
      input.value = currentValue - 1;
      updateTotals();
    } else if (currentValue === 1) {
      
      const row = e.target.closest('tr');
      
      // Show confirmation dialog
      if (confirm('Are you sure you want to remove this item from your cart?')) {
        
        row.style.transition = 'opacity 0.3s';
        row.style.opacity = '0';
        
        setTimeout(() => {
          row.remove();
          updateTotals();
          
          // Check if cart is empty
          const remainingItems = document.querySelectorAll('tbody tr');
          if (remainingItems.length === 0) {
            const cartTable = document.querySelector('.cart-table');
            cartTable.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 20px;">Your cart is empty</td></tr>';
          }
        }, 300);
      }
    }
  });
});
  
  document.querySelectorAll('.increment').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const input = e.target.previousElementSibling;
      input.value = parseInt(input.value) + 1;
      updateTotals();
    });
  });
  
  document.querySelectorAll('.quantity input').forEach((input) => {
    input.addEventListener('input', (e) => {
      // Ensure the value is at least 1
      let value = parseInt(e.target.value) || 1;
      if (value < 1) value = 1;
      e.target.value = value;
      updateTotals();
    });
  
    // Prevent invalid input
    input.addEventListener('keypress', (e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    });
  });

  function updateTotals() {
    const rows = document.querySelectorAll('tbody tr');
    let orderValue = 0;
  
    rows.forEach((row) => {
      const price = parseFloat(row.querySelector('.price').textContent.replace('RM', ''));
      const quantity = parseInt(row.querySelector('input').value);
      orderValue += price * quantity;
    });
  
    document.querySelector('.order-summary-value span').textContent = `RM ${orderValue.toFixed(2)}`;
    document.querySelector('.subtotal').textContent = `RM ${(orderValue - 4).toFixed(2)}`;
  }
  
// Get modal elements
const modal = document.getElementById('voucherModal');
const closeBtn = document.querySelector('.close');
const voucherSection = document.querySelector('.voucher-section');

// Open modal when clicking on voucher section
voucherSection.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Close modal when clicking on X
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Handle discount code application
const applyBtn = document.querySelector('.apply-btn');
const discountInput = document.getElementById('discountCode');

applyBtn.addEventListener('click', () => {
  const code = discountInput.value.trim();
  if (code) {
    // Here you would typically validate the code with your backend
    // For now, we'll just show an alert
    alert('Discount code applied: ' + code);
    modal.style.display = 'none';
    
    // Update the discount in the cart summary (example)
    document.querySelector('.discount').textContent = '- RM 100.00';
    updateTotals();
  } else {
    alert('Please enter a discount code');
  }
});

const checkoutBtn = document.querySelector('.checkout-btn');
const checkoutDetails = document.querySelector('.checkout-details');
const placeOrderBtn = document.querySelector('.place-order-btn');

checkoutBtn.addEventListener('click', () => {
  // Scroll to checkout details smoothly
  checkoutDetails.style.display = 'block';
  checkoutDetails.scrollIntoView({ behavior: 'smooth' });

  checkoutBtn.style.visibility = 'hidden';
});

// Place order button click logic
placeOrderBtn.addEventListener('click', () => {
  // Retrieve user email from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userEmail = currentUser ? currentUser.email : null;

  if (!userEmail) {
    alert("Please log in to place the order.");
    return;
  }

  // Fetch the orders to find the ones associated with the current user and that are in 'pending' status
  fetch('/CAT-Project-WebApp/orders')
      .then(response => response.json())
      .then(orders => {
        const ordersToPlace = orders.filter(order =>
            order.customer === userEmail && order.status === "processing"
        );

        if (ordersToPlace.length === 0) {
          alert("No pending orders found to place.");
          return;
        }

        // Optionally, you can perform other actions like processing payment or confirming the order
        // For example, mark the orders as "completed" or "placed"
        const placeOrderPromises = ordersToPlace.map(order => {
          const updatedOrder = {
            ...order,
            status: "pending" // Changing status to "placed"
          };

          // Send a PUT request to update the order status
          return fetch(`/CAT-Project-WebApp/orders/${order.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedOrder)
          });
        });

        // Wait for all updates to be completed
        Promise.all(placeOrderPromises)
            .then(() => {
              alert("Your order has been placed successfully!");
              // Optionally, redirect to another page or update UI
              location.reload(); // Reload the page to reflect the changes
            })
            .catch(error => {
              console.error("Error placing orders:", error);
              alert("Failed to place the order.");
            });
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
        alert("Failed to load orders.");
      });
});

// Handle payment option selection
const paymentOptions = document.querySelectorAll('.payment-option');
paymentOptions.forEach(option => {
  option.addEventListener('click', () => {
    // Find the radio input within the clicked option and check it
    const radio = option.querySelector('input[type="radio"]');
    radio.checked = true;
    
    // Add selected styling
    paymentOptions.forEach(opt => opt.style.borderColor = '#ddd');
    option.style.borderColor = '#66afe9';
  });
});

// Form validation before placing order
placeOrderBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Get all required inputs
  const requiredInputs = document.querySelectorAll('.form-group input[required], .form-group select[required], .form-group textarea[required]');
  let isValid = true;
  
  // Check if all required fields are filled
  requiredInputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.style.borderColor = '#ff0000';
    } else {
      input.style.borderColor = '#ddd';
    }
  });
  
  // Check if payment method is selected
  const paymentMethod = document.querySelector('input[name="payment"]:checked');
  if (!paymentMethod) {
    isValid = false;
    alert('Please select a payment method');
    return;
  }
  
  if (isValid) {
    // Here you would typically submit the order to your backend
    alert('Order placed successfully!');
    window.location.href = 'UserProfile.html';
    // Return to home page ? or to order history
  } else {
    alert('Please fill in all required fields');
  }
});