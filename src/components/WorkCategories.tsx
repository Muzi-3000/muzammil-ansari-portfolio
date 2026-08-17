import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Fragment, useRef, useState } from 'react';

type Project = {
  title: string;
  description: string;
  mark: string;
  plate: 'lines' | 'blocks' | 'type';
  discipline: string;
  action: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  href?: string;
  status?: string;
};

const categories: ReadonlyArray<{
  id: string;
  label: string;
  meta: string;
  summary: string;
  projects: ReadonlyArray<Project>;
}> = [
  {
    id: 'ui-ux',
    label: 'UI/UX',
    meta: 'interfaces · apps · responsive systems',
    summary: 'Digital products shaped around clear flows, useful interaction and the way people actually move through a task.',
    projects: [
      {
        title: 'TWPAYZ Website',
        description: 'A complete website design created in Figma for TWPAYZ, shaped around a clear structure and a smooth digital experience.',
        mark: 'TW',
        plate: 'lines',
        discipline: 'website design · figma',
        action: 'figma preview to be added',
        thumbnail: '/images/projects/twpayz-website-v2.webp',
        thumbnailAlt: 'TWPAYZ website design shown on a desktop monitor',
        href: '/work/twpayz-website',
        status: 'website design concept',
      },
      {
        title: 'My Swanand Pathology',
        description: 'An end-to-end app interface for My Swanand Pathology Center, designed to make the service easier to understand and use.',
        mark: 'MS',
        plate: 'blocks',
        discipline: 'app design · ui/ux',
        action: 'view app case study',
        thumbnail: '/images/projects/my-swanand-pathology-v2.webp',
        thumbnailAlt: 'My Swanand Pathology mobile app interface screens',
        href: '/work/swanand-pathology-app',
        status: 'mobile app redesign concept',
      },
    ],
  },
  {
    id: 'brand-identities',
    label: 'Brand Identities',
    meta: 'identity systems · logos · guidelines',
    summary: 'Visual identities built from a clear idea, then extended into coherent systems with room to grow.',
    projects: [
      {
        title: 'VisionSpace Realty',
        description: 'A detailed identity guideline for a real estate agency, covering brand voice, logo usage, marks, colour theory and visual discipline.',
        mark: 'VS',
        plate: 'blocks',
        discipline: 'real estate · brand guidelines',
        action: 'view identity case study',
        thumbnail: '/images/projects/vision-space-reality.webp',
        thumbnailAlt: 'VisionSpace Realty brand identity thumbnail',
        href: '/work/visionspace-realty',
        status: 'brand identity system',
      },
      {
        title: 'Prime Charge',
        description: 'A brand guideline for an EV charging company, bringing its logo, colour palette and typography into one consistent system.',
        mark: 'PC',
        plate: 'lines',
        discipline: 'ev brand · guidelines',
        action: 'brand document to be added',
        thumbnail: '/images/projects/prime-charge.webp',
        thumbnailAlt: 'Prime Charge brand identity thumbnail',
      },
    ],
  },
  {
    id: 'logo-designing',
    label: 'Logo Designing',
    meta: 'marks · symbols · visual signatures',
    summary: 'Distinctive logo ideas shaped into clear, memorable marks with the flexibility to work across every scale.',
    projects: [
      {
        title: 'RR Dhaba',
        description: 'A restaurant logo that turns mirrored initials, a domed silhouette, dining cutlery and botanical details into one memorable emblem.',
        mark: 'RR',
        plate: 'type',
        discipline: 'restaurant · logo design',
        action: 'view logo case study',
        thumbnail: '/images/projects/rr-dhaba.webp',
        thumbnailAlt: 'RR Dhaba restaurant logo with mirrored R forms, cutlery and leaves',
        href: '/work/rr-dhaba',
        status: 'logo design concept',
      },
      {
        title: 'The Cleeds',
        description: 'A minimal organic-seed logo that hides a seed bucket inside customised lettering, balancing playful character with calm credibility.',
        mark: 'TC',
        plate: 'type',
        discipline: 'organic seeds · logo design',
        action: 'view logo case study',
        thumbnail: '/images/projects/the-cleeds.webp',
        thumbnailAlt: 'The Cleeds organic seed company logo in dark and pale green',
        href: '/work/the-cleeds',
        status: 'logo design concept',
      },
    ],
  },
  {
    id: 'packaging',
    label: 'Packaging',
    meta: 'packs · labels · printed touchpoints',
    summary: 'Packaging that balances shelf presence, clear information and the character of the brand.',
    projects: [],
  },
];

