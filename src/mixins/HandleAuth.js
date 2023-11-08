import { mapGetters } from "vuex";
import { STORAGE_UID } from "../utils/constants";

export default {
  name: "HandleAuthMixin",
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
      // update session name
      this.sessionName = res.data.sessionName;

      // check for user existance on this session
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
};
