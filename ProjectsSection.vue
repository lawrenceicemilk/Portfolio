<template>
  <section id="projects" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <!-- Section Header -->
      <div class="mb-10">
        <h2 class="section-title mb-2">All Projects</h2>
        <p class="text-muted text-sm leading-relaxed max-w-xl">
          A complete selection of web applications and systems I have built.
        </p>
      </div>

      <!-- Filters (Tab Style) -->
      <div class="flex flex-wrap gap-2.5 mb-10">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="$emit('selectCategory', cat)"
          class="px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 border cursor-pointer"
          :class="activeCategory === cat
            ? 'bg-[#080A18] border-primary text-white shadow-lg shadow-primary/25 scale-[1.02]'
            : 'border-primary/30 text-muted hover:border-primary/80 hover:text-main bg-transparent'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Big Projects Container -->
      <div class="bg-[#080A18]/80 border border-primary/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(61,107,255,0.07)] backdrop-blur-sm">
        <!-- Projects Grid -->
        <div v-if="projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            v-for="project in projects"
            :key="project.id || project.name"
            :project="project"
            @select="$emit('openModal', $event)"
          />
        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div class="w-16 h-16 rounded-full bg-card/60 flex items-center justify-center text-primary/40 border border-outline/50">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p class="text-main font-medium text-base">No matching projects found</p>
            <p class="text-muted text-xs tracking-wide mt-1">Try selecting another category.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'

defineProps({
  categories: {
    type: Array,
    required: true
  },
  activeCategory: {
    type: String,
    required: true
  },
  projects: {
    type: Array,
    required: true
  }
})

defineEmits(['selectCategory', 'openModal'])
</script>
