<template>
  <div>
    <Isotope
      :list="posts"
      :options="isotopeOptions"
      class="isoDefault customGrid animated fadeIn delay-1s"
      id="root_isotope"
      ref="isotope"
      :class='[posts.newstype]'
    >
      <div
        v-for="(post, index) in posts"
        :key="post.id"
        :class="`order_${post.order}`"
        class="mt-5 mb-5"
      > <div class="columns">
          <div class="column is-3 is-offset-1">
            <router-link :to="`/${post.type}/${post.slug}`">
            <figure>
              <img :src="post.acf.hero_carousel[0].picture.url" style="min-height: 200px;" v-if="post.acf.hero_carousel[0].picture.url && post.acf.hero_carousel[0].picture.url.length" />
            </figure>
            </router-link>
          </div>
          <div class="column is-7 is-offset-1">
            <router-link :to="`/${post.type}/${post.slug}`">
            <h5 class="mb-3" v-html="post.acf.title" v-if="post.acf.title && post.acf.title.length" style="font-family: 'Source Sans Pro', sans-serif; font-weight: bold; overflow-x: hidden;"></h5>
            <p style="font-family: 'Source Sans Pro', sans-serif; margin-bottom: -1rem !important; font-size: 18px !important; font-weight: 300; overflow-x: hidden;" v-html="post.excerpt.rendered" v-if="post.excerpt.rendered && post.excerpt.rendered.length"></p>
            </router-link>
            <router-link :to="`/${post.type}/${post.slug}`" style="color: #f25f2e; font-family: 'Source Sans Pro', sans-serif; font-weight: bold;">Weiterlesen ›</router-link>
          </div>
        </div>
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
  props: [ "posts", "selected" ],

  data () {
    return {
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
          filterBynewstype (item) {
            if (!that.selected) {
              return true
            }
            return item.newstype.includes(that.selected)
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
      return !this.posts[index].newstype.includes(taxonomy)
    },
    refresh () {
      this.posts.forEach((post, index, arr) => {
        if (post.newstype.includes(this.selected)) {
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
      this.$refs.isotope.filter('filterBynewstype')
      this.refresh()
    },
    posts () {
      this.refresh()
    }
  }

}
</script>

<style scoped lang="scss">
  .item img {
    width: 100%;
    object-fit:cover;
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale"); /* Firefox 10+ */
    filter: gray; /* IE6-9 */
    -webkit-filter: grayscale(100%); /* Chrome 19+ & Safari 6+ */
    -webkit-transition: all 1s ease; /* Fade to color for Chrome and Safari */
    -webkit-backface-visibility: hidden; /* Fix for transition flickering */
  }
  .item img:hover {
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0\'/></filter></svg>#grayscale");
    -webkit-filter: grayscale(0%);
  }
</style>