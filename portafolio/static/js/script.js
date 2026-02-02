document.addEventListener('DOMContentLoaded', () => {
    
    // Animaciones al Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));


    // Menú Pegajoso & ScrollSpy

    const header = document.querySelector('.menu');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        // Sticky Menu

        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if href matches current ID
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // Menú Móvil

    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const overlay = document.querySelector('.menu-overlay');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const navbarLinks = document.querySelectorAll('.navbar a'); 

    function openMenu() {
        navbar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function closeMenu() {
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; 
        if(menuToggle) menuToggle.checked = false;
    }

    if(menuToggle) {
        menuToggle.addEventListener('change', (e) => {
            if (e.target.checked) openMenu();
            else closeMenu();
        });
    }

    if(closeMenuBtn) {
    closeMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
    });
}

    
    // Smooth Scroll con corrección de Offset para menú fijo

    navbarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            closeMenu(); 
            
            const targetId = link.getAttribute('href');
            if(targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if(targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });


    // Modal de Servicios


    const detalles = {
        "Landing Page": `
            <strong>Objetivo:</strong> Convertir visitantes en clientes.<br><br>
            Una landing page es una página web diseñada específicamente para presentar un servicio, producto o propuesta de forma clara y directa. Nuestro enfoque se basa en crear páginas visualmente atractivas, optimizadas para captar la atención desde el primer segundo.<br><br>
            <strong>Incluye:</strong> Diseño moderno, textos persuasivos (copywriting), llamadas a la acción (CTA) estratégicas, formularios integrados y optimización de carga rápida.
        `,
        "Blog": `
            <strong>Objetivo:</strong> Posicionamiento SEO y autoridad.<br><br>
            Un blog es un espacio diseñado para publicar artículos, guías y noticias. Es la herramienta #1 para mejorar tu posicionamiento en Google y atraer tráfico orgánico.<br><br>
            <strong>Incluye:</strong> Gestión de categorías, buscador interno, diseño optimizado para lectura y panel autoadministrable fácil de usar.
        `,
        "Portafolio": `
            <strong>Objetivo:</strong> Mostrar tu talento.<br><br>
            Ideal para fotógrafos, arquitectos, diseñadores y freelancers. Desarrollamos portafolios minimalistas donde tu trabajo es el protagonista.<br><br>
            <strong>Incluye:</strong> Galerías interactivas, filtrado de proyectos, integración con redes sociales y perfil profesional.
        `,
        "Sitio Web de Negocios": `
           <strong>Objetivo:</strong> Presencia digital profesional y posicionamiento local.<br><br>
            Es la carta de presentación digital de tu empresa. Ideal para negocios, comercios,
            restaurantes y cafeterías de la Patagonia que buscan generar confianza y aparecer
            en Google.<br><br>
            <strong>Incluye:</strong> Sección "Quiénes somos", servicios detallados, equipo de trabajo,
            testimonios, mapa de ubicación, formulario de contacto avanzado y optimización SEO local.
        `,
        "Tienda en Línea": `
            <strong>Objetivo:</strong> Vender 24/7.<br><br>
            Desarrollamos e-commerce completos, seguros y escalables. Tu catálogo de productos disponible para todo el mundo.<br><br>
            <strong>Incluye:</strong> Carrito de compras, pasarelas de pago (MercadoPago, PayPal, Stripe), cálculo de envíos, gestión de stock y panel de control de ventas.
        `,
        "Página de Contacto": `
            <strong>Objetivo:</strong> Comunicación sin fricción.<br><br>
            Facilitamos que tus clientes te encuentren y te hablen. Integramos botones directos a WhatsApp, formularios antispam y mapas interactivos.
        `
    };

    const infoModal = document.getElementById("info-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");
    const modalCloseBtn = document.querySelector(".modal .close");

    // Función global para cerrar modal

    window.closeModal = function() {
        infoModal.classList.remove('is-visible');
        infoModal.setAttribute('aria-hidden', 'true');
        if (!navbar.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    }

    function openModal(title, htmlContent) {
        modalTitle.innerText = title;
        modalText.innerHTML = htmlContent; 
        infoModal.classList.add('is-visible');
        infoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    document.querySelectorAll(".details-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const cardElement = e.target.closest('.card');
            const serviceType = cardElement.getAttribute('data-service-type');
            
            if (serviceType && detalles[serviceType]) {
                openModal(serviceType, detalles[serviceType]);
            }
        });
    });

    if(modalCloseBtn) modalCloseBtn.addEventListener("click", window.closeModal);
    
    window.addEventListener("click", (e) => {
        if (e.target === infoModal) {
            window.closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && infoModal.classList.contains('is-visible')) {
            window.closeModal();
        }
    });

});