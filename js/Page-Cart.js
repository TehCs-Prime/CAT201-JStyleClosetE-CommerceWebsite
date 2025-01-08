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