<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import "@/styles/global.scss";

export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
