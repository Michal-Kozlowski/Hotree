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
  height: 80px;
  border-top: 15px solid $header-top;

  &__container {
    max-width: 960px;
    margin: auto;
  }

  &__title {
    color: $white;
    line-height: 36px;
    font-weight: 200;
    padding: 0 20px;
    margin: 24px 0 20px;

    @include media-breakpoint-up(sm) {
      padding: 0 120px;
    }
  }
}

</style>
