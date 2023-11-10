import { mapGetters } from "vuex";
import { STORAGE_UID, SERVER_URL } from "../utils/constants";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "HandleAuthMixin",
  data() {
    return {
      sessionName: "",
      username: "",
      userId: localStorage.getItem(STORAGE_UID) || uuidv4(),
      loading: true,
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
      url: `${SERVER_URL}/api/checkRoom`,
      data: {
        room: this.room,
      },
    });

    this.loading = false;

    if (!res.data) {
      this.loading = true;
      this.$router.push({ name: "notFound" });
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
