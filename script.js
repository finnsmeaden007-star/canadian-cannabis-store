const ageGate = document.getElementById('ageGate');
const confirmAge = document.getElementById('confirmAge');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const orderMenuUrl = window.JUNIPER_CONFIG?.orderMenuUrl;

if (sessionStorage.getItem('juniper-age-confirmed')) ageGate.classList.add('is-hidden');

confirmAge.addEventListener('click', () => {
  sessionStorage.setItem('juniper-age-confirmed', 'true');
  ageGate.classList.add('is-hidden');
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-order-link]').forEach(link => {
  link.href = orderMenuUrl;
});
