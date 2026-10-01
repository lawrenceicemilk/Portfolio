<template>
  <section id="skills" class="py-24 border-t border-outline/50 relative">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <!-- Section Header -->
      <div class="mb-16">
        <div class="section-header">SKILLS / 03</div>
        <h2 class="section-title">Technical & Specialization Skills</h2>
      </div>

      <!-- 3-Column Skills Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="cat in skills"
          :key="cat.title"
          class="bg-card/40 border border-outline/50 p-8 rounded-2xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
        >
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="cat.icon"></path>
            </svg>
          </div>
          <h3 class="text-xl font-medium text-main mb-4">{{ cat.title }}</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in cat.skills"
              :key="skill"
              class="bg-surface px-3 py-1.5 rounded-lg border border-outline/60 text-xs text-muted font-medium hover:text-main hover:border-primary/40 transition-colors"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  skills: {
    type: Array,
    required: true
  }
})
</script>
