import React from 'react'

// Background animation layer — canvas-based
export const BgAnim = ({ type, speed, intensity, color }) => {
  const ref = React.useRef();
  React.useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, particles = [];
    const resize = () => { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px'; ctx.scale(devicePixelRatio, devicePixelRatio); };
    resize();
    const count = Math.floor(80 * intensity);
    const W = () => innerWidth, H = () => innerHeight;
    const rand = (a, b) => a + Math.random() * (b - a);

    const init = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        if (type === 'petals') particles.push({ x: rand(0, W()), y: rand(-H(), H()), r: rand(6, 14), vy: rand(0.3, 1.2), vx: rand(-0.3, 0.3), rot: rand(0, 6.28), vr: rand(-0.02, 0.02) });
        else if (type === 'snow') particles.push({ x: rand(0, W()), y: rand(-H(), H()), r: rand(1, 3), vy: rand(0.4, 1.5), vx: rand(-0.4, 0.4), phase: rand(0, 6.28) });
        else if (type === 'bubbles') particles.push({ x: rand(0, W()), y: rand(0, H() * 2), r: rand(4, 18), vy: rand(-1.5, -0.3), vx: rand(-0.2, 0.2) });
        else if (type === 'fireflies') particles.push({ x: rand(0, W()), y: rand(0, H()), r: rand(1, 2.5), vx: rand(-0.3, 0.3), vy: rand(-0.3, 0.3), phase: rand(0, 6.28), pulseSpeed: rand(0.01, 0.04) });
        else if (type === 'aurora') particles.push({ x: rand(0, W()), y: rand(0, H()), r: rand(120, 260), hue: rand(0, 360), vy: rand(-0.1, 0.1), vx: rand(-0.1, 0.1), phase: rand(0, 6.28) });
        else particles.push({ x: rand(0, W()), y: rand(0, H()), r: rand(0.8, 2), vx: rand(-0.15, 0.15), vy: rand(-0.15, 0.15), o: rand(0.3, 0.9) });
      }
    };
    init();

    let t = 0;
    const loop = () => {
      t += 0.016 * speed;
      ctx.clearRect(0, 0, W(), H());

      if (type === 'aurora') {
        for (const p of particles) {
          p.phase += 0.003 * speed;
          p.x += Math.sin(p.phase) * 0.3;
          p.y += Math.cos(p.phase * 0.7) * 0.3;
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          g.addColorStop(0, `${color}33`);
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
        }
        raf = requestAnimationFrame(loop); return;
      }

      for (const p of particles) {
        if (type === 'petals') {
          p.y += p.vy * speed; p.x += p.vx * speed + Math.sin(p.y * 0.01) * 0.5; p.rot += p.vr * speed;
          if (p.y > H() + 20) { p.y = -20; p.x = rand(0, W()); }
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.fillStyle = `${color}bb`; ctx.beginPath();
          ctx.ellipse(0, 0, p.r, p.r * 0.5, 0, 0, 6.28); ctx.fill(); ctx.restore();
        } else if (type === 'snow') {
          p.y += p.vy * speed; p.x += p.vx * speed + Math.sin((p.y + p.phase) * 0.02) * 0.4;
          if (p.y > H() + 10) { p.y = -10; p.x = rand(0, W()); }
          ctx.fillStyle = '#ffffffcc'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
        } else if (type === 'bubbles') {
          p.y += p.vy * speed; p.x += p.vx * speed;
          if (p.y < -30) { p.y = H() + 30; p.x = rand(0, W()); }
          ctx.strokeStyle = `${color}99`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.stroke();
          ctx.fillStyle = `${color}11`; ctx.fill();
        } else if (type === 'fireflies') {
          p.phase += p.pulseSpeed * speed; p.x += p.vx * speed; p.y += p.vy * speed;
          if (p.x < 0 || p.x > W()) p.vx *= -1;
          if (p.y < 0 || p.y > H()) p.vy *= -1;
          const glow = (Math.sin(p.phase) + 1) / 2;
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
          g.addColorStop(0, `${color}${Math.floor(glow * 255).toString(16).padStart(2,'0')}`);
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 8, 0, 6.28); ctx.fill();
          ctx.fillStyle = `${color}ee`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
        } else { // particles
          p.x += p.vx * speed; p.y += p.vy * speed;
          if (p.x < 0) p.x = W(); if (p.x > W()) p.x = 0;
          if (p.y < 0) p.y = H(); if (p.y > H()) p.y = 0;
          ctx.fillStyle = color + Math.floor(p.o * 120).toString(16).padStart(2, '0');
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, [type, speed, intensity, color]);
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none" style={{ zIndex: 1, opacity: Math.min(1, intensity + 0.2) }} />;
};

// Pattern layer — tiled CSS
export const PatternLayer = ({ pattern, color }) => {
  const bgs = {
    dots: `radial-gradient(${color}22 1px, transparent 1px)`,
    grid: `linear-gradient(${color}18 1px, transparent 1px), linear-gradient(90deg, ${color}18 1px, transparent 1px)`,
    diagonals: `repeating-linear-gradient(45deg, ${color}14 0 1px, transparent 1px 14px)`,
    noise: `radial-gradient(${color}11 0.5px, transparent 0.5px)`,
  };
  const sizes = { dots: '22px 22px', grid: '40px 40px', diagonals: '14px 14px', noise: '3px 3px' };
  return <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: bgs[pattern], backgroundSize: sizes[pattern], zIndex: 1, opacity: 0.8 }} />;
};
