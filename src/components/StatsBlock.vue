<script>
export default {
  name: "StatsBlock",
};
</script>

<template>
  <div class="stats-block">
    <div>
      <h1>22</h1>
      <span>sprint points</span>
    </div>
    <div>
      <h1>2.75</h1>
      <span>average points</span>
    </div>
    <div>
      <h1>8</h1>
      <span>issues estimated</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats-block {
  display: flex;

  > div {
    margin-right: 25px;
    display: flex;
    align-items: flex-end;

    h1 {
      margin: 0 8px -4px 0;
    }
  }
}
</style>
