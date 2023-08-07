const slides = document.querySelectorAll(".slide");
const leftButton = document.getElementById("btn--left");
const rightButton = document.getElementById("btn--right");
const sliderContainer = document.getElementById("slider-container");
const navButtons = document.querySelectorAll(".nav-bar__btn");
let slideCurrentIndex = 0;
let autoSlideInternal;
const textIndicator = document.querySelector(".images__text-indicator");

let forwardCheck = true;

// Changing the position of image from left
slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

// Function which next the image
const slideImage = () => {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${slideCurrentIndex * 100}%)`;
  });
};

// Function that shows next image
const nextSlide = () => {
  if (slideCurrentIndex >= slides.length - 1) {
    slideCurrentIndex = 0;
  } else {
    slideCurrentIndex++;
  }
  slideImage();
};

// toggleFunction
const toggleFunction = () => {
  forwardCheck = !forwardCheck;
};

// Function that shows previous image
const previousSlide = () => {
  if (slideCurrentIndex <= 0) {
    slideCurrentIndex = slides.length - 1;
  } else {
    slideCurrentIndex--;
  }
  slideImage();
};

// Auto slide
const autoSlide = () => {
  autoSlideInternal = setInterval(() => {
    if (forwardCheck) {
      slideCurrentIndex++;
    } else {
      slideCurrentIndex--;
    }
    if (slideCurrentIndex >= slides.length - 1) {
      forwardCheck = false;
    } else if (slideCurrentIndex <= 0) {
      forwardCheck = true;
    }
    slideImage();
    updateNavButtons();
  }, 3000);
};

// clearing the auto slide interval
const stopAutoSlide = () => {
  clearInterval(autoSlideInternal);
};

// Updating the active nav-bar button
const updateNavButtons = () => {
  navButtons.forEach((button, index) => {
    if (index === slideCurrentIndex) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
};

// Event for right and left button
rightButton.addEventListener("click", () => {
  nextSlide();
  stopAutoSlide();
  updateNavButtons();
});
leftButton.addEventListener("click", () => {
  previousSlide();
  stopAutoSlide();
  updateNavButtons();
});

autoSlide();

//  Adding event went the mouse hover to container
sliderContainer.addEventListener("mouseover", () => {
  stopAutoSlide();
  textIndicator.style.display = "block";
});
sliderContainer.addEventListener("mouseout", () => {
  autoSlide();
  textIndicator.style.display = "none";
});

// Changing the image with nav-bar buttons
navButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    slideCurrentIndex = index;
    slideImage();
    updateNavButtons();
    stopAutoSlide();
  });
});
