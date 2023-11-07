<script>
export default {
  name: "IssuesList",
  data() {
    return {
      issues: "",
      issuesData: [],
    };
  },
  methods: {
    async fetchIssues() {
      const trimmedIssuesString = this.issues.replace(/ /g, "");
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
        console.log("all issues fetched", res);

        this.issuesData = [];

        res.forEach((r) => {
          if (r.status === 200 && r.data) {
            this.issuesData.push(r.data);
          }
        });
      }
    },
  },
};
</script>

<template>
  <div class="border">
    <h3>Issues list</h3>
    <v-text-field
      v-model="issues"
      label="Github issues (comma separated)"
    ></v-text-field>
    <v-btn @click="fetchIssues" style="margin-bottom: 20px">Fetch Issues</v-btn>
    <v-expansion-panels v-if="issuesData.length">
      <v-expansion-panel v-for="(issue, i) in issuesData" :key="i">
        <v-expansion-panel-header>
          <span>
            <a
              :href="`https://github.com/rancher/dashboard/issues/${issue.number}`"
              target="_blank"
              rel="noopener noreferrer nofollow"
              >#{{ issue.number }}</a
            >
          </span>
          <span style="font-weight: bold">{{ issue.title }}</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-html="issue.body"></div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style lang="scss" scoped></style>
