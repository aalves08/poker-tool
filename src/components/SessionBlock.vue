<script>
import { mapGetters } from "vuex";

export default {
  name: "SessionBlock",
  computed: {
    ...mapGetters(["isUserAdmin", "session"]),
  },
};
</script>

<template>
  <div class="content-block">
    <h2>SESSION</h2>
    <h3>{{ session?.sessionName }}</h3>
  </div>
</template>

<style lang="scss" scoped></style>
