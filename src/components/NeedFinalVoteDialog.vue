<script>
export default {
  name: "ResetIssueDialog",
  props: {
    showNeedFinalVoteDialog: {
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
        return this.showNeedFinalVoteDialog;
      },
      // setter
      set: function () {},
    },
  },
  methods: {
    ok() {
      this.$emit("updateShowNeedFinalVoteDialog", false);
    },
  },
};
</script>

<template>
  <div>
    <v-dialog v-model="dialogVisibility" width="500" persistent>
      <div class="dialog-content">
        <h3>Final vote needed!</h3>
        <p class="dialog-text">
          <span class="dialog-text__line">
            You need to cast the final vote before closing the estimation
          </span>
        </p>
        <div class="dialog-controls">
          <v-btn outlined class="btn-secondary" @click="ok">ok</v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
