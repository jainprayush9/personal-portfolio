<template>
  <div class="app">
    <template v-if="isCaseStudy">
      <RouterView />
    </template>
    <template v-else>
      <NavBar />
      <main class="page">
        <RouterView />
      </main>
      <Footer />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './app/components/organisms/NavBar/NavBar'
import Footer from './app/components/organisms/Footer/Footer'

const route = useRoute()
const isCaseStudy = computed(() => route.name === undefined
  ? false
  : String(route.path).startsWith('/work/') && route.params.slug !== undefined
)
</script>
