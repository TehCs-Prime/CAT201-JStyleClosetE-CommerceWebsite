// const users = [
//   { email: 'user1@example.com', password: 'password123' },
//   { email: 'user2@example.com', password: 'welcome456' },
//   { email: 'user3@example.com', password: 'secure789' },
// ];

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
    // const userData = {
    //   username,
    //   email,
    //   password,
    // };

    alert('Sign-up successful! Please log in again.');
    window.location.href = '../html/Login.html'; 
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