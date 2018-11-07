<template>
  <b-container class="bv-example-row pt-4 mt-3">
    <h2 class="title is-1 has-text-centered has-text-weight-light" style="display: block;">Referenzen</h2>
    <Grid
      :posts="posts"
      v-if="posts"
    ></Grid>
  </b-container>
</template>

<script>

import Grid from '../components/components/Grid.vue';

export default {
  components: {
    Grid,
  },

  data() {
    return {
      posts: null,
      post: {
        type: Object,
        default() {
          return {
            id: 0,
            slug: '',
            title: { rendered: '' },
            content: { rendered: '' }
          }
        }
      }      
    }
  },

  mounted() {
    this.getReferences()
  },

  methods: {
    getReferences: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + 'referenzen')
      .then(response => {
        setTimeout(() => {
          this.posts = response.data;
          this.$emit('pageTitle', {title: 'Referenzen Archive'})
        }, 200)
      })
      .catch(e => {
        console.log(e);
      })
    }
  }
}
</script>

<style lang="scss">
</style>