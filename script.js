

function openWindow(id) {
    document.getElementById(id).style.display = 'block';

    // Check for specific windows and load additional content
    if (id === 'images-folder') {
        loadImages();
    } else if (id === 'drawings-folder') {
        loadDrawings();
    } else if (id === 'memes-folder') {
        loadMemes();
    } else if (id === 'dvd-screensaver') {
        startDvdScreensaver();
    } else if (id === 'notes') {
        loadTextFile();
    } else if (id === 'snake') {
        startSnakeGame();
    } else if (id === 'radio') {
        openMusicPlayer();
    } else if (id === 'canvas-app') {
        setupCanvasEvents();
    }
}


// Function to close windows
function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

// Function to load the notes.txt file content into the Notes window
function loadTextFile() {
    fetch('notes.txt')
        .then(response => response.text())  
        .then(data => {
            // Split the text into lines and insert breaks
            const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');
            const formattedText = lines.join('<br>'); // Join lines with <br> tags
            document.getElementById('text-file-content').innerHTML = formattedText; // Use innerHTML for line breaks
        })
        .catch(error => {
            console.error('Error loading text file:', error);
            document.getElementById('text-file-content').textContent = 'Error loading notes.';
        });
}



// Make windows draggable
dragElement(document.getElementById("my-computer"));
dragElement(document.getElementById("projects"));
dragElement(document.getElementById("recycle-bin"));
dragElement(document.getElementById("images-folder"));
dragElement(document.getElementById("dvd-screensaver"));
dragElement(document.getElementById("full-size-image"));
dragElement(document.getElementById("radio"));
dragElement(document.getElementById("snake"));
dragElement(document.getElementById("notes"));



