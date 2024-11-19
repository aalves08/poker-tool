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
    <div class="flex logo">
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
      <p v-if="isSameRouteAsAdmin">Admin currently <strong>HERE</strong></p>
      <p v-else @click="goToAdminRoute">
        Admin currently on:
        <a class="link-to-admin-view">{{ currAdminRoutePath }}</a>
      </p>
    </div>
    <div v-if="localUser" class="flex user-block">
      <img v-if="localUser.avatar" class="avatar" :src="localUser.avatar" />
      <img v-else src="@/assets/user-icon.svg" />
      <span>{{ localUser?.username }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "logo router user";
  padding: 24px 32px 0;
  width: 100%;

  .flex {
    display: flex;
    align-items: center;
  }

  .logo {
    grid-area: logo;
  }

  h1 {
    white-space: nowrap;
  }

  .header-container__logo {
    width: auto;
  }

  .admin-route-container {
    grid-area: router;
    margin: 0 1.5rem 0 1rem;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    background-color: var(--bg-90);
    display: flex;
    align-items: center;
    flex: 1;
    max-width: 100%;

    &.clickable:hover {
      cursor: pointer;

      .link-to-admin-view {
        text-decoration: underline;
      }
    }

    p {
      display: flex;
      flex-wrap: wrap;
      gap: 0 0.5rem;
      margin-bottom: 0;
    }
  }

  img {
    margin-right: 1rem;
    width: 24px;
    height: 24px;
    border-radius: 24px;
  }

  .user-block {
    grid-area: user;
    flex-shrink: 0;
  }
}
</style>
