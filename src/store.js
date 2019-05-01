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
    validation: {
      about: false,
      coordinator: false,
      when: false,
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
      store.validation.about = data.formValid;
    },
    SET_COORDINATOR(store, data) {
      store.formData.coordinator.email = data.email;
      store.formData.coordinator.id = data.id;
      store.validation.coordinator = data.formValid;
    },
    SET_WHEN(store, data) {
      store.formData.duration = data.duration * 60 * 60;
      store.formData.date = `${data.date}T${data.time}`;
      store.validation.when = data.formValid;
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
      if (
        this.state.validation.about &&
        this.state.validation.coordinator &&
        this.state.validation.when
      ) {
        // this makes object a little bit more readable in the console
        console.log(JSON.parse(JSON.stringify(this.state.formData)));
      }
    },
  },
  getters: {
    collectData: (state) => state.collectData,
  }
});
