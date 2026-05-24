document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Typewriter Effect --- */
    const textElement = document.getElementById('typewriterText');
    const textToType = "A New Era is Coming Soon.";
    let charIndex = 0;

    // Start typing after the logo drops in
    setTimeout(() => {
        function type() {
            if (charIndex < textToType.length) {
                textElement.innerHTML += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100); // Speed of typing
            }
        }
        type();
    }, 1000);


    /* --- 2. Interactive Particle Background --- */
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    // Mouse Interaction
    const mouse = { x: null, y: null, radius: 150 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    class Particle {
        constructor(x, y, dx, dy, size, color) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
            if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

            // Mouse repulsion
            let dxMouse = mouse.x - this.x;
            let dyMouse = mouse.y - this.y;
            let distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            
            if (distance < mouse.radius) {
                const forceDirectionX = dxMouse / distance;
                const forceDirectionY = dyMouse / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                
                this.x -= forceDirectionX * force * 3;
                this.y -= forceDirectionY * force * 3;
            }

            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = Math.random() * (innerWidth - size * 2) + size * 2;
            let y = Math.random() * (innerHeight - size * 2) + size * 2;
            let dx = (Math.random() - 0.5) * 1.5;
            let dy = (Math.random() - 0.5) * 1.5;
            
            // Alternate between Unity Blue and Aid Green
            let color = Math.random() > 0.5 ? '#0088ff' : '#00ff55';
            
            particlesArray.push(new Particle(x, y, dx, dy, size, color));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
    }

    // Draw lines between nearby particles
    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 10) * (canvas.height / 10)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    initParticles();
    animateParticles();
});
