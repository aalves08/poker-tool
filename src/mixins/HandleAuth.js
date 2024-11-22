import { mapGetters } from "vuex";
import {
  STORAGE_UID,
  STORAGE_TOKEN,
  ROLES,
  SERVER_URL,
} from "../utils/constants";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "HandleAuthMixin",
  data() {
    return {
      sessionName: "",
      loadingValidateRoom: true,
      loadingValidateToken: true,
    };
  },
  computed: {
    ...mapGetters(["localUser", "isUserAdmin", "connection"]),
    room() {
      return this.$route.params.roomId;
    },
  },
  async mounted() {
    if (this.$route.name !== "login") {
      const res = await this.validateToken();
      this.loadingValidateToken = false;

      if (!res) {
        return this.$router.push({
          name: "login",
          query: {
            error: "invalid_token",
          },
        });
      }
    }

    if (this.$route.name === "room" || this.$route.name === "issue") {
      await this.validateRoom();
    }
  },
  methods: {
    async validateToken() {
      const res = await this.$axios({
        method: "post",
        url: `${SERVER_URL}/api/validateToken`,
        data: {
          token: localStorage.getItem(STORAGE_TOKEN) || "",
        },
      });

      if (!res.data) {
        return false;
      }

      this.$store.dispatch("updateGithubApiToken", res.data.githubToken);

      this.$store.dispatch("updateLocalUserInfo", {
        username: res.data.username,
        avatar: res.data.avatar,
      });

      return true;
    },
    async validateRoom() {
      // check if room exists first...
      const res = await this.$axios({
        method: "post",
        url: `${SERVER_URL}/api/checkRoom`,
        data: {
          room: this.room,
        },
      });

      this.loadingValidateRoom = false;

      if (!res.data) {
        this.loadingValidateRoom = true;
        this.$router.push({ name: "notFound" });
      } else {
        const userId = localStorage.getItem(STORAGE_UID) || uuidv4();

        // update session name
        this.sessionName = res.data.sessionName;

        // check for user existance on this session
        const userFound = res.data.users.find((user) => user.userId === userId);

        this.$store.dispatch("connectUser", {
          role: userFound?.role || ROLES.USER,
          username: userFound?.username || this.localUser?.username,
          avatar: userFound?.avatar || this.localUser?.avatar,
          userId,
          room: this.room,
        });

        localStorage.setItem(STORAGE_UID, userId);
      }

      // propagate admin route
      if (this.isUserAdmin) {
        this.$store.dispatch("updateAdminCurrRoute", {
          name: this.$route.name,
          issueId: this.$route?.params?.issueId || "",
        });
      }
    },
  },
};
