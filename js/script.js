document.addEventListener('DOMContentLoaded', (event) => {
  const pagInicialInfo = document.querySelector('.pag-inicial-info');
  const telefone = document.querySelector('.telefone h1');
  const servicosContainer = document.querySelector('.servicos');
  const servicos = document.querySelector('.servicos h2');
  const lista = document.querySelectorAll('.servicos li');

  // Define a imagem de fundo uma vez
  pagInicialInfo.style.backgroundImage = "url('./imagem/IMG-20240715-WA0036.jpg')";

  function animateServicos() {
    servicosContainer.style.display = 'block';
    
    anime({
      targets: servicos,
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 1000,
      easing: 'easeInOutQuad',
    });

    anime({
      targets: lista,
      opacity: [0, 1],
      translateY: [-20, 0],
      delay: anime.stagger(200),
      duration: 1000,
      easing: 'easeInOutQuad',
      complete: function() {
        setTimeout(() => {
          // Reverter a animação
          anime({
            targets: lista,
            opacity: [1, 0],
            translateY: [0, -20],
            delay: anime.stagger(200),
            duration: 1000,
            easing: 'easeInOutQuad',
            complete: function() {
              anime({
                targets: servicos,
                opacity: [1, 0],
                translateY: [0, -20],
                duration: 1000,
                easing: 'easeInOutQuad',
                complete: function() {
                  servicosContainer.style.display = 'none';
                  anime({
                    targets: telefone,
                    opacity: [0, 1],
                    translateY: [-20, 0],
                    duration: 1000,
                    easing: 'easeInOutQuad',
                    complete: function() {
                      // Depois de 2 segundos, reinicia a animação
                      setTimeout(startAnimation, 3000);
                    }
                  });
                }
              });
            }
          });
        }, 3000); // Mantém os serviços visíveis por 3 segundos
      }
    });
  }

  function startAnimation() {
    anime({
      targets: telefone,
      opacity: [1, 0],
      translateY: [0, -20],
      duration: 1000,
      easing: 'easeInOutQuad',
      complete: animateServicos
    });
  }

  // Inicializa a animação quando a página é carregada
  setTimeout(startAnimation, 2000);
});


// Resto do seu código existente do arquivo script.js

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const images = document.querySelectorAll('.grid .image-container img');
const items = document.querySelectorAll('.carrossel-item');

// Carrossel Principal
let currentIndex = 0;

function showSlide(index) {
  if (index >= items.length) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = items.length - 1;
  } else {
    currentIndex = index;
  }
  const offset = -currentIndex * 300; // Largura da imagem
  document.querySelector('.carrossel').style.transform = `translateX(${offset}px)`;
}

function changeSlideFirst(step) {
  showSlide(currentIndex + step);
}

// Inicializa o carrossel exibindo o primeiro slide
showSlide(currentIndex);

// Configura a troca automática de slides
setInterval(() => {
  changeSlideFirst(1);
}, 5000);

// Slider Adicional
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.style.display = index === currentSlide ? 'block' : 'none';
  });
}

function changeSlideSecond(n) {
  currentSlide += n;
  if (currentSlide < 0) currentSlide = slides.length - 1;
  if (currentSlide >= slides.length) currentSlide = 0;
  updateSlides();
}

// Initialize first slide
updateSlides();

// Configura a troca automática de slides
setInterval(() => {
  changeSlideSecond(1);
}, 5000);

// Carrossel de Parceiros
let partnerIndex = 0;
const partners = document.querySelectorAll('.partner');
const partnersWrapper = document.querySelector('.partners-wrapper');

function updatePartnerWrapper() {
  partnersWrapper.style.transform = `translateX(${-partnerIndex * 160}px)`;
}

function changePartner(n) {
  partnerIndex += n;
  if (partnerIndex < 0) partnerIndex = partners.length - 3;
  if (partnerIndex > partners.length - 3) partnerIndex = 0;
  updatePartnerWrapper();
}

images.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

// faz com que nav desça junto
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 0) {
      navbar.classList.add('fixed');
  } else {
      navbar.classList.remove('fixed');
  }
});

// Função para exibir a mensagem de consentimento de cookies
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Função para obter o valor de um cookie
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Função para verificar e exibir a mensagem de consentimento de cookies
function checkCookieConsent() {
  var consent = getCookie("cookieConsent");
  if (!consent) {
    document.getElementById("cookie-consent").style.display = "block";
  }
}

// Função para ocultar a mensagem de consentimento de cookies e definir o cookie
function aceitarCookies() {
  setCookie("cookieConsent", "accepted", 365);
  document.getElementById("cookie-consent").style.display = "none";
}

// Event Listener para o clique no botão "Entendi"
document.getElementById("btn-aceitar").addEventListener("click", aceitarCookies);

// Verificar o consentimento de cookies quando a página for carregada
window.onload = checkCookieConsent;

// Função para ocultar a mensagem de consentimento de cookies
function ocultarMensagemCookie() {
  var cookieConsent = document.getElementById("cookie-consent");
  cookieConsent.style.display = "none";
}

// Event Listener para o clique no botão "Entendi"
var btnAceitar = document.getElementById("btn-aceitar");
btnAceitar.addEventListener("click", ocultarMensagemCookie);
