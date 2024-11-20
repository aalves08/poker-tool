<script>
import { mapGetters } from "vuex";
import Markdown from "./Markdown.vue";

export default {
  name: "IssueDetails",
  components: {
    Markdown,
  },
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
    getLabelBorderColor(bgColor) {
      return bgColor.toUpperCase() === "ffffff".toUpperCase()
        ? "141414"
        : "transparent";
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
      >
        <span>Check in Github</span>
        <img class="icon-link" src="@/assets/icon-link.svg" />
      </a>
    </div>
    <div class="issue-details-block">
      <Markdown class="issue-description" :text="currentIssue?.body"></Markdown>
      <div class="issue-metadata">
        <div class="issue-metadata-block">
          <h3>Labels</h3>
          <div class="labels-list" v-if="currentIssue.labels?.length">
            <div
              class="label-chip"
              v-for="label in currentIssue.labels"
              :key="label.id"
              :style="{
                background: `#${label.color}40`,
                borderColor: `#${getLabelBorderColor(label.color)}`,
              }"
            >
              {{ label.name }}
            </div>
          </div>
          <p v-else>No labels set</p>
        </div>
        <div class="issue-metadata-block">
          <h3>Milestone</h3>
          <p v-if="currentIssue.milestone?.title">
            {{ currentIssue.milestone?.title }}
          </p>
          <p v-else>No milestone set</p>
        </div>
        <div class="issue-metadata-block">
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
    color: var(--fog-60);
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
    .author-date__date {
      font-weight: 600;
    }
  }

  .issue-number {
    display: flex;
    align-items: center;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    img {
      margin-left: 6px;
    }
  }
}

.issue-details-block {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  .issue-metadata-block {
    margin-bottom: 2rem;
  }
}

.labels-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.label-chip,
.status-chip {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 30px;
  padding: 1px 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--fog);
}
.status-chip {
  height: auto;
  background-color: var(--success-background) !important;
  color: var(--success-foreground);
  font-weight: 600;
  text-transform: capitalize;
}

h3 {
  margin-bottom: 0.25rem;
}

.icon-link {
  width: 16px;
}
</style>