function dragElement(elmnt) {
    let startX = 0, startY = 0, initialX = 0, initialY = 0;
    const header = elmnt.querySelector(".window-header");

    if (header) {
        header.onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        const computedStyle = window.getComputedStyle(elmnt);
        initialX = parseInt(computedStyle.left, 10) || 0;
        initialY = parseInt(computedStyle.top, 10) || 0;
        document.onmouseup = stopDrag;
        document.onmousemove = drag;
    }

    function drag(e) {
        e = e || window.event;
        e.preventDefault();
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        elmnt.style.left = (initialX + deltaX) + "px";
        elmnt.style.top = (initialY + deltaY) + "px";
    }

    function stopDrag() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Toggle Start Menu
function toggleStartMenu() {
    const startMenu = document.getElementById("start-menu");
    startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
}

// Load Images in the Images Folder
function loadImages() {
    console.log("Loading images...");
    const imagesContent = document.getElementById("images-content");
    imagesContent.innerHTML = ''; // Clear previous images

    // Add your image paths here
    const images = [
        '/images/gallery/photo1.jpg',
        '/images/gallery/photo2.jpg',
        '/images/gallery/photo3.jpg',
        '/images/gallery/photo4.jpg',
        '/images/gallery/photo5.jpg',
        '/images/gallery/photo6.jpg',
        '/images/gallery/photo7.jpg',
        '/images/gallery/photo8.jpg',
        '/images/gallery/photo9.jpg',
        '/images/gallery/photo10.jpg',
        '/images/gallery/photo11.jpg',
        '/images/gallery/photo12.jpg',
        '/images/gallery/photo13.jpg',
        '/images/gallery/photo14.jpg',
        '/images/gallery/photo15.jpg',
        '/images/gallery/photo16.jpg',
        '/images/gallery/photo17.jpg',
        '/images/gallery/photo18.jpg',
        '/images/gallery/photo19.jpg',
        '/images/gallery/photo20.jpg',
        '/images/gallery/photo21.jpg',
        '/images/gallery/photo22.jpg',
        '/images/gallery/photo23.jpg',
        '/images/gallery/photo24.jpg',
        '/images/gallery/photo25.jpg',
        '/images/gallery/photo26.jpg',
        '/images/gallery/photo27.jpg'
    ];

    images.forEach(image => {
        const img = document.createElement("img");
        img.src = image;
        img.className = "thumbnail";
        img.onclick = function() {
            openFullSizeImage(image);
        };
        imagesContent.appendChild(img);
    });
}
function loadDrawings() {
    const drawingsContent = document.getElementById("drawings-content");
    drawingsContent.innerHTML = ''; // Clear previous drawings

    // Add your drawing paths here
    const drawings = [
        '/images/drawings/drawing1.jpg',
        '/images/drawings/drawing2.jpg',
        '/images/drawings/drawing3.jpg',
        '/images/drawings/drawing4.jpg',
        '/images/drawings/drawing5.jpg'
    ];

    drawings.forEach(drawing => {
        const img = document.createElement("img");
        img.src = drawing;
        img.className = "thumbnail";
        img.onclick = function() {
            openFullSizeImage(drawing);
        };
        drawingsContent.appendChild(img);
    });
}

function loadMemes() {
    const memesContent = document.getElementById("memes-content");
    memesContent.innerHTML = ''; // Clear previous memes

    // Add your meme paths here
    const memes = [
        '/Memes/meme1.png'
    ];

    memes.forEach(meme => {
        const img = document.createElement("img");
        img.src = meme;
        img.className = "thumbnail";
        img.onclick = function() {
            openFullSizeImage(meme);
        };
        memesContent.appendChild(img);
    });
}

// Open Full Size Image
function openFullSizeImage(imageSrc) {
    const fullSizeImageWindow = document.getElementById('full-size-image');
    const fullSizeImageElement = document.getElementById('full-size-image-element');
    fullSizeImageElement.src = imageSrc;
    fullSizeImageWindow.style.display = 'block';
}

// Shut Down Function
function shutdown() {
    alert("Shutting down...");
}
// Start DVD Screensaver
function startDvdScreensaver() {
    const dvdLogo = document.getElementById("dvd-logo");
    const container = document.getElementById("dvd-container");
    
    // Initial position
    let posX = 0;
    let posY = 0;
    let dx = 2; // Change in x
    let dy = 2; // Change in y
    const logoWidth = 100; // Assuming the logo is 100px wide
    const logoHeight = 50; // Assuming the logo is 50px tall

    function animate() {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Check for collisions with the container boundaries
        if (posX + dx > containerWidth - logoWidth || posX + dx < 0) {
            dx = -dx; // Reverse direction on x-axis
        }
        if (posY + dy > containerHeight - logoHeight || posY + dy < 0) {
            dy = -dy; // Reverse direction on y-axis
        }

        // Update position
        posX += dx;
        posY += dy;

        // Move the DVD logo
        dvdLogo.style.left = posX + 'px';
        dvdLogo.style.top = posY + 'px';

        requestAnimationFrame(animate);
    }
    
    animate();
}

// Start Snake Game
function startSnakeGame() {
    const canvas = document.getElementById("snake-canvas");
    const ctx = canvas.getContext("2d");

    const box = 20; // Size of the snake and food
    let snake = [{ x: 9 * box, y: 9 * box }]; // Initial snake position
    let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 15) * box };
    let d; // Direction
    let score = 0; // Initialize score

    // Load textures
    const snakeImage = new Image();
    const foodImage = new Image();
    const backgroundImage = new Image(); // Background image

    // Load the images
    snakeImage.src = '/images/snake.png'; // Replace with your snake image path
    foodImage.src = '/images/apple.png'; // Replace with your food image path
    backgroundImage.src = '/images/background.png'; // Replace with your background image path

    // Control the snake with WASD keys
    document.addEventListener("keydown", direction);

    function direction(event) {
        if (event.key === 'a' && d !== "RIGHT") {
            d = "LEFT";
        } else if (event.key === 'w' && d !== "DOWN") {
            d = "UP";
        } else if (event.key === 'd' && d !== "LEFT") {
            d = "RIGHT";
        } else if (event.key === 's' && d !== "UP") {
            d = "DOWN";
        }
    }    

    function draw() {
        // Draw background
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Draw snake
        for (let i = 0; i < snake.length; i++) {
            ctx.drawImage(snakeImage, snake[i].x, snake[i].y, box, box);
        }

        // Draw food
        ctx.drawImage(foodImage, food.x, food.y, box, box);

        // Draw score in the top left corner
        ctx.fillStyle = "white"; // Set color for the score text
        ctx.font = "20px Arial"; // Set font size and type
        ctx.fillText(`Score: ${score}`, 10, 20); // Draw the score text at position (10, 20)

        // Old snake position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        // Move the snake
        if (d == "LEFT") snakeX -= box;
        if (d == "UP") snakeY -= box;
        if (d == "RIGHT") snakeX += box;
        if (d == "DOWN") snakeY += box;

        // If the snake eats the food
        if (snakeX === food.x && snakeY === food.y) {
            food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 15) * box };
            score++; // Increment score
        } else {
            // Remove the tail
            snake.pop();
        }

        // Add new head
        const newHead = { x: snakeX, y: snakeY };

        // Game over conditions
        if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(game); // Stop the game
            alert("Game Over!"); // Alert game over
        }

        snake.unshift(newHead); // Add new head to the snake
    }

    // Collision detection
    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) {
                return true;
            }
        }
        return false;
    }

    const game = setInterval(draw, 200); // Call the draw function every 200ms
}



