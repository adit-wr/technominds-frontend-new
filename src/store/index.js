import { createStore } from "vuex";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: false,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    toggleSidebarPinned(state) {
      state.isPinned = !state.isPinned;
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    toggleNavbarFixed(state) {
      state.isNavFixed = !state.isNavFixed;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
  },
  getters: {
    isSidebarPinned(state) {
      return state.isPinned;
    },
    isNavbarFixed(state) {
      return state.isNavFixed;
    }
  },
});
