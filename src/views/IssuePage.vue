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
    <v-btn class="btn-secondary btn-back" outlined @click="backToPlanning">
      <v-icon start icon="mdi-arrow-left"></v-icon>
      Back to Planning
    </v-btn>
    <h1>#{{ currentIssue.number }} {{ currentIssue.title }}</h1>
    <VotingBlock />
    <IssueDetails :issue="currentIssue" />
  </div>
</template>

<style lang="scss" scoped>
@import "./src/styles/global.scss";

h1 {
  font-size: 20px;
  margin-bottom: 0.5rem;
}
.btn-back {
  margin-bottom: 1rem;
}
</style>
