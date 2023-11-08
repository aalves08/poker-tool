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
      voteStarted: false,
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
  },
};
</script>

<template>
  <div>
    <h3>ESTIMATION</h3>
    <v-btn @click="startVoting" v-if="!voteStarted">START VOTING</v-btn>
    <v-btn @click="stopVoting" v-else>STOP VOTING</v-btn>
    <div class="voting-controls">
      <v-btn
        v-for="(vote, i) in config.voteValues"
        :key="i"
        @click="castVote(vote.value)"
        :disabled="!voteStarted"
      >
        <span v-html="vote.label"></span>
      </v-btn>
    </div>
    <UserVotes />
  </div>
</template>

<style lang="scss" scoped></style>
