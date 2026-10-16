(() => {
  const year = new Date().getFullYear();

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = year;
  });

  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    if (link.hostname !== window.location.hostname) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
})();
