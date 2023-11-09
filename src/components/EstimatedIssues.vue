<script>
import { mapGetters } from "vuex";

export default {
  name: "EstimatedIssues",
  computed: {
    ...mapGetters(["issues"]),
    estimatedIssues() {
      if (this.issues?.length) {
        return this.issues?.filter((issue) => issue.finalVote);
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
        <div class="points-block">
          <div class="points total-points">
            <span class="points-number">3</span>
            <span class="points-text">points</span>
          </div>
          <div class="points stats">
            <span class="points-number">3.7</span>
            <span class="points-text">avg.</span>
          </div>
          <div class="points stats">
            <span class="points-number">4.9</span>
            <span class="points-text">var.</span>
          </div>
        </div>
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

    &:hover {
      border: 1px solid red !important;
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

    .points-block {
      flex: 1;
      display: flex;
      justify-content: space-between;

      .points {
        display: flex;
        align-items: flex-end;
        color: var(--grey-46);

        .points-number {
          font-size: 20px;
          margin-right: 4px;
        }
        .points-text {
          font-size: 1rem;
        }
      }
      .total-points {
        .points-number {
          font-size: 48px;
          line-height: 40px;
        }
      }
    }
  }
}
</style>
