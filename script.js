// LL-Complex Landing Page Script

document.addEventListener('DOMContentLoaded', () => {
  
  // === 1) Mobile Menu Toggle ===
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }

  // === 2) Smooth Scroll & Active Nav Highlight ===
  const navLinksAll = document.querySelectorAll('.nav-links a, .footer-col a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  
  navLinksAll.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
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
    });
  });
  
  // Highlight active section in nav
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };
  
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => navObserver.observe(section));

  // === 3) Fade-in Animation on Scroll ===
  const fadeElements = document.querySelectorAll('.section, .gallery-item, .review-card, .step-card, .guarantee-card, .order-card, .problem-card, .audience-card');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
  });

  // === 4) FAQ Accordion ===
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // === 5) Countdown Timer ===
  function startCountdown(elementId, hours) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Get or set end time in localStorage
    const storageKey = `countdown_${elementId}`;
    let endTime = localStorage.getItem(storageKey);
    
    if (!endTime || parseInt(endTime) < Date.now()) {
      endTime = Date.now() + hours * 3600 * 1000;
      localStorage.setItem(storageKey, endTime);
    }
    
    function update() {
      const now = Date.now();
      const diff = parseInt(endTime) - now;
      
      if (diff <= 0) {
        // Reset timer
        endTime = Date.now() + hours * 3600 * 1000;
        localStorage.setItem(storageKey, endTime);
      }
      
      const totalSeconds = Math.floor(diff / 1000);
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      
      element.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    
    update();
    setInterval(update, 1000);
  }
  
  startCountdown('countdown', 48);

  // === 6) Navbar Background on Scroll ===
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(10, 21, 32, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(10, 21, 32, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });

  // === 7) Gallery Drag Scroll ===
  const galleries = document.querySelectorAll('.gallery, .results-gallery');
  
  galleries.forEach(gallery => {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    gallery.addEventListener('mousedown', (e) => {
      isDown = true;
      gallery.style.cursor = 'grabbing';
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });
    
    gallery.addEventListener('mouseleave', () => {
      isDown = false;
      gallery.style.cursor = 'grab';
    });
    
    gallery.addEventListener('mouseup', () => {
      isDown = false;
      gallery.style.cursor = 'grab';
    });
    
    gallery.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 2;
      gallery.scrollLeft = scrollLeft - walk;
    });
  });

  // === 8) WhatsApp Button Animation ===
  const whatsappBtn = document.querySelector('.whatsapp-btn img');
  
  if (whatsappBtn) {
    setInterval(() => {
      whatsappBtn.style.animation = 'shake 0.5s ease';
      setTimeout(() => {
        whatsappBtn.style.animation = '';
      }, 500);
    }, 10000);
  }

  // === 9) LL-Doctor AI Assistant ===
  const llDoctorBtn = document.getElementById('llDoctorBtn');
  const llDoctorChat = document.getElementById('llDoctorChat');
  const llDoctorClose = document.getElementById('llDoctorClose');
  const llDoctorMessages = document.getElementById('llDoctorMessages');
  const llDoctorInput = document.getElementById('llDoctorInput');
  const llDoctorSend = document.getElementById('llDoctorSend');
  const quickQuestions = document.querySelectorAll('.quick-question');
  
  // Knowledge base for LL-Doctor
  const llDoctorKnowledge = {
    // Приём препарата
    'как принимать': 'Принимать LL-Complex следует по 1 столовой ложке (15 мл) 2 раза в день за 30 минут до еды. Курс лечения составляет 90 дней без пропусков. Важно соблюдать регулярность приёма для достижения максимального эффекта. Подробная инструкция прилагается к каждой упаковке.',
    'дозировка': 'Стандартная дозировка: 1 столовая ложка (15 мл) 2 раза в день. Для детей дозировка корректируется в зависимости от возраста: до 7 лет — 1 чайная ложка 2 раза в день, 7-14 лет — 1 десертная ложка 2 раза в день.',
    'сколько пить': 'Полный курс лечения при первой стадии псориаза составляет 90 дней (1 бокс). При второй и третьей стадии курс продлевается индивидуально — обычно требуется 2-3 бокса. Важно не прерывать курс для достижения стойкого результата.',
    
    // Подбор курса
    'какой курс': 'Выбор курса зависит от стадии заболевания:\n\n• Первая стадия (начальная): 1 бокс (90 дней)\n• Вторая стадия (прогрессирующая): 2 бокса (180 дней)\n• Третья стадия (застарелая форма): 2-3 бокса\n\nДля точного подбора курса рекомендую связаться с нашим консультантом в WhatsApp.',
    'подобрать курс': 'Чтобы подобрать оптимальный курс, мне нужно знать:\n\n1. Как давно у вас псориаз?\n2. Какая площадь поражения кожи?\n3. Пробовали ли вы другие методы лечения?\n\nОтветьте на эти вопросы, и я помогу определить подходящий курс.',
    'стадия': 'Определить стадию псориаза можно по следующим признакам:\n\n• Первая стадия: единичные бляшки, небольшая площадь поражения, недавнее начало\n• Вторая стадия: множественные бляшки, зуд, шелушение, площадь поражения до 30%\n• Третья стадия: обширные поражения, застарелая форма, неэффективность других методов',
    
    // Противопоказания
    'противопоказания': 'LL-Complex имеет полностью натуральный состав и не имеет строгих противопоказаний. Однако при индивидуальной непереносимости компонентов (кальций, бор, селен, магний) рекомендуется консультация врача. Препарат безопасен для детей и беременных женщин.',
    'побочные': 'Благодаря натуральному составу, LL-Complex практически не имеет побочных эффектов. В редких случаях возможна индивидуальная реакция на компоненты. Если вы заметили какие-либо необычные симптомы, рекомендуется обратиться к врачу.',
    'аллергия': 'LL-Complex не содержит аллергенов и подходит для людей с аллергическими реакциями. Более того, препарат эффективен при лечении аллергических высыпаний и дерматитов. При индивидуальной непереносимости компонентов проконсультируйтесь с врачом.',
    
    // Результаты
    'результат': 'Первые улучшения обычно заметны через 2-3 недели регулярного приёма. Полный курс (90 дней) необходим для достижения стойкого результата. По статистике, 8 из 10 пациентов полностью избавляются от псориаза при соблюдении полного курса.',
    'когда поможет': 'Сроки появления результата индивидуальны:\n\n• 1-2 неделя: уменьшение зуда и воспаления\n• 2-3 неделя: начало регенерации кожи\n• 4-6 неделя: заметное улучшение состояния\n• 8-12 неделя: полное восстановление кожи\n\nВажно не прерывать курс даже при видимом улучшении.',
    'эффективность': '8 из 10 пациентов полностью избавляются от псориаза при соблюдении полного курса. Эффективность подтверждена клиническими испытаниями и многочисленными отзывами. Препарат работает изнутри, устраняя причину заболевания — дефицит минералов.',
    
    // Состав
    'состав': 'LL-Complex — это жидкий минеральный комплекс на основе кальция, обогащённый:\n\n• Бором — для усвоения кальция\n• Селеном — антиоксидант\n• Магнием — для нервной системы\n• Натрием и калием — электролитный баланс\n• Хлором — для обмена веществ\n\n100% натуральный состав, без гормонов и химии.',
    'натуральный': 'Да, LL-Complex имеет полностью натуральный состав. Препарат не содержит гормонов, синтетических добавок и химических компонентов. Именно поэтому он безопасен для детей и беременных женщин.',
    
    // Для кого
    'дети': 'LL-Complex безопасен для детей благодаря натуральному составу. Дозировка для детей:\n\n• До 3 лет: по рекомендации врача\n• 3-7 лет: 1 чайная ложка 2 раза в день\n• 7-14 лет: 1 десертная ложка 2 раза в день\n• Старше 14 лет: взрослая дозировка',
    'беременн': 'Да, LL-Complex безопасен для беременных и кормящих женщин. Натуральный минеральный состав не только не вредит, но и полезен для организма мамы и малыша. Многие женщины успешно применяют препарат во время беременности.',
    'экзема': 'LL-Complex эффективен при экземе и других кожных заболеваниях. Принцип действия тот же — восполнение дефицита минералов и запуск естественной регенерации кожи. Курс лечения при экземе обычно составляет 60-90 дней.',
    'дерматит': 'LL-Complex помогает при различных видах дерматита: атопическом, контактном, себорейном. Препарат устраняет причину воспаления изнутри, восстанавливая минеральный баланс организма.',
    
    // Доставка и оплата
    'доставка': 'Доставка осуществляется по всей России:\n\n• СДЭК — 3-5 дней\n• Почта России — 5-7 дней\n• Курьер (Москва, СПб) — 1-2 дня\n\nОтправка в день заказа. Оплата при получении после проверки товара.',
    'оплата': 'Оплата производится при получении — вы платите только после того, как проверите товар. Также доступна предоплата на карту со скидкой 5%. Мы гарантируем возврат денег в течение 14 дней, если препарат не подошёл.',
    'цена': 'Актуальные цены:\n\n• 1 бутылка: 2 599 ₽ (вместо 3 500 ₽)\n• Полный курс (бокс): 40 000 ₽ (вместо 47 000 ₽)\n• Оптом (от 10 бутылок): индивидуальная цена\n\nДля заказа напишите в WhatsApp: +7 964 010-59-95',
    
    // Гарантии
    'гарантия': 'Мы гарантируем:\n\n• Оригинальный продукт — мы официальный дистрибьютор\n• Возврат денег в течение 14 дней\n• Оплата при получении\n• Быстрая доставка 3-7 дней\n\n8 из 10 пациентов получают результат при соблюдении полного курса.',
    'возврат': 'Если препарат вам не подошёл, мы вернём деньги в течение 14 дней. Для возврата свяжитесь с нами в WhatsApp. Мы ценим каждого клиента и гарантируем честные условия.',
    'оригинал': 'Мы являемся официальным дистрибьютором LL-Complex на территории РФ. Все документы и сертификаты в наличии: сертификат качества, протокол испытаний, декларация о соответствии. Остерегайтесь подделок!',
    
    // Общие вопросы
    'что такое': 'LL-Complex — это жидкий минеральный комплекс на основе кальция для лечения псориаза и других кожных заболеваний. Препарат работает изнутри, восполняя дефицит минералов на клеточном уровне и запуская естественные процессы регенерации кожи.',
    'как работает': 'LL-Complex работает в 4 этапа:\n\n1. Восполнение дефицита минералов (усвоение 98%)\n2. Нормализация минерального баланса и иммунитета\n3. Регенерация клеток кожи\n4. Закрепление стойкого результата\n\nПрепарат устраняет причину, а не маскирует симптомы.',
    'помогает': 'LL-Complex помогает при:\n\n• Псориазе (любая стадия)\n• Экземе и дерматитах\n• Аллергических высыпаниях\n• Проблемах с кожей у детей\n• Для очищения организма\n• Для ингаляций (по согласованию с врачом)',
    
    // Контакты
    'контакт': 'Связаться с нами можно:\n\n• WhatsApp: +7 964 010-59-95\n• Телефон: +7 964 010-59-95\n\nОтвечаем быстро, консультируем бесплатно!',
    'заказать': 'Для заказа напишите в WhatsApp: +7 964 010-59-95\n\nУкажите:\n• Какой вариант хотите (1 бутылка / бокс / опт)\n• Город доставки\n• ФИО для получения\n\nМы свяжемся с вами для подтверждения заказа.',
    'консультация': 'Бесплатная консультация доступна в WhatsApp: +7 964 010-59-95\n\nНаши специалисты помогут:\n• Подобрать курс лечения\n• Ответить на вопросы о препарате\n• Оформить заказ\n\nОтвечаем в течение 5 минут!'
  };
  
  // Default responses
  const defaultResponses = [
    'Интересный вопрос! К сожалению, я не могу дать точный ответ на него. Рекомендую связаться с нашим консультантом в WhatsApp: +7 964 010-59-95 — он поможет вам.',
    'Этот вопрос лучше обсудить с нашим специалистом. Напишите в WhatsApp: +7 964 010-59-95 — мы ответим в течение 5 минут!',
    'Я AI-ассистент и могу рассказать о препарате LL-Complex, его применении и результатах. Для индивидуальной консультации свяжитесь с нами в WhatsApp: +7 964 010-59-95'
  ];
  
  function findAnswer(question) {
    const q = question.toLowerCase();
    
    for (const [key, answer] of Object.entries(llDoctorKnowledge)) {
      if (q.includes(key)) {
        return answer;
      }
    }
    
    // Check for greetings
    if (q.match(/привет|здравствуй|добрый|хай|hello|hi/)) {
      return 'Здравствуйте! Рад вас видеть. Я LL-Доктор — AI-ассистент по препарату LL-Complex. Чем могу помочь? Могу рассказать о препарате, помочь подобрать курс или ответить на вопросы о лечении.';
    }
    
    // Check for thanks
    if (q.match(/спасибо|благодар|thanks/)) {
      return 'Пожалуйста! Рад был помочь. Если возникнут ещё вопросы — обращайтесь. Для заказа или детальной консультации пишите в WhatsApp: +7 964 010-59-95';
    }
    
    // Return random default response
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
  
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ll-doctor-message ${isUser ? 'user' : 'bot'}`;
    messageDiv.textContent = text;
    llDoctorMessages.appendChild(messageDiv);
    llDoctorMessages.scrollTop = llDoctorMessages.scrollHeight;
  }
  
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'll-doctor-message bot typing';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    llDoctorMessages.appendChild(typingDiv);
    llDoctorMessages.scrollTop = llDoctorMessages.scrollHeight;
  }
  
  function hideTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
  }
  
  function handleUserMessage(message) {
    if (!message.trim()) return;
    
    addMessage(message, true);
    llDoctorInput.value = '';
    
    showTyping();
    
    // Simulate thinking delay
    setTimeout(() => {
      hideTyping();
      const answer = findAnswer(message);
      addMessage(answer);
    }, 1000 + Math.random() * 1000);
  }
  
  // Event listeners for LL-Doctor
  if (llDoctorBtn && llDoctorChat) {
    llDoctorBtn.addEventListener('click', () => {
      llDoctorChat.classList.toggle('active');
    });
    
    llDoctorClose.addEventListener('click', () => {
      llDoctorChat.classList.remove('active');
    });
    
    llDoctorSend.addEventListener('click', () => {
      handleUserMessage(llDoctorInput.value);
    });
    
    llDoctorInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleUserMessage(llDoctorInput.value);
      }
    });
    
    quickQuestions.forEach(btn => {
      btn.addEventListener('click', () => {
        const question = btn.getAttribute('data-question');
        handleUserMessage(question);
      });
    });
  }

  // === 10) Track CTA Clicks (for analytics) ===
  const ctaButtons = document.querySelectorAll('.btn, .btn-order');
  
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const buttonText = btn.textContent.trim();
      const section = btn.closest('section')?.id || 'unknown';
      console.log(`CTA Click: "${buttonText}" in section "${section}"`);
    });
  });

  // === 11) Lazy Load Images ===
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });
  
  images.forEach(img => imageObserver.observe(img));

  // === 12) Preloader ===
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

});
