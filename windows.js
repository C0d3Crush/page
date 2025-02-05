// windows.js (Handles opening, closing, and toggling windows)
export function openWindow(id) {
    document.getElementById(id).style.display = 'block';
}

export function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

export function toggleStartMenu() {
    const startMenu = document.getElementById("start-menu");
    startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
}
