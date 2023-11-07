<script>
import { mapGetters } from "vuex";

export default {
  name: "UsersList",
  computed: {
    ...mapGetters(["localUser", "users"]),
    isUserAdmin() {
      return this.localUser?.role === "admin";
    },
  },
  methods: {
    removeUser(id) {
      this.$store.dispatch("forceRemoveUser", id);
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
          ><v-btn @click="removeUser(user.id)">Remove</v-btn></span
        >
        <span>{{ user.username }} - {{ user.id }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
