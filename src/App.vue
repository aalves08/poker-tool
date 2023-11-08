<template>
  <v-app>
    <HeaderBlock></HeaderBlock>
    <v-main class="router-block">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HeaderBlock from "./components/HeaderBlock.vue";
import "@/styles/global.scss";

export default {
  name: "App",
  components: {
    HeaderBlock,
  },
};
</script>

<style lang="scss" scoped>
.router-block {
  padding: 28px 32px !important;
}
</style>
