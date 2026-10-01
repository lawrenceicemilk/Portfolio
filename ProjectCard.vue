<template>
  <div
    class="group border bg-card/40 hover:bg-card/70 transition-all duration-300 rounded-xl overflow-hidden flex flex-col cursor-pointer hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
    :class="project.isTemplate
      ? 'border-dashed border-primary/50 hover:border-primary shadow-[0_0_20px_rgba(61,107,255,0.06)]'
      : 'border-outline/50 hover:border-primary/60'"
    @click="$emit('select', project)"
  >
    <!-- Card Visual: Image or Letters-Only Typography Banner -->
    <div class="h-48 overflow-hidden border-b border-outline/50 relative bg-gradient-to-br from-surface via-card to-base flex items-center justify-center">
      <!-- 1. Real Image (if provided) -->
      <template v-if="project.image && project.image.trim() !== ''">
        <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
        <img
          :src="project.image"
          :alt="project.name"
          class="w-full h-full object-cover filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105"
          loading="lazy"
        >
      </template>

      <!-- 2. Letters Only / Typography Template Banner (Default when no image) -->
      <template v-else>
        <!-- Tech grid background -->
        <div class="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

        <!-- Glowing hover accent -->
        <div class="absolute w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 group-hover:scale-125 transition-all duration-500 pointer-events-none"></div>

        <!-- Stylized Letter Monogram / Initials -->
        <div class="relative z-10 flex flex-col items-center justify-center text-center select-none py-4">
          <div
            class="w-16 h-16 rounded-2xl bg-surface/80 border flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
            :class="project.isTemplate
              ? 'border-dashed border-primary text-primary shadow-primary/20 group-hover:bg-primary/10'
              : 'border-outline/70 group-hover:border-primary/80 text-main group-hover:text-primary'"
          >
            <span v-if="project.initials === '+'" class="text-3xl font-light font-mono leading-none">
              +
            </span>
            <span v-else class="text-2xl font-extrabold tracking-wider font-mono">
              {{ project.initials || 'PRJ' }}
            </span>
          </div>
          <span class="text-[10px] uppercase font-mono tracking-[0.25em] text-muted/70 mt-2">
            <template v-if="project.isTemplate">READY TO ADD // SLOT</template>
            <template v-else>PROJECT // {{ project.initials || '01' }}</template>
          </span>
        </div>
      </template>

      <!-- Category Badge -->
      <span class="absolute top-3 right-3 bg-base/80 border border-outline/60 text-secondary text-[11px] font-semibold px-2.5 py-0.5 rounded-full z-20 backdrop-blur-md">
        {{ project.category }}
      </span>
    </div>

    <!-- Card Content -->
    <div class="p-6 flex-1 flex flex-col">
      <h3 class="text-lg font-medium text-main mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
        <span class="flex items-center gap-2">
          <span>{{ project.name }}</span>
        </span>
        <span class="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
      </h3>
      <p class="text-muted text-xs mb-4 flex-1 leading-relaxed">
        {{ project.description.length > 95 ? project.description.substring(0, 95) + '...' : project.description }}
      </p>
      <div class="flex flex-wrap gap-2.5 mt-auto pt-2">
        <span
          v-for="tech in project.technologies.slice(0, 4)"
          :key="tech"
          class="text-xs font-bold uppercase tracking-wider text-secondary bg-surface/90 border border-outline/80 px-3.5 py-1.5 rounded-lg shadow-sm hover:border-primary/80 hover:text-white transition-all duration-200"
          :class="project.isTemplate ? 'border-dashed border-primary/60 text-primary' : ''"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])
</script>
