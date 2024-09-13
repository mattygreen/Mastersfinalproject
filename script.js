let jsonData = null;

fetch('https://raw.githubusercontent.com/mattygreen/jsonData/main/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        jsonData = data;
        jsonData.sort((a, b) => a.date - b.date);
        console.log(jsonData);


       let datawithDifference = getDifferentinYears(jsonData); 
        console.log(datawithDifference);

        createTimeLineStructure(jsonData);
        createBootstrapCarousel(jsonData);
        let timelineboxselectorAnimate = document.querySelectorAll('.timelinebox');
        datawithDifference.forEach(function(number){ 
            jsonData.push({difference:number})
            
        }); 
        console.log(jsonData); 

        // once the modal boxes and boostrap carousels have been created, now add the intersection observers onto the entries. The code for this was influenced by this Tutorial // 

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle('show', entry.isIntersecting);
            });
        }, {
            threshold: 0.4
        });

        timelineboxselectorAnimate.forEach(card => {
            observer.observe(card);
        });

        //create the tab indexes for the page// 
        let finalindex;

        const timelineboxselector = document.querySelectorAll('.timelinebox');
        timelineboxselector.forEach((entry, index) => {
            entry.setAttribute('tabindex', index + 1);
            console.log(index)
            finalindex = index;
        });
        console.log(finalindex)
        let returnArrowIndex = finalindex + 1;
        console.log(returnArrowIndex);

        let reverseButton1 = document.getElementById('reverseButton1');
        reverseButton1.setAttribute('tabindex', returnArrowIndex);
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeModal(); }});
                document.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') {
                        let focusedItem = document.activeElement;
                        
                        if (focusedItem && focusedItem.classList.contains('timelinebox')) {
                            const modalId = focusedItem.getAttribute('data-id');
                
                            if (modalId) {
                                showModal(modalId); 
                            }
                        }
                    }
                });
                



    })
    .catch(error => {
        console.error('the data failed to load', error);
    });

// building open and close functions for modals so that they are accessible, using Smashing Magazine best practice https://www.smashingmagazine.com/2014/09/making-modal-windows-better-for-everyone/// 


var lastFocus;

function showModal(modalid) {
    let modal = document.getElementById(modalid);
    modal.style.display = 'flex';
    lastFocus = document.activeElement;
    modal.setAttribute('tabindex', '0');
    modal.focus()
    

}

function closeModal() {
    
    let modals = document.querySelectorAll('.mymodal');
    modals.forEach(item => {
        item.style.display = 'none';
    });
    lastFocus.focus()

}



