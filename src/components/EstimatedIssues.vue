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
  <div>
    <h3>ESTIMATED ISSUES</h3>
    <div class="estimated-issues-block">
      <div class="estimated-issues-card">
        <h3>#9584</h3>
        <h3>Cluster Explorer adjustments for smaller screens</h3>
        <div class="points-block">
          <div class="points">
            <h1>3</h1>
            <span>points</span>
          </div>
          <div class="points">
            <h1>3.7</h1>
            <span>avg.</span>
          </div>
          <div class="points">
            <h1>4.9</h1>
            <span>var.</span>
          </div>
        </div>
      </div>
      <div class="estimated-issues-card">
        <h3>#9584</h3>
        <h3>Cluster Explorer adjustments for smaller screens</h3>
        <div class="points-block">
          <div class="points">
            <h1>3</h1>
            <span>points</span>
          </div>
          <div class="points">
            <h1>3.7</h1>
            <span>avg.</span>
          </div>
          <div class="points">
            <h1>4.9</h1>
            <span>var.</span>
          </div>
        </div>
      </div>
      <div class="estimated-issues-card">
        <h3>#9584</h3>
        <h3>Cluster Explorer adjustments for smaller screens</h3>
        <div class="points-block">
          <div class="points">
            <h1>3</h1>
            <span>points</span>
          </div>
          <div class="points">
            <h1>3.7</h1>
            <span>avg.</span>
          </div>
          <div class="points">
            <h1>4.9</h1>
            <span>var.</span>
          </div>
        </div>
      </div>
      <div class="estimated-issues-card">
        <h3>#9584</h3>
        <h3>Cluster Explorer adjustments for smaller screens</h3>
        <div class="points-block">
          <div class="points">
            <h1>3</h1>
            <span>points</span>
          </div>
          <div class="points">
            <h1>3.7</h1>
            <span>avg.</span>
          </div>
          <div class="points">
            <h1>4.9</h1>
            <span>var.</span>
          </div>
        </div>
      </div>
      <div class="estimated-issues-card">
        <h3>#9584</h3>
        <h3>Cluster Explorer adjustments for smaller screens</h3>
        <div class="points-block">
          <div class="points">
            <h1>3</h1>
            <span>points</span>
          </div>
          <div class="points">
            <h1>3.7</h1>
            <span>avg.</span>
          </div>
          <div class="points">
            <h1>4.9</h1>
            <span>var.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.estimated-issues-block {
  padding: 1rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem 1.5rem;

  .estimated-issues-card {
    padding: 16px;
    border: 1px solid;

    .points-block {
      display: flex;
      justify-content: space-between;

      .points {
        display: flex;
        align-items: flex-end;

        h1 {
          margin: 0 6px -4px 0;
        }
      }
    }
  }
}
</style>
