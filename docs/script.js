// ============================================
// LOGICA / Logic - DO NOT EDIT
// ============================================

let translations = {};
let currentLang = 'es';
let accordionsBound = false;

document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    initTheme();
    initNavigation();
    initAccordions();
    initScrollSpy();
});

function loadTranslations(lang) {
    translations = i18n[lang] || i18n.es;
    currentLang = lang;
    applyTranslations();
}

function setLanguage(lang) {
    currentLang = lang;
    applyTranslations();
}

function applyTranslations() {
    const t = translations;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(t, key);
        if (value) {
            el.textContent = value;
        }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const value = getNestedValue(t, key);
        if (value) {
            el.innerHTML = value;
        }
    });

    document.getElementById('objectivePurposes').innerHTML = t.objective?.purposeItems?.map(item => `<li>${item}</li>`).join('') || '';
    document.getElementById('step1Items').innerHTML = t.howItWorks?.step1Items?.map(item => `<li>${item}</li>`).join('') || '';
    document.getElementById('step2Items').innerHTML = t.howItWorks?.step2Items?.map(item => `<li>${item}</li>`).join('') || '';
    const terminalMethods = document.getElementById('terminalMethods');
    if (terminalMethods) terminalMethods.innerHTML = t.gettingStarted?.terminalMethods?.map(item => `<li>${item}</li>`).join('') || '';

    const setupWhatItDoes = document.getElementById('setupWhatItDoes');
    if (setupWhatItDoes) setupWhatItDoes.innerHTML = t.gettingStarted?.setupWhatItDoes?.map(item => `<li>${item}</li>`).join('') || '';

    const afterSetupOptions = document.getElementById('afterSetupOptions');
    if (afterSetupOptions) afterSetupOptions.innerHTML = t.gettingStarted?.afterSetupOptions?.map(item => `<li>${item}</li>`).join('') || '';
    document.getElementById('dependenciesList').innerHTML = t.reference?.dependencies?.map(item => `<li>${item}</li>`).join('') || '';
    document.getElementById('externalToolsList').innerHTML = t.reference?.externalTools?.map(item => `<li>${item}</li>`).join('') || '';

    const troubleshootingItems = document.getElementById('troubleshootingItems');
    if (troubleshootingItems) troubleshootingItems.innerHTML = t.troubleshooting?.items?.map(item => `<li>${item}</li>`).join('') || '';

    const faqContainer = document.getElementById('faqAccordion');
    if (t.faq?.questions) {
        faqContainer.innerHTML = t.faq.questions.map((q) => `
            <div class="accordion-item">
                <div class="accordion-header">
                    <h4>${q.question}</h4>
                    <span class="accordion-icon">▼</span>
                </div>
                <div class="accordion-content">
                    <div class="accordion-body">
                        <p>${q.answer}</p>
                        ${q.items ? `<ul>${q.items.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    initAccordions();
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

function initLanguage() {
    const select = document.getElementById('languageSelect');
    const savedLang = localStorage.getItem('lang');
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = savedLang || (['es', 'ca', 'en'].includes(browserLang) ? browserLang : 'es');
    
    select.value = defaultLang;
    loadTranslations(defaultLang);

    select.addEventListener('change', (e) => {
        loadTranslations(e.target.value);
        localStorage.setItem('lang', e.target.value);
    });
}

function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const iconMoon = toggle.querySelector('.theme-icon-moon');
    const iconSun = toggle.querySelector('.theme-icon-sun');
    const text = toggle.querySelector('.theme-text');
    
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(theme, iconMoon, iconSun, text);
    
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme, iconMoon, iconSun, text);
        localStorage.setItem('theme', newTheme);
    });
}

function setTheme(theme, iconMoon, iconSun, text) {
    const html = document.documentElement;
    const t = translations;
    
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        iconMoon.style.display = 'none';
        iconSun.style.display = 'flex';
        text.textContent = t.theme?.light || 'Modo claro';
    } else {
        html.removeAttribute('data-theme');
        iconMoon.style.display = 'flex';
        iconSun.style.display = 'none';
        text.textContent = t.theme?.dark || 'Modo oscuro';
    }
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({ top: targetSection.offsetTop - 20, behavior: 'smooth' });
            }
        });
    });
}

function initAccordions() {
    // Bind once using event delegation.
    // We re-render FAQ contents on language changes; binding per header would
    // duplicate listeners and toggle twice (ending up "closed").
    if (accordionsBound) return;
    accordionsBound = true;

    document.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (!header) return;
        const item = header.closest('.accordion-item');
        if (!item) return;
        item.classList.toggle('open');
    });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
}
