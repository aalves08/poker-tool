<script>
import { mapGetters } from "vuex";

export default {
  name: "IssuesList",
  data() {
    return {
      issuesString: "",
      issuesData: [],
    };
  },
  computed: {
    ...mapGetters(["issues", "localUser", "isUserAdmin"]),
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
            Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
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
      console.log("removeIssue", issueNumber);
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
  <div class="border">
    <h3>ISSUES</h3>
    <div v-if="isUserAdmin" class="add-issues-block">
      <v-text-field
        class="issues-input"
        v-model="issuesString"
        label="Search by issue number (comma separated)"
      ></v-text-field>
      <v-btn @click="fetchIssues">Add issue(s)</v-btn>
    </div>

    <div class="issues-container" v-if="issues && issues.length">
      <v-card max-width="374" v-for="(issue, i) in issues" :key="i">
        <v-card-title>
          <a
            :href="`https://github.com/rancher/dashboard/issues/${issue.number}`"
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="issue-number"
            >#{{ issue.number }}</a
          >
          <h3>{{ issue.title }}</h3>
          <p>
            {{ issue.user.login }} on
            <span>{{ issue.parsedCreationDate }}</span>
          </p>
        </v-card-title>

        <v-card-text class="issue-text-block">
          <p class="issue-text" v-html="issue.body"></p>
        </v-card-text>

        <v-card-actions>
          <div class="card-actions-block">
            <v-btn v-if="isUserAdmin" @click="removeIssue(issue.number)">
              Delete
            </v-btn>
            <v-btn @click="goToIssue(issue.number)"> Check / Vote </v-btn>
          </div>
        </v-card-actions>
      </v-card>
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
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 20px;
  row-gap: 20px;

  .v-card__title {
    display: block;
  }

  .issue-text {
    height: 240px;
    overflow: hidden;

    .issue-text {
      text-overflow: ellipsis;
    }
  }

  .card-actions-block {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 8px 16px 8px;
  }
}
</style>
