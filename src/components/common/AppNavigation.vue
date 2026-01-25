<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
    temporary
    color="surface"
  >
    <v-list nav>
      <!-- Home -->
      <v-list-item
        prepend-icon="mdi-home"
        title="Home"
        to="/"
        exact
      ></v-list-item>
      
      <!-- Tools Group -->
      <v-list-group value="tools">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Tools"></v-list-item>
        </template>
        
        <v-list-item
          prepend-icon="mdi-file-document-edit"
          title="DD Form 2326 Generator"
          to="/tools/dd2326/generator"
          class="pl-8"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-code-json"
          title="DD Form 2326 Decoder"
          to="/tools/dd2326/decoder"
          class="pl-8"
        ></v-list-item>
        
        <!-- Future tools will appear here automatically -->
      </v-list-group>
      
      <!-- Specifications Group -->
      <v-list-group value="specs">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Specifications"></v-list-item>
        </template>
        
        <v-list-item
          prepend-icon="mdi-package-variant"
          title="MIL-STD-2073"
          to="/specs/mil-std-2073"
          class="pl-8"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-file-document"
          title="DD Form 2326"
          to="/specs/dd2326"
          class="pl-8"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-file-document-outline"
          title="STP Reference"
          to="/specs/stp"
          class="pl-8"
          disabled
        ></v-list-item>
      </v-list-group>
      
      <!-- Legacy routes (for backward compatibility) -->
      <v-list-item
        v-if="!hideLegacyRoutes"
        prepend-icon="mdi-form-textbox"
        title="Legacy: Form Generator"
        to="/form-generator"
      ></v-list-item>
      
      <v-list-item
        v-if="!hideLegacyRoutes"
        prepend-icon="mdi-code-json"
        title="Legacy: Decoder"
        to="/decoder"
      ></v-list-item>
    </v-list>
    
    <template v-slot:append>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-information"
          title="About"
          to="/about"
        ></v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  hideLegacyRoutes: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:model-value'])
</script>
