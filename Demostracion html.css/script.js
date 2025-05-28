// JavaScript para funcionalidad del proyecto

// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animación del botón hamburguesa
        const lines = hamburger.querySelectorAll('.hamburger-line');
        lines.forEach((line, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) line.style.opacity = '0';
                if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                line.style.transform = 'none';
                line.style.opacity = '1';
            }
        });
    });
    
    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const lines = hamburger.querySelectorAll('.hamburger-line');
            lines.forEach(line => {
                line.style.transform = 'none';
                line.style.opacity = '1';
            });
        });
    });
});

// Función para scroll suave a secciones
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = 80;
        const sectionTop = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Filtros de galería
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar elementos
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('visible');
                }
            });
        });
    });
});

// Validación de formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    // Validación en tiempo real
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    function validateField(e) {
        const field = e.target;
        const errorElement = document.getElementById(field.name + '-error');
        
        if (!errorElement) return;
        
        let errorMessage = '';
        
        if (field.validity.valueMissing) {
            errorMessage = 'Este campo es obligatorio';
        } else if (field.validity.typeMismatch) {
            if (field.type === 'email') {
                errorMessage = 'Por favor, introduce un email válido';
            }
        } else if (field.validity.tooShort) {
            errorMessage = `Mínimo ${field.minLength} caracteres`;
        } else if (field.validity.patternMismatch) {
            if (field.type === 'tel') {
                errorMessage = 'Formato de teléfono inválido';
            }
        }
        
        errorElement.textContent = errorMessage;
        
        if (errorMessage) {
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    }
    
    function clearError(e) {
        const field = e.target;
        const errorElement = document.getElementById(field.name + '-error');
        
        if (field.validity.valid && errorElement) {
            errorElement.textContent = '';
            field.classList.remove('error');
        }
    }
    
    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validar todos los campos
        inputs.forEach(input => {
            validateField({ target: input });
            if (!input.validity.valid) {
                isValid = false;
            }
        });
        
        // Validar términos y condiciones
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            alert('Debes aceptar los términos y condiciones');
            isValid = false;
        }
        
        if (isValid) {
            // Simular envío exitoso
            showSuccessMessage();
            form.reset();
        }
    });
    
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.innerHTML = `
            <div style="
                background: #d4edda;
                color: #155724;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                border: 1px solid #c3e6cb;
            ">
                ✅ ¡Mensaje enviado exitosamente! Te contactaremos pronto.
            </div>
        `;
        
        form.insertBefore(successDiv, form.firstChild);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
        
        // Scroll al formulario
        form.scrollIntoView({ behavior: 'smooth' });
    }
});

// Animación de elementos al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const animateElements = document.querySelectorAll('.info-card, .artist-card');
    animateElements.forEach(el => observer.observe(el));
});

// Efecto parallax suave para el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${speed}px)`;
    }
});

// Navegación activa basada en scroll
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
});

// Contador animado para estadísticas de artistas
function animateCounters() {
    const counters = document.querySelectorAll('.stat strong');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 30);
    });
}

// Ejecutar contador cuando la sección de artistas sea visible
const artistsSection = document.getElementById('artistas');
if (artistsSection) {
    const artistsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                artistsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    artistsObserver.observe(artistsSection);
}

// Función para mostrar detalles de obra (simulado)
function showArtworkDetails(artworkElement) {
    const title = artworkElement.querySelector('h3').textContent;
    const artist = artworkElement.querySelector('.artist-name').textContent;
    const price = artworkElement.querySelector('.artwork-price').textContent;
    
    alert(`Obra: ${title}\nArtista: ${artist}\nPrecio: ${price}\n\n¡Funcionalidad de detalle implementada!`);
}

// Agregar click listeners a las obras
document.addEventListener('DOMContentLoaded', function() {
    const artworks = document.querySelectorAll('.gallery-item');
    artworks.forEach(artwork => {
        artwork.addEventListener('click', () => showArtworkDetails(artwork));
        artwork.style.cursor = 'pointer';
    });
});

// Modo oscuro (funcionalidad bonus)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Cargar preferencia de modo oscuro
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

console.log('🎨 Galería de Arte Digital cargada');
console.log('📱 Responsive design activado');
console.log('✨ Animaciones CSS implementadas');
console.log('🎯 Proyecto HTML/CSS completo funcionando');