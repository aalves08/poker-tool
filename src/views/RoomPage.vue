<script>
import { mapGetters } from "vuex";
import UserList from "../components/UserList.vue";
import IssuesList from "../components/IssuesList.vue";
import SessionBlock from "../components/SessionBlock.vue";
import { STORAGE_UID, ROLES } from "../utils/constants";

export default {
  name: "RoomPage",
  components: {
    UserList,
    IssuesList,
    SessionBlock,
  },
  data() {
    return {
      sessionName: "",
      username: "",
      userId: localStorage.getItem(STORAGE_UID) || crypto.randomUUID(),
      loading: true,
      roomNotFound: false,
      showNotLoggedDialog: false,
    };
  },
  computed: {
    ...mapGetters(["localUser", "connection"]),
    room() {
      return this.$route.params.roomId;
    },
  },
  async mounted() {
    // check if room exists first...
    const res = await this.$axios({
      method: "post",
      url: "http://localhost:8080/checkRoom",
      data: {
        room: this.room,
      },
    });

    this.loading = false;

    if (!res.data) {
      this.roomNotFound = true;
    } else {
      this.sessionName = res.data.sessionName;
      const userFound = res.data.users.find(
        (user) => user.userId === this.userId
      );

      // reconnect user if he has been there
      if (userFound && !this.connection) {
        this.$store.dispatch("connectUser", {
          role: userFound.role,
          username: userFound.username,
          userId: this.userId,
          room: this.room,
        });

        localStorage.setItem(STORAGE_UID, this.userId);
        // you're a new user... setup your user info for connection
      } else if (!this.connection) {
        this.showNotLoggedDialog = true;
      }
    }
  },
  methods: {
    backToHomepage() {
      this.roomNotFound = false;
      this.loading = true;

      this.$router.push({ name: "home" });
    },
    enterRoom() {
      if (this.username) {
        // connect new user with 'user' role
        this.$store.dispatch("connectUser", {
          role: ROLES.USER,
          username: this.username,
          userId: this.userId,
          sessionName: this.sessionName,
          room: this.room,
        });

        localStorage.setItem(STORAGE_UID, this.userId);

        this.showNotLoggedDialog = false;
      }
    },
  },
};
</script>

<template>
  <div>
    <!-- loading -->
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- Room not found!!! -->
    <div v-if="!loading && roomNotFound">
      <h1>ROOM WITH ID {{ room }} HASN'T BEEN FOUND!</h1>
      <v-btn @click="backToHomepage">Back to homepage</v-btn>
    </div>
    <!-- welcome to room -->
    <div v-else-if="!loading">
      <div>
        <v-dialog v-model="showNotLoggedDialog" width="500">
          <div class="not-logged-dialog">
            <h3>Who are you?</h3>
            <v-text-field v-model="username" label="Username"></v-text-field>
            <v-btn @click="enterRoom">Enter Session</v-btn>
          </div>
        </v-dialog>
      </div>
      <div>
        <SessionBlock />
        <UserList />
        <IssuesList />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./src/styles/global.scss";
.not-logged-dialog {
  background-color: white;
  padding: 20px;
}
</style>
