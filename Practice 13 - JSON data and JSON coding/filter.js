// script.js

// Sample JSON data
const jsonData = [
    {
        "id": 1,
        "title": "New Cross Fire", 
        "theme": "example",
        "time": "16:42",
        "date": "12/12/12",
        "TranscriptImages":  [
            { "image": "images/Newcrossfire1.png", "description": "Description 1" },
            { "image": "images/Newcrossfire2.png", "description": "Description 2" },
            { "image": "images/Newcrossfire1.png", "description": "Description 1" },
        ],
        "content": "This is the content of modal 1."
    },
    {
        "id": 2,
        "title": "Another Fire", 
        "theme": "example",
        "time": "16:42",
        "date": "12/12/12",
        "TranscriptImages":  [
            { "image": "images/Newcrossfire1.png", "description": "Description 1" },
            { "image": "images/Newcrossfire2.png", "description": "Description 2" }
        ],
        "content": "This is the content of modal 2."
    },
    {
        "id": 3,
        "title": "Fire Incident", 
        "theme": "incident",
        "time": "16:42",
        "date": "12/12/12",
        "TranscriptImages":  [
            { "image": "images/Newcrossfire1.png", "description": "Description 1" },
            { "image": "images/Newcrossfire2.png", "description": "Description 2" }
        ],
        "content": "This is the content of modal 3."
    },
    {
        "id": 4,
        "title": "Unexpected Fire",
        "theme": "unexpected",
        "time": "16:42",
        "date": "12/12/12",
        "TranscriptImages":  [
            { "image": "images/Newcrossfire1.png", "description": "Description 1" },
            { "image": "images/Newcrossfire2.png", "description": "Description 2" }
        ],
        "content": "This is the content of modal 4."
    },
];

// Function to filter items based on selected themes
function filterItems() {
    const selectedThemes = Array.from(document.querySelectorAll('#filterContainer input:checked'))
        .map(input => input.value);

    // Update the display based on selected themes
    const listContainer = document.getElementById('listContainer');
    listContainer.innerHTML = ''; // Clear the list first

    jsonData.forEach(item => {
        if (selectedThemes.includes(item.theme)) {
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
        }
    });
}

// Function to create modals and buttons
function createModalsAndList(data) {
    const modalsContainer = document.getElementById('modalsContainer');

    data.forEach(item => {
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

        // Append modal body content to the second column
        const modalBody = document.createElement('p');
        modalBody.innerText = item.content;
        column2.appendChild(modalBody);

        // Append elements to modal content
        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(column1);
        modalContent.appendChild(column2);

        // Append modal content to modal
        modal.appendChild(modalContent);

        // Append modal to modals container
        modalsContainer.appendChild(modal);
    });

    // Add event listener to close modal when clicking outside of it
    window.onclick = function(event) {
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
        <img src="${item.image}" alt="Image">
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

    entry.TranscriptImages.forEach((item, index) => {
        const carouselItem = createCarouselItem(item);
        if (index === 0) {
            carouselItem.classList.add('active'); // Make the first item active
        }
        carouselInner.appendChild(carouselItem);
    });

    // Previous button
    const prevButton = document.createElement('a');
    prevButton.className = 'carousel-control-prev';
    prevButton.href = `#carousel-${entry.id}`;
    prevButton.role = 'button';
    prevButton.dataset.slide = 'prev';
    prevButton.innerHTML = `
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    `;
    carouselContainer.appendChild(prevButton);

    // Next button
    const nextButton = document.createElement('a');
    nextButton.className = 'carousel-control-next';
    nextButton.href = `#carousel-${entry.id}`;
    nextButton.role = 'button';
    nextButton.dataset.slide = 'next';
    nextButton.innerHTML = `
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    `;
    carouselContainer.appendChild(nextButton);

    return carouselContainer;
}

// Create filters and modals on page load 
window.onload = () => {
    createModalsAndList(jsonData); // Create the modals
    filterItems(); // Display all items initially

    // Add event listener to filter checkboxes
    const filterCheckboxes = document.querySelectorAll('#filterContainer input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterItems);
    });

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
