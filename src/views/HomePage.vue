<script>
import { STORAGE_UID, ROLES } from "../utils/constants";

export default {
  name: "HomePage",
  data() {
    return {
      username: "",
      sessionName: "",
      createDisabled: false,
      showOverlay: false,
    };
  },
  methods: {
    createRoom() {
      if (!this.createDisabled && this.username) {
        this.createDisabled = true;
        this.showOverlay = true;
        const room = crypto.randomUUID();
        const userId = localStorage.getItem(STORAGE_UID) || crypto.randomUUID();

        this.$store.dispatch("connectUser", {
          role: ROLES.ADMIN,
          username: this.username,
          userId,
          sessionName: this.sessionName,
          room,
        });

        // save sessionId has local storage, so that we can reconnect him later
        // if he wants to join the same room/session
        localStorage.setItem(STORAGE_UID, userId);

        setTimeout(() => {
          // reset data
          this.username = "";
          this.createDisabled = false;
          this.showOverlay = false;

          this.$router.push({
            name: "room",
            params: { roomId: room },
          });
        }, 1500);
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>Welcome to the planning tool!</h1>
    <v-text-field v-model="username" label="Username"></v-text-field>
    <v-text-field v-model="sessionName" label="Session name"></v-text-field>
    <v-btn @click="createRoom" :disabled="createDisabled"
      >Create a new room</v-btn
    >
    <v-overlay :value="showOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
