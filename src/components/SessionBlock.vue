<script>
import { mapGetters } from "vuex";
import SessionStatsBlock from "./SessionStatsBlock.vue";

export default {
  name: "SessionBlock",
  components: {
    SessionStatsBlock,
  },
  data() {
    return {
      isEditing: false,
      currSessionName: "",
    };
  },
  watch: {
    "session.sessionName": {
      handler(newVal) {
        this.currSessionName = newVal;
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(["isUserAdmin", "session", "issues"]),
    estimatedIssues() {
      if (this.issues?.length) {
        return this.issues?.filter((issue) => issue.finalVote);
      }
      return [];
    },
  },
  methods: {
    startEdit() {
      this.isEditing = true;
    },
    updateSessionName() {
      if (this.currSessionName !== this.session?.sessionName) {
        this.$store.dispatch("updateSessionName", this.currSessionName);
      }

      this.isEditing = false;
    },
  },
};
</script>

<template>
  <div class="content-block">
    <h2>SESSION</h2>
    <div class="flex title-n-stats">
      <h3 v-if="!isEditing">{{ session?.sessionName }}</h3>
      <v-text-field
        v-else
        v-model="currSessionName"
        hide-details="auto"
        class="change-name-input"
      ></v-text-field>
      <div>
        <v-btn
          v-if="isUserAdmin && !isEditing"
          @click="startEdit"
          elevation="0"
          fab
          class="edit-btn"
        >
          <img src="@/assets/pencil.svg" />
        </v-btn>
        <v-btn
          class="btn-primary"
          v-else-if="isUserAdmin"
          @click="updateSessionName"
          >SAVE</v-btn
        >
      </div>
      <SessionStatsBlock
        v-if="estimatedIssues.length"
        class="stats"
        :estimated-issues="estimatedIssues"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;

  h3 {
    position: relative;
    top: 2px;
  }

  .v-text-field {
    padding-top: 4px;
  }

  .edit-btn {
    width: 32px;
    height: 32px;
    background-color: transparent;
    margin-left: 0.5rem;

    img {
      width: 18px;
    }

    &:hover {
      border: solid 1px var(--waterhole-20);
    }
  }

  .change-name-input {
    max-width: 200px;
    height: 38px;
  }

  .btn-primary {
    margin-left: 1rem;
  }

  .stats {
    margin-left: 3rem;
  }
}
</style>
