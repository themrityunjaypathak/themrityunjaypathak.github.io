// Infinite Horizontal Scroll Animation
window.addEventListener("load", () => {
    const wrapper = document.querySelector(".scroll-wrapper");
    const inner = document.getElementById("scrollInner");
    const track = document.getElementById("track");

    const gap = 15;
    const pxPerSec = 50;

    function buildMarquee() {
        while (inner.children.length > 1) {
            inner.removeChild(inner.lastChild);
        }

        const loopWidth = track.getBoundingClientRect().width + gap;

        while (inner.getBoundingClientRect().width < wrapper.offsetWidth + loopWidth) {
            const clone = track.cloneNode(true);
            clone.removeAttribute("id");
            inner.appendChild(clone);
        }

        inner.style.setProperty("--loop-width", loopWidth + "px");
        inner.style.setProperty("--duration", loopWidth / pxPerSec + "s");
    }

    buildMarquee();

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildMarquee, 200);
    });
});


// Navbar Live Time
function updateTime() {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    document.getElementById('time').textContent = time;
}

updateTime();

setInterval(updateTime, 1000);


// Footer Heart Animation
const heart = document.querySelector(".heart");

if (heart) {
    const heartInner = heart.querySelector(".heart-inner");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    heart.addEventListener("click", () => {
        if (heartInner) {
            heartInner.classList.remove("beat");
            void heartInner.offsetWidth;
            heartInner.classList.add("beat");
        }

        if (reduceMotion) return;

        const rect = heart.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 + window.scrollX;
        const cy = rect.top + rect.height / 2 + window.scrollY;
        const count = 8;

        for (let i = 0; i < count; i++) {
            const p = document.createElement("span");
            p.className = "heart-particle";
            p.textContent = "❤️";

            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
            const dist = 55 + Math.random() * 55;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist - 25;

            p.style.left = cx + "px";
            p.style.top = cy + "px";
            p.style.setProperty("--tx", tx.toFixed(1) + "px");
            p.style.setProperty("--ty", ty.toFixed(1) + "px");
            p.style.setProperty("--rot", (Math.random() * 120 - 60).toFixed(0) + "deg");
            p.style.setProperty("--scale", (0.5 + Math.random() * 0.7).toFixed(2));
            p.style.fontSize = (10 + Math.random() * 8).toFixed(0) + "px";
            p.style.animationDuration = (650 + Math.random() * 250).toFixed(0) + "ms";

            document.body.appendChild(p);
            p.addEventListener("animationend", () => p.remove());
        }
    });

    if (heartInner) {
        heartInner.addEventListener("animationend", () => heartInner.classList.remove("beat"));
    }
}


// Theme Toggle
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    const root = document.documentElement;
    const themeMeta = document.querySelector('meta[name="theme-color"]');

    themeToggle.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";

        root.classList.add("theme-transition");
        root.setAttribute("data-theme", next);

        if (themeMeta) {
            themeMeta.setAttribute("content", next === "light" ? "#F2ECE4" : "#141414");
        }

        try {
            localStorage.setItem("theme", next);
        } catch (e) { }

        window.setTimeout(() => root.classList.remove("theme-transition"), 400);
    });
}