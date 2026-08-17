import { useEffect, useRef, useState } from 'react';
import { animate, inView, stagger } from 'motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function InteractionLayer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const trigger = document.querySelector<HTMLElement>('[data-menu-trigger]');
    const cursor = cursorRef.current;

    let cursorFrame = 0;
    let cursorX = -100;
    let cursorY = -100;
    let targetX = -100;
    let targetY = -100;

    const renderCursor = () => {
      cursorX += (targetX - cursorX) * 0.16;
      cursorY += (targetY - cursorY) * 0.16;
      cursor?.style.setProperty('--cursor-x', `${cursorX}px`);
      cursor?.style.setProperty('--cursor-y', `${cursorY}px`);
      cursorFrame = requestAnimationFrame(renderCursor);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor?.classList.add('is-visible');
      const interactive = (event.target as HTMLElement).closest('a, button, input, [data-magnetic]');
      cursor?.classList.toggle('is-interactive', Boolean(interactive));
    };
    const onPointerDownCursor = () => cursor?.classList.add('is-down');
    const onPointerUpCursor = () => cursor?.classList.remove('is-down');
    const hideCursor = () => cursor?.classList.remove('is-visible', 'is-interactive', 'is-down');

    if (!reduced && finePointer && cursor) {
      cursorFrame = requestAnimationFrame(renderCursor);
      addEventListener('pointermove', onPointerMove, { passive: true });
      addEventListener('pointerdown', onPointerDownCursor, { passive: true });
      addEventListener('pointerup', onPointerUpCursor, { passive: true });
      document.documentElement.addEventListener('mouseleave', hideCursor);
      addEventListener('blur', hideCursor);
    }

    const closeMenu = () => setMenuOpen(false);
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && closeMenu();
    addEventListener('keydown', onKey);

    const echoTimers: number[] = [];
    const onArrowPress = (event: PointerEvent) => {
      if (reduced || !finePointer) return;
      const control = (event.target as HTMLElement).closest<HTMLElement>('a, button');
      const arrow = control?.textContent?.match(/[↗↘↙↖→←↓↑]/)?.[0];
      if (!control || !arrow) return;

      for (let index = 0; index < 3; index += 1) {
        const echo = document.createElement('span');
        echo.className = 'arrow-echo';
        echo.textContent = arrow;
        echo.setAttribute('aria-hidden', 'true');
        echo.style.left = `${event.clientX}px`;
        echo.style.top = `${event.clientY}px`;
        echo.style.setProperty('--echo-i', String(index));
        document.body.append(echo);
        echoTimers.push(window.setTimeout(() => echo.remove(), 950));
      }
    };
    addEventListener('pointerdown', onArrowPress);

    if (!reduced) {
      const loadItems = document.querySelectorAll<HTMLElement>('[data-load]');
      animate(loadItems, { transform: ['translateY(112%)', 'translateY(0%)'], opacity: [0, 1] }, { duration: 1.05, delay: stagger(0.08, { startDelay: 0.12 }), ease });

      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
        inView(element, () => {
          animate(element, { opacity: [0, 1], transform: ['translateY(42px)', 'translateY(0px)'] }, { duration: 0.9, ease });
        }, { margin: '0px 0px -12% 0px' });
      });
    }

    let lenis: { raf: (time: number) => void; destroy: () => void } | undefined;
    let frame = 0;
    if (!reduced && finePointer) {
      import('lenis').then(({ default: Lenis }) => {
        lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.85 });
        const raf = (time: number) => { lenis?.raf(time); frame = requestAnimationFrame(raf); };
        frame = requestAnimationFrame(raf);
      });
    }

    let ticking = false;
    const updateScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = root.scrollHeight - innerHeight;
        root.style.setProperty('--scroll', max > 0 ? `${scrollY / max}` : '0');
        if (!reduced && finePointer) {
          document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
            const rect = el.getBoundingClientRect();
            const amount = Number(el.dataset.parallax || 0);
            el.style.setProperty('--parallax', `${(rect.top - innerHeight / 2) * amount}px`);
          });
        }
        ticking = false;
      });
    };
    addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    const magnetic = document.querySelectorAll<HTMLElement>('[data-magnetic], .text-link');
    const cleanMagnetic: Array<() => void> = [];
    if (!reduced && finePointer) magnetic.forEach((element) => {
      const move = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        element.style.setProperty('--mx', `${(event.clientX - rect.left - rect.width / 2) * 0.08}px`);
        element.style.setProperty('--my', `${(event.clientY - rect.top - rect.height / 2) * 0.12}px`);
      };
      const leave = () => { element.style.setProperty('--mx', '0px'); element.style.setProperty('--my', '0px'); };
      element.addEventListener('mousemove', move);
      element.addEventListener('mouseleave', leave);
      cleanMagnetic.push(() => { element.removeEventListener('mousemove', move); element.removeEventListener('mouseleave', leave); });
    });

    return () => {
      removeEventListener('keydown', onKey);
      removeEventListener('pointerdown', onArrowPress);
      removeEventListener('scroll', updateScroll);
      echoTimers.forEach(clearTimeout);
      document.querySelectorAll('.arrow-echo').forEach((echo) => echo.remove());
      cleanMagnetic.forEach((clean) => clean());
      cancelAnimationFrame(frame);
      cancelAnimationFrame(cursorFrame);
      removeEventListener('pointermove', onPointerMove);
      removeEventListener('pointerdown', onPointerDownCursor);
      removeEventListener('pointerup', onPointerUpCursor);
      document.documentElement.removeEventListener('mouseleave', hideCursor);
      removeEventListener('blur', hideCursor);
      lenis?.destroy();
      trigger?.setAttribute('aria-expanded', 'false');
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    document.querySelector('[data-menu-trigger]')?.setAttribute('aria-expanded', String(menuOpen));
  }, [menuOpen]);

  return (
    <>
      <div ref={cursorRef} className="cursor-ring" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <button className="menu-capture" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)} />
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          <a href="/#about" onClick={() => setMenuOpen(false)}>about</a>
          <a href="/#work" onClick={() => setMenuOpen(false)}>work</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)}>contact</a>
        </nav>
        <p>independent designer<br />india · working worldwide</p>
      </div>
    </>
  );
}