// Function to open the music player
function openMusicPlayer() {
    document.getElementById('radio').style.display = 'block';
}

// Toggle Play and Pause
function togglePlay() {
    const audioPlayer = document.getElementById("audio-player");
    const playButton = document.getElementById("play-button");
    const pauseButton = document.getElementById("pause-button");
    const songTitle = document.getElementById("song-title");

    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.style.display = "none"; // Hide Play button
        pauseButton.style.display = "inline"; // Show Pause button
        songTitle.textContent = "Now Playing: Electronic_Onslaught_short.wav"; // Update song title
    } else {
        audioPlayer.pause();
        playButton.style.display = "inline"; // Show Play button
        pauseButton.style.display = "none"; // Hide Pause button
    }
}

// Pause Music
function pauseMusic() {
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.pause();
    document.getElementById("play-button").style.display = "inline"; // Show Play button
    document.getElementById("pause-button").style.display = "none"; // Hide Pause button
}

function updateClock() {
    const clockElement = document.getElementById("clock");
    if (clockElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        clockElement.textContent = `${hours}:${minutes}`;
    }
}

// Update the clock every second
setInterval(updateClock, 1000);

// Call once to display immediately
updateClock();



let clockClickCount = 0; // Counter for clock clicks

// Function to set a random background image when the clock is clicked 10 times
function clockClicked() {
    clockClickCount++; // Increment the counter

    // Check if the clock has been clicked 10 times
    if (clockClickCount === 10) {
        // Array of background images
        const backgrounds = [
            '/images/kitty1.jpg',
            '/images/kitty2.jpg',
            '/images/kitty3.jpg',
            '/images/kitty4.jpg',
            '/images/kitty5.jpg',
            '/images/kitty6.jpg',
            '/images/kitty7.jpg',
            '/images/kitty8.jpg'
        ];
        
        // Select a random background from the array
        const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        
        // Set the background image
        document.body.style.backgroundImage = `url(${randomBackground})`;
        document.body.classList.add('background-image'); // Add the class to style the background

        // Reset the counter after changing the background
        clockClickCount = 0;
    }
}

// Assuming you have a clock element
const clockElement = document.getElementById('clock'); // Replace with your actual clock element ID
clockElement.addEventListener('click', clockClicked);

let clippyTimeout;

    // Toggle Clippy window
    function toggleClippy() {
        const clippyWindow = document.getElementById('clippy-window');
        if (clippyWindow.style.display === 'none') {
            clippyWindow.style.display = 'block';
            startClippyTalk();
        } else {
            closeClippy();
        }
    }

    // Close Clippy window
    function closeClippy() {
        document.getElementById('clippy-window').style.display = 'none';
        clearTimeout(clippyTimeout); // Stop Clippy from talking
    }

    // Start Clippy talking
    function startClippyTalk() {
        const phrases = [
            "Hi! How can I help you today?",
            "Don't forget to save your work!",
            "It looks like you're trying to do something.",
            "Need assistance? Just ask!",
            "I'm here if you need help!"
        ];

        function speak() {
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            document.getElementById('clippy-speech').innerText = randomPhrase;
            document.getElementById('clippy-sound').play(); // Play alert sound
            clippyTimeout = setTimeout(speak, Math.random() * (120000 - 30000) + 30000); // Random interval between 30s and 2min
        }

        speak(); // Start the speaking loop
    }

    // Function to handle events
    function handleEvent(eventType) {
        const comments = {
            "save": "Great job saving your work!",
            "open": "You've opened a file! What next?",
            "delete": "Oops! Be careful with deletions!",
        };

        const comment = comments[eventType];
        if (comment) {
            document.getElementById('clippy-speech').innerText = comment;
            document.getElementById('clippy-sound').play(); // Play alert sound
            clearTimeout(clippyTimeout); // Stop random talking
            clippyTimeout = setTimeout(startClippyTalk, 5000); // Resume talking after 5 seconds
        }
    }

    // Example usage of handleEvent function
    // Call handleEvent('save'); when a save event occurs
    
    function detectDevice() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(userAgent)) {
            console.log("User is on an Android device.");
            overlay.style.display = 'flex'; // Show overlay for mobile devices
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            console.log("User is on an iOS device.");
            overlay.style.display = 'flex'; // Show overlay for mobile devices
        } else if (/windows phone/i.test(userAgent)) {
            console.log("User is on a Windows Phone.");
            overlay.style.display = 'flex'; // Show overlay for mobile devices
        } else {
            console.log("User is on a PC.");
        }
    }

    // Call the function when the document is loaded
    window.onload = detectDevice;
    
    // Fetch existing messages
