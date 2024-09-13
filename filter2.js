const jsonData = [
    {
        "id": 1,
        "title": "New Cross Fire",
        "theme": "example",
        "time": "16:42",
        "date": "1992",
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
        "time": "2001",
        "date": "1885",
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
        "date": "1843",
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
        "date": "1239",
        "TranscriptImages": [
            { "image": "images/Newcrossfire1.png", "description": "Description 1" },
            { "image": "images/Newcrossfire2.png", "description": "Description 2" }
        ],
        "content": "This is the content of modal 2."
    }, {
        "id": 5,
        "title": "New Cross Fire",
        "theme": "example",
        "time": "14:32",
        "date": "2010",
        "TranscriptImages": [
            { "image": "images/Newcrossfire1.png", "description": "Description 1" },
            { "image": "images/Newcrossfire2.png", "description": "Description 2" }
        ],
        "content": "This is the content of modal 2."
    },
];

jsonData.sort((a, b) => a.date - b.date);
console.log(jsonData); 



function filterItems() {
    const selectedThemes = Array.from(document.querySelectorAll('#filterContainer input:checked'))
        .map(input => input.value);
    const listContainer = document.getElementById('listContainer');
    listContainer.innerHTML = ''; 
    //add the range finder code here too // 

    let slider = document.getElementById('rangeNumber');
    let sliderValue = slider.value; // Set initial value
    slider.oninput = function () {
    sliderValue = this.value; 
    output.innerHTML = sliderValue; // Update the display
    filterItems(); 
};


    jsonData.forEach(item => {
        if (selectedThemes.includes(item.theme) && item.date <= sliderValue) {
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

};
// For some reason when I remove this duplication of code the code breaks, I am not really sure as to why? // 


const selectedThemes = Array.from(document.querySelectorAll('#filterContainer input:checked'))
    .map(input => input.value);
const listContainer = document.getElementById('listContainer');
listContainer.innerHTML = ''; // Clear the list first



function createModalsAndList(data) {
    const listContainer = document.getElementById('listContainer');
    const modalsContainer = document.getElementById('modalsContainer');

    data.forEach(item => {

        const modal = document.createElement('div');
        modal.id = `modal${item.id}`;
        modal.className = 'mymodal';

        const modalContent = document.createElement('div');
        modalContent.className = 'modalcontent';
        let titleDiv =document.createElement('div'); 
        titleDiv.className='titleForModal'; 



        const closeButton = document.createElement('span');
        closeButton.className = 'closeBtn';
        closeButton.innerHTML = '&times;';
        closeButton.onclick = () => modal.style.display = 'none';

        const modalTitle = document.createElement('h2');
        modalTitle.innerText = item.title;


        // Create two columns

        const columnDiv =document.createElement('div'); 
        columnDiv.className='columndiv'; 
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
        titleDiv.appendChild(modalTitle); 
        modalContent.appendChild(titleDiv)
        modalContent.appendChild(columnDiv);
        columnDiv.appendChild(column1);
        columnDiv.appendChild(column2);
        

        // Append modal content to modal
        modal.appendChild(modalContent);

        // Append modal to modals container
        modalsContainer.appendChild(modal);

        if (!item.hasOwnProperty('audiofile') || item.audiofile === "") {
            console.log('There is no audio file');
        }
        else {
            const audiotitle = document.createElement('h3')
            audiotitle.innerText = `${item.audiocontent}`;
            const audioTag = document.createElement('audio');
            const audiotagsource = document.createElement('source');
            audiotagsource.src = `${item.audiofile}`;
            audioTag.controls = true;
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


function createBootstrapCarousel(data) { 
    data.forEach(item => { 
        const carouselBase = document.getElementById(`ImageContainer${item.id}`);
        
        if (!item.TranscriptImages || item.TranscriptImages.length === 0) {
            const noTranscripts = document.createElement('div'); 
            noTranscripts.className = 'NoTranscripts';
            const noTranscriptsTitle = document.createElement('h3'); 
            noTranscriptsTitle.innerHTML = 'There are currently no transcripts for this entry'; 
            // add a picture that will show no transcript 
            noTranscripts.appendChild(noTranscriptsTitle); 
            carouselBase.appendChild(noTranscripts); 
            
            console.log('There are no images in this file yet');
        } else {
            // Create carousel container
            const divCreator = document.createElement('div'); 
            divCreator.className = 'carousel slide'; 
            divCreator.id = `carouselExampleControls${item.id}`; 
            divCreator.setAttribute('data-ride', 'carousel'); 
            
            const divInner = document.createElement('div'); 
            divInner.className = 'carousel-inner'; 
            divCreator.appendChild(divInner); // Append inner container to carousel

            carouselBase.appendChild(divCreator); // Append carousel to the base

            // Add carousel items
            item.TranscriptImages.forEach((transcriptItem, index) => {
                const carouselItemDiv = document.createElement('div'); 
                carouselItemDiv.className = 'carousel-item'; 
                if (index === 0) {
                    carouselItemDiv.classList.add('active'); // Make the first item active
                }

                const imgEntry = document.createElement('img'); 
                imgEntry.src = transcriptItem.image; 
                imgEntry.className = 'd-block w-100'; 
                // Handle missing alt text
                if (!transcriptItem.alt || transcriptItem.alt.length === 0) {
                    imgEntry.alt = 'This image is missing alt text';
                    console.log('This image is missing alt text');
                } else { 
                    imgEntry.alt = transcriptItem.alt; 
                }

                // Append image to the carousel item and item to the inner div
                carouselItemDiv.appendChild(imgEntry);
                divInner.appendChild(carouselItemDiv);
            });

          
            const carouselNext = document.createElement('a'); 
            carouselNext.className = 'carousel-control-next'; 
            carouselNext.href = `#carouselExampleControls${item.id}`; 
            carouselNext.role = 'button'; 
            carouselNext.setAttribute('data-slide', 'next');
            
            const spanForNext = document.createElement('span'); 
            spanForNext.className = 'carousel-control-next-icon'; 
            spanForNext.setAttribute('aria-hidden', 'true'); 
            const spanForNextTwo = document.createElement('span'); 
            spanForNextTwo.className = 'sr-only'; 
            spanForNextTwo.innerText = 'Next';

            const carouselPrev = document.createElement('a'); 
            carouselPrev.className = 'carousel-control-prev'; 
            carouselPrev.href = `#carouselExampleControls${item.id}`; // Unique ID for each carousel
            carouselPrev.role = 'button'; 
            carouselPrev.setAttribute('data-slide', 'prev');
            
            const spanForPrev = document.createElement('span'); 
            spanForPrev.className = 'carousel-control-prev-icon'; 
            spanForPrev.setAttribute('aria-hidden', 'true'); 
            const spanForPrevTwo = document.createElement('span'); 
            spanForPrevTwo.className = 'sr-only'; 
            spanForPrevTwo.innerText = 'Previous';

            // Append spans to the control buttons
            carouselPrev.appendChild(spanForPrev); 
            carouselPrev.appendChild(spanForPrevTwo); 
            carouselNext.appendChild(spanForNext); 
            carouselNext.appendChild(spanForNextTwo); 

            // Append control buttons to the carousel
            divCreator.appendChild(carouselPrev);
            divCreator.appendChild(carouselNext); 
        }
    });
}



// Create modals and list items on page load 
window.onload = () => {
    filterItems();
    const filterCheckboxes = document.querySelectorAll('#filterContainer input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterItems);
    });

    let slider = document.getElementById('rangeNumber');
    slider.oninput = () => {
        filterItems(); // Re-filter items when slider changes
    };

    createModalsAndList(jsonData); // Create the modals
    createBootstrapCarousel(jsonData)


   
};


// add event listener for the reverse button 


const reverseButtons = document.querySelectorAll('.reversebutton');

reverseButtons.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = 'https://www.bbc.co.uk'; // need to change this to correct URL wohen website is collated // 
    });
});

