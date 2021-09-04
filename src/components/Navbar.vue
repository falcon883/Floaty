<template>
  <nav
    class="navbar is-dark"
    role="navigation"
    aria-label="main navigation"
    v-if="!$route.meta.hideNavbar"
  >
    <div class="navbar-brand">
      <router-link
        class="navbar-item"
        to="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="150"
          height="35"
          viewBox="0 0 296 72"
        >
          <defs>
            <linearGradient id="A">
              <stop stop-color="#fbb040" offset="0"></stop>
              <stop stop-color="#f9ed32" offset="1"></stop>
            </linearGradient>
          </defs>
          <path
            d="M60.783 964.362l27.181.883-27.181 25.996zm-1.974 1.451v26.784H33.54c8.617-8.733 16.88-17.81 25.268-26.784zm27.705 3.628L90 970.64l-12.588 7.477zm-68.183 2.966h5.523l12.865 14.071-5.985 6.12H18.33v-20.191zm-1.975 1.23v5.836H10zm3.363 20.98h38.627l-10.767 29.435zm39.09 4.543v41.202l-12.588-6.878 12.588-34.325z"
            fill="url(#A)"
            transform="matrix(.947368 0 0 .947368 -9.47367 -913.605484)"
          ></path>
          <path
            d="M126.698 22.244v9.39H105.39v3.13h15.811v3.13H102.26v-9.39h21.308v-3.13H99.13v21.87h3.13v-6.26h3.13v9.39H96v-28.13h30.698zm7.143 3.13v15.61h27.729v9.39h-30.859v-3.13h27.769v-3.13h-27.769v-21.87h9.39v15.65h-3.13v-12.52h-3.13zM179.587 21c8.427 0 15.289 6.862 15.289 15.329s-6.862 15.289-15.289 15.289c-8.467 0-15.329-6.822-15.329-15.289A15.33 15.33 0 0 1 179.587 21zm0 27.528c6.742 0 12.199-5.457 12.199-12.199s-5.457-12.239-12.199-12.239a12.24 12.24 0 0 0-12.239 12.239c0 6.742 5.457 12.199 12.239 12.199zm0-21.348c5.016 0 9.109 4.133 9.109 9.149a9.13 9.13 0 0 1-9.109 9.109c-5.016 0-9.149-4.093-9.149-9.109s4.133-9.149 9.149-9.149zm0 15.169a6.01 6.01 0 0 0 6.019-6.019c0-3.371-2.689-6.059-6.019-6.059a6.03 6.03 0 0 0-6.059 6.059c0 3.331 2.689 6.019 6.059 6.019zm35.313-1.364l1.806-3.13 5.457 9.39h3.612c-.803-1.284-8.427-14.326-9.069-15.61l-7.865 13.644-2.929 5.096h-10.835c.602-1.003 4.655-8.066 8.547-14.848l7.665-13.283h3.612l-7.464 12.921-6.942 12.079h3.612l12.6-21.87 14.486 25h-10.835zm13.965-9.35v-9.39h30.698v9.39h-7.544v-3.13h4.414v-3.13h-24.438v3.13h10.674l-.04 18.74h3.13v-18.74h3.13v21.87h-9.39v-18.74h-10.634zm55.778-9.39H296l-10.714 15.409v12.721h-9.39v-12.64l-10.714-15.49h11.396l2.247 3.291-1.846 2.769-2.006-2.929h-3.812l7.865 11.356.04.04v10.474h3.21V36.73l7.745-11.356h-3.812l-5.618 8.146-1.806-2.568z"
            fill="#fff"
          ></path>
        </svg>
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar"
        @click="toggleHamburger"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbar" class="navbar-menu is-also-dark">
      <div class="navbar-end">
        <router-link
          class="navbar-item is-text-white"
          to="/"
          exact-active-class="active"
        >
          Home
        </router-link>
        <router-link
          class="navbar-item is-text-white"
          to="/faq"
          exact-active-class="active"
        >
          FAQ
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";
@import "@/assets/css/mixins.scss";

.navbar {
  padding: 0.5em;
}

.navbar-end {
  align-items: center !important;
}

a.navbar-item,
a.navbar-link {
  border-radius: 10px;
  margin-left: 0.5rem;
}

.navbar-link.is-active,
a.navbar-item.is-active,
a.active {
  background-color: $logo-clr-1 !important;
}

.navbar-link:not(.is-arrowless)::after {
  border-color: white !important;
}

@include mq-max-width(custom-for-nav) {
  .navbar-link:focus,
  a.navbar-item:focus,
  .navbar-link:focus-within,
  a.navbar-item:focus-within,
  .navbar-link:hover,
  a.navbar-item:hover {
    color: #292929 !important;
  }

  .navbar-link.active,
  a.navbar-item.active {
    color: white !important;
  }
}
</style>

<script>
export default {
  methods: {
    toggleHamburger() {
      document.getElementById("navbar").classList.toggle("open");
    },
  },
};
</script>
