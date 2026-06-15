import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import CaseStudiesPage from './pages/CaseStudiesPage.vue'
import WorkPage from './pages/WorkPage.vue'
import CaseStudyPage from './pages/CaseStudyPage.vue'
import AboutPage from './pages/AboutPage.vue'
import ContactPage from './pages/ContactPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/work', component: CaseStudiesPage },
    { path: '/work/:slug', component: CaseStudyPage },
    { path: '/resume', component: WorkPage },
    { path: '/about', component: AboutPage },
    { path: '/contact', component: ContactPage },
  ],
})
