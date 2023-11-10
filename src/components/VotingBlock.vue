<script>
import { mapGetters } from "vuex";
import IssueStatsBlock from "./IssueStatsBlock";
import UserVotes from "./UserVotes";
import ConfirmStopVotingDialog from "./ConfirmStopVotingDialog";
import ResetIssueDialog from "./ResetIssueDialog";

export default {
  name: "VotingBlock",
  components: {
    IssueStatsBlock,
    ResetIssueDialog,
    ConfirmStopVotingDialog,
    UserVotes,
  },
  data() {
    return {
      finalVote: null,
      showStopVotingDialog: false,
      showResetIssueDialog: false,
    };
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
      return this.votes.find((v) => v.userId === this.localUser.userId) || {};
    },
    isUserVotingInProgress() {
      return this.currentIssue.votingInProgress;
    },
    isFinalVoteCast() {
      return !!this.currentIssue.finalVote;
    },
    isUserVotingFinished() {
      return (
        !this.isUserVotingInProgress && this.currentIssue.finishedUserVoting
      );
    },
    displayVotingCardsArea() {
      return (
        ((!this.isFinalVoteCast && this.isUserAdmin) ||
          (!this.isUserVotingFinished && !this.isUserAdmin)) &&
        !this.isFinalVoteCast
      );
    },
  },
  methods: {
    updateStopVotingDialogVisibility(val) {
      this.showStopVotingDialog = val;
    },
    updateResetIssueDialogVisibility(val) {
      this.showResetIssueDialog = val;
    },
    isVotingBtnDisabled(vote) {
      if (!this.isUserVotingInProgress && !this.isUserVotingFinished) {
        return true;
      }

      if (this.isUserVotingInProgress && !this.isUserVotingFinished) {
        return false;
      }

      if (!this.isUserVotingInProgress && this.isUserVotingFinished) {
        return !vote.deterministic;
      }
    },
    startVotingIssue() {
      this.$store.dispatch("updateVotingIssueStatus", {
        issueId: this.currentIssue?.number,
        started: true,
      });
    },
    castVote(vote) {
      if (!this.isUserVotingFinished) {
        this.$store.dispatch("castVoteOnIssue", {
          issueId: this.currentIssue?.number,
          vote,
        });
      } else {
        this.finalVote = vote.value;
      }
    },
    stopVotingIssue() {
      this.showStopVotingDialog = true;
    },
    resetIssue() {
      this.showResetIssueDialog = true;
    },
    checkVote(vote) {
      if (!this.isUserVotingFinished) {
        return this.userVote.vote?.value == vote.value;
      } else {
        return this.finalVote === vote.value;
      }
    },
    finalizeVoting() {
      this.$store.dispatch("finalizeVoting", {
        issueId: this.currentIssue?.number,
        vote: this.finalVote,
      });

      this.finalVote = null;
    },
    getCardText(vote) {
      let cardText = "";
      if (typeof vote.value === "number") {
        if (vote.value > 0 && vote.value <= 1) {
          cardText = "point";
        } else {
          cardText = "points";
        }
      }
      return cardText;
    },
  },
};
</script>

