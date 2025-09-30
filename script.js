// 1. Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// 2. Define Core Functions

/**
 * Toggles the video between play and pause states.
 */
function togglePlay() {
    video.paused ? video.play() : video.pause();
}

/**
 * Updates the play/pause button text using ► and ❚ ❚ characters.
 */
function updateButton() {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

/**
 * Sets the video's volume or playbackRate based on the input range value.
 * Uses 'name' attribute to identify which property to update.
 */
function handleRangeUpdate() {
    // this.name will be 'volume' or 'playbackRate'
    video[this.name] = this.value;
}

/**
 * Skips the video forward or backward based on the data-skip attribute.
 */
function skip() {
    const skipTime = parseFloat(this.dataset.skip);
    video.currentTime += skipTime;
}

/**
 * Updates the progress bar width based on the video's current time.
 */
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    // Set the width of the progress__filled element
    progressBar.style.flexBasis = `${percent}%`;
}

/**
 * Allows the user to click on the progress bar to scrub (jump) to a time.
 */
function scrub(e) {
    // Calculate the time based on the click position relative to the progress bar width
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


// 3. Attach Event Listeners

// Play/Pause toggling
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// Update button icon on state change
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Update progress bar as video plays
video.addEventListener('timeupdate', handleProgress);

// Volume and Speed controls
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
// Use 'mousemove' for instant feedback while dragging
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// Skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// Scrubbing functionality (Progress bar clicking/dragging)
let mousedown = false; // Tracks if the mouse button is currently held down
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
// Only scrub on mousemove if the mouse button is pressed down
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));