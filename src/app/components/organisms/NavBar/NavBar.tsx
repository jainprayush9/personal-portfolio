import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import profile from '../../../../../data/profile.json'
import ThemeToggle from '../../atoms/ThemeToggle/ThemeToggle.vue'
import './NavBar.scss'

const navLinks = [
  { label: 'CS', to: '/work' },
  { label: 'Work', to: '/resume' },
  { label: 'Blogs', to: '/blogs' },
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
          <RouterLink class="nav-bar__link nav-bar__link--resume" to="/resume">
            Resume
          </RouterLink>
          <ThemeToggle />
        </div>
      </header>
    )
  },
})
