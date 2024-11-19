<script>
export default {
  name: "StatsBlock",
  props: {
    estimatedIssues: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    overallStats() {
      let sprintPoints = 0;
      let average = 0;

      if (this.estimatedIssues.length) {
        this.estimatedIssues.forEach((issue) => {
          sprintPoints += issue.finalVote;

          average =
            Math.round((sprintPoints / this.estimatedIssues.length) * 10) / 10;
        });
      }

      return {
        sprintPoints,
        average,
        estimatedIssues: this.estimatedIssues.length,
      };
    },
  },
};
</script>

<template>
  <div class="stats-block">
    <div class="stat">
      <span class="stat-value">{{ overallStats.sprintPoints }}</span>
      <span class="stat-text">sprint points</span>
    </div>
    <div class="stat">
      <span class="stat-value">{{ overallStats.average }}</span>
      <span class="stat-text">average points</span>
    </div>
    <div class="stat">
      <span class="stat-value">{{ overallStats.estimatedIssues }}</span>
      <span class="stat-text">issues estimated</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats-block {
  display: flex;
  gap: 2rem;

  .stat {
    display: flex;
    align-items: flex-end;
    color: var(--body-text);

    .stat-value {
      font-size: 48px;
      line-height: 42px;
      font-weight: 300;
      margin-right: 8px;
    }
    .stat-text {
      font-size: 1rem;
      font-weight: 300;
    }
  }
}
</style>
