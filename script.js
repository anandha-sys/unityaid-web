document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that have the 'reveal' class
    const reveals = document.querySelectorAll('.reveal');

    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'active' class when the element is in view
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15 // Triggers when 15% of the element is visible
    });

    // Observe each element
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
});
