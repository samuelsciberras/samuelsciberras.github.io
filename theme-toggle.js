(function () {
  const body = document.body;
  const toggleBtn = document.querySelector(".theme-toggle");
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector(".theme-toggle__icon");
  const label = toggleBtn.querySelector(".theme-toggle__label");
  const THEME_KEY = "preferred-theme";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const storedTheme = localStorage.getItem(THEME_KEY);

  const initialTheme = storedTheme || (prefersDark.matches ? "dark" : "light");
  setTheme(initialTheme);

  toggleBtn.addEventListener("click", () => {
    const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });

  const handlePrefChange = (event) => {
    if (localStorage.getItem(THEME_KEY)) return;
    setTheme(event.matches ? "dark" : "light");
  };

  if (prefersDark.addEventListener) {
    prefersDark.addEventListener("change", handlePrefChange);
  } else if (prefersDark.addListener) {
    // Fallback for older browsers.
    prefersDark.addListener(handlePrefChange);
  }

  function setTheme(theme) {
    if (theme === "dark") {
      body.dataset.theme = "dark";
      toggleBtn.setAttribute("aria-pressed", "true");
      icon.textContent = "🌞";
      label.textContent = "Light theme";
    } else {
      delete body.dataset.theme;
      toggleBtn.setAttribute("aria-pressed", "false");
      icon.textContent = "🌙";
      label.textContent = "Dark theme";
    }
  }
})();
