// All DOM Elements
const disk = document.getElementById('disk');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const playBtn = document.getElementById('play-pause');
const volumeBtn = document.getElementById('volume');

// All Required Variables


// All Functions
// 1. Function to play/pause audio
const playPause = () => {
    if(audio.paused) {
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        audio.play();
    } else {
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        audio.pause();
    }
    disk.classList.toggle('rotate');
}

// 2. Function to update volume
const updateVolume = () => {
    switch (audio.volume) {
        case 1:
            audio.volume = 0;
            volumeBtn.innerHTML = '<i class="fa-solid fa-volume-off"></i>';
            break;
        case 0.5:
            audio.volume = 1;
            volumeBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            break;
        case 0:
            audio.volume = 0.5;
            volumeBtn.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
            break;
    }
}

// 3. Function to Update Progress bar
const updateProgressBar = () => {
    progressBar.style.width = `${(audio.currentTime * 100) / audio.duration}%`
    if(audio.currentTime === audio.duration) {
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        audio.pause();
        audio.volume = 1;
        audio.currentTime = 0;
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        if(disk.classList.contains('rotate')){
            disk.classList.remove('rotate');
        }
    }
}

// 4. Function to adjust audio using progress container
const adjustAudio = e => {
    console.log(e.offsetX, progressContainer.clientWidth);
    audio.currentTime = (e.offsetX / progressContainer.clientWidth) * audio.duration;
}

// All Event Listeners
// 1. Event Listener to play/pause audio
playBtn.addEventListener('click', playPause);

// 2. Event Listener to update volume
volumeBtn.addEventListener('click', updateVolume);

// 3. Event Listener to update progress bar
audio.addEventListener('timeupdate', updateProgressBar);

// 4. Event Listener to adjust audio using progress container
progressContainer.addEventListener('click', adjustAudio);
