<template>
  <div class="new-event">
    <Header/>
    <div class="new-event__forms">
      <About/>
      <Coordinator/>
      <When/>
    </div>
    <button class="new-event__publish" @click.prevent="sendForm">Publish event</button>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import About from '@/components/About.vue';
import Coordinator from '@/components/Coordinator.vue';
import When from '@/components/When.vue';

export default {
  name: 'new-event',
  components: {
    Header,
    About,
    Coordinator,
    When
  },
  methods: {
    sendForm() {
      this.$store.dispatch("collect_data", true).then(() => {
        this.$store.dispatch("send_form").then(() => {
          this.$store.dispatch("collect_data", false);
        })
      });
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/styles/styles.scss';

.new-event {

}

</style>
