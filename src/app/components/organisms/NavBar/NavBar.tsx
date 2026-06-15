import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import profile from '../../../../../data/profile.json'
import ThemeToggle from '../../atoms/ThemeToggle/ThemeToggle.vue'
import './NavBar.scss'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default defineComponent({
  name: 'NavBar',
  components: { ThemeToggle },
  setup() {
    return () => (
      <header class="nav-bar">
        <RouterLink class="nav-bar__logo" to="/">
          {profile.name}
        </RouterLink>
        <div class="nav-bar__right">
          <nav class="nav-bar__links">
            {navLinks.map((link) => (
              <RouterLink key={link.to} class="nav-bar__link" to={link.to}>
                {link.label}
              </RouterLink>
            ))}
          </nav>
          {profile.links?.resume ? (
            <a class="nav-bar__cta" href={profile.links.resume} target="_blank" rel="noopener noreferrer">
              Resume ↗
            </a>
          ) : null}
          <ThemeToggle />
        </div>
      </header>
    )
  },
})
