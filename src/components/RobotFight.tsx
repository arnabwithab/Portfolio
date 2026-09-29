import React, { useEffect, useRef, useState } from 'react';

// ponytail: two pixel bots sparring on one tiny canvas. Rects only, zero deps.
// Phones pay nothing — returns null below lg, pauses offscreen, static if reduced-motion.

const W = 160;
const H = 120;
const GROUND = 102;
const CYCLE = 6;
const PUNCH_AT = 2.35;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface FloatText {
  x: number;
  y: number;
  text: string;
  life: number;
}

function drawBot(
  ctx: CanvasRenderingContext2D,
  o: {
    x: number;
    dir: 1 | -1;
    color: string;
    dark: string;
    name: string;
    hp: number;
    punch: boolean;
    flash: boolean;
    bounce: number;
    swing: number;
    // death progress: 0 = alive, 0→1 sinking, then fades out
    dead: number;
    alpha: number;
  },
) {
  const y = GROUND + o.bounce + o.dead * 8;
  ctx.save();
  ctx.globalAlpha = o.alpha;
  // shadow
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(Math.round(o.x - 9), GROUND + 2, 18, 3);
  // legs (alternate while walking)
  ctx.fillStyle = o.dark;
  ctx.fillRect(Math.round(o.x - 7), Math.round(y - 8), 4, Math.round(8 + o.swing));
  ctx.fillRect(Math.round(o.x + 3), Math.round(y - 8), 4, Math.round(8 - o.swing));
  // body
  ctx.fillStyle = o.dark;
  ctx.fillRect(Math.round(o.x - 9), Math.round(y - 27), 18, 20);
  ctx.fillStyle = o.color;
  ctx.fillRect(Math.round(o.x - 8), Math.round(y - 26), 16, 18);
  // belly light
  ctx.fillStyle = o.dark;
  ctx.fillRect(Math.round(o.x - 3), Math.round(y - 17), 6, 5);
  ctx.fillStyle = '#fefce8';
  ctx.fillRect(Math.round(o.x - 2), Math.round(y - 16), 4, 3);
  // back arm
  ctx.fillStyle = o.dark;
  ctx.fillRect(Math.round(o.x - o.dir * 11 - 1), Math.round(y - 24), 3, 9);
  // front arm: hanging or punching
  if (o.punch) {
    ctx.fillStyle = o.dark;
    ctx.fillRect(Math.round(o.x + (o.dir === 1 ? 8 : -20)), Math.round(y - 24), 12, 5);
    ctx.fillStyle = o.color;
    ctx.fillRect(Math.round(o.x + (o.dir === 1 ? 8 : -19)), Math.round(y - 23), 10, 3);
  } else {
    ctx.fillStyle = o.dark;
    ctx.fillRect(Math.round(o.x + o.dir * 8 - 1), Math.round(y - 24), 3, 9);
  }
  // head
  ctx.fillStyle = o.dark;
  ctx.fillRect(Math.round(o.x - 8), Math.round(y - 39), 16, 12);
  ctx.fillStyle = o.color;
  ctx.fillRect(Math.round(o.x - 7), Math.round(y - 38), 14, 10);
  // antenna
  ctx.fillStyle = o.dark;
  ctx.fillRect(Math.round(o.x - 1), Math.round(y - 45), 2, 6);
  ctx.fillStyle = o.color;
  ctx.fillRect(Math.round(o.x - 2), Math.round(y - 48), 4, 4);
  // cute eyes (big, front-facing) — X eyes when dead
  if (o.dead > 0) {
    ctx.fillStyle = '#fefce8';
    for (const ex of [Math.round(o.x - 5), Math.round(o.x + 1)]) {
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(ex + i, Math.round(y - 35) + i, 1, 1);
        ctx.fillRect(ex + 3 - i, Math.round(y - 35) + i, 1, 1);
      }
    }
  } else {
    ctx.fillStyle = '#022c22';
    ctx.fillRect(Math.round(o.x - 5), Math.round(y - 35), 4, 5);
    ctx.fillRect(Math.round(o.x + 1), Math.round(y - 35), 4, 5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(Math.round(o.x - 4), Math.round(y - 34), 2, 2);
    ctx.fillRect(Math.round(o.x + 2), Math.round(y - 34), 2, 2);
  }
  // cheeks
  ctx.fillStyle = 'rgba(244,114,182,0.8)';
  ctx.fillRect(Math.round(o.x - 7), Math.round(y - 31), 2, 2);
  ctx.fillRect(Math.round(o.x + 5), Math.round(y - 31), 2, 2);
  // hit flash
  if (o.flash) {
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.fillRect(Math.round(o.x - 9), Math.round(y - 48), 18, 43);
  }
  // name + hp
  ctx.fillStyle = '#6ee7b7';
  ctx.font = '6px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(o.name, Math.round(o.x), Math.round(y - 53));
  ctx.fillStyle = '#064e3b';
  ctx.fillRect(Math.round(o.x - 18), Math.round(y - 51), 36, 3);
  ctx.fillStyle = o.hp > 30 ? '#6ee7b7' : '#f87171';
  ctx.fillRect(Math.round(o.x - 18), Math.round(y - 51), Math.round((36 * Math.max(o.hp, 0)) / 100), 3);
  ctx.restore();
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(Math.round(cx - r), Math.round(cy - 1), r * 2, 2);
  ctx.fillRect(Math.round(cx - 1), Math.round(cy - r), 2, r * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(Math.round(cx - 2), Math.round(cy - 2), 4, 4);
}

const RobotFight: React.FC = () => {
  const [eligible, setEligible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEligible(window.matchMedia('(min-width: 1024px)').matches);
  }, []);

  useEffect(() => {
    if (!eligible) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now();
    let hpL = 100;
    let hpR = 100;
    let lastHitCycle = -1;
    let koUntil = 0;
    let koT0 = 0;
    let lastImpact = -9999;
    let lastClick = -9999;
    let knockL = 0;
    let knockR = 0;
    let flashLUntil = 0;
    let flashRUntil = 0;
    let parts: Particle[] = [];
    let texts: FloatText[] = [];
    let raf = 0;
    let visible = true;

    const burst = (x: number, y: number) => {
      for (let i = 0; i < 7; i++) {
        parts.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 40,
          vy: -Math.random() * 35 - 5,
          life: 0.45,
        });
      }
    };

    const draw = (now: number) => {
      const elapsed = (now - t0) / 1000;
      const cycleIdx = Math.floor(elapsed / CYCLE);
      const ct = elapsed % CYCLE;
      const attackerLeft = cycleIdx % 2 === 0;

      // approach / retreat envelope
      const appr =
        ct < 1.5 ? 0 : ct < 2.2 ? ((ct - 1.5) / 0.7) * 16 : ct < 2.6 ? 16 : ct < 3.3 ? 16 * (1 - (ct - 2.6) / 0.7) : 0;
      const punching = ct >= 2.2 && ct <= 2.65;
      const moving = ct >= 1.5 && ct <= 3.3;

      // impact once per cycle
      if (koUntil < now && lastHitCycle !== cycleIdx && ct >= PUNCH_AT) {
        lastHitCycle = cycleIdx;
        lastImpact = now;
        if (attackerLeft) {
          hpR -= 16;
          knockR = 5;
          flashRUntil = now + 220;
          burst(92, 78);
          texts.push({ x: 92, y: 66, text: '-16', life: 0.8 });
          if (hpR <= 0) {
            koUntil = now + 2400;
            koT0 = now;
          }
        } else {
          hpL -= 12;
          knockL = 5;
          flashLUntil = now + 220;
          burst(68, 78);
          texts.push({ x: 68, y: 66, text: '-12', life: 0.8 });
          if (hpL <= 0) {
            koUntil = now + 2400;
            koT0 = now;
          }
        }
      }
      if (koUntil !== 0 && now > koUntil && (hpL <= 0 || hpR <= 0)) {
        hpL = 100;
        hpR = 100;
        koUntil = 0;
      }

      knockL *= 0.88;
      knockR *= 0.88;

      // shake on fresh impact
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, W, H);
      if (now - lastImpact < 150) {
        ctx.translate(Math.round((Math.random() - 0.5) * 3), Math.round((Math.random() - 0.5) * 3));
      }

      // ground dashes
      ctx.fillStyle = '#065f46';
      for (let gx = 8; gx < W; gx += 24) ctx.fillRect(gx, GROUND + 4, 12, 2);

      const bounceL = Math.sin(now / 300) * 1.5;
      const bounceR = Math.sin(now / 300 + Math.PI) * 1.5;
      const swing = moving ? Math.sin(now / 90) * 2 : 0;

      // death: sink over ~0.9s, fade out over the next 1s; winner bounces with joy
      const deadL = hpL <= 0 && koT0 !== 0 ? Math.min((now - koT0) / 900, 1) : 0;
      const deadR = hpR <= 0 && koT0 !== 0 ? Math.min((now - koT0) / 900, 1) : 0;
      const alphaL = hpL <= 0 && koT0 !== 0 ? Math.max(1 - Math.max(now - koT0 - 800, 0) / 1000, 0) : 1;
      const alphaR = hpR <= 0 && koT0 !== 0 ? Math.max(1 - Math.max(now - koT0 - 800, 0) / 1000, 0) : 1;

      drawBot(ctx, {
        x: 44 + (attackerLeft ? appr : 0) + knockL,
        dir: 1,
        color: '#6ee7b7',
        dark: '#065f46',
        name: 'YOU',
        hp: hpL,
        punch: punching && attackerLeft && koUntil < now,
        flash: now < flashLUntil,
        bounce: hpR <= 0 ? Math.abs(Math.sin(now / 200)) * -4 : bounceL,
        swing,
        dead: deadL,
        alpha: alphaL,
      });
      drawBot(ctx, {
        x: 116 - (!attackerLeft ? appr : 0) - knockR,
        dir: -1,
        color: '#f9a8d4',
        dark: '#831843',
        name: 'BUG',
        hp: hpR,
        punch: punching && !attackerLeft && koUntil < now,
        flash: now < flashRUntil,
        bounce: hpL <= 0 ? Math.abs(Math.sin(now / 200)) * -4 : bounceR,
        swing: -swing,
        dead: deadR,
        alpha: alphaR,
      });

      // little ghost floats up from the loser
      if (koT0 !== 0 && now - koT0 > 450 && (hpL <= 0 || hpR <= 0)) {
        const loserLeft = hpL <= 0;
        const gx = loserLeft ? 44 + knockL : 116 - knockR;
        const gy = GROUND - 30 - (now - koT0 - 450) / 40;
        ctx.fillStyle = 'rgba(254,252,232,0.9)';
        ctx.fillRect(Math.round(gx - 3), Math.round(gy - 4), 6, 6);
        ctx.fillRect(Math.round(gx - 4), Math.round(gy - 3), 8, 4);
        ctx.fillStyle = '#022c22';
        ctx.fillRect(Math.round(gx - 2), Math.round(gy - 2), 1, 2);
        ctx.fillRect(Math.round(gx + 1), Math.round(gy - 2), 1, 2);
      }

      // impact star
      if (now - lastImpact < 200) {
        drawStar(ctx, attackerLeft ? 92 : 68, 78, 7);
      }

      // particles
      parts = parts.filter((p) => p.life > 0);
      ctx.fillStyle = '#fef08a';
      for (const p of parts) {
        p.life -= 1 / 60;
        p.x += p.vx / 60;
        p.y += p.vy / 60;
        p.vy += 90 / 60;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), 2, 2);
      }

      // damage numbers
      texts = texts.filter((t) => t.life > 0);
      ctx.fillStyle = '#fefce8';
      ctx.font = '7px monospace';
      ctx.textAlign = 'center';
      for (const t of texts) {
        t.life -= 1 / 60;
        t.y -= 14 / 60;
        ctx.fillText(t.text, Math.round(t.x), Math.round(t.y));
      }

      // KO banner
      if (koUntil > now) {
        ctx.fillStyle = 'rgba(1,26,20,0.7)';
        ctx.fillRect(0, 44, W, 30);
        ctx.fillStyle = '#fef08a';
        ctx.font = '16px monospace';
        ctx.fillText(hpL <= 0 ? 'BUG WINS!' : 'YOU WIN!', W / 2, 65);
      }
    };

    if (reduced) {
      draw(t0 + 500);
      return;
    }

    const loop = (now: number) => {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    };

    const onClick = () => {
      const now = performance.now();
      if (now - lastClick < 800 || koUntil > now) return;
      lastClick = now;
      hpR -= 8;
      knockR = 5;
      flashRUntil = now + 220;
      lastImpact = now;
      burst(92, 78);
      texts.push({ x: 92, y: 66, text: '-8', life: 0.8 });
      if (hpR <= 0) {
        koUntil = now + 2400;
        koT0 = now;
      }
    };
    canvas.addEventListener('click', onClick);

    const obs = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    obs.observe(wrap);

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      canvas.removeEventListener('click', onClick);
    };
  }, [eligible]);

  if (!eligible) return null;

  return (
    <div ref={wrapRef} className="mt-10 hidden w-full max-w-xs lg:block" aria-label="Two pixel robots sparring">
      <div>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="h-auto w-full cursor-pointer"
          style={{ imageRendering: 'pixelated' }}
          title="Click to cheer YOU on"
        />
      </div>
    </div>
  );
};

export default RobotFight;
