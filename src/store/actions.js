import io from "socket.io-client";

function registerWsEvents(data) {
  const { socketInstance, dispatch, commit } = data;

  // event to update session on store
  socketInstance.on("updateSession", (data) => {
    dispatch("updateSessionInfo", data);
  });

  // event received after client emmited "disconnectFromRoom"
  socketInstance.on("canDisconnect", (socketId) => {
    if (socketId === socketInstance.id) {
      // we need to trigger this on the client-side because of the forceful remove option...
      // only the client can leave it's own room
      socketInstance.emit("leaveRoom", socketInstance.id);

      socketInstance.disconnect();

      // reset data on store
      commit("updateConnection", null);
      commit("updateLocalUser", null);
      commit("updateSessionInfo", {});
    }
  });
}

export default {
  connectUser({ commit, dispatch }, userData) {
    const { role, username, userId, sessionName, room } = userData;

    const socketInstance = io("http://localhost:8080", {
      query: {
        role,
        username,
        userId,
        sessionName,
        room,
      },
    });

    commit("updateConnection", socketInstance);

    commit("updateLocalUser", {
      username,
      room,
      role,
    });

    registerWsEvents({
      socketInstance,
      dispatch,
      commit,
    });
  },
  disconnectFromRoom({ state }) {
    state.connection.emit("disconnectFromRoom", state.connection.id);
  },
  forceRemoveUser({ state }, socketId) {
    state.connection.emit("forceRemoveUser", socketId);
  },
  updateIssuesList({ state }, issues) {
    state.connection.emit("updateIssuesList", issues);
  },
  castVoteOnIssue({ state }, val) {
    state.connection.emit("castVoteOnIssue", val);
  },
  updateSessionInfo({ commit }, val) {
    commit("updateSessionInfo", val);
  },
};
