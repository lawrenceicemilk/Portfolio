<template>
  <section id="contact" class="py-24 border-t border-outline/50 relative">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <!-- Contact Information -->
        <div>
          <h2 class="section-title mb-6">Let's Connect & Work Together</h2>
          <p class="text-muted text-base leading-relaxed mb-8">
            Whether you have a question, a project idea, or just want to connect, feel free to reach out. I’m always open to discussing web development, technology, or collaboration opportunities.
          </p>

          <div class="space-y-5">
            <div class="flex items-center gap-4 text-muted text-sm group">
              <div class="w-10 h-10 rounded-xl bg-card border border-outline/60 flex items-center justify-center text-primary group-hover:border-primary/60 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <a :href="'mailto:' + profile.email" class="hover:text-main transition-colors">
                {{ profile.email }}
              </a>
            </div>

            <div class="flex items-center gap-4 text-muted text-sm group">
              <div class="w-10 h-10 rounded-xl bg-card border border-outline/60 flex items-center justify-center text-primary group-hover:border-primary/60 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <span>{{ profile.location }}</span>
            </div>
          </div>
        </div>

        <!-- Contact Form Card -->
        <div class="bg-card/40 border border-outline/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
          <!-- Success Message -->
          <div
            v-if="contactSuccess"
            class="bg-primary/20 border border-primary text-main p-4 rounded-xl mb-6 text-sm flex items-center gap-3 animate-in fade-in duration-300"
          >
            <svg class="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Thank you! Your message has been sent successfully.</span>
          </div>

          <!-- Error Message -->
          <div
            v-if="contactError"
            class="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-xl mb-6 text-sm flex items-center gap-3"
          >
            <svg class="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ contactError }}</span>
          </div>

          <form @submit.prevent="$emit('submit')" class="space-y-5">
            <div>
              <label class="block text-xs uppercase tracking-wider text-muted mb-2 font-bold">
                Your Name
              </label>
              <input
                v-model="contactForm.name"
                type="text"
                required
                placeholder="John Doe"
                class="w-full bg-surface border border-outline/80 rounded-xl px-4 py-3 text-sm text-main placeholder-muted/50 focus:outline-none focus:border-primary transition-colors"
              >
            </div>

            <div>
              <label class="block text-xs uppercase tracking-wider text-muted mb-2 font-bold">
                Email Address
              </label>
              <input
                v-model="contactForm.email"
                type="email"
                required
                placeholder="john@example.com"
                class="w-full bg-surface border border-outline/80 rounded-xl px-4 py-3 text-sm text-main placeholder-muted/50 focus:outline-none focus:border-primary transition-colors"
              >
            </div>

            <div>
              <label class="block text-xs uppercase tracking-wider text-muted mb-2 font-bold">
                Message
              </label>
              <textarea
                v-model="contactForm.message"
                rows="4"
                required
                placeholder="Tell me about your project or inquiry..."
                class="w-full bg-surface border border-outline/80 rounded-xl px-4 py-3 text-sm text-main placeholder-muted/50 focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-primary hover:bg-secondary disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span v-if="isSubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>{{ isSubmitting ? 'Sending...' : 'Send Message &rarr;' }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  profile: {
    type: Object,
    required: true
  },
  contactForm: {
    type: Object,
    required: true
  },
  contactSuccess: {
    type: Boolean,
    default: false
  },
  contactError: {
    type: String,
    default: ''
  },
  isSubmitting: {
    type: Boolean,
    default: false
  }
})

defineEmits(['submit'])
</script>
