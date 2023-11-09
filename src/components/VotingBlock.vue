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
      console.log("this.currentIssue", this.currentIssue);
      return this.currentIssue.votes || [];
    },
    userVote() {
      return this.votes.find((v) => v.userId === this.localUser.userId) || {};
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
    getCardText(voteValue) {
      let cardText = "";
      if (typeof voteValue === "number") {
        cardText = voteValue === 1 || voteValue === 0.5 ? "point" : "points";
      }
      return cardText;
    },
  },
};
</script>

<template>
  <div>
    <h2>ESTIMATION</h2>
    <div class="admin-controls" v-if="isUserAdmin">
      <v-btn
        class="btn-primary"
        outlined
        @click="startVotingIssue"
        v-if="!currentIssue.votingInProgress"
      >
        <v-icon start icon="mdi-play"></v-icon> START VOTING
      </v-btn>
      <v-btn class="btn-secondary" outlined @click="stopVotingIssue" v-else
        >STOP VOTING</v-btn
      >
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
        class="btn-secondary voting-card"
        outlined
        @click="castVote(vote.value)"
        :disabled="!currentIssue.votingInProgress"
        :class="{ hasVoted: userVote.vote == vote.value }"
      >
        <div class="vote-content">
          <span class="vote-number" v-html="vote.label"></span>
          <span class="vote-text">{{ getCardText(vote.value) }}</span>
        </div>
      </v-btn>
    </div>
    <UserVotes
      class="mt"
      v-if="currentIssue.votingInProgress || currentIssue.finishedVoting"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "./src/styles/global.scss";
.voting-controls {
  margin: 1rem 0 2rem 0;
  display: flex;
  gap: 0.5rem;

  .voting-card {
    height: auto;
    background: white;
    border-width: 1px;
    border-color: $grey-82;
    border-radius: 0;
    padding: 1rem 1rem 0.75rem;

    .vote-content {
      display: flex;
      align-items: end;
      gap: 0.25rem;
    }

    .vote-number {
      font-size: 48px;
      line-height: 36px;
    }
    .vote-text {
      font-size: 14px;
      font-weight: 300;
    }
  }
}

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

.hasVoted {
  border: 2px solid;
}
</style>
