<script>
export default {
  name: "ConfirmStopVotingDialog",
  props: {
    showStopVotingDialog: {
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
        return this.showStopVotingDialog;
      },
      // setter
      set: function () {},
    },
  },
  methods: {
    stopVoting() {
      if (this.issueId) {
        this.$store.dispatch("updateVotingIssueStatus", {
          issueId: this.issueId,
          stopped: true,
        });

        this.$emit("updateShowStopVotingDialog", false);
      }
    },
    cancel() {
      this.$emit("updateShowStopVotingDialog", false);
    },
  },
};
</script>

<template>
  <div>
    <v-dialog v-model="dialogVisibility" width="500" persistent>
      <div class="dialog-content">
        <h3>Are you sure you want to stop voting on this issue?</h3>
        <p class="dialog-text">This action cannot be reverted!</p>
        <div class="dialog-controls">
          <v-btn outlined class="btn-secondary" @click="cancel">Cancel</v-btn>
          <v-btn outlined class="btn-primary" @click="stopVoting">
            Stop voting
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
