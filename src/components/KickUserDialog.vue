<script>
export default {
  name: "KickUserDialog",
  props: {
    showKickUserDialog: {
      type: Boolean,
      default: () => false,
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    dialogVisibility: {
      // getter
      get: function () {
        return this.showKickUserDialog;
      },
      // setter
      set: function () {},
    },
  },
  methods: {
    kickUser() {
      if (this.user) {
        this.$store.dispatch("forceRemoveUser", this.user.socketId);

        this.$emit("updateShowKickUserDialog", false);
      }
    },
    cancel() {
      this.$emit("updateShowKickUserDialog", false);
    },
  },
};
</script>

<template>
  <div>
    <v-dialog v-model="dialogVisibility" width="500" persistent>
      <div class="dialog-content">
        <h3>User: {{ user.username }}</h3>
        <p>
          Are you sure you want to kick the user
          <span class="bold">{{ user.username }}</span> from this session?
        </p>
        <div class="dialog-controls">
          <v-btn class="btn-secondary" @click="cancel">Cancel</v-btn>
          <v-btn class="btn-danger" @click="kickUser">Kick user</v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
