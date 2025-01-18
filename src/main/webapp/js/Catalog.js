const items = [
  { img: "Sources/na men 1.jpeg", name: "Jia Chen Tee (Red)", price: "RM 49.00", category: "tee"},
  { img: "Sources/na men 2.jpeg", name: "Sphere Logo Tee", price: "RM 69.00", category: "tee" },
  { img: "Sources/na men 3.jpeg", name: "NHR Quote Tee", price: "RM 69.00", category: "tee" },
  { img: "Sources/na men 4.jpeg", name: "GLLS Tee (Black)", price: "RM 79.00", category: "tee" },
  { img: "Sources/na men 5.jpeg", name: "Jia Chen Tee (Black)", price: "RM 69.00", category: "tee" },
  { img: "Sources/na men 6.jpeg", name: "Wooden Dragon Tee (Black)", price: "RM 49.00", category: "top" },
  { img: "Sources/na men 7.jpeg", name: "Alien Tee (Black)", price: "RM 49.00", category: "top" },
  { img: "Sources/na men 4.jpeg", name: "GLLS Tee (Black)", price: "RM 79.00", category: "top" },
  { img: "Sources/na men 5.jpeg", name: "Jia Chen Tee (Black)", price: "RM 69.00", category: "top" },
  { img: "./Sources/na men 6.jpeg", name: "Wooden Dragon Tee (Black)", price: "RM 49.00", category: "dress" },
  { img: "./Sources/na men 7.jpeg", name: "Alien Tee (Black)", price: "RM 49.00", category: "dress" },
  { img: "./Sources/na men 1.jpeg", name: "Jia Chen Tee (Red)", price: "RM 49.00", category: "dress" },
  { img: "./Sources/na men 2.jpeg", name: "Sphere Logo Tee", price: "RM 69.00", category: "dress" },
  { img: "./Sources/na men 3.jpeg", name: "NHR Quote Tee", price: "RM 69.00", category: "dress" },
  { img: "./Sources/na men 4.jpeg", name: "GLLS Tee (Black)", price: "RM 79.00", category: "dress" },
  { img: "./Sources/na men 5.jpeg", name: "Jia Chen Tee (Black)", price: "RM 69.00", category: "outwear" },
  { img: "./Sources/na men 6.jpeg", name: "Wooden Dragon Tee (Black)", price: "RM 49.00", category: "outwear" },
  { img: "./Sources/na men 7.jpeg", name: "Alien Tee (Black)", price: "RM 49.00", category: "bottom" },
  { img: "./Sources/na men 4.jpeg", name: "GLLS Tee (Black)", price: "RM 79.00", category: "bottom" },
  { img: "./Sources/na men 5.jpeg", name: "Jia Chen Tee (Black)", price: "RM 69.00", category: "bottom" },
  { img: "./Sources/na men 6.jpeg", name: "Wooden Dragon Tee (Black)", price: "RM 49.00", category: "basic" },
  { img: "./Sources/na men 7.jpeg", name: "Alien Tee (Black)", price: "RM 49.00", category: "cny" },
  { img: "./Sources/na men 8.jpeg", name: "Hoholand Tee (Black)", price: "RM 89.00", category: "sales" }
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

function scrollToClass(className) {
  const targetElement = document.querySelector(`.${className}`);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

let activeCategory = document.querySelector('.cat-bar a.active-cat').dataset.category || 'all';
let filteredItems = activeCategory === 'all' ? items : items.filter(item => item.category === activeCategory);
const itemsPerPage = 20;
let currentPage = 1;

// DOM Elements
const itemContainer = document.querySelector('.item-container');
const categoryLinks = document.querySelectorAll('a[data-category]');
const pageNumbers = document.getElementById('page-numbers');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const totalItemCount = document.getElementById('totalItemCount');

const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get('category') || 'all'; 

categoryLinks.forEach(link => {
  if (link.dataset.category === selectedCategory) {
      link.classList.add('active-cat'); // Set the active class
  } else {
      link.classList.remove('active-cat'); // Remove the active class for other categories
  }
});

// Function to render items
function renderItems(page) {
  itemContainer.innerHTML = '';

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToRender = filteredItems.slice(startIndex, endIndex);

  itemsToRender.forEach(item => {
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

  updateTotalItemCount();
}

// Function to update total item count
function updateTotalItemCount() {
  totalItemCount.textContent = `${filteredItems.length} Product(s)`;
}

// Function to render pagination buttons
function renderPagination() {
  pageNumbers.innerHTML = '';

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Function to update pagination
function updatePagination() {
  renderItems(currentPage);
  renderPagination();
}

// Event listeners for category selection
categoryLinks.forEach(link => {
  link.addEventListener('click', function () {
    const category = this.dataset.category;

    // Update active category link
    categoryLinks.forEach(link => link.classList.remove('active-cat'));
    this.classList.add('active-cat');

    // Filter items by category
    filteredItems = category === 'all' ? items : items.filter(item => item.category === category);

    // Reset to the first page and update pagination
    currentPage = 1;
    updatePagination();
    updateCatalogHeaderTitle();
  });
});

// Event listeners for Prev/Next buttons
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
    scrollToClass("filter-bar");
  }
});

nextBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    updatePagination();
    scrollToClass("filter-bar");
  }
});

// Function to apply filters
function applyFilters() {
  const price = document.getElementById('priceFilter').value;
  const alphabeticalOrder = document.getElementById('charFilter').value;

  filteredItems = activeCategory === 'all' ? items : items.filter(item => item.category === activeCategory);

  if (price === 'low-high') {
    filteredItems.sort((a, b) => parseFloat(a.price.replace('RM', '')) - parseFloat(b.price.replace('RM', '')));
  } else if (price === 'high-low') {
    filteredItems.sort((a, b) => parseFloat(b.price.replace('RM', '')) - parseFloat(a.price.replace('RM', '')));
  }

  if (alphabeticalOrder === 'a-z') {
    filteredItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (alphabeticalOrder === 'z-a') {
    filteredItems.sort((a, b) => b.name.localeCompare(a.name));
  }

  currentPage = 1;
  updatePagination();
}

function updateCatalogHeaderTitle() {
  const activeCategoryElement = document.querySelector('.cat-bar a.active-cat');
  const catalogHeaderTitle = document.getElementById('catalog-header-title');
  
  if (activeCategoryElement) {
    catalogHeaderTitle.textContent = activeCategoryElement.textContent;
  }
}

// Initialize display
updatePagination();
updateCatalogHeaderTitle();