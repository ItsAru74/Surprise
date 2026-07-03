/*
===========================================
OUR STORY ❤️ - CORE COVER SCRIPT 
Handles Loader, Transitions, and Audio Playback
===========================================
*/

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const bookCover = document.getElementById("book-cover");
    const openCoverBtn = document.getElementById("open-cover-btn");
    const giftSection = document.getElementById("gift-section");
    const giftBox = document.getElementById("gift-box");
    const bgMusic = document.getElementById("bg-music");

    // 1. Remove Preloader and fade in Cover Page
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
            bookCover.style.display = "flex";
            setTimeout(() => {
                bookCover.style.opacity = "1";
            }, 50);
        }, 500);
    }, 1800);

    // 2. Transition from Cover Page to Gift/Letter Card
    if (openCoverBtn) {
        openCoverBtn.addEventListener("click", () => {
            bookCover.style.opacity = "0";
            setTimeout(() => {
                bookCover.style.display = "none";
                giftSection.style.display = "flex";
                setTimeout(() => {
                    giftSection.style.opacity = "1";
                }, 50);
            }, 600);
        });
    }

    // 3. Click Gift Box: Play Music and Redirect to Story Chapters
    if (giftBox) {
        giftBox.addEventListener("click", () => {
            // Unmute and play background music safely
            if (bgMusic) {
                bgMusic.volume = 0.2; // Sweet, ambient background level
                bgMusic.play().catch((err) => {
                    console.log("Audio play request was blocked by browser policies: ", err);
                });
            }

            // Small delay for natural transition effects before landing on story page
            giftBox.style.transform = "scale(0.9) rotate(-5deg)";
            setTimeout(() => {
                window.location.href = "story.html";
            }, 400);
        });
    }

    // 4. Subtle Ambient Floating Canvas Hearts on Cover Background
    const canvas = document.getElementById("background-effects");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let hearts = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        class ParticleHeart {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 50;
                this.size = Math.random() * 12 + 6;
                this.speedY = Math.random() * 1.5 + 0.5;
                this.opacity = Math.random() * 0.2 + 0.1;
            }
            update() {
                this.y -= this.speedY;
                if (this.y < -20) {
                    this.y = canvas.height + 20;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.fillStyle = `rgba(226, 182, 151, ${this.opacity})`;
                ctx.font = `${this.size}px serif`;
                ctx.fillText("♥", this.x, this.y);
            }
        }

        for (let i = 0; i < 25; i++) {
            hearts.push(new ParticleHeart());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hearts.forEach((heart) => {
                heart.update();
                heart.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }
});