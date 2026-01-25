<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <v-icon icon="mdi-shield-air" size="80" color="primary" class="mb-4"></v-icon>
            <h1 class="text-h3 text-md-h2 font-weight-bold mb-4">
              Welcome to mil-specs.com
            </h1>
            <p class="text-h6 text-grey-darken-1 mb-6">
              Your comprehensive hub for military and aerospace specifications. Access documentation, tools, and guidance for defense industry compliance.
            </p>
            <div class="d-flex justify-center ga-4 flex-wrap">
              <v-btn
                to="/specs"
                color="primary"
                size="large"
                prepend-icon="mdi-book-open-variant"
              >
                Explore Specifications
              </v-btn>
              <v-btn
                to="/tools"
                variant="outlined"
                color="primary"
                size="large"
                prepend-icon="mdi-tools"
              >
                View Tools
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    
    <!-- Features Section -->
    <section class="features-section py-12">
      <v-container>
        <h2 class="text-h4 font-weight-bold text-center mb-8">Platform Capabilities</h2>
        <v-row>
          <v-col cols="12" md="4" v-for="feature in features" :key="feature.title">
            <v-card elevation="2" class="h-100">
              <v-card-text class="text-center pa-6">
                <v-icon :icon="feature.icon" size="48" color="primary" class="mb-4"></v-icon>
                <h3 class="text-h5 font-weight-bold mb-2">{{ feature.title }}</h3>
                <p class="text-body-1 text-grey-darken-1">{{ feature.description }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
    
    <!-- Quick Stats Section -->
    <section class="stats-section py-12 bg-grey-lighten-4">
      <v-container>
        <v-row justify="center">
          <v-col cols="6" md="3" class="text-center" v-for="stat in stats" :key="stat.label">
            <div class="text-h3 font-weight-bold text-primary">{{ stat.value }}</div>
            <div class="text-body-2 text-grey-darken-1">{{ stat.label }}</div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    
    <!-- Quick Links Section -->
    <section class="quick-links-section py-12">
      <v-container>
        <h2 class="text-h4 font-weight-bold text-center mb-8">Quick Actions</h2>
        <v-row justify="center">
          <v-col cols="12" sm="6" md="3" v-for="link in quickLinks" :key="link.title">
            <v-card
              :to="link.to"
              hover
              class="text-center pa-4 cursor-pointer"
            >
              <v-icon :icon="link.icon" size="36" color="primary" class="mb-2"></v-icon>
              <h4 class="text-subtitle-1 font-weight-bold">{{ link.title }}</h4>
              <p class="text-caption text-grey">{{ link.description }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
    
    <!-- About Section -->
    <section class="about-section py-12 bg-primary-darken-1">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h4 font-weight-bold text-white mb-4">About Our Platform</h2>
            <p class="text-body-1 text-white-darken-1 mb-4">
              mil-specs.com is your comprehensive hub for military and aerospace specifications.
              We provide easy access to documentation, tools, and guidance to ensure defense
              industry compliance across multiple standards.
            </p>
            <v-btn
              to="/specs"
              variant="outlined"
              color="white"
              size="large"
            >
              Explore Specifications
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const features = ref([
  {
    icon: 'mdi-book-open-variant',
    title: 'Specification Library',
    description: 'Browse and search military specifications including MIL-STD, MIL-SPEC, and defense standards. Access preservation methods, material requirements, and compliance guidelines.'
  },
  {
    icon: 'mdi-file-document-edit',
    title: 'Documentation Tools',
    description: 'Generate compliant forms, decode existing documents, and create workflows based on military specification requirements.'
  },
  {
    icon: 'mdi-compass',
    title: 'Guidance & Resources',
    description: 'Access implementation guides, best practices, and reference materials to help navigate military specification compliance.'
  }
])

const stats = ref([
  { value: '50+', label: 'Specifications' },
  { value: '20+', label: 'Compliance Tools' },
  { value: '100+', label: 'Reference Items' },
  { value: 'Ongoing', label: 'Updates' }
])

const quickLinks = ref([
  {
    icon: 'mdi-book-open-variant',
    title: 'Browse Specs',
    description: 'Explore all specifications',
    to: '/specs'
  },
  {
    icon: 'mdi-eye-check',
    title: 'MIL-STD-202',
    description: 'Test Method Standard Viewer',
    to: '/tools/mil-std-202'
  },
  {
    icon: 'mdi-file-replace',
    title: 'Superseding Lookup',
    description: 'Check spec status',
    to: '/tools/superseding-lookup'
  },
  {
    icon: 'mdi-tools',
    title: 'All Tools',
    description: 'Access documentation tools',
    to: '/tools'
  },
  {
    icon: 'mdi-file-document',
    title: 'Generate Forms',
    description: 'Create compliant forms',
    to: '/tools/dd2326/generator'
  },
  {
    icon: 'mdi-help-circle',
    title: 'Guidance',
    description: 'Get help and resources',
    to: '/about'
  }
])
</script>

<style scoped>
.hero-section {
  padding: 80px 0;
  background: linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%);
}

.features-section {
  background-color: #ffffff;
}

.stats-section {
  background-color: #f5f5f5;
}

.quick-links-section {
  background-color: #ffffff;
}

.about-section {
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
}
</style>
