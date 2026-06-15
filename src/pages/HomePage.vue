<template>
  <div>
    <HeroSection :profile="profile" />
    <CaseStudyGrid :items="workList" :limit="2" title="Featured work" />
  </div>
</template>

<script setup lang="ts">
import profile from '../../data/profile.json'
import workList from '../../data/work.json'
import CaseStudyGrid from '../app/components/organisms/CaseStudyGrid/CaseStudyGrid'
import HeroSection from '../app/components/organisms/HeroSection/HeroSection'
</script>
