// screensaver.js (Handles DVD screensaver)
export function startDvdScreensaver() {
    const dvdLogo = document.getElementById("dvd-logo");
    let posX = 0, posY = 0, dx = 2, dy = 2;
    
    function animate() {
        const container = document.getElementById("dvd-container");
        const { clientWidth: w, clientHeight: h } = container;
        if (posX + dx > w - 100 || posX + dx < 0) dx = -dx;
        if (posY + dy > h - 50 || posY + dy < 0) dy = -dy;
        posX += dx;
        posY += dy;
        dvdLogo.style.left = posX + 'px';
        dvdLogo.style.top = posY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}