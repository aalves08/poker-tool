<script>
import { STORAGE_UID, ROLES } from "../utils/constants";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "JoinSession",
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
      if (!this.createDisabled && this.username && this.sessionName) {
        this.createDisabled = true;
        this.showOverlay = true;
        const room = uuidv4();
        const userId = localStorage.getItem(STORAGE_UID) || uuidv4();

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
    <v-text-field
      @keydown.enter.prevent="createRoom"
      v-model="username"
      label="Username"
    ></v-text-field>
    <v-text-field
      @keydown.enter.prevent="createRoom"
      v-model="sessionName"
      label="Session name"
    ></v-text-field>
    <v-btn class="btn-primary" @click="createRoom" :disabled="createDisabled"
      >Create a new room</v-btn
    >
    <v-overlay :value="showOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<style lang="scss" scoped>
.btn-primary {
  margin-top: 1.5rem;
}
</style>
