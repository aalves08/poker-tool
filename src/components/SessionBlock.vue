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
  <div>
    <div>
      <h3>SESSION</h3>
      <h2>{{ session?.sessionName }}</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
