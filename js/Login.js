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

//Login Signup Page Switching
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('form-section-container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
 	});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
	});