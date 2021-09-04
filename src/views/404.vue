<template>
  <div
    class="
      page-not-found
      is-flex
      is-flex-direction-column
      is-justify-content-center
      is-align-items-center
      is-too-dark
    "
  >
    <img src="../assets/static/csgo-char.png" class="image-404" alt="" />
    <h1 class="is-size-3 is-text-white">404</h1>
    <h1 class="is-size-4 is-text-white">Page Not Found</h1>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style lang="scss">
.page-not-found {
  min-height: 100vh;

  .image-404 {
    width: 15rem;
    height: auto;
  }
}
</style>
