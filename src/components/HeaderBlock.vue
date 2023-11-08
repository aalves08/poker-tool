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
      <img src="rancher-icon.svg" />
      <h1>Container UX/UI Team Planning Poker</h1>
    </div>
    <div class="flex">
      <img src="user-icon.svg" />
      <h2>{{ localUser?.username }}</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  padding: 28px 32px;
  border: 1px solid blue;
  .flex {
    display: flex;
    align-items: center;
  }

  img {
    margin-right: 16px;
  }
}
</style>
