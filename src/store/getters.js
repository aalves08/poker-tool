export default {
  config: (state) => state.config,
  connection: (state) => state.connection,
  isUserAdmin: (state) =>
    !state.localUser?.role || state.localUser?.role === "admin",
  session: (state) => state.session,
  users: (state) => state.session.users,
  issues: (state) => state.session.issues,
  localUser: (state) => state.localUser,
  isVotingHidden: (state) => state.isVotingHidden,
};
