<script>
import HandleAuth from "../mixins/HandleAuth";
import JoinSession from "../components/JoinSession";

export default {
  name: "HomePage",
  components: {
    JoinSession,
  },
  mixins: [HandleAuth],
  data() {
    return {
      disconnected: this.$route.query.disconnected,
    };
  },
  methods: {},
};
</script>

<template>
  <div class="homepage-container">
    <div class="homepage-content">
      <h1 v-if="disconnected">
        You have been disconnected from your previous session! Create a new
        session:
      </h1>
      <h1 v-else>Welcome to the UX/UI planning tool! Create a session:</h1>
      <JoinSession />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.homepage-container {
  display: flex;
  justify-content: center;

  .homepage-content {
    margin-top: 4rem;
    width: 500px;

    .btn-primary {
      margin-top: 1.5rem;
    }
  }
}
</style>
