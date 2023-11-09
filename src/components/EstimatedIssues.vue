<script>
import { mapGetters } from "vuex";

export default {
  name: "EstimatedIssues",
  computed: {
    ...mapGetters(["issues"]),
    estimatedIssues() {
      return this.issues.filter((issue) => issue.finishedVoting);
    },
  },
};
</script>

<template>
  <div class="content-block">
    <h2 class="section-title">ESTIMATED ISSUES</h2>
    <div class="estimated-issues-block">
      <div class="estimated-issues-card">
        <h3 class="estimated-card__title">
          <span class="issue-number">#9584</span>
          <span class="issue-name"
            >Cluster Explorer adjustments for smaller screens</span
          >
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
      <div class="estimated-issues-card">
        <h3 class="estimated-card__title">
          <span class="issue-number">#9584</span>
          <span class="issue-name"
            >Cluster Explorer adjustments for smaller screens</span
          >
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
      <div class="estimated-issues-card">
        <h3 class="estimated-card__title">
          <span class="issue-number">#9584</span>
          <span class="issue-name"
            >Cluster Explorer adjustments for smaller screens</span
          >
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
      <div class="estimated-issues-card">
        <h3 class="estimated-card__title">
          <span class="issue-number">#9584</span>
          <span class="issue-name"
            >Cluster Explorer adjustments for smaller screens</span
          >
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
      <div class="estimated-issues-card">
        <h3 class="estimated-card__title">
          <span class="issue-number">#9584</span>
          <span class="issue-name"
            >Cluster Explorer adjustments for smaller screens</span
          >
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
    border: 1px solid $grey-82;
    display: flex;
    flex-direction: column;
    gap: 1rem;

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
        color: $grey-46;

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
