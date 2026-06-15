<template>
  <div class="work-page container">

    <!-- ── Hero card ─────────────────────────────────────────────────── -->
    <div class="wp-hero reveal">
      <div class="wp-hero__left">
        <div class="wp-hero__badge">Professional Hub</div>
        <h1 class="wp-hero__name">{{ profile.name }}</h1>
        <div class="wp-hero__title">{{ profile.title }}</div>
        <div class="wp-hero__specs">
          <span v-for="(s, i) in workPage.specializations" :key="i" class="wp-hero__spec">
            {{ s }}<span v-if="i < workPage.specializations.length - 1" class="wp-hero__dot"> · </span>
          </span>
        </div>
        <div class="wp-hero__location">{{ profile.location }}</div>
        <div class="wp-hero__actions">
          <a class="wp-hero__btn wp-hero__btn--primary" :href="profile.links.resume" target="_blank" download>
            Download resume
          </a>
          <RouterLink class="wp-hero__btn wp-hero__btn--ghost" to="/work#case-studies">
            Case studies
          </RouterLink>
        </div>
      </div>
      <div class="wp-hero__right">
        <img :src="profile.avatar" :alt="profile.name" class="wp-hero__avatar" />
      </div>
    </div>

    <!-- ── Body: main + sidebar ──────────────────────────────────────── -->
    <div class="wp-body">

      <main class="wp-main">

        <!-- About -->
        <section class="wp-section reveal">
          <h2 class="wp-section__title">About</h2>
          <div class="wp-about">
            <div class="wp-about__bio">
              <p>{{ workPage.about.bio }}</p>
              <div class="wp-about__group">
                <div class="wp-about__label">What I bring</div>
                <ul>
                  <li v-for="(b, i) in workPage.about.whatIBring" :key="i">{{ b }}</li>
                </ul>
              </div>
              <div class="wp-about__group">
                <div class="wp-about__label">Domains</div>
                <ul>
                  <li v-for="(d, i) in workPage.about.domains" :key="i">{{ d }}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Featured case study -->
        <section class="wp-section reveal" id="case-studies">
          <h2 class="wp-section__title">Featured case study</h2>
          <RouterLink :to="`/work/${workList[0].slug}`" class="wp-featured">
            <div class="wp-featured__meta">
              <span class="wp-featured__badge">Featured case study</span>
              <span class="wp-featured__cat">Product Management</span>
            </div>
            <div class="wp-featured__title">{{ workList[0].company }} | {{ workList[0].title }}</div>
            <div class="wp-featured__metrics">
              <span v-for="m in workList[0].metrics" :key="m" class="wp-featured__metric">{{ m }}</span>
            </div>
            <div class="wp-featured__cta">Read case study →</div>
          </RouterLink>
          <div class="wp-all-cs">
            <RouterLink to="/work#all" class="wp-all-cs__link">All case studies →</RouterLink>
          </div>
        </section>

        <!-- All case studies grid -->
        <section id="all">
          <CaseStudyGrid :items="workList" />
        </section>

        <!-- Experience -->
        <section class="wp-section reveal">
          <h2 class="wp-section__title">Experience</h2>
          <div class="wp-exp-list">
            <div v-for="(job, i) in workPage.experience" :key="i" class="wp-exp">
              <div class="wp-exp__logo" :style="{ background: job.color + '18', color: job.color }">
                {{ job.initials }}
              </div>
              <div class="wp-exp__body">
                <div class="wp-exp__top">
                  <div>
                    <div class="wp-exp__role">{{ job.role }} · {{ job.company }}</div>
                    <div class="wp-exp__meta">{{ job.location }}</div>
                  </div>
                  <div class="wp-exp__dur">{{ job.duration }}</div>
                </div>
                <ul class="wp-exp__bullets">
                  <li v-for="(b, j) in job.bullets" :key="j">{{ b }}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Skills -->
        <section class="wp-section reveal">
          <h2 class="wp-section__title">Skills</h2>
          <div class="wp-skills">
            <div v-for="(group, i) in workPage.skills" :key="i" class="wp-skill-group">
              <div class="wp-skill-group__cat">{{ group.category }}</div>
              <div class="wp-skill-group__desc">{{ group.desc }}</div>
              <div class="wp-skill-group__tags">
                <span v-for="tag in group.tags" :key="tag" class="wp-skill-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Recommendations -->
        <section class="wp-section reveal">
          <h2 class="wp-section__title">Recommendations</h2>
          <div class="wp-recs">
            <div v-for="(rec, i) in workPage.recommendations" :key="i" class="wp-rec">
              <p class="wp-rec__quote">{{ rec.quote }}</p>
              <div class="wp-rec__attr">
                <span class="wp-rec__name">{{ rec.name }}</span>
                <span class="wp-rec__title">{{ rec.title }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Education -->
        <section class="wp-section reveal">
          <h2 class="wp-section__title">Education</h2>
          <div v-for="(edu, i) in workPage.education" :key="i" class="wp-edu">
            <div class="wp-edu__degree">{{ edu.degree }}</div>
            <div class="wp-edu__school">{{ edu.school }} · {{ edu.year }}</div>
          </div>
        </section>

      </main>

      <!-- Sticky sidebar -->
      <aside class="wp-sidebar">
        <div class="wp-sidebar__card">
          <div class="wp-sidebar__label">Contact</div>
          <p class="wp-sidebar__desc">Best for hiring managers and collaborators. Fill in to update.</p>
          <div class="wp-sidebar__field">Email</div>
          <a :href="`mailto:${profile.links.email}`" class="wp-sidebar__val wp-sidebar__val--accent">
            {{ profile.links.email }}
          </a>
          <div class="wp-sidebar__field">LinkedIn</div>
          <a :href="profile.links.linkedin" target="_blank" class="wp-sidebar__val wp-sidebar__val--accent">
            {{ profile.links.linkedin.replace('https://', '') }}
          </a>
        </div>
        <div class="wp-sidebar__card">
          <div class="wp-sidebar__label">See also</div>
          <div class="wp-sidebar__links">
            <RouterLink to="/" class="wp-sidebar__slink">home</RouterLink>
            <RouterLink to="/contact" class="wp-sidebar__slink">contact</RouterLink>
            <RouterLink to="/blogs" class="wp-sidebar__slink">blogs</RouterLink>
          </div>
        </div>
      </aside>

    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useReveal } from '../app/composables/useReveal'
import profile from '../../data/profile.json'
import workList from '../../data/work.json'
import workPage from '../../data/work-page.json'
import CaseStudyGrid from '../app/components/organisms/CaseStudyGrid/CaseStudyGrid'
import './WorkPage.scss'

useReveal()
</script>
