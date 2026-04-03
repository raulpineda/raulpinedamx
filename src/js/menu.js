document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const overlay = document.getElementById("menu-overlay");
  const nav = document.getElementById("nav");
  if (!toggle || !overlay || !nav) return;

  function setOverlay(show) {
    overlay.classList.toggle("hidden", !show);
    overlay.classList.toggle("flex", show);
  }

  toggle.addEventListener("click", () => {
    setOverlay(nav.classList.toggle("menu-open"));
  });

  overlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("menu-open");
      setOverlay(false);
    });
  });
});
