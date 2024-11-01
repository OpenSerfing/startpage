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

  document.getElementById('shortcuts').appendChild(icon);
}

// Change background image
function setBackground() {
  const backgrounds = [
    "https://source.unsplash.com/random/1600x900?nature",
    "https://source.unsplash.com/random/1600x900?city",
    "https://source.unsplash.com/random/1600x900?abstract"
  ];
  document.body.style.backgroundImage = `url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]})`;
}

// Initialize the start page
function init() {
  updateTime();
  loadIcons();
  setBackground();
}

init();
