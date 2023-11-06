<script>
import { mapGetters } from "vuex";

export default {
  name: "VoteUi",
  computed: {
    ...mapGetters(["config"]),
  },
  methods: {
    castVote(val) {
      console.log("casting vote", val);
      console.log("casting vote", process.env.VUE_APP_API_TOKEN);
    },
  },
};
</script>

<template>
  <div>
    <v-btn
      v-for="(vote, i) in config.voteValues"
      :key="i"
      @click="castVote(vote.value)"
    >
      <span v-html="vote.label"></span>
    </v-btn>
  </div>
</template>

<style lang="scss" scoped></style>
