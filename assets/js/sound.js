var bgAudio = new Audio('./assets/audio/The Avengers Theme Song.mp3');
bgAudio.loop = true;
bgAudio.volume = 0.5;

//background voice add event listner
$(document).on("click", () => {
    bgAudio.play().catch(error => console.error("Audio playback failed:", error));
});

// Function to show the sound overlay
export default function showSoundOverlay() {
    var overlay = document.createElement('div');
    overlay.className = 'sound-overlay';
    overlay.innerHTML = `
        <div class="sound-controls">
            <h3>Sound Settings</h3>
            <label><span>Volume:</span> <input type="range" id="volume-control" min="0" max="1" step="0.01" value="${bgAudio.volume}"></label>
            <button id="mute-btn" class="main-menu-btn">${bgAudio.muted ? 'Unmute' : 'Mute'}</button>
            <button id="close-overlay" class="main-menu-btn">Close</button>
        </div>`;
    $(".container").append(overlay);
    // Add event listeners for the controls
    document.getElementById('volume-control').addEventListener('input', (e) => {
        bgAudio.volume = parseFloat(e.target.value);
    });
    document.getElementById('mute-btn').addEventListener('click', () => {
        bgAudio.muted = !bgAudio.muted;
        document.getElementById('mute-btn').textContent = bgAudio.muted ? 'Unmute' : 'Mute';
    });
    document.getElementById('close-overlay').addEventListener('click', () => {
        $(".sound-overlay").remove(); 
        console.log(bgAudio.volume);
              
    });
}