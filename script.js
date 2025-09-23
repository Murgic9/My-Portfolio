// --- Typewriter Effect ---
const text = [
    "Murgic",
    "a Web Developer",
    "a Creative Artist"
];
let i = 0, j = 0, currentText = [], isDeleting = false;
const typedText = document.querySelector(".typed-text");

function type() {
    typedText.textContent = currentText.join("");

    if (!isDeleting && j < text[i].length) {
        currentText.push(text[i][j]);
        j++;
    } else if (isDeleting && j > 0) {
        currentText.pop();
        j--;
    }

    if (!isDeleting && j === text[i].length) {
        isDeleting = true;
        setTimeout(type, 1500);
        return;
    }

    if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % text.length;
    }

    setTimeout(type, isDeleting ? 50 : 100);
}
type();

// --- Scroll Transformations ---
const hero = document.getElementById("hero");
const heroContent = document.querySelector(".hero-content");
const heroBg = document.querySelector(".hero-bg");
const header = document.getElementById("header");
const sections = document.querySelectorAll(".section");

function handleScroll() {
    const scrollPosition = window.scrollY;

    // 1. Hero Content & Parallax Effect
    const heroHeight = hero.offsetHeight;
    let scaleValue = 1 - (scrollPosition / heroHeight);
    let opacityValue = 1 - (scrollPosition / (heroHeight / 1.5));
    let parallaxValue = scrollPosition * 0.5;

    if (scaleValue < 0) scaleValue = 0;
    if (opacityValue < 0) opacityValue = 0;

    heroContent.style.transform = `scale(${scaleValue})`;
    heroContent.style.opacity = opacityValue;
    heroBg.style.transform = `translateY(${parallaxValue}px)`;

    // 2. Header Transformation
    if (scrollPosition > 100) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // 3. Section Fade-in
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 150) {
            sec.classList.add("visible");
        } else {
            sec.classList.remove("visible");
        }
    });
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("DOMContentLoaded", () => {
    handleScroll();
});

// --- Simple Scroll to Top for Better UX ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});