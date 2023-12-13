<script>
import { mapGetters } from "vuex";
import IssueStatsBlock from "./IssueStatsBlock.vue";

export default {
  name: "EstimatedIssues",
  components: {
    IssueStatsBlock,
  },
  computed: {
    ...mapGetters(["issues"]),
    estimatedIssues() {
      if (this.issues?.length) {
        return this.issues.filter(
          (issue) => typeof issue.finalVote === "number"
        );
      }
      return [];
    },
  },
  methods: {
    openIssue(issueId) {
      this.$router.push({
        name: "issue",
        params: {
          roomId: this.$route.params.roomId,
          issueId,
        },
      });
    },
  },
};
</script>

<template>
  <div class="content-block" v-if="estimatedIssues.length">
    <h2 class="section-title">ESTIMATED ISSUES</h2>
    <div class="estimated-issues-block">
      <div
        class="estimated-issues-card"
        v-for="(issue, i) in estimatedIssues"
        :key="i"
        @click="openIssue(issue.number)"
      >
        <h3 class="estimated-card__title">
          <span class="issue-number">#{{ issue.number }}</span>
          <span class="issue-name">{{ issue.title }}</span>
        </h3>

        <IssueStatsBlock :issue="issue" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section-title {
  margin-bottom: 1rem;
}
.estimated-issues-block {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem 1rem;
  margin-bottom: 2rem;

  .estimated-issues-card {
    padding: 16px;
    border: 1px solid var(--grey-82);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    cursor: pointer;
    box-shadow: 0px 0px 0px 0px var(--grey-82);
    transition: box-shadow ease 150ms;

    &:hover {
      box-shadow: 0px 2px 10px 0px var(--grey-82),
        0px 1px 1px 0px var(--grey-46);
    }

    .estimated-card__title {
      display: flex;
      flex-direction: column;
      .issue-number {
        font-size: 1rem;
        font-weight: 400;
      }
      .issue-name {
        font-size: 14px;
        font-weight: 300;
        line-height: 20px;
      }
    }
  }
}
</style>
