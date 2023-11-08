<script>
import { mapGetters } from "vuex";

export default {
  name: "UsersList",
  computed: {
    ...mapGetters(["localUser", "users", "isUserAdmin"]),
  },
  methods: {
    removeUser(socketId) {
      this.$store.dispatch("forceRemoveUser", socketId);
    },
  },
};
</script>

<template>
  <div class="content-block">
    <h2>PARTICIPANTS</h2>
    <ul class="participants-list">
      <li v-for="(user, i) in users" :key="i">
        <v-chip
          v-if="isUserAdmin"
          close
          class="user-chip"
          variant="outlined"
          color="#141414"
          @click:close="removeUser(user.socketId)"
        >
          {{ user.username }}
          <v-tooltip activator="parent" location="top">
            {{ user.username }} - {{ user.socketId }}
          </v-tooltip>
        </v-chip>
        <v-chip v-else class="user-chip" variant="outlined">
          {{ user.username }}
        </v-chip>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.participants-list {
  list-style: none;
  display: flex;
  padding: 0;
  gap: 0.5rem;
}
</style>
