<template>
  <div class="when">
    <div class="when__header">When</div>
    <form action method="" class="when__form">
      <div class="when__form-field when__form-field--date">
        <label for="startsOn">
          Starts on
          <span class="form__required">*</span>
        </label>
        <input
          v-model="date"
          type="date"
          name="start"
          id="start"
          @input="$v.date.$touch()"
          placeholder="dd/mm/yyyy"
          :min="dateToday"
          required
        >
        <span>at</span>
        <input type="time" id="time" name="time" v-model="timeFunction" required>
        <input type="radio" id="am" name="am" value="am" v-model="timeAffix">
        <label for="am">am</label>
        <input type="radio" id="pm" name="pm" value="pm" v-model="timeAffix">
        <label for="pm">pm</label>
        <div v-if="!($v.date.required && $v.time.required) && sendData" class="error__message">When does the event start?</div>
      </div>

      <div class="when__form-field when__form-field--number">
        <label for="duration">
          Duration
        </label>
        <input
          v-model="duration"
          type="text"
          name="duration"
          id="duration"
          placeholder="Number"
        >
        <span>hour</span>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  name: "When",
  data: () => ({
    date: "",
    time: "",
    timeAffix: "am",
    duration: null,
    sendData: false,
    formValid: false,
  }),
  computed: {
    dateToday() {
      const today = new Date();
      const dd = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;
      const mm = today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
      const yyyy = today.getFullYear();
      return `${yyyy}-${mm}-${dd}`;
    },
    timeFunction: {
      get() {
        return this.getFormattedTime();
      },
      set(newValue) {
        this.$v.time.$touch();
        this.time = this.getFormattedTime(newValue);
      }
    },
    collectData() {
      return this.$store.getters.collectData;
    },
  },
  watch: {
    "timeAffix"(val) {
      let hh = this.time.substring(0, 2);
      const mm = this.time.substring(3, 5);
      if (val === "am") {
        if (hh > 21) {
          hh -= 12;
        } else if (hh > 12) {
          hh = `0${hh - 12}`;
        }
        this.time = `${hh}:${mm}`;
      }
      if (val === "pm") {
        this.time = `${Number(hh) + 12}:${mm}`;
      }
    },
    collectData(val) {
      if (val) {
        this.storeData();
      }
    },
  },
  validations: {
    date: {
      required,
    },
    time: {
      required,
    },
  },
  methods: {
    getFormattedTime(time) {
      const timeToFormat = time ? time : this.time;
      let hh = timeToFormat.substring(0, 2);
      const mm = timeToFormat.substring(3, 5);
      if (hh > 21) {
        hh -= 12;
      } else if (hh > 12) {
        hh = `0${hh - 12}`;
      }
      if (time && this.timeAffix === "pm") {
        hh = Number(hh) + 12;
      }
      return `${hh}:${mm}`;
    },
    storeData() {
      this.sendData = true;
      this.formValid = !this.$v.$invalid;
      this.$store.dispatch("set_when", this);
    },
  },
}
</script>

<style scoped lang="scss">

</style>
