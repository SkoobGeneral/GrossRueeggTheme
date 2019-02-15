<template>
  <div class="container">
    <div class="bv-example-row pt-4 mt-3 mb-5">
      <h1 class="title is-1 has-text-centered has-text-weight-light animated fadeIn delay-2s" style="display: block;">News</h1>
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

import Grid from '../components/components/GridNews.vue';

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
    this.getReferencesByTaxId(6) //6 is the ID of the 'featured' category      
  },

  computed: {
    posts () {
      return this.$store.state.news.allRefsNews
    },
  },

  methods: {
    getReferencesByTaxId(taxId) {
      var currentPage = 1
      if (!this.$store.state.news.refsByTaxIdNews.hasOwnProperty(taxId)) {
      } else {
        if (this.$store.state.news.currentTaxPagesNews[taxId] + 1 <= this.$store.state.news.maxTaxPagesNews[taxId]) {
          currentPage = this.$store.state.news.currentTaxPagesNews[taxId] + 1
        } else {
          return
        }
      }
      try {
        axios.get(`${window.SETTINGS.API_BASE_PATH}news?newstype=${taxId}&per_page=${this.perPage}&page=${currentPage}`)
          .then(response => {
            this.$store.commit('saveMaxPagesByIdNews', { taxId: taxId, maxPagesNews: response.headers['x-wp-totalpages'] })
            this.$store.commit('currentTaxPagesByIdNews', { taxId: taxId, currentPageNews: currentPage })
            this.$store.commit('saveReferencesByTaxIdNews', { taxId: taxId, refsArrayNews: response.data })
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