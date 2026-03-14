// Enhancements for Peng Liang's Personal Website

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add scroll animation to sections
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('.home-section').forEach(section => {
    observer.observe(section);
    section.classList.add('fade-in');
  });

  // Add copy email functionality
  const emailElement = document.querySelector('a[href^="mailto:"]');
  if (emailElement) {
    const emailText = emailElement.textContent || emailElement.innerText;
    emailElement.setAttribute('title', 'Click to copy email address');
    
    emailElement.addEventListener('click', function(e) {
      if (!navigator.clipboard) return;
      
      e.preventDefault();
      const email = this.href.replace('mailto:', '');
      
      navigator.clipboard.writeText(email).then(() => {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy email:', err);
      });
    });
  }

  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          if (src) {
            img.src = src;
            img.classList.remove('lazy');
          }
          imgObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Back to top button functionality
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
      } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
      }
    });

    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Add hover effect to skill items
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Publication card animations
  const publicationCards = document.querySelectorAll('.media.stream-item');
  publicationCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
    });
  });

  // Add current year to footer if needed
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll('.current-year');
  yearElements.forEach(element => {
    element.textContent = currentYear;
  });

  // Console greeting
  console.log('%c👋 Hello! Welcome to Peng Liang\'s Personal Website', 
    'color: #2962ff; font-size: 14px; font-weight: bold;');
  console.log('%c🔬 Research • AI • Computer Vision • NLP', 
    'color: #00b0ff; font-size: 12px;');
});

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Theme switcher (if needed in future)
function initThemeSwitcher() {
  const themeToggle = document.createElement('button');
  themeToggle.id = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #2962ff;
    color: white;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  `;

  document.body.appendChild(themeToggle);

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
      icon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'dark');
    } else {
      icon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
    }
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.querySelector('i').className = 'fas fa-sun';
  }
}

// Initialize theme switcher on demand
// initThemeSwitcher(); // Uncomment to enable dark mode toggle