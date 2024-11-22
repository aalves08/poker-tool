<script>
import { getGitHubUrl } from "../utils/github-oauth";

export default {
  name: "LoginPage",
  data() {
    // On login page, make sure we always clear the local user
    this.$store.dispatch("updateLocalUserInfo", null);

    let errMsg = "";

    if (this.$route?.query?.error) {
      switch (this.$route?.query?.error) {
        case "no_code":
          errMsg = "Github application code is missing.";
          break;
        case "no_oauth_token":
          errMsg =
            "Github Oauth token is missing or user does not have enough permissions.";
          break;
        case "no_user":
          errMsg = "Failing to retrieve Github user information.";
          break;
        case "not_member":
          errMsg =
            "User does not have the necessary permissions to use this app.";
          break;
        case "invalid_token":
          errMsg = "User session is invalid. Please login again.";
          break;
      }
    }

    return {
      errMsg,
    };
  },
  methods: {
    githubUrl() {
      return getGitHubUrl("/");
    },
  },
};
</script>

<template>
  <div class="login-container">
    <h3 class="login-disclaimer">
      You need to belong to the Rancher organisation in order to login to the
      app.
    </h3>
    <v-btn class="btn-primary login-link">
      <a :href="githubUrl()">LOGIN WITH GITHUB</a>
    </v-btn>
    <h3 v-if="errMsg" class="login-error">Error: {{ errMsg }}</h3>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-disclaimer {
    margin-top: 2em;
  }

  .login-error {
    margin-top: 2em;
    color: var(--danger);
  }

  .login-link {
    margin-top: 2em;
    display: block;
    padding: 0 !important;

    a {
      padding: 0 16px;
      color: #fff !important;
      text-decoration: none !important;
      height: 36px;
      padding-top: 6px;
    }
  }
}
</style>
