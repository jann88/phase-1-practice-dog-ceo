console.log('%c HI', 'color: firebrick')
let breeds = [];


document.addEventListener('DOMContentLoaded', function() {
    loadImages();
    loadBreedOptions();
});

function loadImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
        .then(res => res.json())
        .then(results => {
            results.message.forEach(image => addImage(image))
        });
}

function addImage(dogPicUrl) {
    let container = document.querySelector('#dog-image-container');
    let newImageEl = document.createElement('img');
    newImageEl.src = dogPicUrl;
    container.appendChild(newImageEl);
}

function loadBreedOptions() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
        .then(res => res.json())
        .then(results => {

            breeds = Object.keys(results.message);
            updateBreedList(breeds);
            addBreedSelectListener();
        });
}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function(event) {
        selectBreedsStartingWith(event.target.value);
    });
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', updateColor);
}

function updateColor(event) {
    event.target.style.color = 'palevioletred';
}

// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

const articleHearts = document.querySelectorAll(".like-glyph");

function likeCallback(e) {
    const heart = e.target;
    mimicServerCall("bogusUrl")
        .then(function() {
            if (heart.innerText === EMPTY_HEART) {
                heart.innerText = FULL_HEART;
                heart.className = "activated-heart";
            } else {
                heart.innerText = EMPTY_HEART;
                heart.className = "";
            }
        })
        .catch(function(error) {
            const modal = document.getElementById("modal");
            modal.className = "";
            modal.innerText = error;
            setTimeout(() => modal.className = "hidden", 3000);
        });
}

for (const glyph of articleHearts) {
    glyph.addEventListener("click", likeCallback);
}



/// MORE ADVANCED SOLUTION ///

// const glyphStates = {
//   "♡": "♥",
//   "♥": "♡"
// };

// const colorStates = {
//   "red" : "",
//   "": "red"
// };

// const articleHearts = document.querySelectorAll(".like-glyph");

// function likeCallback(e) {
//   const heart = e.target;
//   mimicServerCall("bogusUrl", {forceFailure: true})
//     .then(function(){
//        heart.innerText = glyphStates[heart.innerText];
//        heart.style.color = colorStates[heart.style.color];
//     })
//     .catch(function(error) {
//       const modal = document.getElementById("modal");
//       modal.className = "";
//       modal.innerText = error;
//       setTimeout(() =>  modal.className = "hidden", 3000);
//     });
// }

// for (const glyph of articleHearts) {
//   glyph.addEventListener("click", likeCallback);
// }


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            const isRandomFailure = Math.random() < .2
            if (isRandomFailure) {
                reject("Random server error. Try again.");
            } else {
                resolve("Pretend remote server notified of action!");
            }
        }, 300);
    });
}