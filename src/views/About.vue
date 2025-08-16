<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center" class="min-height-hero">
          <v-col cols="12" md="8" class="text-center">
            <div class="hero-content">
              <v-avatar 
                size="120" 
                class="hero-avatar mb-6"
                color="primary"
              >
                <v-icon size="60" color="white">mdi-heart-pulse</v-icon>
              </v-avatar>
              
              <h1 class="display-4 font-weight-bold text-primary mb-4">
                À Propos de Nous
              </h1>
              
              <p class="text-h6 text-medium-emphasis mb-8 max-width-text">
                Nous sommes dédiés à améliorer les soins de santé grâce à la technologie 
                et à l'innovation, en mettant toujours le patient au cœur de nos préoccupations.
              </p>
              
              <v-btn
                size="large"
                color="primary"
                variant="elevated"
                rounded="pill"
                class="hero-cta"
                @click="scrollToMission"
              >
                <v-icon start>mdi-arrow-down</v-icon>
                Découvrir notre mission
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Mission Section -->
    <section ref="missionSection" class="mission-section">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="d-flex align-center">
            <div class="mission-content">
              <h2 class="text-h3 font-weight-bold text-primary mb-4">
                Notre Mission
              </h2>
              <p class="text-body-1 text-high-emphasis mb-6">
                Révolutionner la gestion des données patients en offrant une plateforme 
                intuitive, sécurisée et efficace qui permet aux professionnels de santé 
                de se concentrer sur ce qui compte vraiment : soigner leurs patients.
              </p>
              
              <div class="mission-stats">
                <v-row>
                  <v-col cols="6" sm="4" v-for="stat in stats" :key="stat.label">
                    <div class="stat-item text-center">
                      <div class="stat-number text-h4 font-weight-bold text-primary">
                        {{ stat.value }}
                      </div>
                      <div class="stat-label text-body-2 text-medium-emphasis">
                        {{ stat.label }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
          
          <v-col cols="12" md="6">
            <div class="mission-visual">
              <v-card 
                class="mission-card"
                elevation="8"
                rounded="xl"
              >
                <div class="mission-graphic">
                  <v-icon size="200" color="primary" class="mission-icon">
                    mdi-hospital-building
                  </v-icon>
                </div>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold text-primary mb-4">
            Nos Valeurs
          </h2>
          <p class="text-h6 text-medium-emphasis max-width-text mx-auto">
            Les principes qui guident notre travail au quotidien
          </p>
        </div>
        
        <v-row>
          <v-col 
            cols="12" 
            sm="6" 
            lg="4" 
            v-for="(value, index) in values" 
            :key="index"
          >
            <v-card 
              class="value-card h-100"
              elevation="4"
              rounded="xl"
              hover
            >
              <v-card-text class="pa-6 text-center">
                <v-avatar 
                  :color="value.color" 
                  size="80" 
                  class="mb-4"
                >
                  <v-icon :icon="value.icon" size="40" color="white"></v-icon>
                </v-avatar>
                
                <h3 class="text-h5 font-weight-bold mb-3">
                  {{ value.title }}
                </h3>
                
                <p class="text-body-1 text-medium-emphasis">
                  {{ value.description }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold text-primary mb-4">
            Notre Équipe
          </h2>
          <p class="text-h6 text-medium-emphasis max-width-text mx-auto">
            Des professionnels passionnés au service de l'innovation médicale
          </p>
        </div>
        
        <v-row justify="center">
          <v-col 
            cols="12" 
            sm="6" 
            md="4" 
            v-for="(member, index) in team" 
            :key="index"
          >
            <v-card 
              class="team-card"
              elevation="6"
              rounded="xl"
              hover
            >
              <div class="team-avatar-container">
                <v-avatar 
                  size="120" 
                  :color="member.color"
                  class="team-avatar"
                >
                  <v-icon size="60" color="white">{{ member.icon }}</v-icon>
                </v-avatar>
              </div>
              
              <v-card-text class="text-center pa-6">
                <h3 class="text-h6 font-weight-bold mb-2">
                  {{ member.name }}
                </h3>
                <p class="text-subtitle-1 text-primary mb-3">
                  {{ member.role }}
                </p>
                <p class="text-body-2 text-medium-emphasis">
                  {{ member.description }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Contact CTA Section -->
    <section class="contact-section">
      <v-container>
        <v-card 
          class="contact-cta"
          elevation="12"
          rounded="xl"
          color="primary"
        >
          <v-card-text class="pa-8 text-center">
            <v-icon size="60" color="white" class="mb-4">
              mdi-email-outline
            </v-icon>
            
            <h2 class="text-h4 font-weight-bold text-white mb-4">
              Prêt à commencer ?
            </h2>
            
            <p class="text-h6 text-white mb-6 opacity-90">
              Contactez-nous pour découvrir comment nous pouvons améliorer 
              la gestion de vos données patients.
            </p>
            
            <v-btn
              size="large"
              color="white"
              variant="elevated"
              rounded="pill"
              class="contact-btn"
              @click="router.push('/contact')"
            >
              <v-icon start>mdi-phone</v-icon>
              Nous contacter
            </v-btn>
          </v-card-text>
        </v-card>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from "@/router/index.js";
// Refs
const missionSection = ref(null)

// Data
const stats = [
  { value: '1000+', label: 'Patients' },
  { value: '50+', label: 'Médecins' },
  { value: '99.9%', label: 'Disponibilité' },
  { value: '24/7', label: 'Support' }
]

const values = [
  {
    title: 'Sécurité',
    description: 'Protection maximale des données patients avec les plus hauts standards de sécurité.',
    icon: 'mdi-shield-check',
    color: 'success'
  },
  {
    title: 'Innovation',
    description: 'Utilisation des dernières technologies pour améliorer continuellement nos services.',
    icon: 'mdi-lightbulb-on',
    color: 'warning'
  },
  {
    title: 'Simplicité',
    description: 'Interface intuitive et workflow optimisé pour une utilisation sans formation complexe.',
    icon: 'mdi-heart',
    color: 'error'
  },
  {
    title: 'Fiabilité',
    description: 'Système stable et performant disponible 24h/24 pour vos besoins critiques.',
    icon: 'mdi-clock-check',
    color: 'info'
  },
  {
    title: 'Collaboration',
    description: 'Outils collaboratifs pour améliorer la communication entre professionnels.',
    icon: 'mdi-account-group',
    color: 'purple'
  },
  {
    title: 'Excellence',
    description: 'Engagement vers la qualité et l\'amélioration continue de nos services.',
    icon: 'mdi-star',
    color: 'deep-orange'
  }
]

const team = [
  {
    name: 'Dr. Sarah Martin',
    role: 'Directrice Médicale',
    description: '15 ans d\'expérience en médecine digitale et innovation hospitalière.',
    icon: 'mdi-account-tie',
    color: 'primary'
  },
  {
    name: 'Alex Dubois',
    role: 'CTO',
    description: 'Expert en architecture logicielle et sécurité des systèmes de santé.',
    icon: 'mdi-laptop',
    color: 'success'
  },
  {
    name: 'Marie Leroy',
    role: 'UX Designer',
    description: 'Spécialiste en expérience utilisateur pour les applications médicales.',
    icon: 'mdi-palette',
    color: 'warning'
  }
]

// Methods
const scrollToMission = () => {
  if (missionSection.value) {
    missionSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.about-page {
  min-height: 100vh;
}

/* Hero Section */
  .hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 120px 0;
    position: relative;
    overflow: hidden;
  }

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  animation: float 20s ease-in-out infinite;
}

.min-height-hero {
  min-height: 70vh;
}

.hero-content {
  animation: fadeInUp 1s ease-out;
}

.hero-avatar {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: bounce 2s ease-in-out infinite;
}

.max-width-text {
  max-width: 600px;
}

.hero-cta {
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.hero-cta:hover {
  transform: translateY(-2px);
}

/* Mission Section */
.mission-section {
  padding: 100px 0;
  background: #f8f9fa;
}

.mission-content {
  animation: slideInLeft 1s ease-out;
}

.mission-visual {
  animation: slideInRight 1s ease-out;
}

.mission-card {
  background: linear-gradient(45deg, #667eea, #764ba2);
  overflow: hidden;
}

.mission-graphic {
  padding: 60px;
  text-align: center;
}

.mission-icon {
  opacity: 0.9;
  animation: pulse 3s ease-in-out infinite;
}

.stat-item {
  margin-bottom: 24px;
}

.stat-number {
  animation: countUp 2s ease-out;
}

/* Values Section */
.values-section {
  padding: 100px 0;
  background: white;
}

.value-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Team Section */
.team-section {
  padding: 100px 0;
  background: #f8f9fa;
}

.team-card {
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.team-avatar-container {
  padding: 30px 30px 0;
  text-align: center;
}

.team-avatar {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Contact Section */
.contact-section {
  padding: 100px 0;
  background: white;
}

.contact-cta {
  background: linear-gradient(45deg, #1976d2, #42a5f5) !important;
  position: relative;
  overflow: hidden;
}

.contact-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  animation: float 15s ease-in-out infinite reverse;
}

.contact-btn {
  transition: all 0.3s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.9;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;
  }
  
  .mission-section,
  .values-section,
  .team-section,
  .contact-section {
    padding: 60px 0;
  }
  
  .mission-graphic {
    padding: 40px;
  }
  
  .mission-icon {
    font-size: 120px !important;
  }
  
  .hero-content h1 {
    font-size: 2.5rem !important;
  }
}
</style>