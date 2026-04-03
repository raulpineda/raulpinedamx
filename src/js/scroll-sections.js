(() => {
  const container = document.getElementById("scroll-sections");
  const heroPanel = document.getElementById("hero-panel");
  const sectionsPanel = document.getElementById("sections-panel");
  const sectionDivider = document.getElementById("section-divider");
  const navSection = document.getElementById("nav-section");
  if (!container || !heroPanel || !sectionsPanel) return;

  const panels = Array.from(container.querySelectorAll(".scroll-panel"));

  const HERO_START = 80; // hero starts at 80% of available height
  const HERO_END = 40;   // hero shrinks to 40%

  const sectionNames = {
    about: "about/me/",
    experience: "about/experience/",
    contact: "contact/",
  };

  const SHRINK_PHASE = 0.2;
  let activeIndex = -1;

  function update() {
    if (navLock) return;
    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const scrollRange = containerHeight - window.innerHeight;

    // Overall progress through the scroll container (0 to 1)
    const rawProgress = -rect.top / scrollRange;
    const progress = Math.max(0, Math.min(1, rawProgress));

    if (progress <= SHRINK_PHASE) {
      // Shrinking hero
      const shrinkProgress = progress / SHRINK_PHASE;
      const heroHeight = HERO_START - (HERO_START - HERO_END) * shrinkProgress;
      const sectionsHeight = 99 - heroHeight; // leave 1% for divider

      heroPanel.style.height = heroHeight + "%";
      sectionsPanel.style.height = sectionsHeight + "%";

      // About is always visible during shrink phase
      if (activeIndex !== 0) {
        activeIndex = 0;
        panels.forEach((p, i) => {
          p.style.opacity = i === 0 ? "1" : "0";
          p.style.pointerEvents = i === 0 ? "auto" : "none";
        });
      }

      // Update nav — show about/me/ once scrolling starts, clear at top
      if (navSection) {
        if (shrinkProgress > 0.05) {
          navSection.textContent = sectionNames[panels[0].dataset.section] || "";
        } else {
          navSection.textContent = "";
        }
      }
    } else {
      // Hero fully shrunk — cycle sections
      heroPanel.style.height = HERO_END + "%";
      sectionsPanel.style.height = (99 - HERO_END) + "%";
      sectionsPanel.style.opacity = "1";
      if (sectionDivider) sectionDivider.style.opacity = "1";

      const sectionProgress = (progress - SHRINK_PHASE) / (1 - SHRINK_PHASE);
      const newIndex = Math.min(
        Math.floor(sectionProgress * panels.length),
        panels.length - 1,
      );

      if (newIndex !== activeIndex) {
        activeIndex = newIndex;
        panels.forEach((panel, i) => {
          panel.style.opacity = i === activeIndex ? "1" : "0";
          panel.style.pointerEvents = i === activeIndex ? "auto" : "none";
        });
        if (navSection) {
          const sectionId = panels[activeIndex].dataset.section;
          navSection.textContent = sectionNames[sectionId] || "";
        }
      }
    }
  }

  // Nav link clicks — crossfade directly, then sync scroll position
  const sectionIndices = { about: 0, experience: 1, contact: 2 };
  let navLock = false; // prevent scroll handler from fighting the crossfade

  document.querySelectorAll("a[href^='/#']").forEach((link) => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href").replace("/#", "");
      const index = sectionIndices[hash];
      if (index === undefined) return;

      e.preventDefault();

      // Immediately crossfade to target panel
      navLock = true;
      activeIndex = index;
      panels.forEach((panel, i) => {
        panel.style.opacity = i === index ? "1" : "0";
        panel.style.pointerEvents = i === index ? "auto" : "none";
      });

      // Update nav path
      if (navSection) {
        const sectionId = panels[index].dataset.section;
        navSection.textContent = sectionNames[sectionId] || "";
      }

      // Ensure hero is shrunk
      heroPanel.style.height = HERO_END + "%";
      sectionsPanel.style.height = (99 - HERO_END) + "%";

      // Silently set scroll position to match
      const scrollRange = container.offsetHeight - window.innerHeight;
      const sectionProgress = (index + 0.5) / panels.length;
      const totalProgress = SHRINK_PHASE + sectionProgress * (1 - SHRINK_PHASE);
      const targetScroll = container.offsetTop + totalProgress * scrollRange;
      window.scrollTo({ top: targetScroll, behavior: "instant" });

      // Release lock after a tick so scroll handler stays in sync
      requestAnimationFrame(() => { navLock = false; });
    });
  });

  window.addEventListener("scroll", update, { passive: true });
  update();
})();
