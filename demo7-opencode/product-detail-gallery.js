(function() {
    'use strict';

    const preview = document.getElementById('product-preview');
    const previewKicker = document.getElementById('preview-kicker');
    const previewTitle = document.getElementById('preview-title');
    const previewSubtitle = document.getElementById('preview-subtitle');
    const thumbnails = document.querySelectorAll('.thumb-card');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function setPreview(button) {
        const { variant, kicker, title, subtitle } = button.dataset;

        thumbnails.forEach((thumb) => thumb.classList.toggle('is-active', thumb === button));

        preview.classList.remove('variant-a', 'variant-b', 'variant-c', 'variant-d');
        preview.classList.add(variant);
        previewKicker.textContent = kicker;
        previewTitle.textContent = title;
        previewSubtitle.textContent = subtitle;
    }

    function activateTab(button) {
        const target = button.dataset.target;

        tabButtons.forEach((tab) => {
            const isActive = tab === button;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', String(isActive));
        });

        tabPanels.forEach((panel) => {
            panel.classList.toggle('is-active', panel.id === target);
        });
    }

    function init() {
        thumbnails.forEach((thumb) => {
            thumb.addEventListener('mouseenter', () => setPreview(thumb));
            thumb.addEventListener('focus', () => setPreview(thumb));
            thumb.addEventListener('click', () => setPreview(thumb));
        });

        tabButtons.forEach((button) => {
            button.addEventListener('click', () => activateTab(button));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
