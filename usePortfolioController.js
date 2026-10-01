import { ref, computed, reactive } from 'vue'
import {
  profileModel,
  projectCategories,
  initialProjects,
  skillCategories,
  educationList,
  philosophyCards
} from '../models/portfolioModel'

/**
 * Portfolio Controller
 * Coordinates business logic, state changes, and interactions between Models and Views.
 */
export function usePortfolioController() {
  // Reactive State
  const profile = ref(profileModel)
  const categories = ref(projectCategories)
  const activeCategory = ref('All')
  const projects = ref(initialProjects)
  const searchQuery = ref('')
  
  // Modal Controller State
  const isModalOpen = ref(false)
  const selectedProject = ref(null)

  // Academic & Skill state
  const skills = ref(skillCategories)
  const education = ref(educationList)
  const philosophies = ref(philosophyCards)

  // Contact Form State
  const contactForm = reactive({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const contactSuccess = ref(false)
  const contactError = ref('')
  const isSubmitting = ref(false)

  // Computed: Filtered Projects
  const filteredProjects = computed(() => {
    let result = projects.value

    if (activeCategory.value !== 'All') {
      result = result.filter(p => p.category === activeCategory.value)
    }

    if (searchQuery.value.trim() !== '') {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      )
    }

    return result
  })

  // Action Methods
  const setCategory = (cat) => {
    activeCategory.value = cat
  }

  const openModal = (project) => {
    selectedProject.value = project
    isModalOpen.value = true
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }

  const closeModal = () => {
    isModalOpen.value = false
    selectedProject.value = null
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto'
    }
  }

  const submitContact = async () => {
    contactError.value = ''
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      contactError.value = 'Please fill out all required fields.'
      return false
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactForm.email)) {
      contactError.value = 'Please enter a valid email address.'
      return false
    }

    isSubmitting.value = true
    
    // Simulate API or mail service processing
    await new Promise(resolve => setTimeout(resolve, 600))
    
    isSubmitting.value = false
    contactSuccess.value = true
    contactForm.name = ''
    contactForm.email = ''
    contactForm.subject = ''
    contactForm.message = ''

    setTimeout(() => {
      contactSuccess.value = false
    }, 5000)

    return true
  }

  return {
    profile,
    categories,
    activeCategory,
    projects,
    filteredProjects,
    searchQuery,
    isModalOpen,
    selectedProject,
    skills,
    education,
    philosophies,
    contactForm,
    contactSuccess,
    contactError,
    isSubmitting,
    setCategory,
    openModal,
    closeModal,
    submitContact
  }
}
