<script>
import { mapGetters } from "vuex";

export default {
  name: "HeaderBlock",
  computed: {
    ...mapGetters(["localUser"]),
  },
};
</script>

<template>
  <div class="header-container">
    <div class="flex">
      <img src="@/assets/rancher-icon.svg" />
      <h1>Container UX/UI Team Planning Poker</h1>
    </div>
    <div class="flex">
      <img src="@/assets/user-icon.svg" />
      <span>{{ localUser?.username }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  .flex {
    display: flex;
    align-items: center;
  }

  img {
    margin-right: 0.5rem;
  }
}
</style>
