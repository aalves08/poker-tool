import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      voteValues: [
        {
          label: 0,
          value: 0,
        },
        {
          label: "&#189;",
          value: 0.5,
        },
        {
          label: 1,
          value: 1,
        },
        {
          label: 2,
          value: 2,
        },
        {
          label: 3,
          value: 3,
        },
        {
          label: 5,
          value: 5,
        },
        {
          label: 8,
          value: 8,
        },
      ],
    },
    users: {
      master: [],
      user: [],
    },
  },
  getters: { ...getters },
  mutations: { ...mutations },
  actions: { ...actions },
  modules: {},
});
