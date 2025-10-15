    (function(){
      /* --------- Countdown to Oct 15, 2025 00:00:00 (local) --------- */
      const target = new Date('2025-10-15T17:00:00'); // ISO format - local timezone assumed
      const daysEl = document.getElementById('days');
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');

      function pad(n){ return String(n).padStart(2,'0'); }

      function updateCountdown(){
        const now = new Date();
        let diff = Math.max(0, target - now);

        const s = Math.floor(diff / 1000) % 60;
        const m = Math.floor(diff / (1000*60)) % 60;
        const h = Math.floor(diff / (1000*60*60)) % 24;
        const d = Math.floor(diff / (1000*60*60*24));

        daysEl.textContent = pad(d);
        hoursEl.textContent = pad(h);
        minutesEl.textContent = pad(m);
        secondsEl.textContent = pad(s);

        if (diff <= 0) {
          // When countdown finishes, you can change the UI here
          const cd = document.getElementById('countdown');
          cd.innerHTML = '<strong style="color:var(--accent)">Premint live!</strong>';
          clearInterval(timerInterval);
        }
      }
      updateCountdown();
      const timerInterval = setInterval(updateCountdown, 1000);

      /* --------- Simple slideshow (auto + click dots) --------- */
      const slides = Array.from(document.querySelectorAll('.slide'));
      const dots = Array.from(document.querySelectorAll('.dot'));
      let current = 0;
      let slideInterval = null;
      const SLIDE_DELAY = 4500;

      function showSlide(index){
        slides.forEach((s,i)=> s.classList.toggle('active', i===index));
        dots.forEach((d,i)=> d.classList.toggle('active', i===index));
        current = index;
      }

      function nextSlide(){
        showSlide((current + 1) % slides.length);
      }

      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const idx = parseInt(dot.dataset.index, 10);
          showSlide(idx);
          resetAuto();
        });
      });

      function startAuto(){
        slideInterval = setInterval(nextSlide, SLIDE_DELAY);
      }
      function stopAuto(){
        clearInterval(slideInterval);
      }
      function resetAuto(){
        stopAuto();
        startAuto();
      }

      // start
      if (slides.length > 0) startAuto();

      /* Optional: basic accessibility keyboard control */
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { nextSlide(); resetAuto(); }
        if (e.key === 'ArrowLeft') { showSlide((current - 1 + slides.length) % slides.length); resetAuto(); }
      });

    
    })();

