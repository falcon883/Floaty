<template>
  <div class="detail-item" :class="{ 'is-highlight': highlight }">
    <div class="detail-label">{{ label }}</div>
    <div class="detail-value-wrapper">
      <div class="detail-value">{{ formattedValue }}</div>
      <button
        v-if="copyable"
        @click="copyToClipboard"
        class="copy-button"
        :class="{ 'is-copied': copied }"
        :aria-label="`Copy ${label}`"
        type="button"
      >
        <svg
          v-if="!copied"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="currentColor"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
          />
          <path
            d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="currentColor"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  copyable: {
    type: Boolean,
    default: false,
  },
  highlight: {
    type: Boolean,
    default: false,
  },
  format: {
    type: String,
    default: "default", // 'default', 'number', 'decimal'
  },
});

const copied = ref(false);

const formattedValue = computed(() => {
  if (props.format === "number") {
    return Number(props.value).toLocaleString();
  } else if (props.format === "decimal") {
    return Number(props.value).toFixed(8);
  }
  return String(props.value);
});

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(String(props.value));
    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (error) {
    console.error("Failed to copy:", error);

    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = String(props.value);
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }

    document.body.removeChild(textArea);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  &.is-highlight {
    background: rgba($logo-clr-1, 0.1);
    border-color: rgba($logo-clr-1, 0.3);

    .detail-label {
      color: $logo-clr-1;
    }
  }
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.6);
}

.detail-value-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.detail-value {
  font-size: 0.95rem;
  font-weight: 500;
  color: white;
  word-break: break-all;
  flex: 1;
}

.copy-button {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    color: $logo-clr-1;
    background: rgba(255, 255, 255, 0.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid $logo-clr-1;
    outline-offset: 2px;
  }

  &.is-copied {
    color: #48c774;
  }
}

// Mobile adjustments
@media (max-width: 768px) {
  .detail-item {
    padding: 0.5rem;
  }

  .detail-label {
    font-size: 0.7rem;
  }

  .detail-value {
    font-size: 0.9rem;
  }
}
</style>
