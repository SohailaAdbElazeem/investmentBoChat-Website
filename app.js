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

 
// SendEmail
//   const form = document.getElementById('investmentForm');
//   const inputs = form.querySelectorAll('input, label');
 
// form.addEventListener('submit', function(e){
//   e.preventDefault();
//   const name = document.getElementById('name').value.trim();
//   const email = document.getElementById('email').value.trim();

//   if(!name || !email) {
//     alert('يرجى إدخال الاسم والايميل');
//     return;
//   }

//   const subject = encodeURIComponent("طلب استثمار");
//   const body = encodeURIComponent(`الاسم: ${name}\nالايميل: ${email}`);
//   window.location.href = `mailto:panda-oracle@bo-chat.space?subject=${subject}&body=${body}`;
// });

//  const form = document.getElementById("investmentForm");

// form.addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const data = new FormData(form);

//   const res = await fetch("https://formspree.io/f/xlgarlge", {
//     method: "POST",
//     body: data,
//     headers: {
//       Accept: "application/json"
//     }
//   });

//   if (res.ok) {
//     alert("تم الإرسال بنجاح ✅");
//     form.reset();
//   } else {
//     alert("حدث خطأ ❌");
//   }
// });
 
//  Rating
 document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.rate');
  sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;
    slider.addEventListener('mousedown', e => {
      isDown = true;
      slider.classList.add('active');
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
      const walk = (x - startX) * 2; 
      slider.scrollLeft = scrollLeft - walk;
    });
    slider.addEventListener('touchstart', e => {
      isDown = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchmove', e => {
      if(!isDown) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('touchend', () => {
      isDown = false;
    });
  });

});
  
 
 // Translate
let currentLang = localStorage.getItem("lang") || "en"; 

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
  
  // تحديث حركة السلايدر يدوياً
  updateSliderAnimation(lang);
}

// دالة إضافية لتحديث حركة السلايدر
function updateSliderAnimation(lang) {
  const sliderTrack = document.querySelector('.slider-track');
  if (!sliderTrack) return;
  
  // إعادة تعيين الأنيميشن
  sliderTrack.style.animation = 'none';
  
  // فرض إعادة رسم العنصر
  sliderTrack.offsetHeight;
  
  // تطبيق الأنيميشن المناسبة
  if (lang === 'ar') {
    sliderTrack.style.animation = 'scrollRTL 15s linear infinite';
  } else {
    sliderTrack.style.animation = 'scrollLTR 15s linear infinite';
  }
}

const btn = document.getElementById("translateBtn");
if (btn) {
  btn.addEventListener("click", e => {
    e.preventDefault();
    currentLang = currentLang === "ar" ? "en" : "ar";
    setLanguage(currentLang);
    updateButtonText();
  });
}

function updateButtonText() {
  if (btn) {
    btn.innerText = currentLang === "ar" ? "English" : "العربية";
  }
}

// تكرار البطاقات لجعل الحركة لا نهائية
function duplicateCards() {
  const track = document.querySelector('.slider-track');
  if (track) {
    const cards = track.innerHTML;
    track.innerHTML = cards + cards; // تكرار المحتوى مرتين
  }
}

// استدعاء الدالة عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", () => {
  duplicateCards();
  setLanguage(currentLang);
  updateButtonText();
});

// Rating
// دالة لتكرار عناصر rate للحركة المستمرة
 // دالة لتكرار عناصر rate للحركة المستمرة
function duplicateRateCards() {
  const rateWrapper = document.querySelector('.rate-wrapper');
  if (!rateWrapper) return;
  
  // التحقق من وجود عناصر مكررة بالفعل
  const existingDuplicates = rateWrapper.querySelectorAll('.duplicate');
  
  // إذا لم توجد عناصر مكررة، قم بإضافتها
  if (existingDuplicates.length === 0) {
    const originalCards = rateWrapper.querySelectorAll('.rate-card:not(.duplicate)');
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.classList.add('duplicate');
      rateWrapper.appendChild(clone);
    });
  }
}

// استدعاء الدالة عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', duplicateRateCards);