document.addEventListener('DOMContentLoaded', () => {

    const carouselItems = document.querySelectorAll('.carousel-itme');
    let currentIndex = 0;
    let firstThemeChange = true;

    //funcion para actualizar el carrusel

    const updateCarousel = (index) => {
        carouselItems[currentIndex].classList.remove('active', 'fade-in');
        currentIndex = index;
        carouselItems[currentIndex].classList.add('active', 'fade-in');
    }

    //controles del carrusel

    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            const newIndex = (currentIndex === 0) ? carouselItems.length - 1 : currentIndex - 1;
            updateCarousel(newIndex);
        })

        nextButton.addEventListener('click', () => {
            const newIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;
            updateCarousel(newIndex);
        })
    }


    const htmlElement = document.querySelector('html');
    const toggleButtons = document.querySelectorAll('#toggle, #toggle-sm');
    const bodyElement = document.querySelector('body');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const openMobileMenuButton = document.getElementById('mobile-menu-button');


    const toggleDarkMode = () => {
        if (firstThemeChange) {
            bodyElement.classList.add('disable-animations')
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
    }

    toggleButtons.forEach(button => button.addEventListener('click', toggleDarkMode));

    const openMobileMenu = () => {
        mobileMenu.classList.remove('hidden');
        document.body.classList.add('modal-active');
        document.body.style.overflow = 'hidden'
    }

    const closeMobileMenu = () => {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('modal-active');
        document.body.style.overflow = 'auto';
    }

    if (openMobileMenuButton && mobileMenu && closeMobileMenuButton) {
        openMobileMenuButton.addEventListener('click', openMobileMenu);
        closeMobileMenuButton.addEventListener('click', closeMobileMenu);
    }

    const changeLanguageButton = document.getElementById('change-language');

    let isEnglish = false;

    const updateLanguage = () => {
        const lang = isEnglish ? 'es' : 'en';

        const nosotrosLink = document.getElementById('nosotros-link');
        const serviciosLink = document.getElementById('servicios-link');

        if (nosotrosLink && serviciosLink) {
            nosotrosLink.textContent = translations[lang]['nosotros'];
            serviciosLink.textContent = translations[lang]['servicios'];
        }

        carouselItems.forEach((currentItem, index) => {
            const carouselTitle = carouselItems.querySelector('h2');
            const carouselSubtitle = carouselItems.querySelector('p');
            const carouselTeam = carouselItems.querySelector('.team');

            const carouselData = translations[lang]["carousel-text"][index];


            if (Array.isArray(carouselData)) {
                if (carouselTitle) {
                    carouselTitle.textContent = carouselData[0];
                }
                if (carouselSubtitle) {
                    carouselSubtitle.textContent = carouselData[1] || "";
                }
                if (carouselTeam) {
                    carouselTeam.textContent = carouselData[2];
                }
            } else {

                if (carouselTitle) {
                    carouselTitle.textContent = carouselData;
                }

                if (carouselSubtitle) {
                    carouselSubtitle.textContent = '';
                }

                if (carouselTeam) {
                    carouselTeam.textContent = '';
                }
            }
        });

        if (document.body.classList.contains('nosotros-page')) {
            const aboutTitle = document.getElementById('about-page-title');
            const aboutDescriptions = document.querySelectorAll('.about-page-description');
            const aboutPageFooter = document.getElementById('about-page-footer');

            if (aboutTitle && aboutDescriptions && aboutPageFooter) {
                aboutTitle.textContent = translations[lang]['about-page-title'];
                aboutPageFooter.textContent = translations[lang]['about-page-footer'];

                aboutDescriptions.forEach((description, index) => {
                    description.textContent = translations[lang]['about-page-description'][index];

                });
            }
        }

        if ( changeLanguageButton ) {
            changeLanguageButton.textContent = isEnglish ? 'ENG' : 'ESP';
        }

        isEnglish = !isEnglish;
    };

    if (changeLanguageButton) {
        changeLanguageButton.addEventListener('click', updateLanguage);
    }
});
