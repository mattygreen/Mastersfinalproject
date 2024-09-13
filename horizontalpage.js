let arrowLeft = document.getElementById('arrowleft'); 
arrowLeft.addEventListener('click', moveLeft)

let arrowRight =document.getElementById('arrowright'); 
arrowRight.addEventListener('click', moveRight)
const translatePattern = /translate\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\)/;
const step = 100; // Step size for moving
function moveLeft() {
    console.log('Moving left step clicks');
    adjustTranslation(-step);
}

function moveRight() {
    console.log('Moving right step clicks');
    adjustTranslation(step);
}

function adjustTranslation(StepInput) {
const element = document.getElementById('movingTool2');

let transform = element.getAttribute('transform');
console.log(typeof(transform)); 
    console.log('Current transform:', transform);


    // this line of code was was developed with the help of chatGPT as i didn't know how to write Regex to extract the number from the string// 

    const translatePattern = /translate\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\)/;
    let translateMatch = transform.match(translatePattern);

    if (!translateMatch) {
        console.error('No valid translate function found in the transform attribute. Adding one.');
        // Assume default (0,0) if no translate is found
        transform += ` translate(${StepInput}, 0)`;
        console.log('Updated transform:', transform);
        element.setAttribute('transform', transform);
        return;
    }

    let x = parseFloat(translateMatch[1]);
    let y = parseFloat(translateMatch[2]);

    console.log('Current X:', x, 'Current Y:', y)
    x += StepInput;
    const newTransform = transform.replace(translatePattern, `translate(${x}, ${y})`);
    console.log('New transform:', newTransform);

    element.setAttribute('transform', newTransform);
}



//this section of code moves the viewport width ways// 
// Get the container element
const container = document.querySelector('.container');

arrowLeft.addEventListener('click', () => {
    container.scrollTo({
        left: container.scrollLeft - window.innerWidth * 0.3,
        behavior: 'smooth'
    });
});

// Scroll the container to the right
arrowRight.addEventListener('click', scrollToRight); 

arrowLeft.addEventListener('click', scrollToLeft); 
    
function scrollToLeft () {
container.scrollTo({
    left: container.scrollLeft - window.innerWidth * 0.3,
    behavior: 'smooth'
});
}

function scrollToRight () {
container.scrollTo({
    left: container.scrollLeft + window.innerWidth * 0.3,
    behavior: 'smooth'
});
}



container.addEventListener('scroll', showArrows);

// this block of codes means that when the page loads you can't see the left hand button) 

function showArrows () { 
    if (container.scrollLeft > 0) {
    arrowLeft.style.display = 'block';
    } else {
     arrowLeft.display = 'none';
    }
}


// this creates an event listener allowing for the page to move left and right// 

document.addEventListener('keydown', moveWithArrow);

function moveWithArrow (click) { 
    if (click.key === 'ArrowLeft') { 
        moveLeft();
        scrollToLeft(); 
        counterDown();
        console.log('it moved left')
    }
    else if (click.key ==='ArrowRight') {
    moveRight();
    scrollToRight(); 
    counterUp(); 
    console.log('it moved right')
    }
}


arrowRight.addEventListener('click', counterUp) 

arrowLeft.addEventListener('click', counterDown)

// this section determines the use of the web audio api and edits the audio files// 




// new audio context // 
arrowRight.addEventListener('click', playSound); 

/*I realised that you cannot declare two audio twice within a function. I kept receiving an error, so i needed to find a way to keep a recorded of which audio clips had been created, so when the function is later declared, it fills up these statements"*/ 
