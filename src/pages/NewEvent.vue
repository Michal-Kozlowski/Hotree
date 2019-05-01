<template>
  <div class="new-event">
    <Header/>
    <div v-if="!success" class="new-event__forms">
      <About/>
      <Coordinator/>
      <When/>
    </div>
    <button v-if="!success" class="new-event__publish" @click.prevent="sendForm">Publish event</button>
    <div v-if="success" class="card success">
      <div class="success__header">Success</div>
      <div class="success__info">Event has been created.</div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import About from "@/components/About.vue";
import Coordinator from "@/components/Coordinator.vue";
import When from "@/components/When.vue";

export default {
  name: "new-event",
  components: {
    Header,
    About,
    Coordinator,
    When
  },
  computed: {
    success() {
      return this.$store.getters.success;
    }
  },
  methods: {
    sendForm() {
      this.$store.dispatch("collect_data", true).then(() => {
        this.$store.dispatch("send_form").then(() => {
          this.$store.dispatch("collect_data", false);
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/styles/styles.scss";

.new-event {
  background: $background;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__forms {
    margin-top: 32px;
  }

  &__publish {
    text-transform: uppercase;
    font-weight: bold;
    color: $white;
    background: $button;
    border: none;
    border-radius: 2px;
    width: 160px;
    height: 50px;
    margin-bottom: 30px;
    align-self: center;
    cursor: pointer;
  }
}
</style>
