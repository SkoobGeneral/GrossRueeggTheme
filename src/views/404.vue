<template>
  <section style="padding-top: 2.5rem !important; margin-top: 2.5rem !important; min-height: 100vh;">
      <div class="container display-block" style="display: flex;">
        <b-img class="mb-5 animated fadeInLeft" style="max-height: 350px; object-fit: cover; margin: auto;" src="/wp-content/uploads/2018/10/logo.png" />
        <div class="has-text-right animated fadeInRight delay-2s" style="align-items:center; margin: auto;">
          <h1 style="font-size: 60px; font-weight: 100;">404</h1>
          <h2>Page not found!</h2>
          <router-link to="/">
          <span class="mb-5">Return to Safety!</span>
          </router-link>
        </div>
      </div>
  </section>
</template>

<script>
  import debounce from 'lodash/debounce'
  import moment from 'moment'

export default {
  
}
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  .display-block {
    @include breakpoint($xs) {
      display: block !important;
    }
  }
</style>