<script>
export default {
  name: "IssueStatsBlock",
  props: {
    issue: {
      type: Object,
      default: () => {},
    },
    spaceBetween: {
      type: Boolean,
      default: () => true,
    },
    showFullNames: {
      type: Boolean,
      default: () => false,
    },
    highlightText: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    calculateAverage() {
      if (this.issue?.votes?.length) {
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
      if (this.issue?.votes?.length) {
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
    pointsText() {
      return this.issue.finalVote > 0 && this.issue.finalVote <= 1
        ? "point"
        : "points";
    },
  },
};
</script>

<template>
  <div
    class="points-block"
    :class="{ 'space-between': spaceBetween, 'highlight-text': highlightText }"
  >
    <div class="points stats" v-if="issue.finalVote">
      <span class="points-number">{{ issue.finalVote }}</span>
      <span class="points-text">{{ pointsText }}</span>
    </div>
    <div class="points stats">
      <span class="points-number">{{ calculateAverage }}</span>
      <span class="points-text">{{ showFullNames ? "average" : "avg." }}</span>
    </div>
    <div class="points stats">
      <span class="points-number">{{ calculateVariance }}</span>
      <span class="points-text">{{ showFullNames ? "variance" : "var." }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.points-block {
  flex: 1;
  display: flex;

  &.space-between {
    justify-content: space-between;
  }
  &:not(.space-between) {
    .points {
      margin-right: 2rem;
    }
  }

  &.highlight-text .points {
    color: var(--body-text) !important;
  }

  .points {
    display: flex;
    align-items: flex-end;
    color: var(--grey-46);

    .points-number {
      font-size: 20px;
      margin-right: 4px;
      line-height: 26px;
      font-weight: 500;
    }

    &:first-child .points-number {
      font-size: 48px;
      line-height: 40px;
    }
    .points-text {
      font-size: 1rem;
    }
  }
}
</style>
