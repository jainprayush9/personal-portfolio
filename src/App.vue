<template>
  <div class="app">
    <NavBar />
    <main class="page">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </RouterView>
    </main>
    <Footer :class="{ 'footer--sidebar': hasSidebar }" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './app/components/organisms/NavBar/NavBar'
import Footer from './app/components/organisms/Footer/Footer'

const route = useRoute()
const hasSidebar = computed(() =>
  route.path.startsWith('/work/') && !!route.params.slug
)
</script>
