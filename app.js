const sliders = document.querySelectorAll('.slider');
sliders.forEach(slider => {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', e => {
    isDown = true;
    slider.classList.add('active'); // لتغيير cursor لو حبيتي
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', e => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // 2 = السرعة
    slider.scrollLeft = scrollLeft - walk;
  });
});

// questions

const questions = document.querySelectorAll('.question-item');

questions.forEach(item => {
  const question = item.querySelector('.question');

  question.addEventListener('click', () => {
    item.classList.toggle('active');

    const answer = item.querySelector('.answer');

    if(item.classList.contains('active')){
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.padding = "10px 20px"; 
    } else {
      answer.style.maxHeight = null;
      answer.style.padding = "0 20px";
    }
  });
});

//   show Video
document.addEventListener("DOMContentLoaded", function() {
    const link = document.getElementById("youtube-link");
    const overlay = document.getElementById("video-overlay");
    const iframe = document.getElementById("youtube-iframe");
    const closeBtn = document.querySelector(".close-btn");
    link.addEventListener("click", function(e){
        e.preventDefault();
        iframe.src = "https://www.youtube.com/embed/jEfneoMs1xI?autoplay=1";
        overlay.classList.add("show"); 
    });

    closeBtn.addEventListener("click", function(){
        overlay.classList.remove("show");
        setTimeout(() => iframe.src = "", 300)
    });

    overlay.addEventListener("click", function(e){
        if(e.target === overlay){
            overlay.classList.remove("show");
            setTimeout(() => iframe.src = "", 300);
        }
    });
});

// Translate 
let currentLang = localStorage.getItem("lang") || "ar"; 

window.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);
  updateButtonText();
});
function setLanguage(lang = "ar") {
  const elements = document.querySelectorAll("[data-ar]");
  const inputs = document.querySelectorAll("input[data-ar]");

  elements.forEach(el => {
    if(el.tagName !== "INPUT") el.innerHTML = el.getAttribute(`data-${lang}`);
  });

  inputs.forEach(input => {
    if(input.type === "submit") {
      input.value = input.getAttribute(`data-${lang}`);
    } else {
      input.placeholder = input.getAttribute(`data-${lang}`);
    }
  });

  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  localStorage.setItem("lang", lang);
}
const btn = document.getElementById("translateBtn");
btn.addEventListener("click", e => {
  e.preventDefault();
  currentLang = currentLang === "ar" ? "en" : "ar";
  setLanguage(currentLang);
  updateButtonText();
});

function updateButtonText() {
  btn.innerText = currentLang === "ar" ? "English" : "العربية";
}


// // when go to about & connect us
// // كل اللينكات اللي هتنقل للصفحات الثانية
// const langLinks = document.querySelectorAll(".lang-link");

// langLinks.forEach(link => {
//   link.addEventListener("click", e => {
//     const currentLang = localStorage.getItem("lang") || "ar";
//     // منع الانتقال الافتراضي
//     e.preventDefault();
//     // إضافة لغة في الرابط
//     const url = new URL(link.href);
//     url.searchParams.set("lang", currentLang);
//     // انتقل للرابط الجديد
//     window.location.href = url.toString();
//   });
// });
// // قراءة اللغة من الرابط أو من التخزين
// const urlParams = new URLSearchParams(window.location.search);
// const langFromURL = urlParams.get("lang");
// let currentLang = langFromURL || localStorage.getItem("lang") || "ar";

// خزنها في localStorage
// localStorage.setItem("lang", currentLang);

// استدعي كود الترجمة كما في الصفحة الرئيسية
// setLanguage(currentLang);
// updateButtonText();
// Slider
document.documentElement.dir = document.documentElement.dir || "rtl"; 
const track = document.querySelector('.slider-track');
const cards = document.querySelectorAll('.card');
let currentTranslate = 0;
let isDragging = false;
let startX = 0;
let prevTranslate = 0;

const direction = document.documentElement.dir === "rtl" ? -1 : 1;
const speed = 1;
function animate() {
  if (!isDragging) {
    currentTranslate += speed * direction;
    const totalWidth = (cards[0].offsetWidth + 15) * (cards.length / 2);
    
    if (currentTranslate <= -totalWidth) currentTranslate = 0;
    if (currentTranslate >= 0) currentTranslate = -totalWidth;

    track.style.transform = `translateX(${currentTranslate}px)`;
  }
  requestAnimationFrame(animate);
}
animate();
// stop Hover
cards.forEach(card => {
  card.addEventListener("mouseenter", () => isDragging = true);
  card.addEventListener("mouseleave", () => isDragging = false);
});

// Drag
track.addEventListener("mousedown", e => {
  isDragging = true;
  startX = e.pageX;
  prevTranslate = currentTranslate;
});
track.addEventListener("mousemove", e => {
  if (!isDragging) return;
  currentTranslate = prevTranslate + (e.pageX - startX);
  track.style.transform = `translateX(${currentTranslate}px)`;
});
track.addEventListener("mouseup", () => isDragging = false);
track.addEventListener("mouseleave", () => isDragging = false);

// Touch
track.addEventListener("touchstart", e => {
  isDragging = true;
  startX = e.touches[0].clientX;
  prevTranslate = currentTranslate;
});
track.addEventListener("touchmove", e => {
  if (!isDragging) return;
  currentTranslate = prevTranslate + (e.touches[0].clientX - startX);
  track.style.transform = `translateX(${currentTranslate}px)`;
});
track.addEventListener("touchend", () => isDragging = false);


// SendEmail
  const form = document.getElementById('investmentForm');
  const inputs = form.querySelectorAll('input, label');
 
form.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if(!name || !email) {
    alert('يرجى إدخال الاسم والايميل');
    return;
  }

  const subject = encodeURIComponent("طلب استثمار");
  const body = encodeURIComponent(`الاسم: ${name}\nالايميل: ${email}`);
  window.location.href = `mailto:panda-oracle@bo-chat.space?subject=${subject}&body=${body}`;
});
 