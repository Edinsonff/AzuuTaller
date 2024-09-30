document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

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
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const openMobileMenuButton = document.getElementById('mobile-menu-button');

    const toggleDarkMode = () => {
        // Aplicar fade-out a todos los elementos excepto el carrusel
        const elementsToFade = document.querySelectorAll('body > *:not(.carousel-container)');
        elementsToFade.forEach(element => {
            element.classList.add('fade-out');
        });

        setTimeout(() => {
            htmlElement.classList.toggle('dark');
            
            elementsToFade.forEach(element => {
                element.classList.remove('fade-out');
                element.classList.add('fade-in');
            });
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

    // Funcionalidad de cambio de idioma
    const changeLanguageButton = document.getElementById('change-language');
    let isEnglish = false;

    const updateLanguage = () => {
        console.log('Changing language...');
        const lang = isEnglish ? 'es' : 'en';

        // Cambiar texto en el menú de navegación
        const nosotrosLink = document.getElementById('nosotros-link');
        const proyectosLink = document.getElementById('proyectos-link');

        // Asegúrate de que los elementos existen antes de cambiar su texto
        if (nosotrosLink && proyectosLink) {
            nosotrosLink.textContent = translations[lang]["nosotros-link"];
            proyectosLink.textContent = translations[lang]["proyectos-link"];
        }

        carouselItems.forEach((carouselItem, index) => {
            const carouselTitle = carouselItem.querySelector('h2');
            const carouselSubtitle = carouselItem.querySelector('p');
            const carouselTeam = carouselItem.querySelector('.team');

            const carouselData = translations[lang]["carousel-text"][index];

            if (Array.isArray(carouselData)) {
                if (carouselTitle) {
                    carouselTitle.textContent = carouselData[0];
                }
                if (carouselSubtitle) {
                    carouselSubtitle.textContent = carouselData[1] || ""; 
                }
                if (carouselTeam && carouselData[2]) {
                    carouselTeam.textContent = carouselData[2];
                }
            } else {
                if (carouselTitle) {
                    carouselTitle.textContent = carouselData;
                }
                if (carouselSubtitle) {
                    carouselSubtitle.textContent = "";
                }
                if (carouselTeam) {
                    carouselTeam.textContent = "";
                }
            }
        });

        if (document.body.classList.contains('nosotros-page')) {
            const aboutTitle = document.querySelector('.about-page-title');
            const aboutDescriptions = document.querySelectorAll('.about-page-description');
            const aboutPageFooter = document.querySelector('.about-page-footer');

            if (aboutTitle) {
                aboutTitle.textContent = translations[lang]["about-page-title"];
            }
            if (aboutDescriptions.length > 0) {
                aboutDescriptions.forEach((el, index) => {
                    el.textContent = translations[lang]["about-page-description"][index];
                });
            }
            if (aboutPageFooter) {
                aboutPageFooter.textContent = translations[lang]["about-page-footer"];
            }
        }

        if (changeLanguageButton) {
            changeLanguageButton.textContent = isEnglish ? "ENG" : "ESP";
        }

        isEnglish = !isEnglish;
    };

    if (changeLanguageButton) {
        changeLanguageButton.addEventListener('click', updateLanguage);
    }

    const addFadeOutAnimation = (event, href) => {
        event.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = href;
        }, 500); // Debe coincidir con la duración de la animación
    };

    const nosotrosLink = document.getElementById('nosotros-link');
    const proyectosLink = document.getElementById('proyectos-link');

    if (nosotrosLink) {
        nosotrosLink.addEventListener('click', (event) => addFadeOutAnimation(event, './Nosotros.html'));
    }

    if (proyectosLink) {
        proyectosLink.addEventListener('click', (event) => addFadeOutAnimation(event, './index.html'));
    }

    document.body.classList.add('fade-in');
});
