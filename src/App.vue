<template>
  <div id="app">
    <Navbar />

    <router-view v-slot="{ Component, route }">
      <transition :name="getTransitionName(route)" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>

    <Footer />

    <!-- Loading Indicator (Global) -->
    <Teleport to="body">
      <div v-if="isGlobalLoading" class="global-loader">
        <div class="loader-spinner"></div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const router = useRouter();
const isGlobalLoading = ref(false);

// Dynamic transition based on route
const getTransitionName = (route) => {
  // No transition for 404 page
  if (route.name === "404") {
    return "";
  }
  return "fade";
};

// Global loading state (can be used with a composable)
router.beforeEach((to, from, next) => {
  isGlobalLoading.value = true;
  next();
});

router.afterEach(() => {
  // Small delay to ensure smooth transition
  setTimeout(() => {
    isGlobalLoading.value = false;
  }, 100);
});

// Error boundary handler
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
  // Could implement error tracking service here
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  // Could implement error tracking service here
});
</script>

<style lang="scss">
// Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Global loader
.global-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.loader-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: #fbb040;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// Smooth scrolling
html {
  scroll-behavior: smooth;
}

// Focus visible for accessibility
:focus-visible {
  outline: 2px solid #fbb040;
  outline-offset: 2px;
}

// Selection color
::selection {
  background: #fbb040;
  color: white;
}

::-moz-selection {
  background: #fbb040;
  color: white;
}

// Improved button states
button:not(:disabled) {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

// Skip to main content link for accessibility
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #fbb040;
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;

  &:focus {
    top: 0;
  }
}
</style>
