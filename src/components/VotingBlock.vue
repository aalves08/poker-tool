<script>
import { mapGetters } from "vuex";
import UserVotes from "./UserVotes";

export default {
  name: "VotingBlock",
  components: {
    UserVotes,
  },
  data() {
    return {
      voteStarted: true,
    };
  },
  computed: {
    ...mapGetters(["config"]),
  },
  methods: {
    startVoting() {
      console.log("startVoting!");
      this.voteStarted = true;
    },
    stopVoting() {
      console.log("stopVoting!");
      this.voteStarted = false;
    },
    castVote(val) {
      this.$store.dispatch("castVoteOnIssue", val);
    },
    getCardText(voteValue) {
      let cardText = "";
      if (typeof voteValue === "number") {
        cardText = voteValue === 1 || voteValue === 0.5 ? "point" : "points";
      }
      return cardText;
    },
  },
};
</script>

<template>
  <div>
    <h2>ESTIMATION</h2>
    <v-btn
      class="btn-primary"
      outlined
      @click="startVoting"
      v-if="!voteStarted"
    >
      <v-icon start icon="mdi-play"></v-icon>
      START VOTING
    </v-btn>
    <v-btn class="btn-secondary" outlined @click="stopVoting" v-else
      ><v-icon start icon="mdi-stop"></v-icon>STOP VOTING</v-btn
    >
    <div class="voting-controls">
      <v-btn
        v-for="(vote, i) in config.voteValues"
        :key="i"
        class="btn-secondary voting-card"
        outlined
        @click="castVote(vote.value)"
        :disabled="!voteStarted"
      >
        <div class="vote-content">
          <span class="vote-number" v-html="vote.label"></span>
          <span class="vote-text">{{ getCardText(vote.value) }}</span>
        </div>
      </v-btn>
    </div>
    <UserVotes />
  </div>
</template>

<style lang="scss" scoped>
@import "./src/styles/global.scss";
.voting-controls {
  margin: 1rem 0 2rem 0;
  display: flex;
  gap: 0.5rem;

  .voting-card {
    height: auto;
    background: white;
    border-width: 1px;
    border-color: $grey-82;
    border-radius: 0;
    padding: 1rem 1rem 0.75rem;

    .vote-content {
      display: flex;
      align-items: end;
      gap: 0.25rem;
    }

    .vote-number {
      font-size: 48px;
      line-height: 36px;
    }
    .vote-text {
      font-size: 14px;
      font-weight: 300;
    }
  }
}
</style>
