<script>
import { mapGetters } from "vuex";

export default {
  name: "VoteUi",
  data() {
    return {
      info: "",
    };
  },
  computed: {
    ...mapGetters(["config"]),
  },
  methods: {
    castVote(val) {
      this.$store.dispatch("castVoteOnIssue", val);
    },
  },
};
</script>

<template>
  <div class="border">
    <h3>Voting block</h3>
    <v-btn
      v-for="(vote, i) in config.voteValues"
      :key="i"
      @click="castVote(vote.value)"
    >
      <span v-html="vote.label"></span>
    </v-btn>
    {{ info }}
  </div>
</template>

<style lang="scss" scoped></style>
