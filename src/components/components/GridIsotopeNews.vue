<template>
  <div class="containerx">
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
        :key="Math.random() + post.id"
        :class="`animated fadeIn delay-1s`"
        :id="post.id"
        v-if="post.newstype.includes(selected) && selected !== 0"
        class="grid-item"
      ><div class="columns">
          <div class="column is-3 is-offset-1">
            <router-link :to="`/${post.type}/${post.slug}`">
            <figure>
              <img :src="post.acf.hero_carousel[0].picture.url" style="min-height: 200px;" v-if="post.acf.hero_carousel[0].picture.url && post.acf.hero_carousel[0].picture.url.length" />
            </figure>
            </router-link>
          </div>
          <div class="column is-7 is-offset-1 ml-2 mr-2">
            <router-link :to="`/${post.type}/${post.slug}`">
            <h5 class="mb-3" v-html="post.acf.title" v-if="post.acf.title && post.acf.title.length" style="font-family: 'Source Sans Pro', sans-serif; font-weight: bold; overflow-x: hidden;"></h5>
            <p style="font-family: 'Source Sans Pro', sans-serif; margin-bottom: -1rem !important; font-size: 18px !important; font-weight: 300; overflow-x: hidden;" v-html="post.excerpt.rendered" v-if="post.excerpt.rendered && post.excerpt.rendered.length"></p>
            </router-link>
            <router-link :to="`/${post.type}/${post.slug}`" style="color: #f25f2e; font-family: 'Source Sans Pro', sans-serif; font-weight: bold;">Weiterlesen ›</router-link>
          </div>
        </div>
      </div>
    </Isotope>
    <button
      class="button is-danger is-large"
      v-if="hasMorePosts"
      @click="loadMore()"
    >load more</button>
  </div>
</template>

<script>
import Isotope from 'vueisotope'
import IsotopePackery from 'isotope-packery'

import Vue from 'vue'

export default {
  components: {
    Isotope
  },
  props: [ "selected" ],

  data () {
    return {
      visible: 0,
      finalSelection: 0,
      totalVisibleItems: 0
    }
  },

  computed: {
    posts () {
      return this.$store.state.news.allRefsNews
    },
    isotopeOptions () {
      var that = this
      return {
        itemSelector: '.grid-item',
        percentPosition: false,
        layoutMode: "packery",
        packery: {
          columnWidth: 1,
          gutter: 0,
          horizontalOrder: true
        },
        transitionDuration: 0,
        getFilterData: {
          filterByClassification (item) {
            if (!that.selected) {
              return true
            }
            return item.newstype.includes(that.selected)
          }
        }
      }
    },
    hasMorePosts () {
      return this.$store.state.news.maxTaxPagesNews[this.selected] > this.$store.state.news.currentTaxPagesNews[this.selected]
    }
  },
  methods: {
    layout () {
      this.$refs.isotope.layout()
    },
    filter () {
      this.$refs.isotope.filter('filterByClassification')
    },
    loadMore () {
      this.$emit('load:more')
    }
  },


  mounted () {
  },

  watch: {
    posts (value) {
      setTimeout(function () {}, 1000)
    },
    selected (value) {
      setTimeout(function () {}, 1000);
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
    margin-left: 10px;
    overflow-x: hidden;
    overflow-y: hidden;
    @include breakpoint($sm) {
      margin-left: 0px;
    }
  }
}

.customGrid:after {
  content: '';
  display: block;
  clear: both;
}

.grid-item {
  min-height: 300px;
  width: 100%;
  margin-bottom: 10px;

  &:not(.isotope-hidden) {
    @include breakpoint($xs) {
      height: 600px;
      //height: 550px;
    }
    @include breakpoint($sm) {
      height: 300px;
      //height: 550px;
    }
  }

  &:not(.isotope-hidden):only-child {
    @include breakpoint($md) {
      //height: 610px;
      //width: calc(66.6666% - 5px);
      //margin-left: 16.3% !important;
    }
  }
}
.item__imgx {
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale"); /* Firefox 10+ */
    filter: gray; /* IE6-9 */
    -webkit-filter: grayscale(100%); /* Chrome 19+ & Safari 6+ */
    -webkit-transition: all 1s ease; /* Fade to color for Chrome and Safari */
    -webkit-backface-visibility: hidden; /* Fix for transition flickering */
}

.item__imgx:hover{
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0\'/></filter></svg>#grayscale");
    -webkit-filter: grayscale(0%);
}


.isotope-displayed:nth-child(6n+1) {
  border: 10px solid red;
}
</style>