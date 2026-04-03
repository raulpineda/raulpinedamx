(() => {
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  // Listen for system preference changes when no explicit choice is stored
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (localStorage.getItem("theme")) return;
      document.documentElement.classList.toggle("dark", e.matches);
    });

  document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);
  document.getElementById("theme-toggle-mobile")?.addEventListener("click", toggleTheme);
})();
