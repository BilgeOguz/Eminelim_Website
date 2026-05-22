let T = {}; // Start with an empty object
let lang = 'tr';

// 1. Fetch the decoupled data asynchronously
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    T = data; // Populate your dictionary
    setLang(lang); // Run the translator only AFTER the data has arrived
  })
  .catch(error => console.error('Error loading language data:', error));

// 2. Your original function, slightly upgraded for accessibility
function setLang(l) {
  if (!T[l]) return; // Failsafe if data isn't loaded yet
  
  lang = l;
  document.documentElement.lang = l; // Updates HTML attribute for SEO/a11y

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.textContent === l.toUpperCase());
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (T[l][key] !== undefined) {
      el.innerHTML = T[l][key];
    }
  });
}
