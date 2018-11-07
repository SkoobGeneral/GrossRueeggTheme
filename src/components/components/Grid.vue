<template>
  <b-container class="bv-example-row pt-1">
    <GridFilterBar
      taxonomy-name="classification"
      :selected="0"
      v-on:select:taxonomy="selectTaxonomy($event)"
      v-if="showToolbar"
    ></GridFilterBar>
    <GridIsotope
      ref="filter"
      :selected="selectedTaxonomy"
      :posts="posts"
    ></GridIsotope>
  </b-container>
</template>

<script>
import GridFilterBar from './GridFilterBar.vue'
import GridIsotope from './GridIsotope.vue'

export default {
  components: {
    GridFilterBar,
    GridIsotope,
  },
  props: [ "limit", "posts", "theme", "showToolbar" ],
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
    }
  }
}
</script>

<style scoped lang="scss">
</style>
<style type="text/css">
  
</style>