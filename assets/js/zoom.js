/**
 * Image and Diagram Zoom Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Create Modal HTML
  const modalHTML = `
    <div id="zoom-modal" class="zoom-modal">
      <span class="zoom-close">&times;</span>
      <div class="zoom-modal-content-wrapper">
        <div id="zoom-modal-content" class="zoom-modal-content"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('zoom-modal');
  const modalContent = document.getElementById('zoom-modal-content');
  const closeBtn = document.querySelector('.zoom-close');

  // 2. Open Modal Function
  function openModal(element) {
    modalContent.innerHTML = ''; // Clear previous content
    const clone = element.cloneNode(true);
    
    // Remove fixed sizes to allow CSS scaling
    clone.style.width = 'auto';
    clone.style.height = 'auto';
    clone.style.maxWidth = '100%';
    clone.style.maxHeight = '100%';
    
    // For SVGs (Mermaid), ensure viewbox is preserved or set appropriately
    if (clone.tagName.toLowerCase() === 'svg') {
        clone.style.width = '100%';
        clone.style.height = 'auto';
    }

    modalContent.appendChild(clone);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  // 3. Close Modal Functions
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('zoom-modal-content-wrapper')) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // 4. Delegate Click Events
  document.addEventListener('click', (e) => {
    // Check for images in screenshot placeholders
    const imgTarget = e.target.closest('.screenshot-placeholder img, .screenshot-img');
    if (imgTarget) {
      openModal(imgTarget);
      return;
    }

    // Check for Mermaid diagrams (SVG)
    const svgTarget = e.target.closest('.mermaid svg, .diagram-container svg');
    if (svgTarget) {
        openModal(svgTarget);
    }
  });
});
