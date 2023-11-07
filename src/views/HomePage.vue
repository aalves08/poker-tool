<script>
// import VotingBlock from "../components/VotingBlock.vue";
// import IssuesList from "../components/IssuesList.vue";
// import ConnectWs from "../components/ConnectWs.vue";
// import UserList from "../components/UserList.vue";

export default {
  name: "HomePage",

  components: {
    // VotingBlock,
    // IssuesList,
    // ConnectWs,
    // UserList,
  },
  data() {
    return {
      username: "",
      createDisabled: false,
      showOverlay: false,
    };
  },
  methods: {
    createRoom() {
      if (!this.createDisabled && this.username) {
        this.createDisabled = true;
        this.showOverlay = true;
        const room = crypto.randomUUID();

        this.$store.dispatch("connectUser", {
          role: "admin",
          username: this.username,
          room,
        });

        setTimeout(() => {
          // reset data
          this.username = "";
          this.createDisabled = false;
          this.showOverlay = false;

          this.$router.push({ name: "room", params: { roomId: room } });
        }, 2000);
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>Welcome to the planning tool!</h1>
    <v-text-field v-model="username" label="Username"></v-text-field>
    <v-btn @click="createRoom" :disabled="createDisabled"
      >Create a new room</v-btn
    >
    <v-overlay :value="showOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
