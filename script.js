// Declare a variável imageModal fora do event listener
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
  const sliderImages = document.querySelectorAll(".image-slider img"); // Modal
  const galleryGrids = document.querySelectorAll('.gallery-grid');
  const mainButtons = [portfolioBtn, aboutBtn, commissionsBtn];

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

  // BOTÃO PORTFÓLIO
  portfolioBtn.addEventListener('click', () => {
    clearMainButtons();
    portfolioBtn.classList.add('selected');
    portfolioBtn.classList.add('highlight');
    showSection('portfolio');
    showCategory('fullrender');
  });

  // BOTÃO SOBRE MIM
  aboutBtn.addEventListener('click', () => {
    clearMainButtons();
    aboutBtn.classList.add('selected');
    aboutBtn.classList.add('highlight');
    showSection('bio');
    // document.getElementById('socials').style.display = 'block';  <-- REMOVA OU COMENTE ESTA LINHA
  });

  // BOTÃO COMMISSIONS
  commissionsBtn.addEventListener('click', () => {
    clearMainButtons();
    commissionsBtn.classList.add('selected');
    commissionsBtn.classList.add('highlight');
    showSection('commissions');
    termsDiv.style.display = 'none';
  });

  // BOTÃO HOME (TÍTULO)
  homeBtn.addEventListener('click', () => {
    showSection(null); // Esconde todas as seções principais
    clearMainButtons(); // Garante que remove o highlight
    filterButtons.forEach(btn => btn.classList.remove('selected'));
    mainButtons.forEach(btn => btn.classList.remove('highlight'));  
  });

  // BOTÃO TERMS OF SERVICE - Se você quiser o highlight nele também, faça como os outros
  termsBtn.addEventListener('click', () => {
    termsDiv.style.display = termsDiv.style.display === 'none' ? 'block' : 'none';
    clearMainButtons(); // Adicione esta linha se quiser remover o highlight de outros botões
    termsBtn.classList.add('highlight'); // Adicione esta linha
  });

  // Adicione esta parte para os botões de filtro se quiser o highlight neles também
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
      const category = event.target.getAttribute('data-category');
      showCategory(category);
      filterButtons.forEach(b => b.classList.remove('highlight')); // Remove de outros
      btn.classList.add('highlight'); // Adiciona ao clicado
    });
  });

  function showCategory(cat) {
    galleryGrids.forEach(g => g.style.display = 'none');
    document.getElementById(cat).style.display = 'grid';

    // Remove classe 'selected' de todos os botões de filtro
    filterButtons.forEach(btn => btn.classList.remove('selected'));

    // Adiciona classe 'selected' ao botão clicado
    const clickedBtn = Array.from(filterButtons).find(btn =>
      btn.getAttribute('data-category') === cat
    );
    if (clickedBtn) clickedBtn.classList.add('selected');
  }

  // Adiciona event listeners para os botões de filtro
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
      const category = event.target.getAttribute('data-category');
      showCategory(category);
    });
  });

  // MODAL
  function openImage(src) {
    modalImg.src = src;
    imageModal.classList.add("active");
  }

  function closeModal() {
    imageModal.classList.remove('active');
  }

  galleryImages.forEach(img => {
    img.addEventListener('click', () => openImage(img.src));
  });

  sliderImages.forEach(img => { // Modal
    img.addEventListener("click", () => openImage(img.src));
  });

  // SLIDER (Adicionado aqui)
  const commissionSlider = document.querySelector('#commissions .image-slider');
  const commissionSliderImages = document.querySelectorAll('#commissions .image-slider img');
  const commissionImageWidth = 310;
  const commissionTotalImages = commissionSliderImages.length;
  const commissionOriginalWidth = commissionImageWidth * (commissionTotalImages / 2);
  let commissionCurrentPosition = 0;

  function animateCommissionSlider() {
    commissionCurrentPosition -= 1;
    commissionSlider.style.transform = `translateX(${commissionCurrentPosition}px)`;

    // Repositioning Logic
    if (commissionCurrentPosition <= -commissionOriginalWidth) {
      commissionCurrentPosition = 0;
      commissionSlider.style.transition = 'none'; // Remove transition
      commissionSlider.style.transform = `translateX(${commissionCurrentPosition}px)`;
      requestAnimationFrame(() => { // Use requestAnimationFrame for the next frame
        commissionSlider.style.transition = 'transform 0.3s linear'; // Re-add transition
      });
    }

    requestAnimationFrame(animateCommissionSlider);
  }

  if (commissionSlider) { // Verifica se o slider existe
    animateCommissionSlider();
  }
});

// Adiciona um event listener para fechar o modal ao clicar fora da imagem
imageModal.addEventListener('click', (event) => {
  console.log('Clique no modal:', event.target);
  if (event.target === imageModal) {
    console.log('Clicou fora da imagem, fechando o modal.');
    closeModal();
  } else {
    console.log('Clicou dentro da imagem.');
  }
});

function closeModal() {
  console.log('Função closeModal() chamada.');
  imageModal.classList.remove('active');
}