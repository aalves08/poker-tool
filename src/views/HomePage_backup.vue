<template>
  <div>
    <VotingBlock />
    <IssuesList />
    <ConnectWs />
    <UserList />
  </div>
</template>

<script>
import VotingBlock from "../components/VotingBlock.vue";
import IssuesList from "../components/IssuesList.vue";
import ConnectWs from "../components/ConnectWs.vue";
import UserList from "../components/UserList.vue";

export default {
  name: "HomeView",

  components: {
    VotingBlock,
    IssuesList,
    ConnectWs,
    UserList,
  },
};
</script>
