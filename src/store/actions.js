import { SERVER_URL } from "@/utils/constants";
import io from "socket.io-client";
import { app } from "../main";

function registerWsEvents(data) {
  const { socketInstance, dispatch, state, commit } = data;

  // event to update session on store
  socketInstance.on("updateSession", (data) => {
    const localUser = state.localUser;

    const currUserUpdate = data.users.find(
      (u) => u.userId === localUser.userId
    );

    // update localUser if role has changed
    if (currUserUpdate && currUserUpdate.role !== localUser.role) {
      commit("updateLocalUser", {
        username: localUser.username,
        room: localUser.room,
        role: currUserUpdate.role,
        userId: localUser.userId,
      });
    }

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

  // on disconnect, redirect user to homepage
  socketInstance.on("disconnect", () => {
    app.$router.push({ name: "home", query: { disconnected: true } });
  });
}

export default {
  connectUser({ commit, dispatch, state }, userData) {
    const { role, username, userId, sessionName, room } = userData;

    const socketInstance = io(SERVER_URL, {
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
      userId,
    });

    registerWsEvents({
      socketInstance,
      dispatch,
      state,
      commit,
    });
  },
  toggleVotingVisibility({ commit }, votingVisibility) {
    commit("toggleVotingVisibility", votingVisibility);
  },
  disconnectFromRoom({ state }) {
    state.connection.emit("disconnectFromRoom", state.connection.id);
  },
  forceRemoveUser({ state }, socketId) {
    state.connection.emit("forceRemoveUser", socketId);
  },
  updateSessionName({ state }, newSessionName) {
    state.connection.emit("updateSessionName", newSessionName);
  },
  updateIssuesList({ state }, issues) {
    state.connection.emit("updateIssuesList", issues);
  },
  updateVotingIssueStatus({ state }, { issueId, started, stopped }) {
    state.connection.emit("updateVotingIssueStatus", {
      issueId,
      started,
      stopped,
    });
  },
  resetIssue({ state }, { issueId }) {
    state.connection.emit("resetIssue", {
      issueId,
    });
  },
  castVoteOnIssue({ state }, { issueId, vote }) {
    state.connection.emit("castVoteOnIssue", {
      issueId,
      vote,
    });
  },
  finalizeVoting({ state }, { issueId, vote }) {
    state.connection.emit("finalizeVoting", {
      issueId,
      vote,
    });
  },
  makeAdmin({ state }, { user }) {
    state.connection.emit("makeAdmin", {
      user,
    });
  },
  updateSessionInfo({ commit }, val) {
    commit("updateSessionInfo", val);
  },
};
