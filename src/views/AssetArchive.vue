<template>
  <div class="container">
    <div class="bv-example-row pt-4 mt-3 mb-5">
      <h1 class="title is-1 has-text-centered has-text-weight-light animated fadeIn delay-2s" style="display: block;">Immobilien</h1>
      <Grid
        ref="grid"
        :posts="posts"
        v-if="posts"
        v-on:taxonomy:select="getReferencesByTaxId($event)"
        v-on:load:more="loadMore($event)"
      ></Grid>
    </div>
  </div>
</template>

<script>

import Grid from '../components/components/GridImmobilien.vue';

export default {
  components: {
    Grid,
  },

  data() {
    return {
      perPage: 10,
    }
  },

  mounted() {
    this.getReferencesByTaxId(10) //10 is the ID of the 'featured' category      
  },

  computed: {
    posts () {
      return this.$store.state.assets.allRefsAssets
    },
  },

  methods: {
    getReferencesByTaxId(taxId) {
      var currentPage = 1
      if (!this.$store.state.assets.refsByTaxIdAssets.hasOwnProperty(taxId)) {
      } else {
        if (this.$store.state.assets.currentTaxPagesAssets[taxId] + 1 <= this.$store.state.assets.maxTaxPagesAssets[taxId]) {
          currentPage = this.$store.state.assets.currentTaxPagesAssets[taxId] + 1
        } else {
          return
        }
      }
      try {
        axios.get(`${window.SETTINGS.API_BASE_PATH}immobilien?classification2=${taxId}&per_page=${this.perPage}&page=${currentPage}`)
          .then(response => {
            this.$store.commit('saveMaxPagesByIdAssets', { taxId: taxId, maxPagesAssets: response.headers['x-wp-totalpages'] })
            this.$store.commit('currentTaxPagesByIdAssets', { taxId: taxId, currentPageAssets: currentPage })
            this.$store.commit('saveReferencesByTaxIdAssets', { taxId: taxId, refsArrayAssets: response.data })
        }).catch(err => {
          console.log(err.response)
        })
      } catch(err) {
        console.log('error')
      }
    },
    loadMore (event) {
      this.getReferencesByTaxId(event.taxId)
    }
  }
}
</script>

<style lang="scss">

</style>