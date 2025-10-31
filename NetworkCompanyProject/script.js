document.addEventListener('DOMContentLoaded', () => {
  const logregBox = document.querySelector('.logreg-box');
  const loginLink = document.querySelector('.login-link');
  const registerLink = document.querySelector('.register-link');
  const loginForm = document.querySelector('.form-box.login form');

  if (!logregBox) {
    console.warn('Login/Register box not found on this page');
    return;
  }

  if (registerLink) {
    registerLink.addEventListener('click', () => {
      logregBox.classList.add('active');
    });
  }

  if (loginLink) {
    loginLink.addEventListener('click', () => {
      logregBox.classList.remove('active');
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      window.location.href = 'services.html';
    });
  }
});
