<template>
  <div id="app">
    <NewEvent/>
  </div>
</template>

<script>
import NewEvent from "@/pages/NewEvent.vue";

export default {
  components: {
    NewEvent
  }
};
</script>


<style lang="scss">
@import "src/assets/styles/styles.scss";

#app {
  font-family: "Roboto", sans-serif;
}
</style>
