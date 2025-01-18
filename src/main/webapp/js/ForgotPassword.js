document.getElementById('reset-btn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const statusMessage = document.querySelector('.status-message');
  const statusTitle = document.querySelector('.status-title');
  const errorMessage = document.getElementById('error-message-1');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const continueBtn = document.getElementById('continue-btn');
  const resetBtn = document.getElementById('reset-btn');
  const emailHolder = document.getElementById('email');
  const verificationCodeHolder = document.getElementById('verification-code');

  errorMessage.textContent = '';

  if (email) {
    statusTitle.textContent = 'User Verification';
    statusMessage.textContent = 'Enter your verification code';

    continueBtn.style.display = 'block';
    resetBtn.style.display = 'none';
    verificationCodeHolder.style.display = 'block';
    emailHolder.style.display = 'none';

    // Show the confirm password field (if needed for verification)
    confirmPasswordInput.style.display = 'block';
  } else {
    // If no email is entered, you can show an error message or just do nothing
    errorMessage.textContent ='Please enter your recovery email.';
  }
});

document.getElementById('continue-btn').addEventListener('click', () => {
  const verificationCode = document.getElementById('verification-code').value;
  const errorMessage = document.getElementById('error-message-2');

  if (verificationCode === '999999') {
    window.location.href = 'ResetPassword.html';
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