document.addEventListener('DOMContentLoaded', () => {
    // Variables y constantes
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    let firstThemeChange = true;

    // Función para actualizar el carrusel
    const updateCarousel = (index) => {
        carouselItems[currentIndex].classList.remove('active', 'fade-in');
        currentIndex = index;
        carouselItems[currentIndex].classList.add('active', 'fade-in');
    };

    // Controles del carrusel
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

    // Modo oscuro y claro
    const htmlElement = document.querySelector('html');
    const toggleButtons = document.querySelectorAll('#toggle, #toggle-sm');
    const bodyElement = document.querySelector('body');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
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
            if (firstThemeChange) {
                setTimeout(() => {
                    bodyElement.classList.remove('disable-animations');
                    firstThemeChange = false;
                }, 0);
            }
        }, 500);
    };

    toggleButtons.forEach(button => button.addEventListener('click', toggleDarkMode));

    // Menú móvil
    const openMobileMenu = () => {
        mobileMenu.classList.remove('hidden');
        document.body.classList.add('modal-active');
        document.body.style.overflow = 'hidden'; 
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('modal-active');
        document.body.style.overflow = 'auto'; 
    };

    if (openMobileMenuButton && mobileMenu && closeMobileMenuButton) {
        openMobileMenuButton.addEventListener('click', openMobileMenu);
        closeMobileMenuButton.addEventListener('click', closeMobileMenu);
    }
    // Enlaces de navegación con efecto de desvanecimiento
    const nosotrosLink = document.getElementById('nosotros-link');
    if (nosotrosLink) {
        nosotrosLink.addEventListener('click', function (e) {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = './Nosotros.html';
            }, 1000);
        });
    }

    const proyectosLink = document.getElementById('proyectos-link');
    if (proyectosLink) {
        proyectosLink.addEventListener('click', function (e) {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = './index.html';
            }, 1000);
        });
    }

    // Efecto de desvanecimiento en la carga de la página
    if (document.body.classList.contains('nosotros-page') || document.body.classList.contains('landing-page')) {
        document.body.classList.add('fade-in');
    }
    
    // Rehabilitar animaciones del carrusel después de la transición
    const reEnableCarouselAnimations = () => {
        carouselItems.forEach(item => {
            item.classList.remove('disable-animations');
        });
    };
    document.addEventListener('transitionend', reEnableCarouselAnimations);


});