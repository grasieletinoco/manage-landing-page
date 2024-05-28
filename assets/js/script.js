// NEWSLETTER
const emailInput = document.getElementById("input__newsletter");
const emailBtn = document.getElementById("btn__newsletter");
const errorMessage = document.getElementById('error_message');

emailBtn.addEventListener('click', validateEmail);

function validateEmail(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
    errorMessage.classList.remove('error', 'success');
    emailInput.classList.remove('error', 'success', 'inputError');

    if (email === '') {
        errorMessage.textContent = 'This Field is Required';
        errorMessage.style.display = 'block';
        errorMessage.classList.add('error');
        emailInput.classList.add('error', 'inputError');

    } else if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Please Insert a Valid Email';
        errorMessage.style.display = 'block';
        errorMessage.classList.add('error');
        emailInput.classList.add('error', 'inputError');

    } else {
        errorMessage.textContent = 'Email Sent Successfully!';
        errorMessage.style.display = 'block';
        errorMessage.classList.add('success');
        emailInput.classList.add('success');
        emailInput.classList.remove('inputError');

        emailInput.value = '';

        setTimeout(function() {
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';
            emailInput.classList.remove('success');
        }, 2000);
    }
}



// MENU
document.addEventListener("DOMContentLoaded", function() {
    const menu = document.querySelector(".menu");
    const hamburger = document.querySelector(".hamburger");
    const close = document.querySelector(".close");
    const overlay = document.querySelector(".overlay");
  
    hamburger.addEventListener("click", function() {
      menu.classList.add("open");
      overlay.classList.add("open");
      hamburger.style.display = 'none';
      close.style.display = 'block';
    });
  
    close.addEventListener("click", function() {
      menu.classList.remove("open");
      overlay.classList.remove("open");
      close.style.display = 'none';
      hamburger.style.display = 'block';
    });
  
    overlay.addEventListener("click", function() {
      menu.classList.remove("open");
      overlay.classList.remove("open");
      close.style.display = 'none';
      hamburger.style.display = 'block';
    });
});
  


// TESTIMONIALS
const slider = document.querySelector('.testimonials__content__card');
const dotsContainer = document.querySelector('.navigation-dots');
const cards = document.querySelectorAll('.testimonials__card');

let isDown = false;
let startX;
let scrollLeft;

function createNavigationDots() {
    dotsContainer.innerHTML = '';
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('navigation-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            slider.scrollLeft = slider.offsetWidth * index;
        });
        dotsContainer.appendChild(dot);
    });
}

function updateActiveDot() {
    const index = Math.round(slider.scrollLeft / slider.offsetWidth);
    document.querySelectorAll('.navigation-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
    });
}

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener('scroll', updateActiveDot);

function checkWindowSize() {
    if (window.innerWidth <= 1024) {
        createNavigationDots();
    } else {
        dotsContainer.innerHTML = '';
    }
}

window.addEventListener('resize', checkWindowSize);

checkWindowSize();
