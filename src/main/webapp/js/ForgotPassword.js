document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const statusMessage = document.querySelector('.status-message');
  const statusTitle = document.querySelector('.status-title');
  const errorMessage = document.getElementById('error-message-1');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const continueBtn = document.getElementById('continue-btn');
  const resetBtn = document.getElementById('reset-btn');
  const emailHolder = document.getElementById('email');
  const verificationCodeHolder = document.getElementById('verification-code');

  document.getElementById('reset-btn').addEventListener('click', () => {
    const email = emailInput.value.trim();

    // Clear previous error messages
    errorMessage.textContent = '';

    // Check if email exists in customers
    fetch('/CAT-Project-WebApp/customers')
        .then(response => response.json())
        .then(customers => {
          const user = customers.find(c => c.email === email);

          if (!user) {
            // If email doesn't exist, show error message
            errorMessage.textContent = 'Email does not exist.';
            return;
          }

          // If email exists, proceed with verification
          statusTitle.textContent = 'User Verification';
          statusMessage.textContent = 'Enter your verification code';

          if (continueBtn) continueBtn.style.display = 'block';
          if (resetBtn) resetBtn.style.display = 'none';
          if (verificationCodeHolder) verificationCodeHolder.style.display = 'block';
          if (emailHolder) emailHolder.style.display = 'none';
          if (confirmPasswordInput) confirmPasswordInput.style.display = 'block';
        })
        .catch(error => {
          console.error('Error:', error);
          errorMessage.textContent = 'An error occurred. Please try again.';
        });
  });
});

document.getElementById('continue-btn').addEventListener('click', () => {
  const verificationCode = document.getElementById('verification-code').value;
  const errorMessage = document.getElementById('error-message-2');

  if (verificationCode === '999999') {
    // Redirect to ResetPassword.html with email in the query string
    const email = document.getElementById('email').value;
    window.location.href = `ResetPassword.html?email=${encodeURIComponent(email)}`;
  } else {
    errorMessage.textContent = 'Incorrect verification code. Please try again.';
  }
});



// Fetch header
fetch('Header-HomeBar.html')
	.then(response => response.text())
	.then(data => {
			document.getElementById('header').innerHTML = data;
	});

// Fetch footer
fetch("Footer-BottomBar.html")
.then(response => response.text())
.then(data => {
	document.getElementById("footer").innerHTML = data;
});