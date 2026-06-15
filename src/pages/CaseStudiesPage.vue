<template>
  <CaseStudyGrid :items="workList" />
</template>

<script setup lang="ts">
import workList from '../../data/work.json'
import CaseStudyGrid from '../app/components/organisms/CaseStudyGrid/CaseStudyGrid'
</script>
