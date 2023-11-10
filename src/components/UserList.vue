<script>
import { mapGetters } from "vuex";
import { ROLES } from "../utils/constants";
import MakeAdminDialog from "./MakeAdminDialog";
import KickUserDialog from "./KickUserDialog";

export default {
  name: "UsersList",
  components: {
    KickUserDialog,
    MakeAdminDialog,
  },
  data() {
    return {
      adminRole: ROLES.ADMIN,
      showKickUserDialog: false,
      showMakeAdminDialog: false,
      selectedUser: {},
    };
  },
  computed: {
    ...mapGetters(["localUser", "users", "isUserAdmin"]),
  },
  methods: {
    removeUser(user) {
      this.selectedUser = user;
      this.showKickUserDialog = true;
    },
    makeAdmin(user) {
      if (user.role !== ROLES.ADMIN) {
        this.selectedUser = user;
        this.showMakeAdminDialog = true;
      }
    },
    updateShowMakeAdminDialog(val) {
      if (!val) {
        this.selectedUser = {};
      }

      this.showMakeAdminDialog = val;
    },
    updateShowKickUserDialog(val) {
      if (!val) {
        this.selectedUser = {};
      }

      this.showKickUserDialog = val;
    },
  },
};
</script>

<template>
  <div class="content-block">
    <h2 class="section-title">PARTICIPANTS</h2>
    <MakeAdminDialog
      :showMakeAdminDialog="showMakeAdminDialog"
      :user="selectedUser"
      @updateShowMakeAdminDialog="updateShowMakeAdminDialog"
    />
    <KickUserDialog
      :showKickUserDialog="showKickUserDialog"
      :user="selectedUser"
      @updateShowKickUserDialog="updateShowKickUserDialog"
    />
    <ul class="participants-list">
      <li v-for="(user, i) in users" :key="i">
        <v-chip
          v-if="isUserAdmin"
          close
          class="user-chip"
          variant="outlined"
          color="#141414"
          @click:close="removeUser(user)"
        >
          <img
            v-if="user.role === adminRole"
            class="admin-icon"
            src="@/assets/admin-icon.svg"
          />
          <span
            :class="{ 'make-admin': isUserAdmin }"
            @click="makeAdmin(user)"
            >{{ user.username }}</span
          >
        </v-chip>
        <v-chip v-else class="user-chip" variant="outlined">
          <img
            v-if="user.role === adminRole"
            class="admin-icon"
            src="@/assets/admin-icon.svg"
          />
          {{ user.username }}
        </v-chip>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.section-title {
  margin-bottom: 1rem;
}

.make-admin {
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
