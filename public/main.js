document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    let firstThemeChange = true; // Flag to check if it's the first theme change

    const updateCarousel = (index) => {
        carouselItems[currentIndex].classList.remove('active', 'fade-in');
        currentIndex = index;
        carouselItems[currentIndex].classList.add('active', 'fade-in');
    };

    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            const newIndex = (currentIndex === 0) ? carouselItems.length - 1 : currentIndex - 1;
            updateCarousel(newIndex);
        });

        nextButton.addEventListener('click', () => {
            const newIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;
            updateCarousel(newIndex);
        });
    }

    const htmlElement = document.querySelector('html');
    const toggleButtons = document.querySelectorAll('#toggle, #toggle-sm');
    const bodyElement = document.querySelector('body');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const openMobileMenuButton = document.getElementById('mobile-menu-button');


    const toggleDarkMode = () => {
        if (firstThemeChange) {
            bodyElement.classList.add('disable-animations');
        }

        document.body.classList.add('fade-out');
        setTimeout(() => {
            htmlElement.classList.toggle('dark');
            document.body.classList.remove('fade-out');
            document.body.classList.add('fade-in');

        }, 500);
    };

    toggleButtons.forEach(button => button.addEventListener('click', toggleDarkMode));

    if (openMobileMenuButton && mobileMenu && closeMobileMenu) {
        openMobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    const nosotrosLink = document.getElementById('nosotros-link');
    if (nosotrosLink) {
        nosotrosLink.addEventListener('click', function (e) {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'nosotros.html';
            }, 1000);
        });
    }

    const proyectosLink = document.getElementById('proyectos-link');
    if (proyectosLink) {
        proyectosLink.addEventListener('click', function (e) {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'landing.html';
            }, 1000);
        });
    }

    if (document.body.classList.contains('nosotros-page') || document.body.classList.contains('landing-page')) {
        document.body.classList.add('fade-in');
    }
});
