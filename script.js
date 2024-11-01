// Show time
function updateTime() {
  const timeEl = document.getElementById('time');
  const now = new Date();
  timeEl.textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);

// Perform search
function performSearch() {
  const searchEngine = document.getElementById('searchEngine').value;
  const query = document.getElementById('searchBox').value;
  window.open(`${searchEngine}${encodeURIComponent(query)}`, '_blank');
}

// Add icons
function createIcon() {
  const name = prompt("Enter a name for the icon:");
  const url = prompt("Enter the URL for the icon:");

  if (!name || !url) return;

  const iconData = { name, url };
  saveIcon(iconData);
  addIconToDOM(iconData);
}

// Save icon to localStorage
function saveIcon(iconData) {
  let icons = JSON.parse(localStorage.getItem('icons')) || [];
  icons.push(iconData);
  localStorage.setItem('icons', JSON.stringify(icons));
}

// Load icons from localStorage
function loadIcons() {
  const icons = JSON.parse(localStorage.getItem('icons')) || [];
  icons.forEach(addIconToDOM);
}

// Add icon to the DOM
function addIconToDOM(iconData) {
  const icon = document.createElement('div');
  icon.className = 'folder';
  icon.textContent = iconData.name;
  icon.onclick = () => window.open(iconData.url, '_blank');

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '🗑️';
  deleteButton.onclick = (event) => {
    event.stopPropagation(); // Prevent opening the link
    deleteIcon(iconData);
  };

  icon.appendChild(deleteButton);
  document.getElementById('shortcuts').appendChild(icon);
}

// Delete icon
function deleteIcon(iconData) {
  let icons = JSON.parse(localStorage.getItem('icons')) || [];
  icons = icons.filter(icon => icon.name !== iconData.name || icon.url !== iconData.url);
  localStorage.setItem('icons', JSON.stringify(icons));
  document.getElementById('shortcuts').innerHTML = '';
  loadIcons();
}

// Change theme
function chooseTheme() {
  const currentTheme = document.body.style.backgroundColor === 'black' ? 'white' : 'black';
  document.body.style.backgroundColor = currentTheme;
}

// Toggle settings menu
function toggleSettings() {
  const settingsMenu = document.getElementById('settingsMenu');
  settingsMenu.style.display = settingsMenu.style.display === 'flex' ? 'none' : 'flex';
}

// Initialize the start page
function init() {
  updateTime();
  loadIcons();
}

init();
