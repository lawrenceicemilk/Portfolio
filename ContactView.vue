<template>
  <div class="py-12 md:py-20">
    <ContactSection
      :profile="profile"
      :contact-form="contactForm"
      :contact-success="contactSuccess"
      :contact-error="contactError"
      :is-submitting="isSubmitting"
      @submit="submitContact"
    />
  </div>
</template>

<script setup>
import { usePortfolioController } from '../controllers/usePortfolioController'
import ContactSection from '../components/ContactSection.vue'

const {
  profile,
  contactForm,
  contactSuccess,
  contactError,
  isSubmitting,
  submitContact
} = usePortfolioController()
</script>
