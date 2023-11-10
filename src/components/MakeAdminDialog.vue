<script>
export default {
  name: "MakeAdminDialog",
  props: {
    showMakeAdminDialog: {
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
        return this.showMakeAdminDialog;
      },
      // setter
      set: function () {},
    },
  },
  methods: {
    resetIssue() {
      if (this.user) {
        this.$store.dispatch("makeAdmin", {
          user: this.user,
        });

        this.$emit("updateShowMakeAdminDialog", false);
      }
    },
    cancel() {
      this.$emit("updateShowMakeAdminDialog", false);
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
          Do you want to make <span class="bold">{{ user.username }}</span> an
          admin of this session?
        </p>
        <div class="dialog-controls">
          <v-btn class="btn-secondary" @click="cancel">Cancel</v-btn>
          <v-btn class="btn-primary" @click="resetIssue">Confirm</v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.bold {
  font-weight: bold;
}
</style>