export default function WorkCategories() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const railRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rhythmRefs = useRef<Record<string, { last: number; timer: number }>>({});

  const toggleCategory = (id: string) => {
    setActiveId((current) => current === id ? null : id);
  };

  const moveRail = (id: string, direction: -1 | 1) => {
    const rail = railRefs.current[id];
    if (!rail) return;
    rail.scrollBy({ left: rail.clientWidth * 0.72 * direction, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const moveRhythm = (id: string, rail: HTMLDivElement) => {
    const rhythm = rhythmRefs.current[id] ?? { last: rail.scrollLeft, timer: 0 };
    const distance = rail.scrollLeft - rhythm.last;
    rhythm.last = rail.scrollLeft;
    rail.style.setProperty('--rhythm-shift', `${Math.max(-26, Math.min(26, distance * .42))}px`);
    rail.style.setProperty('--rhythm-counter-shift', `${Math.max(-18, Math.min(18, distance * -.23))}px`);
    rail.classList.add('is-rhythm-moving');
    window.clearTimeout(rhythm.timer);
    rhythm.timer = window.setTimeout(() => {
      rail.style.setProperty('--rhythm-shift', '0px');
      rail.style.setProperty('--rhythm-counter-shift', '0px');
      rail.classList.remove('is-rhythm-moving');
    }, 130);
    rhythmRefs.current[id] = rhythm;
  };

  return (
    <div className="work-browser">
      <div className="work-principles" aria-label="Design principles demonstrated by the work browser">
        <div><span>04 / similarity</span><p>hover or open a discipline to see a shared visual family</p></div>
        <div><span>05 / rhythm + repetition</span><p>open an archive, then drag or scroll to change its cadence</p></div>
      </div>
      <motion.div className={`work-categories${hoveredId ? ' has-similarity-focus' : ''}`} layout aria-label="Work categories">
        {categories.map((category) => {
          const expanded = activeId === category.id;

          return (
            <Fragment key={category.id}>
              <motion.article
                className={`work-category-shell${expanded ? ' is-active' : ''}${hoveredId === category.id ? ' is-similarity-focus' : ''}${hoveredId && hoveredId !== category.id ? ' is-similarity-muted' : ''}`}
                id={`work-category-${category.id}`}
                layout={!reducedMotion}
                transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  className="work-category"
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`work-projects-${category.id}`}
                  onClick={() => toggleCategory(category.id)}
                  onPointerEnter={() => setHoveredId(category.id)}
                  onPointerLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(category.id)}
                  onBlur={() => setHoveredId(null)}
                >
                  <span>{category.meta}</span>
                  <strong>{category.label}</strong>
                  <i aria-hidden="true">{expanded ? '↖' : '↘'}</i>
                </button>
              </motion.article>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    className="work-category__archive"
                    id={`work-projects-${category.id}`}
                    initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="work-category__archive-inner">
                      <div className="work-category__intro">
                        <span>selected projects</span>
                        <p>{category.summary}</p>
                      </div>

                      {category.projects.length > 1 && (
                        <div className="work-project-controls">
                          <span>05 / rhythm · drag or scroll sideways</span>
                          <div>
                            <button type="button" aria-label={`View previous ${category.label} project`} onClick={() => moveRail(category.id, -1)}>←</button>
                            <button type="button" aria-label={`View next ${category.label} project`} onClick={() => moveRail(category.id, 1)}>→</button>
                          </div>
                        </div>
                      )}

                      <div
                        className={`work-project-grid${category.projects.length === 1 ? ' has-one' : ''}`}
                        ref={(element) => { railRefs.current[category.id] = element; }}
                        onScroll={(event) => moveRhythm(category.id, event.currentTarget)}
                        aria-label={`${category.label} projects`}
                      >
                        {category.projects.length > 0 ? category.projects.map((project) => (
                          <article className="work-project-card" key={project.title}>
                            {project.thumbnail ? (
                              project.href ? (
                                <a className="work-project-card__visual-link" href={project.href} aria-label={`View ${project.title} case study`}>
                                  <div className="work-project-visual work-project-visual--image">
                                    <img
                                      src={project.thumbnail}
                                      alt={project.thumbnailAlt ?? `${project.title} project thumbnail`}
                                      width="2400"
                                      height="1500"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  </div>
                                  <span>view project ↗</span>
                                </a>
                              ) : (
                                <div className="work-project-visual work-project-visual--image">
                                  <img
                                    src={project.thumbnail}
                                    alt={project.thumbnailAlt ?? `${project.title} project thumbnail`}
                                    width="2400"
                                    height="1500"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </div>
                              )
                            ) : (
                              <div className={`work-project-visual work-project-visual--${project.plate}`} aria-hidden="true">
                                <span>{project.discipline}</span>
                                <b>{project.mark}</b>
                                <i>*</i>
                              </div>
                            )}
                            <div className="work-project-card__meta">
                              <span>{project.status ?? 'real project'}</span>
                              <span>{project.href ? 'case study available' : project.action}</span>
                            </div>
                            <h4>{project.href ? <a href={project.href}>{project.title}</a> : project.title}</h4>
                            <p>{project.description}</p>
                          </article>
                        )) : (
                          <div className="work-project-empty">
                            <span>{category.id === 'packaging' ? 'packaging archive' : 'project archive'}</span>
                            <strong>{category.id === 'packaging' ? 'PACKAGING SELECTION IN PROGRESS' : 'SELECTION IN PROGRESS'}</strong>
                            <p>{category.id === 'packaging' ? 'Selected packaging projects will be added as their presentations are prepared.' : 'Selected projects will be added as their presentations are prepared.'}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Fragment>
          );
        })}
      </motion.div>
    </div>
  );
}
