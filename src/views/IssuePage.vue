<script>
import { mapGetters } from "vuex";
import VotingBlock from "../components/VotingBlock.vue";
import IssueDetails from "../components/IssueDetails.vue";

export default {
  name: "IssuePage",
  components: {
    VotingBlock,
    IssueDetails,
  },
  computed: {
    ...mapGetters(["issues", "isUserAdmin"]),
    currentIssue() {
      return this.issues.find(
        (issue) => issue.number === this.$route.params.issueId
      );
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
    <v-btn @click="backToPlanning">Back to Planning</v-btn>
    <h3>#{{ currentIssue.number }} {{ currentIssue.title }}</h3>
    <VotingBlock />
    <IssueDetails :issue="currentIssue" />
  </div>
</template>

<style lang="scss" scoped></style>
