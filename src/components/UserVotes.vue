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
  <div>
    <h3>VOTES</h3>
    <ul>
      <li v-for="(user, i) in users" :key="i">
        <span>{{ user.username }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
