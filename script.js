/* =========================================================
   PORTFOLIO JAVASCRIPT
   No Three.js
   No external JavaScript libraries
========================================================= */


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingText = document.getElementById("typingText");

const typingWords = [
    "Frontend Developer",
    "React Developer",
    "Creative Web Developer"
];

let wordIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffect() {

    if (!typingText) return;

    const currentWord = typingWords[wordIndex];

    if (!isDeleting) {

        characterIndex++;

        typingText.textContent =
            currentWord.substring(0, characterIndex);

        if (characterIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        characterIndex--;

        typingText.textContent =
            currentWord.substring(0, characterIndex);

        if (characterIndex === 0) {

            isDeleting = false;

            wordIndex =
                (wordIndex + 1) % typingWords.length;
        }
    }

    const typingSpeed = isDeleting ? 45 : 85;

    setTimeout(typeEffect, typingSpeed);
}

typeEffect();


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


function setActiveNav(sectionId) {

    navLinks.forEach((link) => {

        const isActive =
            link.dataset.section === sectionId;

        link.classList.toggle(
            "active",
            isActive
        );

    });
}


/* =========================================================
   SECTION OBSERVER
========================================================= */

const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            const visibleSections =
                entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio -
                            a.intersectionRatio
                    );

            if (visibleSections.length > 0) {

                setActiveNav(
                    visibleSections[0].target.id
                );

            }

        },
        {
            threshold: [0.2, 0.35, 0.5, 0.7],

            rootMargin:
                "-15% 0px -45% 0px"
        }
    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================================
   NAV CLICK
========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        const targetSection =
            link.dataset.section;

        setActiveNav(targetSection);

        closeMobileMenu();

    });

});


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

function openMobileMenu() {

    document.body.classList.add("menu-open");

    mobileMenuBtn?.setAttribute(
        "aria-expanded",
        "true"
    );

}

function closeMobileMenu() {

    document.body.classList.remove("menu-open");

    mobileMenuBtn?.setAttribute(
        "aria-expanded",
        "false"
    );

}

function toggleMobileMenu() {

    const isOpen =
        document.body.classList.contains("menu-open");

    if (isOpen) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }

}


mobileMenuBtn?.addEventListener(
    "click",
    toggleMobileMenu
);


/* =========================================================
   CLOSE MOBILE MENU WITH ESCAPE
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMobileMenu();

    }

});


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
    document.querySelector(".cursor-glow");

let mouseX = 0;
let mouseY = 0;

let glowX = 0;
let glowY = 0;


document.addEventListener(
    "mousemove",
    (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    }
);


function animateCursorGlow() {

    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;

    if (cursorGlow) {

        cursorGlow.style.left =
            `${glowX}px`;

        cursorGlow.style.top =
            `${glowY}px`;

    }

    requestAnimationFrame(
        animateCursorGlow
    );
}

animateCursorGlow();


/* =========================================================
   SUBTLE MOUSE PARALLAX
========================================================= */

const heroImage =
    document.querySelector(".umadevi-image");

const heroVisual =
    document.querySelector(".hero-visual");


document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !heroImage ||
            !heroVisual ||
            window.innerWidth <= 768
        ) {
            return;
        }

        const x =
            (event.clientX / window.innerWidth - 0.5);

        const y =
            (event.clientY / window.innerHeight - 0.5);

        const moveX = x * 10;
        const moveY = y * 8;

        heroVisual.style.transform =
            `translate3d(${moveX}px, ${moveY}px, 0)`;

    }
);


/* =========================================================
   RESET PARALLAX WHEN WINDOW RESIZES
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth <= 768) {

            if (heroVisual) {

                heroVisual.style.transform =
                    "none";

            }

        }

    }
);


/* =========================================================
   PROJECT CARD TILT
========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth <= 768) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================================
   SMOOTH SECTION REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, .about-grid, .timeline-card, .skill-card, .project-card, .contact-layout"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================================
   ACTIVE NAV FALLBACK
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.35;

        let currentSection = "home";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            if (
                scrollPosition >= sectionTop
            ) {

                currentSection =
                    section.id;

            }

        });

        setActiveNav(currentSection);

    },
    {
        passive: true
    }
);


/* =========================================================
   PREVENT MOBILE MENU FROM STAYING OPEN
   AFTER DESKTOP RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 768) {

            closeMobileMenu();

        }

    }
);