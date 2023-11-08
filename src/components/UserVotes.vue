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
  <div>
    <h3 class="area-title">VOTES</h3>
    <ul>
      <li v-for="(user, i) in users" :key="i">
        <span class="name">{{ user.username }}</span>
        <span v-if="hasUserVoted(user.userId)"
          ><img src="@/assets/voted.svg"
        /></span>
        <span v-else> ... </span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.area-title {
  margin-bottom: 16px;
}

.name {
  margin-right: 10px;
}

ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;

  li {
    margin: 0 20px 0 0;
    border: 1px solid;
    padding: 10px;
    display: flex;
    align-items: center;
  }
}
</style>
