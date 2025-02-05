const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");
let painting = false;
let fillMode = false;
let color = document.getElementById("colorPicker").value;
let brushSize = document.getElementById("brushSize").value;

// Function to generate a random pastel color
function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360); // Random hue
    return `hsl(${hue}, 100%, 90%)`; // Pastel shade
}

// Set initial pastel background
document.body.style.backgroundColor = getRandomPastelColor();

// Ensure the canvas starts with a white background
function initializeCanvas() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
initializeCanvas();

document.getElementById("colorPicker").addEventListener("change", (e) => color = e.target.value);
document.getElementById("brushSize").addEventListener("input", (e) => brushSize = e.target.value);

// Add event listeners to all buttons to change background on click
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        document.body.style.backgroundColor = getRandomPastelColor();
    });
});

canvas.addEventListener("mousedown", (e) => {
    if (fillMode) {
        floodFill(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    } else {
        startPainting(e);
    }
});
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mousemove", draw);

function startPainting(e) {
    painting = true;
    draw(e);
}

function stopPainting() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting || fillMode) return;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function clearCanvas() {
    ctx.fillStyle = "#FFFFFF"; // Reset to white background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function downloadImage() {
    const link = document.createElement("a");
    link.download = "painting.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

function enableFill() {
    fillMode = !fillMode;
}

// Flood fill algorithm for filling an area
function floodFill(x, y) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const targetColor = getPixelColor(x, y, data);
    const fillColor = hexToRgb(color);

    if (!colorsMatch(targetColor, fillColor)) {
        const stack = [[x, y]];
        while (stack.length) {
            const [px, py] = stack.pop();
            if (px < 0 || px >= canvas.width || py < 0 || py >= canvas.height) continue;
            const index = (py * canvas.width + px) * 4;

            if (colorsMatch(getPixelColor(px, py, data), targetColor)) {
                setPixelColor(px, py, fillColor, data);
                stack.push([px + 1, py], [px - 1, py], [px, py + 1], [px, py - 1]);
            }
        }
        ctx.putImageData(imgData, 0, 0);
    }
}

function getPixelColor(x, y, data) {
    const index = (y * canvas.width + x) * 4;
    return [data[index], data[index + 1], data[index + 2]];
}

function setPixelColor(x, y, color, data) {
    const index = (y * canvas.width + x) * 4;
    data[index] = color[0];
    data[index + 1] = color[1];
    data[index + 2] = color[2];
}

function colorsMatch(c1, c2) {
    return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2];
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}
