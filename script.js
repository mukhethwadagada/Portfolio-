document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for section fade-in
    const animatedSections = document.querySelectorAll('.animated-section');

    const sectionObserverOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section must be visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // For items within the section, add a staggered animation
                const animatedItems = entry.target.querySelectorAll('.animated-item');
                animatedItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.1}s`; // Stagger delay
                    item.classList.add('is-visible');
                });
                observer.unobserve(entry.target); // Stop observing once section is active
            }
        });
    }, sectionObserverOptions);

    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Initial animation for the profile picture (always visible at load)
    const profilePic = document.querySelector('.hero-profile-pic');
    if (profilePic) {
        // We use a timeout to ensure the CSS animation plays after the element is rendered
        setTimeout(() => {
            profilePic.style.animationPlayState = 'running';
        }, 100);
    }


    // --- Typing Animation for Hero Title ---
    const typedTextElement = document.getElementById('typed-text');
    // **IMPORTANT: Customize this text for your portfolio!**
    const textToType = "Hi, I'm Mukhethwa Ndiwavhudi Dagada";
    let charIndex = 0;
    const typingSpeed = 100; // milliseconds per character

    function typeText() {
        if (charIndex < textToType.length) {
            typedTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            // Optional: If you want the cursor to disappear after typing, uncomment the line below.
            // typedTextElement.parentElement.style.borderRight = 'none';
        }
    }

    // Start typing after a short delay to allow other initial animations (like profile pic)
    setTimeout(typeText, 1000); // Start typing 1 second after page load
});