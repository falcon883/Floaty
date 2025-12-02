import { ref } from "vue";
import { floatService } from "@/services/floatService";

/**
 * Composable for managing float checker functionality
 * @returns {Object} Float checker state and methods
 */
export function useFloatChecker() {
  const loading = ref(false);
  const error = ref("");
  const skinData = ref(null);
  const recentSearches = ref([]);

  const INSPECT_LINK_REGEX =
    /^steam:\/\/rungame\/730\/\d{17}\/\+csgo_econ_action_preview%20(S(.*)|M(.*))A(.*)D(.*)$/;
  const MAX_RECENT_SEARCHES = 10;

  /**
   * Validates an inspect link
   * @param {string} link - The inspect link to validate
   * @returns {Object} Validation result with isValid and message
   */
  const validateInspectLink = (link) => {
    if (!link || link.trim().length === 0) {
      return { isValid: false, message: "Inspect link cannot be empty." };
    }

    if (!INSPECT_LINK_REGEX.test(link)) {
      return { isValid: false, message: "Invalid inspect link format." };
    }

    return { isValid: true, message: "" };
  };

  /**
   * Loads recent searches from localStorage
   */
  const loadRecentSearches = () => {
    try {
      const stored = localStorage.getItem("recentSearches");
      if (stored) {
        recentSearches.value = JSON.parse(stored);
      }
    } catch (err) {
      console.error("Failed to load recent searches:", err);
    }
  };

  /**
   * Saves a search to recent searches
   * @param {Object} skinInfo - The skin data to save
   */
  const saveToRecentSearches = (skinInfo) => {
    try {
      const searchItem = {
        id: skinInfo.itemid || skinInfo.floatid,
        name: skinInfo.full_item_name,
        wear: skinInfo.wear_name,
        float: skinInfo.floatvalue,
        imageUrl: skinInfo.imageurl,
        timestamp: Date.now(),
      };

      // Remove duplicates
      recentSearches.value = recentSearches.value.filter(
        (item) => item.id !== searchItem.id,
      );

      // Add to beginning
      recentSearches.value.unshift(searchItem);

      // Limit to MAX_RECENT_SEARCHES
      if (recentSearches.value.length > MAX_RECENT_SEARCHES) {
        recentSearches.value = recentSearches.value.slice(
          0,
          MAX_RECENT_SEARCHES,
        );
      }

      localStorage.setItem(
        "recentSearches",
        JSON.stringify(recentSearches.value),
      );
    } catch (err) {
      console.error("Failed to save recent search:", err);
    }
  };

  /**
   * Clears recent searches
   */
  const clearRecentSearches = () => {
    recentSearches.value = [];
    try {
      localStorage.removeItem("recentSearches");
    } catch (err) {
      console.error("Failed to clear recent searches:", err);
    }
  };

  /**
   * Checks the float value for a given inspect link
   * @param {string} inspectLink - The inspect link to check
   * @returns {Promise<boolean>} Success status
   */
  const checkFloat = async (inspectLink) => {
    // Validate input
    const validation = validateInspectLink(inspectLink);
    if (!validation.isValid) {
      error.value = validation.message;
      return false;
    }

    // Reset state
    loading.value = true;
    error.value = "";
    skinData.value = null;

    try {
      const { data, error: apiError } =
        await floatService.getSkinData(inspectLink);

      if (apiError) {
        error.value = apiError;
        return false;
      }

      skinData.value = data;
      saveToRecentSearches(data);
      return true;
    } catch (err) {
      error.value = "An unexpected error occurred. Please try again.";
      console.error("Float check error:", err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Clears the current error
   */
  const clearError = () => {
    error.value = "";
  };

  /**
   * Resets all state
   */
  const reset = () => {
    loading.value = false;
    error.value = "";
    skinData.value = null;
  };

  return {
    // State
    loading,
    error,
    skinData,
    recentSearches,

    // Methods
    checkFloat,
    validateInspectLink,
    clearError,
    reset,
    loadRecentSearches,
    clearRecentSearches,
  };
}
