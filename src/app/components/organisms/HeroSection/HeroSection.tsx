import { defineComponent, PropType } from 'vue'
import Button from '../../atoms/Button/Button'
import './HeroSection.scss'

export interface HeroProfile {
  name: string
  title: string
  bio: string
  avatar: string
  links: {
    linkedin: string
    resume: string
    email: string
  }
}

const STATS = [
  { val: '6+', label: 'Years shipping' },
  { val: '3', label: 'Products launched' },
  { val: '2M+', label: 'Users impacted' },
]

export default defineComponent({
  name: 'HeroSection',
  props: {
    profile: { type: Object as PropType<HeroProfile>, required: true },
  },
  setup(props) {
    return () => (
      <section class="hero-section">
        <div class="hero-section__inner container">

          <div class="hero-section__left">
            <div class="hero-section__eyebrow">
              <span class="hero-section__dot" />
              Product Manager
            </div>
            <h1 class="hero-section__name">{props.profile.name}</h1>
            <p class="hero-section__bio">{props.profile.bio}</p>

            <div class="hero-section__actions">
              <Button href="/work" label="View case studies" variant="primary" />
              <Button
                href={props.profile.links.linkedin}
                label="LinkedIn ↗"
                variant="ghost"
              />
            </div>

            <div class="hero-section__stats">
              {STATS.map(s => (
                <div key={s.val} class="hero-section__stat">
                  <span class="hero-section__stat-val">{s.val}</span>
                  <span class="hero-section__stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div class="hero-section__right">
            <div class="hero-section__avatar-wrap">
              <img
                alt={`${props.profile.name} portrait`}
                class="hero-section__avatar"
                src={props.profile.avatar}
              />
            </div>
            <div class="hero-section__card">
              <div class="hero-section__card-dot hero-section__card-dot--green" />
              <span>Open to opportunities</span>
            </div>
          </div>

        </div>
      </section>
    )
  },
})
