//Hero Page Navigation
let currentIndex = 0;

document.querySelector('.left-btn').addEventListener('click', () => moveSlide(-1));
document.querySelector('.right-btn').addEventListener('click', () => moveSlide(1));

function moveSlide(direction) {
	const images = document.querySelector('.carousel-images');
	const totalImages = images.children.length;

	// Calculate new index
	currentIndex += direction;

	// Wrap around if out of bounds
	if (currentIndex < 0) {
		currentIndex = totalImages - 1;
	} else if (currentIndex >= totalImages) {
		currentIndex = 0;
	}

	// Update transform to show the new image
	const offset = -currentIndex * 100; // 100% width per image
	images.style.transform = `translateX(${offset}%)`;
}

//update active menu choices
// Select all menu links
document.addEventListener("DOMContentLoaded", function () {
	const menuLinks = document.querySelectorAll('.menu a');
	const itemContainer = document.querySelector('.item-container');

	// Function to fetch data from products.json
	async function fetchProducts() {
		try {
			const response = await fetch('/CAT-Project-WebApp/products'); // Adjust path if needed
			if (!response.ok) throw new Error('Failed to load products.json');
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	// Function to render the latest 8 products
	async function renderLatestProducts() {
		const products = await fetchProducts();
		if (!products || products.length === 0) {
			itemContainer.innerHTML = '<p>No items found.</p>';
			return;
		}

		// Get the latest 8 products
		const latestProducts = products.slice(-8).reverse(); // Reverse to get the newest first

		itemContainer.innerHTML = ''; // Clear existing items
		latestProducts.forEach(item => {
			const itemElement = document.createElement('div');
			itemElement.classList.add('item');
			itemElement.innerHTML = `
                <img src="${item.images[0]}" alt="${item.name}">
                <div class="name-container">
                    <h4>${item.name}</h4>
                </div>
                <div class="price-container">
                    <h4>${item.price}</h4>
                </div>
            `;

			// Add click event listener to redirect to product detail page
			itemElement.addEventListener('click', () => {
				window.location.href = `Page-ProductDetails.html?id=${item.id}`;
			});

			itemContainer.appendChild(itemElement);
		});
	}

	// Add click event listener to menu links
	menuLinks.forEach(link => {
		link.addEventListener('click', function (event) {
			event.preventDefault(); // Prevent default link behavior

			// Remove 'active-menu' class from all links
			menuLinks.forEach(link => link.classList.remove('active-menu'));
			this.classList.add('active-menu'); // Add 'active-menu' to the clicked link
		});
	});

	// Fetch and render the latest 8 products on page load
	renderLatestProducts();
});


// Fetch header
fetch("Header-HomeBar.html")
	.then(response => response.text())
	.then(data => {
		document.getElementById("header").innerHTML = data;
	})
	.catch(error => console.error("Error loading header:", error));

// Fetch footer
fetch("Footer-BottomBar.html")
	.then(response => response.text())
	.then(data => {
		document.getElementById("footer").innerHTML = data;
	})
	.catch(error => console.error("Error loading footer:", error));


// Select the container where products will be displayed
const container = document.getElementById("itemContainer");

// Fetch all products from the backend
async function fetchProducts() {
	try {
		const response = await fetch("/CAT-Project-WebApp/products"); // Replace with your servlet URL
		if (!response.ok) {
			throw new Error("Failed to fetch products");
		}

		const products = await response.json(); // Parse the response as JSON

		// Filter products with category "cnysales" or "lastchances"
		const filteredProducts = products.filter(product =>
			product.category === "CNYSales" || product.category === "LastChances"
		);

		// Render the filtered products
		renderProducts(filteredProducts);
	} catch (error) {
		console.error("Error fetching products:", error);
	}
}

// Render products to the container
function renderProducts(products) {
	// Clear any existing content
	container.innerHTML = "";

	products.forEach(product => {
		// Create a product element
		const itemElement = document.createElement("div");
		itemElement.classList.add("item");

		// Set the HTML structure for the product
		itemElement.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}">
            <div class="name-container">
                <h4>${product.name}</h4>
            </div>
            <div class="price-container">
                <h4>${product.price}</h4>
            </div>
        `;

		// Add a click event to redirect to the product detail page
		itemElement.addEventListener("click", () => {
			window.location.href = `Page-ProductDetails.html?id=${product.id}`;
		});

		// Append the product element to the container
		container.appendChild(itemElement);
	});
}

// Fetch and display products on page load
fetchProducts();


const categories = [
	{ imgSrc: "./Sources/tee%20icon.png", alt: "T-Shirt", title: "T-Shirts", type: "T-shirts" },
	{ imgSrc: "./Sources/top%20icon.png", alt: "Top", title: "Tops", type: "top" },
	{ imgSrc: "./Sources/dress%20icon.png", alt: "Dress", title: "Dress", type: "dress" },
	{ imgSrc: "./Sources/outwear%20icon.png", alt: "Outwear", title: "Outwears", type: "outwear" },
	{ imgSrc: "./Sources/bottom%20icon.png", alt: "Bottom", title: "Bottoms", type: "bottom" },
	{ imgSrc: "./Sources/basic%20icon.png", alt: "Basics", title: "Basics", type: "basic" },
	{ imgSrc: "./Sources/cny%20icon.png", alt: "CNY Sales", title: "CNY Sales", type: "CNYSales" },
	{ imgSrc: "./Sources/sales%20icon.png", alt: "Last Chances", title: "Last Chances", type: "LastChances" }
];

const categoryContainer = document.querySelector(".item-container.category-container");

// Generate and append category items
categories.forEach(category => {
	// Create the main item div
	const itemDiv = document.createElement("div");
	itemDiv.classList.add("item", "category", category.type);

	// Create the image element
	const img = document.createElement("img");
	img.src = category.imgSrc;
	img.alt = category.alt;
	img.classList.add("category-icon");

	// Create the title element
	const title = document.createElement("h4");
	title.textContent = category.title;

	// Append elements to the item div
	itemDiv.appendChild(img);
	itemDiv.appendChild(title);

	itemDiv.addEventListener("click", () => {
		window.location.href = `Catalog.html?category=${category.type}`;
	});

	categoryContainer.appendChild(itemDiv);
});


