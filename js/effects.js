/* ==========================================
        COVER PAGE BACKGROUND EFFECTS
========================================== */

function createSparkle() {
    const sparklesContainer = document.getElementById('sparkles');
    
    // Only run if we are on the index page
    if (!sparklesContainer) return;

    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    
    // Randomize position and size
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.opacity = Math.random();
    sparkle.style.fontSize = (10 + Math.random() * 15) + 'px';
    sparkle.style.color = '#d8c4a5';
    
    // Animate
    sparkle.style.animation = `sparkleFloat ${2 + Math.random() * 3}s linear forwards`;
    
    sparklesContainer.appendChild(sparkle);
    
    // Remove after animation finishes
    setTimeout(() => {
        sparkle.remove();
    }, 5000);
}

// Create a new sparkle every 400 milliseconds
setInterval(createSparkle, 400);

// Add the required keyframes directly to the document
const style = document.createElement('style');
style.innerHTML = `
@keyframes sparkleFloat {
    0% { opacity: 0; transform: scale(0.5) translateY(0); }
    50% { opacity: 1; transform: scale(1.2) translateY(-20px); }
    100% { opacity: 0; transform: scale(0.5) translateY(-40px); }
}`;
document.head.appendChild(style);