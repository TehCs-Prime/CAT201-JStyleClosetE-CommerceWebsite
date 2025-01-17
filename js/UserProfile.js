const user = {
	name: "John Doe",
	email: "johndoe@example.com",
	orders: [
		{
			productImg: "../Sources/na men 5.jpeg",
			productName: "BFF Tee",
			price: "RM189.00",
			quantity: 1,
			total: "RM189.00"
		},
		{
			productImg: "../Sources/na men 1.jpeg",
			productName: "BFF Tee",
			price: "RM199.00",
			quantity: 1,
			total: "RM199.00"
		}
	]
};

// Update account details
document.getElementById("user-name").textContent = `${user.name}`;
document.getElementById("user-email").textContent = `${user.email}`;

// Update order history
const orderList = document.getElementById("order-list");

if (user.orders.length > 0) {
		document.getElementById("order-message").style.display = "none";
		document.getElementById("order-header").style.display = "flex";

		user.orders.forEach(order => {
				const orderCard = document.createElement("div");
				orderCard.className = "order-container-card";

				orderCard.innerHTML = `
					<div class="order-details">
						<img src="${order.productImg}" alt="Product Image">
						<div class="product-details">
							<span>${order.productName}</span>
							<span>${order.price}</span>
						</div>
					</div>

					<div class="order-quantity">${order.quantity}</div>

					<div class="order-total">${order.total}</div>
				`;

				orderList.appendChild(orderCard);
		});
}



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