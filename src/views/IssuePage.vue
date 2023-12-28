<script>
import { mapGetters } from "vuex";
import NotLoggedDialog from "../components/NotLoggedDialog.vue";
import VotingBlock from "../components/VotingBlock.vue";
import IssueDetails from "../components/IssueDetails.vue";

import HandleAuth from "../mixins/HandleAuth";

export default {
  name: "IssuePage",
  components: {
    NotLoggedDialog,
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
    updateDialogVisibility(val) {
      this.showNotLoggedDialog = val;
    },
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
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- welcome to room -->
    <div v-if="!loading">
      <NotLoggedDialog
        :showNotLoggedDialog="showNotLoggedDialog"
        :sessionName="sessionName"
        :userId="userId"
        @updateShowNotLoggedDialog="updateDialogVisibility"
      />
      <div v-if="currentIssue">
        <div class="controls-block">
          <v-btn
            class="btn-secondary btn-back"
            outlined
            @click="backToPlanning"
          >
            <v-icon start icon="mdi-arrow-left"></v-icon>
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
  margin-bottom: 0.5rem;
}

.controls-block {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  .toggle {
    margin-top: 0;
    padding: 0 0 0 1rem;
  }
}
</style>
