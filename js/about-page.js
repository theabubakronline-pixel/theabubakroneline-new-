/**
 * About Page JavaScript
 * Handles animated stats counter and emoji wave animation
 */

(function() {
    'use strict';

    // Animate stats counter
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length === 0) return;

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    const targetValue = parseInt(statElement.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = targetValue / (duration / 16); // 60fps
                    let currentValue = 0;

                    const updateCounter = () => {
                        currentValue += increment;
                        
                        if (currentValue < targetValue) {
                            statElement.textContent = Math.floor(currentValue);
                            requestAnimationFrame(updateCounter);
                        } else {
                            statElement.textContent = targetValue;
                        }
                    };

                    updateCounter();
                    observer.unobserve(statElement);
                }
            });
        }, observerOptions);

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    // Auto-wave emoji animation
    function initEmojiWave() {
        const emoji = document.querySelector('.hi-emoji');
        if (!emoji) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        let waveInterval;
        let isVisible = false;

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!isVisible) {
                        isVisible = true;
                        // Wave immediately when entering viewport
                        emoji.classList.add('waving');
                        setTimeout(() => emoji.classList.remove('waving'), 800);
                        
                        // Then wave every 2 seconds while visible
                        waveInterval = setInterval(() => {
                            emoji.classList.add('waving');
                            setTimeout(() => emoji.classList.remove('waving'), 800);
                        }, 2000);
                    }
                } else {
                    if (isVisible) {
                        isVisible = false;
                        if (waveInterval) {
                            clearInterval(waveInterval);
                        }
                    }
                }
            });
        }, observerOptions);

        observer.observe(emoji);
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            animateStats();
            initEmojiWave();
        });
    } else {
        animateStats();
        initEmojiWave();
    }
})();
