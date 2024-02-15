<script>
import JoinSession from "../components/JoinSession";
import HandleAuth from "../mixins/HandleAuth";
import { STORAGE_TOKEN } from "../utils/constants";

export default {
  name: "HomePage",
  components: {
    JoinSession,
  },
  mixins: [HandleAuth],
  data() {
    if (this.$route.query?.error) {
      return this.$router.push({
        name: "login",
        query: {
          error: this.$route.query?.error,
        },
      });
    }

    return {
      sessionToken: this.$route.query.sessionToken,
      username: this.$route.query.username,
      avatar: this.$route.query.avatar,
      disconnected: this.$route.query.disconnected,
    };
  },
  mounted() {
    if (this.sessionToken) {
      localStorage.setItem(STORAGE_TOKEN, this.sessionToken);
      this.$router.replace("/");
    }
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
