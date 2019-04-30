import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formData: {
      title: "",
      description: "",
      category_id: 0,
      paid_event: null,
      event_fee: 0,
      reward: 0,
      date: "", // YYYY-MM-DDTHH:mm
      duration: 0, // in seconds
      coordinator: {
        email: "",
        id: "",
      },
    },
    collectData: false,
  },
  mutations: {
    SET_ABOUT(store, data) {
      store.formData.title = data.title;
      store.formData.description = data.description;
      store.formData.category_id = data.categoryId;
      store.formData.paid_event = data.payment;
      store.formData.event_fee = data.fee;
      store.formData.reward = data.reward;
    },
    SET_COORDINATOR(store, data) {
      store.formData.coordinator.email = data.email;
      store.formData.coordinator.id = data.id;
    },
    SET_WHEN(store, data) {
      store.formData.duration = data.duration * 60 * 60;
      store.formData.date = `${data.date}T${data.time}`;
    },
    COLLECT_DATA(store, data) {
      store.collectData = data;
    },
  },
  actions: {
    set_about({ commit }, data) {
      commit('SET_ABOUT', data);
    },
    set_coordinator({ commit }, data) {
      commit('SET_COORDINATOR', data);
    },
    set_when({ commit }, data) {
      commit('SET_WHEN', data);
    },
    collect_data({ commit }, data) {
      commit('COLLECT_DATA', data);
    },
    send_form() {
      console.log(this.state.formData);
    },
  },
  getters: {
    collectData: (state) => state.collectData,
  }
});
