// drag.js (Handles draggable functionality)
export function makeDraggable(id) {
    const elmnt = document.getElementById(id);
    let startX, startY, initialX, initialY;
    const header = elmnt.querySelector(".window-header");

    function dragMouseDown(e) {
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        initialX = elmnt.offsetLeft;
        initialY = elmnt.offsetTop;
        document.onmouseup = stopDrag;
        document.onmousemove = drag;
    }

    function drag(e) {
        e.preventDefault();
        elmnt.style.left = (initialX + e.clientX - startX) + "px";
        elmnt.style.top = (initialY + e.clientY - startY) + "px";
    }

    function stopDrag() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    if (header) header.onmousedown = dragMouseDown;
}
