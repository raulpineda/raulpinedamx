(() => {
  const BREAKPOINT = 768;
  const HERO_START = 80;
  const HERO_END = 33;
  const SHRINK_PHASE = 0.2;

  const sectionNames = {
    about: "about/me/",
    experience: "about/experience/",
    contact: "contact/",
  };

  // ── Hero collapse ────────────────────────────────────────────────
  // Manages the hero panel's transition from full-size to compact
  // banner as the user scrolls through the shrink phase.

  function createHeroCollapse(heroPanel) {
    const heading = document.getElementById("hero-heading");
    const content = heroPanel.querySelector(".max-w-3xl");
    const subtitle = document.getElementById("hero-subtitle");
    const links = document.getElementById("hero-links");

    const FONT_START = 3.75; // rem — text-6xl
    const FONT_END = 1.875;  // rem — text-3xl

    return {
      // Apply collapse at progress t (0 = expanded, 1 = collapsed)
      apply(t) {
        if (heading) {
          heading.style.fontSize = (FONT_START - (FONT_START - FONT_END) * t) + "rem";
        }
        if (content) {
          content.style.maxWidth = t > 0 ? "none" : "";
        }
        if (subtitle) {
          subtitle.style.opacity = Math.max(0.6, 1 - t * 0.4);
          subtitle.style.fontSize = (1 - 0.125 * t) + "rem";
          subtitle.style.marginTop = (2.5 - 1.5 * t) + "rem";
        }
        if (links) {
          links.style.opacity = String(1 - t);
          links.style.marginTop = (2.5 * (1 - t)) + "rem";
          links.style.height = t >= 1 ? "0" : "";
          links.style.overflow = t > 0 ? "hidden" : "";
        }
      },

      reset() {
        if (heading) heading.style.fontSize = "";
        if (content) content.style.maxWidth = "";
        if (subtitle) {
          subtitle.style.opacity = "";
          subtitle.style.fontSize = "";
          subtitle.style.marginTop = "";
        }
        if (links) {
          links.style.opacity = "";
          links.style.marginTop = "";
          links.style.height = "";
          links.style.overflow = "";
        }
      },
    };
  }

  // ── Section panels ───────────────────────────────────────────────
  // Manages which content section is visible and keeps it vertically
  // centered within the available space.

  function createSectionPanels(sectionsPanel) {
    const panels = Array.from(sectionsPanel.querySelectorAll(".scroll-panel"));
    let activeIndex = -1;

    function show(index) {
      if (index === activeIndex) return;
      activeIndex = index;
      panels.forEach((panel, i) => {
        panel.style.opacity = i === index ? "1" : "0";
        panel.style.pointerEvents = i === index ? "auto" : "none";
      });
    }

    function centerContent() {
      panels.forEach((panel) => {
        const content = panel.querySelector(".section-content");
        if (!content) return;
        const panelH = panel.clientHeight;
        const contentH = content.scrollHeight;
        content.style.paddingTop = contentH < panelH
          ? ((panelH - contentH) / 2) + "px"
          : "";
      });
    }

    function reset() {
      activeIndex = -1;
      panels.forEach((p) => {
        p.style.opacity = "";
        p.style.pointerEvents = "";
        const c = p.querySelector(".section-content");
        if (c) c.style.paddingTop = "";
      });
    }

    function activeSectionId() {
      if (activeIndex < 0 || activeIndex >= panels.length) return null;
      return panels[activeIndex].dataset.section;
    }

    return {
      panels,
      show,
      centerContent,
      reset,
      activeSectionId,
      get activeIndex() { return activeIndex; },
    };
  }

  // ── Nav breadcrumb ───────────────────────────────────────────────

  function updateNav(navSection, sectionId) {
    if (navSection) {
      navSection.textContent = sectionId ? (sectionNames[sectionId] || "") : "";
    }
  }

  // ── Orchestrator ─────────────────────────────────────────────────
  // Wires scroll events, resize handling, and nav clicks to the
  // hero collapse and section panel modules above.

  const container = document.getElementById("scroll-sections");
  const heroPanel = document.getElementById("hero-panel");
  const sectionsPanel = document.getElementById("sections-panel");
  const sectionDivider = document.getElementById("section-divider");
  const navSection = document.getElementById("nav-section");
  if (!container || !heroPanel || !sectionsPanel) return;

  const hero = createHeroCollapse(heroPanel);
  const sections = createSectionPanels(sectionsPanel);
  let enabled = window.innerWidth >= BREAKPOINT;
  let navLock = false;

  function setLayout(heroHeight) {
    heroPanel.style.height = heroHeight + "%";
    sectionsPanel.style.height = (99 - heroHeight) + "%";
  }

  function onScroll() {
    if (!enabled || navLock) return;

    const rect = container.getBoundingClientRect();
    const scrollRange = container.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));

    if (progress <= SHRINK_PHASE) {
      const t = progress / SHRINK_PHASE;
      setLayout(HERO_START - (HERO_START - HERO_END) * t);
      hero.apply(t);
      sections.show(0);
      sections.centerContent();
      updateNav(navSection, t > 0.05 ? sections.activeSectionId() : null);
    } else {
      setLayout(HERO_END);
      hero.apply(1);
      if (sectionDivider) sectionDivider.style.opacity = "1";

      const sectionProgress = (progress - SHRINK_PHASE) / (1 - SHRINK_PHASE);
      const index = Math.min(
        Math.floor(sectionProgress * sections.panels.length),
        sections.panels.length - 1,
      );
      sections.show(index);
      sections.centerContent();
      updateNav(navSection, sections.activeSectionId());
    }
  }

  function resetMobile() {
    heroPanel.style.height = "";
    sectionsPanel.style.height = "";
    sections.reset();
    hero.reset();
    updateNav(navSection, null);
  }

  // Resize handling
  window.addEventListener("resize", () => {
    const wasEnabled = enabled;
    enabled = window.innerWidth >= BREAKPOINT;
    if (wasEnabled && !enabled) {
      resetMobile();
    } else if (!wasEnabled && enabled) {
      onScroll();
    } else if (enabled) {
      sections.centerContent();
    }
  });

  // Nav link clicks — crossfade directly, then sync scroll position
  const sectionIndices = { about: 0, experience: 1, contact: 2 };

  document.querySelectorAll("a[href^='/#']").forEach((link) => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href").replace("/#", "");
      const index = sectionIndices[hash];
      if (index === undefined || !enabled) return;

      e.preventDefault();
      navLock = true;

      sections.show(index);
      updateNav(navSection, sections.activeSectionId());
      setLayout(HERO_END);
      hero.apply(1);

      // Sync scroll position to match the visible section
      const scrollRange = container.offsetHeight - window.innerHeight;
      const sectionProgress = (index + 0.5) / sections.panels.length;
      const totalProgress = SHRINK_PHASE + sectionProgress * (1 - SHRINK_PHASE);
      window.scrollTo({
        top: container.offsetTop + totalProgress * scrollRange,
        behavior: "instant",
      });

      requestAnimationFrame(() => { navLock = false; });
    });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
