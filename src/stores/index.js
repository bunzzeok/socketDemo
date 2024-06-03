import { defineStore } from "pinia";

export const useStore = defineStore("demo", {
  state: () => ({
    accessToken: "",
    staffInfo: {
      idx: 0,
      email: "",
    },
    searchParams: {},
  }),
  getters: {
    getAccessToken(state) {
      return state.accessToken;
    },
  },
  actions: {
    setAccessToken(userInfo) {
      this.accessToken = userInfo.accessToken;
      this.staffInfo = userInfo.staffInfo;
    },
  },
  persist: {
    enabled: true,
    key: "demo",
  },
});
