document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bg-music");
    const progressBar = document.getElementById("progressBar");
    const chapters = document.querySelectorAll(".chapter");

    // ==========================================
    // AUDIO CONTINUITY (fixes music restarting
    // when moving between pages, e.g. story.html
    // -> ending.html). We read/write the current
    // playback position from sessionStorage so
    // each new page's <audio> element resumes
    // instead of starting over at 0:00.
    // ==========================================
    function restoreAudioTime() {
        if (!bgMusic) return;
        const saved = sessionStorage.getItem("bgMusicTime");
        if (!saved) return;
        const t = parseFloat(saved);
        if (isNaN(t) || t <= 0) return;

        if (bgMusic.readyState >= 1) {
            bgMusic.currentTime = t;
        } else {
            bgMusic.addEventListener("loadedmetadata", () => {
                bgMusic.currentTime = t;
            }, { once: true });
        }
    }

    function saveAudioTime() {
        if (!bgMusic) return;
        sessionStorage.setItem("bgMusicTime", bgMusic.currentTime);
    }

    if (bgMusic) {
        bgMusic.volume = 0.13; // Set a gentle background music volume
        restoreAudioTime();

        bgMusic.addEventListener("timeupdate", saveAudioTime);
        window.addEventListener("pagehide", saveAudioTime);
        window.addEventListener("beforeunload", saveAudioTime);

        // 1. Try to play the music automatically first
        let playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // 2. If the browser blocks it, inject a sleek, floating play button
                const playBtn = document.createElement("button");
                playBtn.innerHTML = "🎵 Tap to play music";

                // Style the button via JS so you don't need to touch CSS
                playBtn.style.position = "fixed";
                playBtn.style.bottom = "30px";
                playBtn.style.right = "30px";
                playBtn.style.padding = "12px 24px";
                playBtn.style.backgroundColor = "#c5a059"; // Matches your gold accent
                playBtn.style.color = "#09110e"; // Matches your dark green forest
                playBtn.style.border = "none";
                playBtn.style.borderRadius = "50px";
                playBtn.style.fontFamily = "'Poppins', sans-serif";
                playBtn.style.fontSize = "1rem";
                playBtn.style.fontWeight = "600";
                playBtn.style.cursor = "pointer";
                playBtn.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
                playBtn.style.zIndex = "10000";
                playBtn.style.transition = "opacity 0.5s ease";

                // Add a subtle pulsing animation
                const style = document.createElement('style');
                style.innerHTML = `
                    @keyframes pulseGlow {
                        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(197, 160, 89, 0.7); }
                        70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(197, 160, 89, 0); }
                        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(197, 160, 89, 0); }
                    }
                `;
                document.head.appendChild(style);
                playBtn.style.animation = "pulseGlow 2s infinite";

                document.body.appendChild(playBtn);

                // 3. When clicked, play music and fade out the button
                playBtn.addEventListener("click", () => {
                    bgMusic.play().catch(err => console.log("Audio still blocked:", err));
                    playBtn.style.opacity = "0";
                    setTimeout(() => playBtn.remove(), 500);
                });
            });
        }
    }

    // Save position right before navigating to another chapter/page
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener("click", saveAudioTime);
    });

    // Smooth Scroll Reveal for Chapters
    function revealChapters() {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (progressBar) progressBar.style.width = (winScroll / height) * 100 + "%";

        chapters.forEach(ch => {
            const chTop = ch.getBoundingClientRect().top;
            if (chTop < window.innerHeight * 0.9) {
                ch.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealChapters);

    // Trigger immediately so the first chapter is visible
    setTimeout(revealChapters, 150);
});
