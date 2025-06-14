// /assets/js/scripts.js

/**
 * Инициализация после загрузки DOM
 */
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initScrollToTop();
    initBlockAnimations();
    initNavigationAnimations();
    initImageHandling();
});

/**
 * Анимации появления элементов при скролле
 */
function initScrollAnimations() {
    // Проверяем поддержку Intersection Observer
    if (!window.IntersectionObserver) {
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Отключаем наблюдение после анимации
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Применяем анимацию к основным элементам
    document.querySelectorAll('.content-card, .advantage-card, .article-header').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/**
 * Кнопка "Наверх"
 */
function initScrollToTop() {
    // Создаем кнопку
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Прокрутить наверх');
    
    document.body.appendChild(scrollButton);

    // Показываем/скрываем кнопку в зависимости от позиции скролла
    let isScrolling = false;
    
    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.pageYOffset > 300) {
                    scrollButton.classList.add('show');
                } else {
                    scrollButton.classList.remove('show');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Обработчик клика
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Анимации для блоков блокчейна
 */
function initBlockAnimations() {
    const blocks = document.querySelectorAll('.block');
    if (!blocks.length) return;

    blocks.forEach((block, index) => {
        // Устанавливаем начальное состояние
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'all 0.3s ease';

        // Анимация появления с задержкой
        setTimeout(() => {
            block.style.opacity = '1';
            block.style.transform = 'translateY(0)';
        }, index * 150);

        // Добавляем интерактивность
        block.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                block.style.transform = 'translateY(-3px) scale(1.02)';
            }
        });

        block.addEventListener('mouseleave', () => {
            block.style.transform = 'translateY(0) scale(1)';
        });

        // Добавляем обработчик клика для мобильных устройств
        block.addEventListener('click', () => {
            block.style.transform = 'scale(0.98)';
            setTimeout(() => {
                block.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

/**
 * Анимации для навигации
 */
function initNavigationAnimations() {
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                button.style.transform = 'translateY(-1px)';
            }
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });

        // Добавляем ripple эффект для мобильных
        button.addEventListener('touchstart', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.touches[0].clientX - rect.left - size / 2;
            const y = e.touches[0].clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Добавляем CSS для ripple анимации
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Обработка изображений
 */
function initImageHandling() {
    // Ленивая загрузка изображений
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Обработка ошибок загрузки изображений
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Ошибка загрузки изображения:', this.src);
        });
    });
}

/**
 * Плавная прокрутка к якорям
 */
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Копирование текста в буфер обмена
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Скопировано в буфер обмена!', 'success');
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

/**
 * Fallback для копирования (для старых браузеров)
 */
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Скопировано в буфер обмена!', 'success');
    } catch (err) {
        console.error('Ошибка копирования: ', err);
        showToast('Не удалось скопировать', 'error');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Показать toast уведомление
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

    // Создаем контейнер для toast'ов если его нет
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '1055';
        document.body.appendChild(toastContainer);
    }

    toastContainer.appendChild(toast);

    // Инициализируем Bootstrap toast
    const bsToast = new bootstrap.Toast(toast, {
        autohide: true,
        delay: 3000
    });
    
    bsToast.show();

    // Удаляем toast после скрытия
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

/**
 * Анимация печатающегося текста
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
 * Обработка изменения размера окна
 */
function handleResize() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Пересчитываем размеры элементов при необходимости
            console.log('Окно изменено:', window.innerWidth + 'x' + window.innerHeight);
        }, 250);
    }, { passive: true });
}

/**
 * Инициализация дополнительных функций
 */
function initAdditionalFeatures() {
    handleResize();
    
    // Добавляем обработчики для внешних ссылок
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Улучшение доступности
    document.querySelectorAll('button, a').forEach(element => {
        if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
            console.warn('Элемент без aria-label:', element);
        }
    });
}

// Инициализация дополнительных функций
document.addEventListener('DOMContentLoaded', initAdditionalFeatures);

/**
 * Обработка темной темы
 */
function initThemeHandling() {
    // Проверяем системную тему
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleThemeChange(e) {
        if (e.matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }

    // Слушаем изменения системной темы
    prefersDark.addListener(handleThemeChange);
    
    // Применяем тему при загрузке
    handleThemeChange(prefersDark);
}

// Инициализация обработки тем
document.addEventListener('DOMContentLoaded', initThemeHandling);

/**
 * Утилиты для работы с производительностью
 */
const utils = {
    // Throttle функция
    throttle: function(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    },

    // Debounce функция
    debounce: function(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    // Проверка поддержки функций
    isSupported: function(feature) {
        const features = {
            intersectionObserver: 'IntersectionObserver' in window,
            clipboard: navigator.clipboard && navigator.clipboard.writeText,
            serviceWorker: 'serviceWorker' in navigator,
            localStorage: typeof Storage !== 'undefined'
        };
        return features[feature] || false;
    }
};

// Экспортируем утилиты в глобальную область
window.CryptoGuideUtils = utils;