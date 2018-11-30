<template>
  <b-container class="bv-example-row pt-4 mt-3 mb-5">
    <h1 class="title is-1 has-text-centered has-text-weight-light animated fadeIn delay-2s" style="display: block;">News</h1>
    <GridNews
      ref="grid"
      :posts="posts"
      v-if="posts"
    ></GridNews>
    <div class="has-text-right">
      <button class="button is-light animated fadeIn delay-2s"
        @click="loadMore()"
        v-if="current < lastPage"
      >Load more!</button>
    </div>
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
      posts: [],
      current: 1,
      perPage: 4,
      lastPage : 0,
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
      axios.get(`${window.SETTINGS.API_BASE_PATH}news?per_page=${this.perPage}&page=${this.current}`)
      .then(response => {
        setTimeout(() => {
          this.lastPage = response.headers['x-wp-totalpages'];
          if (!this.posts.length) {
            this.posts = response.data
          } else {
            this.posts = this.posts.concat(response.data);
          }
          this.$refs.grid.refresh()
        }, 1)
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