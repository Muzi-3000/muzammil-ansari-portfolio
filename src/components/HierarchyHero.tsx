import { useEffect, useRef, useState } from 'react';

type Particle = {
  element: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  scaleX: number;
  scaleY: number;
};

export default function HierarchyHero() {
  const [ordered, setOrdered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    hero.classList.remove('is-floating');
    const elements = Array.from(hero.querySelectorAll<HTMLElement>('[data-hierarchy-float]'));
    if (ordered) {
      elements.forEach((element) => {
        element.style.removeProperty('--float-x');
        element.style.removeProperty('--float-y');
        element.style.removeProperty('--float-r');
        element.style.removeProperty('--float-sx');
        element.style.removeProperty('--float-sy');
      });
      return;
    }

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = matchMedia('(pointer: coarse)').matches;
    let particles: Particle[] = [];
    let frame = 0;
    let resizeTimer = 0;
    let layoutWidth = hero.clientWidth;
    let cursorX = -1000;
    let cursorY = -1000;
    let cursorActive = false;

    const randomBetween = (minimum: number, maximum: number) => minimum + Math.random() * Math.max(0, maximum - minimum);

    const positionParticles = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      elements.forEach((element) => {
        element.style.setProperty('--float-x', '0px');
        element.style.setProperty('--float-y', '0px');
        element.style.setProperty('--float-r', '0deg');
        element.style.setProperty('--float-sx', '1');
        element.style.setProperty('--float-sy', '1');
      });

      const heroRect = hero.getBoundingClientRect();
      const startRuleRect = hero.querySelector<HTMLElement>('.hero__start-rule')?.getBoundingClientRect();
      const controlRect = hero.querySelector<HTMLElement>('.hero__hierarchy-control')?.getBoundingClientRect();
      const sidePadding = Math.max(18, Math.min(54, heroRect.width * .035));
      const topLimit = Math.max(96, (startRuleRect?.bottom ?? heroRect.top + 78) - heroRect.top + 22);
      const bottomLimit = Math.max(topLimit + 90, (controlRect?.top ?? heroRect.bottom - 180) - heroRect.top - 24);

      particles = elements.filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      }).map((element) => {
        const rect = element.getBoundingClientRect();
        const baseX = rect.left - heroRect.left;
        const baseY = rect.top - heroRect.top;
        const targetX = randomBetween(sidePadding, Math.max(sidePadding, heroRect.width - rect.width - sidePadding));
        const targetY = randomBetween(topLimit, Math.max(topLimit, bottomLimit - rect.height));
        const x = targetX - baseX;
        const y = targetY - baseY;
        const angle = randomBetween(-5, 5);

        element.style.setProperty('--float-x', `${x}px`);
        element.style.setProperty('--float-y', `${y}px`);
        element.style.setProperty('--float-r', `${angle}deg`);

        return {
          element,
          x,
          y,
          vx: reduced ? 0 : randomBetween(coarsePointer ? -.14 : -.28, coarsePointer ? .14 : .28),
          vy: reduced ? 0 : randomBetween(coarsePointer ? -.12 : -.24, coarsePointer ? .12 : .24),
          angle,
          spin: reduced ? 0 : randomBetween(coarsePointer ? -.005 : -.012, coarsePointer ? .005 : .012),
          scaleX: 1,
          scaleY: 1,
        };
      });

      hero.classList.add('is-floating');
      if (!reduced) frame = requestAnimationFrame(moveParticles);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      cursorX = event.clientX;
      cursorY = event.clientY;
      cursorActive = true;
    };
    const onPointerLeave = () => { cursorActive = false; };
    const onResize = () => {
      const nextWidth = hero.clientWidth;
      if (Math.abs(nextWidth - layoutWidth) < 10) return;
      layoutWidth = nextWidth;
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(positionParticles, 160);
    };

    const moveParticles = (time: number) => {
      const heroRect = hero.getBoundingClientRect();
      const startRuleRect = hero.querySelector<HTMLElement>('.hero__start-rule')?.getBoundingClientRect();
      const controlRect = hero.querySelector<HTMLElement>('.hero__hierarchy-control')?.getBoundingClientRect();
      const sidePadding = Math.max(18, Math.min(54, heroRect.width * .035));
      const fieldLeft = heroRect.left + sidePadding;
      const fieldRight = Math.max(fieldLeft + 100, heroRect.right - sidePadding);
      const fieldTop = (startRuleRect?.bottom ?? heroRect.top + 78) + 22;
      const fieldBottom = Math.max(fieldTop + 72, (controlRect?.top ?? heroRect.bottom - 180) - 24);
      const repulsionRadius = Math.max(150, Math.min(260, hero.clientWidth * .19));
      const currentRects = particles.map((particle) => particle.element.getBoundingClientRect());
      const ambientX = coarsePointer ? .00125 : .0026;
      const ambientY = coarsePointer ? .00105 : .0022;
      const maximumSpeed = coarsePointer ? 2.6 : 7.2;
      const bounce = coarsePointer ? .64 : .82;

      particles.forEach((particle, index) => {
        particle.vx += Math.sin(time * .00042 + index * 1.7) * ambientX;
        particle.vy += Math.cos(time * .00036 + index * 1.35) * ambientY;
        let targetScaleX = 1;
        let targetScaleY = 1;
        const currentRect = currentRects[index];

        if (cursorActive) {
          const centreX = currentRect.left + currentRect.width / 2;
          const centreY = currentRect.top + currentRect.height / 2;
          const closestX = Math.min(currentRect.right, Math.max(currentRect.left, cursorX));
          const closestY = Math.min(currentRect.bottom, Math.max(currentRect.top, cursorY));
          const edgeDistance = Math.hypot(closestX - cursorX, closestY - cursorY);

          if (edgeDistance < repulsionRadius) {
            const proximity = 1 - edgeDistance / repulsionRadius;
            const force = Math.pow(proximity, 1.7) * 2.8;
            let deltaX = centreX - cursorX;
            let deltaY = centreY - cursorY;
            let directionLength = Math.hypot(deltaX, deltaY);
            if (directionLength < 1) {
              deltaX = Math.cos(index * 2.1);
              deltaY = Math.sin(index * 2.1);
              directionLength = 1;
            }
            particle.vx += (deltaX / directionLength) * force;
            particle.vy += (deltaY / directionLength) * force;
            particle.spin += (deltaX >= 0 ? 1 : -1) * force * .006;
            targetScaleX = 1 + proximity * .14;
            targetScaleY = 1 - proximity * .045;
          }
        }

        targetScaleX += Math.min(Math.abs(particle.vx) * .012, .08);
        targetScaleY += Math.min(Math.abs(particle.vy) * .012, .08);
        particle.scaleX += (targetScaleX - particle.scaleX) * .22;
        particle.scaleY += (targetScaleY - particle.scaleY) * .22;

        const speed = Math.hypot(particle.vx, particle.vy);
        if (speed > maximumSpeed) {
          particle.vx = particle.vx / speed * maximumSpeed;
          particle.vy = particle.vy / speed * maximumSpeed;
        }

        const previousX = particle.x;
        const previousY = particle.y;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.angle += particle.spin;
        particle.vx *= .978;
        particle.vy *= .978;
        particle.spin *= .975;

        const movedLeft = currentRect.left + particle.x - previousX;
        const movedRight = currentRect.right + particle.x - previousX;
        const movedTop = currentRect.top + particle.y - previousY;
        const movedBottom = currentRect.bottom + particle.y - previousY;
        const availableWidth = fieldRight - fieldLeft;

        if (currentRect.width >= availableWidth) {
          const centredLeft = fieldLeft + (availableWidth - currentRect.width) / 2;
          particle.x += centredLeft - movedLeft;
          particle.vx *= .72;
        } else if (movedLeft < fieldLeft) {
          particle.x += fieldLeft - movedLeft;
          particle.vx = Math.abs(particle.vx) * bounce;
          particle.scaleX = coarsePointer ? 1.055 : 1.08;
          particle.scaleY = coarsePointer ? .965 : .94;
        } else if (movedRight > fieldRight) {
          particle.x -= movedRight - fieldRight;
          particle.vx = -Math.abs(particle.vx) * bounce;
          particle.scaleX = coarsePointer ? 1.055 : 1.08;
          particle.scaleY = coarsePointer ? .965 : .94;
        }
        if (movedTop < fieldTop) {
          particle.y += fieldTop - movedTop;
          particle.vy = Math.abs(particle.vy) * bounce;
          particle.scaleX = coarsePointer ? .97 : .95;
          particle.scaleY = coarsePointer ? 1.055 : 1.08;
        } else if (movedBottom > fieldBottom) {
          particle.y -= movedBottom - fieldBottom;
          particle.vy = -Math.abs(particle.vy) * bounce;
          particle.scaleX = coarsePointer ? .97 : .95;
          particle.scaleY = coarsePointer ? 1.055 : 1.08;
        }

        particle.element.style.setProperty('--float-x', `${particle.x}px`);
        particle.element.style.setProperty('--float-y', `${particle.y}px`);
        particle.element.style.setProperty('--float-r', `${particle.angle}deg`);
        particle.element.style.setProperty('--float-sx', `${particle.scaleX}`);
        particle.element.style.setProperty('--float-sy', `${particle.scaleY}`);
      });

      frame = requestAnimationFrame(moveParticles);
    };

    const setupFrame = requestAnimationFrame(() => {
      positionParticles();
    });
    hero.addEventListener('pointermove', onPointerMove, { passive: true });
    hero.addEventListener('pointerleave', onPointerLeave);
    addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(setupFrame);
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', onPointerLeave);
      removeEventListener('resize', onResize);
      hero.classList.remove('is-floating');
    };
  }, [ordered]);

  return (
    <section ref={heroRef} className={`hero hero--hierarchy ${ordered ? 'is-ordered' : 'is-unordered'}`} aria-labelledby="hero-title">
      <div className="rule rule--double hero__start-rule" aria-hidden="true"><i></i><i></i></div>

      <div className="hero__title" id="hero-title">
        <div className="mask hero__name hero__name--first" data-hierarchy-float><h1 data-load>mohd</h1></div>
        <div className="mask hero__name hero__name--middle" data-hierarchy-float><h1 data-load>muzammil</h1></div>
        <div className="mask hero__name hero__name--last" data-hierarchy-float><h1 data-load>ansari</h1></div>
      </div>

      <div className="hero__hierarchy-control">
        <button
          className="hero__hierarchy-toggle"
          type="button"
          aria-pressed={ordered}
          onClick={() => setOrdered((current) => !current)}
          data-magnetic
        >
          <span>{ordered ? 'remove visual hierarchy' : 'add visual hierarchy'}</span>
          <i className="hero__hierarchy-icon" aria-hidden="true"><b></b><b></b><b></b></i>
        </button>
      </div>

      <div className="hero__meta" data-reveal>
        <p data-hierarchy-float>brand &amp; ui/ux designer</p>
        <b aria-hidden="true" data-hierarchy-float>*</b>
        <p data-hierarchy-float>ui/ux · brand identity · logo designing · packaging</p>
        <b aria-hidden="true" data-hierarchy-float>*</b>
        <p data-hierarchy-float>mumbai · working worldwide</p>
      </div>

      <div className="rule rule--double hero__end-rule" aria-hidden="true"><i></i><i></i></div>
      <div className="hero__coil" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => <i key={index}></i>)}
      </div>
    </section>
  );
}
