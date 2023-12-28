<script>
import { mapGetters } from "vuex";
import NotLoggedDialog from "../components/NotLoggedDialog.vue";
import UserList from "../components/UserList.vue";
import IssuesList from "../components/IssuesList.vue";
import SessionBlock from "../components/SessionBlock.vue";
import EstimatedIssues from "../components/EstimatedIssues.vue";

import HandleAuth from "../mixins/HandleAuth";

export default {
  name: "RoomPage",
  components: {
    NotLoggedDialog,
    UserList,
    IssuesList,
    SessionBlock,
    EstimatedIssues,
  },

  mixins: [HandleAuth],
  computed: {
    ...mapGetters(["isUserAdmin", "issues"]),
    estimatedIssues() {
      if (this.issues?.length) {
        return this.issues?.filter((issue) => issue.finalVote);
      }
      return [];
    },
  },
  methods: {
    updateDialogVisibility(val) {
      this.showNotLoggedDialog = val;
    },
    // sample logic to add a label to an issue - needs permissions from the repo
    // async addLabelToIssue() {
    //   this.$axios({
    //     method: "post",
    //     headers: {
    //       Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
    //       "X-GitHub-Api-Version": "2022-11-28",
    //     },
    //     url: `https://api.github.com/repos/rancher/dashboard/issues/8087/labels`,
    //     data: {
    //       labels: ["alex-test"],
    //     },
    //   });
    // },
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
      <div>
        <!-- <v-btn outlined class="btn-danger" @click="addLabelToIssue()">
          add label
        </v-btn> -->
        <SessionBlock />
        <div class="placeholder-block" v-if="!estimatedIssues.length">
          <h1 class="placeholder-text">Start voting to see some stats</h1>
        </div>
        <UserList />
        <EstimatedIssues />
        <IssuesList />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
