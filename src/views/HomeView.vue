<template>
  <div>
    <VoteUi />
    <IssuesList />
  </div>
</template>

<script>
import VoteUi from "../components/VoteUi.vue";
import IssuesList from "../components/IssuesList.vue";

export default {
  name: "HomeView",

  components: {
    VoteUi,
    IssuesList,
  },
};
</script>
