const { createApp } = Vue;

createApp({
    data() {
        return {
            imagesLoaded: true,
            activeCategory: 'All',
            categories: ['All', 'Web', 'School', 'Personal', 'UI/UX'],
            isModalOpen: false,
            selectedProject: {},
            projects: [
                {
                    name: "Student Enrollment System",
                    category: "School",
                    technologies: ["PHP", "MySQL", "Vue.js", "Tailwind CSS"],
                    image: "assets/images/project1.png",
                    description: "A web-based enrollment system designed to streamline the student registration process, handle subject assignment, and automate document verification.",
                    features: ["Student management & profiles", "Automated course enrollment", "Schedule conflict checker", "Document verification pipeline"],
                    github: "#",
                    demo: "#"
                },
                {
                    name: "Personal Portfolio & Blog",
                    category: "Personal",
                    technologies: ["HTML5", "Tailwind CSS", "Vue.js", "JavaScript"],
                    image: "assets/images/project2.png",
                    description: "A modern single-page portfolio application showcasing projects, technical skills, and educational background with interactive modal previews.",
                    features: ["Interactive modal views", "Dynamic category filtering", "Responsive glassmorphism design", "Dark mode UI design system"],
                    github: "#",
                    demo: "#"
                },
                {
                    name: "E-Commerce UI Interface",
                    category: "UI/UX",
                    technologies: ["Figma", "HTML", "Tailwind CSS", "JavaScript"],
                    image: "assets/images/project3.png",
                    description: "A modern user interface design for an online store featuring product filtering, interactive cart sidebar, and streamlined checkout UX.",
                    features: ["Responsive product grid", "Interactive shopping cart drawer", "Seamless checkout user flow", "Prototyped micro-interactions"],
                    github: "#",
                    demo: "#"
                }
            ],
            skillCategories: [
                {
                    title: "Web Development",
                    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                    skills: ["HTML5 / CSS3", "JavaScript (ES6+)", "Vue.js 3", "Tailwind CSS", "PHP & MySQL", "Git & GitHub"]
                },
                {
                    title: "UI/UX Design",
                    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
                    skills: ["Figma Prototyping", "Responsive Web Design", "User Interface Design", "Design Systems", "Wireframing"]
                },
                {
                    title: "Problem Solving",
                    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                    skills: ["Algorithms & Data Structures", "Debugging & Troubleshooting", "System Logic & Workflows", "Clean Code Practices"]
                }
            ],
            educationList: [
                {
                    degree: "Bachelor of Science in Information Technology",
                    institution: "College / University Student",
                    period: "Present",
                    description: "Focusing on software development, web technologies, database management, and modern application design principles."
                }
            ],
            contactForm: {
                name: '',
                email: '',
                subject: '',
                message: ''
            },
            contactSuccess: false
        };
    },
    computed: {
        filteredProjects() {
            if (this.activeCategory === 'All') {
                return this.projects;
            }
            return this.projects.filter(p => p.category === this.activeCategory);
        }
    },
    methods: {
        openModal(project) {
            this.selectedProject = project;
            this.isModalOpen = true;
            document.body.style.overflow = 'hidden';
        },
        closeModal() {
            this.isModalOpen = false;
            document.body.style.overflow = 'auto';
        },
        submitContact() {
            if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
                alert('Please fill out all required fields.');
                return;
            }
            this.contactSuccess = true;
            this.contactForm = { name: '', email: '', subject: '', message: '' };
            setTimeout(() => {
                this.contactSuccess = false;
            }, 5000);
        }
    }
}).mount("#app");
