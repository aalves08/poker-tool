<script>
import { mapGetters } from "vuex";

export default {
  name: "HeaderBlock",
  computed: {
    ...mapGetters(["localUser", "isUserAdmin", "issues", "adminRoute"]),
    isAdminRouteVisible() {
      return (
        !this.isUserAdmin &&
        (this.$route.name === "room" || this.$route.name === "issue")
      );
    },
    adminRouteIssue() {
      if (this.issues && this.issues.length && this.adminRoute?.issueId) {
        return this.issues?.find(
          // loose equality because issueId is a string and issue.number is a number....
          (issue) => issue.number == this.adminRoute?.issueId
        );
      }
      return {};
    },
    isUserVotingInProgress() {
      return this.adminRouteIssue.votingInProgress;
    },
    isFinalVoteCast() {
      return !!this.adminRouteIssue.finalVote;
    },
    isUserVotingFinished() {
      return (
        !this.isUserVotingInProgress && this.adminRouteIssue.finishedUserVoting
      );
    },
    isSameRouteAsAdmin() {
      return this.$route.name === this.adminRoute?.name;
    },
    currAdminRoutePath() {
      if (this.isSameRouteAsAdmin) {
        return "Admin currently here";
      } else if (this.adminRoute?.name === "room") {
        return "Main Room";
      } else {
        let title = `#${this.adminRouteIssue.number} - ${this.adminRouteIssue.title}`;
        if (this.isUserVotingInProgress) {
          title += " - VOTING!!";
        } else if (this.isUserVotingFinished && !this.isFinalVoteCast) {
          title += " - ADMIN DOING FINAL ESTIMATION!!";
        } else if (this.isFinalVoteCast) {
          title += " - ESTIMATION DONE";
        }

        return title;
      }
    },
  },
  methods: {
    goToAdminRoute() {
      const goToAdminRoute = {
        name: this.adminRoute.name,
      };

      if (this.adminRoute.issueId) {
        goToAdminRoute.params = {
          issueId: this.adminRoute.issueId,
        };
      }
      this.$router.push(goToAdminRoute);
    },
  },
};
</script>

<template>
  <div class="header-container">
    <div class="flex">
      <img
        class="header-container__logo"
        alt="SUSE Planning Poker tool"
        src="@/assets/SUSE_PokerTool.svg"
      />
    </div>
    <div
      v-if="isAdminRouteVisible"
      class="admin-route-container"
      :class="{ clickable: !isSameRouteAsAdmin }"
    >
      <p v-if="isSameRouteAsAdmin">Admin currently here</p>
      <p v-else @click="goToAdminRoute">
        Admin currently on:
        <span>{{ currAdminRoutePath }}</span>
      </p>
    </div>
    <div v-if="localUser" class="flex">
      <img v-if="localUser.avatar" class="avatar" :src="localUser.avatar" />
      <img v-else src="@/assets/user-icon.svg" />
      <span>{{ localUser?.username }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px 0;
  .flex {
    display: flex;
    align-items: center;
  }

  h1 {
    white-space: nowrap;
  }

  .header-container__logo {
    width: auto;
  }

  .admin-route-container {
    width: 100%;
    height: 46px;
    margin: 0 2rem;
    padding: 0 1rem;
    border: 1px solid;
    border-color: var(--primary);
    background-color: var(--primary-bg);
    display: flex;
    align-items: center;

    &.clickable:hover {
      cursor: pointer;

      span {
        text-decoration: underline;
      }
    }

    p {
      margin-bottom: 0;
    }

    span {
      color: var(--primary);
    }
  }

  img {
    margin-right: 1rem;
    width: 24px;
    height: 24px;
    border-radius: 24px;
  }
}
</style>
