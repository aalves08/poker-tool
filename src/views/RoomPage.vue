<script>
import NotLoggedDialog from "../components/NotLoggedDialog.vue";
import UserList from "../components/UserList.vue";
import IssuesList from "../components/IssuesList.vue";
import SessionBlock from "../components/SessionBlock.vue";

import HandleAuth from "../mixins/HandleAuth";

export default {
  name: "RoomPage",
  components: {
    NotLoggedDialog,
    UserList,
    IssuesList,
    SessionBlock,
  },

  mixins: [HandleAuth],
  methods: {
    backToHomepage() {
      this.roomNotFound = false;
      this.loading = true;

      this.$router.push({ name: "home" });
    },
    updateDialogVisibility(val) {
      this.showNotLoggedDialog = val;
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
      <div>
        <SessionBlock />
        <UserList />
        <IssuesList />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
