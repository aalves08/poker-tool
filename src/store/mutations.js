export default {
  updateConnection(state, val) {
    state.connection = val;
  },
  updateLocalUser(state, val) {
    state.localUser = val;
  },
  updateSessionInfo(state, val) {
    state.session = val;
  },
  toggleVotingVisibility(state, val) {
    state.isVotingHidden = val;
  },
  updateGithubApiToken(state, val) {
    state.githubApiToken = val;
  },
};
