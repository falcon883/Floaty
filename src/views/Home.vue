<template>
  <div class="home">
    <div v-if="error" class="notification is-danger is-light mb-0">
      <button class="delete" @click="removeNotification"></button>
      <div class="notification-content is-flex is-align-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          ></path>
        </svg>
        <span class="ml-5">{{ error }}</span>
      </div>
    </div>
    <div
      class="
        input-container
        hero
        is-fullheight-with-navbar
        is-justify-content-center
        is-align-items-center
      "
    >
      <div
        class="
          hero-body
          is-flex is-flex-direction-column is-justify-content-center
        "
      >
        <img
          src="../assets/static/float-checker.png"
          class="hero-title mb-6"
          alt=""
        />
        <form
          name="inspect_input_form"
          method="post"
          @submit.prevent="handleFormSubmit"
        >
          <div class="field has-addons">
            <div class="control has-icons-left">
              <span class="icon is-small is-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17.299 5.782c.074-.036.149-.073.223-.112.542-.008 1.084.003 1.626-.003.138.007.088-.176.12-.258a.573.573 0 00.463.055c.262-.086.54-.039.81-.051.176.005.371-.035.516.09.225-.039.455-.034.683-.031l.01-.275c-.178.001-.355.001-.533.005l-.162-.063-.117.086c-.393.032-.791.005-1.184.01.005-.123.065-.26-.042-.36l-.092.109-.123-.151-.004-.604a6.884 6.884 0 00-.141.005v.768h-.147l.013-.194c-1.407-.014-2.813.001-4.22-.007.004-.034.002-.098.002-.131a6.792 6.792 0 01-.255-.066c-.001-.132-.003-.266-.07-.383-.057.176-.091.359-.135.539-.321-.023-.595.203-.92.151-.016-.187-.046-.373-.045-.561.152-.05.339-.071.447-.203.158-.389.054-.828-.109-1.199l.036-.088a5.39 5.39 0 01-.071-.13c-.229-.086-.433-.219-.637-.35-.292-.145-.641-.237-.959-.126-.964.173-1.47 1.405-1.047 2.249l-.153.142c-.186-.255-.517-.185-.78-.121-.556.187-.913.701-1.1 1.234-.232.626-.212 1.307-.131 1.96-.261.121-.553.043-.818.135a11.127 11.127 0 01-.144 1.558c-.021.152-.052.311.004.46.234.055.467.116.706.147a1.465 1.465 0 00-.418.151s-.085.047-.103.082c-.079.68.156 1.337.137 2.016-.314-.066-.302.301-.344.506.044.039.086.08.13.12a1.232 1.232 0 00-.103.221c.055.195-.001.425.173.57-.092.577-.198 1.152-.258 1.733-.025.192.098.382.028.569-.065.212-.228.378-.276.599-.252.249-.391.584-.554.893-.139.247-.113.536-.169.805-.151.262-.369.518-.364.837-.003.172-.036.367.107.495-.115.612-.303 1.208-.445 1.814-.022.231-.037.482.07.695.46.131.94.068 1.407.031.032-.205.037-.414-.065-.6-.167-.592-.005-1.236.29-1.762.259-.047.347-.297.409-.52.135-.494.456-.916.56-1.419.023-.159-.076-.321-.009-.476.073-.167.116-.37.279-.477.15-.097.226-.263.29-.423.049-.148.235-.174.309-.305.138-.241.069-.54.193-.787.162-.382.245-.82.555-1.117.146-.127.137-.34.261-.479.086.169.157.354.293.493.118.051.25.037.376.046.32.469.636.94.953 1.411.133.219.436.264.661.17.067.112.171.209.201.34-.019.201-.047.402-.058.605-.124.117-.215.277-.182.453.042.361.075.723.103 1.086.043.248.171.479.146.738l.137.115c-.023.397.086.797.029 1.19-.179.348-.187.748-.284 1.121.231.268.596.12.896.127.31.036.594.207.914.191.414-.006.832.031 1.242-.044.027-.148.038-.298-.02-.44a2.343 2.343 0 00-.604-.277c-.227-.056-.352-.269-.502-.428-.137-.179-.339-.333-.364-.572-.036-.326-.02-.656-.01-.983.051-.14.16-.26.151-.417.073-.309-.107-.609-.041-.916.107-.681.192-1.367.17-2.057l-.107-.154-.035-.337c-.089-.039-.192-.078-.211-.187-.2-.559-.429-1.106-.686-1.641-.25-.472-.575-.9-.932-1.295-.064-.186-.083-.384-.129-.574.035-.071.07-.142.107-.212.16.022.371.177.504.026.153-.232.275-.494.26-.779-.002-.486.136-.968.067-1.452a.527.527 0 00-.434-.423c.043-.157.086-.315.112-.476.57.293 1.149.696 1.806.754.363.054.542-.287.81-.443.352-.25.259-.738.41-1.096a7.79 7.79 0 01.32-.097c-.055-.349-.198-.684-.174-1.042.193-.142.417-.298.495-.532zm-1.388.574c-.12.26-.298.507-.521.69a3.43 3.43 0 00-.263-.516c-.023-.141.18-.181.271-.251.058-.031.116-.065.173-.099-.117-.125-.008-.203.104-.271l.253-.003c.046.11.073.227.084.347-.024.026-.075.077-.101.103z"
                  />
                  <path
                    d="M5 11a1 1 0 100-2H2a1 1 0 00-1 1v6a1 1 0 001 1h3a1 1 0 100-2H3v-4h2zM21 12h-2v-1h2a1 1 0 100-2h-3a1 1 0 00-1 1v3a1 1 0 001 1h2v1h-2a1 1 0 100 2h3a1 1 0 001-1v-3a1 1 0 00-1-1z"
                    opacity=".35"
                  />
                </svg>
              </span>
              <input
                class="input is-warning is-rounded"
                type="text"
                id="inspect_link"
                name="inspect_link"
                ref="inspect_link"
                placeholder="Enter Inspect Link"
                autocomplete="off"
                value="steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20M3385006551654098834A23213872953D14035082054113612009"
                required
              />
            </div>
            <div class="control">
              <button
                type="submit"
                class="button is-warning is-rounded is-text-white"
                :class="{ 'is-loading': loading }"
              >
                Check
              </button>
            </div>
          </div>
        </form>
        <transition name="fade">
          <div
            v-if="skinData"
            class="
              skin-container
              is-flex
              is-flex-direction-column
              is-justify-content-center
              is-align-items-center
            "
          >
            <div class="hero-body">
              <div
                class="
                  card
                  is-flex
                  is-justify-content-center
                  is-align-items-center
                  is-also-dark
                  p-4
                "
              >
                <div class="card-image mr-2" v-if="skinData.imageurl">
                  <figure class="image">
                    <img :src="skinData.imageurl" alt="" />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="content">
                    <p
                      class="
                        is-size-4
                        has-text-centered has-text-weight-semibold
                        mb-1
                      "
                    >
                      {{ skinData.full_item_name }}
                    </p>
                    <p class="is-size-5 has-text-centered">
                      {{ skinData.wear_name }}
                    </p>
                    <div class="range-wrapper mb-5" v-if="skinData.floatvalue">
                      <div class="marker-track is-flex is-align-items-flex-end">
                        <div
                          class="marker"
                          :style="
                            'margin-left:' +
                            skinData.floatvalue / 0.01 +
                            '%!important;'
                          "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div class="range">
                        <div
                          class="range-1 has-tooltip-arrow"
                          data-tooltip="0.00 - 0.07"
                        ></div>
                        <div
                          class="range-2 has-tooltip-arrow"
                          data-tooltip="0.07 - 0.15"
                        ></div>
                        <div
                          class="range-3 has-tooltip-arrow"
                          data-tooltip="0.15 - 0.38"
                        ></div>
                        <div
                          class="range-4 has-tooltip-arrow"
                          data-tooltip="0.38 - 0.45"
                        ></div>
                        <div
                          class="range-5 has-tooltip-arrow"
                          data-tooltip="0.45 - 1.00"
                        ></div>
                      </div>
                    </div>
                    <p
                      class="is-size-6 has-text-weight-bold"
                      v-if="skinData.itemid || skinData.floatid"
                    >
                      Item ID:
                      <span
                        class="has-text-weight-normal"
                        v-if="skinData.itemid"
                      >
                        {{ skinData.itemid }}
                      </span>
                      <span
                        class="has-text-weight-normal"
                        v-else-if="skinData.floatid"
                      >
                        {{ skinData.floatid }}
                      </span>
                    </p>
                    <p
                      class="is-size-6 has-text-weight-bold"
                      v-if="skinData.paintseed"
                    >
                      Paint Seed:
                      <span class="has-text-weight-normal">
                        {{ skinData.paintseed }}
                      </span>
                    </p>
                    <p
                      class="is-size-6 has-text-weight-bold"
                      v-if="skinData.floatvalue"
                    >
                      Float Value:
                      <span class="has-text-weight-normal">
                        {{ skinData.floatvalue }}
                      </span>
                    </p>
                    <p
                      class="is-size-6 has-text-weight-bold"
                      v-if="skinData.killeatervalue"
                    >
                      StatTrak™ Kills:
                      <span class="has-text-weight-normal">
                        {{ skinData.killeatervalue }}
                      </span>
                    </p>
                    <p class="is-size-6 has-text-weight-bold">
                      Rarity:
                      <span class="has-text-weight-normal">
                        {{ skinData.rarity_name }}
                      </span>
                    </p>
                    <p class="is-size-6 has-text-weight-bold">
                      Origin:
                      <span class="has-text-weight-normal">
                        {{ skinData.origin_name }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      loading: false,
      error: "",
      skinData: "",
      urlRegex: RegExp(
        "^steam:\\/\\/rungame\\/730\\/\\d{17}\\/\\+csgo_econ_action_preview%20(S(.*)|M(.*))A(.*)D(.*)$"
      ),
    };
  },
  methods: {
    handleFormSubmit(e) {
      e.target.querySelector("button[type=submit]").classList.add("is-loading");
      e.target
        .querySelector("button[type=submit]")
        .classList.remove("is-loading");

      let link = this.$refs.inspect_link.value;
      if (this.validateInspectLink(link)) {
        this.loading = true;
        axios
          .get(`https://api.csgofloat.com?url=${link}/`)
          .then((response) => {
            this.loading = false;
            this.skinData = response.data.iteminfo;
          })
          .catch((error) => {
            this.loading = false;
            if (error.response) {
              this.error = error.response.data.error;
            }
          });
      }
    },
    validateInspectLink(link) {
      if (link.length === 0) {
        this.error = "Inspect Link cannot be empty.";
        return false;
      }

      if (!this.urlRegex.test(link)) {
        this.error = "Invalid Inspect Link.";
        return false;
      }

      return true;
    },
    removeNotification(e) {
      e.target.parentElement.remove();
    },
  },
};
</script>

<style lang="scss">
// Transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Hero Background
.home {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/static/subzero-blur.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.hero-title {
  width: 800px;
  height: auto;
}
</style>
