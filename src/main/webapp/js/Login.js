
const admin = [
  {email: "admin@example.com", password: 'admin123'}
]

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

  // Check if the email belongs to admin
  const adminUser = admin.find((a) => a.email === email);
  if (adminUser) {
    if (adminUser.password === password) {
      window.location.href = 'AdminPanel.html'; // Redirect to admin page
    } else {
      errorMessage2.textContent = 'Incorrect password for admin.';
    }
    return;
  }

  // Fetch customer data and check credentials
  fetch('/CAT-Project-WebApp/customers')
      .then(response => response.json())
      .then(customers => {
        const user = customers.find(c => c.email === email);

        if (!user) {
          errorMessage1.textContent = 'Email does not exist.';
          return;
        }

        // Validate password for regular customer
        if (!password) {
          errorMessage2.textContent = 'Password is required.';
          return;
        } else if (user.password !== password) {
          errorMessage2.textContent = 'Incorrect password. Please try again.';
          return;
        }

        window.location.href = 'mainPage.html'; // Redirect to main page for regular users
      })
      .catch(error => {
        console.error('Error fetching customers data:', error);
        errorMessage1.textContent = 'An error occurred while checking credentials. Please try again later.';
      });
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