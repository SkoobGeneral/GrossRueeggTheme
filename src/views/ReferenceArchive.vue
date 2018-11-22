<template>
  <div class="container">
    <div class="bv-example-row pt-4 mt-3">
      <h2 class="title is-1 has-text-centered has-text-weight-light" style="display: block;">Referenzen</h2>
      <Grid
        :posts="posts"
        v-if="posts"
        :key="_uid + '_grid_' + posts.length"
      ></Grid>
      <button class="button is-warning"
        @click="loadMore()"
      >load more</button>
    </div>
  </div>
</template>

<script>

import Grid from '../components/components/Grid.vue';

export default {
  components: {
    Grid,
  },

  data() {
    return {
      posts: [],
      current: 1,
      perPage: 2,
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
      axios.get(`${window.SETTINGS.API_BASE_PATH}referenzen?per_page=${this.perPage}&page=${this.current}`)
      .then(response => {
        setTimeout(() => {
          if (!this.posts.length) {
            this.posts = response.data
          } else {
            this.posts = this.posts.concat(response.data);
          }
        }, 200)
      })
      .catch(e => {
        console.log(e);
      })
    },
    loadMore () {
      this.current++
      this.getReferences()
    }
  }
}
</script>

<style lang="scss">
</style>