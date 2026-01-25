<template>
  <div class="about-view">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card elevation="2">
            <v-card-title class="pa-6">
              <v-icon icon="mdi-information" class="mr-2"></v-icon>
              About mil-specs.com
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-6">
              <h2 class="text-h5 font-weight-bold mb-4">Your Comprehensive Resource for Military Specifications</h2>
              
              <p class="text-body-1 mb-4">
                mil-specs.com is a dedicated platform for aerospace professionals and enthusiasts
                to view, analyze, and create workflows based on military and aerospace specifications.
              </p>
              
              <h3 class="text-h6 font-weight-bold mt-6 mb-3">Current Capabilities</h3>
              
              <v-list>
                <v-list-item prepend-icon="mdi-book-open-variant">
                  <v-list-item-title>MIL-STD-2073 Viewer</v-list-item-title>
                  <v-list-item-subtitle>
                    Browse preservation methods, cleaning procedures, and material specifications
                  </v-list-item-subtitle>
                </v-list-item>
                
                <v-list-item prepend-icon="mdi-file-document-edit">
                  <v-list-item-title>DD Form 2326 Generator</v-list-item-title>
                  <v-list-item-subtitle>
                    Create Military Packaging Data forms with validation and export
                  </v-list-item-subtitle>
                </v-list-item>
                
                <v-list-item prepend-icon="mdi-code-json">
                  <v-list-item-title>DD Form 2326 Decoder</v-list-item-title>
                  <v-list-item-subtitle>
                    Parse and display form data in structured, searchable tables
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
              
              <h3 class="text-h6 font-weight-bold mt-6 mb-3">About MIL-STD-2073</h3>
              
              <p class="text-body-1 mb-4">
                MIL-STD-2073 governs the general requirements for military packaging and the
                development of packaging instructions. It establishes uniform methods for
                preserving, wrapping, cushioning, and packing military materiel.
              </p>
              
              <v-alert type="info" variant="tonal" class="mb-4">
                <v-alert-title>Disclaimer</v-alert-title>
                This platform is a reference tool and does not replace official military
                documentation. Always consult the latest official specifications for
                procurement and compliance.
              </v-alert>
              
              <h3 class="text-h6 font-weight-bold mt-6 mb-3">Technology</h3>
              
              <p class="text-body-1 mb-4">
                Built with Vue.js 3 and Vuetify 3, mil-specs.com provides a modern,
                responsive interface that works across all devices. The application
                follows best practices for performance, accessibility, and user experience.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
// About page component
</script>

<style scoped>
.about-view {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px 0;
}
</style>
