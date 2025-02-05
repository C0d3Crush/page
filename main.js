// Import all modules in main.js
import { openWindow, closeWindow, toggleStartMenu } from "./windows.js";
import { makeDraggable } from "./drag.js";
import { startDvdScreensaver } from "./screensaver.js";

document.getElementById("start-button").addEventListener("click", toggleStartMenu);

["my-computer", "projects", "recycle-bin", "images-folder", "dvd-screensaver", "radio", "snake", "notes"].forEach(makeDraggable);
