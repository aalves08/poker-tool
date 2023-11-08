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
  <div class="border">
    <h3>Users connected:</h3>
    <ul>
      <li v-for="(user, i) in users" :key="i">
        <span v-if="isUserAdmin"
          ><v-btn @click="removeUser(user.socketId)">Remove</v-btn></span
        >
        <span>{{ user.username }} - {{ user.socketId }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
