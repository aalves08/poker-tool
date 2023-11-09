<script>
export default {
  name: "StatsBlock",
};
</script>

<template>
  <div class="stats-block">
    <div class="stat">
      <span class="stat-value">22</span>
      <span class="stat-text">sprint points</span>
    </div>
    <div class="stat">
      <span class="stat-value">2.75</span>
      <span class="stat-text">average points</span>
    </div>
    <div class="stat">
      <span class="stat-value">8</span>
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
      font-weight: 200;
      margin-right: 8px;
    }
    .stat-text {
      font-size: 1rem;
      font-weight: 300;
    }
  }
}
</style>
