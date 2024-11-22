<script>
export default {
  name: "ResetIssueDialog",
  props: {
    showResetIssueDialog: {
      type: Boolean,
      default: () => false,
    },
    issueId: {
      type: [Number, String],
      default: () => "",
    },
  },
  computed: {
    dialogVisibility: {
      // getter
      get: function () {
        return this.showResetIssueDialog;
      },
      // setter
      set: function () {},
    },
  },
  methods: {
    resetIssue() {
      if (this.issueId) {
        this.$store.dispatch("resetIssue", {
          issueId: this.issueId,
        });

        this.$emit("updateShowResetIssueDialog", false);
      }
    },
    cancel() {
      this.$emit("updateShowResetIssueDialog", false);
    },
  },
};
</script>

<template>
  <div>
    <v-dialog v-model="dialogVisibility" width="500" persistent>
      <div class="dialog-content">
        <h3>Reset this issue</h3>
        <p class="dialog-text">
          <span class="dialog-text__line">
            If you reset the issue you will lose all of the estimations.
          </span>
          <span class="dialog-text__line">Are you sure?</span>
        </p>
        <div class="dialog-controls">
          <v-btn outlined class="btn-secondary" @click="cancel">Cancel</v-btn>
          <v-btn outlined class="btn-danger" @click="resetIssue">
            Yes, reset issue
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
