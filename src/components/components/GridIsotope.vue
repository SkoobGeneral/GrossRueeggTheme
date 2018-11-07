<template>
  <div class="container">
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
          <div class="item__img image is-square mb-2" :style="{backgroundImage: `url(${post.acf.hero_carousel[0].picture.url}`}" v-if="post.acf.hero_carousel[0].picture.url && post.acf.hero_carousel[0].picture.url.length"></div>
          <p class="title is-6 mb-3" v-html="post.acf.title" v-if="post.acf.title && post.acf.title.length" style="color: #f25f2e; font-family: 'Source Sans Pro', sans-serif; font-size:16px; font-weight: bold; overflow-x: hidden;"></p>
          <p class="subtitle is-5" style="font-family: 'Source Sans Pro', sans-serif; font-size:14px; font-weight: 600; overflow-x: hidden;" v-if="post.acf.place && post.acf.place.length"><nobr v-html="post.acf.place"></nobr></p>
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

.customGrid:after {
  content: '';
  display: block;
  clear: both;
}
.grid-item {
  width: 100%;
  height: 591px;
  margin-bottom: 40px;
  border: 6px solid white;
}
.order_1, .order_3, .order_5, .order_0 {
  width: 30%;
  height: 261px;
}
.order_2, .order_4 {
  width: 64.5%;
}
.order_42 {
  width: 50%;
}
.item {
    &__img {
      height: 0%;
      width: 100%;
      background: black;
      background-size: cover;
      background-repeat: none;
      background-position: center center;
    }
  }

</style>