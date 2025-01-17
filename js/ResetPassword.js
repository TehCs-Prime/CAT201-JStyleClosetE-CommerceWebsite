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

  // Simulate password update
  errorMessage2.style.color = 'green';
  errorMessage2.textContent = 'Password has been successfully reset.';

  resetContainer.style.display = 'none';
  successContainer.style.display = 'flex';
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