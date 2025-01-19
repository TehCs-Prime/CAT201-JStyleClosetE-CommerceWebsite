const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

if (currentUser) {
	// Access user's email, name, and orders
	console.log(currentUser.email);  // Access email
	console.log(currentUser.name);   // Access name
	console.log(currentUser.orders); // Access orders
} else {
	console.log("No user data found.");
}

// Display user info on the page
document.getElementById("user-name").textContent = currentUser.name;
document.getElementById("user-email").textContent = currentUser.email;  // Display email correctly


document.getElementById('change-btn').addEventListener('click', () => {
  window.location.href = 'ResetPassword.html';
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