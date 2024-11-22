<script>
import { mapGetters } from "vuex";
import Markdown from "./Markdown.vue";

export default {
  name: "IssuesList",
  components: {
    Markdown,
  },
  data() {
    return {
      issuesString: "",
      issuesData: [],
    };
  },
  computed: {
    ...mapGetters(["issues", "localUser", "isUserAdmin", "githubApiToken"]),
    issuesToEstimate() {
      if (this.issues?.length) {
        return this.issues?.filter((issue) => !issue.finalVote);
      }
      return [];
    },
  },
  methods: {
    parseISODate(ISODate) {
      const date = new Date(ISODate);
      const day = date.toLocaleString([], { day: "2-digit" });
      const month = date.toLocaleString([], { month: "short" });
      const year = date.toLocaleString([], { year: "numeric" });

      return `${day} ${month} ${year}`;
    },
    async fetchIssues() {
      const trimmedIssuesString = this.issuesString.replace(/ /g, "");
      let issuesArr = trimmedIssuesString.split(",");

      if (issuesArr.length === 1 && issuesArr[0] === "") {
        issuesArr = [];
      }

      if (issuesArr.length) {
        const axiosInstance = this.$axios.create({
          baseURL: "https://api.github.com",
          headers: {
            Authorization: `Bearer ${this.githubApiToken}`,
          },
        });

        const promises = [];
        issuesArr.forEach((issue) => {
          promises.push(
            axiosInstance.get(`/repos/rancher/dashboard/issues/${issue}`)
          );
        });

        const res = await Promise.all(promises);

        // grab current data from server
        if (this.issues?.length) {
          this.issuesData = this.issues;
        }

        res.forEach((r) => {
          if (r.status === 200 && r.data) {
            // parse/update issue data
            r.data.parsedCreationDate = this.parseISODate(r.data.created_at);
            r.data.voted = false;
            r.data.votes = [];

            if (!this.issuesData.find((iss) => iss.number === r.data.number)) {
              this.issuesData.push(r.data);
            }
          }
        });

        // update data via WS to all clients
        this.$store.dispatch("updateIssuesList", this.issuesData);
        this.issuesString = "";
      }
    },
    removeIssue(issueNumber) {
      if (this.issues?.length) {
        this.issuesData = this.issues;
      }

      const index = this.issuesData.findIndex(
        (issue) => issue.number === issueNumber
      );

      if (index >= 0) {
        this.issuesData.splice(index, 1);

        this.$store.dispatch("updateIssuesList", this.issuesData);
      }
    },
    goToIssue(issueNumber) {
      this.$router.push({
        name: "issue",
        params: {
          roomId: this.$route.params.roomId,
          issueId: issueNumber,
        },
      });
    },
  },
};
</script>

<template>
  <div class="content-block">
    <h2>ISSUES</h2>
    <div v-if="isUserAdmin" class="add-issues-block">
      <v-text-field
        class="issues-input"
        v-model="issuesString"
        @keydown.enter.prevent="fetchIssues"
        label="Search by issue number (comma separated)"
      ></v-text-field>
      <v-btn class="btn-primary" outlined @click="fetchIssues">
        Add issue(s)
      </v-btn>
    </div>

    <div
      class="issues-container"
      v-if="issuesToEstimate && issuesToEstimate.length"
    >
      <v-card
        class="issue-card"
        outlined
        v-for="(issue, i) in issuesToEstimate"
        :key="i"
        @click="goToIssue(issue.number)"
      >
        <div class="delete-button">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                class="btn-danger"
                v-if="isUserAdmin"
                @click="removeIssue(issue.number)"
              >
                <v-icon v-bind="attrs" v-on="on">mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete issue</span>
          </v-tooltip>
        </div>
        <v-card-title>
          <a
            :href="`https://github.com/rancher/dashboard/issues/${issue.number}`"
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="issue-number"
            @click.stop=""
            >#{{ issue.number }}</a
          >
          <h3>{{ issue.title }}</h3>
          <span class="author-date">
            {{ issue.user.login }} on
            <span class="author-date__date">{{
              issue.parsedCreationDate
            }}</span>
          </span>
        </v-card-title>

        <v-card-text class="issue-text-block">
          <Markdown :text="issue?.body"></Markdown>
          <!-- <p class="issue-text" v-html="issue.body"></p> -->
        </v-card-text>
      </v-card>
    </div>
    <div class="placeholder-block" v-else>
      <h1 class="placeholder-text">Add issues from GitHub to estimate</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-issues-block {
  display: flex;
  align-items: center;

  .issues-input {
    max-width: 360px;
    margin-right: 16px;
  }
}

.issues-container {
  padding: 1rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem 1.5rem;

  .v-card.issue-card {
    position: relative;
    width: 100%;
    border-radius: 20px;
    background-color: var(--bg-120);
    border: solid 1px var(--bg-90);
    display: grid;
    grid-template-rows: auto 1fr auto;
    display: flex;
    flex-direction: column;
    transition: background-color linear 100ms;

    .delete-button {
      position: absolute;
      right: 0.5rem;
      top: 0.75rem;
    }
    &:hover {
      background-color: var(--bg-125);
    }
  }

  .v-card__title {
    word-break: normal;
    flex-direction: column;
    align-items: start;

    h3 {
      line-height: 20px;
      margin-bottom: 0.5rem;
      color: var(--body-text);
      font-weight: 500;
    }

    .issue-number {
      text-decoration: none;
      margin-bottom: 0.25rem;

      &:hover {
        text-decoration: underline;
      }
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

    > * {
      letter-spacing: 0;
    }
  }

  .issue-text-block {
    flex: 1;
    padding-bottom: 1.5rem;
  }
  .issue-text {
    display: -webkit-box;
    color: var(--body-text);
    font-weight: 400;
    margin-bottom: 0;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    line-clamp: 6;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .v-card__actions {
    padding: 0;
  }
  .card-actions-block {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 1rem 1.25rem 1rem;
    padding-top: 0;
  }
}

.placeholder-block {
  margin-top: 2rem;
}
</style>
