<template>
  <div>
    <!--<button class="button is-success">Do nothing</button>
    <button class="button is-warning" @click="addItem()">Add item</button>
    <button class="button is-danger" @click="removeItem()">Remove</button>-->
    <Isotope
      :list="items"
      :options="isotopeOptions"
      class="isoDefault customGrid animated fadeIn delay-1s"
      id="root_isotope"
      ref="isotope"
      :class='[posts.classification2]'
      v-if="posts && posts.length"
    >
      <div
        v-for="(post, index) in items"
        :key="post.id"
        :class="`order_${post.order}`"
        class="grid-item"
      > 
      <router-link :to="`/${post.type}/${post.slug}`">
        <div>
          <figure>
            <img :src="post.acf.hero_carousel[0].picture.url" v-if="post.acf.hero_carousel[0].picture.url && post.acf.hero_carousel[0].picture.url.length" />
          </figure>
        </div>
        <p class="title is-6 mb-3" v-html="post.acf.title" v-if="post.acf.title && post.acf.title.length" style="color: #f25f2e; font-family: 'Source Sans Pro', sans-serif; font-weight: bold; overflow-x: hidden;"></p>
        <p class="subtitle is-5" style="font-family: 'Source Sans Pro', sans-serif; font-weight: 600; overflow-x: hidden;" v-if="post.acf.place && post.acf.place.length"><nobr v-html="post.acf.place"></nobr></p>
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
    }
  },

  computed: {
    isotopeOptions () {
      var that = this
      return {
        getSortData: {
          id: "id"
        },
        getFilterData: {
          filterByClassification2 (item) {
            if (!that.selected) {
              return true
            }
            return item.classification2.includes(that.selected)
          }
        }
      }
    }

  },
  methods: {
    isInvisible(index, taxonomy) {
      if (taxonomy === 0) {
        return false
      }
      return !this.posts[index].classification2.includes(taxonomy)
    },
    refresh () {
      this.posts.forEach((post, index, arr) => {
        if (post.classification2.includes(this.selected)) {
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
        } else {
          Vue.set(this.posts[index], 'order', 0)
        }
      })
    }
  },

  mounted () {
    this.refresh()
  },

  watch: {
    selected (value) {
      this.$refs.isotope.filter('filterByClassification2')
      this.refresh()
    }
  }

}
</script>

<style scoped lang="scss">



/* clear fix */
.grid:after {
  content: '';
  display: block;
  clear: both;
}

/* ---- .element-item ---- */

.gutter-sizer { width: 4%; }

.grid-item {
  height: 400px;
  float: left;
  border: none !important;
}

.grid-item--width2 { width: 40%; }
.grid-item--height2 { height: 200px; }


  .customGrid .subtitle.is-6{
    font-size: 0.7rem !important;
  }
  
  .customGrid .item {
  border: 1px solid #333;
  padding: 10px;
  min-width: 200px;
  box-sizing: border-box;
  font-family: monospace;
  color: #333;
}

.isoDefault {
  min-height: 210px;
}




img {
  width: 100%;
  object-fit:cover;
}
.grid-item {
  width: 50%;
}
/*.order_1 {
  background: rgba(255,255,0,0.3) !important;
  width: 25%;
}
.order_2 {
  background: rgba(0,0,255,0.3) !important;
  width: 25%;
}
.order_3 {
  background: rgba(255,0,0,0.3) !important;
}*/
.grid {
  background: #DDD;
}



</style>