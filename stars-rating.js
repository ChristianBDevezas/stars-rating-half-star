const starsContainer = document.querySelector(".stars");
const starsCounter = document.querySelector(".counter__stars");
const starsText = document.querySelector(".counter__text");

function checkLocalStorage() {
    const savedStars = JSON.parse(localStorage.getItem("selectedStars") || "0");
    console.log(savedStars, typeof(savedStars), Array.isArray(savedStars));

    // // Ternary If
    // const savedRating = Array.isArray(savedStars)
    //     ? (savedStars.length ? savedStars[savedStars.length - 1] + 1 : 0)
    //     : savedStars;

    let savedRating;

    if(Array.isArray(savedStars)) {
        savedRating = savedStars.length ? savedStars[savedStars.length - 1] + 1 : 0;
    }
    else {
        savedRating = savedStars;
    }
    console.log(savedRating, typeof(savedRating));

    setStarSelection(savedRating);
}

function updateCounter(rating) {
    starsCounter.innerText = rating;
    starsText.innerText = rating === 1 ? "star" : "stars";
}

function setStarSelection(rating) {
    const starItems = starsContainer.querySelectorAll(".stars__item");

    starItems.forEach((star, index) => {
        star.querySelector(".point-half").classList.remove("show");
        star.querySelector(".point-full").classList.remove("show");

        if(index < Math.floor(rating)) {
            star.querySelector(".point-full").classList.add("show");
        }

        if(index === Math.floor(rating) && rating % 1 === 0.5) {
            star.querySelector(".point-half").classList.add("show");
        }
    });

    updateCounter(rating);
}

function starsRating(e) {
    const starTarget = e.target;

    if(starTarget.classList.contains("point") === false) {
        return;
    }

    const starsItemElement = starTarget.parentElement.parentElement;

    const starItems = starsContainer.querySelectorAll(".stars__item");

    const currentIndex = [...starItems].indexOf(starsItemElement);
    console.log(currentIndex);
    const rating = currentIndex + (starTarget.classList.contains("left") ? 0.5 : 1);
    console.log(rating);

    setStarSelection(rating);
    localStorage.setItem("selectedStars", JSON.stringify(rating));
}

document.addEventListener("DOMContentLoaded", checkLocalStorage);
starsContainer.addEventListener("click", starsRating);