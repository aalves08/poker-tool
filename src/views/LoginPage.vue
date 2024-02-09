<script>
import { getGitHubUrl } from "../utils/github-oauth";

export default {
  name: "LoginPage",
  methods: {
    githubUrl() {
      return getGitHubUrl("/");
    },
  },
};
</script>

<template>
  <div class="login-container">
    <a :href="githubUrl()">LOGIN TO GITHUB</a>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  padding-top: 4rem;
  display: flex;
  justify-content: center;
}
</style>
