// Ultra-Crazy Interactive Cyber Constellation, Shockwaves, Stardust & Meteor Canvas
(function () {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    let sparkles = [];
    let shockwaves = [];
    let meteors = [];

    // Scale particle count nicely with screen width
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 150);
    const connectionDist = 145;
    const mouseConnectionDist = 200;

    let mouse = {
        x: null,
        y: null,
        radius: 200,
        lastX: null,
        lastY: null
    };

    const colorPalette = [
        '#3D6BFF', // Electric Blue
        '#6D8CFF', // Soft Blue
        '#38BDF8', // Neon Cyan
        '#A855F7', // Cyber Purple
        '#6366F1'  // Indigo
    ];

    // Mouse events
    window.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        // Spawn sparkling stardust on mouse movement
        if (Math.random() > 0.3) {
            sparkles.push(new Sparkle(mouse.x, mouse.y));
        }
    });

    window.addEventListener('mouseout', function () {
        mouse.x = null;
        mouse.y = null;
    });

    // Click Shockwave Burst
    window.addEventListener('click', function (e) {
        shockwaves.push(new Shockwave(e.clientX, e.clientY));
        // Spawn burst particles on click
        for (let i = 0; i < 12; i++) {
            sparkles.push(new Sparkle(e.clientX, e.clientY, true));
        }
    });

    window.addEventListener('resize', function () {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Shockwave Class
    class Shockwave {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 5;
            this.maxRadius = 240;
            this.speed = 8;
            this.alpha = 0.8;
            this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        }

        update() {
            this.radius += this.speed;
            this.alpha = Math.max(0, 0.8 * (1 - this.radius / this.maxRadius));

            // Push particles outward
            for (let p of particles) {
                const dx = p.x - this.x;
                const dy = p.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (Math.abs(dist - this.radius) < 30 && dist > 0) {
                    const force = 4.5;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                }
            }
        }

        draw() {
            if (this.alpha <= 0) return;
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 18;
            ctx.shadowColor = this.color;
            ctx.stroke();
            ctx.restore();
        }
    }

    // Sparkle / Stardust Trail Class
    class Sparkle {
        constructor(x, y, isBurst = false) {
            this.x = x + (Math.random() - 0.5) * 15;
            this.y = y + (Math.random() - 0.5) * 15;
            const speed = isBurst ? Math.random() * 4 + 2 : Math.random() * 1.5 + 0.5;
            const angle = Math.random() * Math.PI * 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.radius = Math.random() * 2 + 1;
            this.alpha = 1;
            this.decay = isBurst ? 0.02 : 0.035;
            this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
        }

        draw() {
            if (this.alpha <= 0) return;
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    // Multi-depth Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.depth = Math.random(); // 0 (far) to 1 (near)
            this.vx = (Math.random() - 0.5) * (0.4 + this.depth * 0.8);
            this.vy = (Math.random() - 0.5) * (0.4 + this.depth * 0.8);
            this.baseRadius = 1 + this.depth * 2.2;
            this.radius = this.baseRadius;
            this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            this.pulseSpeed = 0.02 + Math.random() * 0.03;
            this.pulseVal = Math.random() * Math.PI * 2;
        }

        update() {
            // Apply friction from shockwaves
            this.vx *= 0.98;
            this.vy *= 0.98;

            // Maintain base float
            if (Math.abs(this.vx) < 0.2) this.vx += (Math.random() - 0.5) * 0.1;
            if (Math.abs(this.vy) < 0.2) this.vy += (Math.random() - 0.5) * 0.1;

            this.x += this.vx;
            this.y += this.vy;

            // Screen boundary bounce
            if (this.x < 0) { this.x = 0; this.vx = -this.vx; }
            if (this.x > width) { this.x = width; this.vx = -this.vx; }
            if (this.y < 0) { this.y = 0; this.vy = -this.vy; }
            if (this.y > height) { this.y = height; this.vy = -this.vy; }

            // Pulse radius
            this.pulseVal += this.pulseSpeed;
            this.radius = this.baseRadius + Math.sin(this.pulseVal) * 0.6;

            // Mouse interaction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const directionX = (dx / dist) * force * (1.2 + this.depth);
                    const directionY = (dy / dist) * force * (1.2 + this.depth);

                    this.x += directionX;
                    this.y += directionY;
                }
            }
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, Math.max(0.6, this.radius), 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10 + this.depth * 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    // High-Tech Cyber Meteors / Shooting Comets
    class Meteor {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width * 1.3 - width * 0.15;
            this.y = -60;
            this.len = Math.random() * 120 + 80;
            this.speed = Math.random() * 6 + 5;
            this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.35;
            this.alpha = 1;
            this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            this.active = true;
        }

        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.alpha -= 0.007;
            if (this.alpha <= 0 || this.y > height + 80 || this.x < -80 || this.x > width + 80) {
                this.active = false;
            }
        }

        draw() {
            if (!this.active) return;
            const endX = this.x - Math.cos(this.angle) * this.len;
            const endY = this.y - Math.sin(this.angle) * this.len;

            const grad = ctx.createLinearGradient(this.x, this.y, endX, endY);
            grad.addColorStop(0, '#FFFFFF');
            grad.addColorStop(0.15, this.color);
            grad.addColorStop(1, 'rgba(61, 107, 255, 0)');

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2.2;
            ctx.shadowBlur = 14;
            ctx.shadowColor = this.color;
            ctx.stroke();

            // Glowing meteor head
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowBlur = 16;
            ctx.shadowColor = '#FFFFFF';
            ctx.fill();
            ctx.restore();
        }
    }

    // Populate initial particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Continuous Meteor Spawning (every 1.6s)
    setInterval(() => {
        if (meteors.length < 4 && Math.random() > 0.25) {
            meteors.push(new Meteor());
        }
    }, 1600);

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Dynamic Glowing Cursor Spotlight
        if (mouse.x !== null && mouse.y !== null) {
            const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260);
            glow.addColorStop(0, 'rgba(61, 107, 255, 0.16)');
            glow.addColorStop(0.4, 'rgba(168, 85, 247, 0.06)');
            glow.addColorStop(1, 'rgba(61, 107, 255, 0)');
            ctx.fillStyle = glow;
            ctx.fillRect(mouse.x - 260, mouse.y - 260, 520, 520);
        }

        // Draw and update Shockwaves
        for (let i = shockwaves.length - 1; i >= 0; i--) {
            shockwaves[i].update();
            shockwaves[i].draw();
            if (shockwaves[i].alpha <= 0) {
                shockwaves.splice(i, 1);
            }
        }

        // Draw and update Sparkles
        for (let i = sparkles.length - 1; i >= 0; i--) {
            sparkles[i].update();
            sparkles[i].draw();
            if (sparkles[i].alpha <= 0) {
                sparkles.splice(i, 1);
            }
        }

        // Update and draw Particles & Constellation Beams
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect to mouse cursor
            if (mouse.x !== null && mouse.y !== null) {
                const dxMouse = mouse.x - particles[i].x;
                const dyMouse = mouse.y - particles[i].y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distMouse < mouseConnectionDist) {
                    const alpha = (1 - distMouse / mouseConnectionDist) * 0.65;
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(109, 140, 255, ${alpha})`;
                    ctx.lineWidth = 1.2;
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = '#6D8CFF';
                    ctx.stroke();
                    ctx.restore();
                }
            }

            // Connect to neighboring particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDist) {
                    const alpha = (1 - dist / connectionDist) * 0.32;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(61, 107, 255, ${alpha})`;
                    ctx.lineWidth = 0.9;
                    ctx.stroke();
                }
            }
        }

        // Update and draw Meteors
        for (let i = meteors.length - 1; i >= 0; i--) {
            meteors[i].update();
            meteors[i].draw();
            if (!meteors[i].active) {
                meteors.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
})();
