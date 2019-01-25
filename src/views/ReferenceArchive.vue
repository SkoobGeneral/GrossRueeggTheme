<template>
  <div class="container">
    <div class="bv-example-row pt-4 mt-3 mb-5">
      <h1 class="title is-1 has-text-centered has-text-weight-light animated fadeIn delay-2s" style="display: block;">Referenzen</h1>
      <Grid
        ref="grid"
        :posts="posts"
        v-if="posts"
        v-on:taxonomy:select="getReferencesByTaxId()"
      ></Grid>
      <div class="has-text-right load_more_wrapper">
      <button class="button is-light animated fadeIn delay-2s"
        @click="loadMore()"
        v-if="current < lastPage"
      >Load more!</button>
    </div>
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
      perPage: 3,
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
    //this.getReferences()
    this.getReferencesByTaxId(1) //0 is the ID of the 'featured' category
  },

  computed: {
    taxPages () {
      return this.$store.references.currentTaxPages //save this please
    }
  },

  methods: {
    getReferencesByTaxId(taxId) {
      if (!this.$store.references.refsByTaxId[taxId]) {
        // mirar si hay página. si no hay, usar página 1. si sí hay y pag < max pages para esa taxId, entonces page++ y guardar en el store el page actual
        axios.get(`${window.SETTINGS.API_BASE_PATH}referenzen?classification=${taxId}&per_page=1&page=${taxPages[taxId]}`) //referenzen?classification=${taxId}&per_page=1&page=${taxPages[taxId]}
          .then(response => {
            setTimeout(() => {
              console.log(response.data)
            }, 1)
        })
        //guarde la respuesta en el store
        //this.posts concat...

      }
    },

    getReferences: function() {
      axios.get(`${window.SETTINGS.API_BASE_PATH}referenzen?per_page=${this.perPage}&page=${this.current}`)
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