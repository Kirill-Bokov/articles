import { createStore } from "vuex/types/index.js";

const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }

});

export default store;
