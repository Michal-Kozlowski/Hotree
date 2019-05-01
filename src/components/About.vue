<template>
  <div class="about">
    <div class="about__header">About</div>
    <form action method="" class="about__form">
      <div class="about__form-field about__form-field--text">
        <label for="title">
          Title
          <span class="form__required">*</span>
        </label>
        <input
          v-model="title"
          type="text"
          name="title"
          id="title"
          @input="$v.title.$touch()"
          placeholder="Make it short and clear"
          required
        >
      </div>
      <div v-if="!$v.title.required && sendData" class="error__message">Title cannot be empty</div>

      <div class="about__form-field about__form-field--text">
        <label for="description">
          Description
          <span class="form__required">*</span>
        </label>
        <input
          v-model="description"
          type="text"
          name="description"
          id="description"
          @input="$v.description.$touch()"
          placeholder="Write about your event, be creative"
          maxlength="140"
          required
        >
        <span>{{description.length}}</span>
      </div>
      <div v-if="!$v.description.required && sendData" class="error__message">Description cannot be empty</div>

      <div class="about__form-field about__form-field--select">
        <label for="category">Category</label>
        <select id="category" v-model="categoryId">
          <option disabled value>Select category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
        </select>
      </div>

      <div class="about__form-field about__form-field--radio">
        <label>Payment</label>
        <input type="radio" id="free" name="free" :value="false" v-model="payment">
        <label for="free">Free event</label>
        <input type="radio" id="paid" name="paid" :value="true" v-model="payment">
        <label for="paid">Paid event</label>
        <div v-if="payment">
          <input v-model="fee" type="number" name="fee" id="fee" placeholder="Fee">
          <label for="fee">$</label>
        </div>
      </div>

      <div class="about__form-field about__form-field--number">
        <label for="reward">reward</label>
        <input
          v-model="reward"
          type="number"
          name="reward"
          id="reward"
          placeholder="Number"
          required
        >
        <span>reward points for attendance</span>
      </div>
    </form>
  </div>
</template>

<script>
import categories from './../mocks/categories.json';
import { required } from 'vuelidate/lib/validators';

export default {
  name: "About",
  data: () => ({
    categories: categories,
    title: "",
    description: "",
    categoryId: "",
    payment: false,
    fee: null,
    reward: null,
    sendData: false,
    formValid: false,
  }),
  computed: {
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
    title: {
      required,
    },
    description: {
      required,
    },
  },
  methods: {
    storeData() {
      this.sendData = true;
      this.formValid = !this.$v.$invalid;
      this.$store.dispatch("set_about", this);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
