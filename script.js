document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mainNav.classList.toggle('active');
            body.classList.toggle('menu-open');
            menuToggle.innerHTML = mainNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.main-nav') && !e.target.closest('.menu-toggle')) {
                mainNav.classList.remove('active');
                body.classList.remove('menu-open');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Header Scroll Effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Country Text and Background Animation
    const countries = [
        { 
            name: "USA", 
            bg: "https://images.pexels.com/photos/60003/statue-of-liberty-new-york-ny-nyc-60003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        { 
            name: "Canada", 
            bg: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        { 
            name: "UK", 
            bg: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
    ];
    
    let currentIndex = 0;
    const countryElement = document.querySelector('.country-animation');
    const heroSection = document.querySelector('.hero');

    function rotateCountry() {
        currentIndex = (currentIndex + 1) % countries.length;
        countryElement.style.animation = 'none';
        void countryElement.offsetWidth; // Trigger reflow
        countryElement.textContent = countries[currentIndex].name;
        heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${countries[currentIndex].bg}')`;
        countryElement.style.animation = 'slideIn 0.8s ease-out';
    }

    // Initialize with first country
    if (countryElement && heroSection) {
        countryElement.textContent = countries[currentIndex].name;
        heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${countries[currentIndex].bg}')`;
        
        // Rotate every 3 seconds
        setInterval(rotateCountry, 3000);
    }

    // Dropdown Menu Functionality
    const dropdownParents = document.querySelectorAll('.dropdown-parent');
    let activeDropdown = null;
    let dropdownTimeout = null;
    
    dropdownParents.forEach(dropdownParent => {
        const dropdownMenu = dropdownParent.querySelector('.dropdown-menu');
        
        // Show dropdown on hover
        dropdownParent.addEventListener('mouseenter', () => {
            clearTimeout(dropdownTimeout);
            if (activeDropdown && activeDropdown !== dropdownMenu) {
                activeDropdown.style.display = 'none';
                activeDropdown.style.opacity = '0';
                activeDropdown.style.visibility = 'hidden';
            }
            activeDropdown = dropdownMenu;
            dropdownMenu.style.display = 'block';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
        });
        
        // Hide dropdown only when mouse leaves both parent and menu
        dropdownParent.addEventListener('mouseleave', (e) => {
            const relatedTarget = e.relatedTarget;
            if (!relatedTarget || (!relatedTarget.closest('.dropdown-menu') && !relatedTarget.closest('.dropdown-parent'))) {
                dropdownTimeout = setTimeout(() => {
                    if (!dropdownMenu.matches(':hover') && !dropdownParent.matches(':hover')) {
                        dropdownMenu.style.display = 'none';
                        dropdownMenu.style.opacity = '0';
                        dropdownMenu.style.visibility = 'hidden';
                        activeDropdown = null;
                    }
                }, 100);
            }
        });
        
        // Keep dropdown visible when hovering over menu
        dropdownMenu.addEventListener('mouseenter', () => {
            clearTimeout(dropdownTimeout);
            dropdownMenu.style.display = 'block';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
        });
        
        // Hide dropdown only when mouse leaves both menu and parent
        dropdownMenu.addEventListener('mouseleave', (e) => {
            const relatedTarget = e.relatedTarget;
            if (!relatedTarget || (!relatedTarget.closest('.dropdown-parent') && !relatedTarget.closest('.dropdown-menu'))) {
                dropdownTimeout = setTimeout(() => {
                    if (!dropdownMenu.matches(':hover') && !dropdownParent.matches(':hover')) {
                        dropdownMenu.style.display = 'none';
                        dropdownMenu.style.opacity = '0';
                        dropdownMenu.style.visibility = 'hidden';
                        activeDropdown = null;
                    }
                }, 100);
            }
        });

        // Allow links to work properly
        const links = dropdownMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only prevent default for parent items that have submenus
                if (link.parentElement.classList.contains('nested-dropdown-parent')) {
                    e.preventDefault();
                    link.parentElement.classList.toggle('active');
                }
                // For all other links, let them work normally
            });
        });
    });

  // Projects Carousel - Moves left to right (normal direction)
const projectsTrack = document.querySelector('.projects-track');
if (projectsTrack) {
    const projectCards = document.querySelectorAll('.project-card');
    const projectCardWidth = projectCards[0].offsetWidth + 32; // Width + gap
    const projectCardCount = projectCards.length / 2; // Since we duplicated cards
    let projectCurrentPosition = 0;
    let projectAutoScrollInterval;

    function moveProjects() {
        projectCurrentPosition++;
        projectsTrack.style.transform = `translateX(-${projectCurrentPosition * projectCardWidth}px)`;
        
        // Reset to start if we've reached the end (seamless loop)
        if (projectCurrentPosition >= projectCardCount) {
            setTimeout(() => {
                projectCurrentPosition = 0;
                projectsTrack.style.transition = 'none';
                projectsTrack.style.transform = `translateX(0)`;
                // Force reflow
                void projectsTrack.offsetWidth;
                projectsTrack.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 800);
        }
    }

    function startProjectAutoScroll() {
        stopProjectAutoScroll();
        projectAutoScrollInterval = setInterval(moveProjects, 3000);
    }

    function stopProjectAutoScroll() {
        clearInterval(projectAutoScrollInterval);
    }

    // Initialize auto-scroll
    startProjectAutoScroll();

    // Pause on hover
    projectsTrack.addEventListener('mouseenter', stopProjectAutoScroll);
    projectsTrack.addEventListener('mouseleave', startProjectAutoScroll);
}

// Services Carousel - Moves right to left (reverse direction)
const servicesTrack = document.querySelector('.services-track');
if (servicesTrack) {
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceCardWidth = serviceCards[0].offsetWidth + 32; // Width + gap
    const serviceCardCount = serviceCards.length / 2; // Since we duplicated cards
    let serviceCurrentPosition = 0;
    let serviceAutoScrollInterval;

    function moveServices() {
        serviceCurrentPosition--;
        servicesTrack.style.transform = `translateX(${serviceCurrentPosition * serviceCardWidth}px)`;
        
        // Reset to end if we've reached the start (seamless loop)
        if (serviceCurrentPosition <= -serviceCardCount) {
            setTimeout(() => {
                serviceCurrentPosition = 0;
                servicesTrack.style.transition = 'none';
                servicesTrack.style.transform = `translateX(0)`;
                // Force reflow
                void servicesTrack.offsetWidth;
                servicesTrack.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 800);
        }
    }

    function startServiceAutoScroll() {
        stopServiceAutoScroll();
        serviceAutoScrollInterval = setInterval(moveServices, 3000);
    }

    function stopServiceAutoScroll() {
        clearInterval(serviceAutoScrollInterval);
    }

    // Initialize auto-scroll
    startServiceAutoScroll();

    // Pause on hover
    servicesTrack.addEventListener('mouseenter', stopServiceAutoScroll);
    servicesTrack.addEventListener('mouseleave', startServiceAutoScroll);
}

// Pause carousels when window loses focus
window.addEventListener('focus', () => {
    if (projectsTrack) startProjectAutoScroll();
    if (servicesTrack) startServiceAutoScroll();
});

window.addEventListener('blur', () => {
    if (projectsTrack) stopProjectAutoScroll();
    if (servicesTrack) stopServiceAutoScroll();
});

    // Testimonial Carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        testimonials[index].classList.add('active');
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevTestimonial);
        nextButton.addEventListener('click', nextTestimonial);
    }

    // Auto-rotate testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);
}); 


