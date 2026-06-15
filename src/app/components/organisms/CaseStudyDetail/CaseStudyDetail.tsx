import { defineComponent, PropType, ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import './CaseStudyDetail.scss'

// ── Section type interfaces ──────────────────────────────────────────────────

interface TextSection {
  type: 'text'
  heading: string
  body: string
}

interface ImageSection {
  type: 'image'
  src: string
  caption: string
}

interface MetricsSection {
  type: 'metrics'
  items: string[]
}

interface StatGridSection {
  type: 'stat-grid'
  variant?: 'green'
  items: Array<{ val: string; label: string }>
}

interface QuoteSection {
  type: 'quote'
  text: string
  cite?: string
}

interface CalloutSection {
  type: 'callout'
  label: string
  body: string
  variant?: 'muted'
}

interface ContrastSection {
  type: 'contrast'
  before: { title: string; items: string[] }
  after: { title: string; items: string[] }
}

interface StepsSection {
  type: 'steps'
  items: Array<{ title: string; desc: string }>
}

type CaseSection =
  | TextSection
  | ImageSection
  | MetricsSection
  | StatGridSection
  | QuoteSection
  | CalloutSection
  | ContrastSection
  | StepsSection

export interface CaseStudy {
  slug: string
  title: string
  company: string
  year: string
  duration?: string
  role?: string
  team?: string
  tags: string[]
  summary?: string
  outcomes?: string[]
  sections: CaseSection[]
}

// ── Component ────────────────────────────────────────────────────────────────

export default defineComponent({
  name: 'CaseStudyDetail',
  props: {
    caseStudy: { type: Object as PropType<CaseStudy>, required: true },
  },
  setup(props) {
    // Derive nav sections from text sections
    const navSections = computed(() =>
      props.caseStudy.sections
        .filter((s): s is TextSection => s.type === 'text')
        .map((s, i) => ({
          id: `cs-section-${i}`,
          label: s.heading,
          num: String(i + 1).padStart(2, '0'),
        }))
    )

    const activeSection = ref<string>('cs-cover')
    const progressWidth = ref('0%')
    let scrollHandler: (() => void) | null = null

    onMounted(() => {
      const sectionIds = ['cs-cover', ...navSections.value.map(s => s.id)]

      scrollHandler = () => {
        const scrollTop = window.scrollY
        const docH = document.documentElement.scrollHeight - window.innerHeight
        progressWidth.value = docH > 0 ? `${(scrollTop / docH) * 100}%` : '0%'

        let current = sectionIds[0]
        sectionIds.forEach(id => {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= 100) current = id
        })
        activeSection.value = current
      }

      window.addEventListener('scroll', scrollHandler, { passive: true })
      scrollHandler()
    })

    onUnmounted(() => {
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
    })

    // ── Section renderers ──────────────────────────────────────────────────

    const renderSection = (section: CaseSection, index: number) => {
      if (section.type === 'text') {
        const nav = navSections.value.find(n => n.label === section.heading)
        return (
          <div key={index} id={nav?.id} class="csd-section">
            <div class="csd-section__label">
              {nav ? `${nav.num} — ${section.heading}` : section.heading}
            </div>
            <h2 class="csd-section__heading">{section.heading}</h2>
            <p class="csd-section__body">{section.body}</p>
          </div>
        )
      }

      if (section.type === 'image') {
        return (
          <figure key={index} class="csd-figure">
            <img alt={section.caption} class="csd-figure__img" src={section.src} />
            <figcaption class="csd-figure__caption">{section.caption}</figcaption>
          </figure>
        )
      }

      if (section.type === 'metrics') {
        return (
          <div key={index} class="csd-metrics-chips">
            {section.items.map(item => (
              <span key={item} class="csd-metrics-chips__chip">{item}</span>
            ))}
          </div>
        )
      }

      if (section.type === 'stat-grid') {
        return (
          <div key={index} class={`csd-stat-grid${section.variant === 'green' ? ' csd-stat-grid--green' : ''}`}>
            {section.items.map(item => (
              <div key={item.val} class="csd-stat">
                <div class="csd-stat__val">{item.val}</div>
                <div class="csd-stat__lbl">{item.label}</div>
              </div>
            ))}
          </div>
        )
      }

      if (section.type === 'quote') {
        return (
          <blockquote key={index} class="csd-quote">
            <p>"{section.text}"</p>
            {section.cite ? <cite>— {section.cite}</cite> : null}
          </blockquote>
        )
      }

      if (section.type === 'callout') {
        return (
          <div key={index} class={`csd-callout${section.variant === 'muted' ? ' csd-callout--muted' : ''}`}>
            <div class="csd-callout__label">{section.label}</div>
            <p>{section.body}</p>
          </div>
        )
      }

      if (section.type === 'contrast') {
        return (
          <div key={index} class="csd-contrast">
            <div class="csd-contrast__card csd-contrast__card--before">
              <div class="csd-contrast__label">Before</div>
              <div class="csd-contrast__title">{section.before.title}</div>
              <ul>
                {section.before.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div class="csd-contrast__card csd-contrast__card--after">
              <div class="csd-contrast__label">After</div>
              <div class="csd-contrast__title">{section.after.title}</div>
              <ul>
                {section.after.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        )
      }

      if (section.type === 'steps') {
        return (
          <div key={index} class="csd-steps">
            {section.items.map((item, i) => (
              <div key={i} class="csd-step">
                <div class="csd-step__num">{i + 1}</div>
                <div class="csd-step__content">
                  <div class="csd-step__title">{item.title}</div>
                  <div class="csd-step__desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )
      }

      return null
    }

    // ── Template ───────────────────────────────────────────────────────────

    return () => {
      const cs = props.caseStudy
      return (
        <article class="csd">
          {/* Progress bar */}
          <div class="csd__progress">
            <div class="csd__progress-fill" style={{ width: progressWidth.value }} />
          </div>

          {/* Sidebar */}
          <aside class="csd__sidebar">
            <div class="csd__sidebar-inner">
              <RouterLink class="csd__back" to="/work">← All work</RouterLink>

              <div class="csd__sidebar-brand">
                <div class="csd__sidebar-eyebrow">Case study · {cs.year}</div>
                <div class="csd__sidebar-title">{cs.title}</div>
                <div class="csd__sidebar-company">{cs.company}</div>
              </div>

              <nav class="csd__nav">
                <div class="csd__nav-label">Contents</div>
                <ul class="csd__nav-list">
                  <li>
                    <a
                      class={`csd__nav-link${activeSection.value === 'cs-cover' ? ' csd__nav-link--active' : ''}`}
                      href="#cs-cover"
                    >
                      <span class="csd__nav-num">00</span>
                      <span class="csd__nav-text">Overview</span>
                    </a>
                  </li>
                  {navSections.value.map(section => (
                    <li key={section.id}>
                      <a
                        class={`csd__nav-link${activeSection.value === section.id ? ' csd__nav-link--active' : ''}`}
                        href={`#${section.id}`}
                      >
                        <span class="csd__nav-num">{section.num}</span>
                        <span class="csd__nav-text">{section.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div class="csd__sidebar-footer">
                {cs.role ? (
                  <>
                    <div class="csd__sidebar-footer-label">Role</div>
                    <div class="csd__sidebar-footer-val">{cs.role}</div>
                  </>
                ) : null}
                {cs.team ? (
                  <>
                    <div class="csd__sidebar-footer-label" style={{ marginTop: '12px' }}>Team</div>
                    <div class="csd__sidebar-footer-val">{cs.team}</div>
                  </>
                ) : null}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main class="csd__main">
            {/* Cover */}
            <div class="csd__cover" id="cs-cover">
              <div class="csd__cover-grid" />
              <div class="csd__cover-glow" />
              <div class="csd__cover-inner">
                <div class="csd__cover-eyebrow">
                  {cs.tags.join(' · ')}
                </div>
                <h1 class="csd__cover-title">{cs.title}</h1>
                {cs.summary ? <p class="csd__cover-sub">{cs.summary}</p> : null}
                <div class="csd__cover-meta">
                  <div class="csd__cover-meta-item">
                    <span class="csd__cover-meta-lbl">Company</span>
                    <span class="csd__cover-meta-val">{cs.company}</span>
                  </div>
                  <div class="csd__cover-meta-item">
                    <span class="csd__cover-meta-lbl">Year</span>
                    <span class="csd__cover-meta-val">{cs.year}</span>
                  </div>
                  {cs.duration ? (
                    <div class="csd__cover-meta-item">
                      <span class="csd__cover-meta-lbl">Duration</span>
                      <span class="csd__cover-meta-val">{cs.duration}</span>
                    </div>
                  ) : null}
                </div>
                {cs.outcomes ? (
                  <div class="csd__outcomes">
                    {cs.outcomes.map(o => (
                      <div key={o} class="csd__outcome">{o}</div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Sections */}
            <div class="csd__content">
              {cs.sections.map((section, i) => renderSection(section, i))}
            </div>
          </main>
        </article>
      )
    }
  },
})
