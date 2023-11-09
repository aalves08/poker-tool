<script>
import { STORAGE_UID, ROLES } from "../utils/constants";

export default {
  name: "NotLoggedDialog",
  props: {
    showNotLoggedDialog: {
      type: Boolean,
      default: () => false,
    },
    sessionName: {
      type: String,
      default: () => "",
    },
    userId: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      username: "",
    };
  },
  computed: {
    dialogVisibility: {
      // getter
      get: function () {
        return this.showNotLoggedDialog;
      },
      // setter
      set: function () {},
    },
  },
  methods: {
    enterRoom() {
      if (this.username) {
        // connect new user with 'user' role
        this.$store.dispatch("connectUser", {
          role: ROLES.USER,
          username: this.username,
          userId: this.userId,
          sessionName: this.sessionName,
          room: this.$route.params.roomId,
        });

        localStorage.setItem(STORAGE_UID, this.userId);

        this.$emit("updateShowNotLoggedDialog", false);
      }
    },
  },
};
</script>

<template>
  <div>
    <v-dialog v-model="dialogVisibility" width="500">
      <div class="not-logged-dialog">
        <h3>Who are you?</h3>
        <v-text-field v-model="username" label="Username"></v-text-field>
        <v-btn @click="enterRoom">Enter Session</v-btn>
      </div>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.not-logged-dialog {
  background-color: white;
  padding: 20px;
}
</style>
