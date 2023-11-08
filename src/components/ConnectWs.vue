<script>
import { mapGetters } from "vuex";
import { ROLES } from "../utils/constants";

export default {
  name: "ConnectWs",
  data() {
    return {
      socketInstance: null,
      myData: {
        role: ROLES.ADMIN,
        username: "",
        room: "",
      },
    };
  },
  computed: {
    ...mapGetters(["config", "connection"]),
  },
  methods: {
    connectToRoom() {
      this.$store.dispatch("connectUser", {
        ...this.myData,
      });

      // reset data
      this.myData = {
        role: ROLES.ADMIN,
        username: "",
        room: "",
      };
    },
    disconnectFromRoom() {
      this.$store.dispatch("disconnectFromRoom");
    },
  },
};
</script>

<template>
  <div class="border">
    <h3>WS connection</h3>
    <v-text-field v-model="myData.username" label="Username"></v-text-field>
    <v-text-field v-model="myData.room" label="Room ID"></v-text-field>
    <v-radio-group v-model="myData.role">
      <v-radio
        v-for="(role, i) in config.roles"
        :key="i"
        :label="role.label"
        :value="role.value"
      ></v-radio>
    </v-radio-group>
    <v-btn @click="connectToRoom" :disabled="!!connection">Connect</v-btn>
    <v-btn @click="disconnectFromRoom" :disabled="!connection"
      >Disconnect</v-btn
    >
  </div>
</template>

<style lang="scss" scoped></style>
