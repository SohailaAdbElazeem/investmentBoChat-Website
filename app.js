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

