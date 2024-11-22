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
      githubToken: this.$route.query.githubToken,
      sessionToken: this.$route.query.sessionToken,
      username: this.$route.query.username,
      avatar: this.$route.query.avatar,
      disconnected: this.$route.query.disconnected,
    };
  },
  // needs to be "beforeMount" because HandleAuth uses "mounted" and this needs to run before
  beforeMount() {
    if (this.githubToken) {
      this.$store.dispatch("updateGithubApiToken", this.githubToken);
    }

    if (this.sessionToken) {
      localStorage.setItem(STORAGE_TOKEN, this.sessionToken);
      this.$router.replace("/");
    }
  },
  methods: {},
};
</script>

<template>
  <div>
    <!-- loading -->
    <v-overlay :value="loadingValidateToken">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- welcome to room -->
    <div v-if="!loadingValidateToken" class="homepage-container">
      <div class="homepage-content">
        <img class="hero-img" src="@/assets/SUSE_Illustration_Train.svg" />
        <h1 v-if="disconnected">
          You have been disconnected from your previous session! Create a new
          session:
        </h1>
        <h1 v-else>Welcome to the UX/UI planning tool! Create a session:</h1>
        <JoinSession />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.homepage-container {
  display: flex;
  justify-content: center;

  h1 {
    margin-bottom: 1.5rem;
  }

  .homepage-content {
    margin-top: 2rem;
    width: 500px;

    .btn-primary {
      margin-top: 1.5rem;
    }
  }

  .hero-img {
    margin-bottom: 2rem;
  }
}
</style>
