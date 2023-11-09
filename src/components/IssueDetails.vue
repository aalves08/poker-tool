<script>
import { mapGetters } from "vuex";
import { getContrastedColor } from "../utils/utils";

export default {
  name: "IssueDetails",
  computed: {
    ...mapGetters(["issues"]),
    currentIssue() {
      if (this.issues && this.issues.length) {
        return this.issues?.find(
          // loose equality because issueId is a string and issue.number is a number....
          (issue) => issue.number == this.$route.params.issueId
        );
      }
      return {};
    },
  },
  methods: {
    contrastedColor(color) {
      return getContrastedColor(color);
    },
  },
};
</script>

<template>
  <div>
    <h2>ISSUE DETAILS</h2>
    <div class="flex title-block">
      <v-chip class="status-chip">
        {{ currentIssue.state }}
      </v-chip>
      <span class="author-date">
        {{ currentIssue.user?.login }} on
        <span class="author-date__date">{{
          currentIssue.parsedCreationDate
        }}</span>
      </span>
      <a
        :href="`https://github.com/rancher/dashboard/issues/${currentIssue.number}`"
        target="_blank"
        rel="noopener noreferrer nofollow"
        class="issue-number"
        >Check on Github</a
      >
    </div>
    <div class="issue-details-block">
      <p class="issue-text" v-html="currentIssue.body"></p>
      <div class="labels-block">
        <div class="small-block">
          <h3>Labels</h3>
          <div class="labels-list">
            <div
              class="label-chip"
              v-for="label in currentIssue.labels"
              :key="label.id"
              :style="{
                color: `#${label.color}`,
                background: `#${contrastedColor(label.color)}`,
                borderColor: `#${label.color}`,
              }"
            >
              {{ label.name }}
            </div>
          </div>
        </div>
        <div class="small-block">
          <h3>Milestone</h3>
          <p>{{ currentIssue.milestone?.title }}</p>
        </div>
        <div class="small-block">
          <h3>Comments</h3>
          <p>{{ currentIssue.comments }}</p>
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
  gap: 1rem;
  margin-bottom: 1rem;
  p {
    margin-bottom: 0;
  }

  .author-date {
    color: var(--grey-46);
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
    .author-date__date {
      font-weight: 600;
    }
  }
}

.issue-details-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  .issue-text {
    line-height: 1.5rem;
  }

  .small-block {
    margin-bottom: 20px;

    span {
      margin-right: 10px;
    }
  }
}

.labels-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.label-chip {
  border: solid 1px;
  border-radius: 30px;
  height: 30px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  font-weight: 900;
}
.status-chip {
  text-transform: capitalize;
  color: var(--success-foreground);
  background-color: var(--success-background) !important;
  font-weight: 600;
}
</style>
