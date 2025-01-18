

document.getElementById('signup-btn').addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();
  const errorMessage1 = document.getElementById('error-message-1');
  const errorMessage2 = document.getElementById('error-message-2');
  const errorMessage3 = document.getElementById('error-message-3');
  const errorMessage4 = document.getElementById('error-message-4');

  // Clear previous error messages
  errorMessage1.textContent = '';
  errorMessage2.textContent = '';
  errorMessage3.textContent = '';
  errorMessage4.textContent = '';

  // Validation flags
  let isValid = true;

  // Validate username
  if (!username) {
    errorMessage1.textContent = 'Name is required.';
    isValid = false;
  } else if (username.length < 3) {
    errorMessage1.textContent = 'Name must be at least 3 characters long.';
    isValid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errorMessage2.textContent = 'Email is required.';
    isValid = false;
  } else if (!emailRegex.test(email)) {
    errorMessage2.textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  // Validate password
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!password) {
    errorMessage3.textContent = 'Password is required.';
    isValid = false;
  } else if (!passwordRegex.test(password)) {
    errorMessage3.textContent = 'Password must be at least 8 characters long and include letters and numbers.';
    isValid = false;
  }

  // Validate confirm password
  if (!confirmPassword) {
    errorMessage4.textContent = 'Confirm Password is required.';
    isValid = false;
  } else if (confirmPassword !== password) {
    errorMessage4.textContent = 'Passwords do not match.';
    isValid = false;
  }

  if (isValid) {
    // Prepare the customer data (excluding the ID)
    const newCustomer = {
      name: username,
      email: email,
      password: password,
      totalOrders: 0,
      totalSpent: "RM 0.00",
      lastOrder: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
      status: "active"
    };

    // Send the customer data to the backend
    fetch('/CAT-Project-WebApp/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCustomer),
    })
        .then(response => response.json())
        .then(data => {
          alert('Sign-up successful! Please log in again.');
          window.location.href = 'Login.html';
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Sign-up failed. Please try again.');
        });
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