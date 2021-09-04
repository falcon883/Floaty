import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/faq",
    name: "faq",
    component: () => import(/* webpackChunkName: "faq" */ "../views/FAQ.vue"),
  },
  {
    path: "/privacy-policy",
    name: "privacypolicy",
    component: () =>
      import(
        /* webpackChunkName: "privacypolicy" */ "../views/PrivacyPolicy.vue"
      ),
  },
  {
    path: "/terms-and-conditions",
    name: "termsandconditions",
    component: () =>
      import(
        /* webpackChunkName: "termsandconditions" */ "../views/TermsAndConditions.vue"
      ),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "404notfound" */ "../views/404.vue"),
    meta: {
      hideNavbar: true,
      hideFooter: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
