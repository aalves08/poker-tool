<script>
import { mapGetters } from "vuex";
import VotingBlock from "../components/VotingBlock.vue";
import IssueDetails from "../components/IssueDetails.vue";

import HandleAuth from "../mixins/HandleAuth";

export default {
  name: "IssuePage",
  components: {
    VotingBlock,
    IssueDetails,
  },
  mixins: [HandleAuth],
  computed: {
    ...mapGetters(["issues", "isUserAdmin", "isVotingHidden"]),
    currentIssue() {
      if (this.issues && this.issues.length) {
        return this.issues?.find(
          // loose equality because issueId is a string and issue.number is a number....
          (issue) => issue.number == this.$route.params.issueId
        );
      }
      return {};
    },
    votingHidden: {
      get: function () {
        return this.isVotingHidden;
      },
      set: function (neu) {
        this.$store.dispatch("toggleVotingVisibility", neu);
      },
    },
  },
  methods: {
    backToPlanning() {
      this.$router.push({
        name: "room",
        params: {
          roomId: this.$route.params.roomId,
        },
      });
    },
  },
};
</script>

<template>
  <div>
    <!-- loading -->
    <v-overlay :value="loadingValidateRoom">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- welcome to room -->
    <div v-if="!loadingValidateRoom">
      <div v-if="currentIssue">
        <div class="controls-block">
          <v-btn class="btn-secondary btn-back" text @click="backToPlanning">
            <v-icon dense left>mdi-arrow-left</v-icon>
            Back to Planning
          </v-btn>
          <v-switch
            v-if="isUserAdmin"
            v-model="votingHidden"
            class="toggle"
            hide-details
            :true-value="true"
            :false-value="false"
            label="Hide votes"
          ></v-switch>
        </div>
        <h1>#{{ currentIssue.number }} {{ currentIssue.title }}</h1>
        <VotingBlock />
        <IssueDetails />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 20px;
  margin-bottom: 2rem;
  font-weight: 400;
  line-height: 1.25;
}

.controls-block {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  .toggle {
    margin-top: 0;
    padding: 0 0 0 1rem;

    .v-label {
      color: var(--body-text) !important;
    }
  }
}
</style>
