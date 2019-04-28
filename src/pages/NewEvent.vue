<template>
  <div class="new-event">
    <About/>
    <Coordinator/>
    <When/>
  </div>
</template>

<script>
import About from '@/components/About.vue';
import Coordinator from '@/components/Coordinator.vue';
import When from '@/components/When.vue';

export default {
  name: 'new-event',
  components: {
    About,
    Coordinator,
    When
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/styles/styles.scss';

</style>
