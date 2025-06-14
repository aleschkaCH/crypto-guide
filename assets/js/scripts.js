// /assets/js/scripts.js

/**
 * Инициализация анимаций и интерактивности
 */
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initBlockAnimations();
    initNavigationAnimations();
});

/**
 * Анимации появления элементов при скролле
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0px)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Применяем анимацию к секциям контента
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Анимация для карточек преимуществ
    document.querySelectorAll('.advantage-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

/**
 * Анимации для блоков блокчейна
 */
function initBlockAnimations() {
    document.querySelectorAll('.block').forEach((block, index) => {
        // Анимация при наведении
        block.addEventListener('mouseenter', () => {
            block.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
            block.style.transform = 'translateY(-5px) scale(1.02)';
        });

        block.addEventListener('mouseleave', () => {
            block.style.boxShadow = 'none';
            block.style.transform = 'translateY(0) scale(1)';
        });

        // Анимация появления с задержкой
        setTimeout(() => {
            block.style.opacity = '1';
            block.style.transform = 'translateY(0)';
        }, index * 200);

        // Изначально скрыты
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'all 0.3s ease';
    });
}

/**
 * Анимации для навигации
 */
function initNavigationAnimations() {
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.05)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Плавная прокрутка к якорям
 */
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Показать/скрыть кнопку "Наверх"
 */
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(scrollButton);

    // Показать/скрыть кнопку в зависимости от позиции скролла
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'translateY(10px)';
        }
    });

    // Обработчик клика
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Анимация при наведении
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.transform = 'translateY(-2px) scale(1.1)';
    });

    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.transform = 'translateY(0) scale(1)';
    });
}

/**
 * Инициализация темной темы (опционально)
 */
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌓';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.9);
        border: 2px solid rgba(102, 126, 234, 0.3);
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 1000;
        backdrop-filter: blur(10px);
    `;

    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
    });

    // Восстановить сохраненную тему
    if (localStorage.getItem('darkTheme') === 'true') {
        document.body.classList.add('dark-theme');
    }
}

/**
 * Инициализация всех дополнительных функций
 */
document.addEventListener('DOMContentLoaded', function() {
    initScrollToTop();
    // initThemeToggle(); // Раскомментировать для включения переключателя темы
});

/**
 * Анимация печатающегося текста для заголовков
 */
function typewriterEffect(element, text, speed = 50) {
    element.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

/**
 * Копирование текста в буфер обмена
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Скопировано в буфер обмена!');
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
}

/**
 * Показать уведомление
 */
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 1001;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * Обработка ошибок загрузки изображений
 */
function handleImageErrors() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Ошибка загрузки изображения:', this.src);
        });
    });
}

// Инициализация обработки ошибок изображений
document.addEventListener('DOMContentLoaded', handleImageErrors);