// All DOM Elements
const form = document.getElementById('form');
const toggleFormButton = document.getElementById('toggle');
const closeFormButton = document.getElementById('close');
const selectLanguage = document.getElementById('select-language');
const textInput = document.getElementById('text');
const container = document.getElementById('container');

// All Required Variables
const synth = window.speechSynthesis;
let voices = [];
let imagesData = [
    {
        name: 'aurora.jpg',
        title: 'Aurora Borealis',
        description: 'There is aurora borealis in the image.',
    },
    {
        name: 'bird.jpg',
        title: 'Flying Bird',
        description: 'There is a flying bird in this image.',
    },
    {
        name: 'city.jpg',
        title: 'City view',
        description: 'There is a city view in the image.',
    },
    {
        name: 'flowers.jpg',
        title: 'Flowers',
        description: 'There are flowers in the image.',
    },
    {
        name: 'forest.jpg',
        title: 'Forest',
        description: 'There is a forest in the image.',
    },
    {
        name: 'horse.jpg',
        title: 'Horse',
        description: 'There is a horse in the image.',
    },
    {
        name: 'house.jpg',
        title: 'House',
        description: 'There is a house on a lake in the image.',
    },
    {
        name: 'mountains.jpg',
        title: 'Mountains',
        description: 'There are mountains in the image.',
    },
    {
        name: 'snow.jpg',
        title: 'Snowy Mountains',
        description: 'There are snowy mountains in the image.',
    },
    {
        name: 'sunset.jpg',
        title: 'Sunset View',
        description: 'There is a sunset view in the image.',
    },
    {
        name: 'surfing.jpg',
        title: 'Surfing',
        description: 'There is a man surfing in the image.',
    },
    {
        name: 'vulture.jpg',
        title: 'Vulture',
        description: 'There is a vulture in the image.',
    },
]

// All Functions
// 1 - Toggle form show class
const toggleForm = e => {
    e.preventDefault();
    form.classList.toggle('show');
};

// 2 - Function to populate select tag with available voices
const populateVoiceList = () => {
    voices = synth.getVoices();
    for (let i = 0; i < voices.length ; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
  
      if (voices[i].default) {
        option.textContent += ' — DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      selectLanguage.appendChild(option);
    }
}

// 3 - Function to speak custom text from the form
const speakCustomText = e => {
    e.preventDefault();
    const utterThis = new SpeechSynthesisUtterance(textInput.value);
    const selectedOption = selectLanguage.selectedOptions[0].getAttribute('data-name');
    for (let i = 0; i < voices.length ; i++) {
        if (voices[i].name === selectedOption) {
          utterThis.voice = voices[i];
        }
    }
    synth.speak(utterThis);
}

// 4 - Function to add images inside container
const addImages = () => {
    // refresh container
    container.innerHTML = '';

    // iterate images data
    imagesData.map(data => {
        // create box
        const box = document.createElement('div');
        box.className = 'box';
        // create box child elements
        const image = document.createElement('img');
        const para = document.createElement('p');
        image.setAttribute('src', `./assets/images/${data.name}`);
        image.setAttribute('image-description', data.description);
        para.innerText = `${data.title}`;
        // append box child elements
        box.appendChild(image);
        box.appendChild(para);
        // append box
        container.appendChild(box);
    })
}

// 5 - Function to speak image description
const speakImageDescription = e => {
    e.preventDefault();
    e.path.forEach(element => {
        if(element.className === 'box') {
            const imageDescription = element.querySelector('img').getAttribute('image-description');
            const utterThis = new SpeechSynthesisUtterance(imageDescription);
            const selectedOption = selectLanguage.selectedOptions[0].getAttribute('data-name');
            for (let i = 0; i < voices.length ; i++) {
                if (voices[i].name === selectedOption) {
                  utterThis.voice = voices[i];
                }
            }
            synth.speak(utterThis);
        }
    })
}

// All Event Listeners
// 1 - Event Listener to toggle show class on clicking toggle button
toggleFormButton.addEventListener('click', toggleForm);

// 2 - Event Listener to toggle show class on clicking close button
closeFormButton.addEventListener('click', toggleForm);

// 3 - Event Listener to speak custom text on submit form
form.addEventListener('submit', speakCustomText);

// 4 - Event Listener to speak image description on clicking box
container.addEventListener('click', speakImageDescription);

// Init 
addImages();
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}