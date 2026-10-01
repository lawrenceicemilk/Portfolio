/**
 * Project Model
 * Defines the schema and data structure for portfolio projects.
 */
export class Project {
  constructor({
    id,
    name,
    category,
    technologies = [],
    image = '',
    initials = '',
    isTemplate = false,
    description = '',
    features = [],
    github = '#',
    demo = '#'
  }) {
    this.id = id || (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'project')
    this.name = name
    this.category = category
    this.technologies = technologies
    this.image = image
    this.initials = initials || this.computeInitials(name)
    this.isTemplate = isTemplate
    this.description = description
    this.features = features
    this.github = github
    this.demo = demo
  }

  /**
   * Generates clean letter initials from the project name
   * Example: "Student Enrollment System" -> "SE", "Project 1" -> "P1"
   */
  computeInitials(name) {
    if (!name) return 'PRJ'
    const words = name.trim().split(/\s+/)
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase()
    }
    return (words[0][0] + words[1][0]).toUpperCase()
  }
}
