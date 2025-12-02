<template>
  <div class="skin-card card is-flex is-also-dark">
    <div class="card-image" v-if="skinData.imageurl">
      <figure class="image">
        <img
          :src="skinData.imageurl"
          :alt="`${skinData.full_item_name} - ${skinData.wear_name}`"
          loading="lazy"
          @error="handleImageError"
        />
      </figure>
    </div>

    <div class="card-content">
      <div class="content">
        <!-- Title -->
        <h2 class="skin-title">
          {{ skinData.full_item_name }}
        </h2>

        <p class="skin-wear">
          {{ skinData.wear_name }}
        </p>

        <!-- Float Range Indicator -->
        <div class="range-wrapper" v-if="skinData.floatvalue">
          <div class="marker-track">
            <div
              class="marker"
              :style="`margin-left: ${floatPercentage}%;`"
              role="img"
              :aria-label="`Float position: ${skinData.floatvalue}`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                />
              </svg>
            </div>
          </div>

          <div class="range" role="img" aria-label="Wear condition ranges">
            <div
              v-for="range in wearRanges"
              :key="range.name"
              :class="`range-${range.index} has-tooltip-arrow has-tooltip-top`"
              :data-tooltip="`${range.name}: ${range.min} - ${range.max}`"
            ></div>
          </div>
        </div>

        <!-- Skin Details Grid -->
        <div class="details-grid">
          <DetailItem
            v-if="skinData.itemid || skinData.floatid"
            label="Item ID"
            :value="skinData.itemid || skinData.floatid"
            :copyable="true"
          />

          <DetailItem
            v-if="skinData.paintseed !== undefined"
            label="Paint Seed"
            :value="skinData.paintseed"
            :copyable="true"
          />

          <DetailItem
            v-if="skinData.floatvalue"
            label="Float Value"
            :value="skinData.floatvalue"
            :copyable="true"
            :highlight="true"
          />

          <DetailItem
            v-if="skinData.killeatervalue !== undefined"
            label="StatTrak™ Kills"
            :value="skinData.killeatervalue"
          />

          <DetailItem
            v-if="skinData.rarity_name"
            label="Rarity"
            :value="skinData.rarity_name"
          />

          <DetailItem
            v-if="skinData.origin_name"
            label="Origin"
            :value="skinData.origin_name"
          />

          <DetailItem
            v-if="skinData.defindex"
            label="Definition Index"
            :value="skinData.defindex"
          />

          <DetailItem
            v-if="skinData.paintindex"
            label="Paint Index"
            :value="skinData.paintindex"
          />
        </div>

        <!-- Action Buttons -->
        <div class="buttons is-centered mt-4">
          <button
            @click="$emit('check-another')"
            class="button is-warning is-outlined is-rounded"
            aria-label="Check another skin"
          >
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                />
                <path
                  d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
                />
              </svg>
            </span>
            <span>Check Another</span>
          </button>

          <button
            @click="shareLink"
            class="button is-info is-outlined is-rounded"
            aria-label="Share this skin"
            v-if="canShare"
          >
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
                />
              </svg>
            </span>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import DetailItem from "./DetailItem.vue";

const props = defineProps({
  skinData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["check-another"]);

const imageError = ref(false);

const wearRanges = [
  { index: 1, name: "Factory New", min: "0.00", max: "0.07" },
  { index: 2, name: "Minimal Wear", min: "0.07", max: "0.15" },
  { index: 3, name: "Field-Tested", min: "0.15", max: "0.38" },
  { index: 4, name: "Well-Worn", min: "0.38", max: "0.45" },
  { index: 5, name: "Battle-Scarred", min: "0.45", max: "1.00" },
];

const floatPercentage = computed(() => {
  return (props.skinData.floatvalue * 100).toFixed(2);
});

const canShare = computed(() => {
  return navigator.share !== undefined;
});

const handleImageError = () => {
  imageError.value = true;
};

const shareLink = async () => {
  if (!navigator.share) return;

  try {
    await navigator.share({
      title: props.skinData.full_item_name,
      text: `Check out this ${props.skinData.wear_name} with float ${props.skinData.floatvalue}`,
      url: window.location.href,
    });
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Error sharing:", error);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.skin-card {
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
}

.card-image {
  margin-right: 1.5rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}

.image {
  width: 256px;
  height: auto;

  img {
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 256px;
    margin: 0 auto;
  }
}

.skin-title {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
}

.skin-wear {
  font-size: 1.125rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
}

.range-wrapper {
  width: 100%;
  margin-bottom: 2rem;
}

.marker-track {
  display: flex;
  align-items: flex-end;
  padding-right: 24px;
  height: 32px;
  margin-bottom: 4px;
}

.marker {
  height: 24px;
  margin-left: 0;
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;

  svg {
    display: block;
  }
}

.range {
  display: flex;
  width: 100%;
  height: 0.75rem;
  padding: 0 8px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.range-1 {
  width: 7%;
  background: #55b94d;
  border-radius: 8px 0 0 8px;
}

.range-2 {
  width: 8%;
  background: #a8c449;
}

.range-3 {
  width: 23%;
  background: #ffc94b;
}

.range-4 {
  width: 7%;
  background: #f68843;
}

.range-5 {
  width: 55%;
  background: #fe5c5a;
  border-radius: 0 8px 8px 0;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.buttons {
  gap: 0.5rem;

  .button {
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }
}

// Animations
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skin-card {
  animation: fadeIn 0.5s ease;
}
</style>
