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