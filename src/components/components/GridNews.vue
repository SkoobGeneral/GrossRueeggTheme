<template>
  <b-container class="bv-example-row pt-1">
    <!--<button class="button is-danger" @click="removeItemInChild()">Remove</button>-->
    <GridFilterBar
      taxonomy-name="newstype"
      :selected="0"
      v-on:select:taxonomy="selectTaxonomy($event)"
      v-if="showToolbar"
    ></GridFilterBar>
    <GridIsotopeNews
      ref="filter"
      :selected="selectedTaxonomy"
      :posts="posts"
    ></GridIsotopeNews>
  </b-container>
</template>

<script>
import GridFilterBar from './GridFilterBar.vue'
import GridIsotopeNews from './GridIsotopeNews.vue'

export default {
  components: {
    GridFilterBar,
    GridIsotopeNews,
  },
  props: [ "limit", "posts", "theme", "showToolbar" ],
  data() {
    return {
      selectedTaxonomy: 0,
    }
  },

  mounted () {
    //console.log(this.$refs)
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