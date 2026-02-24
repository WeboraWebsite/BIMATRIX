// ============================================
// BIMATRIX — modelling.js
// 3D Model viewer: crossfade, sliders, auto-cycle
// ============================================

(function () {

  const BASE = [
    { name: 'Federated Model',     short: 'Federated',     img: 'images/federated_model.png'     },
    { name: 'Architectural Model', short: 'Architectural', img: 'images/architectural_model.png' },
    { name: 'Structural Model',    short: 'Structural',    img: 'images/structural_model.png'    },
  ];
  const MEP = [
    { name: 'Mechanical Model',    short: 'Mechanical', img: 'images/mechanical_model.png' },
    { name: 'Electrical Model',    short: 'Electrical', img: 'images/electrical_model.png' },
    { name: 'Plumbing & Drainage', short: 'Plumbing',   img: 'images/pd_model.png'         },
  ];

  // ── Two-slot crossfade ────────────────────────────────────────────────────
  // Each layer (base, mep) has two stacked <img> slots — A (front) and B (back).
  // To switch: load new image into back at opacity 0, then fade back↔front.
  const canvas = document.querySelector('.ms-canvas');
  canvas.innerHTML = '';

  const FADE = 750;

  function makeSlot(id, z) {
    const img = document.createElement('img');
    img.id = id;
    img.className = 'ms-canvas-slot';
    img.style.zIndex = z;
    canvas.appendChild(img);
    return img;
  }

  let baseA = makeSlot('ms-base-a', 1), baseB = makeSlot('ms-base-b', 2);
  let mepA  = makeSlot('ms-mep-a',  3), mepB  = makeSlot('ms-mep-b',  4);
  let baseFront = baseA, baseBack = baseB;
  let mepFront  = mepA,  mepBack  = mepB;

  let baseOpacity = 0.2, mepOpacity = 0.8;
  let activeBase = 0, activeMepIdx = 0;
  let baseLocked = false, mepLocked = false;

  const baseName   = document.getElementById('ms-base-name');
  const mepName    = document.getElementById('ms-mep-name');
  const badge      = document.getElementById('ms-badge-text');
  const baseBtns   = Array.from(document.querySelectorAll('.ms-base-btn'));
  const mepBtns    = Array.from(document.querySelectorAll('.ms-mep-btn'));
  const sliderBase = document.getElementById('ms-slider-base');
  const sliderMep  = document.getElementById('ms-slider-mep');
  const basePct    = document.getElementById('ms-base-pct');
  const mepPct     = document.getElementById('ms-mep-pct');

  function updateBadge() {
    badge.textContent = BASE[activeBase].short + ' + ' + MEP[activeMepIdx].short;
  }

  function crossfade(front, back, src, targetOpacity, onDone) {
    back.style.transition = 'none';
    back.style.opacity    = '0';

    function swap() {
      requestAnimationFrame(() => {
        back.style.transition  = `opacity ${FADE}ms cubic-bezier(0.4,0,0.2,1)`;
        front.style.transition = `opacity ${FADE}ms cubic-bezier(0.4,0,0.2,1)`;
        back.style.opacity     = String(targetOpacity);
        front.style.opacity    = '0';
      });
      setTimeout(() => {
        front.style.transition = 'none';
        if (onDone) onDone();
      }, FADE + 60);
    }

    if (back.src && back.src.includes(src.replace(/^.*\//, '')) && back.complete && back.naturalWidth) {
      swap();
    } else {
      back.onload  = swap;
      back.onerror = swap;
      back.src     = src;
    }
  }

  // ── Initial load ──────────────────────────────────────────────────────────
  baseA.onload = () => { baseA.style.transition = 'none'; baseA.style.opacity = String(baseOpacity); };
  baseA.src = BASE[0].img;
  mepA.onload  = () => { mepA.style.transition  = 'none'; mepA.style.opacity  = String(mepOpacity);  };
  mepA.src  = MEP[0].img;

  [...BASE, ...MEP].slice(1).forEach(d => { new Image().src = d.img; });

  // ── Sliders ───────────────────────────────────────────────────────────────
  sliderBase.addEventListener('input', () => {
    const val = +sliderBase.value;
    baseOpacity = val / 100;
    baseFront.style.transition = 'opacity 120ms ease';
    baseFront.style.opacity    = String(baseOpacity);
    basePct.textContent = Math.round(val / 10) * 10 + '%';
  });
  sliderMep.addEventListener('input', () => {
    const val = +sliderMep.value;
    mepOpacity = val / 100;
    mepFront.style.transition = 'opacity 120ms ease';
    mepFront.style.opacity    = String(mepOpacity);
    mepPct.textContent = Math.round(val / 10) * 10 + '%';
  });

  // ── Base layer switch ─────────────────────────────────────────────────────
  baseBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      if (i === activeBase || baseLocked) return;
      baseBtns[activeBase].classList.remove('active');
      activeBase = i; btn.classList.add('active');
      baseName.textContent = BASE[i].name;
      updateBadge();
      baseLocked = true;
      crossfade(baseFront, baseBack, BASE[i].img, baseOpacity, () => {
        [baseFront, baseBack] = [baseBack, baseFront];
        baseLocked = false;
      });
    });
  });

  // ── MEP switch ────────────────────────────────────────────────────────────
  function switchMep(i, onDone) {
    mepBtns[activeMepIdx].classList.remove('active');
    for (let k = 0; k < MEP.length; k++) setFill(k, 0);
    activeMepIdx = i;
    mepBtns[i].classList.add('active');
    mepName.textContent = MEP[i].name;
    updateBadge();
    mepLocked = true;
    crossfade(mepFront, mepBack, MEP[i].img, mepOpacity, () => {
      [mepFront, mepBack] = [mepBack, mepFront];
      mepLocked = false;
      if (onDone) onDone();
    });
  }

  // ── Auto-cycle ────────────────────────────────────────────────────────────
  const DWELL = 4000, PAUSE = 8000;
  let paused = false, pauseTimer = null;
  let fillStart = performance.now();
  let rafId = null, sectionVisible = true;
  let transitioning = false;

  const autoBtn   = document.getElementById('ms-auto-btn');
  const autoLabel = document.getElementById('ms-auto-label');
  const iconPlay  = autoBtn.querySelector('.ms-auto-icon-play');
  const iconPause = autoBtn.querySelector('.ms-auto-icon-pause');
  let userPaused  = false;

  function setAutoBtnState(playing) {
    iconPlay.style.display  = playing ? 'none' : '';
    iconPause.style.display = playing ? '' : 'none';
    autoLabel.textContent   = playing ? 'PAUSE' : 'AUTO';
    autoBtn.classList.toggle('ms-auto-btn--playing', playing);
  }

  autoBtn.addEventListener('click', () => {
    userPaused = !userPaused;
    paused     = userPaused;
    setAutoBtnState(!userPaused);
    if (!userPaused) fillStart = performance.now();
  });

  setAutoBtnState(true);

  function setFill(idx, pct) {
    const f = document.getElementById('ms-fill-' + idx);
    if (f) f.style.width = pct + '%';
  }

  function tick(ts) {
    if (!paused && sectionVisible && !transitioning) {
      const pct = Math.min(((ts - fillStart) / DWELL) * 100, 100);
      setFill(activeMepIdx, pct);
      if (pct >= 100) {
        transitioning = true;
        switchMep((activeMepIdx + 1) % MEP.length, () => {
          fillStart     = performance.now();
          transitioning = false;
        });
      }
    }
    rafId = requestAnimationFrame(tick);
  }

  mepBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      if (i === activeMepIdx || mepLocked) return;
      clearTimeout(pauseTimer);
      if (!userPaused) {
        paused = true;
        setAutoBtnState(false);
        pauseTimer = setTimeout(() => {
          paused = false;
          setAutoBtnState(true);
          fillStart = performance.now();
        }, PAUSE);
      }
      switchMep(i, () => { fillStart = performance.now(); });
    });
  });

  updateBadge();
  rafId = requestAnimationFrame(tick);

  const section = document.getElementById('modelling');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach(e => {
        sectionVisible = e.isIntersecting;
        if (!e.isIntersecting) {
          if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        } else if (!rafId) {
          fillStart = performance.now();
          rafId = requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.05 }).observe(section);
  }

})();
