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
          v-model="about.title"
          type="text"
          name="title"
          id="title"
          placeholder="Make it short and clear"
          required
        >
      </div>

      <div class="about__form-field about__form-field--text">
        <label for="description">
          Description
          <span class="form__required">*</span>
        </label>
        <input
          v-model="about.description"
          type="text"
          name="description"
          id="description"
          placeholder="Write about your event, be creative"
          maxlength="140"
          required
        >
        <span>{{about.description.length}}</span>
      </div>

      <div class="about__form-field about__form-field--select">
        <label for="category">Category</label>
        <select id="category" v-model="about.categoryId">
          <option disabled value>Select category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
        </select>
      </div>

      <div class="about__form-field about__form-field--radio">
        <label>Payment</label>
        <input type="radio" id="free" name="free" :value="false" v-model="about.payment">
        <label for="free">Free event</label>
        <input type="radio" id="paid" name="paid" :value="true" v-model="about.payment">
        <label for="paid">Paid event</label>
        <div v-if="about.payment">
          <input v-model="about.fee" type="number" name="fee" id="fee" placeholder="Fee">
          <label for="fee">$</label>
        </div>
      </div>

      <div class="about__form-field about__form-field--number">
        <label for="reward">reward</label>
        <input
          v-model="about.reward"
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

export default {
  name: "About",
  data: () => ({
    categories: categories,
    about: {
      title: "",
      description: "",
      categoryId: "",
      payment: false,
      fee: null,
      reward: null
    },
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
  methods: {
    storeData() {
      this.$store.dispatch("set_about", this.about);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
