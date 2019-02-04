<template>
  <div class="container">
    <div class="bv-example-row pt-4 mt-3 mb-5">
      <h1 class="title is-1 has-text-centered has-text-weight-light animated fadeIn delay-2s" style="display: block;">Referenzen</h1>
      <Grid
        ref="grid"
        :posts="posts"
        v-if="posts"
        v-on:taxonomy:select="getReferencesByTaxId($event)"
        :enableMask="enableMask"
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
      enableMask: false,
      current: 1,
      perPage: 3,
      lastPage : 0,
      // borrar post: ?????
      /*
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
      } */      
    }
  },

  mounted() {
    //this.getReferences()
    //this.getReferencesByTaxId(13) //0 is the ID of the 'featured' category
  },

  computed: {
    taxPages () {
      return this.$store.references.currentTaxPages //save this please
    },
    posts () {
      return this.$store.state.references.allRefs
    },
  },

  methods: {
    getReferencesByTaxId(taxId) {
      var taxPages = this.$store.state.references.taxPages
      if (!this.$store.state.references.refsByTaxId.hasOwnProperty(taxId)) {
        //var pageToFetch = taxPages[taxId]
        var pageToFetch = 1
        //console.log('request sent')
        axios.get(`${window.SETTINGS.API_BASE_PATH}referenzen?classification=${taxId}&per_page=10&page=${pageToFetch}`)
          .then(response => {
            // guardar la página actual y el núimero de paginas para esta taxonomía.
            //this.$store.commit()
            this.$store.commit('saveReferencesByTaxId', { taxId: taxId, refsArray: response.data })
        })
      } else {
        //console.log('do nothing for now, the key exists')
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