(() => {
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll("[data-category]")];
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = lightbox?.querySelector("[data-lightbox-image]");
  const lightboxCaption = lightbox?.querySelector("[data-lightbox-caption]");
  const closeButton = lightbox?.querySelector("[data-lightbox-close]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;

      filterButtons.forEach((item) => {
        const isSelected = item === button;
        item.classList.toggle("is-active", isSelected);
        item.setAttribute("aria-pressed", String(isSelected));
      });

      cards.forEach((card) => {
        const categories = card.dataset.category.split(" ");
        const visible = selected === "all" || categories.includes(selected);
        card.classList.toggle("is-hidden", !visible);
      });
    });
  });

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    if (lightboxImage) {
      lightboxImage.removeAttribute("src");
      lightboxImage.removeAttribute("alt");
    }
  };

  const openLightbox = (trigger) => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = trigger.dataset.lightboxSrc;
    lightboxImage.alt = trigger.dataset.lightboxAlt || "Artwork preview";
    if (lightboxCaption) {
      lightboxCaption.textContent = trigger.dataset.lightboxTitle || "Artwork";
    }
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton?.focus();
  };

  document.querySelectorAll("[data-lightbox-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger));
  });

  closeButton?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
})();
