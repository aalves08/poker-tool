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
    <!-- Room not found!!! -->
    <div v-if="!loading && roomNotFound">
      <h1>ROOM WITH ID {{ room }} HASN'T BEEN FOUND!</h1>
      <v-btn @click="backToHomepage">Back to homepage</v-btn>
    </div>
    <!-- welcome to room -->
    <div v-else-if="!loading">
      <NotLoggedDialog
        :showNotLoggedDialog="showNotLoggedDialog"
        :sessionName="sessionName"
        :userId="userId"
        @updateShowNotLoggedDialog="updateDialogVisibility"
      />
      <div v-if="currentIssue">
        <v-btn @click="backToPlanning">Back to Planning</v-btn>
        <h3>#{{ currentIssue.number }} {{ currentIssue.title }}</h3>
        <VotingBlock />
        <IssueDetails :issue="currentIssue" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
