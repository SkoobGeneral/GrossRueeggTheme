<template>
  <div class="bv-example-row pt-1">
    <GridFilterBar
      class="grid-filter-bar__wrapper"
      taxonomy-name="classification"
      :selected="0"
      :posts="posts"
      v-on:select:taxonomy="selectTaxonomy($event)"
    ></GridFilterBar>
    <GridIsotope
      ref="grid"
      :selected="selectedTaxonomy"
      :posts="posts"
    ></GridIsotope>
  </div>
</template>

<script>
import GridFilterBar from './GridFilterBar.vue'
import GridIsotope from './GridIsotope.vue'

export default {
  components: {
    GridFilterBar,
    GridIsotope,
  },
  props: [ "limit", "posts", "theme" ],
  data() {
    return {
      selectedTaxonomy: 0,
    }
  },

  mounted () {
  },
  methods: {
    selectTaxonomy(event) {
      this.selectedTaxonomy = event.term
    },
    refresh () {
      this.$refs.grid.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
</style>
<style type="text/css">
  
</style>