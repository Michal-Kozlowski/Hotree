<template>
  <div class="header">
    <div class="header__container">
      <h1 class="header__title">New event</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped lang="scss">
@import 'src/assets/styles/styles.scss';

.header {
  background: $header;
  height: 95px;
  border-top: 15px solid $header-top;

  &__container {
    max-width: 960px;
    margin: auto;
  }

  &__title {
    font-size: 34px;
    line-height: 36px;
    font-weight: 100;
    color: $white;
    padding: 0 20px;
    margin: 25px 0 0;

    @include media-breakpoint-up(sm) {
      padding: 0 120px;
    }
  }
}

</style>
