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
