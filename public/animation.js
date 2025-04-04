const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiCount = 500;
const confettiColors = [
  "#ADD8E6", // Bleu ciel clair
  "#B0E0E6", // Bleu ciel pâle
  "#E0FFFF", // Bleu ciel très clair
  "#F0FFFF", // Bleu ciel presque blanc
  "#F5F5F5", // Gris très clair
  "#F0F8FF", // Bleu ciel très pâle
  "#CCEEFF", // Bleu clair pastel
  "#E6F2FF", // Bleu clair légèrement plus foncé
  "#D8F0FF", // Bleu clair légèrement plus foncé
  "#D0E0FF", // Bleu clair légèrement plus foncé
  "#B0E0E6", // Bleu ciel pâle
  "#E0FFFF", // Bleu ciel très clair
  "#F0FFFF", // Bleu ciel presque blanc
  "#F5F5F5", // Gris très clair
  "#F0F8FF"  // Bleu ciel très pâle
];

let confettiParticles = [];

function createConfetti() {
  const particle = {
    x: Math.random() * canvas.width,
    y: -10,
    width: Math.random() * 10 + 5,
    height: Math.random() * 10 + 5,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    speedX: (Math.random() - 0.5) * 10,
    speedY: Math.random() * 5 + 2,
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 5 - 2.5
  };
  confettiParticles.push(particle);
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiParticles.forEach((particle, index) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.rotation += particle.rotationSpeed;

    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate((particle.rotation * Math.PI) / 180);
    ctx.fillStyle = particle.color;
    ctx.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
    ctx.restore();

    if (particle.y > canvas.height || particle.x < 0 || particle.x > canvas.width) {
      confettiParticles.splice(index, 1);
    }
  });

  requestAnimationFrame(animateConfetti);
}

function PlayConfetti() {
  for (let i = 0; i < confettiCount; i++) {
    createConfetti();
  }
  animateConfetti();
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
