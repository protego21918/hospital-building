/*
  City Hospital, Adversary City. Fictional site built for the Adversary Wars simulation.
  No network requests are made from this file. Nothing is transmitted or stored.
*/

(function () {
  "use strict";

  var navToggle = document.getElementById("nav-toggle");
  var primaryNav = document.getElementById("primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var appointmentForm = document.getElementById("appointment-form");
  var confirmPanel = document.getElementById("confirm-panel");

  if (appointmentForm && confirmPanel) {
    appointmentForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!appointmentForm.checkValidity()) {
        appointmentForm.reportValidity();
        return;
      }

      var department = document.getElementById("department").value;
      var date = document.getElementById("preferred-date").value;

      confirmPanel.textContent =
        "Request received for " + department + " on " + date +
        ". This is a demonstration form: no data was sent or saved.";
      confirmPanel.classList.add("is-visible");

      appointmentForm.reset();
    });
  }
})();
