<template>
  <div>
    <!-- Hero Section (Aimed Tech Stack + Technical & Specialization Skills Side-by-Side) -->
    <HeroSection :profile="profile" :skills="skills" />

    <!-- About Section & Education Side-by-Side -->
    <AboutSection :philosophies="philosophies" :education="education" />

    <!-- Projects Section -->
    <ProjectsSection
      :categories="categories"
      :active-category="activeCategory"
      :projects="filteredProjects"
      @select-category="setCategory"
      @open-modal="openModal"
    />

    <!-- Project Details Modal -->
    <ProjectModal
      :is-open="isModalOpen"
      :project="selectedProject"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { usePortfolioController } from '../controllers/usePortfolioController'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ProjectModal from '../components/ProjectModal.vue'

const {
  profile,
  categories,
  activeCategory,
  filteredProjects,
  searchQuery,
  isModalOpen,
  selectedProject,
  skills,
  education,
  philosophies,
  contactForm,
  contactSuccess,
  contactError,
  isSubmitting,
  setCategory,
  openModal,
  closeModal,
  submitContact
} = usePortfolioController()
</script>
