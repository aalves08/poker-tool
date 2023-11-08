<script>
export default {
  name: "IssueDetails",
  props: {
    issue: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<template>
  <div>
    <h3>ISSUE DETAILS</h3>
    <div class="flex title-block">
      <p style="margin-right: 10px">{{ issue.state }}</p>
      <p style="margin-right: 10px">
        {{ issue.user?.login }} on
        <span>{{ issue.parsedCreationDate }}</span>
      </p>
      <a
        :href="`https://github.com/rancher/dashboard/issues/${issue.number}`"
        target="_blank"
        rel="noopener noreferrer nofollow"
        class="issue-number"
        >Check in Github</a
      >
    </div>
    <div class="flex text-details-block">
      <p class="issue-text" v-html="issue.body"></p>
      <div class="labels-block">
        <div class="small-block">
          <h3>Labels</h3>
          <span
            v-for="label in issue.labels"
            :key="label.id"
            :style="{ color: `#${label.color}` }"
            >{{ label.name }}</span
          >
        </div>
        <div class="small-block">
          <h3>Milestone</h3>
          <p>{{ issue.milestone?.title }}</p>
        </div>
        <div class="small-block">
          <h3>Comments</h3>
          <p>{{ issue.comments }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.title-block {
  align-items: center;

  p {
    margin-bottom: 0;
  }
}

.text-details-block {
  .issue-text,
  .labels-block {
    width: 50%;
  }

  .small-block {
    margin-bottom: 20px;

    span {
      margin-right: 10px;
    }
  }
}
</style>