<template>
  <div class="content-block">
    <h2>ESTIMATION</h2>
    <ConfirmStopVotingDialog
      :showStopVotingDialog="showStopVotingDialog"
      :issueId="currentIssue?.number"
      @updateShowStopVotingDialog="updateStopVotingDialogVisibility"
    />
    <ResetIssueDialog
      :showResetIssueDialog="showResetIssueDialog"
      :issueId="currentIssue?.number"
      @updateShowResetIssueDialog="updateResetIssueDialogVisibility"
    />
    <!-- *** admin-only *** -->
    <div class="admin-controls" v-if="isUserAdmin">
      <!-- start and stop voting on issue -->
      <div v-if="!isUserVotingFinished">
        <v-btn
          class="btn-primary"
          outlined
          @click="startVotingIssue"
          v-if="!isUserVotingInProgress"
        >
          <v-icon start icon="mdi-play"></v-icon>START VOTING</v-btn
        >
        <v-btn class="btn-secondary" outlined @click="stopVotingIssue" v-else
          >STOP VOTING</v-btn
        >
      </div>
      <!-- general copy -->
      <p v-else-if="isUserVotingFinished && !isFinalVoteCast">
        <img
          class="text-icon checkmark-icon"
          src="@/assets/start-voting-icon.svg"
        />
        Voting is closed! Now choose the FINAL ESTIMATION
      </p>
      <p v-else-if="isFinalVoteCast">
        <img
          class="text-icon checkmark-icon"
          src="@/assets/start-voting-icon.svg"
        />
        Voting is closed!
      </p>
    </div>
    <!-- *** user-only *** -->
    <div v-else>
      <p v-if="!isUserVotingInProgress && !isUserVotingFinished">
        <img class="text-icon wait-icon" src="@/assets/hourglass.svg" />
        Wait for the admin to start the voting
      </p>
      <p v-else-if="isUserVotingInProgress">
        <img
          class="text-icon checkmark-icon"
          src="@/assets/start-voting-icon.svg"
        />
        You can vote now!!!
      </p>
      <p v-else-if="isUserVotingFinished && !isFinalVoteCast">
        <img class="text-icon wait-icon" src="@/assets/start-voting-icon.svg" />
        Waiting for FINAL ESTIMATION from the Admin
      </p>
      <p v-else-if="isFinalVoteCast">
        <img
          class="text-icon checkmark-icon"
          src="@/assets/start-voting-icon.svg"
        />
        Voting is closed!
      </p>
    </div>
    <!-- issue stats -->
    <IssueStatsBlock
      v-if="isUserVotingFinished"
      class="issue-stats"
      :issue="currentIssue"
      :show-full-names="true"
      :space-between="false"
      :highlightText="isFinalVoteCast"
      :show-tip="true"
    />
    <!-- reset issue action -->
    <div v-if="isFinalVoteCast && isUserAdmin">
      <v-btn class="btn-danger" outlined @click="resetIssue">
        Reset issue
      </v-btn>
    </div>
    <!-- voting cards -->
    <div v-if="displayVotingCardsArea">
      <h3 v-if="isUserVotingFinished">FINAL ESTIMATION</h3>
      <div class="voting-controls">
        <v-btn
          v-for="(vote, i) in config.voteValues"
          :key="i"
          class="btn-secondary voting-card"
          outlined
          @click="castVote(vote)"
          :disabled="isVotingBtnDisabled(vote)"
          :class="{ hasVoted: checkVote(vote) }"
        >
          <div class="vote-content">
            <span class="vote-number" v-html="vote.label"></span>
            <span class="vote-text">{{ getCardText(vote) }}</span>
          </div>
        </v-btn>
      </div>
      <v-btn
        v-if="isUserVotingFinished"
        class="btn-primary"
        @click="finalizeVoting"
        >Close estimation</v-btn
      >
    </div>
    <!-- user votes pills -->
    <UserVotes
      class="user-votes-block"
      v-if="isUserVotingInProgress || isUserVotingFinished || isFinalVoteCast"
    />
  </div>
</template>

<style lang="scss" scoped>
.voting-controls {
  margin: 1rem 0 2rem 0;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  .voting-card {
    box-sizing: border-box;
    height: auto;
    background: white;
    border-width: 1px;
    border-color: var(--grey-82);
    border-radius: 0;
    padding: 1rem 1rem 0.75rem;

    .vote-content {
      display: flex;
      align-items: flex-end;
      gap: 0.25rem;
    }

    .vote-number {
      font-size: 48px;
      line-height: 36px;
    }
    .vote-text {
      font-size: 14px;
      font-weight: 400;
      text-transform: none;
    }

    &.hasVoted {
      border-color: transparent !important;
      background-color: var(--primary);

      .vote-content {
        color: white;
      }
    }
  }
}

.area-title {
  margin-bottom: 16px;
}
.admin-controls {
  margin-bottom: 20px;
}

.issue-stats {
  margin-bottom: 2rem;
}

.text-icon {
  position: relative;
  margin-right: 10px;

  &.wait-icon {
    top: 2px;
  }
  &.checkmark-icon {
    top: 4px;
  }
}

.vote-btn {
  margin-right: 16px;
}

.user-votes-block {
  margin-top: 2rem !important;
}
</style>
