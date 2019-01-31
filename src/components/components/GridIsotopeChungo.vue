<template>
  <div class="containerx">
    <Isotope
      :list="clonedPosts"
      :options="isotopeOptions"
      class="isoDefault customGrid animated fadeIn delay-1s"
      id="root_isotope"
      ref="isotope"
      :class='[clonedPosts.classification]'
    >
      <div
        v-for="(post, index) in clonedPosts"
        :key="Math.random() + post.id"
        :class="`order_${post.class}`"
        class="grid-item"
      > 
        <router-link :to="`/${post.type}/${post.slug}`">
          <div class="item__imgx" :style="{backgroundImage: `url(${post.acf.hero_carousel[0].picture.url}`}" v-if="post.acf.hero_carousel[0].picture.url && post.acf.hero_carousel[0].picture.url.length"></div>
          <div class="item__infox">
            <p class="title is-6 is-marginless mt-2" v-if="post.acf.title && post.acf.title.length" style="color: #f25f2e;"><nobr v-html="post.acf.title"></nobr> - order: {{`order_${post.class}`}}</p>
            <p class="subtitle is-5 is-marginless" v-if="post.acf.place && post.acf.place.length" v-html="post.acf.place">
            </p>
          </div>
        </router-link>
      </div>
    </Isotope>
  </div>
</template>

<script>
import Isotope from 'vueisotope'
import IsotopeFitColumns from 'isotope-fit-columns'

import Vue from 'vue'

export default {
  components: {
    Isotope
  },
  props: [ "posts", "selected" ],

  data () {
    return {
      clonedPosts: [],
      visible: 0,
      finalSelection: 0,
      totalVisibleItems: 0
    }
  },

  computed: {
    isotopeOptions () {
      var that = this
      return {
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
          columnWidth: 1,
          gutter: 0
        },
        getSortData: {
          id: "id"
        },
        getFilterData: {
          filterByClassification (item) {
            if (!that.selected) {
              return true
            }
            return item.classification.includes(that.selected)
          }
        }
      }
    },
  },
  methods: {
    isInvisible(index, taxonomy) {
      if (taxonomy === 0) {
        return false
      }
      return !this.clonedPosts[index].classification.includes(taxonomy)
    },
    refresh () {
      this.clonedPosts = JSON.parse(JSON.stringify(this.$store.state.references.allRefs))
      console.log('clonedPosts before', this.clonedPosts[0], this.clonedPosts.length)

      this.clonedPosts.forEach((post, index, arr) => {
        if (post.classification.includes(this.selected)) {
          Vue.set(this.clonedPosts[index], 'visible', true)
        } else {
          Vue.set(this.clonedPosts[index], 'visible', false)
        }
        if (this.selected === 0) {
          Vue.set(this.clonedPosts[index], 'visible', true)
        }
      })
      var visible = this.clonedPosts.filter(item => {
        return item.visible
      })
      this.visible = visible
      var counter = 1

      this.clonedPosts.forEach((post, index, arr) => {
        if (post.visible) {
          Vue.set(this.clonedPosts[index], 'order', counter)
          counter++

          // Calculate the class based on the number of visible items
          var classx = 14
          if (visible.length >= 3) {
            classx = (counter-1) % 6
          } else if (visible.length === 2) {
            classx = 42
          }
          Vue.set(this.clonedPosts[index], 'class', classx)

        } else {
          Vue.set(this.clonedPosts[index], 'order', 0)
        }
      })

      this.totalVisibleItems = counter - 1
      console.log('clonedPosts after', this.clonedPosts, this.clonedPosts.length)
    }
  },


  mounted () {
    //this.refresh()
  },

  watch: {
    selected (value) {
      this.$refs.isotope.filter('filterByClassification')
    }
  }

}
</script>

<style scoped lang="scss">
@import "../../styles/_variables.scss";

.item {
  &__imgx {
    display: block;
    height: calc(100% - 80px);
    width: 100%;
    background: black;
    background-size: cover;
    background-repeat: none;
    background-position: center center;
  }
  &__infox {
    height: 80px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
}

.customGrid:after {
  content: '';
  display: block;
  clear: both;
}

.grid-item {
  width: 100%;
  height: 100%;
  height: 300px;
  margin-bottom: 10px;

  @include breakpoint($sm) {
    width: calc(50% - 5px);
    border: 10px solid white;
    margin-bottom: 10px;
    /*height: 200px;*/
  }
  @include breakpoint($md) {
    height: 300px;
  }
  &.order_1,
  &.order_3,
  &.order_5,
  &.order_0 {
    @include breakpoint($sm) {
      width: calc(33.333% - 5px);
      height: 200px;
    }
    @include breakpoint($md) {
      height: 300px;      
    }
  }
  &.order_2,
  &.order_4 {
    @include breakpoint($sm) {
      width: calc(66.6666% - 5px);
      height: 410px;
    }
    @include breakpoint($md) {
      height: 610px;
    }
  }

  &.order_14 {
    @include breakpoint($md) {
      height: 400px;
      margin-left: 25% !important;
    }
  }
}
.order_2 .item__imgx, .order_4 .item__imgx, .item__imgx {
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale"); /* Firefox 10+ */
    filter: gray; /* IE6-9 */
    -webkit-filter: grayscale(100%); /* Chrome 19+ & Safari 6+ */
    -webkit-transition: all 1s ease; /* Fade to color for Chrome and Safari */
    -webkit-backface-visibility: hidden; /* Fix for transition flickering */
}

.order_2:hover .item__imgx , .order_4:hover .item__imgx, .item__imgx:hover{
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0\'/></filter></svg>#grayscale");
    -webkit-filter: grayscale(0%);
}

</style>