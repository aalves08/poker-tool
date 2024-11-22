export default {
  config: (state) => state.config,
  connection: (state) => state.connection,
  isUserAdmin: (state) =>
    !state.localUser?.role || state.localUser?.role === "admin",
  session: (state) => state.session,
  users: (state) => state.session.users,
  issues: (state) => state.session.issues,
  adminRoute: (state) => state.session.adminRoute,
  localUser: (state) => state.localUser,
  githubApiToken: (state) => state.githubApiToken,
  isVotingHidden: (state) => state.isVotingHidden,
};
