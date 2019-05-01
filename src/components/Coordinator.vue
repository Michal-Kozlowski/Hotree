<template>
  <div class="coordinator">
    <div class="coordinator__header">Coordinator</div>
    <form action method="" class="coordinator__form">
      <div class="coordinator__form-field coordinator__form-field--select">
        <label for="responsible">
          Responsible
          <span class="form__required">*</span>
        </label>
        <select id="responsible" v-model="id" required>
          <option v-for="employee in employesSorted" :key="employee.id" :value="employee.id">{{employee.name}} {{employee.lastname}}</option>
        </select>
        <div v-if="!$v.id.required && sendData" class="error__message">This cannot be empty</div>
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
        <div v-if="!$v.email.email && sendData" class="error__message">Please provide valid email</div>
      </div>
    </form>
  </div>
</template>

<script>
import employes from './../mocks/employes.json';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'Coordinator',
  data: () => ({
    id: 3,
    sendData: false,
    formValid: false,
  }),
  computed: {
    email() {
      return employes[this.id].email;
    },
    employesSorted() {
      const employesList = [...employes];
      const selected = employesList.splice(this.id, 1);
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
  validations: {
    id: {
      required,
    },
    email: {
      required,
      email,
    },
  },
  methods: {
    storeData() {
      this.$v.id.$touch();
      this.$v.email.$touch()
      this.formValid = !this.$v.$invalid;
      const data = {
        ...this,
        email: employes[this.id].email,
      };
      this.sendData = true;
      this.$store.dispatch("set_coordinator", data);
    },
  },
};
</script>

<style scoped lang="scss">

</style>
