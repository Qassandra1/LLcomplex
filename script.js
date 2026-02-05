// ===== LL-COMPLEX SCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                if (nav) nav.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
            }
        });
    });

    // ===== LL-DOCTOR CHAT =====
    const llDoctorBtn = document.getElementById('llDoctorBtn');
    const llDoctorChat = document.getElementById('llDoctorChat');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    const quickBtns = document.querySelectorAll('.quick-btn');

    const knowledgeBase = {
        'принимать': 'LL-Complex принимают по 1 столовой ложке (15 мл) 2 раза в день за 30 минут до еды. Также можно использовать для наружного применения. Для индивидуальной схемы напишите в WhatsApp: +7 (993) 767-20-94',
        'курс': 'Длительность курса зависит от состояния:\n• 1 флакон — пробный курс\n• 5 флаконов — стандартный курс (2-3 месяца)\n• 10 флаконов — расширенный курс\n\nДля подбора напишите в WhatsApp.',
        'противопоказан': 'LL-Complex — природный минеральный комплекс без гормонов. Противопоказание — индивидуальная непереносимость. Безопасен для детей, беременных и кормящих.',
        'результат': 'Первые улучшения через 2-3 недели. Для стойкого результата рекомендуется курс 2-3 месяца.',
        'цена': '• 1 флакон — 2 500 ₽\n• 5 флаконов — 11 000 ₽ (2 200 ₽/шт)\n• 10 флаконов — 21 000 ₽ (2 100 ₽/шт)\n\nДоставка по России. Оплата при получении.',
        'стоимость': '• 1 флакон — 2 500 ₽\n• 5 флаконов — 11 000 ₽ (2 200 ₽/шт)\n• 10 флаконов — 21 000 ₽ (2 100 ₽/шт)',
        'доставка': 'Доставка по всей России. Срок 3-7 дней. Оплата при получении.',
        'состав': 'Природный минеральный комплекс из грузинского источника: кальций, бор, селен, магний, натрий, калий, хлор.',
        'псориаз': 'LL-Complex эффективен при псориазе любой стадии. 8 из 10 пациентов отмечают улучшение.',
        'дети': 'Да, безопасен для детей любого возраста.',
        'беременн': 'Да, безопасен для беременных и кормящих.',
        'заказать': 'Для заказа: WhatsApp +7 (993) 767-20-94 или раздел "Заказать" на сайте.',
        'default': 'Для консультации напишите в WhatsApp: +7 (993) 767-20-94'
    };

    function findAnswer(question) {
        const q = question.toLowerCase();
        for (const [key, answer] of Object.entries(knowledgeBase)) {
            if (q.includes(key)) return answer;
        }
        return knowledgeBase['default'];
    }

    function addMessage(text, isUser = false) {
        const div = document.createElement('div');
        div.className = `message ${isUser ? 'user' : 'bot'}`;
        div.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage(text) {
        if (!text.trim()) return;
        addMessage(text, true);
        if (chatInput) chatInput.value = '';
        setTimeout(() => addMessage(findAnswer(text)), 500);
    }

    if (llDoctorBtn) {
        llDoctorBtn.addEventListener('click', () => llDoctorChat.classList.toggle('active'));
    }
    if (chatClose) {
        chatClose.addEventListener('click', () => llDoctorChat.classList.remove('active'));
    }
    if (chatSend) {
        chatSend.addEventListener('click', () => sendMessage(chatInput.value));
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage(chatInput.value);
        });
    }
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const q = btn.getAttribute('data-question');
            if (q) sendMessage(q);
        });
    });

    // ===== GALLERY FOLDERS =====
    const galleryFolders = document.querySelectorAll('.gallery-folder');
    galleryFolders.forEach(folder => {
        folder.addEventListener('click', function(e) {
            // Если кликнули на изображение, не переключаем папку
            if (e.target.tagName === 'IMG') return;
            
            const isActive = this.classList.contains('active');
            // Закрываем все папки
            galleryFolders.forEach(f => f.classList.remove('active'));
            // Открываем текущую, если она была закрыта
            if (!isActive) {
                this.classList.add('active');
            }
        });
    });

    // ===== LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Открытие изображения в lightbox
    document.querySelectorAll('.folder-images img').forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            if (lightbox && lightboxImg) {
                lightboxImg.src = this.src;
                lightbox.classList.add('active');
            }
        });
    });
    
    // Закрытие lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // ===== HEADER SCROLL =====
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.style.boxShadow = window.scrollY > 50 
                ? '0 4px 20px rgba(0,0,0,0.1)' 
                : '0 2px 20px rgba(0,0,0,0.08)';
        });
    }
});
