// Infinite Horizontal Scroll Animation
window.addEventListener("load", () => {
    const wrapper = document.querySelector(".scroll-wrapper");
    const inner = document.getElementById("scrollInner");
    const track = document.getElementById("track");

    const gap = 15;
    const loopWidth = track.getBoundingClientRect().width + gap;

    while (inner.getBoundingClientRect().width < wrapper.offsetWidth + loopWidth) {
        inner.appendChild(track.cloneNode(true));
    }

    const pxPerSec = 50;
    inner.style.setProperty("--loop-width", loopWidth + "px");
    inner.style.setProperty("--duration", loopWidth / pxPerSec + "s");
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