document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 0. GLOBAL STATE & UTILITIES
    // =========================================
    const appState = {
        stars: 0,
        emoji: null,
        isLoved: false,
        slider: 50,
        npsScore: null,
        reviewText: ""
    };

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    });

    // Toast Notification System
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // =========================================
    // 1. STAR RATING (Ripple Effect)
    // =========================================
    const starWrapper = document.getElementById('star-wrapper');
    const starFeedback = document.getElementById('star-feedback');
    let hoveredStar = 0;

    for (let i = 1; i <= 5; i++) {
        const btn = document.createElement('button');
        btn.className = 'star-btn';
        btn.dataset.value = i;
        btn.setAttribute('role', 'radio');
        btn.setAttribute('aria-checked', 'false');
        btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
        starWrapper.appendChild(btn);
    }
    const starBtns = starWrapper.querySelectorAll('.star-btn');

    function updateStarsUI() {
        const displayVal = hoveredStar > 0 ? hoveredStar : appState.stars;
        starBtns.forEach(btn => {
            const val = Number(btn.dataset.value);
            btn.classList.toggle('active', val <= displayVal);
            btn.setAttribute('aria-checked', val === appState.stars);
        });
        starFeedback.textContent = `Rating: ${appState.stars}/5`;
    }

    starWrapper.addEventListener('mouseover', (e) => {
        const btn = e.target.closest('.star-btn');
        if (!btn) return;
        hoveredStar = Number(btn.dataset.value);
        updateStarsUI();
    });

    starWrapper.addEventListener('mouseleave', () => {
        hoveredStar = 0;
        updateStarsUI();
    });

    starWrapper.addEventListener('click', (e) => {
        const btn = e.target.closest('.star-btn');
        if (!btn) return;
        
        // Ripple Animation
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);

        appState.stars = Number(btn.dataset.value);
        updateStarsUI();
    });


    // =========================================
    // 2. EMOJI REACTIONS (Floating Wave)
    // =========================================
    const emojiWrapper = document.getElementById('emoji-wrapper');
    const emojiBtns = emojiWrapper.querySelectorAll('.emoji-btn');

    emojiBtns.forEach(btn => btn.setAttribute('role', 'radio'));

    emojiWrapper.addEventListener('click', (e) => {
        const btn = e.target.closest('.emoji-btn');
        if (!btn) return;

        emojiBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-checked', 'false');
        });
        
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
        appState.emoji = btn.dataset.value;

        // Floating Wave Animation
        const emoji = btn.dataset.emoji;
        const rect = btn.getBoundingClientRect();
        const parentRect = emojiWrapper.getBoundingClientRect();

        for (let i = 0; i < 3; i++) {
            const floatEl = document.createElement('div');
            floatEl.className = 'floating-emoji';
            floatEl.textContent = emoji;
            
            const randomX = (Math.random() - 0.5) * 50;
            floatEl.style.left = `${rect.left - parentRect.left + 15 + randomX}px`;
            floatEl.style.top = `${rect.top - parentRect.top}px`;
            floatEl.style.animationDelay = `${i * 0.1}s`;
            
            emojiWrapper.appendChild(floatEl);
            setTimeout(() => floatEl.remove(), 1500);
        }
    });


    // =========================================
    // 3. HEART BUTTON (Particle Burst)
    // =========================================
    const heartBtn = document.getElementById('heart-btn');
    const heartContainer = document.getElementById('heart-container');

    heartBtn.addEventListener('click', () => {
        heartBtn.classList.toggle('active');
        appState.isLoved = heartBtn.classList.contains('active');
        
        if (appState.isLoved) {
            const numParticles = 15;
            for (let i = 0; i < numParticles; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                heartContainer.appendChild(particle);

                const angle = (i * (360 / numParticles)) * (Math.PI / 180);
                const velocity = 50 + Math.random() * 40;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;

                particle.animate([
                    { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                    { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
                ], {
                    duration: 600 + Math.random() * 300,
                    easing: 'cubic-bezier(0, .9, .57, 1)'
                }).onfinish = () => particle.remove();
            }
        }
    });


    // =========================================
    // 4. FLUID SLIDER
    // =========================================
    const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('slider-value');

    function updateSliderUI() {
        const val = slider.value;
        sliderValue.textContent = `${val}%`;
        appState.slider = val;
        
        let color = '#818cf8'; // Default primary (light mode)
        if (val < 30) color = '#ef4444'; 
        else if (val < 70) color = '#f59e0b'; 
        else color = '#10b981'; 

        sliderValue.style.color = color;
        const percentage = (val / slider.max) * 100;
        slider.style.background = `linear-gradient(to right, ${color} ${percentage}%, var(--border-color) ${percentage}%)`;
    }

    slider.addEventListener('input', updateSliderUI);
    updateSliderUI(); 


    // =========================================
    // 5. NPS SCALE (0-10)
    // =========================================
    const npsWrapper = document.getElementById('nps-wrapper');

    for (let i = 0; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.className = 'nps-btn';
        btn.textContent = i;
        btn.dataset.score = i;
        btn.setAttribute('role', 'radio');
        btn.setAttribute('aria-checked', 'false');
        npsWrapper.appendChild(btn);
    }

    npsWrapper.addEventListener('click', (e) => {
        if (!e.target.classList.contains('nps-btn')) return;
        
        npsWrapper.querySelectorAll('.nps-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-checked', 'false');
        });
        
        e.target.classList.add('active');
        e.target.setAttribute('aria-checked', 'true');
        appState.npsScore = e.target.dataset.score;
    });


    // =========================================
    // 6. FORM SUBMISSION & API SIMULATION
    // =========================================
    const form = document.getElementById('review-form');
    const submitBtn = document.getElementById('submit-btn');
    const submitBtnText = submitBtn.querySelector('span');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Grab text
        appState.reviewText = document.getElementById('review-text').value;

        // Basic Validation
        if(appState.stars === 0 && appState.emoji === null && appState.npsScore === null) {
            showToast("Please provide at least one rating before submitting.", "error");
            return;
        }

        // Simulate API Call
        submitBtnText.textContent = 'Submitting...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Console mein advanced JSON data dikhega (Industry standard format)
            console.log("🚀 Data sent to backend API:", JSON.stringify(appState, null, 2));
            
            showToast("Thank you! Your feedback has been submitted successfully.", "success");
            
            // Reset Form and State
            form.reset();
            submitBtnText.textContent = 'Submit Feedback';
            submitBtn.disabled = false;
            
            // Optional: Reset all visual states
            // appState = { stars: 0, emoji: null, isLoved: false, slider: 50, npsScore: null, reviewText: "" };
            
        }, 1500);
    });

});