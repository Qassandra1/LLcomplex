// ========================================
// LL-COMPLEX WEBSITE SCRIPTS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // LL-Doctor Chat
    const llDoctorBtn = document.getElementById('llDoctorBtn');
    const llDoctorChat = document.getElementById('llDoctorChat');
    const llDoctorClose = document.getElementById('llDoctorClose');
    const llDoctorInput = document.getElementById('llDoctorInput');
    const llDoctorSend = document.getElementById('llDoctorSend');
    const llDoctorMessages = document.getElementById('llDoctorMessages');
    const quickBtns = document.querySelectorAll('.quick-btn');

    // Knowledge base for LL-Doctor
    const knowledgeBase = {
        'как принимать': 'Принимать LL-Complex следует по 1 столовой ложке (15 мл) 2 раза в день за 30 минут до еды. Курс лечения составляет 90 дней без пропусков. Важно соблюдать регулярность приёма для достижения максимального эффекта.',
        'принимать': 'Принимать LL-Complex следует по 1 столовой ложке (15 мл) 2 раза в день за 30 минут до еды. Курс лечения составляет 90 дней без пропусков.',
        'дозировка': 'Стандартная дозировка: 1 столовая ложка (15 мл) 2 раза в день за 30 минут до еды. Для детей дозировка может быть скорректирована.',
        'курс': 'Полный курс лечения составляет 90 дней (3 месяца). Для первой стадии псориаза обычно достаточно одного курса. При более тяжёлых формах может потребоваться повторный курс.',
        'подобрать курс': 'Для подбора оптимального курса рекомендую обратиться к нашим специалистам в WhatsApp: +7 964 010-59-95. Они помогут определить стадию заболевания и подобрать нужное количество флаконов.',
        'противопоказания': 'LL-Complex — натуральный минеральный комплекс без гормонов и химических добавок. Противопоказания: индивидуальная непереносимость компонентов. При наличии хронических заболеваний рекомендуется консультация врача.',
        'побочные': 'LL-Complex имеет натуральный состав и обычно хорошо переносится. Побочные эффекты крайне редки и могут включать индивидуальную непереносимость компонентов.',
        'результат': 'Первые улучшения обычно заметны через 2-3 недели регулярного приёма. Для стойкого результата рекомендуется пройти полный курс — 90 дней. Результаты индивидуальны и зависят от стадии заболевания.',
        'когда будет результат': 'Первые улучшения обычно заметны через 2-3 недели регулярного приёма. Полное восстановление кожи происходит в течение 2-3 месяцев при соблюдении рекомендаций.',
        'сроки': 'Первые результаты — через 2-3 недели. Полный курс — 90 дней. Стойкий эффект сохраняется надолго после прохождения полного курса.',
        'беременным': 'Да, LL-Complex безопасен для беременных женщин благодаря полностью натуральному составу. Он не содержит гормонов и химических добавок.',
        'беременность': 'LL-Complex можно принимать во время беременности. Натуральный минеральный состав безопасен для мамы и малыша.',
        'детям': 'Да, LL-Complex можно давать детям. Для детей дозировка корректируется в зависимости от возраста. Рекомендуем уточнить дозировку у наших специалистов.',
        'дети': 'LL-Complex безопасен для детей благодаря натуральному составу. Дозировка подбирается индивидуально в зависимости от возраста ребёнка.',
        'состав': 'LL-Complex — жидкий минеральный комплекс на основе кальция, обогащённый бором, селеном, магнием, натрием, калием и хлором. 100% натуральный состав без гормонов и химии.',
        'что входит': 'В состав LL-Complex входят: кальций (основа), бор, селен, магний, натрий, калий и хлор. Все компоненты натурального происхождения.',
        'цена': 'Цены на LL-Complex: 1 флакон — 2 990 руб (на 1 месяц), 3 флакона — 7 990 руб (полный курс, экономия 2 510 руб), 6 флаконов — 14 990 руб (для семьи, экономия 6 010 руб).',
        'стоимость': 'Стоимость LL-Complex: 1 флакон — 2 990 руб, 3 флакона (полный курс) — 7 990 руб, 6 флаконов — 14 990 руб.',
        'доставка': 'Доставка осуществляется по всей России курьерской службой или почтой. Срок доставки: 3-7 дней в зависимости от региона. Оплата при получении.',
        'оплата': 'Оплата производится при получении заказа. Вы можете оплатить наличными курьеру или картой.',
        'гарантия': 'Мы уверены в качестве нашего продукта. Если в течение 30 дней вы не увидите улучшений при соблюдении рекомендаций по приёму, мы вернём деньги.',
        'возврат': 'Гарантия возврата денег — 30 дней. Если вы не увидите улучшений при соблюдении рекомендаций, мы вернём полную стоимость.',
        'псориаз': 'LL-Complex эффективен при псориазе любой стадии, включая застарелые формы. Препарат работает изнутри, восполняя дефицит минералов и запуская естественные процессы восстановления кожи.',
        'экзема': 'LL-Complex помогает при экземе, снимая воспаление и восстанавливая кожный барьер благодаря минеральному комплексу.',
        'дерматит': 'При дерматитах LL-Complex помогает восстановить кожный барьер и нормализовать работу иммунной системы.',
        'аллергия': 'LL-Complex укрепляет иммунитет и помогает при аллергических реакциях на коже. Многие пациенты отмечают улучшение уже после первого курса.',
        'ингаляции': 'LL-Complex можно использовать для ингаляций при бронхите и других заболеваниях дыхательных путей. Рекомендуем согласовать с врачом.',
        'заказать': 'Для заказа LL-Complex напишите нам в WhatsApp: +7 964 010-59-95 или нажмите кнопку "Заказать" на сайте. Мы поможем подобрать оптимальный курс.',
        'купить': 'Купить LL-Complex можно через наш сайт или написав в WhatsApp: +7 964 010-59-95. Доставка по всей России.',
        'сертификат': 'LL-Complex имеет все необходимые сертификаты качества, протоколы испытаний и декларацию о соответствии. Документы можно посмотреть на сайте.',
        'оригинал': 'Мы являемся официальным представителем и гарантируем 100% оригинальность продукции. Остерегайтесь подделок!',
        'привет': 'Здравствуйте! Я LL-Доктор, ваш AI-помощник. Могу рассказать о препарате LL-Complex, помочь подобрать курс или ответить на вопросы о лечении кожных заболеваний. Чем могу помочь?',
        'здравствуйте': 'Здравствуйте! Рад помочь вам. Задайте любой вопрос о LL-Complex или выберите один из быстрых вопросов ниже.',
        'спасибо': 'Пожалуйста! Если у вас есть ещё вопросы, я с удовольствием отвечу. Для заказа или консультации со специалистом напишите в WhatsApp: +7 964 010-59-95'
    };

    function findAnswer(question) {
        const q = question.toLowerCase();
        for (const [key, answer] of Object.entries(knowledgeBase)) {
            if (q.includes(key)) {
                return answer;
            }
        }
        return 'Извините, я не нашёл точного ответа на ваш вопрос. Для подробной консультации рекомендую написать нашим специалистам в WhatsApp: +7 964 010-59-95. Они помогут вам с любым вопросом о LL-Complex.';
    }

    function addMessage(text, isBot = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ll-doctor-message ${isBot ? 'bot' : 'user'}`;
        messageDiv.textContent = text;
        llDoctorMessages.appendChild(messageDiv);
        llDoctorMessages.scrollTop = llDoctorMessages.scrollHeight;
    }

    function handleQuestion(question) {
        addMessage(question, false);
        setTimeout(() => {
            const answer = findAnswer(question);
            addMessage(answer, true);
        }, 500);
    }

    if (llDoctorBtn) {
        llDoctorBtn.addEventListener('click', () => {
            llDoctorChat.classList.toggle('active');
        });
    }

    if (llDoctorClose) {
        llDoctorClose.addEventListener('click', () => {
            llDoctorChat.classList.remove('active');
        });
    }

    if (llDoctorSend) {
        llDoctorSend.addEventListener('click', () => {
            const question = llDoctorInput.value.trim();
            if (question) {
                handleQuestion(question);
                llDoctorInput.value = '';
            }
        });
    }

    if (llDoctorInput) {
        llDoctorInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const question = llDoctorInput.value.trim();
                if (question) {
                    handleQuestion(question);
                    llDoctorInput.value = '';
                }
            }
        });
    }

    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-q');
            if (question) {
                handleQuestion(question);
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }
    });

    // Animate on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.problem-card, .step-card, .condition-card, .result-card, .review-card, .guarantee-card, .order-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
