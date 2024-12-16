import { defineStore } from "pinia";

export const useUIStore = defineStore("uiStore", {
  state: () => ({
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
  }),
  actions: {
    toggleConfigurator() {
      this.showConfig = !this.showConfig;
    },
    toggleSidebarPinned() {
      this.isPinned = !this.isPinned;
    },
    setSidebarType(payload) {
      this.sidebarType = payload;
    },
    toggleNavbarFixed() {
      this.isNavFixed = !this.isNavFixed;
    },
    toggleSidebarColor(payload) {
      this.sidebarType = payload;
    },
  },
  getters: {
    isSidebarPinned: (state) => state.isPinned,
    isNavbarFixed: (state) => state.isNavFixed,
  },
});
