<template>
  <v-footer app color="grey-darken-4" class="text-center">
    <v-container>
      <v-row justify="center" no-gutters>
        <v-col cols="12" md="4" class="text-center text-md-left mb-4 mb-md-0">
          <h3 class="text-h6 font-weight-bold mb-2">mil-specs.com</h3>
          <p class="text-body-2 text-grey-lighten-1">
            Your comprehensive resource for military and aerospace specifications
          </p>
        </v-col>
        
        <v-col cols="12" md="4" class="text-center mb-4 mb-md-0">
          <h4 class="text-subtitle-2 font-weight-bold mb-2">Quick Links</h4>
          <div class="d-flex justify-center ga-2 flex-wrap">
            <v-btn to="/" variant="text" size="small">Home</v-btn>
            <v-btn to="/specs" variant="text" size="small">MIL-STD-2073</v-btn>
            <v-btn to="/form-generator" variant="text" size="small">DD Form 2326</v-btn>
          </div>
        </v-col>
        
        <v-col cols="12" md="4" class="text-center text-md-right">
          <p class="text-body-2 text-grey-lighten-1 mb-1">
            <v-icon icon="mdi-copyright" size="small" class="mr-1"></v-icon>
            {{ new Date().getFullYear() }} mil-specs.com
          </p>
          <p class="text-caption text-grey">
            All specifications are property of their respective owners
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
// Footer component
</script>
