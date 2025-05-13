<template>
  <main>
    <RouterView />
  </main>
  <!-- v-if decides when to add the footernav and where to exclude it. -->
  <footer
    v-if="
      [
        'home',
        'transaction',
        'budgets',
        'scan',
        'settings',
        'account settings',
        'budget settings',
        'balance settings',
      ].includes($route.name)
    "
  >
    <footerNav />
  </footer>
</template>

<script>
import { ref, computed } from "vue";
import footerNav from "./components/footerNav.vue";

export default {
  components: {
    footerNav,
  },
};
</script>

<style scoped></style>
