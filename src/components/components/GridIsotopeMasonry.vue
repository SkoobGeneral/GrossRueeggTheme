<template>
  <div class="container">
    <Isotope
      :list="posts"
      :options="isotopeOptions"
      class="isoDefault customGrid animated fadeIn delay-1s"
      id="root_isotope"
      ref="isotope"
      v-if="posts && posts.length"
    >
      <div
        v-for="(picture, index) in posts"
        :key="index"
        :class="`order_${picture.class}`"
        class="grid-item"
      > 
          <div class="item__imgx" :style="{backgroundImage: `url(${picture.picture.url}`}" v-if="picture.picture.url && picture.picture.url.length"></div>
      </div>
    </Isotope>
  </div>
</template>

<script>
import Isotope from 'vueisotope'

import Vue from 'vue'

export default {
  components: {
    Isotope
  },
  props: [ "posts" ],

  data () {
    return {
      items: this.posts,
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
    }
  },
  methods: {
    refresh () {
      var counter = 1
      this.posts.forEach((post, index, arr) => {
        Vue.set(this.posts[index], 'order', counter)
        console.log(counter)
        counter++

        // Calculate the class based on the number of visible items
        var classx = 14
        classx = (counter-1) % 4
        Vue.set(this.posts[index], 'class', classx)
      })

      this.totalVisibleItems = counter - 1
    }
  },


  mounted () {
    this.refresh()
  },

  watch: {
  }

}
</script>

<style scoped lang="scss">
@import "../../styles/_variables.scss";

.item {
  &__imgx {
    display: block;
    height: 100%;
    width: 100%;
    background: black;
    background-size: cover;
    background-repeat: none;
    background-position: center center;
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
  border: 10px solid white;
  &.order_1 {
    @include breakpoint($sm) {
      width: calc(33.333% - 5px);
    }
    @include breakpoint($lg) {
      height: 400px;
    }
  }
  &.order_2 {
    @include breakpoint($sm) {
      width: calc(66.666% - 5px);
    }
    @include breakpoint($lg) {
      height: 400px;
    }
  }
  &.order_3,
  &.order_0 {
    @include breakpoint($sm) {
      height: 240px;
      width: calc(50% - 5px);
    }
    @include breakpoint($lg) {
      height: 400px;
    }
  }
}
</style>