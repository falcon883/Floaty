<template>
  <footer class="footer p-0 is-also-dark" v-if="!$route.meta.hideFooter">
    <div
      class="p-2 is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
    >
      <div
        class="is-flex is-flex-direction-row is-align-items-center is-justify-content-center is-flex-wrap-wrap"
      >
        <router-link class="footer-item" to="/"> Home </router-link>
        <router-link class="footer-item" to="/faq"> FAQ </router-link>
        <router-link class="footer-item" to="/privacy-policy">
          Privacy Policy
        </router-link>
        <router-link class="footer-item" to="/terms-and-conditions">
          Terms and Conditions
        </router-link>
      </div>
    </div>
    <div class="copyright is-too-dark p-2">
      <p>
        Copyright &#xA9; {{ new Date().getFullYear() }} Floaty. All Rights
        Reserved
      </p>
    </div>
  </footer>
</template>

<style lang="scss">
@import "../assets/css/variables.scss";

footer .footer-item,
footer .copyright {
  color: white;
  font-size: 0.8rem;
  text-align: center;
}

footer .footer-item {
  padding: 0.5em;
  margin: 0.25rem;
}

footer .footer-item:hover {
  color: $logo-clr-1;
}
</style>
