// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Animation de chargement
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
  });

  // Menu mobile
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('d-none');
  });

  // Navigation fluide
  const links = document.querySelectorAll('nav a, #mobile-menu a');
  for (const link of links) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
        mobileMenu.classList.add('d-none');
      }
    });
  }

  // Formulaire de contact
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      formMessage.classList.remove('d-none');
      contactForm.reset();
      setTimeout(() => formMessage.classList.add('d-none'), 4000);
    });
  }

  // Animation au scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate__animated');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        const animationClass = element.classList.item(1);
        element.classList.add(animationClass);
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Trigger once on load

  // Animation GSAP
  if (typeof gsap !== 'undefined') {
    gsap.from(".hero-section h1", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out"
    });
    
    gsap.from(".hero-section p", {
      duration: 1,
      y: 50,
      opacity: 0,
      delay: 0.3,
      ease: "power3.out",
      stagger: 0.2
    });
    
    gsap.from(".hero-section .btn", {
      duration: 1,
      y: 50,
      opacity: 0,
      delay: 0.6,
      ease: "power3.out"
    });
  }
});


// Validation et feedback utilisateur
document.getElementById('contact-form').addEventListener('submit', function(e) {
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitText = submitBtn.querySelector('.submit-text');
  const spinner = submitBtn.querySelector('.spinner-border');
  const alertBox = document.getElementById('form-alert');
  
  // Réinitialiser les états
  form.classList.remove('was-validated');
  Array.from(form.elements).forEach(el => el.classList.remove('is-invalid'));
  alertBox.classList.add('d-none');
  
  // Validation frontale
  if (!form.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
    form.classList.add('was-validated');
    
    // Marquer les champs invalides
    Array.from(form.elements).forEach(el => {
      if (!el.checkValidity() && el.tagName !== 'BUTTON') {
        el.classList.add('is-invalid');
      }
    });
    
    return;
  }
  
  // Affichage du chargement
  submitText.textContent = 'Envoi en cours...';
  spinner.classList.remove('d-none');
  submitBtn.disabled = true;
  
  // Vous pouvez ajouter ici un fetch() si vous voulez traiter la réponse
  // Mais FormSubmit fonctionne directement avec l'attribut action
});

