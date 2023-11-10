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
    ...mapGetters(["issues", "isUserAdmin"]),
    currentIssue() {
      if (this.issues && this.issues.length) {
        return this.issues?.find(
          // loose equality because issueId is a string and issue.number is a number....
          (issue) => issue.number == this.$route.params.issueId
        );
      }
      return {};
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
        <v-btn class="btn-secondary btn-back" outlined @click="backToPlanning">
          <v-icon start icon="mdi-arrow-left"></v-icon>
          Back to Planning
        </v-btn>
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
.btn-back {
  margin-bottom: 1rem;
}
</style>
