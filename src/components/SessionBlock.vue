<script>
import { mapGetters } from "vuex";
import StatsBlock from "./StatsBlock.vue";

export default {
  name: "SessionBlock",
  components: {
    StatsBlock,
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
    ...mapGetters(["isUserAdmin", "session"]),
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
    <div class="flex">
      <div>
        <h3 v-if="!isEditing">{{ session?.sessionName }}</h3>
        <v-text-field v-else v-model="currSessionName"></v-text-field>
      </div>
      <div>
        <v-btn
          v-if="isUserAdmin && !isEditing"
          @click="startEdit"
          elevation="2"
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
      <StatsBlock class="stats" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;

  .edit-btn {
    width: 32px;
    height: 32px;
    background-color: white;
    margin-left: 1rem;
  }

  .btn-primary {
    margin-left: 1rem;
  }

  .stats {
    margin-left: 3rem;
  }
}
</style>
