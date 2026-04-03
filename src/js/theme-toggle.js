(() => {
  const buttons = document.querySelectorAll(".theme-toggle");

  function syncPressed() {
    const isDark = document.documentElement.classList.contains("dark");
    buttons.forEach((btn) => btn.setAttribute("aria-pressed", isDark));
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    syncPressed();
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (localStorage.getItem("theme")) return;
      document.documentElement.classList.toggle("dark", e.matches);
      syncPressed();
    });

  buttons.forEach((btn) => btn.addEventListener("click", toggleTheme));
  syncPressed();
})();
