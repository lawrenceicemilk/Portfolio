<template>
  <footer class="border-t border-outline/50 py-12 bg-base relative z-10">
    <div class="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="text-sm text-muted">
        &copy; {{ currentYear }} Lawrence AJ Famadulan. All rights reserved.
      </div>
      <div class="flex items-center gap-6 text-sm text-muted">
        <a
          href="#home"
          @click.prevent="scrollToTop"
          class="hover:text-main transition-colors flex items-center gap-1 group"
        >
          <span>Back to top</span>
          <span class="group-hover:-translate-y-1 transition-transform">&uarr;</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
