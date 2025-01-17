const users = [
  { email: 'user1@example.com', password: 'password123' },
  { email: 'user2@example.com', password: 'welcome456' },
  { email: 'user3@example.com', password: 'secure789' },
];

document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage1 = document.getElementById('error-message-1');
  const errorMessage2 = document.getElementById('error-message-2');

  // Clear previous error messages
  errorMessage1.textContent = '';
  errorMessage2.textContent = '';

  // Validate email format using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errorMessage1.textContent = 'Email is required.';
    return;
  } else if (!emailRegex.test(email)) {
    errorMessage1.textContent = 'Please enter a valid email address.';
    return;
  }

  // Find user in sample data
  const user = users.find((u) => u.email === email);

  if (!user) {
    errorMessage1.textContent = 'Email does not exist.';
    return;
  }

  // Validate password
  if (!password) {
    errorMessage2.textContent = 'Password is required.';
    return;
  } else if (user.password !== password) {
    errorMessage2.textContent = 'Incorrect password. Please try again.';
    return;
  }

  window.location.href = '../html/mainPage.html'; 
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