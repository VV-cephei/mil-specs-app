<template>
  <div class="not-found-view">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" class="text-center">
          <v-icon icon="mdi-alert-circle-outline" size="100" color="warning" class="mb-6"></v-icon>
          
          <h1 class="text-h2 font-weight-bold mb-4">404</h1>
          <h2 class="text-h5 mb-4">Page Not Found</h2>
          
          <p class="text-body-1 text-grey mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <v-btn to="/" color="primary" size="large">
            <v-icon icon="mdi-home" class="mr-2"></v-icon>
            Return Home
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
// 404 Not Found page
</script>

<style scoped>
.not-found-view {
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
