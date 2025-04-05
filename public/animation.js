const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiCount = 500;
const confettiColors = {
  medikit: ["#FF6F61", "#F4A9A1", "#D32F2F"], // Rouge, pastel, ton classique
  poison: ["#A8E6A2", "#81C784"], // Vert pastel
  skip: ["#4B4B4B", "#BEBEBE", "#D3D3D3"], // Gris foncé, avec un contraste plus clair
  shield: ["#1976D2", "#1565C0"], // Bleu plus foncé
  winner: ["#FF69B4", "#FFD700", "#1E90F0", "#ADFF2F", "#FF6347"], // Multicolore
};


let confettiParticles = [];

function createConfetti(color) {
  const maxSpeedX = 3;
  const maxSpeedY = 4;

  const particle = {
    x: Math.random() * canvas.width,
    y: -10,
    width: Math.random() * 10 + 5,
    height: Math.random() * 10 + 5,
    color: color,
    speedX: (Math.random() - 0.5) * maxSpeedX * 2,
    speedY: (Math.random() - 0.5) * maxSpeedY * 2,
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

animateConfetti();

function triggerAction(actionType) {
  const colors = confettiColors[actionType];
  if (!colors) return;

  switch (actionType) {
    case "medikit":
      confettiCount = 150;
      break;
    case "poison":
      confettiCount = 200;
      break;
    case "skip":
      confettiCount = 100;
      break;
    case "shield":
      confettiCount = 150;
      break;
    case "winner":
      confettiCount = 500;
      break;
    default:
      confettiCount = 100;
  }

  for (let i = 0; i < confettiCount; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    createConfetti(color);
  }
}

function performAction(action) {
  switch (action) {
    case "medikit":
      triggerAction("medikit");
      break;
    case "poison":
      triggerAction("poison");
      break;
    case "skip":
      triggerAction("skip");
      break;
    case "shield":
      triggerAction("shield");
      break;
    case "winner":
      triggerAction("winner");
      break;
    default:
      consoleMessage('text-red-300', 'Action Inconnu');
  }
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
