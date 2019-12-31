export default {
  state: {
    selectSampleTarget: [],
    selectSampleReport: []
  },
  getters: {
    selectSampleTarget: (state) => state.selectSampleTarget,
    selectSampleReport: (state) => state.selectSampleReport
  },
  mutations: {
    addTarget (state, item) {
      state.selectSampleTarget = item
    },
    addReport (state, item) {
      state.selectSampleReport = item
    }
  },
  actions: {
    addSample ({ commit }, items) {
      commit('addTarget', items)
    },
    addSampleRep ({ commit }, items) {
      commit('addReport', items)
    }
  }
}
