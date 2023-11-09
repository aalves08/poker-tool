<script>
import { mapGetters } from "vuex";

export default {
  name: "UserVotes",
  computed: {
    ...mapGetters(["issues", "users"]),
    currentIssue() {
      if (this.issues && this.issues.length) {
        return this.issues?.find(
          // loose equality because issueId is a string and issue.number is a number....
          (issue) => issue.number == this.$route.params.issueId
        );
      }
      return {};
    },
    votes() {
      return this.currentIssue.votes || {};
    },
  },
  methods: {
    removeUser(socketId) {
      this.$store.dispatch("forceRemoveUser", socketId);
    },
    hasUserVoted(userId) {
      const vote = this.votes.find((v) => v.userId === userId);

      return !!vote;
    },
  },
};
</script>

<template>
  <div class="votes-block">
    <h2>VOTES</h2>
    <ul class="participants-list">
      <li v-for="(user, i) in users" :key="i">
        <v-chip class="user-chip" variant="outlined">
          {{ user.username }}
          <span v-if="hasUserVoted(user.userId)"
            ><img class="check-icon" src="@/assets/voted.svg"
          /></span>
          <span v-else> ... </span>
        </v-chip>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.votes-block {
  margin-bottom: 2rem;

  span {
    margin-left: 6px;
  }

  img {
    margin-top: 5px;
  }

  .check-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
