// Back-To-Top Button Section
let mybutton = document.getElementById("Back-To-Top");
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", backToTop);
function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Hamburger Menu Section
const hamburger = document.getElementById('hamburger');
const overlay = document.getElementById('overlay');
const overlayLinks = document.querySelectorAll('.overlay-links a');
const icon = hamburger.querySelector('i');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  overlay.style.display = isOpen ? 'flex' : 'none';
  document.body.style.overflow = isOpen ? 'hidden' : '';

  icon.className = isOpen
    ? 'fa-solid fa-bars-staggered'
    : 'fa-solid fa-bars';
});

overlayLinks.forEach(link => {
  link.addEventListener('click', () => {
    overlay.style.display = 'none';
    hamburger.classList.remove('open');
    icon.className = 'fa-solid fa-bars';
    document.body.style.overflow = '';
  });
});

// Read More Button Section
document.addEventListener("DOMContentLoaded", function () {

  const readMoreBtn = document.querySelector('.read-more-btn');
  const moreText = document.querySelector('.more-text');
  const icon = document.querySelector('.arrow-icon');

  readMoreBtn.addEventListener('click', function () {

    moreText.classList.toggle('active');
    icon.classList.toggle('rotate');

  });

});

// Project Expand Section
document.addEventListener("DOMContentLoaded", function () {
  const projects = document.querySelectorAll(".projects-card");
  projects.forEach(project => {
    project.addEventListener("click", function () {
      this.classList.toggle("expanded");
    });
  });
});

// Form Feedback Section
document.getElementById('fs-frm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const form = event.target;
  const status = document.getElementById('form-status');

  const data = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/mknlbraw", {
      method: "POST",
      headers: { 'Accept': 'application/json' },
      body: data
    });

    if (response.ok) {
      status.innerHTML = "<span style='color:green; font-size:large; font-weight:450; letter-spacing:-1px;'>Thanks! Your message has been sent.</span>";
      form.reset();
    } else {
      const result = await response.json();
      status.innerHTML = "<span style='color:red; font-size:large; font-weight:450; letter-spacing:-1px;'>Oops! " + (result.error || "There was a problem submitting your form.") + "</span>";
    }
  } catch (error) {
    status.innerHTML = "<span style='color:red; font-size:large; font-weight:450; letter-spacing:-1px;'>Oops! There was a network error. Please try again.</span>";
  }
});

// Dynamic Space Section
const formStatus = document.getElementById('form-status');
const contactCard = document.querySelector('.contact-card');

const observer = new MutationObserver(() => {
  if (formStatus.textContent.trim()) {
    contactCard.classList.add('no-bottom-padding');
  } else {
    contactCard.classList.remove('no-bottom-padding');
  }
});

observer.observe(formStatus, { childList: true, subtree: true });

// Block Pinch-to-Zoom on the Website
document.addEventListener('wheel', function (e) {
  if (e.ctrlKey) {
    e.preventDefault();
  }
}, { passive: false });

// Page Loader Section
document.addEventListener("DOMContentLoaded", function () {

  const loader = document.getElementById("page-loader");
  const loadingNumber = document.getElementById("loading-number");

  const duration = 1500;
  const startTime = performance.now();

  function animate(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * 100);

    loadingNumber.textContent = value + "%";

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      fadeOut();
    }
  }

  function fadeOut() {
    loader.classList.add("hide");

    setTimeout(() => {
      loader.remove();
    }, 1000);
  }

  requestAnimationFrame(animate);
});
