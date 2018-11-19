<template>
  <div class="containerx">
    <!--<button class="button is-success">Do nothing</button>
    <button class="button is-warning" @click="addItem()">Add item</button>
    <button class="button is-danger" @click="removeItem()">Remove</button>-->
    <Isotope
      :list="items"
      :options="isotopeOptions"
      class="isoDefault customGrid animated fadeIn delay-1s"
      id="root_isotope"
      ref="isotope"
      :class='[posts.classification]'
      v-if="posts && posts.length"
    >
      <div
        v-for="(post, index) in items"
        :key="post.id"
        :class="`order_${post.class}`"
        class="grid-item"
      > 
        <router-link :to="`/${post.type}/${post.slug}`">
          <div class="item__imgx" :style="{backgroundImage: `url(${post.acf.hero_carousel[0].picture.url}`}" v-if="post.acf.hero_carousel[0].picture.url && post.acf.hero_carousel[0].picture.url.length"></div>
          <div class="item__infox">
            <p class="title is-6 is-marginless mt-2" v-if="post.acf.title && post.acf.title.length" style="color: #f25f2e;"><nobr v-html="post.acf.title"></nobr></p>
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
      items: this.posts,
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
      return !this.posts[index].classification.includes(taxonomy)
    },
    refresh () {
      this.posts.forEach((post, index, arr) => {
        if (post.classification.includes(this.selected)) {
          Vue.set(this.posts[index], 'visible', true)
        } else {
          Vue.set(this.posts[index], 'visible', false)
        }
        if (this.selected === 0) {
          Vue.set(this.posts[index], 'visible', true)
        }
      })
      var visible = this.posts.filter(item => {
        return item.visible
      })
      var counter = 1
      this.posts.forEach((post, index, arr) => {
        if (post.visible) {
          Vue.set(this.posts[index], 'order', counter)
          counter++

          // Calculate the class based on the number of visible items
          var classx = 14
          if (visible.length >= 3) {
            classx = (counter-1) % 6
          } else if (visible.length === 2) {
            classx = 42
          }
          Vue.set(this.posts[index], 'class', classx)

        } else {
          Vue.set(this.posts[index], 'order', 0)
        }
      })

      this.totalVisibleItems = counter - 1
    }
  },


  mounted () {
    this.refresh()
  },

  watch: {
    selected (value) {
      this.refresh()
      setTimeout(() => {
        this.$refs.isotope.filter('filterByClassification')
      }, 1)
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
</style>