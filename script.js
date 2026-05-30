const revealItems = document.querySelectorAll(".product, .section-title, .lookbook-heading, .look, .about-image, .about-copy, .instagram-grid");

revealItems.forEach(item => item.setAttribute("data-reveal", ""));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach(item => observer.observe(item));
