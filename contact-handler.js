import emailjs from '@emailjs/browser';

// Replace these with your actual IDs from EmailJS
const SERVICE_ID = 'service_ete9wpt';
const TEMPLATE_ID = 'template_jkjf4de';
const PUBLIC_KEY = '8oE1zF7MtzhoaAyuU';

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const formStatus = document.getElementById('form-status');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check if placeholders are still present
        if (PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            alert('Please configure your EmailJS IDs in contact-handler.js');
            return;
        }

        // Loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        formStatus.style.display = 'none';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm, PUBLIC_KEY)
            .then(() => {
                // Success state
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                formStatus.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                formStatus.style.color = '#10b981';
                formStatus.style.border = '1px solid rgba(16, 185, 129, 0.2)';
                formStatus.style.display = 'block';
                contactForm.reset();
            })
            .catch((error) => {
                // Error state
                console.error('EmailJS Error:', error);
                formStatus.textContent = 'Failed to send message. Please try again later.';
                formStatus.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                formStatus.style.color = '#ef4444';
                formStatus.style.border = '1px solid rgba(239, 68, 68, 0.2)';
                formStatus.style.display = 'block';
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
            });
    });
});
