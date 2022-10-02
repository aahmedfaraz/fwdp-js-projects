// All DOM Elements
const video = document.getElementById('video');
const screenPlayButton = document.getElementById('screen-btn');
const playPauseIcon = document.getElementById('play-pause');
const stopIcon = document.getElementById('stop');
const volumeIcon = document.getElementById('volume');
const fullScreenIcon = document.getElementById('full-screen');
const currentTimeDOM = document.getElementById('current-time');
const totalTimeDOM = document.getElementById('total-time');
const progressDOM = document.getElementById('progress');
const mainDOM = document.getElementById('main');

// All Required Variables
let volumeValue = 0.5;
let videoOnFullScreen = false;

// All Functions
// 1 - Function to change icon inside a button
const changeButtonIcon = (buttonDOM, iconClass) => {
    buttonDOM.innerHTML = `<i class="${iconClass}"></i>`
}

// 2 - Function to toggle video play/pause
const toggleVideo = () => {
    if(video.paused) {
        video.play();
        changeButtonIcon(playPauseIcon, 'fa-solid fa-circle-pause');
        if(screenPlayButton.classList.contains('show')) {
            screenPlayButton.classList.remove('show');
        }
    } else {
        video.pause();
        changeButtonIcon(playPauseIcon, 'fa-solid fa-circle-play');
    }
}

// 3 - Function to provide timeFormat
const timeFormat = (secondsValue) => {
    secondsValue = Math.floor(secondsValue);
    let seconds = (secondsValue >= 60 ? secondsValue % 60 : secondsValue).toString();
    let minutes = (secondsValue < 60 ? 0 : Math.floor(secondsValue / 60)).toString();
    seconds = seconds.length === 1 ? `0${seconds}` : seconds;
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;
    return `${minutes}:${seconds}`;
}

// 4 - Function to update DOM as video plays
const trackVideo = () => {
    currentTimeDOM.innerHTML = timeFormat(video.currentTime);
    progressDOM.value = (video.currentTime * 100) / video.duration;
}

// 5 - Function to stop video
const stopVideo = () => {
    video.pause();
    video.currentTime = 0;
    progressDOM.value = 0;
    changeButtonIcon(playPauseIcon, 'fa-solid fa-circle-play');
    volumeValue = 0.5;
    video.volume = volumeValue;
    changeButtonIcon(volumeIcon, 'fa-solid fa-volume-low');
    if(!screenPlayButton.classList.contains('show')) {
        screenPlayButton.classList.add('show');
    }
}

// 6 - Function to toggle full screen
const toggleFullScreen = () => {
    if(!videoOnFullScreen) {
        if (main.requestFullscreen) {
            main.requestFullscreen();
            
            changeButtonIcon(fullScreenIcon, 'fa-solid fa-compress');
            videoOnFullScreen = true;
        } else if (main.webkitRequestFullscreen) { /* Safari */
            main.webkitRequestFullscreen();
            changeButtonIcon(fullScreenIcon, 'fa-solid fa-compress');
            videoOnFullScreen = true;
        } else if (main.msRequestFullscreen) { /* IE11 */
            main.msRequestFullscreen();
            changeButtonIcon(fullScreenIcon, 'fa-solid fa-compress');
            videoOnFullScreen = true;
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            changeButtonIcon(fullScreenIcon, 'fa-solid fa-expand');
            videoOnFullScreen = false;
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
            changeButtonIcon(fullScreenIcon, 'fa-solid fa-expand');
            videoOnFullScreen = false;
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
            changeButtonIcon(fullScreenIcon, 'fa-solid fa-expand');
            videoOnFullScreen = false;
        }
    }
}

// All Event Listeners
// 1 - Event listener to play video on clicking screen button
screenPlayButton.addEventListener('click', e => {
    video.play();
    screenPlayButton.classList.remove('show');
    changeButtonIcon(playPauseIcon, 'fa-solid fa-circle-pause');
});

// 2 - Event Listener to play/pause video
playPauseIcon.addEventListener('click', toggleVideo);

// 3 - Event Listener to show total timestamp
window.addEventListener('load', e => {
    totalTimeDOM.innerHTML = timeFormat(video.duration);
    video.volume = volumeValue;
    changeButtonIcon(volumeIcon, 'fa-solid fa-volume-low');
});

// 4 - Event Listener to update current timestamp
video.addEventListener('timeupdate', trackVideo);

// 5 - Event Listener to control video
progressDOM.addEventListener('change', e => {
    const currentTime = (e.target.value * video.duration) / 100;
    video.currentTime = currentTime;
});

// 6 - Event Listener to stop video
stopIcon.addEventListener('click', stopVideo);

// 7 - Event Listener to update volume
volumeIcon.addEventListener('click', e => {
    switch (volumeValue) {
        case 0:
            volumeValue = 0.5;
            video.volume = volumeValue;
            changeButtonIcon(volumeIcon, 'fa-solid fa-volume-low');
            break;
        case 0.5:
            volumeValue = 1;
            video.volume = volumeValue;
            changeButtonIcon(volumeIcon, 'fa-solid fa-volume-high');
            break;
        case 1:
            volumeValue = 0;
            video.volume = volumeValue;
            changeButtonIcon(volumeIcon, 'fa-solid fa-volume-xmark');
            break;
    }
})

// 8 - Event Listener to full screen video
fullScreenIcon.addEventListener('click', toggleFullScreen);