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
      },
      {
        title: 'My Swanand Pathology',
        description: 'An end-to-end app interface for My Swanand Pathology Center, designed to make the service easier to understand and use.',
        mark: 'MS',
        plate: 'blocks',
        discipline: 'app design · ui/ux',
        action: 'case study to be added',
        thumbnail: '/images/projects/my-swanand-pathology-v2.webp',
        thumbnailAlt: 'My Swanand Pathology mobile app interface screens',
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
        title: 'VisionSpace Reality',
        description: 'A detailed identity guideline for a real estate agency, covering brand voice, logo usage, marks, colour theory and visual discipline.',
        mark: 'VS',
        plate: 'blocks',
        discipline: 'real estate · brand guidelines',
        action: 'brand document to be added',
        thumbnail: '/images/projects/vision-space-reality.webp',
        thumbnailAlt: 'VisionSpace Reality brand identity thumbnail',
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
      {
        title: 'RR Dhaba',
        description: 'An early restaurant identity project covering the logo, colour palette, typography, banners and menu design.',
        mark: 'RR',
        plate: 'type',
        discipline: 'identity · menu · banners',
        action: 'case study to be added',
        thumbnail: '/images/projects/rr-dhaba.webp',
        thumbnailAlt: 'RR Dhaba restaurant identity thumbnail',
      },
    ],
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    meta: 'social · posters · restaurant campaigns',
    summary: 'Campaign thinking translated across formats, from one visual direction to a complete content system.',
    projects: [],
  },
  {
    id: 'packaging',
    label: 'Packaging',
    meta: 'packs · labels · printed touchpoints',
    summary: 'Packaging that balances shelf presence, clear information and the character of the brand.',
    projects: [
      {
        title: 'The Cleeds',
        description: 'Logo development and packaging design for a seed brand, organising its range clearly while building a consistent shelf presence.',
        mark: 'TC',
        plate: 'type',
        discipline: 'seed packaging · identity',
        action: 'packaging case study to be added',
      },
    ],
  },
];

export default function WorkCategories() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const railRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleCategory = (id: string) => {
    setActiveId((current) => current === id ? null : id);
  };

  const moveRail = (id: string, direction: -1 | 1) => {
    const rail = railRefs.current[id];
    if (!rail) return;
    rail.scrollBy({ left: rail.clientWidth * 0.72 * direction, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className="work-browser">
      <motion.div className="work-categories" layout aria-label="Work categories">
        {categories.map((category) => {
          const expanded = activeId === category.id;

          return (
            <Fragment key={category.id}>
              <motion.article
                className={`work-category-shell${expanded ? ' is-active' : ''}`}
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
                          <span>project archive · drag or scroll sideways</span>
                          <div>
                            <button type="button" aria-label={`View previous ${category.label} project`} onClick={() => moveRail(category.id, -1)}>←</button>
                            <button type="button" aria-label={`View next ${category.label} project`} onClick={() => moveRail(category.id, 1)}>→</button>
                          </div>
                        </div>
                      )}

                      <div
                        className={`work-project-grid${category.projects.length === 1 ? ' has-one' : ''}`}
                        ref={(element) => { railRefs.current[category.id] = element; }}
                        aria-label={`${category.label} projects`}
                      >
                        {category.projects.length > 0 ? category.projects.map((project) => (
                          <article className="work-project-card" key={project.title}>
                            {project.thumbnail ? (
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
                            ) : (
                              <div className={`work-project-visual work-project-visual--${project.plate}`} aria-hidden="true">
                                <span>{project.discipline}</span>
                                <b>{project.mark}</b>
                                <i>*</i>
                              </div>
                            )}
                            <div className="work-project-card__meta">
                              <span>real project</span>
                              <span>{project.action}</span>
                            </div>
                            <h4>{project.title}</h4>
                            <p>{project.description}</p>
                          </article>
                        )) : (
                          <div className="work-project-empty">
                            <span>campaign archive</span>
                            <strong>POSTER SELECTION IN PROGRESS</strong>
                            <p>Campaign projects will be added after the final poster selection is ready.</p>
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
