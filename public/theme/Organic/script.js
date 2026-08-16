// ============ THEME TOGGLE ============
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('themeBtn');
  const next = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = next;
  btn.textContent = next === 'dark' ? 'light_mode' : 'dark_mode';
  btn.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
  localStorage.setItem('theme', next);
}
(function initTheme() {
  const saved = localStorage.getItem('theme');
  const btn = document.getElementById('themeBtn');
  const apply = (t) => {
    document.body.dataset.theme = t;
    btn.textContent = t === 'dark' ? 'light_mode' : 'dark_mode';
    btn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
  };
  if (saved) { apply(saved); }
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { apply('dark'); }
})();

// ============ POPUP ============
function openPopup(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closePopup(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}
document.querySelectorAll('.popup-overlay').forEach(o => o.addEventListener('click', e => { if (e.target === o) closePopup(o.id); }));
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.popup-overlay.active').forEach(p => closePopup(p.id)); });

// ============ TOAST ============
function showToast(msg) {
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(100%)'; setTimeout(() => t.remove(), 300); }, 3000);
}

// ============ SLIDER ============
let slideIndex = 0;
const track = document.getElementById('sliderTrack');
const slides = track.children.length;
const dotsContainer = document.getElementById('sliderDots');
for (let i = 0; i < slides; i++) {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.onclick = () => goToSlide(i);
  dotsContainer.appendChild(d);
}
function goToSlide(i) {
  slideIndex = (i + slides) % slides;
  track.style.transform = `translateX(-${slideIndex * 100}%)`;
  document.querySelectorAll('.slider-dots .dot').forEach((d, j) => d.classList.toggle('active', j === slideIndex));
}
function moveSlider(dir) { goToSlide(slideIndex + dir); }
let autoSlide = setInterval(() => goToSlide(slideIndex + 1), 4000);
document.getElementById('slider').addEventListener('mouseenter', () => clearInterval(autoSlide));
document.getElementById('slider').addEventListener('mouseleave', () => { autoSlide = setInterval(() => goToSlide(slideIndex + 1), 4000); });

// ============ COUNTER ANIMATION ============
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count;
    let curr = 0, step = Math.ceil(target / 60);
    const tick = () => { curr = Math.min(curr + step, target); el.textContent = curr.toLocaleString() + (target === 99 ? '%' : '+'); if (curr < target) requestAnimationFrame(tick); };
    tick();
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ============ NAVBAR SCROLL ============
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  backTop.classList.toggle('visible', window.scrollY > 400);
});

// ============ FORM VALIDATION ============
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  const set = (id, errId, msg) => {
    const el = document.getElementById(id), err = document.getElementById(errId);
    if (!el.value || (el.type === 'checkbox' && !el.checked)) { err.textContent = msg; el.classList.add('invalid'); valid = false; }
    else { err.textContent = ''; el.classList.remove('invalid'); el.classList.add('valid'); }
  };
  set('cName', 'errName', 'Name is required');
  const email = document.getElementById('cEmail');
  const emailErr = document.getElementById('errEmail');
  if (!email.value) { emailErr.textContent = 'Email is required'; email.classList.add('invalid'); valid = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { emailErr.textContent = 'Invalid email format'; email.classList.add('invalid'); valid = false; }
  else { emailErr.textContent = ''; email.classList.remove('invalid'); email.classList.add('valid'); }
  const phone = document.getElementById('cPhone');
  const phoneErr = document.getElementById('errPhone');
  if (phone.value && !/^[\d\s\+\-\(\)]{7,}$/.test(phone.value)) { phoneErr.textContent = 'Invalid phone number'; phone.classList.add('invalid'); valid = false; }
  else { phoneErr.textContent = ''; phone.classList.remove('invalid'); }
  set('cSubject', 'errSubject', 'Please select a subject');
  const msg = document.getElementById('cMessage');
  const msgErr = document.getElementById('errMessage');
  if (!msg.value) { msgErr.textContent = 'Message is required'; msg.classList.add('invalid'); valid = false; }
  else if (msg.value.length < 10) { msgErr.textContent = 'Message must be at least 10 characters'; msg.classList.add('invalid'); valid = false; }
  else { msgErr.textContent = ''; msg.classList.remove('invalid'); msg.classList.add('valid'); }
  set('cTerms', 'errTerms', 'You must agree to continue');
  if (valid) {
    document.getElementById('formSuccess').hidden = false;
    contactForm.reset();
    setTimeout(() => { document.getElementById('formSuccess').hidden = true; }, 5000);
    showToast('Message sent successfully!');
  }
});

// Live validation on blur
['cName','cEmail','cSubject','cMessage'].forEach(id => {
  document.getElementById(id).addEventListener('blur', () => {
    const el = document.getElementById(id);
    if (el.value) { el.classList.remove('invalid'); el.classList.add('valid'); }
  });
});

// ============ KEYBOARD NAV: ESC closes popups ============
console.log('Nexus Organic landing page loaded ✅');