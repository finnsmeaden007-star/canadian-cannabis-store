const ageGate = document.getElementById('ageGate');
const confirmAge = document.getElementById('confirmAge');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const orderingStatus = window.JUNIPER_CONFIG?.orderingStatus || 'Online ordering is coming soon.';

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

const orderNotice = document.getElementById('orderNotice');
const orderNoticeMessage = document.getElementById('orderNoticeMessage');
const orderNoticeClose = document.getElementById('orderNoticeClose');

['flower', 'preroll', 'vape', 'edible'].forEach((category, index) => {
  const card = document.querySelectorAll('.shop-links a')[index];
  if (!card) return;
  card.href = '#catalogue';
  card.dataset.filter = category;
  card.removeAttribute('data-order-link');
});

function showOrderNotice() {
  orderNoticeMessage.textContent = orderingStatus;
  orderNotice.hidden = false;
  orderNoticeClose.focus();
}

document.querySelectorAll('[data-order-link]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showOrderNotice();
  });
});

document.querySelectorAll('[data-filter]').forEach(link => {
  link.addEventListener('click', () => {
    const filter = link.dataset.filter;
    document.querySelectorAll('.catalogue-card').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('is-active', item === link));
  });
});

orderNoticeClose?.addEventListener('click', () => { orderNotice.hidden = true; });
orderNotice?.addEventListener('click', event => {
  if (event.target === orderNotice) orderNotice.hidden = true;
});
