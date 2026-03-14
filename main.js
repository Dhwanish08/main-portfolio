import './style.css';
import './contact-handler.js';
import Swup from 'swup';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupProgressPlugin from '@swup/progress-plugin';

// Refactor animations into a reusable function
function initAnimations() {
  console.log('Initializing animations...');

  // Intersection Observer for Fade-in Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Staggered Animation Logic
  const staggerGroups = document.querySelectorAll('.projects-grid, .skills-container, .hero-grid, .about-stats > div');

  staggerGroups.forEach(group => {
    const children = Array.from(group.children);
    children.forEach((child, index) => {
      child.classList.add('fade-in');
      // Add stagger delay class (cycling 1-4)
      const delayClass = `stagger-${(index % 4) + 1}`;
      child.classList.add(delayClass);
      // Observe the new child
      observer.observe(child);
    });
  });

  // Add text reveal to H1s
  document.querySelectorAll('h1').forEach(h1 => {
    h1.classList.add('reveal-text');
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.startsWith('http')) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initial Call
initAnimations();

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(5, 5, 5, 0.8)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(5, 5, 5, 0.5)';
      navbar.style.boxShadow = 'none';
    }
  });
}

// Initialize Swup
const swup = new Swup({
  plugins: [
    new SwupScriptsPlugin(),
    new SwupProgressPlugin({
      className: 'swup-progress-bar',
      delay: 300,
      finishAnimation: true
    })
  ]
});

// Re-run animations on every page transition
swup.hooks.on('content:replace', () => {
  initAnimations();
  window.scrollTo(0, 0);
});

