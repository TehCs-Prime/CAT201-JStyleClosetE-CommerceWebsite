
const items = [
  { img: "../Sources/na men 1.jpeg", name: "Jia Chen Tee (Red)", price: "RM 49.00" },
  { img: "../Sources/na men 2.jpeg", name: "Sphere Logo Tee", price: "RM 69.00" },
  { img: "../Sources/na men 3.jpeg", name: "NHR Quote Tee", price: "RM 69.00" },
  { img: "../Sources/na men 4.jpeg", name: "GLLS Tee (Black)", price: "RM 79.00" },
  { img: "../Sources/na men 5.jpeg", name: "Jia Chen Tee (Black)", price: "RM 69.00" },
  { img: "../Sources/na men 6.jpeg", name: "Wooden Dragon Tee (Black)", price: "RM 49.00" },
  { img: "../Sources/na men 7.jpeg", name: "Alien Tee (Black)", price: "RM 49.00" },
  { img: "../Sources/na men 4.jpeg", name: "GLLS Tee (Black)", price: "RM 79.00" },
  { img: "../Sources/na men 5.jpeg", name: "Jia Chen Tee (Black)", price: "RM 69.00" },
  { img: "../Sources/na men 6.jpeg", name: "Wooden Dragon Tee (Black)", price: "RM 49.00" },
  { img: "../Sources/na men 7.jpeg", name: "Alien Tee (Black)", price: "RM 49.00" },
  { img: "../Sources/na men 1.jpeg", name: "Jia Chen Tee (Red)", price: "RM 49.00" },
  { img: "../Sources/na men 2.jpeg", name: "Sphere Logo Tee", price: "RM 69.00" },
  { img: "../Sources/na men 3.jpeg", name: "NHR Quote Tee", price: "RM 69.00" },
  { img: "../Sources/na men 4.jpeg", name: "GLLS Tee (Black)", price: "RM 79.00" },
  { img: "../Sources/na men 5.jpeg", name: "Jia Chen Tee (Black)", price: "RM 69.00" },
  { img: "../Sources/na men 6.jpeg", name: "Wooden Dragon Tee (Black)", price: "RM 49.00" },
  { img: "../Sources/na men 7.jpeg", name: "Alien Tee (Black)", price: "RM 49.00" },
  { img: "../Sources/na men 4.jpeg", name: "GLLS Tee (Black)", price: "RM 79.00" },
  { img: "../Sources/na men 5.jpeg", name: "Jia Chen Tee (Black)", price: "RM 69.00" },
  { img: "../Sources/na men 6.jpeg", name: "Wooden Dragon Tee (Black)", price: "RM 49.00" },
  { img: "../Sources/na men 7.jpeg", name: "Alien Tee (Black)", price: "RM 49.00" },
  { img: "../Sources/na men 8.jpeg", name: "Hoholand Tee (Black)", price: "RM 89.00" }
];

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

// Update active menu choices
const menuLinks = document.querySelectorAll('.cat-bar a');
menuLinks.forEach(link => {
  link.addEventListener('click', function () {
    // Remove the 'active' class from all links
    menuLinks.forEach(link => link.classList.remove('active-cat'));
    
    // Add the 'active' class to the clicked link
    this.classList.add('active-cat');
  });
});

function scrollToClass(className) {
  const targetElement = document.querySelector(`.${className}`);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Function to update total item count
function updateTotalItemCount() {
  const totalItemCount = document.getElementById('totalItemCount');
  totalItemCount.textContent = `${filteredItems.length} Product(s)`; // Reflect total filtered items count
}

const itemContainer = document.querySelector('.item-container');
const itemsPerPage = 20;
let currentPage = 1;
let filteredItems = items; // Use filtered items to update pagination dynamically
let totalPages = Math.ceil(filteredItems.length / itemsPerPage);

// DOM Elements for pagination
const pageNumbers = document.getElementById('page-numbers');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Function to render items for the current page
function renderItems(page) {
  itemContainer.innerHTML = ''; // Clear existing items

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const itemsToRender = filteredItems.slice(startIndex, endIndex);
  
  itemsToRender.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item'); // Ensure you're using consistent class names
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

  updateTotalItemCount();
}

// Function to render pagination buttons
function renderPagination() {
  pageNumbers.innerHTML = ''; // Clear existing page numbers

  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement('div');
    pageNumber.classList.add('page-number');
    if (i === currentPage) {
      pageNumber.classList.add('active');
    }
    pageNumber.textContent = i;
    pageNumber.addEventListener('click', () => {
      currentPage = i;
      updatePagination();
    });
    pageNumbers.appendChild(pageNumber);
  }

  // Enable/Disable prev/next buttons
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Function to update the pagination and item display
function updatePagination() {
  totalPages = Math.ceil(filteredItems.length / itemsPerPage); // Update total pages based on filtered items
  renderItems(currentPage);
  renderPagination();
  scrollToClass("filter-bar");
}

// Event listeners for Prev/Next buttons
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    updatePagination();
  }
});

// Function to apply filters (modification needed for integration with pagination)
function applyFilters() {
  let price = document.getElementById('priceFilter').value;
  let alphabeticalOrder = document.getElementById('charFilter').value;

  filteredItems = items;

  // Filter by price
  if (price === 'low-high') {
    filteredItems = filteredItems.sort((a, b) => parseFloat(a.price.replace('RM', '').trim()) - parseFloat(b.price.replace('RM', '').trim()));
  } else if (price === 'high-low') {
    filteredItems = filteredItems.sort((a, b) => parseFloat(b.price.replace('RM', '').trim()) - parseFloat(a.price.replace('RM', '').trim()));
  }

  // Filter by alphabetical order
  if (alphabeticalOrder === 'a-z') {
    filteredItems = filteredItems.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically from A to Z
  } else if (alphabeticalOrder === 'z-a') {
    filteredItems = filteredItems.sort((a, b) => b.name.localeCompare(a.name)); // Sort alphabetically from Z to A
  }

  currentPage = 1; // Reset to the first page after applying filters
  updatePagination(); // Re-render with new filtered items
}

// Initialize pagination and item display
updatePagination();