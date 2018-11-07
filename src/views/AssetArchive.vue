<template>
  <b-container class="bv-example-row pt-4 mt-3">
    <h2 class="title is-1 has-text-centered has-text-weight-light" style="display: block;">Immobilien</h2>
    <GridImmobilien
      :posts="posts"
      :show-toolbar="true"
      v-if="posts"
    ></GridImmobilien>
  </b-container>
</template>

<script>

import GridImmobilien from '../components/components/GridImmobilien.vue';

export default {
  components: {
    GridImmobilien,
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

  props: [ ],

  mounted() {
    this.getReferences()
    if (!this.showToolbar) {
      this.showToolbar = true;
    }
  },

  methods: {
    getReferences: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + 'immobilien')
      .then(response => {
        setTimeout(() => {
          this.posts = response.data;
          this.$emit('pageTitle', {title: 'Immobilien Archive'})
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