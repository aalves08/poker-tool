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
        <v-chip
          class="user-chip"
          :class="{ hasVoted: hasUserVoted(user.userId) }"
          variant="outlined"
        >
          {{ user.username }}
          <img
            v-if="!hasUserVoted(user.userId)"
            class="vote-checkmark"
            src="@/assets/voted.svg"
          />
          <span v-else class="pending-vote-dots"> ··· </span>
        </v-chip>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.votes-block {
  margin-bottom: 2rem;
}
.area-title {
  margin-bottom: 16px;
}

.name {
  margin-right: 10px;
}

.pending-vote-dots {
  font-size: 24px;
  margin-left: 4px;
}

.vote-checkmark {
  width: 20px;
  height: 20px;
  margin-left: 4px;
}
</style>
