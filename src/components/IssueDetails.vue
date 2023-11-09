<script>
export default {
  name: "IssueDetails",
  props: {
    issue: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getContrastedColor(originalColor) {
      const halfHex = "777777";
      const octetsRegex = /^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
      const m1 = originalColor.match(octetsRegex);
      const m2 = halfHex.match(octetsRegex);
      let result = [1, 2, 3]
        .map((i) => {
          const sum = parseInt(m1[i], 16) + parseInt(m2[i], 16);
          return sum.toString(16).padStart(2, "0");
        })
        .join("");
      return result.slice(result.length - 6, result.length);
    },
  },
};
</script>

<template>
  <div>
    <h2>ISSUE DETAILS</h2>
    <div class="flex title-block">
      <v-chip class="status-chip">
        {{ issue.state }}
      </v-chip>
      <span class="author-date">
        {{ issue.user?.login }} on
        <span class="author-date__date">{{ issue.parsedCreationDate }}</span>
      </span>
      <a
        :href="`https://github.com/rancher/dashboard/issues/${issue.number}`"
        target="_blank"
        rel="noopener noreferrer nofollow"
        class="issue-number"
        >Check on Github</a
      >
    </div>
    <div class="issue-details-block">
      <p class="issue-text" v-html="issue.body"></p>
      <div class="labels-block">
        <div class="issue-metadata-block">
          <h3>Labels</h3>
          <div class="labels-list">
            <div
              class="label-chip"
              v-for="label in issue.labels"
              :key="label.id"
              :style="{
                color: `#${label.color}`,
                background: `#${getContrastedColor(label.color)}`,
              }"
            >
              {{ label.name }}
            </div>
          </div>
        </div>
        <div class="issue-metadata-block">
          <h3>Milestone</h3>
          <p>{{ issue.milestone?.title }}</p>
        </div>
        <div class="issue-metadata-block">
          <h3>Comments</h3>
          <p>{{ issue.comments }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./src/styles/global.scss";
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
    color: $grey-46;
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

  .issue-metadata-block {
    margin-bottom: 2rem;
  }
}

.labels-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.label-chip {
  border-radius: 30px;
  height: 30px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  font-weight: 900;
}
.status-chip {
  text-transform: capitalize;
  color: $success-foreground;
  background-color: $success-background !important;
  font-weight: 600;
}

h3 {
  margin-bottom: 0.25rem;
}
</style>
