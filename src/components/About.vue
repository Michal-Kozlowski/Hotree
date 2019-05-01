<template>
  <div class="about card">
    <div class="card__header">About</div>
    <form action method class="about__form">
      <div class="card__field">
        <label
          class="card__label"
          :class="{'card__label--error': !$v.title.required && sendData}"
          for="title"
        >
          Title
          <span class="form__required">*</span>
        </label>
        <input
          class="card__input"
          :class="{'card__input--error': !$v.title.required && sendData}"
          v-model="title"
          type="text"
          name="title"
          id="title"
          @input="$v.title.$touch()"
          placeholder="Make it short and clear"
          required
        >
        <div v-if="!$v.title.required && sendData" class="error__message">Title cannot be empty</div>
      </div>

      <div class="card__field card__field--with-info">
        <label
          class="card__label"
          :class="{'card__label--error': !$v.description.required && sendData}"
          for="description"
        >
          Description
          <span class="form__required">*</span>
        </label>
        <textarea
          class="card__input"
          :class="{'card__input--error': !$v.description.required && sendData}"
          v-model="description"
          type="text"
          rows="8"
          name="description"
          id="description"
          @input="$v.description.$touch()"
          placeholder="Write about your event, be creative"
          maxlength="140"
          required
        ></textarea>
        <div class="card__info">
          <p>Max length 140 characters</p>
          <p>{{description.length}}/140</p>
        </div>
        <div
          v-if="!$v.description.required && sendData"
          class="error__message"
        >Please describe the event</div>
      </div>

      <div class="card__field card__field--with-info">
        <label class="card__label" for="category">Category</label>
        <select
          id="category"
          class="card__input card__select"
          :class="{'card__clear': categoryId === ''}"
          v-model="categoryId"
        >
          <option disabled value>Select category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >{{category.name}}</option>
        </select>
        <div class="card__select-triangle"></div>
        <div class="card__info">
          <p>Describes topic and people who should be interested in this event</p>
        </div>
      </div>

      <div class="card__field">
        <label
          class="card__label"
          :class="{'card__label--error': payment && !$v.fee.required && sendData}"
        >Payment</label>
        <div class="card__input card__input--group">
          <input
            type="radio"
            class="card__radio"
            id="free"
            name="free"
            :value="false"
            v-model="payment"
          >
          <label for="free" class="card__radio-label">Free event</label>
          <input
            type="radio"
            class="card__radio"
            id="paid"
            name="paid"
            :value="true"
            v-model="payment"
          >
          <label for="paid" class="card__radio-label">Paid event</label>
          <div v-if="payment">
            <input
              class="card__input card__input--short"
              :class="{'card__input--error': payment && !$v.fee.required && sendData}"
              v-model="fee"
              type="number"
              name="fee"
              id="fee"
              min="0"
              @input="$v.fee.$touch()"
              placeholder="Fee"
            >
            <label for="fee">$</label>
          </div>
        </div>
        <div
          v-if="payment && !$v.fee.required && sendData"
          class="error__message"
        >Fee cannot be empty</div>
      </div>

      <div class="card__field">
        <label class="card__label" for="reward">Reward</label>
        <div class="d-flex">
          <input
            class="card__input card__input--short"
            v-model="reward"
            type="number"
            name="reward"
            id="reward"
            placeholder="Number"
            required
          >
          <div class="card__explain">reward points for attendance</div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import categories from "./../mocks/categories.json";
import { required } from "vuelidate/lib/validators";

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
    formValid: false
  }),
  computed: {
    collectData() {
      return this.$store.getters.collectData;
    }
  },
  watch: {
    collectData(val) {
      if (val) {
        this.storeData();
      }
    }
  },
  validations: {
    title: {
      required
    },
    description: {
      required
    },
    fee: {
      required
    }
  },
  methods: {
    storeData() {
      this.sendData = true;
      if (this.payment) {
        this.formValid = !this.$v.$invalid;
      } else {
        this.formValid = !(
          this.$v.title.$invalid && this.$v.description.$invalid
        );
      }
      this.$store.dispatch("set_about", this);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
