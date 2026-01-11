// Auto-detect browser language and redirect on first visit
(function() {
    // Only run on homepage
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        return;
    }
    
    // Check if user has already chosen a language
    const hasChosenLanguage = localStorage.getItem('language-preference');
    
    if (!hasChosenLanguage) {
        // Get browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.toLowerCase().split('-')[0]; // 'en-US' -> 'en'
        
        // If browser is in English and we're on Spanish homepage, redirect
        if (langCode === 'en') {
            window.location.href = '/en/';
        }
        // Spanish is default, so no redirect needed for 'es'
    }
})();

// Save language preference when user clicks language switcher
document.addEventListener('DOMContentLoaded', function() {
    const langLinks = document.querySelectorAll('.lang-link');
    
    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Determine which language was clicked
            const isEnglish = this.textContent.trim() === 'EN';
            const isSpanish = this.textContent.trim() === 'ES';
            
            if (isEnglish || isSpanish) {
                const lang = isEnglish ? 'en' : 'es';
                localStorage.setItem('language-preference', lang);
            }
        });
    });
});
