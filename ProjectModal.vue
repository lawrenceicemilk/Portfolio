<template>
  <Teleport to="body">
    <div
      v-if="isOpen && project"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      @keydown.esc="$emit('close')"
      tabindex="-1"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-base/90 backdrop-blur-md transition-opacity duration-300"
        @click="$emit('close')"
      ></div>

      <!-- Modal Content Card -->
      <div
        class="relative bg-surface border border-outline/80 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex justify-between items-center p-6 border-b border-outline/50 bg-card/40">
          <div class="section-header !mb-0 text-primary">
            <span class="w-2 h-2 rounded-full bg-primary inline-block"></span>
            {{ project.category }} PROJECT
          </div>
          <button
            @click="$emit('close')"
            aria-label="Close modal"
            class="text-muted hover:text-main text-2xl leading-none w-8 h-8 rounded-full flex items-center justify-center hover:bg-outline/50 transition-colors"
          >
            &times;
          </button>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="overflow-y-auto p-6 md:p-10 space-y-8">
          <div>
            <h3 class="text-2xl sm:text-3xl font-semibold text-main mb-3">{{ project.name }}</h3>
            <p class="text-muted text-base md:text-lg leading-relaxed">{{ project.description }}</p>
          </div>

          <!-- Project Visual: Image or Letters-Only Banner -->
          <div
            v-if="project.image && project.image.trim() !== ''"
            class="rounded-xl overflow-hidden border border-outline/60 bg-base/50"
          >
            <img
              :src="project.image"
              :alt="project.name"
              class="w-full h-auto max-h-[400px] object-cover opacity-90 hover:opacity-100 transition-opacity"
            >
          </div>
          <div
            v-else
            class="rounded-xl overflow-hidden border border-outline/60 bg-gradient-to-br from-card via-surface to-base p-10 flex flex-col items-center justify-center text-center relative select-none"
          >
            <div class="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>
            <div class="w-24 h-24 rounded-3xl bg-base/70 border border-primary/40 flex items-center justify-center shadow-2xl mb-3">
              <span class="text-4xl font-extrabold font-mono tracking-wider text-primary">
                {{ project.initials || 'PRJ' }}
              </span>
            </div>
            <span class="text-xs uppercase font-mono tracking-[0.3em] text-muted">
              {{ project.category }} &bull; PROJECT TEMPLATE
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-outline/50 pt-8">
            <div>
              <h4 class="text-xs uppercase tracking-widest text-primary mb-4 font-bold flex items-center gap-2">
                <span>Key Features</span>
              </h4>
              <ul class="space-y-3">
                <li
                  v-for="feature in project.features"
                  :key="feature"
                  class="text-muted text-sm flex items-start gap-2.5"
                >
                  <span class="text-primary mt-0.5 font-bold">▹</span>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="text-xs uppercase tracking-widest text-primary mb-4 font-bold">
                Technologies
              </h4>
              <div class="flex flex-wrap gap-2.5">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="bg-surface/90 px-4 py-2 rounded-xl border border-outline/80 text-sm font-semibold text-secondary shadow-sm hover:border-primary/80 transition-colors"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer Actions -->
        <div class="p-6 md:px-10 md:py-6 border-t border-outline/50 flex flex-col sm:flex-row gap-4 bg-base/80">
          <a
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full text-center text-sm font-medium text-muted hover:text-main border border-outline/80 hover:border-primary/80 py-3 rounded-xl transition-all duration-200"
          >
            View Repository &rarr;
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  project: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
