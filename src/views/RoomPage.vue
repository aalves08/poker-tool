<script>
import { mapGetters } from "vuex";

export default {
  name: "RoomPage",
  data() {
    return {
      sessionName: "",
      username: "",
      loading: true,
      roomNotFound: false,
      showNotLoggedDialog: false,
    };
  },
  computed: {
    ...mapGetters(["localUser"]),
    room() {
      return this.$route.params.roomId;
    },
  },
  async mounted() {
    const res = await this.$axios({
      method: "post",
      url: "http://localhost:8080/checkRoom",
      data: {
        room: this.$route.params.roomId,
      },
    });

    this.loading = false;

    if (!res.data?.hasRoom) {
      this.roomNotFound = true;
    }

    if (!this.localUser) {
      this.showNotLoggedDialog = true;
    }
  },
  methods: {
    backToHomepage() {
      this.roomNotFound = false;
      this.loading = true;

      this.$router.push({ name: "home" });
    },
    enterRoom() {},
    createPlanningSession() {},
  },
};
</script>

<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div v-if="!loading && roomNotFound">
      <h1>ROOM {{ room }} HASN'T BEEN FOUND!</h1>
      <v-btn @click="backToHomepage">Back to homepage</v-btn>
    </div>
    <div v-else-if="!loading">
      <div>
        <v-dialog v-model="showNotLoggedDialog" width="500">
          <div style="background-color: white">
            <h3>Who are you?</h3>
            <v-text-field v-model="username" label="Username"></v-text-field>
            <v-btn @click="enterRoom">Enter Session</v-btn>
          </div>
        </v-dialog>
      </div>
      <div>
        <h1>WELCOME TO ROOM {{ room }}</h1>
        <div>
          <h3>create a new planning session</h3>
          <v-text-field
            v-model="sessionName"
            label="Session name"
          ></v-text-field>
          <v-btn @click="createPlanningSession">Create session</v-btn>
        </div>
        <div>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
