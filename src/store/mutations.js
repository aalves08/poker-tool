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
};
