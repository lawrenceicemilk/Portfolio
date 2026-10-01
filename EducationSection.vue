<template>
  <section id="education" class="py-24 border-t border-outline/50 relative">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <div class="mb-16">
        <div class="section-header">ACADEMICS / 04</div>
        <h2 class="section-title">Education & Learning Journey</h2>
      </div>

      <div class="space-y-6 max-w-3xl">
        <div
          v-for="edu in education"
          :key="edu.degree"
          class="bg-card/40 border border-outline/50 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start gap-4 hover:border-primary/50 transition-all duration-300"
        >
          <div>
            <span class="text-xs uppercase tracking-widest text-primary font-bold mb-2 block">
              {{ edu.period }}
            </span>
            <h3 class="text-xl font-medium text-main mb-1">{{ edu.degree }}</h3>
            <p class="text-secondary text-sm mb-3">{{ edu.institution }}</p>
            <p class="text-muted text-sm leading-relaxed">{{ edu.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  education: {
    type: Array,
    required: true
  }
})
</script>
