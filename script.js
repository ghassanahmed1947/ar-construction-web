document.getElementById('year').textContent = new Date().getFullYear();

  // header solid on scroll
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 40){ header.classList.add('scrolled'); }
    else{ header.classList.remove('scrolled'); }
  });

  // hero parallax + exploded-view house scroll effect
  const heroGrid = document.getElementById('heroGrid');
  const heroHouse = document.getElementById('heroHouse');
  const heroContent = document.getElementById('heroContent');
  const heroSection = document.querySelector('.hero');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onScrollParallax(){
    const y = window.scrollY;
    const heroHeight = heroSection.offsetHeight;

    // explode progress: 0 = fully assembled house, 1 = fully exploded apart.
    // Driven directly by scroll position, so it reverses smoothly on scroll-up too.
    const progress = Math.min(Math.max(y / (heroHeight * 0.85), 0), 1);
    heroHouse.style.setProperty('--p', prefersReduced ? 0 : progress);

    if(prefersReduced) return;
    if(y < heroHeight){
      heroGrid.style.transform = `translateY(${y * 0.25}px)`;
      heroContent.style.transform = `translateY(${y * 0.35}px)`;
      heroContent.style.opacity = Math.max(1 - y / (heroHeight * 0.8), 0);
    }
  }
  window.addEventListener('scroll', onScrollParallax, { passive: true });
  onScrollParallax();

  // scroll-reveal for project cards
  const cards = document.querySelectorAll('.project-card');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach(c => io.observe(c));

  // video play
  const videoWrap = document.getElementById('videoWrap');
  const playBtn = document.getElementById('playBtn');
  const projectVideo = document.getElementById('projectVideo');
  playBtn.addEventListener('click', () => {
    videoWrap.classList.add('playing');
    projectVideo.style.display = 'block';
    projectVideo.controls = true;
    projectVideo.play().catch(() => {
      // No real video source has been added yet — replace REPLACE_WITH_YOUR_VIDEO.mp4 in the HTML.
    });
  });

  // contact form -> mailto handoff
  const inquiryForm = document.getElementById('inquiryForm');
  if(inquiryForm){
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('f-name').value.trim();
      const phone = document.getElementById('f-phone').value.trim();
      const email = document.getElementById('f-email').value.trim();
      const message = document.getElementById('f-message').value.trim();

      const subject = `Website Inquiry — ${name}`;
      const body =
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email}\n\n` +
        `Project Details:\n${message}`;

      const mailto = `mailto:ahmedghassan939@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }
