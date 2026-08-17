import { useEffect } from 'react';

const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));

export default function DesignPrinciples() {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups: Array<() => void> = [];

    const mindset = document.querySelector<HTMLElement>('[data-contrast-section]');
    const contrastRange = mindset?.querySelector<HTMLInputElement>('[data-contrast-range]');
    if (mindset && contrastRange) {
      const setContrast = () => {
        mindset.style.setProperty('--contrast-x', `${contrastRange.value}%`);
        mindset.classList.add('has-contrast-experience');
      };
      mindset.style.setProperty('--contrast-x', `${contrastRange.value}%`);
      contrastRange.addEventListener('input', setContrast);
      cleanups.push(() => contrastRange.removeEventListener('input', setContrast));
    }

    const contact = document.querySelector<HTMLElement>('[data-balance-section]');
    const contactMain = contact?.querySelector<HTMLElement>('.contact__main');
    const balanceRange = contact?.querySelector<HTMLInputElement>('[data-balance-range]');
    const balanceReadout = contact?.querySelector<HTMLElement>('[data-balance-readout]');
    if (contact && contactMain && balanceRange && balanceReadout) {
      let experienced = false;
      const setBalance = (value: number, markExperienced = true) => {
        const normalized = clamp(value, -100, 100) / 100;
        contact.style.setProperty('--balance', String(normalized));
        contact.style.setProperty('--balance-title-x', `${normalized * 42}px`);
        contact.style.setProperty('--balance-title-tilt', `${normalized * -1.35}deg`);
        contact.style.setProperty('--balance-star-x', `${normalized * -78}px`);
        contact.style.setProperty('--balance-star-tilt', `${normalized * 24}deg`);
        balanceRange.value = String(Math.round(normalized * 100));
        if (markExperienced) experienced = true;
        const balanced = Math.abs(normalized) < .1;
        contact.classList.toggle('is-balanced', experienced && balanced);
        balanceReadout.textContent = !experienced
          ? 'move to shift visual weight'
          : balanced
            ? 'equilibrium found'
            : normalized < 0 ? 'weight leaning left' : 'weight leaning right';
      };
      const onRange = () => setBalance(Number(balanceRange.value));
      const onMove = (event: PointerEvent) => {
        if (!finePointer || reduced) return;
        const rect = contactMain.getBoundingClientRect();
        setBalance(((event.clientX - rect.left) / rect.width * 2 - 1) * 100);
      };
      const onLeave = () => {
        if (!finePointer || reduced) return;
        setBalance(0, experienced);
      };
      setBalance(0, false);
      balanceRange.addEventListener('input', onRange);
      contactMain.addEventListener('pointermove', onMove, { passive: true });
      contactMain.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        balanceRange.removeEventListener('input', onRange);
        contactMain.removeEventListener('pointermove', onMove);
        contactMain.removeEventListener('pointerleave', onLeave);
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
