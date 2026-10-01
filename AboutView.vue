<template>
  <div class="py-12 md:py-20 space-y-12">
    <AboutSection :philosophies="philosophies" :education="education" />
    <SkillsSection :skills="skills" :profile="profile" />
  </div>
</template>

<script setup>
import { usePortfolioController } from '../controllers/usePortfolioController'
import AboutSection from '../components/AboutSection.vue'
import SkillsSection from '../components/SkillsSection.vue'

const {
  profile,
  philosophies,
  skills,
  education
} = usePortfolioController()
</script>
