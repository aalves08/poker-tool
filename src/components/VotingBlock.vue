<script>
import { mapGetters } from "vuex";
import UserVotes from "./UserVotes";

export default {
  name: "VotingBlock",
  components: {
    UserVotes,
  },
  computed: {
    ...mapGetters(["config", "isUserAdmin", "issues", "localUser"]),
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
      return this.currentIssue.votes || [];
    },
    userVote() {
      return this.votes.find((v) => v.userId === this.localUser.userId);
    },
  },
  methods: {
    startVotingIssue() {
      this.$store.dispatch("updateVotingIssueStatus", {
        issueId: this.currentIssue?.number,
        started: true,
      });
    },
    stopVotingIssue() {
      this.$store.dispatch("updateVotingIssueStatus", {
        issueId: this.currentIssue?.number,
        stopped: true,
      });
    },
    castVote(vote) {
      this.$store.dispatch("castVoteOnIssue", {
        issueId: this.currentIssue?.number,
        vote,
      });
    },
  },
};
</script>

<template>
  <div>
    <h3 class="area-title">ESTIMATION</h3>
    <div class="admin-controls" v-if="isUserAdmin">
      <v-btn @click="startVotingIssue" v-if="!currentIssue.votingInProgress"
        >START VOTING</v-btn
      >
      <v-btn @click="stopVotingIssue" v-else>STOP VOTING</v-btn>
    </div>
    <div v-else>
      <p v-if="!currentIssue.votingInProgress">
        <img class="text-icon" src="@/assets/hourglass.svg" />
        Wait for the admin to start the voting
      </p>
      <p v-else>
        <img class="text-icon" src="@/assets/start-voting-icon.svg" />
        You can vote now!!!
      </p>
    </div>
    <div class="voting-controls">
      <v-btn
        v-for="(vote, i) in config.voteValues"
        :key="i"
        @click="castVote(vote.value)"
        :disabled="!currentIssue.votingInProgress"
        class="vote-btn"
        :class="{ hasVoted: userVote.vote == vote.value }"
      >
        <span v-html="vote.label"></span>
      </v-btn>
    </div>
    <UserVotes
      class="mt"
      v-if="currentIssue.votingInProgress || currentIssue.finishedVoting"
    />
  </div>
</template>

<style lang="scss" scoped>
.area-title {
  margin-bottom: 16px;
}
.admin-controls {
  margin-bottom: 20px;
}
.text-icon {
  margin-right: 10px;
}

.vote-btn {
  margin-right: 16px;
}
.mt {
  margin-top: 20px;
}

.hasVoted {
  border: 2px solid;
}
</style>
