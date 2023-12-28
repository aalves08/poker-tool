import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { ROLES } from "../utils/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      roles: [
        {
          label: "Admin",
          value: ROLES.ADMIN,
        },
        {
          label: "Simple user",
          value: ROLES.USER,
        },
      ],
      voteValues: [
        {
          label: 0,
          value: 0,
        },
        {
          label: "&#189;",
          value: 0.5,
          deterministic: true,
        },
        {
          label: 1,
          value: 1,
          deterministic: true,
        },
        {
          label: 2,
          value: 2,
          deterministic: true,
        },
        {
          label: 3,
          value: 3,
          deterministic: true,
        },
        {
          label: 5,
          value: 5,
          deterministic: true,
        },
        {
          label: 8,
          value: 8,
          deterministic: true,
        },
        {
          label: 13,
          value: 13,
          deterministic: true,
        },
        {
          label: "?",
          value: "?",
        },
        {
          label: "&infin;",
          value: "inf",
        },
      ],
    },
    localUser: null,
    connection: null,
    session: {},
    isVotingHidden: true,
  },
  getters: { ...getters },
  mutations: { ...mutations },
  actions: { ...actions },
  modules: {},
});
