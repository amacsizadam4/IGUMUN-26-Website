document.addEventListener("DOMContentLoaded", function () {

    const backToTopButton = document.getElementById("backToTop");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});


// ================= TYPEWRITER EFFECT =================

document.addEventListener("DOMContentLoaded", function () {

    const text = "Debating Today,\nLeading Tomorrow.";
    const element = document.getElementById("typewriter");

    let index = 0;
    element.classList.add("type-cursor");

    function type() {
        if (index < text.length) {

            if (text[index] === "\n") {
                element.innerHTML += "<br>";
            } else {
                element.innerHTML += text[index];
            }

            index++;
            setTimeout(type, 60);
        }
    }

    type();

});


// ================= COUNTDOWN =================

document.addEventListener("DOMContentLoaded", function () {

    const conferenceDate = new Date("2026-07-06T12:00:00").getTime();

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateCountdown() {

        const now = new Date().getTime();
        const distance = conferenceDate - now;

        if (distance < 0) {
            clearInterval(interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / 1000 / 60) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        daysEl.textContent = days.toString().padStart(2, "0");
        hoursEl.textContent = hours.toString().padStart(2, "0");
        minutesEl.textContent = minutes.toString().padStart(2, "0");
        secondsEl.textContent = seconds.toString().padStart(2, "0");
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

});



// ================= INTERACTIVE CARD PAN =================

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".interactive-card");

    cards.forEach(card => {

        const img = card.querySelector("img");
        const overlay = card.querySelector(".card-overlay");

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;

            img.style.transform = `translate(${-moveX}px, ${-moveY}px) scale(1.1)`;
            overlay.style.transform = `translate(${-moveX / 2}px, ${-moveY / 2}px)`;
        });

        card.addEventListener("mouseleave", () => {
            img.style.transform = "translate(0, 0) scale(1)";
            overlay.style.transform = "translate(0, 0)";
        });

        // Mobile tap activation
        card.addEventListener("click", () => {
            card.classList.toggle("active");
        });

    });

});



// ================= HEADER AND FOOTER =================

document.addEventListener("DOMContentLoaded", function () {

    function loadComponent(url, elementId) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load " + url);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
            })
            .catch(error => console.error(error));
    }

    loadComponent("/components/header.html", "header");
    loadComponent("/components/footer.html", "footer");

});