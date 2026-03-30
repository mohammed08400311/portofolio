// Dark mode, mobile menu, back-to-top, form validation

// ---------- DARK MODE (persistent) ----------
const darkModeToggle = document.getElementById('darkModeToggle');
const mobileDarkToggle = document.getElementById('mobileDarkToggle');

function setDarkMode(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
  // toggle icons: done via Tailwind's dark: class, but we manually sync
  if (document.documentElement.classList.contains('dark')) {
    document.querySelectorAll('#darkModeToggle i, #mobileDarkToggle i').forEach(icon => {
      icon.classList.add('dark:inline');
      icon.classList.remove('dark:hidden');
    });
  } else {
    document.querySelectorAll('#darkModeToggle i, #mobileDarkToggle i').forEach(icon => {
      icon.classList.remove('dark:inline');
      icon.classList.add('dark:hidden');
    });
  }
}

// initial load
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

function toggleDark() {
  if (document.documentElement.classList.contains('dark')) {
    setDarkMode(false);
  } else {
    setDarkMode(true);
  }
}

if (darkModeToggle) darkModeToggle.addEventListener('click', toggleDark);
if (mobileDarkToggle) mobileDarkToggle.addEventListener('click', toggleDark);

// ---------- MOBILE MENU TOGGLE ----------
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // optional: change icon
    const icon = menuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    } else {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    }
  });
}

// ---------- BACK TO TOP BUTTON ----------
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---------- CONTACT FORM VALIDATION (only on contact page) ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const nameErr = document.getElementById('nameError');
    const emailErr = document.getElementById('emailError');
    const msgErr = document.getElementById('msgError');
    const successMsg = document.getElementById('formSuccess');
    
    // reset
    nameErr.classList.add('hidden');
    emailErr.classList.add('hidden');
    msgErr.classList.add('hidden');
    if (successMsg) successMsg.classList.add('hidden');
    
    if (name === '') {
      nameErr.classList.remove('hidden');
      isValid = false;
    }
    const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (email === '' || !emailPattern.test(email)) {
      emailErr.classList.remove('hidden');
      isValid = false;
    }
    if (message === '') {
      msgErr.classList.remove('hidden');
      isValid = false;
    }
    
    if (isValid) {
      if (successMsg) successMsg.classList.remove('hidden');
      contactForm.reset();
      setTimeout(() => successMsg.classList.add('hidden'), 3000);
    }
  });
}

// highlight active page in navbar
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('text-indigo-600', 'dark:text-indigo-400', 'font-bold');
  }
});