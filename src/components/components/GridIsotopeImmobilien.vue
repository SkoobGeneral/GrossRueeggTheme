<template>
  <div class="containerx">
    <Isotope
      :list="posts"
      :options="isotopeOptions"
      class="isoDefault customGrid animated fadeIn delay-1s"
      id="root_isotope"
      ref="isotope"
      :class='[posts.classification2]'
    >
      <div
        v-for="(post, index) in posts"
        :key="Math.random() + post.id"
        :class="`animated fadeIn delay-1s`"
        :id="post.id"
        v-if="post.classification2.includes(selected) && selected !== 0"
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
      return this.$store.state.assets.allRefsAssets
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
            return item.classification2.includes(that.selected)
          }
        }
      }
    },
    hasMorePosts () {
      return this.$store.state.assets.maxTaxPagesAssets[this.selected] > this.$store.state.assets.currentTaxPagesAssets[this.selected]
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
  width: 100%;
  height: 100%;
  height: 300px;
  margin-bottom: 10px;

  @include breakpoint($sm) {
    width: calc(50% - 5px);
    border: 10px solid white;
    margin-bottom: 10px;
  }
  @include breakpoint($md) {
    height: 300px;
  }
  &:not(.isotope-hidden) {
    @include breakpoint($sm) {
      width: calc(33.333% - 5px);
      height: 200px;
    }
    @include breakpoint($md) {
      height: 300px;      
    }
  }

  &:not(.isotope-hidden):only-child {
    @include breakpoint($md) {
      height: 610px;
      width: calc(66.6666% - 5px);
      margin-left: 16.3% !important;
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