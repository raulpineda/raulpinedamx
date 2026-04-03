(() => {
  const canvas = document.getElementById("grid");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const SPACING = 28;
  const DOT_RADIUS = 0.8;
  const CURSOR_RADIUS = 120;
  const CURSOR_STRENGTH = 6;
  const ELEM_RADIUS = 80;
  const ELEM_STRENGTH = 6;

  let mouseX = -1000;
  let mouseY = -1000;
  let targetMouseX = -1000;
  let targetMouseY = -1000;

  // Warp state
  let warpIntensity = 0;
  let warpTarget = 0;
  let warpStartTime = 0;
  const WARP_DURATION = 3500;
  const WARP_RAMP_UP = 800;
  const WARP_RAMP_DOWN = 1200;

  // Cached element fields — recomputed on scroll/resize, not every frame
  let cachedFields = [];
  let fieldsDirty = true;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fieldsDirty = true;
  }

  function computeElementFields() {
    cachedFields = [];
    const selectors = "h1, h2, h3, section > div > p:first-of-type";
    document.querySelectorAll(selectors).forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      cachedFields.push({
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
        rx: rect.width / 2 + 40,
        ry: rect.height / 2 + 30,
      });
    });
    fieldsDirty = false;
  }

  window.addEventListener("scroll", () => { fieldsDirty = true; }, { passive: true });

  function gravitationalDisplacement(dotX, dotY) {
    let dx = 0;
    let dy = 0;

    const cmx = dotX - mouseX;
    const cmy = dotY - mouseY;
    const cDist = Math.sqrt(cmx * cmx + cmy * cmy);
    if (cDist < CURSOR_RADIUS && cDist > 1) {
      const force = (1 - cDist / CURSOR_RADIUS) * CURSOR_STRENGTH;
      dx += (cmx / cDist) * force;
      dy += (cmy / cDist) * force;
    }

    for (const f of cachedFields) {
      const ex = dotX - f.cx;
      const ey = dotY - f.cy;
      const nx = ex / (f.rx + ELEM_RADIUS);
      const ny = ey / (f.ry + ELEM_RADIUS);
      const eDist = Math.sqrt(nx * nx + ny * ny);
      if (eDist < 1 && eDist > 0.01) {
        const force = (1 - eDist) * ELEM_STRENGTH * eDist;
        dx += (ex / (f.rx + ELEM_RADIUS)) * force * 0.5;
        dy += (ey / (f.ry + ELEM_RADIUS)) * force * 0.5;
      }
    }

    return [dx, dy];
  }

  function drawDot(x, y, r, alpha) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;
    ctx.fill();
  }

  function draw() {
    mouseX += (targetMouseX - mouseX) * 0.15;
    mouseY += (targetMouseY - mouseY) * 0.15;

    if (warpTarget > 0) {
      const elapsed = performance.now() - warpStartTime;
      if (elapsed < WARP_RAMP_UP) {
        warpIntensity = elapsed / WARP_RAMP_UP;
      } else if (elapsed < WARP_DURATION - WARP_RAMP_DOWN) {
        warpIntensity = 1;
      } else if (elapsed < WARP_DURATION) {
        warpIntensity =
          1 - (elapsed - (WARP_DURATION - WARP_RAMP_DOWN)) / WARP_RAMP_DOWN;
      } else {
        warpIntensity = 0;
        warpTarget = 0;
      }
    }

    if (fieldsDirty) computeElementFields();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const offsetY = -(window.scrollY % SPACING);
    const cols = Math.ceil(canvas.width / SPACING) + 2;
    const rows = Math.ceil(canvas.height / SPACING) + 2;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const warpTime = warpTarget > 0 ? performance.now() - warpStartTime : 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const baseX = col * SPACING;
        const baseY = offsetY + row * SPACING;

        const [dx, dy] = gravitationalDisplacement(baseX, baseY);
        let x = baseX + dx;
        let y = baseY + dy;

        const displacement = Math.sqrt(dx * dx + dy * dy);
        const alpha = Math.min(0.4 + displacement * 0.04, 0.6);

        const cmx = baseX - mouseX;
        const cmy = baseY - mouseY;
        const cDist = Math.sqrt(cmx * cmx + cmy * cmy);
        const sizeBoost =
          cDist < CURSOR_RADIUS ? (1 - cDist / CURSOR_RADIUS) * 0.5 : 0;
        const r = DOT_RADIUS + sizeBoost;

        if (warpIntensity > 0.01) {
          const vx = x - cx;
          const vy = y - cy;
          const dist = Math.sqrt(vx * vx + vy * vy);
          if (dist < 1) {
            drawDot(x, y, r, alpha);
            continue;
          }

          const nx = vx / dist;
          const ny = vy / dist;
          const push = (dist / 400) * warpIntensity * warpTime * 0.15;
          x += nx * push;
          y += ny * push;

          const trailLen = (dist / 300) * warpIntensity * 80;
          const tx = x - nx * trailLen;
          const ty = y - ny * trailLen;

          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(148, 163, 184, ${alpha * 0.4})`;
          ctx.lineWidth = 0.5 + warpIntensity;
          ctx.stroke();

          drawDot(x, y, r + warpIntensity * 0.4, alpha);
        } else {
          drawDot(x, y, r, alpha);
        }
      }
    }

    requestAnimationFrame(draw);
  }

  // Konami code
  const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === KONAMI[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI.length) {
        konamiIndex = 0;
        engageWarp();
      }
    } else {
      konamiIndex = 0;
    }
  });

  const mainEl = document.querySelector("main");
  const footerEl = document.querySelector("footer");

  function setBlur(intensity) {
    const els = [mainEl, footerEl];
    els.forEach((el) => {
      if (!el) return;
      el.style.filter = intensity ? `blur(${intensity}px)` : "";
    });
  }

  function engageWarp() {
    warpTarget = 1;
    warpStartTime = performance.now();
    if (mainEl) mainEl.style.transition = `filter ${WARP_RAMP_UP}ms ease-out`;
    if (footerEl) footerEl.style.transition = `filter ${WARP_RAMP_UP}ms ease-out`;
    setBlur(2);
    setTimeout(() => {
      if (mainEl) mainEl.style.transition = `filter ${WARP_RAMP_DOWN}ms ease-in`;
      if (footerEl) footerEl.style.transition = `filter ${WARP_RAMP_DOWN}ms ease-in`;
      setBlur(0);
    }, WARP_DURATION - WARP_RAMP_DOWN);
  }

  document.addEventListener("mousemove", (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });

  document.addEventListener("mouseleave", () => {
    targetMouseX = -1000;
    targetMouseY = -1000;
  });

  window.addEventListener("resize", resize);

  resize();
  draw();
})();
