<template>
  <div class="coordinator card">
    <div class="card__header">Coordinator</div>
    <form action method class="coordinator__form">
      <div class="card__field">
        <label
          class="card__label"
          :class="{'card__label--error': !$v.id.required && sendData}"
          for="responsible"
        >
          Responsible
          <span class="form__required">*</span>
        </label>
        <select
          id="responsible"
          class="card__input card__select"
          :class="{'card__input--error': !$v.id.required && sendData}"
          v-model="id"
          required
        >
          <option
            v-for="employee in employesSorted"
            :key="employee.id"
            :value="employee.id"
          >{{employee.name}} {{employee.lastname}}</option>
        </select>
        <div class="card__select-triangle"></div>
        <div v-if="!$v.id.required && sendData" class="error__message">This cannot be empty</div>
      </div>

      <div class="card__field">
        <label
          class="card__label"
          :class="{'card__label--error': !($v.email.email && $v.email.required) && sendData}"
          for="email"
        >Email</label>
        <input
          class="card__input"
          :class="{'card__input--error': !($v.email.email && $v.email.required) && sendData}"
          v-model="email"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        >
        <div v-if="!$v.email.required && sendData" class="error__message">Provide an email address</div>
        <div v-if="!$v.email.email && sendData" class="error__message">This is not a valid email</div>
      </div>
    </form>
  </div>
</template>

<script>
import employes from "./../mocks/employes.json";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Coordinator",
  data: () => ({
    id: 3,
    email: "",
    sendData: false,
    formValid: false
  }),
  computed: {
    employesSorted() {
      const employesList = [...employes];
      const selected = employesList.splice(this.id, 1);
      return [...selected, ...employesList];
    },
    collectData() {
      return this.$store.getters.collectData;
    }
  },
  mounted() {
    this.email = employes[this.id].email;
  },
  watch: {
    id(val) {
      this.email = employes[val].email;
    },
    collectData(val) {
      if (val) {
        this.storeData();
      }
    }
  },
  validations: {
    id: {
      required
    },
    email: {
      required,
      email
    }
  },
  methods: {
    storeData() {
      this.$v.id.$touch();
      this.$v.email.$touch();
      this.formValid = !this.$v.$invalid;
      const data = {
        ...this,
        email: employes[this.id].email
      };
      this.sendData = true;
      this.$store.dispatch("set_coordinator", data);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
