<template>
  <div class="coordinator">
    <div class="coordinator__header">Coordinator</div>
    <form action method="" class="coordinator__form">
      <div class="coordinator__form-field coordinator__form-field--select">
        <label for="responsible">
          Responsible
          <span class="form__required">*</span>
        </label>
        <select id="responsible" v-model="coordinator.id" required>
          <option v-for="employee in employesSorted" :key="employee.id" :value="employee.id">{{employee.name}} - {{employee.lastname}}</option>
        </select>
      </div>

      <div class="coordinator__form-field coordinator__form-field--text">
        <label for="email">
          Email
        </label>
        <input
          v-model="email"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        >
      </div>
    </form>
  </div>
</template>

<script>
import employes from './../mocks/employes.json';

export default {
  name: 'Coordinator',
  data: () => ({
    coordinator: {
      id: 3,
    },
  }),
  computed: {
    email() {
      return employes[this.coordinator.id].email;
    },
    employesSorted() {
      const employesList = [...employes];
      const selected = employesList.splice(this.coordinator.id, 1);
      return [...selected, ...employesList];
    },
    collectData() {
      return this.$store.getters.collectData;
    },
  },
  watch: {
    collectData(val) {
      if (val) {
        this.storeData();
      }
    },
  },
  methods: {
    storeData() {
      const data = {
        id: this.coordinator.id,
        email: employes[this.coordinator.id].email,
      };
      this.$store.dispatch("set_coordinator", data);
    },
  },
};
</script>

<style scoped lang="scss">

</style>
