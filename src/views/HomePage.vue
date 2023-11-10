<script>
import { STORAGE_UID, ROLES } from "../utils/constants";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "HomePage",
  data() {
    return {
      username: "",
      sessionName: "",
      createDisabled: false,
      showOverlay: false,
      disconnected: this.$route.query.disconnected,
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
  <div class="homepage-container">
    <div class="homepage-content">
      <h1 v-if="disconnected">
        You have been disconnected from your previous session! Create a new
        session:
      </h1>
      <h1 v-else>Welcome to the UX/UI planning tool! Create a session:</h1>
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
        <v-btn
          class="btn-primary"
          @click="createRoom"
          :disabled="createDisabled"
          >Create a new room</v-btn
        >
      </div>
      <v-overlay :value="showOverlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.homepage-container {
  display: flex;
  justify-content: center;

  .homepage-content {
    margin-top: 4rem;
    width: 500px;

    .btn-primary {
      margin-top: 1.5rem;
    }
  }
}
</style>
