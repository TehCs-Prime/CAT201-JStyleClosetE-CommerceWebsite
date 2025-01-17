function openSearch() {
  document.getElementById('searchOverlay').classList.add('active');
  document.querySelector('.search-input').focus();
}

function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('active');
}

function performSearch() {
  const searchTerm = document.querySelector('.search-input').value;
  // Add your search logic here
  console.log('Searching for:', searchTerm);
}

// Close overlay when clicking outside the search container
document.getElementById('searchOverlay').addEventListener('click', function(e) {
  if (e.target === this) {
      closeSearch();
  }
});

document.querySelector('.mobileView a').onclick = function(e) {
  e.preventDefault();
  openSidebar();
};

function openSidebar() {
const sidebar = document.getElementById('sidebar');
const sidebarContent = sidebar.querySelector('.sidebar-content');
const mainSection = document.querySelector('.Section');

// Clone the Section and its contents
const sectionClone = mainSection.cloneNode(true);

// Clear previous content
sidebarContent.innerHTML = '';
sidebarContent.appendChild(sectionClone);

// Remove existing hover events and add click handlers
sidebarContent.querySelectorAll('.dropdown').forEach(dropdown => {
const dropbtn = dropdown.querySelector('.dropbtn');

// Remove href to prevent navigation
dropbtn.removeAttribute('href');

// Remove existing click listeners
dropbtn.replaceWith(dropbtn.cloneNode(true));

// Add new click listener
dropdown.querySelector('.dropbtn').addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  
  // Close other open dropdowns
  sidebarContent.querySelectorAll('.dropdown').forEach(d => {
      if (d !== dropdown && d.classList.contains('active')) {
          d.classList.remove('active');
      }
  });
  
  // Toggle current dropdown
  dropdown.classList.toggle('active');
});
});

sidebar.classList.add('active');
document.getElementById('sidebarOverlay').classList.add('active');
document.body.style.overflow = 'hidden';
}

function closeSidebar() {
document.getElementById('sidebar').classList.remove('active');
document.getElementById('sidebarOverlay').classList.remove('active');
document.body.style.overflow = '';
}