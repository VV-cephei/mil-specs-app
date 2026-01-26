<template>
  <footer class="app-footer">
    <div class="app-footer-content">
      <div class="footer-grid">
        <!-- Brand Section -->
        <div class="app-footer-section">
          <router-link to="/" class="footer-brand">
            <svg class="footer-brand-icon" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z" />
            </svg>
            <span class="footer-brand-text">mil-specs.com</span>
          </router-link>
          <p class="footer-description">
            The premier hub for military and aerospace specifications. Access critical defense tools, standards, and documentation.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="app-footer-section">
          <h4 class="footer-section-title">Quick Links</h4>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/tools">Tools Hub</router-link></li>
            <li><router-link to="/specs">Specifications</router-link></li>
            <li><router-link to="/about">About</router-link></li>
          </ul>
        </div>

        <!-- Tools -->
        <div class="app-footer-section">
          <h4 class="footer-section-title">Tools</h4>
          <ul class="footer-links">
            <li><router-link :to="{ name: 'dd2326-decoder' }">DD Form 2326 Decoder</router-link></li>
            <li><router-link :to="{ name: 'mil-std-202' }">MIL-STD-202 Viewer</router-link></li>
            <li><router-link :to="{ name: 'superseding-lookup' }">Spec Superseding Lookup</router-link></li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="app-footer-section">
          <h4 class="footer-section-title">Resources</h4>
          <ul class="footer-links">
            <li><router-link to="/specs">MIL-STD-2073</router-link></li>
            <li><router-link to="/form-generator">Form Generator</router-link></li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p class="footer-copyright">
          © {{ currentYear }} mil-specs.com. All rights reserved.
        </p>
        <p class="footer-legal">
          All specifications are property of their respective owners. This site is not affiliated with the U.S. Department of Defense.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer-brand {
  display: flex;
  align-items: center;
  gap: var(--space-2, 0.5rem);
  color: var(--color-text-inverse, #fff);
  text-decoration: none;
  font-weight: var(--font-weight-bold, 700);
  font-size: var(--font-size-lg, 1.125rem);
  margin-bottom: var(--space-3, 0.75rem);
}

.footer-brand:hover {
  opacity: 0.9;
}

.footer-brand-icon {
  flex-shrink: 0;
}

.footer-description {
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-neutral-400, #9ca3af);
  line-height: var(--line-height-relaxed, 1.625);
  margin: 0;
}

.footer-legal {
  font-size: var(--font-size-xs, 0.75rem);
  color: var(--color-neutral-500, #6b7280);
  margin: var(--space-2, 0.5rem) 0 0;
}

@media (max-width: 767px) {
  .footer-bottom {
    text-align: center;
  }
}
</style>
