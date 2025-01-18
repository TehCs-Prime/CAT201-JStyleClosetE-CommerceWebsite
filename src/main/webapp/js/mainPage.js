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
const menuLinks = document.querySelectorAll('.menu a');

// Add a click event listener to each link
menuLinks.forEach(link => {
		link.addEventListener('click', function () {
				// Remove the 'active' class from all links
				menuLinks.forEach(link => link.classList.remove('active-menu'));

				// Add the 'active' class to the clicked link
				this.classList.add('active-menu');
		});
});

//Dynamic Content: New Arrived
document.addEventListener("DOMContentLoaded", function(){
	const items = {
		men: [
			{img: "./Sources/na men 1.jpeg", name: "Jia Chen Tee (Red)", price: "RM 49.00"},
			{img: "./Sources/na men 2.jpeg", name: "Sphere Logo Tee", price: "RM 69.00"},
			{img: "./Sources/na men 3.jpeg", name: "NHR Quote Tee", price: "RM 69.00"},
			{img: "./Sources/na men 4.jpeg", name: "GLLS Tee (Black)", price: "RM 79.00"},
			{img: "./Sources/na men 5.jpeg", name: "Jia Chen Tee (Black)", price: "RM 69.00"},
			{img: "./Sources/na men 6.jpeg", name: "Wooden Dragon Tee (Black)", price: "RM 49.00"},
			{img: "./Sources/na men 7.jpeg", name: "Alien Tee (Black)", price: "RM 49.00"},
			{img: "./Sources/na men 8.jpeg", name: "Hoholand Tee (Black)", price: "RM 89.00"}
		],

		women: [
			{img: "./Sources/na women 1.jpeg", name: "Women Shirt Dress (Red)", price: "RM 89.90"},
			{img: "./Sources/na women 2.jpeg", name: "Women Knit Short Sleeve Crop Top (Red)", price: "RM 39.90"},
			{img: "./Sources/na women 3.jpeg", name: "Women Knit Sleeveless Top (Red)", price: "RM 49.90"},
			{img: "./Sources/na women 4.jpeg", name: "Women Knit Short Sleeve Crop Top (Light Yellow)", price: "RM 49.90"}
		],

		shoes: [
			{img: "./Sources/favicon.jpeg", name: "Shoes Item 1", price: "$12"},
			{img: "./Sources/favicon.jpeg", name: "Shoes Item 2", price: "$12"},
			{img: "./Sources/favicon.jpeg", name: "Shoes Item 3", price: "$12"},
			{img: "./Sources/favicon.jpeg", name: "Shoes Item 4", price: "$12"}
		],

		bags: [
			{img: "./Sources/favicon.jpeg", name: "Bags Item 1", price: "$12"},
			{img: "./Sources/favicon.jpeg", name: "Shoes Item 2", price: "$12"},
			{img: "./Sources/favicon.jpeg", name: "Shoes Item 3", price: "$12"},
			{img: "./Sources/favicon.jpeg", name: "Shoes Item 4", price: "$12"}
		],

		accessories: [
			{img: "./Sources/favicon.jpeg", name: "Acs Item 1", price: "$12"},
			{img: "./Sources/favicon.jpeg", name: "Shoes Item 2", price: "$12"},
			{img: "./Sources/favicon.jpeg", name: "Shoes Item 3", price: "$12"},
			{img: "./Sources/favicon.jpeg", name: "Shoes Item 4", price: "$12"}
		]
	};

	const menuLinks = document.querySelectorAll('.menu a');
	const itemContainer = document.querySelector('.item-container');

	// Function to render items based on category
	function renderItems(category) {
		itemContainer.innerHTML = ''; // Clear existing items
		items[category].forEach(item => {
			const itemElement = document.createElement('div');
			itemElement.classList.add('item');
			itemElement.innerHTML = `
				<img src="${item.img}" alt="${item.name}">
				<div class="name-container">
					<h4>${item.name}</h4>
				</div>
				<div class="price-container">
					<h4>${item.price}</h4>
				</div>
				`;
			itemContainer.appendChild(itemElement);
		});
	}

	// Add click event listener to menu links
	menuLinks.forEach(link => {
			link.addEventListener('click', function (event) {
					event.preventDefault(); // Prevent default link behavior

					// Remove 'active' class from all links
					menuLinks.forEach(link => link.classList.remove('active'));
					this.classList.add('active'); // Add 'active' to the clicked link

					// Get category from data attribute and render items
					const category = this.dataset.category;
					renderItems(category);
			});
	});

	// Initialize with the default category (Men)
	renderItems('men');
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


//Promotion Item Fetch
const items = [
	{img: "./Sources/na men 1.jpeg", name: "Jia Chen Tee (Red)", price: "RM 49.00"},
			{img: "./Sources/na men 2.jpeg", name: "Sphere Logo Tee", price: "RM 69.00"},
			{img: "./Sources/na men 3.jpeg", name: "NHR Quote Tee", price: "RM 69.00"},
			{img: "./Sources/na men 4.jpeg", name: "GLLS Tee (Black)", price: "RM 79.00"}
];

// Select the container element
const container = document.getElementById("itemContainer");

// Generate HTML using a loop
items.forEach(item => {
	const itemElement = document.createElement('div');
	itemElement.classList.add('item');
	itemElement.innerHTML = `
			<img src="${item.img}" alt="${item.name}">
			<div class="name-container">
					<h4>${item.name}</h4>
			</div>
			<div class="price-container">
					<h4>${item.price}</h4>
			</div>
	`;
	itemContainer.appendChild(itemElement);
});

const categories = [
	{ imgSrc: "./Sources/tee%20icon.png", alt: "T-Shirt", title: "T-Shirts", type: "tee" },
	{ imgSrc: "./Sources/top%20icon.png", alt: "Top", title: "Tops", type: "top" },
	{ imgSrc: "./Sources/dress%20icon.png", alt: "Dress", title: "Dress", type: "dress" },
	{ imgSrc: "./Sources/outwear%20icon.png", alt: "Outwear", title: "Outwears", type: "outwear" },
	{ imgSrc: "./Sources/bottom%20icon.png", alt: "Bottom", title: "Bottoms", type: "bottom" },
	{ imgSrc: "./Sources/basic%20icon.png", alt: "Basics", title: "Basics", type: "basic" },
	{ imgSrc: "./Sources/cny%20icon.png", alt: "CNY Sales", title: "CNY Sales", type: "cny" },
	{ imgSrc: "./Sources/sales%20icon.png", alt: "Last Chances", title: "Last Chances", type: "sales" }
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