function fetchMessages() {
    fetch('/messages')
        .then(response => response.json())
        .then(messages => {
            const chatDisplay = document.getElementById('chat-display');
            chatDisplay.innerHTML = ''; // Clear current messages
            messages.forEach(msg => {
                const messageElement = document.createElement('div');
                messageElement.className = 'chat-message other';
                messageElement.textContent = msg;
                chatDisplay.appendChild(messageElement);
            });
            chatDisplay.scrollTop = chatDisplay.scrollHeight; // Scroll to the bottom
        });
}

// Send a new message
function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();

    if (message) {
        fetch('/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        }).then(() => {
            chatInput.value = '';
            fetchMessages(); // Reload messages
        });
    }
}

// Initial fetch when the page loads
window.onload = fetchMessages;

var counter_clock = 0;

function handleClockClick() {
    counter_clock++;
    if (counter_clock === 10) {
        document.body.style.backgroundImage = 'url("/images/kitty.jpg")';
        document.body.classList.add('background-image');
        counter_clock = 0;
    }

}
document.addEventListener("DOMContentLoaded", function () {
    initializeCanvas();
});

function setupCanvasEvents() {
    const canvas = document.getElementById("paintCanvas");
    const ctx = canvas.getContext("2d");

    let painting = false;
    let fillMode = false;
    let color = document.getElementById("colorPicker").value;
    let brushSize = document.getElementById("brushSize").value;

    // Ensure the canvas starts with a white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.getElementById("colorPicker").addEventListener("change", (e) => color = e.target.value);
    document.getElementById("brushSize").addEventListener("input", (e) => brushSize = e.target.value);

    // Mouse Events for Drawing
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("click", (e) => {
        if (fillMode) floodFill(e.offsetX, e.offsetY);
    });

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
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function clearCanvas() {
        ctx.fillStyle = "#FFFFFF";
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

    // Attach button functionalities
    document.querySelector(".toolbar button:nth-child(3)").onclick = clearCanvas;
    document.querySelector(".toolbar button:nth-child(4)").onclick = downloadImage;
    document.querySelector(".toolbar button:nth-child(5)").onclick = enableFill;
}

document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("heartButton");
    button.addEventListener("click", createHearts);
});

function createHearts() {
    const container = document.getElementById("heartContainer");

    for (let i = 0; i < 10; i++) {
        let heart = document.createElement("div");
        heart.classList.add("heart");

        // Set initial position at the bottom
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "0px"; // Start from the bottom
        heart.style.width = "40px";
        heart.style.height = "40px";
        heart.style.position = "absolute";
        heart.style.backgroundImage = "url('fav.png')";
        heart.style.backgroundSize = "cover";
        heart.style.opacity = "1";

        container.appendChild(heart);

        // Animate the hearts using JavaScript instead of CSS alone
        let animationTime = Math.random() * 2 + 3; // Random duration (3-5s)
        let moveUp = setInterval(() => {
            let currentBottom = parseInt(heart.style.bottom);
            if (currentBottom >= window.innerHeight) {
                clearInterval(moveUp);
                heart.remove();
            } else {
                heart.style.bottom = (currentBottom + 2) + "px"; // Move up step-by-step
                heart.style.opacity -= 0.01; // Gradually fade out
            }
        }, animationTime * 10);
    }
}
