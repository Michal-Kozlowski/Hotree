<template>
  <div class="coordinator">
    <div class="coordinator__header">Coordinator</div>
    <form action method="" class="coordinator__form">
      <div class="coordinator__form-field coordinator__form-field--select">
        <label for="responsible">
          Responsible
          <span class="form__required">*</span>
        </label>
        <select id="responsible" v-model="coordinator.responsible" required>
          <option disabled value>Select employee</option>
          <option v-for="employee in employes" :key="employee.id" :value="employee.id">{{employee.name}} - {{employee.lastname}}</option>
        </select>
      </div>

      <div class="coordinator__form-field coordinator__form-field--text">
        <label for="email">
          Email
        </label>
        <input
          v-model="email"
          type="text"
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
    employes: employes,
    coordinator: {
      responsible: 3,
      email: "",
    },
  }),
  computed: {
    email() {
      return this.employes[this.coordinator.responsible].email;
    },
  },
};
</script>

<style scoped lang="scss">

</style>
