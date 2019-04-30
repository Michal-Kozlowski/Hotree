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
          v-model="when.date"
          type="date"
          name="start"
          id="start"
          placeholder="dd/mm/yyyy"
          :min="dateToday"
          required
        >
        <span>at</span>
        <input type="time" id="time" name="time" v-model="timeFunction" required>
        <input type="radio" id="am" name="am" value="am" v-model="when.timeAffix">
        <label for="am">am</label>
        <input type="radio" id="pm" name="pm" value="pm" v-model="when.timeAffix">
        <label for="pm">pm</label>
      </div>

      <div class="when__form-field when__form-field--number">
        <label for="duration">
          Duration
        </label>
        <input
          v-model="when.duration"
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
export default {
  name: 'When',
  data: () => ({
    when: {
      date: '',
      time: '',
      timeAffix: 'am',
      duration: null,
    },
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
        this.when.time = this.getFormattedTime(newValue);
      }
    },
    collectData() {
      return this.$store.getters.collectData;
    },
  },
  watch: {
    "when.timeAffix"(val) {
      let hh = this.when.time.substring(0, 2);
      const mm = this.when.time.substring(3, 5);
      if (val === "am") {
        if (hh > 21) {
          hh -= 12;
        } else if (hh > 12) {
          hh = `0${hh - 12}`;
        }
        this.when.time = `${hh}:${mm}`;
      }
      if (val === "pm") {
        this.when.time = `${Number(hh) + 12}:${mm}`;
      }
    },
    collectData(val) {
      if (val) {
        this.storeData();
      }
    },
  },
  methods: {
    getFormattedTime(time) {
      const timeToFormat = time ? time : this.when.time;
      let hh = timeToFormat.substring(0, 2);
      const mm = timeToFormat.substring(3, 5);
      if (hh > 21) {
        hh -= 12;
      } else if (hh > 12) {
        hh = `0${hh - 12}`;
      }
      if (time && this.when.timeAffix === "pm") {
        hh = Number(hh) + 12;
      }
      return `${hh}:${mm}`;
    },
    storeData() {
      this.$store.dispatch("set_when", this.when);
    },
  },
}
</script>

<style scoped lang="scss">

</style>
