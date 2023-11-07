import io from "socket.io-client";

function registerWsEvents(data) {
  const { socketInstance, dispatch, commit } = data;

  // event to update users list on store
  socketInstance.on("updateUsers", (data) => {
    console.log("updateUsers ws ev", data);
    dispatch("updateUsers", data);
  });

  // event received after client emmited "disconnectFromRoom"
  socketInstance.on("canDisconnect", (socketId) => {
    if (socketId === socketInstance.id) {
      // we need to trigger this on the client-side because of the forceful remove option...
      // only the client can leave it's own room
      socketInstance.emit("leaveRoom", socketInstance.id);

      socketInstance.disconnect();

      // reset connection and localUser on store
      commit("updateConnection", null);
      commit("updateLocalUser", null);
    }
  });
}

export default {
  connectUser({ commit, dispatch }, userData) {
    const { username, room, role } = userData;

    const socketInstance = io("http://localhost:8080", {
      query: {
        username,
        room,
        role,
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
  forceRemoveUser({ state }, userId) {
    state.connection.emit("forceRemoveUser", userId);
  },
  castVoteOnIssue({ state }, val) {
    state.connection.emit("castVoteOnIssue", val);
  },
  updateUsers({ commit }, val) {
    commit("updateUsers", val);
  },
};
