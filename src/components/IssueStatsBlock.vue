<script>
export default {
  name: "IssueStatsBlock",
  props: {
    issue: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    calculateAverage() {
      if (this.issue.votes.length) {
        let total = 0;
        this.issue.votes.forEach((v) => {
          total += v.vote.value;
        });

        const average = total / this.issue.votes.length;

        return Math.round(average * 10) / 10;
      }

      return 0;
    },
    calculateVariance() {
      if (this.issue.votes.length) {
        let total = 0;
        this.issue.votes.forEach((v) => {
          total += v.vote.value;
        });
        const median = total / this.issue.votes.length;
        let variance = 0;

        this.issue.votes.forEach((v) => {
          variance += (v.vote.value - median) * (v.vote.value - median);
        });
        variance /= this.issue.votes.length;

        return Math.round(variance * 10) / 10;
      }

      return 0;
    },
  },
};
</script>

<template>
  <div class="points-block">
    <div class="points total-points">
      <span class="points-number">{{ issue.finalVote }}</span>
      <span class="points-text">points</span>
    </div>
    <div class="points stats">
      <span class="points-number">{{ calculateAverage }}</span>
      <span class="points-text">avg.</span>
    </div>
    <div class="points stats">
      <span class="points-number">{{ calculateVariance }}</span>
      <span class="points-text">var.</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
