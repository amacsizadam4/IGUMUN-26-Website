"use strict";

/* =====================================================
   CONFIGURATION CONSTANTS
===================================================== */

const CONFIG = {
    scrollThreshold: 300,
    typeSpeed: 60,
    panSensitivity: 20,
    countdownDate: "2026-05-06T12:00:00+03:00" // Explicit timezone
};


/* =====================================================
   INITIALIZATION ENTRY POINT
===================================================== */

document.addEventListener("DOMContentLoaded", init);

function init() {
    initBackToTop();
    initTypewriter();
    initCountdown();
    initInteractiveCards();
    loadLayoutComponents();
}


/* =====================================================
   BACK TO TOP
===================================================== */

function initBackToTop() {
    const button = document.getElementById("backToTop");
    if (!button) return;

    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                button.classList.toggle(
                    "show",
                    window.scrollY > CONFIG.scrollThreshold
                );
                ticking = false;
            });
            ticking = true;
        }
    });

    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =====================================================
   TYPEWRITER EFFECT
===================================================== */

function initTypewriter() {
    const element = document.getElementById("typewriter");
    if (!element) return;

    const text = element.dataset.text || "Debating Today,\nLeading Tomorrow.";
    element.classList.add("type-cursor");

    let index = 0;

    function type() {
        if (index >= text.length) return;

        if (text[index] === "\n") {
            element.append(document.createElement("br"));
        } else {
            element.append(document.createTextNode(text[index]));
        }

        index++;
        setTimeout(type, CONFIG.typeSpeed);
    }

    type();
}


/* =====================================================
   COUNTDOWN
===================================================== */

function initCountdown() {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const targetTime = new Date(CONFIG.countdownDate).getTime();

    function updateCountdown() {
        const now = Date.now();
        const distance = targetTime - now;

        if (distance <= 0) {
            clearInterval(interval);
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}


/* =====================================================
   INTERACTIVE CARD PAN
===================================================== */

function initInteractiveCards() {
    const cards = document.querySelectorAll(".interactive-card");
    if (!cards.length) return;

    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    cards.forEach(card => {
        const img = card.querySelector("img");
        const overlay = card.querySelector(".card-overlay");

        if (!img || !overlay) return;

        let frameRequested = false;
        let lastEvent = null;

        function updateTransform() {
            const rect = card.getBoundingClientRect();
            const x = lastEvent.clientX - rect.left;
            const y = lastEvent.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = (x - centerX) / CONFIG.panSensitivity;
            const moveY = (y - centerY) / CONFIG.panSensitivity;

            img.style.transform = `translate(${-moveX}px, ${-moveY}px) scale(1.1)`;
            overlay.style.transform = `translate(${-moveX / 2}px, ${-moveY / 2}px)`;

            frameRequested = false;
        }

        card.addEventListener("mousemove", (e) => {
            lastEvent = e;
            if (!frameRequested) {
                requestAnimationFrame(updateTransform);
                frameRequested = true;
            }
        });

        card.addEventListener("mouseleave", () => {
            img.style.transform = "translate(0,0) scale(1)";
            overlay.style.transform = "translate(0,0)";
        });

        if (isTouchDevice) {
            card.addEventListener("click", () => {
                card.classList.toggle("active");
            });
        }
    });
}


/* =====================================================
   HEADER / FOOTER COMPONENT LOADER
===================================================== */

function loadLayoutComponents() {

    loadComponent("/components/header.html", "header");
    loadComponent("/components/footer.html", "footer");

}

function loadComponent(url, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${url}`);
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
        })
        .catch(error => {
            console.error(error);
        });
}