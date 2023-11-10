<script>
export default {
  name: "NotFoundPage",
  methods: {
    backToHomepage() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1>The session you are looking for doesn't exist!</h1>
      <v-btn class="btn-primary" @click="backToHomepage"
        >Back to homepage</v-btn
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found-container {
  display: flex;
  justify-content: center;

  .not-found-content {
    margin-top: 4rem;

    .btn-primary {
      margin-top: 1.5rem;
    }
  }
}
</style>
