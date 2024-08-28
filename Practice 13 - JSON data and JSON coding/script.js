const jsonData = [
    {
        "id": 1,
        "title": "New Cross Fire",
        "theme": "example",
        "time": "16:42",
        "date": "12/12/12",
        "TranscriptImages": [
            { "image": "images/Newcrossfire1.png", "description": "This image shows  1", "alt": "alt text for image 1" },
            { "image": "images/Newcrossfire2.png", "description": "Description 2" },
            { "image": "images/Newcrossfire1.png", "description": "Description 1" },
        ],
        "content": "This is the content of modal 1.",
        "audiofile": "audio/Radioclipdemo1.mp3",
        "audiocontent": "this is the audio content for this part"
    },
    {
        "id": 2,
        "title": "New Cross Fire",
        "theme": "example",
        "time": "16:42",
        "date": "12/12/12",
        "TranscriptImages": [
            { "image": "images/Newcrossfire1.png", "description": "Description 1" },
            { "image": "images/Newcrossfire2.png", "description": "Description 2" }
        ],
        "content": "This is the content of modal 2."
    },
    {
        "id": 3,
        "title": "New Cross Fire",
        "theme": "example",
        "time": "16:42",
        "date": "12/12/12",
        "TranscriptImages": [
            { "image": "images/Newcrossfire1.png", "description": "Description 1" },
            { "image": "images/Newcrossfire2.png", "description": "Description 2" }
        ],
        "content": "This is the content of modal 2."
    }, {
        "id": 4,
        "title": "New Cross Fire",
        "theme": "example",
        "time": "16:42",
        "date": "12/12/12",
        "TranscriptImages": [
            { "image": "images/Newcrossfire1.png", "description": "Description 1" },
            { "image": "images/Newcrossfire2.png", "description": "Description 2" }
        ],
        "content": "This is the content of modal 2."
    }, {
        "id": 5,
        "title": "New Cross Fire",
        "theme": "example",
        "time": "16:42",
        "date": "12/12/12",
        "TranscriptImages": [
            { "image": "images/Newcrossfire1.png", "description": "Description 1" },
            { "image": "images/Newcrossfire2.png", "description": "Description 2" }
        ],
        "content": "This is the content of modal 2."
    },
];



// Function to create modals and buttons
function createModalsAndList(data) {
    const listContainer = document.getElementById('listContainer');
    const modalsContainer = document.getElementById('modalsContainer');

    data.forEach(item => {
        // Create list item to open modal
        const listItem = document.createElement('li');
        const Div = document.createElement('div');
        Div.className = 'timelineTitle';
        Div.innerText = `${item.title} ${item.time} ${item.date}`;

        listItem.style.cursor = 'pointer';
        listItem.style.paddingTop = `${item.size}px`;
        listItem.style.paddingBottom = `${item.size}px`;
        listItem.onclick = () => document.getElementById(`modal${item.id}`).style.display = 'block';
        listItem.className = 'timelinebox';
        listItem.appendChild(Div);
        listContainer.appendChild(listItem);

        // Create modal structure
        const modal = document.createElement('div');
        modal.id = `modal${item.id}`;
        modal.className = 'modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const closeButton = document.createElement('span');
        closeButton.className = 'closeBtn';
        closeButton.innerHTML = '&times;';
        closeButton.onclick = () => modal.style.display = 'none';

        const modalTitle = document.createElement('h2');
        modalTitle.innerText = item.title;

        // Create two columns
        const column1 = document.createElement('div');
        column1.className = 'column carousel-column';

        const column2 = document.createElement('div');
        column2.className = 'column content-column';

        // Create image carousel and append it to the first column
        const imageCarouselContainer = document.createElement('div');
        imageCarouselContainer.id = `ImageContainer${item.id}`;
        column1.appendChild(imageCarouselContainer);

        // creates the modal content area and then searches for 
        const modalBody = document.createElement('p');
        modalBody.innerText = item.content;
        
        column2.appendChild(modalBody); 
        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(column1);
        modalContent.appendChild(column2);
        
        // Append modal content to modal
        modal.appendChild(modalContent);

        // Append modal to modals container
        modalsContainer.appendChild(modal);

        if (!item.hasOwnProperty('audiofile') || item.audiofile === "") {
            console.log('There is no audio file');
        }
        else {
        const audiotitle = document.createElement('h3')
        audiotitle.innerText= `${item.audiocontent}`;
        const audioTag = document.createElement('audio'); 
        const audiotagsource =document.createElement('source'); 
        audiotagsource.src=`${item.audiofile}`; 
        audioTag.controls= true; 
        column2.appendChild(audiotitle);
        column2.appendChild(audioTag); 
        audioTag.appendChild(audiotagsource);      
        }
        
    });

    // Add event listener to close modal when clicking outside of it
    window.onclick = function (event) {
        data.forEach(item => {
            const modal = document.getElementById(`modal${item.id}`);
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Function to create a carousel item
function createCarouselItem(item) {
    const div = document.createElement('div');
    div.className = 'carousel-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.alt}">
        <div class="carousel-caption">
            <p>${item.description}</p>
        </div>
    `;
    return div;
}

// Function to create a carousel for a specific entry
function createCarousel(entry) {
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel';
    carouselContainer.id = `carousel-${entry.id}`; // Unique ID for the carousel

    const carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-inner';
    carouselContainer.appendChild(carouselInner);

    entry.TranscriptImages.forEach(item => {
        const carouselItem = createCarouselItem(item);
        carouselInner.appendChild(carouselItem);
    });

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-control prev';
    prevButton.innerHTML = '&#10094;';
    prevButton.onclick = () => changeSlide(-1, entry.id);
    carouselContainer.appendChild(prevButton);

    // Next button
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-control next';
    nextButton.innerHTML = '&#10095;';
    nextButton.onclick = () => changeSlide(1, entry.id);
    carouselContainer.appendChild(nextButton);

    return carouselContainer;
}

let currentIndexes = {};

// Function to show the current slide
function showSlide(index, entryId) {
    const carouselInner = document.getElementById(`carousel-${entryId}`).querySelector('.carousel-inner');
    const totalItems = carouselInner.querySelectorAll('.carousel-item').length;
    currentIndexes[entryId] = index;

    if (index >= totalItems) {
        currentIndexes[entryId] = 0;
    }
    if (index < 0) {
        currentIndexes[entryId] = totalItems - 1;
    }

    carouselInner.style.transform = `translateX(${-currentIndexes[entryId] * 100}%)`;
}

// Function to change the slide
function changeSlide(direction, entryId) {
    showSlide(currentIndexes[entryId] + direction, entryId);
}

// Create modals and list items on page load 
window.onload = () => {
    createModalsAndList(jsonData); // Create the modals
    jsonData.forEach(entry => {
        const container = document.getElementById(`ImageContainer${entry.id}`); // Get the correct image container
        if (container) {
            const carousel = createCarousel(entry); // Create the carousel for this entry
            container.appendChild(carousel); // Append it to the corresponding container
            showSlide(0, entry.id); // Initialize first slide
        } else {
            console.error(`Container with ID ImageContainer${entry.id} not found.`);
        }
    });
};


// add event listener for the reverse button 


const reverseButtons = document.querySelectorAll('.reversebutton'); 

reverseButtons.forEach(button => {
    button.addEventListener('click', () => { 
        window.location.href = 'https://www.bbc.co.uk'; // need to change this to correct URL wohen website is collated // 
    });
});

