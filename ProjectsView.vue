<template>
  <div class="py-12 md:py-20">
    <ProjectsSection
      :categories="categories"
      :active-category="activeCategory"
      :projects="filteredProjects"
      @select-category="setCategory"
      @open-modal="openModal"
    />

    <ProjectModal
      :is-open="isModalOpen"
      :project="selectedProject"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { usePortfolioController } from '../controllers/usePortfolioController'
import ProjectsSection from '../components/ProjectsSection.vue'
import ProjectModal from '../components/ProjectModal.vue'

const {
  categories,
  activeCategory,
  filteredProjects,
  searchQuery,
  isModalOpen,
  selectedProject,
  setCategory,
  openModal,
  closeModal
} = usePortfolioController()
</script>
