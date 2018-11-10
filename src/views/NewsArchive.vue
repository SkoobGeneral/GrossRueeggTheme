<template>
  <b-container class="bv-example-row pt-4 mt-3">
    <h2 class="title is-1 has-text-centered has-text-weight-light">News</h2>
    <GridNews
      :posts="posts"
      v-if="posts"
    ></GridNews>
  </b-container>
</template>

<script>

import GridNews from '../components/components/GridNews.vue';

export default {
  components: {
    GridNews
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

  props: [ "showToolbar" ],

  mounted() {
    this.getReferences()
    if (!this.showToolbar) {
      this.showToolbar = true;
    }
  },

  methods: {
    getReferences: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + 'news')
      .then(response => {
        setTimeout(() => {
          this.posts = response.data;
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