function createTimeLineStructure(data) {
    const listContainer = document.getElementById('listContainer');
    const modalsContainer = document.getElementById('modalsContainer');

    data.forEach(item => {

        const listItem = document.createElement('li');
        const Div = document.createElement('div');
        Div.className = 'timelineTitle';
        Div.innerText = `${item.title} ${item.time} ${item.date}`;
        Div.id=`timelinebox${item.id}`; 
    
        ariatext = 'navigation to modal box transcripts for ';
        ariatitle = `${item.title}`;
        ariaLabelAttribute = ariatext + ariatitle;
       
        dataidlabel = `modal${item.id}`;
        listItem.setAttribute('data-id', dataidlabel);
        listItem.setAttribute('role', 'button');
        listItem.setAttribute('ariallabel', ariaLabelAttribute);



        listItem.style.cursor = 'pointer';
        listItem.addEventListener('click', function () {
            showModal(`modal${item.id}`);
        });
        listItem.className = 'timelinebox';
        listItem.appendChild(Div);
        listContainer.appendChild(listItem);

        // Create modal structure
        const modal = document.createElement('div');
        modal.id = `modal${item.id}`;
        modal.className = 'mymodal';
        modal.setAttribute('aria-hidden', 'true'); 

        const modalContent = document.createElement('div');
        modalContent.className = 'modalcontent';
        let titleDiv = document.createElement('div');
        titleDiv.className = 'titleForModal';


        const closeButton = document.createElement('span');
        closeButton.className = 'closeBtn';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', closeModal)

        const modalTitle = document.createElement('h2');
        modalTitle.innerText = item.title;


        // Create two columns - one for the text and for the transcripts // 

        const columnDiv = document.createElement('div');
        columnDiv.className = 'columndiv';
        const column1 = document.createElement('div');
        column1.className = 'column carousel-column';

        const column2 = document.createElement('div');
        column2.className = 'column content-column';

        // Create image carousel and append it to the first column
        const imageCarouselContainer = document.createElement('div');
        imageCarouselContainer.id = `ImageContainer${item.id}`;
        column1.appendChild(imageCarouselContainer);
        const modalBody = document.createElement('p');
        modalBody.innerText = item.content;

        column2.appendChild(modalBody);
        titleDiv.appendChild(closeButton);
        titleDiv.appendChild(modalTitle);

        modalContent.appendChild(titleDiv)
        modalContent.appendChild(columnDiv);
        columnDiv.appendChild(column1);
        columnDiv.appendChild(column2);

        modal.appendChild(modalContent);
        modalsContainer.appendChild(modal);



        //this section of the code checks whether there's an audio file within the JSON which has been fetched // 
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


    window.onclick = function (event) {
        data.forEach(item => {
            const modal = document.getElementById(`modal${item.id}`);
            if (event.target == modal) {
                closeModal()
            }
        });
    }


    // add another event listener here for the for the use of the escape button close the modal box 
}


// this function and bootstrap code takes the Bootstrap code found on this website, and then builds an image carousel on the basis of the data that is pulled from the JSON// 

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
            divCreator.appendChild(divInner);

            carouselBase.appendChild(divCreator);

            // Add carousel items
            item.TranscriptImages.forEach((transcriptItem, index) => {
                const carouselItemDiv = document.createElement('div');
                carouselItemDiv.className = 'carousel-item';
                if (index === 0) {
                    carouselItemDiv.classList.add('active');
                }

                const imgEntry = document.createElement('img');
                imgEntry.src = transcriptItem.image;
                imgEntry.className = 'd-block w-100'; // Fix the class name typo

                // Handle missing alt text
                if (!transcriptItem.alt || transcriptItem.alt.length === 0) {
                    imgEntry.alt = 'This image is missing alt text';
                    console.log('This image is missing alt text');
                } else {
                    imgEntry.alt = transcriptItem.alt;
                }
                carouselItemDiv.appendChild(imgEntry);
                divInner.appendChild(carouselItemDiv);
            });

            // https://getbootstrap.com/docs/4.0/components/carousel  i used this as the basis to develop the code for this section - this basically builds the html and cc classes that are visible in this section, but does it dynamically, so it takes into account the number of images or if they are not any images// 
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
            carouselPrev.href = `#carouselExampleControls${item.id}`;
            carouselPrev.role = 'button';
            carouselPrev.setAttribute('data-slide', 'prev');

            const spanForPrev = document.createElement('span');
            spanForPrev.className = 'carousel-control-prev-icon';
            spanForPrev.setAttribute('aria-hidden', 'true');
            const spanForPrevTwo = document.createElement('span');
            spanForPrevTwo.className = 'sr-only';
            spanForPrevTwo.innerText = 'Previous';
            carouselPrev.appendChild(spanForPrev);
            carouselPrev.appendChild(spanForPrevTwo);
            carouselNext.appendChild(spanForNext);
            carouselNext.appendChild(spanForNextTwo);

            divCreator.appendChild(carouselPrev);
            divCreator.appendChild(carouselNext);
        }
    });
}



const reverseButtons = document.querySelectorAll('.reversebutton');


document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {

        let focusedItem = document.activeElement;
        if (focusedItem && focusedItem.id === 'reverseButton1') {
            window.location.href = 'index.html';
        }
    }


});

reverseButtons.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

const downArrow = document.getElementById('downArrow');

// Function to check if user is at the bottom of the page. This returns whether it is or not which can then be used in a conditional statement// 
function isAtBottomOfScreen() {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
}

// Event listener for scroll
window.addEventListener('scroll', () => {

    if (isAtBottomOfScreen()) {
        downArrow.style.display = 'none';
    } else {
        downArrow.style.display = 'block';
    }
});


/* the function below compares two different arrays and then gives a number value of the difference between these arrays. I have done this so that I can space the timeline on the basis of the difference between the years, to give it a chronological and temporal feel*/


function getDifferentinYears(array){
    const getYears= array.map(function(element){
       let numberYears=element.date
       return numberYears
        
    })
    
    let numberYears = getYears.map(Number); 
    console.log(numberYears); 

/*    
    console.log(getYears); 
    console.log(getYears[0]); 
    This found the numbers as strings, so I converted them to numbers seen above//console.log(typeof(getYears[0])); 

*/ 
    let differenceArray = numberYears.map(function(element, index, array) {
        
       let difference= array[index+1]-array[index]; 
       return difference
    });
    return differenceArray;
}

// create a function that can decide the size of the timeline//

/*There are a few ideas here that i need to fleshout 
1. the size of the timeline is x 
x=numberofentries*spaceforentries*
spaceforentries=boxsize+reasonablegapbetweenthem 

Do we want the entries to change because that will then change the formula? 

*/
