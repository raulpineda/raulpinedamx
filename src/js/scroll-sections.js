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

  const sectionIndices = Object.fromEntries(
    Object.keys(sectionNames).map((key, i) => [key, i]),
  );

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
    let lastT = -1;

    return {
      apply(t) {
        // Quantize to avoid unnecessary style writes on every scroll tick
        const q = Math.round(t * 500) / 500;
        if (q === lastT) return;
        lastT = q;

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
        lastT = -1;
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
    let centerDirty = true;

    function show(index) {
      if (index === activeIndex) return;
      activeIndex = index;
      centerDirty = true;
      panels.forEach((panel, i) => {
        const active = i === index;
        panel.style.opacity = active ? "1" : "0";
        panel.style.pointerEvents = active ? "auto" : "none";
        panel.setAttribute("aria-hidden", !active);
      });
    }

    function centerContent() {
      if (!centerDirty) return;
      centerDirty = false;
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

    function invalidateCenter() {
      centerDirty = true;
    }

    function reset() {
      activeIndex = -1;
      centerDirty = true;
      panels.forEach((p) => {
        p.style.opacity = "";
        p.style.pointerEvents = "";
        p.removeAttribute("aria-hidden");
        const c = p.querySelector(".section-content");
        if (c) c.style.paddingTop = "";
      });
    }

    function activeSectionId() {
      if (activeIndex < 0 || activeIndex >= panels.length) return null;
      return panels[activeIndex].dataset.section;
    }

    return {
      count: panels.length,
      show,
      centerContent,
      invalidateCenter,
      reset,
      activeSectionId,
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
  let lastHeroHeight = -1;
  let dividerShown = false;

  function setLayout(heroHeight) {
    if (heroHeight === lastHeroHeight) return;
    lastHeroHeight = heroHeight;
    heroPanel.style.height = heroHeight + "%";
    sectionsPanel.style.height = (99 - heroHeight) + "%";
    sections.invalidateCenter();
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
      if (!dividerShown && sectionDivider) {
        sectionDivider.style.opacity = "1";
        dividerShown = true;
      }

      const sectionProgress = (progress - SHRINK_PHASE) / (1 - SHRINK_PHASE);
      const index = Math.min(
        Math.floor(sectionProgress * sections.count),
        sections.count - 1,
      );
      sections.show(index);
      sections.centerContent();
      updateNav(navSection, sections.activeSectionId());
    }
  }

  function resetMobile() {
    heroPanel.style.height = "";
    sectionsPanel.style.height = "";
    lastHeroHeight = -1;
    dividerShown = false;
    sections.reset();
    hero.reset();
    updateNav(navSection, null);
  }

  window.addEventListener("resize", () => {
    const wasEnabled = enabled;
    enabled = window.innerWidth >= BREAKPOINT;
    if (wasEnabled && !enabled) {
      resetMobile();
    } else if (!wasEnabled && enabled) {
      onScroll();
    } else if (enabled) {
      sections.invalidateCenter();
      sections.centerContent();
    }
  });

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
      sections.centerContent();

      const scrollRange = container.offsetHeight - window.innerHeight;
      const sectionProgress = (index + 0.5) / sections.count;
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
