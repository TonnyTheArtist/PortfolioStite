const imageModal = document.getElementById("image-modal");

document.addEventListener('DOMContentLoaded', () => {
    const portfolioBtn = document.getElementById('portfolio-btn');
    const aboutBtn = document.getElementById('about-btn');
    const commissionsBtn = document.getElementById('commissions-btn');
    const homeBtn = document.getElementById('home-btn');
    const termsBtn = document.getElementById('terms-btn');
    const termsDiv = document.getElementById('terms');
    const modalImg = document.getElementById("modal-img");
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const sliderImages = document.querySelectorAll(".image-slider img");
    const galleryGrids = document.querySelectorAll('.gallery-grid');
    const mainButtons = [portfolioBtn, aboutBtn, commissionsBtn];

    const commissionSliders = document.querySelectorAll('#commissions .image-slider');

    // Initialize Sliders
    commissionSliders.forEach(initSlider);

    function initSlider(slider) {
    const sliderImages = slider.querySelectorAll('img');
    const imageWidth = 310;
    const totalImages = sliderImages.length;
    const originalWidth = imageWidth * totalImages;
    let currentPosition = 0;
    let autoAnimation = true;
    let animationFrameId;
    let animationSpeed = 0.5;

    function updateSliderPosition() {
        slider.style.transform = `translateX(${currentPosition}px)`;
    }

    function animateSlider() {
        if (!autoAnimation) return;

        currentPosition -= animationSpeed;
        updateSliderPosition();

        if (Math.abs(currentPosition) >= originalWidth) {
            currentPosition += originalWidth;
        }

        animationFrameId = requestAnimationFrame(animateSlider);
    }

    function startAutoAnimation() {
        if (!animationFrameId) {
            autoAnimation = true;
            animationFrameId = requestAnimationFrame(animateSlider);
        }
    }

    function pauseAutoAnimation() {
        autoAnimation = false;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    slider.addEventListener('mouseenter', pauseAutoAnimation);
    slider.addEventListener('mouseleave', startAutoAnimation);

    slider.addEventListener('wheel', (e) => {
        e.preventDefault();
        const scrollSpeed = e.deltaY * 0.3; // Diminui a velocidade do scroll
        currentPosition -= scrollSpeed;

        const maxPosition = 0;
        const minPosition = -originalWidth + slider.offsetWidth;

        // Garante que a posição não ultrapasse os limites
        currentPosition = Math.max(minPosition, Math.min(maxPosition, currentPosition));
        updateSliderPosition();
        pauseAutoAnimation();
        startAutoAnimation();
    });

    startAutoAnimation();
    animateSlider();
}

    function clearMainButtons() {
        mainButtons.forEach(btn => {
            btn.classList.remove('selected');
            btn.classList.remove('highlight');
        });
    }

    function showSection(sectionId) {
        document.querySelectorAll('.gallery, .bio, .social-links, .commissions').forEach(section => section.style.display = 'none');
        document.getElementById(sectionId).style.display = 'block';
    }

    function showCategory(cat) {
        galleryGrids.forEach(g => g.style.display = 'none');
        document.getElementById(cat).style.display = 'grid';
        filterButtons.forEach(btn => btn.classList.remove('selected', 'highlight'));
        const clickedBtn = Array.from(filterButtons).find(btn => btn.getAttribute('data-category') === cat);
        if (clickedBtn) clickedBtn.classList.add('selected');
    }

    // Button Event Listeners
    portfolioBtn.addEventListener('click', () => {
        clearMainButtons();
        portfolioBtn.classList.add('selected', 'highlight');
        showSection('portfolio');
        showCategory('fullrender');
    });

    aboutBtn.addEventListener('click', () => {
        clearMainButtons();
        aboutBtn.classList.add('selected', 'highlight');
        showSection('bio');
    });

    commissionsBtn.addEventListener('click', () => {
        clearMainButtons();
        commissionsBtn.classList.add('selected', 'highlight');
        showSection('commissions');
        termsDiv.style.display = 'none';
    });

    homeBtn.addEventListener('click', () => {
        showSection(null);
        clearMainButtons();
        filterButtons.forEach(btn => btn.classList.remove('selected', 'highlight'));
    });

    termsBtn.addEventListener('click', () => {
        termsDiv.style.display = termsDiv.style.display === 'none' ? 'block' : 'none';
        clearMainButtons();
        termsBtn.classList.add('highlight');
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            showCategory(event.target.getAttribute('data-category'));
            filterButtons.forEach(b => b.classList.remove('highlight'));
            btn.classList.add('highlight');
        });
    });

    // Modal Functions
    function openImage(src) {
        modalImg.src = src;
        imageModal.classList.add("active");
    }

    function closeModal() {
        imageModal.classList.remove('active');
    }

    galleryImages.forEach(img => img.addEventListener('click', () => openImage(img.src)));
    sliderImages.forEach(img => img.addEventListener("click", () => openImage(img.src)));

    // Modal Close Event
    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            closeModal();
        }
    });

});
