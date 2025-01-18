document.getElementById('reset-btn').addEventListener('click', () => {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const errorMessage1 = document.getElementById('error-message-1');
  const errorMessage2 = document.getElementById('error-message-2');
  const resetContainer = document.querySelector('.reset-pw-container');
  const successContainer = document.querySelector('.reset-success-container');

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  errorMessage1.textContent = '';
  errorMessage2.textContent = '';

  if (confirmPassword !== password) {
    errorMessage2.textContent = 'Passwords do not match. Please try again.';

    if (!passwordRegex.test(password)) {
      errorMessage1.textContent = 'Password must be at least 8 characters long and contain both letters and numbers.';
      return;
    }
    return;
  }

  if (!passwordRegex.test(password)) {
      errorMessage1.textContent = 'Password must be at least 8 characters long and contain both letters and numbers.';
      return;
  }

  resetContainer.style.display = 'none';
  successContainer.style.display = 'flex';
});

// Function to get query parameters from the URL
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Extract the email from the query string
const email = getQueryParam('email');
console.log(email); // You can use this email for further processing (e.g., updating the password)

document.getElementById('reset-btn').addEventListener('click', () => {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const errorMessage1 = document.getElementById('error-message-1');
  const errorMessage2 = document.getElementById('error-message-2');
  const resetContainer = document.querySelector('.reset-pw-container');
  const successContainer = document.querySelector('.reset-success-container');

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  errorMessage1.textContent = '';
  errorMessage2.textContent = '';

  if (confirmPassword !== password) {
    errorMessage2.textContent = 'Passwords do not match. Please try again.';
    return;
  }

  if (!passwordRegex.test(password)) {
    errorMessage1.textContent = 'Password must be at least 8 characters long and contain both letters and numbers.';
    return;
  }

  // Assuming email is retrieved from the query string
  if (email) {
    // Send PUT request to update the password for the customer
    fetch(`/CAT-Project-WebApp/customers?email=${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: password }),
    })
        .then(response => response.json())
        .then(data => {
          resetContainer.style.display = 'none';
          successContainer.style.display = 'flex';
        })
        .catch(error => {
          console.error('Error:', error);
          errorMessage1.textContent = 'An error occurred while updating the password.';
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