// animations.js
function initFadeAnimations() {
  const fadeElements = document.querySelectorAll('.services, .video-presentation');
  
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Otimização: para de observar após animar
        }
      });
    }, { threshold: 0.2 });

    fadeElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', initFadeAnimations);

// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Fechar menu ao clicar fora dele
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});


document.querySelector('.play-button').addEventListener('click', function() {
  const video = document.querySelector('.clinic-video');
  video.muted = false;
  video.controls = true;
  video.play();
  this.style.display = 'none';

});

document.addEventListener('DOMContentLoaded', function() {
            function initSlider(containerId, handleId) {
                const container = document.getElementById(containerId);
                const handle = document.getElementById(handleId);
                const afterImage = container.querySelector('.after-image');
                let isDragging = false;
                
                function moveSlider(e) {
                    if (!isDragging) return;
                    
                    const rect = container.getBoundingClientRect();
                    let x = e.clientX - rect.left;
                    x = Math.max(0, Math.min(x, rect.width));
                    
                    const percent = (x / rect.width) * 100;
                    afterImage.style.clipPath = `inset(0 0 0 ${percent}%)`;
                    handle.style.left = `${percent}%`;
                }
                
                handle.addEventListener('mousedown', () => isDragging = true);
                document.addEventListener('mouseup', () => isDragging = false);
                document.addEventListener('mousemove', moveSlider);
                
                // Touch events para mobile
                handle.addEventListener('touchstart', () => isDragging = true);
                document.addEventListener('touchend', () => isDragging = false);
                document.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    const touch = e.touches[0];
                    const rect = container.getBoundingClientRect();
                    let x = touch.clientX - rect.left;
                    x = Math.max(0, Math.min(x, rect.width));
                    
                    const percent = (x / rect.width) * 100;
                    afterImage.style.clipPath = `inset(0 0 0 ${percent}%)`;
                    handle.style.left = `${percent}%`;
                });
            }
            
            // Inicializa todos os sliders
            initSlider('container1', 'handle1');
            initSlider('container2', 'handle2');
        });

        document.addEventListener("DOMContentLoaded", function() {
    const section = document.querySelector('.before-after-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Opcional: remove o observer após a animação
            }
        });
    }, { threshold: 0.1 }); // Dispara quando 10% da seção estiver visível

    if (section) {
        observer.observe(section);
    }
});

let lastScroll = 0;
  const header = document.querySelector('.header');
  const scrollThreshold = 10; // Quantidade mínima de scroll para ativar

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Se rolar para cima e passar do threshold
    if (currentScroll < lastScroll && currentScroll > scrollThreshold) {
      header.classList.add('visible');
      header.classList.add('scrolled');
    } 
    // Se rolar para baixo ou estiver no topo
    else if (currentScroll > lastScroll || currentScroll <= 10) {
      header.classList.remove('visible');
    }
    
    // Adiciona estilo quando passa do topo da página
    if (currentScroll > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  (function() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    // Configurações ajustáveis
    const settings = {
      scrollThreshold: 10,    // Quantidade mínima de scroll para ativar
      debounceTime: 100       // Tempo para otimização de performance
    };
    
    function updateHeader() {
      const currentScrollY = window.scrollY;
      
      // Rolar para baixo - esconde
      if (currentScrollY > lastScrollY && currentScrollY > settings.scrollThreshold) {
        header.classList.add('hidden');
      } 
      // Rolar para cima - mostra
      else if (currentScrollY < lastScrollY) {
        header.classList.remove('hidden');
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    }
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
    
    // Reset ao chegar no topo
    window.addEventListener('scroll', function() {
      if (window.scrollY === 0) {
        header.classList.remove('hidden');
      }
    });
  })();