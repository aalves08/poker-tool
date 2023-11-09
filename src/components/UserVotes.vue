<script>
import { mapGetters } from "vuex";

export default {
  name: "UserVotes",
  computed: {
    ...mapGetters(["session", "users"]),
  },
  methods: {
    removeUser(socketId) {
      this.$store.dispatch("forceRemoveUser", socketId);
    },
  },
};
</script>

<template>
  <div class="votes-block">
    <h2>VOTES</h2>
    <ul class="participants-list">
      <li v-for="(user, i) in users" :key="i">
        <v-chip class="user-chip" variant="outlined">
          {{ user.username }}
        </v-chip>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "./src/styles/global.scss";

.votes-block {
  margin-bottom: 2rem;
}
</style>
