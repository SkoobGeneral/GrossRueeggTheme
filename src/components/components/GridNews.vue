<template>
  <div class="bv-example-row pt-1 relative-dude">
    <GridFilterBar
      class="grid-filter-bar__wrapper"
      taxonomy-name="newstype"
      :selected="selectedTaxonomy"
      :posts="posts"
      v-on:select:taxonomy="selectTaxonomy($event)"
    ></GridFilterBar>
    <div class="fake-mask" :class="{'enabled': enableMask}"></div>
    <GridIsotope
      ref="grid-immobilien"
      :selected="selectedTaxonomy"
      :posts="posts"
      v-on:load:more="loadMore()"
    ></GridIsotope>
  </div>
</template>

<script>
import GridFilterBar from './GridFilterBar.vue'
import GridIsotope from './GridIsotopeNews.vue'

export default {
  components: {
    GridFilterBar,
    GridIsotope,
  },
  props: [ "limit", "posts", "theme", "enableMask" ],
  data() {
    return {
      selectedTaxonomy: 15,
    }
  },

  mounted () {
  },
  methods: {
    selectTaxonomy(event) {
      this.selectedTaxonomy = event.term
      this.$emit('taxonomy:select', event.term)
    },
    loadMore () {
      this.$emit('load:more', { taxId: this.selectedTaxonomy })
    },
    refresh () {
      //this.$refs.grid.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
.relative-dude {
  position: relative;
}
.fake-mask {
  position: absolute;
  width: 100%;
  height: calc(100% - 60px);
  background: #FFF;
  z-index: -100;
  opacity: 0;
  transition: opacity ease-in-out 0.1s;
  &.enabled {
    opacity: 1;
    z-index: 1;
  }
}
</style>
