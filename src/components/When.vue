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
          required
        >
        <span>at</span>
        <input type="time" id="time" name="time" v-model="when.time" required>
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
      date: "",
      time: "",
      timeAffix: "am",
      duration: null,
    },
  }),
}
</script>

<style scoped lang="scss">

</style>
