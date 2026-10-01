<template>
  <section id="about" class="py-20 border-t border-outline/50 relative">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <!-- Side by Side Grid: About Me & Education -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">

        <!-- Left Column: About Me -->
        <div class="flex flex-col">
          <div class="mb-8">
            <h2 class="section-title !mb-0">About Me</h2>
          </div>

          <div class="flex flex-col gap-5 flex-1">
            <div
              v-for="card in philosophies"
              :key="card.title"
              class="bg-[#080A18] border border-primary/40 hover:border-primary/80 rounded-2xl p-7 transition-all duration-300 shadow-[0_0_20px_rgba(61,107,255,0.08)] hover:shadow-[0_0_35px_rgba(61,107,255,0.2)] hover:-translate-y-1 flex-1 flex flex-col justify-start"
            >
              <div class="flex items-center gap-3.5 mb-3.5">
                <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="card.icon"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-main">{{ card.title }}</h3>
              </div>
              <p class="text-muted text-sm leading-relaxed">
                {{ card.content }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column: Education & Learning Journey -->
        <div id="education" class="flex flex-col">
          <div class="mb-8">
            <h2 class="section-title !mb-0">Education & Learning Journey</h2>
          </div>

          <div class="flex flex-col gap-5 flex-1">
            <div
              v-for="edu in (education && education.length ? education : defaultEducation)"
              :key="edu.degree"
              class="bg-[#080A18] border border-primary/40 hover:border-primary/80 p-7 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(61,107,255,0.08)] hover:shadow-[0_0_35px_rgba(61,107,255,0.2)] hover:-translate-y-1 flex-1 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between gap-2 mb-3">
                  <span class="text-xs uppercase tracking-widest text-primary font-bold px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    {{ edu.period }}
                  </span>
                  <span class="text-xs text-muted flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Active Student
                  </span>
                </div>
                <h3 class="text-xl font-medium text-main mb-1.5">{{ edu.degree }}</h3>
                <p class="text-secondary text-sm font-medium mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  {{ edu.institution }}
                </p>
                <p class="text-muted text-sm leading-relaxed mb-6">{{ edu.description }}</p>
              </div>

              <!-- Continuous Learning & Coursework Badges -->
              <div class="pt-4 border-t border-outline/40">
                <span class="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-2.5">Core Focus & Coursework</span>
                <div class="flex flex-wrap gap-2">
                  <span class="px-2.5 py-1 text-xs rounded-lg bg-card/60 border border-outline/50 text-muted">Software Engineering</span>
                  <span class="px-2.5 py-1 text-xs rounded-lg bg-card/60 border border-outline/50 text-muted">Web Systems & Architecture</span>
                  <span class="px-2.5 py-1 text-xs rounded-lg bg-card/60 border border-outline/50 text-muted">Database Management</span>
                  <span class="px-2.5 py-1 text-xs rounded-lg bg-card/60 border border-outline/50 text-muted">Data Structures</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { educationList as defaultEducation } from '../models/portfolioModel'

defineProps({
  philosophies: {
    type: Array,
    required: true
  },
  education: {
    type: Array,
    default: () => []
  }
})
</script>
