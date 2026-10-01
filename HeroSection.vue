<template>
  <section id="home" class="min-h-[80vh] flex items-center relative overflow-hidden bg-grid py-10 md:py-14">
    <div class="max-w-[1500px] mx-auto px-6 lg:px-12 w-full">

      <!-- Stretched Out Aimed Tech Stack Block -->
      <div class="w-full mb-8">
        <!-- Big Typography Hero Title with Full Name (Stretched Out) -->
        <h1 class="leading-tight tracking-tight mb-4 flex flex-wrap items-baseline gap-x-4">
          <span class="text-2xl sm:text-3xl md:text-4xl font-semibold text-main/90">
            {{ profile.name }}
          </span>
          <span class="text-muted/40 hidden sm:inline">&mdash;</span>
          <span class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white">
            Aimed <span class="text-primary italic font-semibold">Tech Stack</span>
          </span>
        </h1>

        <!-- Tech Stacks Badges (Stretched Out) -->
        <div class="flex flex-wrap gap-2.5 mb-5 w-full max-w-5xl">
          <span
            v-for="badge in (profile.techStacks || profile.specializationBadges)"
            :key="badge"
            class="px-3.5 py-1.5 bg-card/80 border border-outline/80 text-secondary text-xs font-semibold tracking-wide rounded-full backdrop-blur-sm hover:border-primary/80 hover:text-white hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 cursor-default"
          >
            {{ badge }}
          </span>
        </div>

        <!-- Bio (Stretched Out) -->
        <p class="text-lg md:text-xl text-main/90 w-full max-w-4xl mb-6 leading-relaxed font-normal">
          {{ profile.bio }}
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center gap-5 sm:gap-6">
          <router-link
            to="/projects"
            class="border border-white/80 hover:border-white hover:bg-white hover:text-base text-main px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-white/5 active:scale-95"
          >
            View My Projects
          </router-link>
          <router-link
            to="/about"
            class="text-xs font-bold tracking-widest uppercase text-muted hover:text-main transition-colors px-6 py-3.5 flex items-center gap-1 group"
          >
            Learn more <span class="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </router-link>
        </div>
      </div>

      <!-- Technical & Specialization Skills (3 Cards Side-by-Side Stretching Horizontally) -->
      <div id="skills" class="w-full pt-6 border-t border-outline/40">
        <div class="flex items-center justify-between mb-5">
          <div class="section-header !mb-0 text-primary flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <span class="text-sm font-semibold tracking-wider">Technical & Specialization Skills</span>
          </div>
        </div>

        <!-- 3 Cards Side-by-Side -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div
            v-for="cat in (skills && skills.length ? skills : defaultSkills)"
            :key="cat.title"
            class="bg-card/50 border border-outline/60 hover:border-primary/60 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 backdrop-blur-sm group flex flex-col justify-between"
          >
            <div>
              <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20 group-hover:bg-primary/20 group-hover:scale-105 transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="cat.icon"></path>
                </svg>
              </div>
              <h3 class="text-xl font-medium text-main mb-4 group-hover:text-primary transition-colors">
                {{ cat.title }}
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="skill in cat.skills"
                  :key="skill"
                  class="bg-surface/80 px-3 py-1.5 rounded-lg border border-outline/60 text-xs text-muted font-medium hover:text-main hover:border-primary/40 transition-colors"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { skillCategories as defaultSkills } from '../models/portfolioModel'

defineProps({
  profile: {
    type: Object,
    required: true
  },
  skills: {
    type: Array,
    default: () => []
  }
})
</script>
