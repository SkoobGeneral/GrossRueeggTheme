<template>
  <b-container class="bv-example-row pt-1">
    <GridFilterBar
      taxonomy-name="classification2"
      :selected="0"
      v-on:select:taxonomy="selectTaxonomy($event)"
      v-if="showToolbar"
    ></GridFilterBar>
    <GridIsotopeImmobilien
      ref="grid"
      :selected="selectedTaxonomy"
      :posts="posts"
    ></GridIsotopeImmobilien>
  </b-container>
</template>

<script>
import GridFilterBar from './GridFilterBar.vue'
import GridIsotopeImmobilien from './GridIsotopeImmobilien.vue'

export default {
  components: {
    GridFilterBar,
    GridIsotopeImmobilien,
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